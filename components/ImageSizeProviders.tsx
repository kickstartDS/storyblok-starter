import {
  Children,
  ComponentProps,
  FC,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import { ImageSizeProvider, useImageSize } from "./ImageSizeContext";
import {
  SectionContext,
  SectionContextDefault,
} from "@kickstartds/ds-agency/section";
import {
  LogosContext,
  LogosContextDefault,
} from "@kickstartds/ds-agency/logos";
import {
  PostMetaContext,
  PostMetaContextDefault,
} from "@kickstartds/blog/lib/post-meta";
import {
  BlogTeaserContext,
  BlogTeaserContextDefault,
} from "@kickstartds/ds-agency/blog-teaser";
import calculated from "@/token/calculated";

const SectionProvider: FC<PropsWithChildren> = (props) => {
  const UpstreamSection = useContext(SectionContext);

  const Section = useMemo(
    () =>
      forwardRef<
        HTMLDivElement,
        ComponentProps<typeof SectionContextDefault> &
          Omit<HTMLAttributes<HTMLElement>, "style" | "content">
      >(function SectionImageSize(props, ref) {
        // TODO should also take into account section gap width
        const childCount = Children.count(props.children) || 1;

        const sectionWidthName =
          props.content?.width === "unset" || !props.content?.width
            ? props.width || "default"
            : calculated.sectionWidths[props.content?.width || "default"] >
              calculated.sectionWidths[props.width || "default"]
            ? props.width || "default"
            : props.content?.width || "default";

        const sectionWidth =
          calculated.sectionWidths[sectionWidthName] *
          calculated.baseFontSizePx;

        const componentWidth =
          props.content?.mode === "list"
            ? sectionWidth
            : props.content?.mode === "slider"
            ? sectionWidth
            : sectionWidth / childCount;

        return (
          <ImageSizeProvider size={componentWidth}>
            <UpstreamSection {...props} ref={ref} />
          </ImageSizeProvider>
        );
      }),
    [UpstreamSection]
  );

  return <SectionContext.Provider {...props} value={Section} />;
};

const LogosProvider: FC<PropsWithChildren> = (props) => {
  const UpstreamLogos = useContext(LogosContext);

  const Logos = useMemo(
    () =>
      forwardRef<
        HTMLDivElement,
        ComponentProps<typeof LogosContextDefault> &
          HTMLAttributes<HTMLDivElement>
      >(function LogosImageSize(props, ref) {
        const size = useImageSize();
        const gapSize = calculated.desktop["--dsa-logos__grid--gap-horizontal"];
        const logoSize = Math.ceil((size - gapSize * 3) / 3);

        return (
          <ImageSizeProvider size={logoSize}>
            <UpstreamLogos {...props} ref={ref} />
          </ImageSizeProvider>
        );
      }),
    [UpstreamLogos]
  );

  return <LogosContext.Provider {...props} value={Logos} />;
};

const BlogTeaserProvider: FC<PropsWithChildren> = (props) => {
  const UpstreamBlogTeaser = useContext(BlogTeaserContext);

  const BlogTeaser = useMemo(
    () =>
      forwardRef<
        HTMLDivElement,
        ComponentProps<typeof BlogTeaserContextDefault> &
          HTMLAttributes<HTMLElement>
      >(function BlogTeaserImageSize(props, ref) {
        const size = useImageSize();

        // TODO get "500" from tokens
        const resultingSize = size < 500 ? size : size / 2;

        return (
          <ImageSizeProvider size={resultingSize}>
            <UpstreamBlogTeaser {...props} ref={ref} />
          </ImageSizeProvider>
        );
      }),
    [UpstreamBlogTeaser]
  );

  return <BlogTeaserContext.Provider {...props} value={BlogTeaser} />;
};

const PostMetaProvider: FC<PropsWithChildren> = (props) => {
  const UpstreamPostMeta = useContext(PostMetaContext);

  const PostMeta = useMemo(
    () =>
      forwardRef<
        HTMLDivElement,
        ComponentProps<typeof PostMetaContextDefault> &
          HTMLAttributes<HTMLElement>
      >(function PostMetaImageSize(props, ref) {
        const avatarSize =
          calculated.desktop["--dsa-blog-teaser__avatar--size"];
        return (
          <ImageSizeProvider size={avatarSize}>
            <UpstreamPostMeta {...props} ref={ref} />
          </ImageSizeProvider>
        );
      }),
    [UpstreamPostMeta]
  );

  return <PostMetaContext.Provider {...props} value={PostMeta} />;
};

const ImageSizeProviders = (props: PropsWithChildren) => (
  <SectionProvider>
    <LogosProvider>
      <PostMetaProvider>
        <BlogTeaserProvider>{props.children}</BlogTeaserProvider>
      </PostMetaProvider>
    </LogosProvider>
  </SectionProvider>
);

export default ImageSizeProviders;
