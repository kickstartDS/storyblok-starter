import { ComponentProps } from "react";
import {
  storyblokEditable,
  StoryblokComponent,
  SbBlokData,
} from "@storyblok/react";
import { ImagePriorityProvider } from "./ImagePriorityContext";
import { Page as DsaPage } from "@kickstartds/ds-agency-premium/components/page/index.js";

// import { render } from "storyblok-rich-text-react-renderer";
// import { RichtextStoryblok } from "@/types/components-schema";
// import {
//   RichTextContext,
//   RichTextContextDefault,
// } from "@kickstartds/base/lib/rich-text";

// type StoryblokRichTextProps = {
//   text: RichtextStoryblok;
// };
// const StoryblokRichText: FC<StoryblokRichTextProps> = ({ text }) => (
//   // @ts-expect-error
//   <RichTextContextDefault text={text} renderText={render} />
// );
// const StoryblokRichTextProvider = (props: PropsWithChildren) => (
//   // @ts-expect-error
//   <RichTextContext.Provider {...props} value={StoryblokRichText} />
// );

type PageProps = {
  blok: Omit<ComponentProps<typeof DsaPage>, "section"> &
    SbBlokData & {
      section?: (ComponentProps<typeof DsaPage>["section"] & {
        _uid: string;
      })[];
    };
};

const Page: React.FC<PageProps> = ({ blok }) => (
  <>
    {/* <StoryblokRichTextProvider> */}
    <main {...storyblokEditable(blok)}>
      <ImagePriorityProvider priority>
        {blok.section?.slice(0, 1).map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </ImagePriorityProvider>
      {blok.section?.slice(1).map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
    {/* </StoryblokRichTextProvider> */}
  </>
);

export default Page;
