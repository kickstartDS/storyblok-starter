import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { StoryblokComponent, ISbStory, ISbStoryData } from "@storyblok/react";
import { Cache } from "file-system-cache";
import { fetchPageProps, fetchPaths } from "@/helpers/storyblok";
import { traverse } from "object-traversal";
import { isImgUrl } from "@/helpers/apiUtils";
import { fontClassNames } from "@/helpers/fonts";
import { HeadlineLevelProvider } from "@/components/headline/HeadlineLevelContext";

type PageProps = ISbStory["data"] & {
  settings?: ISbStoryData["content"];
};

const Page: NextPage<PageProps> = ({ story }) => {
  return (
    <HeadlineLevelProvider>
      <StoryblokComponent
        blok={story.content}
        data-font-class-names={fontClassNames}
      />
    </HeadlineLevelProvider>
  );
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

export const getStaticProps = (async ({ params }) => {
  const slug = params?.slug?.join("/");
  try {
    const { pageData, settingsData } = await fetchPageProps(slug);

    const storyImages: string[] = [];
    traverse(pageData, ({ value }) => {
      if (isImgUrl(value)) {
        storyImages.push(value.startsWith("//a") ? `https:${value}` : value);
      }
    });

    const blurHashes: Record<string, string> = {};

    const cache = new Cache({ basePath: "./public/blurhashes" });
    await cache.load();

    for (const imageUrl of storyImages) {
      blurHashes[imageUrl] ||= cache.getSync(imageUrl) || null;
    }

    return {
      props: {
        ...pageData,
        blurHashes,
        fontClassNames,
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
