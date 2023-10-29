"use client";

import { FC, PropsWithChildren } from "react";
import { PageStoryblok } from "@/types/components-schema";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import { render } from "storyblok-rich-text-react-renderer";
import { RichtextStoryblok } from "@/types/components-schema";
import {
  RichTextContext,
  RichTextContextDefault,
} from "@kickstartds/base/lib/rich-text";
import "@/helpers/client";

type StoryblokRichTextProps = {
  text: RichtextStoryblok;
};
const StoryblokRichText: FC<StoryblokRichTextProps> = ({ text }) => (
  // @ts-expect-error
  <RichTextContextDefault text={text} renderText={render} />
);
const StoryblokRichTextProvider = (props: PropsWithChildren) => (
  // @ts-expect-error
  <RichTextContext.Provider {...props} value={StoryblokRichText} />
);

type PageProps = {
  blok: PageStoryblok;
};

const Page: React.FC<PageProps> = ({ blok }) => (
  <StoryblokRichTextProvider>
    <main {...storyblokEditable(blok)}>
      {blok.body.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  </StoryblokRichTextProvider>
);

export default Page;
