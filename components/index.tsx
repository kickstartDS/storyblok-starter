import { FC } from "react";
import dynamic from "next/dynamic";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent,
} from "@storyblok/react";
import { unflatten } from "@/helpers/unflatten";
import { SectionContextDefault } from "@kickstartds/ds-agency/section";
import editablePage from "./Page";
import {
  isGlobal,
  isGlobalReference,
  isStoryblokComponent,
} from "@/helpers/storyblok";
import {
  GlobalReferenceStoryblok,
  GlobalStoryblok,
} from "@/types/components-schema";

export const locale = "en";

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

export const components = {
  page: editablePage,
  global: Global,
  global_reference: GlobalReference,
  "blog-overview": dynamic(() => import("./BlogOverview")),
  "blog-post": dynamic(() => import("./BlogPost")),
  "blog-teaser": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/blog-teaser").then(
        (mod) => mod.BlogTeaserContextDefault
      )
    )
  ),
  "blog-aside": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/blog-aside").then(
        (mod) => mod.BlogAsideContextDefault
      )
    )
  ),
  "blog-author": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/blog-author").then(
        (mod) => mod.BlogAuthorContextDefault
      )
    )
  ),
  "blog-head": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/blog-head").then(
        (mod) => mod.BlogHeadContextDefault
      )
    )
  ),
  section: editable(SectionContextDefault, "components"),
  contact: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/contact").then(
        (mod) => mod.ContactContextDefault
      )
    )
  ),
  cta: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/cta").then((mod) => mod.CtaContextDefault)
    )
  ),
  divider: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/divider").then(
        (mod) => mod.DividerContextDefault
      )
    )
  ),
  faq: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/faq").then((mod) => mod.FaqContextDefault)
    )
  ),
  features: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/features").then(
        (mod) => mod.FeaturesContextDefault
      )
    )
  ),
  feature: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/feature").then(
        (mod) => mod.FeatureContextDefault
      )
    )
  ),
  gallery: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/gallery").then(
        (mod) => mod.GalleryContextDefault
      )
    )
  ),
  headline: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/headline").then((mod) => mod.Headline)
    )
  ),
  html: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/html").then(
        (mod) => mod.HtmlContextDefault
      )
    )
  ),
  split: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/split").then((mod) => mod.Split)
    )
  ),
  stats: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/stats").then(
        (mod) => mod.StatsContextDefault
      )
    )
  ),
  stat: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/stat").then(
        (mod) => mod.StatContextDefault
      )
    )
  ),
  "info-table": editable(
    dynamic(() =>
      import("./info-table/InfoTableComponent").then(
        (mod) => mod.InfoTableContextDefault
      )
    )
  ),
  "teaser-card": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/teaser-card").then(
        (mod) => mod.TeaserCardContextDefault
      )
    )
  ),
  testimonials: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/testimonials").then(
        (mod) => mod.Testimonials
      )
    )
  ),
  testimonial: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/testimonial").then(
        (mod) => mod.TestimonialContextDefault
      )
    )
  ),
  text: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/text").then(
        (mod) => mod.TextContextDefault
      )
    )
  ),
  "image-text": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/image-text").then(
        (mod) => mod.ImageTextContextDefault
      )
    )
  ),
  logos: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/logos").then((mod) => mod.Logos)
    )
  ),
};
