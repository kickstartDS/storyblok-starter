/*  eslint react/display-name: 0 */
import {
  AnchorHTMLAttributes,
  FC,
  ImgHTMLAttributes,
  PropsWithChildren,
  forwardRef,
} from "react";
import {
  PictureContextDefault,
  PictureContext,
} from "@kickstartds/base/lib/picture";

import {
  LinkContextDefault,
  LinkContext,
  LinkProps,
} from "@kickstartds/base/lib/link";
import { PictureProps } from "@kickstartds/base/lib/picture/typing";

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
      <LinkContextDefault
        {...props}
        ref={ref}
        href={linkTarget}
        target={href.target}
      />
    );
  }

  return <LinkContextDefault {...props} href={href} />;
});

const LinkProvider: FC<PropsWithChildren> = (props) => (
  <LinkContext.Provider value={Link} {...props} />
);

// TODO look for a better type for `src` in Storyblok
const Picture = forwardRef<
  HTMLImageElement,
  PictureProps & ImgHTMLAttributes<HTMLImageElement>
>(({ src, ...props }: PictureProps) => {
  if (isStoryblokAsset(src)) {
    const filename = (src as unknown as StoryblokAsset)?.filename;
    return <PictureContextDefault {...props} src={filename} />;
  }
  return <PictureContextDefault {...props} src={src} />;
});

const PictureProvider: FC<PropsWithChildren> = (props) => (
  <PictureContext.Provider {...props} value={Picture} />
);

const Providers = (props: PropsWithChildren) => (
  <PictureProvider>
    <LinkProvider {...props} />
  </PictureProvider>
);

export default Providers;
