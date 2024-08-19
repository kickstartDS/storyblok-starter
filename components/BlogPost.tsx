import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import { BlogPost as BlogPostComponent } from "@kickstartds/ds-agency-premium/blog-post";
import { BlogPostStoryblok } from "@/types/components-schema";
import {
  TagLabelContext,
  TagLabelContextDefault,
} from "@kickstartds/base/lib/tag-label";

type PageProps = {
  blok: BlogPostStoryblok;
};

const Tag = ({ label, ...props }: any) => (
  <TagLabelContextDefault label={label?.entry} {...props} />
);

const BlogPost: React.FC<PageProps> = ({ blok }) => {
  if (blok) {
    const { cta, seo, aside, head, content } = blok;

    return (
      <main {...storyblokEditable(blok)}>
        {/* @ts-expect-error */}
        <TagLabelContext.Provider value={Tag}>
          <BlogPostComponent
            // @ts-expect-error
            head={head && head[0]}
            // @ts-expect-error
            cta={cta && cta[0]}
            // @ts-expect-error
            seo={seo && seo[0]}
            // @ts-expect-error
            aside={aside && aside[0]}
            content={content}
          >
            {blok.section?.map((nestedBlok) => (
              <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
          </BlogPostComponent>
        </TagLabelContext.Provider>
      </main>
    );
  }
  return null;
};

export default BlogPost;
