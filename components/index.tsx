"use client";

import dynamic from "next/dynamic";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent,
} from "@storyblok/react/rsc";
import { unflatten } from "@/helpers/unflatten";
import editablePage from "./Page";
import { Section } from "@kickstartds/ds-agency/section";

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
  cta: editable(
    dynamic(() => import("@kickstartds/ds-agency/cta").then((mod) => mod.Cta))
  ),
  hero: editable(
    dynamic(() => import("@kickstartds/ds-agency/hero").then((mod) => mod.Hero))
  ),
};
