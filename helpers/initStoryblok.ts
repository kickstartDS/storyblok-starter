import Page from "@/components/Page";
import Cta from "@/components/Cta";
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

export function initStoryblok() {
  const components = {
    page: Page,
    cta: Cta,
  };

  storyblokInit({
    accessToken: process.env.storyblokApiToken,
    use: [apiPlugin],
    components,
  });
}
