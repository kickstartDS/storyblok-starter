import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  useStoryblokState,
  StoryblokComponent,
  ISbStory,
  ISbStoryData,
  StoryblokClient,
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

export const getStaticProps = (async ({ params, previewData }) => {
  let previewStoryblokApi: StoryblokClient | undefined;

  if (previewData) {
    const StoryblokClient = await import("storyblok-js-client").then(
      (mod) => mod.default
    );
    previewStoryblokApi = new StoryblokClient({ accessToken: previewData });
  }

  const slug = params?.slug?.join("/") || "getting-started";
  try {
    const [{ data: pageData }, { data: settingsData }] = await Promise.all([
      fetchStory(slug, previewStoryblokApi),
      fetchStories({ content_type: "settings" }, previewStoryblokApi),
    ]);
    return {
      props: {
        ...pageData,
        settings: settingsData.stories[0]?.content || null,
        key: pageData.story.id,
      },
      revalidate: 3600, // revalidate every hour
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps<ISbStory["data"], NodeJS.Dict<string[]>, string>;
