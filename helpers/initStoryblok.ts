import Page from "@/components/Page";
import Cta from "@/components/Cta";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

export function initStoryblok() {
  const components = {
    page: Page,
    cta: Cta,
    hero: Hero,
    section: Section,
  };

  storyblokInit({
    accessToken: process.env.storyblokApiToken,
    use: [apiPlugin],
    components,
  });
}
