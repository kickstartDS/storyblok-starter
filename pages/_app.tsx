import type { NextPage } from "next";
import type { AppProps } from "next/app";
// @ts-expect-error
import IconSprite from "@kickstartds/ds-agency/icon-sprite";
import DsaProviders from "@kickstartds/ds-agency/providers";
import { initStoryblok } from "@/helpers/storyblok";

import palette from "@kickstartds/ds-agency/global.client.js";
import "@kickstartds/ds-agency/tokens/tokens.css";
import "@kickstartds/ds-agency/global.css";

initStoryblok(process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN);
console.log(
  "should run initStoryblok",
  process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN
);
if (typeof window !== "undefined") {
  console.log(palette);
}

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPage;
}) {
  return (
    <DsaProviders>
      <IconSprite />
      <Component {...pageProps} />
    </DsaProviders>
  );
}
