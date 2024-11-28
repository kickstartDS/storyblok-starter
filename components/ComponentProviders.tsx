/*  eslint react/display-name: 0 */
import {
  AnchorHTMLAttributes,
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
import {
  StorytellingContext,
  StorytellingContextDefault,
} from "@kickstartds/content/lib/storytelling";
import { StorytellingProps } from "@kickstartds/content/lib/storytelling/typing";

import { BlogTeaserContext } from "@kickstartds/ds-agency/blog-teaser";
import { BlogAsideContext } from "@kickstartds/ds-agency/blog-aside";
import { BlogAuthorContext } from "@kickstartds/ds-agency/blog-author";
import { BlogHeadContext } from "@kickstartds/ds-agency/blog-head";
import { CtaContext } from "@kickstartds/ds-agency/cta";
import { FeatureContext } from "@kickstartds/ds-agency/feature";
import { StatContext } from "@kickstartds/ds-agency/stat";
import { TestimonialContext } from "@kickstartds/ds-agency/testimonial";

import { StoryblokSubComponent } from "./StoryblokSubComponent";
import { TeaserProvider } from "./TeaserProvider";
import { useBlurHashes } from "./BlurHashContext";
import { useImagePriority } from "./ImagePriorityContext";
import { useImageSize } from "./ImageSizeContext";
import { useImageRatio } from "./ImageRatioContext";

const Link = forwardRef<
  HTMLAnchorElement,
  LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>
>(({ href, ...props }, ref) => (
  <NextLink ref={ref} href={href || "#"} {...props} />
));

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
  const ratio = useImageRatio();

  useImperativeHandle<HTMLImageElement | null, HTMLImageElement | null>(
    ref,
    () => internalRef.current
  );

  useEffect(() => {
    if (internalRef.current) resetBackgroundBlurHash(internalRef.current);
  }, []);

  if (!src) return;
  const fileUrl = !src.startsWith("http") ? `https:${src}` : src;
  const [width, height] = fileUrl.match(/\/(\d+)x(\d+)\//)?.slice(1) || [];
  const maxWidth = parseInt(width) > size ? Math.floor(size) : parseInt(width);
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
      alt={props.alt || ""}
      lazy={priority ? false : lazy}
      fetchPriority="high"
      loading={priority ? "eager" : "lazy"}
    />
  ) : (
    <Image
      ref={internalRef}
      {...props}
      alt={props.alt || ""}
      src={
        priority
          ? `${fileUrl}/${
              fileUrl.includes("/m/") ? "" : "m/"
            }filters:quality(50)`
          : fileUrl
      }
      layout={autoSize ? "fullWidth" : "constrained"}
      aspectRatio={ratio > 0 ? ratio : undefined}
      width={maxWidth}
      height={autoSize || ratio > 0 ? undefined : maxHeight}
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

const Storytelling = forwardRef<
  HTMLDivElement,
  StorytellingProps & HTMLAttributes<HTMLDivElement>
>(({ backgroundImage, ...props }, ref) => {
  return (
    <StorytellingContextDefault
      {...props}
      backgroundImage={backgroundImage}
      ref={ref}
    />
  );
});

const StorytellingProvider: FC<PropsWithChildren> = (props) => (
  <StorytellingContext.Provider {...props} value={Storytelling} />
);

const ComponentProviders = (props: PropsWithChildren) => (
  <StorytellingProvider>
    <PictureProvider>
      <LinkProvider>
        <TeaserProvider>
          {/* @ts-expect-error */}
          <CtaContext.Provider value={StoryblokSubComponent}>
            {/* @ts-expect-error */}
            <FeatureContext.Provider value={StoryblokSubComponent}>
              {/* @ts-expect-error */}
              <StatContext.Provider value={StoryblokSubComponent}>
                <TestimonialContext.Provider
                  // @ts-expect-error
                  value={StoryblokSubComponent}
                >
                  <BlogHeadContext.Provider
                    // @ts-expect-error
                    value={StoryblokSubComponent}
                  >
                    <BlogAsideContext.Provider
                      // @ts-expect-error
                      value={StoryblokSubComponent}
                    >
                      <BlogTeaserContext.Provider
                        // @ts-expect-error
                        value={StoryblokSubComponent}
                      >
                        <BlogAuthorContext.Provider
                          // @ts-expect-error
                          value={StoryblokSubComponent}
                        >
                          {props.children}
                        </BlogAuthorContext.Provider>
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
  </StorytellingProvider>
);

export default ComponentProviders;
