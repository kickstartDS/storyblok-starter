import { StoryblokStory } from "storyblok-generate-ts";

export interface BlogAsideStoryblok {
  socialSharing?: SocialSharingStoryblok[];
  readingTime?: string;
  date: string;
  type?: string;
  author_name?: string;
  author_byline?: string;
  author_image?: string;
  author_twitter?: string;
  author_email?: string;
  _uid: string;
  component: "blog-aside";
  [k: string]: any;
}

export interface ButtonStoryblok {
  label: string;
  target?: string;
  variant?: "" | "primary" | "secondary" | "tertiary";
  icon?: string;
  size?: "" | "small" | "medium" | "large";
  disabled?: boolean;
  type?: string;
  _uid: string;
  component: "button";
  [k: string]: any;
}

export interface ButtonsStoryblok {
  label?: string;
  target?: string;
  icon?: string;
  _uid: string;
  component: "buttons";
  [k: string]: any;
}

export interface CtaStoryblok {
  headline?: string;
  largeHeadline?: boolean;
  sub?: string;
  text?: string;
  buttons?: never[];
  align?: "" | "left" | "center";
  type?: string;
  _uid: string;
  component: "cta";
  [k: string]: any;
}

export interface CtaPaidStoryblok {
  headline?: string;
  largeHeadline?: boolean;
  sub?: string;
  text?: string;
  fullWidth?: boolean;
  buttons?: never[];
  backgroundColor?: string;
  backgroundImage?: string;
  align?: "" | "left" | "center";
  type?: string;
  image_source?: string;
  image_ratio?:
    | ""
    | "VALUE_4_3"
    | "VALUE_3_2"
    | "VALUE_16_9"
    | "VALUE_1_1"
    | "none";
  image_vAlign?: "" | "center" | "top" | "top_edge" | "bottom" | "bottom_edge";
  image_hAlign?: "" | "center" | "left" | "left_edge" | "right" | "right_edge";
  image_order?: any;
  image_alt?: string;
  image_order_mobileImageLast?: boolean;
  image_order_desktopImageLast?: boolean;
  _uid: string;
  component: "cta-paid";
  [k: string]: any;
}

export interface FaqStoryblok {
  questions?: QuestionsStoryblok[];
  type?: string;
  _uid: string;
  component: "faq";
  [k: string]: any;
}

export interface FeaturesStoryblok {
  layout?: "" | "largeTiles" | "smallTiles" | "list";
  style?: "" | "intext" | "stack" | "centered" | "besideLarge" | "besideSmall";
  features?: never[];
  type?: string;
  ctas_toggle?: boolean;
  ctas_style?: "" | "button" | "link" | "intext";
  _uid: string;
  component: "features";
  [k: string]: any;
}

export interface FooterStoryblok {
  logo?: LogoStoryblok[];
  logoHref?: string;
  navItems?: NavItemsStoryblok[];
  type?: string;
  _uid: string;
  component: "footer";
  [k: string]: any;
}

export interface GalleryStoryblok {
  images?: ImagesStoryblok[];
  layout?: "" | "stack" | "smallTiles" | "largeTiles";
  type?: string;
  _uid: string;
  component: "gallery";
  [k: string]: any;
}

export interface HeadlineStoryblok {
  text: string;
  sub?: string;
  switchOrder?: boolean;
  align?: "" | "left" | "center" | "right";
  level?: "" | "h1" | "h2" | "h3" | "h4" | "p";
  style?: "" | "h1" | "h2" | "h3" | "h4" | "p";
  spaceAfter?: "" | "minimum" | "small" | "large";
  className?: string;
  type?: string;
  _uid: string;
  component: "headline";
  [k: string]: any;
}

export interface HeroStoryblok {
  headline?: string;
  largeHeadline?: boolean;
  sub?: string;
  text?: string;
  height?: "" | "small" | "default" | "fullImage" | "fullScreen";
  textbox?: boolean;
  buttons?: never[];
  overlay?: boolean;
  textPosition?: "" | "center" | "below" | "left" | "right";
  type?: string;
  image_srcMobile?: string;
  image_srcTablet?: string;
  image_srcDesktop?: string;
  image_src?: string;
  image_indent?: "" | "none" | "left" | "right";
  image_alt?: string;
  _uid: string;
  component: "hero";
  [k: string]: any;
}

export interface ImageStoryblok {
  src?: string;
  srcSet?: string;
  alt?: string;
  width?: string;
  height?: string;
  className?: string;
  style?: string;
  lazy?: boolean;
  sources?: SourcesStoryblok[];
  pictureClassName?: string;
  type?: string;
  _uid: string;
  component: "image";
  [k: string]: any;
}

export interface ImagesStoryblok {
  url?: string;
  alt?: string;
  caption?: string;
  _uid: string;
  component: "images";
  [k: string]: any;
}

export interface ImageStoryStoryblok {
  headline?: string;
  largeHeadline?: boolean;
  sub?: string;
  text?: string;
  layout?: "" | "textLeft" | "imageLeft";
  padding?: boolean;
  buttons?: never[];
  textAlign?: "" | "left" | "center";
  type?: string;
  image_source?: string;
  image_ratio?:
    | ""
    | "VALUE_4_3"
    | "VALUE_3_2"
    | "VALUE_16_9"
    | "VALUE_1_1"
    | "none";
  image_alt?: string;
  _uid: string;
  component: "image-story";
  [k: string]: any;
}

export interface ImageTextStoryblok {
  text: string;
  layout?: "" | "above" | "below" | "beside_right" | "beside_left";
  type?: string;
  image_source?: string;
  image_alt?: string;
  _uid: string;
  component: "imageText";
  [k: string]: any;
}

export interface LogoStoryblok {
  src?: string;
  srcSet?: string;
  alt?: string;
  width?: string;
  height?: string;
  className?: string;
  component: "logo";
  id?: string;
  itemProp?: string;
  style?: string;
  noscript?: boolean;
  lazy?: boolean;
  sources?: SourcesStoryblok[];
  pictureClassName?: string;
  type?: string;
  _uid: string;
  [k: string]: any;
}

export interface LogosStoryblok {
  tagline?: string;
  logos?: never[];
  align?: "" | "left" | "center";
  type?: string;
  cta_toggle?: boolean;
  cta_text?: string;
  cta_link?: string;
  cta_label?: string;
  cta_style?: "" | "button" | "text";
  _uid: string;
  component: "logos";
  [k: string]: any;
}

export interface LogosPaidStoryblok {
  tagline?: string;
  logos?: never[];
  align?: "" | "left" | "center";
  logosPerRow?: string;
  type?: string;
  cta_toggle?: boolean;
  cta_text?: string;
  cta_link?: string;
  cta_label?: string;
  cta_style?: "" | "button" | "text";
  _uid: string;
  component: "logos-paid";
  [k: string]: any;
}

export interface MosaicStoryblok {
  layout?: "" | "alternate" | "textLeft" | "textRight";
  largeHeadlines?: boolean;
  tiles?: TilesStoryblok[];
  type?: string;
  _uid: string;
  component: "mosaic";
  [k: string]: any;
}

export interface NavItemsStoryblok {
  href?: string;
  label?: string;
  target?: string;
  _uid: string;
  component: "navItems";
  [k: string]: any;
}

export interface PageStoryblok {
  sections?: SectionStoryblok[];
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
  style?: "" | "default" | "accent" | "bold" | "stagelights" | "gradient";
  spaceBefore?: "" | "default" | "small" | "none";
  spaceAfter?: "" | "default" | "small" | "none";
  inverted?: boolean;
  components?: (CtaStoryblok | HeroStoryblok | MosaicStoryblok)[];
  buttons?: never[];
  type?: string;
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
  content_mode?: "" | "default" | "tile" | "list";
  _uid: string;
  component: "section";
  [k: string]: any;
}

export interface SocialSharingStoryblok {
  icon?: string;
  href?: string;
  title?: string;
  _uid: string;
  component: "socialSharing";
  [k: string]: any;
}

export interface SourcesStoryblok {
  srcSet?: string;
  media?: string;
  type?: string;
  _uid: string;
  component: "sources";
  [k: string]: any;
}

export interface SplitStoryblok {
  layout?: "" | "sidebarRight" | "sidebarLeft" | "even";
  type?: string;
  _uid: string;
  component: "split";
  [k: string]: any;
}

export interface StatsStoryblok {
  stats?: never[];
  type?: string;
  _uid: string;
  component: "stats";
  [k: string]: any;
}

export interface StatsPaidStoryblok {
  stats?: never[];
  type?: string;
  _uid: string;
  component: "stats-paid";
  [k: string]: any;
}

export interface TeaserCardStoryblok {
  headline?: string;
  text?: string;
  target?: string;
  image?: string;
  inverted?: boolean;
  type?: string;
  _uid: string;
  component: "teaser-card";
  [k: string]: any;
}

export interface TestimonialsStoryblok {
  testimonials?: never[];
  type?: string;
  _uid: string;
  component: "testimonials";
  [k: string]: any;
}

export interface TestimonialsPaidStoryblok {
  testimonials?: never[];
  type?: string;
  _uid: string;
  component: "testimonials-paid";
  [k: string]: any;
}

export interface TextStoryblok {
  text: string;
  layout?: "" | "singleColumn" | "multiColumn";
  align?: "" | "left" | "center";
  style?: "" | "highlight" | "default";
  type?: string;
  _uid: string;
  component: "text";
  [k: string]: any;
}

export interface TilesStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  image?: string;
  backgroundColor?: string;
  textColor?: string;
  button_toggle?: boolean;
  button_label?: string;
  button_target?: string;
  button_icon?: string;
  _uid: string;
  component: "tiles";
  [k: string]: any;
}

export interface VideoCurtainStoryblok {
  headline?: string;
  largeHeadline?: boolean;
  sub?: string;
  text?: string;
  buttons?: never[];
  overlay?: boolean;
  textPosition?: "" | "center" | "left" | "right";
  type?: string;
  video_srcMobile?: string;
  video_srcTablet?: string;
  video_srcDesktop?: string;
  _uid: string;
  component: "video-curtain";
  [k: string]: any;
}
