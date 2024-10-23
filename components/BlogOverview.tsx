import {
  ComponentProps,
  FC,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import {
  SbBlokData,
  StoryblokComponent,
  storyblokEditable,
} from "@storyblok/react";
import { Section } from "@kickstartds/ds-agency-premium/components/section/index.js";
import {
  BlogTeaser,
  BlogTeaserContext,
  BlogTeaserContextDefault,
} from "@kickstartds/ds-agency-premium/components/blog-teaser/index.js";
import { Cta } from "@kickstartds/ds-agency-premium/components/cta/index.js";
import { BlogPost } from "@kickstartds/ds-agency-premium/components/blog-post/index.js";
import { BlogOverview as DsaBlogOverview } from "@kickstartds/ds-agency-premium/components/blog-overview/index.js";

type PageProps = {
  blok: Omit<ComponentProps<typeof DsaBlogOverview>, "section"> &
    SbBlokData & {
      section?: (ComponentProps<typeof DsaBlogOverview>["section"] & {
        _uid: string;
      })[];
    };
};

const BlogTeaserPost = forwardRef<
  HTMLDivElement,
  | (ComponentProps<typeof BlogTeaser> & HTMLAttributes<HTMLDivElement>)
  | (ComponentProps<typeof BlogPost> & HTMLAttributes<HTMLDivElement>)
>((props, ref) => {
  function isBlogPost(object: any): object is ComponentProps<typeof BlogPost> {
    return object.type === "blog-post";
  }

  function isBlogTeaser(
    object: any
  ): object is ComponentProps<typeof BlogTeaser> {
    return object.type === "blog-teaser";
  }

  if (isBlogPost(props) && props.head && props.aside) {
    const teaserProps: ComponentProps<typeof BlogTeaser> = {
      date: props.head.date,
      headline: props.head.headline || "",
      teaserText: props.seo.description || "",
      image: props.head.image || "",
      tags: props.head.tags || [],
      readingTime: props.aside.readingTime,
    };
    return <BlogTeaserContextDefault {...teaserProps} ref={ref} />;
  } else if (isBlogTeaser(props)) {
    return <BlogTeaserContextDefault {...props} ref={ref} />;
  }
});
BlogTeaserPost.displayName = "BlogTeaserPost";

const BlogTeaserPostProvider: FC<PropsWithChildren> = (props) => (
  <BlogTeaserContext.Provider {...props} value={BlogTeaserPost} />
);

const BlogOverview: React.FC<PageProps> = ({ blok }) => {
  if (blok) {
    const { latest, latestTitle, list, listTitle, cta, more, moreTitle } = blok;

    return (
      <main {...storyblokEditable(blok)}>
        <BlogTeaserPostProvider>
          {blok.section?.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
          {latest && (
            <Section width="wide" headline={{ text: latestTitle }}>
              <BlogTeaser {...latest} />
            </Section>
          )}
          {list && list.length > 0 && (
            <Section headline={{ text: listTitle }} content={{ mode: "list" }}>
              {list.map((article) => (
                <BlogTeaser {...article} key={article.headline} />
              ))}
            </Section>
          )}
          <hr />
          {more && more.length > 0 && (
            <Section headline={{ text: moreTitle }}>
              {more.map((article) => (
                <BlogTeaser {...article} key={article.headline} />
              ))}
            </Section>
          )}
          {cta && (
            <Section content={{ mode: "list" }}>
              <Cta {...cta} />
            </Section>
          )}
        </BlogTeaserPostProvider>
      </main>
    );
  }
  return null;
};

export default BlogOverview;
