"use client";

import { HeroStoryblok } from "@/types/components-schema";
import { unflatten } from "@/helpers/unflatten";
import { storyblokEditable } from "@storyblok/react/rsc";
import { Hero as DsaHero } from "@kickstartds/ds-agency/hero";

type HeroProps = {
  blok: HeroStoryblok;
};
const Hero: React.FC<HeroProps> = ({ blok }) => (
  <div {...storyblokEditable(blok)}>
    <DsaHero {...unflatten(blok)} />
  </div>
);

export default Hero;
