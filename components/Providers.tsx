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

import { LinkContextDefault, LinkContext } from "@kickstartds/base/lib/link";
import { PictureProps } from "@kickstartds/base/lib/picture/typing";

// TODO look for a better type for `href` in Storyblok
const Link = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>(({ href, ...props }, ref) => {
  const linkTarget =
    (
      href as unknown as {
        cached_url: string;
        story?: { full_slug: string; url: string; slug: string };
      }
    ).cached_url ||
    (
      href as unknown as {
        cached_url: string;
        story?: { full_slug: string; url: string; slug: string };
      }
    ).story?.full_slug;
  return <LinkContextDefault ref={ref} {...props} href={linkTarget} />;
});

const LinkProvider: FC<PropsWithChildren> = (props) => (
  <LinkContext.Provider value={Link} {...props} />
);

// TODO look for a better type for `src` in Storyblok
const Picture = forwardRef<
  HTMLImageElement,
  PictureProps & ImgHTMLAttributes<HTMLImageElement>
>(({ src, ...props }: PictureProps) => {
  const filename = (src as unknown as { filename: string })?.filename;
  return <PictureContextDefault {...props} src={filename} />;
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
