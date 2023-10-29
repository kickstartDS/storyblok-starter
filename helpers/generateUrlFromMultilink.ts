import { MultilinkStoryblok } from "@/types/components-schema";

export function generateUrlFromMultilink(multilink: MultilinkStoryblok): string {
  switch (multilink.linktype) {
    case "url":
      return multilink.url;
    case "story":
      if (!multilink.story) {
        throw new Error(
          'Multilink has link_type equals "story" but does not contain an actual story!'
        );
      }
      if (!multilink.story.full_slug) {
        throw new Error('Multilink with a story does not have a "full_slug"');
      }

      return `/${multilink.story.full_slug}`;
    default:
      throw new Error('Multilink\'s link_type was neither "url" nor "story"');
  }
}
