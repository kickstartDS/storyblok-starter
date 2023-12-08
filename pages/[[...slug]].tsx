import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ISbStory } from "@storyblok/react";
import StoryblokStory from "@storyblok/react/story";
import { fetchStories, fetchStory } from "@/helpers/storyblok";

const Page: NextPage<ISbStory["data"]> = ({ story }) => (
  <StoryblokStory story={story} />
);

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

export const getStaticProps = (async ({ params }) => {
  const slug = (params?.slug as string[] | undefined)?.join("/") || "home";
  const { data } = await fetchStory(slug, false);
  return {
    props: { ...data, key: data.story.id },
    revalidate: 3600, // revalidate every hour
  };
}) satisfies GetStaticProps<ISbStory["data"]>;
