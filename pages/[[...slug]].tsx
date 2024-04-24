import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  useStoryblokState,
  StoryblokComponent,
  ISbStory,
  ISbStoryData,
  StoryblokClient,
} from "@storyblok/react";
import { Cache } from "file-system-cache";
import { fetchStories, fetchStory } from "@/helpers/storyblok";
import { encode } from "blurhash";
import { getPixels } from "@unpic/pixels";
import { traverse } from "object-traversal";
import { isImgUrl } from "@/helpers/apiUtils";

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

    const cache = new Cache({ basePath: "./.cache/blurhashes" });
    await cache.load();

    const storyImages: string[] = [];
    traverse(pageData, ({ value }) => {
      if (isImgUrl(value)) {
        storyImages.push(value.startsWith("//a") ? `https:${value}` : value);
      }
    });

    const blurHashes: Record<string, string> = {};
    for (const imageUrl of storyImages) {
      if (blurHashes[imageUrl]) continue;
      if (cache.getSync(imageUrl)) {
        blurHashes[imageUrl] = cache.getSync(imageUrl);
        continue;
      }

      const imgData = await getPixels(imageUrl);
      const data = Uint8ClampedArray.from(imgData.data);
      const blurHash = encode(data, imgData.width, imgData.height, 4, 4);
      blurHashes[imageUrl] = blurHash;
      cache.setSync(imageUrl, blurHash);
    }

    return {
      props: {
        ...pageData,
        blurHashes,
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
