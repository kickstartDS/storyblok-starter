import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  useStoryblokState,
  StoryblokComponent,
  ISbStory,
  ISbStoryData,
} from "@storyblok/react";
import {
  fetchPageProps,
  fetchPaths,
  resolvableRelations,
  storyProcessing,
} from "@/helpers/storyblok";
import { fontClassNamesPreview } from "@/helpers/fonts";

type PageProps = ISbStory["data"] & {
  settings?: ISbStoryData["content"];
};

const Page: NextPage<PageProps> = ({ story: initialStory }) => {
  const story = useStoryblokState(initialStory, {
    resolveRelations: resolvableRelations.join(","),
  });

  if (story && story.content) storyProcessing(story.content);

  return story ? (
    <StoryblokComponent
      blok={story.content}
      data-font-class-names={fontClassNamesPreview}
    />
  ) : null;
};

export default Page;

export const getStaticPaths = (async () => {
  return {
    paths: (await fetchPaths()).map((path) => {
      return {
        params: {
          slug: path.params.slug,
        },
      };
    }),
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params, previewData }) => {
  if (!previewData) {
    return {
      notFound: true,
    };
  }

  const StoryblokClient = await import("storyblok-js-client").then(
    (mod) => mod.default
  );
  const previewStoryblokApi = new StoryblokClient({ accessToken: previewData });
  const slug = params?.slug?.join("/");
  try {
    const { pageData, settingsData } = await fetchPageProps(
      slug,
      previewStoryblokApi
    );

    return {
      props: {
        ...pageData,
        blurHashes: {},
        fontClassNames: fontClassNamesPreview,
        settings: settingsData.stories[0]?.content || null,
        key: pageData.story.id,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps<PageProps, NodeJS.Dict<string[]>, string>;
