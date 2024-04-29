import type { NextPage } from "next";
import type { AppProps } from "next/app";

import DsaProviders from "@kickstartds/ds-agency/providers";
import { Header } from "@kickstartds/ds-agency/header";
import { Footer } from "@kickstartds/ds-agency/footer";
import { initStoryblok } from "@/helpers/storyblok";
import { unflatten } from "@/helpers/unflatten";
import Meta from "@/components/Meta";
import "lazysizes/plugins/attrchange/ls.attrchange";

import StoryblokProviders from "../components/Providers";

import palette from "@kickstartds/ds-agency/global.client.js";
import IconSprite from "../token/IconSprite";
import "@kickstartds/ds-agency/global.css";
import "../token/tokens.css";
import "../index.scss";
import { BlurHashProvider } from "@/components/BlurHashContext";

initStoryblok(process.env.NEXT_STORYBLOK_API_TOKEN);
if (typeof window !== "undefined") {
  console.log(palette);
}

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPage;
}) {
  const { settings, story, blurHashes } = pageProps;
  const headerProps = settings?.header[0];
  const footerProps = settings?.footer[0];

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
              {...unflatten(headerProps)}
              inverted={story.header.inverted || false}
              floating={story.header.floating || false}
            />
          )}
          <Component {...pageProps} />
          {footerProps && (
            <Footer
              logo={{}}
              {...unflatten(footerProps)}
              inverted={story.footer.inverted || false}
            />
          )}
        </StoryblokProviders>
      </DsaProviders>
    </BlurHashProvider>
  );
}
