import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  useStoryblokState,
  StoryblokComponent,
  ISbStory,
} from "@storyblok/react";
import { fetchStories, fetchStory } from "@/helpers/storyblok";

const Page: NextPage<ISbStory["data"]> = ({ story: initialStory }) => {
  const story = useStoryblokState(initialStory);
  return story ? <StoryblokComponent blok={story.content} /> : null;
};

export default Page;

export const getStaticPaths = (async () => {
  const { data } = await fetchStories();
  const paths = [
    { params: { slug: [] } },
    ...data.stories.map((story) => ({
      params: { slug: story.full_slug.split("/") },
    })),
  ];
  return { paths, fallback: false };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params, draftMode }) => {
  const slug = (params?.slug as string[] | undefined)?.join("/") || "home";
  const { data } = await fetchStory(slug, draftMode || false);
  return {
    props: { ...data, key: data.story.id },
    revalidate: 3600, // revalidate every hour
  };
}) satisfies GetStaticProps<ISbStory["data"]>;
