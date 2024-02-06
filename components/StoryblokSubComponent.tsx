import { unflatten } from "@/helpers/unflatten";
import { StoryblokComponent } from "@storyblok/react";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const StoryblokSubComponent = forwardRef<HTMLElement>((props, ref) => (
  <StoryblokComponent blok={unflatten(props)} ref={ref} />
));
