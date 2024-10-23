import { ComponentProps, FC } from "react";
import dynamic from "next/dynamic";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent,
} from "@storyblok/react";
import { unflatten } from "@/helpers/unflatten";
import { Section } from "@kickstartds/ds-agency-premium/section";
import { Slider } from "@kickstartds/ds-agency-premium/slider";
import editablePage from "./Page";
import { ImageAutoSizeProvider } from "./ImageAutoSizeProvider";
import {
  isGlobal,
  isGlobalReference,
  isStoryblokComponent,
} from "@/helpers/storyblok";
import {
  GlobalReferenceStoryblok,
  GlobalStoryblok,
} from "@/types/components-schema";

export const Global: FC<GlobalStoryblok & SbBlokData> = (props) =>
  isGlobal(props.blok) &&
  props.blok.global &&
  props.blok.global.map((global) => (
    <StoryblokComponent blok={global} key={global._uid} />
  ));

export const GlobalReference: FC<GlobalReferenceStoryblok & SbBlokData> = (
  props
) =>
  isGlobalReference(props.blok) &&
  props.blok.reference?.map(
    (reference) =>
      isGlobal(reference) &&
      reference.global?.map((global) => (
        <StoryblokComponent blok={global} key={global._uid} />
      ))
  );

export const editable =
  (Component: React.ComponentType<any>, nestedBloksKey?: string) =>
  // eslint-disable-next-line react/display-name
  ({ blok }: { blok: SbBlokData }) => {
    const { component, components, type, typeProp, _uid, ...props } = unflatten(
      isStoryblokComponent(blok) ? blok.content : blok
    );

    if (isGlobalReference(blok)) {
      return (
        <div className="editable">
          {blok.reference?.map(
            (reference) =>
              isGlobal(reference) &&
              reference.global?.map((global) => (
                <StoryblokComponent blok={global} key={global._uid} />
              ))
          )}
        </div>
      );
    }

    return (
      <Component {...storyblokEditable(blok)} {...props} type={typeProp}>
        {nestedBloksKey &&
          (blok[nestedBloksKey] as SbBlokData[] | undefined)?.map(
            (nestedBlok) => {
              if (isGlobalReference(nestedBlok)) {
                return nestedBlok.reference?.map((reference) =>
                  reference
                    ? isGlobal(reference) &&
                      reference.global?.map((global) => (
                        <StoryblokComponent blok={global} key={global._uid} />
                      ))
                    : ""
                );
              }

              return (
                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
              );
            }
          )}
      </Component>
    );
  };

const Hero = dynamic(() =>
  import("@kickstartds/ds-agency-premium/hero").then((mod) => mod.Hero)
);

export const components = {
  page: editablePage,
  global: Global,
  global_reference: GlobalReference,
  "blog-overview": dynamic(() => import("./BlogOverview")),
  "blog-post": dynamic(() => import("./BlogPost")),
  "blog-teaser": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/blog-teaser").then(
        (mod) => mod.BlogTeaser
      )
    )
  ),
  "blog-aside": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/blog-aside").then(
        (mod) => mod.BlogAsideContextDefault
      )
    )
  ),
  "blog-author": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/blog-author").then(
        (mod) => mod.BlogAuthorContextDefault
      )
    )
  ),
  "blog-head": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/blog-head").then(
        (mod) => mod.BlogHeadContextDefault
      )
    )
  ),
  section: editable(Section, "components"),
  contact: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/contact").then(
        (mod) => mod.ContactContextDefault
      )
    )
  ),
  cta: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/cta").then(
        (mod) => mod.CtaContextDefault
      )
    )
  ),
  faq: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/faq").then(
        (mod) => mod.FaqContextDefault
      )
    )
  ),
  features: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/features").then(
        (mod) => mod.FeaturesContextDefault
      )
    )
  ),
  feature: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/feature").then(
        (mod) => mod.FeatureContextDefault
      )
    )
  ),
  gallery: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/gallery").then(
        (mod) => mod.GalleryContextDefault
      )
    )
  ),
  headline: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/headline").then(
        (mod) => mod.Headline
      )
    )
  ),
  split: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/split").then((mod) => mod.Split)
    )
  ),
  stats: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/stats").then(
        (mod) => mod.StatsContextDefault
      )
    )
  ),
  stat: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/stat").then(
        (mod) => mod.StatContextDefault
      )
    )
  ),
  "teaser-card": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/teaser-card").then(
        (mod) => mod.TeaserCardContextDefault
      )
    )
  ),
  testimonials: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/testimonials").then(
        (mod) => mod.Testimonials
      )
    )
  ),
  testimonial: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/testimonial").then(
        (mod) => mod.TestimonialContextDefault
      )
    )
  ),
  text: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/text").then(
        (mod) => mod.TextContextDefault
      )
    )
  ),
  "image-text": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/image-text").then(
        (mod) => mod.ImageTextContextDefault
      )
    )
  ),
  logos: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/logos").then((mod) => mod.Logos)
    )
  ),
  hero: editable((props: ComponentProps<typeof Hero>) => (
    <ImageAutoSizeProvider>
      <Hero {...props} />
    </ImageAutoSizeProvider>
  )),
  mosaic: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/mosaic").then(
        (mod) => mod.MosaicContextDefault
      )
    )
  ),
  "video-curtain": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/video-curtain").then(
        (mod) => mod.VideoCurtainContextDefault
      )
    )
  ),
  "image-story": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency-premium/image-story").then(
        (mod) => mod.ImageStory
      )
    )
  ),
  slider: editable(Slider, "components"),
};
