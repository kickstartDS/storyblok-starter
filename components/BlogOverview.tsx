import { storyblokEditable } from "@storyblok/react";
import {
  TagLabelContext,
  TagLabelContextDefault,
} from "@kickstartds/base/lib/tag-label";
import { BlogOverview as BlogOverviewComponent } from "@kickstartds/ds-agency-premium/blog-overview";
import { BlogOverviewStoryblok } from "@/types/components-schema";

type PageProps = {
  blok: BlogOverviewStoryblok;
};

const Tag = ({ label, ...props }: any) => (
  <TagLabelContextDefault label={label?.entry} {...props} />
);

const BlogOverview: React.FC<PageProps> = ({ blok }) => {
  if (blok) {
    const { seo, latest, more } = blok;
    return (
      <main {...storyblokEditable(blok)}>
        {/* @ts-expect-error */}
        <TagLabelContext.Provider value={Tag}>
          <BlogOverviewComponent
            // @ts-expect-error
            latest={latest?.[0]}
            // @ts-expect-error
            seo={seo?.[0]}
            // @ts-expect-error
            more={more}
          />
        </TagLabelContext.Provider>
      </main>
    );
  }
  return null;
};

export default BlogOverview;
