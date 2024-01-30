import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  useStoryblokState,
  StoryblokComponent,
  ISbStory,
  ISbStoryData,
} from "@storyblok/react";
import { fetchStories, fetchStory } from "@/helpers/storyblok";

type PageProps = ISbStory["data"] & {
  settings?: ISbStoryData["content"];
};

const Page: NextPage<PageProps> = ({ story: initialStory }) => {
  const story = useStoryblokState(initialStory);
  return story ? <StoryblokComponent blok={story.content} /> : null;
};

export default Page;

export const getStaticPaths = (async () => {
  const { data } = await fetchStories();
  const paths = [
    // { params: { slug: [] } },
    ...data.stories
      .filter((story) => story.content.component !== "settings")
      .map((story) => ({
        params: { slug: story.full_slug.split("/") },
      })),
  ];
  return { paths, fallback: false };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params, draftMode }) => {
  const slug = (params?.slug as string[] | undefined)?.join("/") || "home";
  const [{ data: pageData }, { data: settingsData }] = await Promise.all([
    fetchStory(slug, draftMode || false),
    fetchStories({ content_type: "settings" }),
  ]);
  return {
    props: {
      ...pageData,
      settings: settingsData.stories[0]?.content,
      key: pageData.story.id,
    },
    revalidate: 3600, // revalidate every hour
  };
}) satisfies GetStaticProps<ISbStory["data"]>;
