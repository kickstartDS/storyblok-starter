import { unflatten } from "@/helpers/unflatten";
import { StoryblokComponent } from "@storyblok/react";
import { traverse } from "object-traversal";
import { forwardRef } from "react";

const isStoryblokComponent = (
  blok: any
): blok is { content: Record<string, any> } =>
  blok.content !== undefined && blok.id !== undefined;

// eslint-disable-next-line react/display-name
export const StoryblokSubComponent = forwardRef<HTMLElement>((props, ref) => {
  traverse(props, ({ parent, key, value }) => {
    if (
      parent &&
      key &&
      value &&
      typeof value === "object" &&
      value.fieldtype === "asset" &&
      value.id === null
    ) {
      delete parent[key];
    }
  });
  console.log(props);
  return (
    <StoryblokComponent
      blok={unflatten(isStoryblokComponent(props) ? props.content : props)}
      ref={ref}
    />
  );
});
