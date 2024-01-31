import { storyblokEditable } from "@storyblok/react";
import { BlogPost as BlogPostComponent } from "@kickstartds/ds-agency/blog-post";
import { BlogPostStoryblok } from "@/types/components-schema";

type PageProps = {
  blok: BlogPostStoryblok;
};

const BlogPost: React.FC<PageProps> = ({ blok }) => {
  if (blok) {
    const { cta, seo, aside, head, content } = blok;
    return (
      <main {...storyblokEditable(blok)}>
        <BlogPostComponent
          // @ts-expect-error
          cta={cta?.[0]}
          // @ts-expect-error
          seo={seo?.[0]}
          // @ts-expect-error
          aside={aside?.[0]}
          // @ts-expect-error
          head={head?.[0]}
          content={content}
        />
      </main>
    );
  }
  return null;
};

export default BlogPost;
