import {StoryblokStory} from 'storyblok-generate-ts'

export interface BlogAsideStoryblok {
  author_name?: string;
  author_byline?: string;
  author_image?: string;
  author_twitter?: string;
  author_email?: string;
  socialSharing?: SocialSharingStoryblok[];
  readingTime?: string;
  date: string;
  type?: string;
  _uid: string;
  component: "blog-aside";
  [k: string]: any;
}

export interface BlogHeadStoryblok {
  date?: string;
  tags?: string;
  headline: string;
  image?: string;
  type?: string;
  _uid: string;
  component: "blog-head";
  [k: string]: any;
}

export interface BlogTeaserStoryblok {
  date?: string;
  tags?: string;
  headline: string;
  teaserText: string;
  image?: string;
  link_url?: string;
  link_label?: string;
  readingTime?: string;
  author_name?: string;
  author_title?: string;
  author_image?: string;
  type?: string;
  _uid: string;
  component: "blog-teaser";
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

export interface ButtonGroupStoryblok {
  button?: never[];
  colorNeutral?: boolean;
  size?: "" | "small" | "medium" | "large";
  arrangement?: "" | "left" | "center" | "right" | "space_between" | "grow";
  className?: string;
  type?: string;
  _uid: string;
  component: "button-group";
  [k: string]: any;
}

export interface ButtonsStoryblok {
  label?: string;
  icon?: string;
  target?: string;
  _uid: string;
  component: "buttons";
  [k: string]: any;
}

export interface ComponentTeaserStoryblok {
  title?: string;
  text?: string;
  label?: string;
  target?: string;
  image?: string;
  type?: string;
  _uid: string;
  component: "component-teaser";
  [k: string]: any;
}

export interface CtaStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  highlightText?: boolean;
  buttons?: ButtonsStoryblok[];
  textAlign?: "" | "left" | "center";
  type?: string;
  _uid: string;
  component: "cta";
  [k: string]: any;
}

export interface CtaPaidStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  highlightText?: boolean;
  colorNeutral?: boolean;
  fullWidth?: boolean;
  buttons?: ButtonsStoryblok[];
  backgroundColor?: string;
  backgroundImage?: string;
  image_src?: string;
  image_padding?: boolean;
  image_alt?: string;
  order_mobileImageLast?: boolean;
  order_desktopImageLast?: boolean;
  textAlign?: "" | "left" | "center";
  contentAlign?: "" | "center" | "top" | "bottom";
  type?: string;
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
  icon?: string;
  title?: string;
  text?: string;
  cta_target?: string;
  cta_label?: string;
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
  aspectRatio?: "" | "unset" | "square" | "wide" | "landscape";
  lightbox?: boolean;
  type?: string;
  _uid: string;
  component: "gallery";
  [k: string]: any;
}

export interface HeaderStoryblok {
  logo?: LogoStoryblok[];
  logoHref?: string;
  floating?: boolean;
  navItems?: NavItemsStoryblok[];
  type?: string;
  _uid: string;
  component: "header";
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
  sub?: string;
  text?: string;
  highlightText?: boolean;
  colorNeutral?: boolean;
  height?: "" | "small" | "default" | "fullImage" | "fullScreen";
  textbox?: boolean;
  buttons?: ButtonsStoryblok[];
  overlay?: boolean;
  image_srcMobile?: string;
  image_srcTablet?: string;
  image_srcDesktop?: string;
  image_src?: string;
  image_indent?: "" | "none" | "left" | "right";
  image_alt?: string;
  textPosition?: "" | "center" | "below" | "left" | "right";
  type?: string;
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
  aspectRatio?: "" | "unset" | "square" | "wide" | "landscape";
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
  src?: string;
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
  button?: never[];
  image_src?: string;
  image_ratio?: "" | "VALUE_4_3" | "VALUE_3_2" | "VALUE_16_9" | "VALUE_1_1" | "none";
  image_alt?: string;
  textAlign?: "" | "left" | "center";
  type?: string;
  _uid: string;
  component: "image-story";
  [k: string]: any;
}

export interface ImageTextStoryblok {
  text: string;
  highlightText?: boolean;
  image_src?: string;
  image_alt?: string;
  layout?: "" | "above" | "below" | "beside_right" | "beside_left";
  type?: string;
  _uid: string;
  component: "image-text";
  [k: string]: any;
}

export interface ItemsStoryblok {
  href?: string;
  label?: string;
  _uid: string;
  component: "items";
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
  src?: string;
  alt?: string;
  _uid: string;
  component: "logos";
  [k: string]: any;
}

export interface LogosPaidStoryblok {
  tagline?: string;
  logos?: LogosStoryblok[];
  align?: "" | "left" | "center";
  logosPerRow?: string;
  cta_toggle?: boolean;
  cta_text?: string;
  cta_link?: string;
  cta_label?: string;
  cta_style?: "" | "button" | "text";
  type?: string;
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

export interface NavMainStoryblok {
  logo?: LogoStoryblok[];
  logoHref?: string;
  items?: ItemsStoryblok[];
  type?: string;
  _uid: string;
  component: "nav-main";
  [k: string]: any;
}

export interface PageStoryblok {
  id: string;
  slug: string;
  layout?: "" | "default" | "content" | "blog_list" | "blog_detail" | "glossary";
  section?: never[];
  updated?: string;
  created?: string;
  seo?: SeoStoryblok[];
  type?: string;
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface PageIntroStoryblok {
  headline?: string;
  sub?: string;
  link_href?: string;
  link_label?: string;
  type?: string;
  _uid: string;
  component: "page-intro";
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
  content_tileWidth?: "" | "control" | "card" | "narrow" | "medium" | "wide";
  components?: never[];
  button?: never[];
  type?: string;
  _uid: string;
  component: "section";
  [k: string]: any;
}

export interface SeoStoryblok {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
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
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  cardImage?: string;
  type?: string;
  _uid: string;
  component: "settings";
  [k: string]: any;
}

export interface SliderStoryblok {
  autoplay?: boolean;
  nav?: boolean;
  perView?: string;
  gap?: string;
  arrows?: boolean;
  type?: string;
  className?: string;
  typeProp?: "" | "slider" | "carousel";
  _uid: string;
  component: "slider";
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
  number?: string;
  description?: string;
  title?: string;
  _uid: string;
  component: "stats";
  [k: string]: any;
}

export interface StatsPaidStoryblok {
  stats?: StatsStoryblok[];
  type?: string;
  _uid: string;
  component: "stats-paid";
  [k: string]: any;
}

export interface TeaserCardStoryblok {
  headline?: string;
  text?: string;
  label?: string;
  layout?: "" | "stack" | "row";
  target?: string;
  displayButton?: boolean;
  image?: string;
  imageRatio?: "" | "wide" | "landscape" | "square" | "unset";
  type?: string;
  _uid: string;
  component: "teaser-card";
  [k: string]: any;
}

export interface TestimonialsStoryblok {
  quote: string;
  name?: string;
  title?: string;
  image_src?: string;
  image_alt?: string;
  _uid: string;
  component: "testimonials";
  [k: string]: any;
}

export interface TestimonialsPaidStoryblok {
  layout?: "" | "slider" | "list" | "alternating";
  testimonials?: TestimonialsStoryblok[];
  type?: string;
  _uid: string;
  component: "testimonials-paid";
  [k: string]: any;
}

export interface TextStoryblok {
  text: string;
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
  image_src?: string;
  image_alt?: string;
  button_toggle?: boolean;
  button_label?: string;
  button_target?: string;
  button_icon?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  textColor?: string;
  _uid: string;
  component: "tiles";
  [k: string]: any;
}

export interface VideoCurtainStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  highlightText?: boolean;
  colorNeutral?: boolean;
  buttons?: ButtonsStoryblok[];
  overlay?: boolean;
  video_srcMobile?: string;
  video_srcTablet?: string;
  video_srcDesktop?: string;
  textPosition?: "" | "center" | "left" | "right";
  type?: string;
  _uid: string;
  component: "video-curtain";
  [k: string]: any;
}
