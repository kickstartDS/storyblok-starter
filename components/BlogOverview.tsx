import {
  ComponentProps,
  FC,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import {
  SbBlokData,
  StoryblokComponent,
  storyblokEditable,
} from "@storyblok/react";
import { Section } from "@kickstartds/ds-agency/components/section/index.js";
import {
  BlogTeaser,
  BlogTeaserContext,
} from "@kickstartds/ds-agency/components/blog-teaser/index.js";
import { Cta } from "@kickstartds/ds-agency/components/cta/index.js";
import { BlogPost } from "@kickstartds/ds-agency/components/blog-post/index.js";
import { BlogOverview as DsaBlogOverview } from "@kickstartds/ds-agency/components/blog-overview/index.js";
import { Divider } from "@kickstartds/ds-agency/components/divider/index.js";
import { unflatten } from "@/helpers/unflatten";
import { useLanguage } from "./LanguageContext";

type PageProps = {
  blok: Omit<ComponentProps<typeof DsaBlogOverview>, "section"> &
    SbBlokData & {
      section?: (ComponentProps<typeof DsaBlogOverview>["section"] & {
        _uid: string;
      })[];
    };
};

const BlogTeaserPostProvider: FC<PropsWithChildren> = (props) => {
  const UpstreamBlogTeaser = useContext(BlogTeaserContext);

  const BlogTeaserPost = useMemo(
    () =>
      forwardRef<
        HTMLDivElement,
        | (ComponentProps<typeof BlogTeaser> & HTMLAttributes<HTMLDivElement>)
        | (ComponentProps<typeof BlogPost> & HTMLAttributes<HTMLDivElement>)
      >(function BlogTeaserPostMapper(props, ref) {
        const locale = useLanguage();

        function isBlogPost(
          object: any
        ): object is ComponentProps<typeof BlogPost> & { slug: string } {
          return object.type === "blog-post";
        }

        function isBlogTeaser(
          object: any
        ): object is ComponentProps<typeof BlogTeaser> {
          return object.type === "blog-teaser";
        }

        if (isBlogPost(props) && props.head && props.aside) {
          const date =
            props.head.date &&
            new Date(Date.parse(props.head.date)).toLocaleDateString([locale]);

          const teaserProps: ComponentProps<typeof BlogTeaser> & {
            component: string;
          } = {
            date,
            headline: props.head.headline || "",
            teaserText: props.seo.description || "",
            image: props.head.image || "",
            alt: props.head.alt || "",
            tags: props.head.tags || [],
            readingTime: props.aside.readingTime,
            link: {
              url: props.slug,
            },
            component: "blog-teaser",
          };

          return <UpstreamBlogTeaser {...teaserProps} ref={ref} />;
        } else if (isBlogTeaser(props)) {
          const date =
            props.date &&
            new Date(Date.parse(props.date)).toLocaleDateString([locale]);

          return (
            // @ts-expect-error
            <UpstreamBlogTeaser
              {...unflatten(props)}
              date={props.date ? date : undefined}
              ref={ref}
            />
          );
        }
      }),
    [UpstreamBlogTeaser]
  );

  return <BlogTeaserContext.Provider {...props} value={BlogTeaserPost} />;
};

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
            <Section
              width="wide"
              headline={{ text: latestTitle }}
              backgroundColor="accent"
            >
              <BlogTeaser {...latest} />
            </Section>
          )}
          {list && list.length > 0 && (
            <Section
              headline={{ text: listTitle }}
              content={{ mode: "list" }}
              spaceBefore="small"
            >
              {list.map((article) => (
                <BlogTeaser {...article} key={article.headline} />
              ))}
            </Section>
          )}
          <Section spaceBefore="none" spaceAfter="none">
            <Divider />
          </Section>
          {more && more.length > 0 && (
            <Section headline={{ text: moreTitle }}>
              {more.map((article) => (
                <BlogTeaser {...article} key={article.headline} />
              ))}
            </Section>
          )}
          {cta && (
            <Section
              backgroundColor="accent"
              spaceAfter="none"
              spaceBefore="none"
            >
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
