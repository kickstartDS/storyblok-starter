import { ISbStoriesParams, getStoryblokApi } from "@storyblok/react/rsc";

let lastContentVersion: number | undefined = undefined;

export async function fetchStory(slug: string, preview: boolean) {
  const sbParams: ISbStoriesParams = {
    version: preview ? "draft" : "published",
    cv: lastContentVersion,
    resolve_links: "url",
  };
  const storyblokApi = getStoryblokApi();
  const response = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  
  lastContentVersion = response.data.cv;
  return response;
}
