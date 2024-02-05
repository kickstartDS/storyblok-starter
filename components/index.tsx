import dynamic from "next/dynamic";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent,
} from "@storyblok/react";
import { unflatten } from "@/helpers/unflatten";
import { Section } from "@kickstartds/ds-agency/section";
import editablePage from "./Page";

export const editable =
  (Component: React.ComponentType<any>, nestedBloksKey?: string) =>
  // eslint-disable-next-line react/display-name
  ({ blok }: { blok: SbBlokData }) =>
    (
      <Component {...storyblokEditable(blok)} {...unflatten(blok)}>
        {nestedBloksKey &&
          (blok[nestedBloksKey] as SbBlokData[] | undefined)?.map(
            (nestedBlok) => (
              <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            )
          )}
      </Component>
    );

const editableBlogTeaser = editable(
  dynamic(() =>
    import("@kickstartds/ds-agency/blog-teaser").then(
      (mod) => mod.BlogTeaserContextDefault
    )
  )
);

export const components = {
  page: editablePage,
  "blog-overview": dynamic(() => import("./BlogOverview")),
  "blog-post": dynamic(() => import("./BlogPost")),
  "blog-teaser": editableBlogTeaser,
  more: editableBlogTeaser,
  "blog-aside": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/blog-aside").then(
        (mod) => mod.BlogAsideContextDefault
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
  section: editable(Section, "components"),
  cta: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/cta").then((mod) => mod.CtaContextDefault)
    )
  ),
  faq: editable(
    dynamic(() => import("@kickstartds/ds-agency/faq").then((mod) => mod.Faq))
  ),
  features: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/features").then((mod) => mod.Features)
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
      import("@kickstartds/ds-agency/gallery").then((mod) => mod.Gallery)
    )
  ),
  headline: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/headline").then((mod) => mod.Headline)
    )
  ),
  split: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/split").then((mod) => mod.Split)
    )
  ),
  stats: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/stats").then((mod) => mod.Stats)
    )
  ),
  stat: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/stat").then(
        (mod) => mod.StatContextDefault
      )
    )
  ),
  "teaser-card": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/teaser-card").then((mod) => mod.TeaserCard)
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
    dynamic(() => import("@kickstartds/ds-agency/text").then((mod) => mod.Text))
  ),
  "image-text": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/image-text").then((mod) => mod.ImageText)
    )
  ),
  logos: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/logos").then((mod) => mod.Logos)
    )
  ),
  logo: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/logo").then(
        (mod) => mod.LogoContextDefault
      )
    )
  ),
};
