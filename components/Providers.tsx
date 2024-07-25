/*  eslint react/display-name: 0 */
import {
  AnchorHTMLAttributes,
  Children,
  FC,
  HTMLAttributes,
  ImgHTMLAttributes,
  PropsWithChildren,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import NextLink from "next/link";
import { blurhashToCssGradientString } from "@unpic/placeholder";
import { Image } from "@unpic/react/nextjs";

import {
  PictureContext,
  PictureContextDefault,
} from "@kickstartds/base/lib/picture";
import { LinkContext, LinkProps } from "@kickstartds/base/lib/link";
import { PictureProps } from "@kickstartds/base/lib/picture/typing";

import { BlogTeaserContext } from "@kickstartds/ds-agency-premium/blog-teaser";
import { BlogAsideContext } from "@kickstartds/ds-agency-premium/blog-aside";
import { BlogHeadContext } from "@kickstartds/ds-agency-premium/blog-head";
import { CtaContext } from "@kickstartds/ds-agency-premium/cta";
import { FeatureContext } from "@kickstartds/ds-agency-premium/feature";
import { StatContext } from "@kickstartds/ds-agency-premium/stat";
import { TestimonialContext } from "@kickstartds/ds-agency-premium/testimonial";

import { INDEX_SLUG } from "@/helpers/storyblok";

import { StoryblokSubComponent } from "./StoryblokSubComponent";
import { TeaserProvider } from "./TeaserProvider";
import { useBlurHashes } from "./BlurHashContext";
import { useImagePriority } from "./ImagePriorityContext";
import { useImageSize, ImageSizeProvider } from "./ImageSizeContext";
import { AssetStoryblok, MultilinkStoryblok } from "@/types/components-schema";
import { HeroProps } from "@kickstartds/ds-agency-premium/HeroProps-cf82a16d.js";
import {
  HeroContextDefault as DsaHero,
  HeroContext,
} from "@kickstartds/ds-agency-premium/hero";
import {
  SectionContext,
  SectionContextDefault,
} from "@kickstartds/ds-agency-premium/section";
import { SectionProps } from "@kickstartds/ds-agency-premium/SectionProps-83d399b4.js";
import {
  LogosContext,
  LogosContextDefault,
} from "@kickstartds/ds-agency-premium/logos";
import { LogosProps } from "@kickstartds/ds-agency-premium/LogosProps-58c84ccc.js";

function isStoryblokLink(object: unknown): object is MultilinkStoryblok {
  return (object as MultilinkStoryblok)?.linktype !== undefined;
}

function isStoryblokAsset(object: unknown): object is AssetStoryblok {
  return (object as AssetStoryblok)?.filename !== undefined;
}

const Link = forwardRef<
  HTMLAnchorElement,
  LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>
>(({ href, ...props }, ref) => {
  if (isStoryblokLink(href)) {
    const linkTarget =
      href.linktype === "email"
        ? `mailto:${href.email}`
        : href.story?.full_slug === INDEX_SLUG
        ? "/"
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

const resetBackgroundBlurHash = (image: HTMLImageElement) => {
  requestAnimationFrame(() => {
    image.style.background = "";
  });
};

const Picture = forwardRef<
  HTMLImageElement,
  PictureProps & ImgHTMLAttributes<HTMLImageElement> & { autoSize?: boolean }
>(({ src, lazy, autoSize, ...props }, ref) => {
  const internalRef = useRef<HTMLImageElement>(null);

  const blurHashes = useBlurHashes();
  const priority = useImagePriority();
  const size = useImageSize();

  useImperativeHandle<HTMLImageElement | null, HTMLImageElement | null>(
    ref,
    () => internalRef.current
  );

  useEffect(() => {
    if (internalRef.current) resetBackgroundBlurHash(internalRef.current);
  }, []);

  if (!src || (isStoryblokAsset(src) && !src.filename)) return;
  const source = isStoryblokAsset(src) ? src.filename : src;
  const fileUrl = !source.startsWith("http") ? `https:${source}` : source;
  const [width, height] = fileUrl.match(/\/(\d+)x(\d+)\//)?.slice(1) || [];
  const maxWidth = parseInt(width) > size ? size : parseInt(width);
  const maxHeight =
    parseInt(width) > size
      ? Math.floor((parseInt(height) * size) / parseInt(width))
      : parseInt(height);

  // Don't optimize SVG images - https://github.com/kickstartDS/storyblok-starter/issues/19
  return fileUrl.endsWith(".svg") ? (
    <PictureContextDefault
      ref={internalRef}
      {...props}
      src={fileUrl}
      width={maxWidth}
      height={maxHeight}
      alt={isStoryblokAsset(src) ? src.alt || "" : props.alt || ""}
      lazy={lazy}
      fetchPriority="high"
    />
  ) : (
    <Image
      ref={internalRef}
      {...props}
      alt={isStoryblokAsset(src) ? src.alt || "" : props.alt || ""}
      src={
        priority
          ? `${fileUrl}/${
              fileUrl.includes("/m/") ? "" : "m/"
            }filters:quality(50)`
          : fileUrl
      }
      width={autoSize ? undefined : maxWidth}
      height={autoSize ? undefined : maxHeight}
      priority={lazy === false || priority}
      onLoad={(event) => {
        if (event.target instanceof HTMLImageElement) {
          resetBackgroundBlurHash(event.target);
        }
      }}
      background={
        blurHashes[fileUrl]
          ? blurhashToCssGradientString(blurHashes[fileUrl])
          : undefined
      }
      // @ts-expect-error `null` is not documented
      objectFit={null}
    />
  );
});

const PictureProvider: FC<PropsWithChildren> = (props) => (
  <PictureContext.Provider {...props} value={Picture} />
);

const Hero = forwardRef<
  HTMLDivElement,
  HeroProps & HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { image, ...rest } = props;

  const src =
    (image &&
      ((image.src &&
        isStoryblokAsset(image.src) &&
        `${image.src.filename}/m/600x0`) ||
        image.src)) ||
    undefined;
  const srcMobile =
    (image &&
      ((image.srcMobile &&
        isStoryblokAsset(image.srcMobile) &&
        image.srcMobile.filename &&
        `${image.srcMobile.filename}/m/600x0`) ||
        image.srcMobile)) ||
    src ||
    "";
  const srcTablet =
    (image &&
      ((image.srcTablet &&
        isStoryblokAsset(image.srcTablet) &&
        image.srcTablet.filename &&
        `${image.srcTablet.filename}/m/950x0`) ||
        image.srcTablet)) ||
    undefined;
  const srcDesktop =
    (image &&
      ((image.srcDesktop &&
        isStoryblokAsset(image.srcDesktop) &&
        image.srcDesktop.filename &&
        `${image.srcDesktop.filename}/m/1600x0`) ||
        image.srcDesktop)) ||
    undefined;

  return (
    <DsaHero
      {...rest}
      image={{
        ...image,
        srcMobile,
        srcTablet,
        srcDesktop,
        src,
      }}
      ref={ref}
    />
  );
});

const HeroProvider: FC<PropsWithChildren> = (props) => (
  <HeroContext.Provider {...props} value={Hero} />
);

// TODO this should be read from real token values somehow (`custom-property-extract`?)
const baseFontSizePx = 16;
const sectionWidthRems = {
  narrow: 46.5,
  default: 62,
  wide: 75,
  max: 120,
  full: 120,
};

const Section = forwardRef<
  HTMLDivElement,
  SectionProps & Omit<HTMLAttributes<HTMLElement>, "style" | "content">
>((props, ref) => {
  const sectionWidthName =
    props.content?.width === "unset"
      ? props.width || "default"
      : sectionWidthRems[props.content?.width || "default"] >
        sectionWidthRems[props.width || "default"]
      ? props.width || "default"
      : props.content?.width || "default";
  const sectionWidth = Math.floor(
    sectionWidthRems[sectionWidthName] * baseFontSizePx
  );
  const componentWidth =
    props.content?.mode === "list"
      ? sectionWidth
      : props.content?.mode === "slider"
      ? sectionWidth
      : sectionWidth / Children.count(props.children);

  return (
    <ImageSizeProvider size={componentWidth}>
      <SectionContextDefault {...props} ref={ref} />
    </ImageSizeProvider>
  );
});

const SectionProvider: FC<PropsWithChildren> = (props) => (
  <SectionContext.Provider {...props} value={Section} />
);

const Logos = forwardRef<
  HTMLDivElement,
  LogosProps & HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const size = useImageSize();
  const logoSize = Math.floor(size / 3);

  return (
    <ImageSizeProvider size={logoSize}>
      <LogosContextDefault {...props} ref={ref} />
    </ImageSizeProvider>
  );
});

const LogosProvider: FC<PropsWithChildren> = (props) => (
  <LogosContext.Provider {...props} value={Logos} />
);

const Providers = (props: PropsWithChildren) => (
  <SectionProvider>
    <LogosProvider>
      <PictureProvider>
        <HeroProvider>
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
                        <BlogAsideContext.Provider
                          // @ts-expect-error
                          value={StoryblokSubComponent}
                        >
                          <BlogTeaserContext.Provider
                            // @ts-expect-error
                            value={StoryblokSubComponent}
                          >
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
        </HeroProvider>
      </PictureProvider>
    </LogosProvider>
  </SectionProvider>
);

export default Providers;
