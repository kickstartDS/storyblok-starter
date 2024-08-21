import {
  Children,
  FC,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import { ImageSizeProvider, useImageSize } from "./ImageSizeContext";
import {
  getPxSize,
  getPropertyValue,
  getSectionWidth,
  baseFontSizePx,
} from "@/helpers/token";
import {
  SectionContext,
  SectionContextDefault,
} from "@kickstartds/ds-agency-premium/section";
import {
  LogosContext,
  LogosContextDefault,
} from "@kickstartds/ds-agency-premium/logos";
import {
  ImageStoryContext,
  ImageStoryContextDefault,
} from "@kickstartds/ds-agency-premium/components/image-story/index.js";
import { LogosProps } from "@kickstartds/ds-agency-premium/LogosProps-f9474fe2.js";
import { SectionProps } from "@kickstartds/ds-agency-premium/SectionProps-83d399b4.js";
import { ImageStoryProps } from "@kickstartds/ds-agency-premium/ImageStoryProps-e853e1e7.js";

const Section = forwardRef<
  HTMLDivElement,
  SectionProps & Omit<HTMLAttributes<HTMLElement>, "style" | "content">
>((props, ref) => {
  const sectionWidthName =
    props.content?.width === "unset"
      ? props.width || "default"
      : getSectionWidth(props.content?.width || "default") >
        getSectionWidth(props.width || "default")
      ? props.width || "default"
      : props.content?.width || "default";
  const sectionWidth = getSectionWidth(sectionWidthName) * baseFontSizePx;

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
Section.displayName = "Section";

const SectionProvider: FC<PropsWithChildren> = (props) => (
  <SectionContext.Provider {...props} value={Section} />
);

const Logos = forwardRef<
  HTMLDivElement,
  LogosProps & HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const size = useImageSize();
  const gapSize = getPxSize(
    getPropertyValue("--dsa-logos__grid--gap-horizontal", "desktop")
  );
  const logoSize = Math.ceil(
    (size - gapSize * (props.logosPerRow || 3)) / (props.logosPerRow || 3)
  );

  return (
    <ImageSizeProvider size={logoSize}>
      <LogosContextDefault {...props} ref={ref} />
    </ImageSizeProvider>
  );
});
Logos.displayName = "Logos";

const LogosProvider: FC<PropsWithChildren> = (props) => (
  <LogosContext.Provider {...props} value={Logos} />
);

const ImageStory = forwardRef<
  HTMLDivElement,
  ImageStoryProps & HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const size = useImageSize();
  const gapSize = getPxSize(
    getPropertyValue("--dsa-image-story--horizontal-padding", "phone")
  );
  const imageSize = Math.ceil(size / 2 - gapSize);

  return (
    <ImageSizeProvider size={imageSize}>
      <ImageStoryContextDefault {...props} ref={ref} />
    </ImageSizeProvider>
  );
});
ImageStory.displayName = "ImageStory";

const ImageStoryProvider: FC<PropsWithChildren> = (props) => (
  <ImageStoryContext.Provider {...props} value={ImageStory} />
);

const ImageSizeProviders = (props: PropsWithChildren) => (
  <SectionProvider>
    <LogosProvider>
      <ImageStoryProvider>{props.children}</ImageStoryProvider>
    </LogosProvider>
  </SectionProvider>
);

export default ImageSizeProviders;
