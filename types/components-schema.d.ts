import {StoryblokStory} from 'storyblok-generate-ts'

export interface CtaStoryblok {
  type?: string;
  media_image?: any;
  box_headline?: string;
  box_link?: any;
  box_background?: "" | "solid" | "transparent";
  box_inverted?: boolean;
  module_headline?: string;
  media_image_src?: string;
  media_image_alt?: string;
  box_link_label?: string;
  box_link_href?: string;
  box_link_newTab?: boolean;
  _uid: string;
  component: "cta";
  [k: string]: any;
}

export interface HtmlStoryblok {
  type?: string;
  html?: string;
  module_headline?: string;
  module_subheadline?: string;
  module_width?: "" | "full" | "max" | "wide" | "default" | "narrow";
  module_verticalSpacingTop?: boolean;
  module_verticalSpacingBottom?: boolean;
  _uid: string;
  component: "html";
  [k: string]: any;
}

export interface PageStoryblok {
  body: (TextStoryblok | VisualStoryblok | TextImagesStoryblok | CtaStoryblok | HtmlStoryblok | PricefinderStoryblok)[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      cached_url?: string;
      linktype?: string;
      [k: string]: any;
    }
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      story?: {
        name: string;
        created_at?: string;
        published_at?: string;
        id: number;
        uuid: string;
        content?: {
          [k: string]: any;
        };
        slug: string;
        full_slug: string;
        sort_by_date?: null | string;
        position?: number;
        tag_list?: string[];
        is_startpage?: boolean;
        parent_id?: null | number;
        meta_data?: null | {
          [k: string]: any;
        };
        group_id?: string;
        first_published_at?: string;
        release_id?: null | number;
        lang?: string;
        path?: null | string;
        alternates?: any[];
        default_full_slug?: null | string;
        translated_slugs?: null | any[];
        [k: string]: any;
      };
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      [k: string]: any;
    };

export interface PricefinderStoryblok {
  consumption_hints_elelectricity_one_person: string;
  consumption_hints_elelectricity_two_persons: string;
  consumption_hints_elelectricity_three_persons: string;
  consumption_hints_elelectricity_four_persons: string;
  consumption_hints_gas_small: string;
  consumption_hints_gas_medium: string;
  consumption_hints_gas_large: string;
  consumption_hints_gas_huge: string;
  headline?: string;
  intro?: RichtextStoryblok;
  inverted?: boolean;
  target_electricity: MultilinkStoryblok;
  target_gas: MultilinkStoryblok;
  _uid: string;
  component: "pricefinder";
  [k: string]: any;
}

export interface TextStoryblok {
  content: string;
  _uid: string;
  component: "text";
  [k: string]: any;
}

export interface TextImagesStoryblok {
  type?: string;
  text?: string;
  mediaAlignment?:
    | ""
    | "above_left"
    | "above_center"
    | "above_right"
    | "beside_left"
    | "beside_right"
    | "intext_left"
    | "intext_right"
    | "below_left"
    | "below_center"
    | "below_right";
  images?: any[];
  module_headline?: string;
  module_subheadline?: string;
  module_backgroundStyle?: "" | "default" | "accent";
  module_width?: "" | "full" | "max" | "wide" | "default" | "narrow";
  module_ctaGroup?: any[];
  module_verticalSpacingTop?: boolean;
  module_verticalSpacingBottom?: boolean;
  _uid: string;
  component: "text-images";
  [k: string]: any;
}

export interface VisualStoryblok {
  type?: string;
  media_image?: any;
  box_headline?: string;
  box_text?: string;
  box_link?: any;
  box_background?: "" | "solid" | "transparent";
  box_inverted?: boolean;
  module_inverted?: boolean;
  module_width?: "" | "full" | "max" | "wide" | "default" | "narrow";
  media_image_src?: string;
  media_image_alt?: string;
  box_link_label?: string;
  box_link_href?: string;
  box_link_newTab?: boolean;
  _uid: string;
  component: "visual";
  [k: string]: any;
}
