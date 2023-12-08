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
      <div {...storyblokEditable(blok)}>
        <Component {...unflatten(blok)}>
          {nestedBloksKey &&
            (blok[nestedBloksKey] as SbBlokData[] | undefined)?.map(
              (nestedBlok) => (
                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
              )
            )}
        </Component>
      </div>
    );

export const components = {
  page: editablePage,
  section: editable(Section, "components"),
  hero: editable(
    dynamic(() => import("@kickstartds/ds-agency/hero").then((mod) => mod.Hero))
  ),
  cta: editable(
    dynamic(() => import("@kickstartds/ds-agency/cta").then((mod) => mod.Cta))
  ),
  mosaic: editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/mosaic").then((mod) => mod.Mosaic)
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
  "image-story": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/image-story").then((mod) => mod.ImageStory)
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
  text: editable(
    dynamic(() => import("@kickstartds/ds-agency/text").then((mod) => mod.Text))
  ),
  "video-curtain": editable(
    dynamic(() =>
      import("@kickstartds/ds-agency/video-curtain").then(
        (mod) => mod.VideoCurtain
      )
    )
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
};
