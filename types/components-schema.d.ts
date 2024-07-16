import {StoryblokStory} from 'storyblok-generate-ts'

export interface AssetStoryblok {
  _uid?: string;
  id: number;
  alt?: string;
  name: string;
  focus?: string;
  source?: string;
  title?: string;
  filename: string;
  copyright?: string;
  fieldtype?: string;
  meta_data?: null | {
    [k: string]: any;
  };
  is_external_url?: boolean;
  [k: string]: any;
}

export interface BlogAsideStoryblok {
  author_name?: string;
  author_byline?: string;
  author_image?: AssetStoryblok;
  author_twitter?: string;
  author_email?: string;
  socialSharing?: SocialSharingStoryblok[];
  readingTime?: string;
  date?: string;
  className?: string;
  type?: string;
  _uid: string;
  component: "blog-aside";
  [k: string]: any;
}

export interface BlogHeadStoryblok {
  date?: string;
  tags?: TagsStoryblok[];
  headline?: string;
  image?: AssetStoryblok;
  type?: string;
  _uid: string;
  component: "blog-head";
  [k: string]: any;
}

export interface BlogOverviewStoryblok {
  latest?: BlogTeaserStoryblok[];
  list?: BlogTeaserStoryblok[];
  more?: BlogTeaserStoryblok[];
  cta?: CtaStoryblok[];
  seo?: SeoStoryblok[];
  type?: string;
  _uid: string;
  component: "blog-overview";
  [k: string]: any;
}

export interface BlogPostStoryblok {
  head?: BlogHeadStoryblok[];
  aside?: BlogAsideStoryblok[];
  content?: string;
  cta?: CtaStoryblok[];
  seo?: SeoStoryblok[];
  type?: string;
  _uid: string;
  component: "blog-post";
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      target?: "_self" | "_blank";
      [k: string]: any;
    };

export interface BlogTeaserStoryblok {
  date?: string;
  tags?: TagsStoryblok[];
  headline?: string;
  teaserText?: string;
  image?: AssetStoryblok;
  link_url?: MultilinkStoryblok;
  link_label?: string;
  readingTime?: string;
  author_name?: string;
  author_title?: string;
  author_image?: AssetStoryblok;
  className?: string;
  type?: string;
  _uid: string;
  component: "blog-teaser";
  [k: string]: any;
}

export interface ButtonsStoryblok {
  label?: string;
  icon?: string;
  target?: MultilinkStoryblok;
  _uid: string;
  component: "buttons";
  [k: string]: any;
}

export interface CtaStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  highlightText?: boolean;
  colorNeutral?: boolean;
  fullWidth?: boolean;
  buttons?: ButtonsStoryblok[];
  backgroundColor?: string;
  backgroundImage?: AssetStoryblok;
  image_src?: AssetStoryblok;
  image_padding?: boolean;
  image_alt?: string;
  order_mobileImageLast?: boolean;
  order_desktopImageLast?: boolean;
  textAlign?: "" | "left" | "center";
  contentAlign?: "" | "center" | "top" | "bottom";
  type?: string;
  _uid: string;
  component: "cta";
  [k: string]: any;
}

export interface FaqStoryblok {
  questions?: QuestionsStoryblok[];
  type?: string;
  _uid: string;
  component: "faq";
  [k: string]: any;
}

export interface FeatureStoryblok {
  icon?: string;
  title?: string;
  text?: string;
  style?: "" | "intext" | "stack" | "centered" | "besideLarge" | "besideSmall";
  cta_target?: MultilinkStoryblok;
  cta_label?: string;
  cta_toggle?: boolean;
  cta_style?: "" | "button" | "link" | "intext";
  type?: string;
  _uid: string;
  component: "feature";
  [k: string]: any;
}

export interface FeaturesStoryblok {
  layout?: "" | "largeTiles" | "smallTiles" | "list";
  style?: "" | "intext" | "stack" | "centered" | "besideLarge" | "besideSmall";
  ctas_toggle?: boolean;
  ctas_style?: "" | "button" | "link" | "intext";
  feature?: FeatureStoryblok[];
  type?: string;
  _uid: string;
  component: "features";
  [k: string]: any;
}

export interface FooterStoryblok {
  logo_src?: AssetStoryblok;
  logo_alt?: string;
  logo_width?: string;
  logo_height?: string;
  logoHref?: MultilinkStoryblok;
  navItems?: NavItemsStoryblok[];
  type?: string;
  _uid: string;
  component: "footer";
  [k: string]: any;
}

export interface GalleryStoryblok {
  images?: ImagesStoryblok[];
  layout?: "" | "stack" | "smallTiles" | "largeTiles";
  aspectRatio?: "" | "unset" | "square" | "wide" | "landscape";
  lightbox?: boolean;
  type?: string;
  _uid: string;
  component: "gallery";
  [k: string]: any;
}

export interface HeaderStoryblok {
  logo_src?: AssetStoryblok;
  logo_alt?: string;
  logo_width?: string;
  logo_height?: string;
  logoHref?: MultilinkStoryblok;
  floating?: boolean;
  navItems?: NavItemsStoryblok[];
  type?: string;
  _uid: string;
  component: "header";
  [k: string]: any;
}

export interface ImagesStoryblok {
  src?: AssetStoryblok;
  alt?: string;
  caption?: string;
  _uid: string;
  component: "images";
  [k: string]: any;
}

export interface ImageTextStoryblok {
  text?: string;
  highlightText?: boolean;
  image_src?: AssetStoryblok;
  image_alt?: string;
  layout?: "" | "above" | "below" | "beside_right" | "beside_left";
  type?: string;
  _uid: string;
  component: "image-text";
  [k: string]: any;
}

export interface LogoStoryblok {
  src?: AssetStoryblok;
  alt?: string;
  type?: string;
  _uid: string;
  component: "logo";
  [k: string]: any;
}

export interface LogosStoryblok {
  tagline?: string;
  logo?: LogoStoryblok[];
  align?: "" | "left" | "center";
  logosPerRow?: string;
  cta_toggle?: boolean;
  cta_text?: string;
  cta_link?: MultilinkStoryblok;
  cta_label?: string;
  cta_style?: "" | "button" | "text";
  type?: string;
  _uid: string;
  component: "logos";
  [k: string]: any;
}

export interface NavItemsStoryblok {
  href?: MultilinkStoryblok;
  label?: string;
  active?: boolean;
  _uid: string;
  component: "navItems";
  [k: string]: any;
}

export interface PageStoryblok {
  section?: SectionStoryblok[];
  seo?: SeoStoryblok[];
  type?: string;
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface QuestionsStoryblok {
  question?: string;
  answer?: string;
  _uid: string;
  component: "questions";
  [k: string]: any;
}

export interface SectionStoryblok {
  width?: "" | "full" | "max" | "wide" | "default" | "narrow";
  style?:
    | ""
    | "stagelights"
    | "horizontalGradient"
    | "verticalGradient"
    | "accentTransition"
    | "boldTransition"
    | "symmetricGlow"
    | "anchorGlow";
  backgroundColor?: "" | "default" | "accent" | "bold";
  spotlight?: boolean;
  spaceBefore?: "" | "default" | "small" | "none";
  spaceAfter?: "" | "default" | "small" | "none";
  inverted?: boolean;
  headerSpacing?: boolean;
  headline_text?: string;
  headline_large?: boolean;
  headline_width?: "" | "unset" | "narrow" | "default" | "wide";
  headline_textAlign?: "" | "left" | "center" | "right";
  headline_align?: "" | "left" | "center" | "right";
  headline_sub?: string;
  headline_switchOrder?: boolean;
  content_width?: "" | "unset" | "narrow" | "default" | "wide";
  content_align?: "" | "left" | "center" | "right";
  content_gutter?: "" | "large" | "default" | "small" | "none";
  content_mode?: "" | "default" | "tile" | "list" | "slider";
  content_tileWidth?: "" | "smallest" | "default" | "medium" | "large" | "largest";
  components?: (
    | BlogTeaserStoryblok
    | CtaStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | ImageTextStoryblok
    | LogosStoryblok
    | StatsStoryblok
    | Tab0210B3AeEbb2467387F0Bab9555Ec309Storyblok
    | Tab1468E511C96840A1B267Ea720C1Ca9EdStoryblok
    | Tab8726807F12Bd4D53Ae343Df7360494C9Storyblok
    | TabB5Ece91F9Fc346FdBcfc107686351188Storyblok
    | TabFb45D4759Bc54D998Ba553C6149B34C0Storyblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
  )[];
  buttons?: ButtonsStoryblok[];
  type?: string;
  _uid: string;
  component: "section";
  [k: string]: any;
}

export interface SeoStoryblok {
  title?: string;
  description?: string;
  keywords?: string;
  image?: AssetStoryblok;
  cardImage?: string;
  type?: string;
  _uid: string;
  component: "seo";
  [k: string]: any;
}

export interface SettingsStoryblok {
  header?: HeaderStoryblok[];
  footer?: FooterStoryblok[];
  seo?: SeoStoryblok[];
  type?: string;
  _uid: string;
  component: "settings";
  [k: string]: any;
}

export interface SocialSharingStoryblok {
  icon?: string;
  href?: MultilinkStoryblok;
  title?: string;
  _uid: string;
  component: "socialSharing";
  [k: string]: any;
}

export interface StatStoryblok {
  number?: string;
  description?: string;
  title?: string;
  icon?: string;
  type?: string;
  _uid: string;
  component: "stat";
  [k: string]: any;
}

export interface StatsStoryblok {
  stat?: StatStoryblok[];
  type?: string;
  _uid: string;
  component: "stats";
  [k: string]: any;
}

export interface Tab0210B3AeEbb2467387F0Bab9555Ec309Storyblok {
  hero_headline?: string;
  hero_sub?: string;
  hero_text?: string;
  hero_highlightText?: boolean;
  hero_colorNeutral?: boolean;
  hero_height?: "" | "small" | "default" | "fullImage" | "fullScreen";
  hero_textbox?: boolean;
  hero_buttons?: ButtonsStoryblok[];
  hero_overlay?: boolean;
  "hero_tab-7ddc9fb5-a2a6-41a3-b779-114aaf465e66"?: any;
  image_srcMobile?: AssetStoryblok;
  image_srcTablet?: AssetStoryblok;
  image_srcDesktop?: AssetStoryblok;
  image_src?: AssetStoryblok;
  image_indent?: "" | "none" | "left" | "right";
  image_alt?: string;
  hero_textPosition?: "" | "center" | "below" | "left" | "right";
  hero_type?: string;
  _uid: string;
  component: "tab-0210b3ae-ebb2-4673-87f0-bab9555ec309";
  [k: string]: any;
}

export interface Tab1468E511C96840A1B267Ea720C1Ca9EdStoryblok {
  mosaic_layout?: "" | "alternate" | "textLeft" | "textRight";
  mosaic_largeHeadlines?: boolean;
  mosaic_tiles?: TilesStoryblok[];
  mosaic_type?: string;
  _uid: string;
  component: "tab-1468e511-c968-40a1-b267-ea720c1ca9ed";
  [k: string]: any;
}

export interface Tab8726807F12Bd4D53Ae343Df7360494C9Storyblok {
  "video-curtain_headline"?: string;
  "video-curtain_sub"?: string;
  "video-curtain_text"?: string;
  "video-curtain_highlightText"?: boolean;
  "video-curtain_colorNeutral"?: boolean;
  "video-curtain_buttons"?: ButtonsStoryblok[];
  "video-curtain_overlay"?: boolean;
  "video-curtain_tab-bf9d0675-1df7-4f54-8eef-07de14cbda68"?: any;
  video_srcMobile?: AssetStoryblok;
  video_srcTablet?: AssetStoryblok;
  video_srcDesktop?: AssetStoryblok;
  "video-curtain_textPosition"?: "" | "center" | "left" | "right";
  "video-curtain_type"?: string;
  _uid: string;
  component: "tab-8726807f-12bd-4d53-ae34-3df7360494c9";
  [k: string]: any;
}

export interface TabB5Ece91F9Fc346FdBcfc107686351188Storyblok {
  "image-story_headline"?: string;
  "image-story_largeHeadline"?: boolean;
  "image-story_sub"?: string;
  "image-story_text"?: string;
  "image-story_layout"?: "" | "textLeft" | "imageLeft";
  "image-story_padding"?: boolean;
  "image-story_buttons"?: ButtonsStoryblok[];
  "image-story_tab-e81d87ae-553a-4cb2-b064-750d3ecfd872"?: any;
  image_src?: AssetStoryblok;
  image_ratio?: "" | "VALUE_4_3" | "VALUE_3_2" | "VALUE_16_9" | "VALUE_1_1" | "none";
  image_alt?: string;
  "image-story_textAlign"?: "" | "left" | "center";
  "image-story_type"?: string;
  _uid: string;
  component: "tab-b5ece91f-9fc3-46fd-bcfc-107686351188";
  [k: string]: any;
}

export interface TabFb45D4759Bc54D998Ba553C6149B34C0Storyblok {
  slider_autoplay?: boolean;
  slider_nav?: boolean;
  slider_teaseNeighbours?: boolean;
  slider_equalHeight?: boolean;
  slider_gap?: string;
  slider_arrows?: boolean;
  slider_type?: string;
  slider_className?: string;
  slider_typeProp?: "" | "slider" | "carousel";
  _uid: string;
  component: "tab-fb45d475-9bc5-4d99-8ba5-53c6149b34c0";
  [k: string]: any;
}

export interface TagsStoryblok {
  entry?: string;
  _uid: string;
  component: "tags";
  [k: string]: any;
}

export interface TeaserCardStoryblok {
  headline?: string;
  text?: string;
  label?: string;
  layout?: "" | "stack" | "row";
  target?: MultilinkStoryblok;
  button_label?: string;
  button_chevron?: boolean;
  button_hidden?: boolean;
  image?: AssetStoryblok;
  imageRatio?: "" | "wide" | "landscape" | "square" | "unset";
  type?: string;
  _uid: string;
  component: "teaser-card";
  [k: string]: any;
}

export interface TestimonialStoryblok {
  quote?: string;
  name?: string;
  title?: string;
  image_src?: AssetStoryblok;
  image_alt?: string;
  rating?: string;
  type?: string;
  _uid: string;
  component: "testimonial";
  [k: string]: any;
}

export interface TestimonialsStoryblok {
  layout?: "" | "slider" | "list" | "alternating";
  testimonial?: TestimonialStoryblok[];
  type?: string;
  _uid: string;
  component: "testimonials";
  [k: string]: any;
}

export interface TextStoryblok {
  text?: string;
  layout?: "" | "singleColumn" | "multiColumn";
  align?: "" | "left" | "center";
  highlightText?: boolean;
  type?: string;
  _uid: string;
  component: "text";
  [k: string]: any;
}

export interface TilesStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  image_src?: AssetStoryblok;
  image_alt?: string;
  button_toggle?: boolean;
  button_label?: string;
  button_target?: MultilinkStoryblok;
  button_icon?: string;
  backgroundColor?: string;
  backgroundImage?: AssetStoryblok;
  textColor?: string;
  _uid: string;
  component: "tiles";
  [k: string]: any;
}
