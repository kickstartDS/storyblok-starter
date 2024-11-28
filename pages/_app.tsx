import { useEffect } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import DsaProviders from "@kickstartds/ds-agency/providers";
import { Header } from "@kickstartds/ds-agency/header";
import { Footer } from "@kickstartds/ds-agency/footer";
import { initStoryblok } from "@/helpers/storyblok";
import { unflatten } from "@/helpers/unflatten";
import Meta from "@/components/Meta";
import "lazysizes/plugins/attrchange/ls.attrchange";

import ComponentProviders from "@/components/ComponentProviders";
import ImageSizeProviders from "@/components/ImageSizeProviders";
import ImageRatioProviders from "@/components/ImageRatioProviders";

import palette from "@kickstartds/ds-agency/global.client.js";
import "@kickstartds/ds-agency/global.css";
import IconSprite from "@/token/IconSprite";
import "@/token/tokens.css";
import "@/index.scss";
import { BlurHashProvider } from "@/components/BlurHashContext";
import { LanguageProvider } from "@/components/LanguageContext";

initStoryblok(process.env.NEXT_STORYBLOK_API_TOKEN);
if (typeof window !== "undefined") {
  console.log(palette);
}

const handleRouteChange = (url: string) => {
  // close mobile nav
  window._ks.radio.emit("location.change", url);
  // https://github.com/vercel/next.js/issues/33060
  document.activeElement instanceof HTMLElement &&
    document.activeElement.blur();
};

const setActiveNavItem = (navItems: any[] = [], currentRoute: string) => {
  const route = currentRoute.replace(/^\/|\/$/g, "");
  for (const navItem of navItems) {
    const href = navItem.href.replace(/^\/|\/$/g, "");
    navItem.active = href === route;

    if (navItem.items && Array.isArray(navItem.items)) {
      for (const item of navItem.items) {
        const itemHref = item.href.replace(/^\/|\/$/g, "");
        item.active = itemHref === route;
        navItem.active ||= item.active;
      }
    }
  }
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPage;
}) {
  const { settings, story, blurHashes, language } = pageProps;
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
    <LanguageProvider language={language}>
      <BlurHashProvider blurHashes={blurHashes}>
        <DsaProviders>
          <ComponentProviders>
            <ImageSizeProviders>
              <ImageRatioProviders>
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
              </ImageRatioProviders>
            </ImageSizeProviders>
          </ComponentProviders>
        </DsaProviders>
      </BlurHashProvider>
    </LanguageProvider>
  );
}
