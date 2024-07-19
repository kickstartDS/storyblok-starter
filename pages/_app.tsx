import { useEffect } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import DsaProviders from "@kickstartds/ds-agency-premium/providers";
import { Header } from "@kickstartds/ds-agency-premium/header";
import { Footer } from "@kickstartds/ds-agency-premium/footer";
import { initStoryblok } from "@/helpers/storyblok";
import { unflatten } from "@/helpers/unflatten";
import Meta from "@/components/Meta";
import "lazysizes/plugins/attrchange/ls.attrchange";

import StoryblokProviders from "@/components/Providers";

import palette from "@kickstartds/ds-agency-premium/global.client.js";
import "@kickstartds/ds-agency-premium/global.css";
import IconSprite from "@/token/IconSprite";
import "@/token/tokens.css";
import "@/index.scss";
import { BlurHashProvider } from "@/components/BlurHashContext";

initStoryblok(process.env.NEXT_STORYBLOK_API_TOKEN);
if (typeof window !== "undefined") {
  console.log(palette);
}

const handleRouteChange = (url: string) => {
  // close mobile nav
  window._ks.radio.emit("location.change", url);
};

const setActiveNavItem = (navItems: any[] = [], currentRoute: string) => {
  for (const navItem of navItems) {
    navItem.active =
      navItem.href.linktype === "story" &&
      ("/" + navItem.href.story.url === currentRoute ||
        navItem.href.story.url === currentRoute);
  }
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPage;
}) {
  const { settings, story, blurHashes } = pageProps;
  const headerProps = settings?.header[0] ? unflatten(settings?.header[0]) : {};
  const footerProps = settings?.footer[0] ? unflatten(settings?.footer[0]) : {};
  const storyProps = story?.content ? unflatten(story?.content) : {};
  const router = useRouter();

  const invertHeader = storyProps?.header?.inverted
    ? !headerProps?.inverted || true
    : headerProps?.inverted || false;
  const floatHeader = storyProps?.header?.floating
    ? !headerProps?.floating || true
    : headerProps?.floating || false;
  const invertFooter = storyProps?.footer?.inverted
    ? !footerProps?.inverted || true
    : footerProps?.inverted || false;

  setActiveNavItem(headerProps?.navItems, router.asPath);
  setActiveNavItem(footerProps?.navItems, router.asPath);

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router.events]);

  return (
    <BlurHashProvider blurHashes={blurHashes}>
      <DsaProviders>
        <StoryblokProviders>
          <Meta
            globalSeo={settings?.seo[0]}
            pageSeo={story?.content.seo?.[0]}
            fallbackName={story?.name}
          />
          <IconSprite />
          {headerProps && (
            <Header
              logo={{}}
              {...headerProps}
              inverted={invertHeader}
              floating={floatHeader}
            />
          )}
          <Component {...pageProps} />
          {footerProps && (
            <Footer logo={{}} {...footerProps} inverted={invertFooter} />
          )}
        </StoryblokProviders>
      </DsaProviders>
    </BlurHashProvider>
  );
}
