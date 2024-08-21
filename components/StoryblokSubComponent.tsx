import { unflatten } from "@/helpers/unflatten";
import { StoryblokComponent } from "@storyblok/react";
import { forwardRef } from "react";
import { isStoryblokComponent } from ".";

// eslint-disable-next-line react/display-name
export const StoryblokSubComponent = forwardRef<HTMLElement>((props, ref) => {
  return (
    <StoryblokComponent
      blok={unflatten(isStoryblokComponent(props) ? props.content : props)}
      ref={ref}
    />
  );
});
