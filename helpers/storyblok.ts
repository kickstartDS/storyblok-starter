import {
  ISbStories,
  ISbStoriesParams,
  getStoryblokApi,
  apiPlugin,
  storyblokInit,
  ISbStory,
  StoryblokClient,
} from "@storyblok/react";
import { components } from "@/components";

export function initStoryblok(accessToken?: string) {
  storyblokInit({
    accessToken,
    use: accessToken ? [apiPlugin] : undefined,
    components,
  });
}

let lastContentVersion: number | undefined = undefined;

export const sbParams = (
  draft: boolean,
  params: ISbStoriesParams = {}
): ISbStoriesParams => ({
  version: draft ? "draft" : "published",
  cv: lastContentVersion,
  resolve_links: "url",
  ...params,
});

export async function fetchStory(
  slug: string,
  previewStoryblokApi?: StoryblokClient
) {
  const storyblokApi = previewStoryblokApi || getStoryblokApi();
  const response: ISbStory = await storyblokApi.get(
    `cdn/stories/${slug}`,
    sbParams(!!previewStoryblokApi)
  );

  lastContentVersion = response.data.cv;
  return response;
}

// TODO: https://www.storyblok.com/docs/api/content-delivery/v2#topics/pagination
export async function fetchStories(
  params?: ISbStoriesParams,
  previewStoryblokApi?: StoryblokClient
) {
  const storyblokApi = previewStoryblokApi || getStoryblokApi();
  const response: ISbStories = await storyblokApi.get(
    `cdn/stories`,
    sbParams(!!previewStoryblokApi, params)
  );

  lastContentVersion = response.data.cv;
  return response;
}

export async function fetchPaths() {
  const { data } = await fetchStories();
  return data.stories
    .filter((story) => story.content.component !== "settings")
    .map((story) => {
      const slug =
        story.full_slug === INDEX_SLUG ? [] : story.full_slug.split("/");
      return { params: { slug } };
    });
}

export async function fetchPageProps(
  slug: string = INDEX_SLUG,
  previewStoryblokApi?: StoryblokClient
) {
  const [{ data: pageData }, { data: settingsData }] = await Promise.all([
    fetchStory(slug, previewStoryblokApi),
    fetchStories({ content_type: "settings" }, previewStoryblokApi),
  ]);
  return { pageData, settingsData };
}

export const INDEX_SLUG = "home";
