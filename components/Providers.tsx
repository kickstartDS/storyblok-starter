/*  eslint react/display-name: 0 */
import {
  AnchorHTMLAttributes,
  FC,
  ImgHTMLAttributes,
  PropsWithChildren,
  forwardRef,
} from "react";
import NextLink from "next/link";
import { Image } from "@unpic/react/nextjs";

import { PictureContext } from "@kickstartds/base/lib/picture";
import { LinkContext, LinkProps } from "@kickstartds/base/lib/link";
import { PictureProps } from "@kickstartds/base/lib/picture/typing";

import { BlogTeaserContext } from "@kickstartds/ds-agency-premium/blog-teaser";
import { BlogAsideContext } from "@kickstartds/ds-agency-premium/blog-aside";
import { BlogHeadContext } from "@kickstartds/ds-agency-premium/blog-head";
import { CtaContext } from "@kickstartds/ds-agency-premium/cta";
import { FeatureContext } from "@kickstartds/ds-agency-premium/feature";
import { StatContext } from "@kickstartds/ds-agency-premium/stat";
import { TestimonialContext } from "@kickstartds/ds-agency-premium/testimonial";

import { StoryblokSubComponent } from "./StoryblokSubComponent";
import { TeaserProvider } from "./TeaserProvider";

// TODO look for a better type for `href` in Storyblok
type StoryblokLink = {
  cached_url: string;
  linktype: string;
  story?: { full_slug: string; url: string; slug: string };
  target?: string;
  email?: string;
};

type StoryblokAsset = {
  filename: string;
};

function isStoryblokLink(object: unknown): object is StoryblokLink {
  return (object as StoryblokLink)?.linktype !== undefined;
}

function isStoryblokAsset(object: unknown): object is StoryblokAsset {
  return (object as StoryblokAsset)?.filename !== undefined;
}

const Link = forwardRef<
  HTMLAnchorElement,
  LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>
>(({ href, ...props }, ref) => {
  if (isStoryblokLink(href)) {
    const linkTarget =
      href.linktype === "email"
        ? `mailto:${href.email}`
        : href.cached_url || href.story?.full_slug;
    return (
      <NextLink
        {...props}
        ref={ref}
        href={linkTarget || ""}
        target={href.target}
      />
    );
  }

  return <NextLink ref={ref} {...props} href={href || ""} />;
});

const LinkProvider: FC<PropsWithChildren> = (props) => (
  <LinkContext.Provider value={Link} {...props} />
);

// TODO look for a better type for `src` in Storyblok
const Picture = forwardRef<
  HTMLImageElement,
  PictureProps & ImgHTMLAttributes<HTMLImageElement>
>(({ src, ...props }, ref) => {
  if (isStoryblokAsset(src)) {
    const filename = (src as unknown as StoryblokAsset)?.filename;
    return <Image ref={ref} alt="" {...props} src={filename} />;
  }
  return <Image ref={ref} alt="" {...props} src={src || ""} />;
});

const PictureProvider: FC<PropsWithChildren> = (props) => (
  <PictureContext.Provider {...props} value={Picture} />
);

const Providers = (props: PropsWithChildren) => (
  <PictureProvider>
    <LinkProvider>
      <TeaserProvider>
        {/* @ts-expect-error */}
        <CtaContext.Provider value={StoryblokSubComponent}>
          {/* @ts-expect-error */}
          <FeatureContext.Provider value={StoryblokSubComponent}>
            {/* @ts-expect-error */}
            <StatContext.Provider value={StoryblokSubComponent}>
              {/* @ts-expect-error */}
              <TestimonialContext.Provider value={StoryblokSubComponent}>
                {/* @ts-expect-error */}
                <BlogHeadContext.Provider value={StoryblokSubComponent}>
                  {/* @ts-expect-error */}
                  <BlogAsideContext.Provider value={StoryblokSubComponent}>
                    {/* @ts-expect-error */}
                    <BlogTeaserContext.Provider value={StoryblokSubComponent}>
                      {props.children}
                    </BlogTeaserContext.Provider>
                  </BlogAsideContext.Provider>
                </BlogHeadContext.Provider>
              </TestimonialContext.Provider>
            </StatContext.Provider>
          </FeatureContext.Provider>
        </CtaContext.Provider>
      </TeaserProvider>
    </LinkProvider>
  </PictureProvider>
);

export default Providers;
