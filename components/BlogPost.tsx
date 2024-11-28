import { ComponentProps } from "react";
import {
  SbBlokData,
  StoryblokComponent,
  storyblokEditable,
} from "@storyblok/react";
import { Section } from "@kickstartds/ds-agency/components/section/index.js";
import { Split } from "@kickstartds/ds-agency/components/split/index.js";
import { BlogAside } from "@kickstartds/ds-agency/components/blog-aside/index.js";
import { Text } from "@kickstartds/ds-agency/components/text/index.js";
import { BlogHead } from "@kickstartds/ds-agency/components/blog-head/index.js";
import { Cta } from "@kickstartds/ds-agency/components/cta/index.js";
import { BlogPost as DsaBlogPost } from "@kickstartds/ds-agency/components/blog-post/index.js";

type PageProps = {
  blok: Omit<ComponentProps<typeof DsaBlogPost>, "section"> &
    SbBlokData & {
      section?: (ComponentProps<typeof DsaBlogPost>["section"] & {
        _uid: string;
      })[];
    };
};

const BlogPost: React.FC<PageProps> = ({ blok }) => {
  if (blok) {
    const { cta, aside, head, content } = blok;

    return (
      <main {...storyblokEditable(blok)}>
        <Section width="wide" content={{ mode: "list" }}>
          <Split layout="sidebarRight">
            <div>
              {head && <BlogHead {...head} />}
              {content ? (
                <Text text={content} />
              ) : (
                blok.section?.map((nestedBlok) => (
                  <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                ))
              )}
            </div>
            {aside && <BlogAside {...aside} />}
          </Split>
        </Section>
        {cta && (
          <Section
            backgroundColor="accent"
            spaceAfter="none"
            spaceBefore="none"
          >
            <Cta {...cta} />
          </Section>
        )}
      </main>
    );
  }
  return null;
};

export default BlogPost;
