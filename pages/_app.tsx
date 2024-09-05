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

import ComponentProviders from "@/components/ComponentProviders";
import ImageSizeProviders from "@/components/ImageSizeProviders";

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
      "/" + navItem.href === currentRoute || navItem.href === currentRoute;

    for (const item of navItem.items) {
      item.active =
        "/" + item.href === currentRoute || item.href === currentRoute;
    }
  }
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPage;
}) {
  const { settings, story, blurHashes } = pageProps;
  const headerProps = settings?.header ? unflatten(settings?.header) : {};
  const footerProps = settings?.footer ? unflatten(settings?.footer) : {};
  const storyProps = story?.content ? unflatten(story?.content) : {};
  const router = useRouter();

  const invertHeader = storyProps?.header?.inverted
    ? !headerProps?.inverted
    : headerProps?.inverted;
  const floatHeader = storyProps?.header?.floating
    ? !headerProps?.floating
    : headerProps?.floating;
  const invertFooter = storyProps?.footer?.inverted
    ? !footerProps?.inverted
    : footerProps?.inverted;

  setActiveNavItem(headerProps?.navItems, router.asPath);
  setActiveNavItem(footerProps?.navItems, router.asPath);

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router.events]);

  return (
    <BlurHashProvider blurHashes={blurHashes}>
      <DsaProviders>
        <ComponentProviders>
          <ImageSizeProviders>
            <Meta
              globalSeo={settings?.seo}
              pageSeo={story?.content.seo}
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
          </ImageSizeProviders>
        </ComponentProviders>
      </DsaProviders>
    </BlurHashProvider>
  );
}
