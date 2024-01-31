import { storyblokEditable } from "@storyblok/react";
import { BlogOverview as BlogOverviewComponent } from "@kickstartds/ds-agency/blog-overview";
import { BlogOverviewStoryblok } from "@/types/components-schema";

type PageProps = {
  blok: BlogOverviewStoryblok;
};

const BlogOverview: React.FC<PageProps> = ({ blok }) => {
  if (blok) {
    const { seo, latest, more } = blok;
    return (
      <main {...storyblokEditable(blok)}>
        <BlogOverviewComponent
          // @ts-expect-error
          latest={latest?.[0]}
          // @ts-expect-error
          seo={seo?.[0]}
          // @ts-expect-error
          more={more}
        />
      </main>
    );
  }
  return null;
};

export default BlogOverview;
