"use client";

import { CtaStoryblok } from "@/types/components-schema";
import { unflatten } from "@/helpers/unflatten";
import { storyblokEditable } from "@storyblok/react/rsc";
import { Cta as DsaCta } from "@kickstartds/ds-agency/cta";

type CtaProps = {
  blok: CtaStoryblok;
};
const Cta: React.FC<CtaProps> = ({ blok }) => (
  <div {...storyblokEditable(blok)}>
    <DsaCta {...unflatten(blok)} />
  </div>
);

export default Cta;
