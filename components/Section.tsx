"use client";

import { SectionStoryblok } from "@/types/components-schema";
import { unflatten } from "@/helpers/unflatten";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react/rsc";
import { Section as DsaSection } from "@kickstartds/ds-agency/section";

type SectionProps = {
  blok: SectionStoryblok;
};
const Section: React.FC<SectionProps> = ({ blok }) => (
  <div {...storyblokEditable(blok)}>
    <DsaSection {...unflatten(blok)}>
      {blok.components?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </DsaSection>
  </div>
);

export default Section;
