import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import { components } from "@/components";

export function initStoryblok() {
  storyblokInit({
    accessToken: process.env.storyblokApiToken,
    use: [apiPlugin],
    components,
  });
}
