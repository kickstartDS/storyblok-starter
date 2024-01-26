import {StoryblokStory} from 'storyblok-generate-ts'

export interface BlogAsideStoryblok {
  author_name?: string;
  author_byline?: string;
  author_image?: string;
  author_twitter?: string;
  author_email?: string;
  socialSharing?: SocialSharingStoryblok[];
  readingTime?: string;
  date?: string;
  type?: string;
  _uid: string;
  component: "blog-aside";
  [k: string]: any;
}

export interface BlogHeadStoryblok {
  date?: string;
  tags?: string;
  headline?: string;
  image?: string;
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

export interface BlogTeaserStoryblok {
  date?: string;
  tags?: string;
  headline?: string;
  teaserText?: string;
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
  label?: string;
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
  icon?: string;
  target?: string;
  _uid: string;
  component: "buttons";
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
  cta_target?: string;
  cta_label?: string;
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
  logo?: PictureStoryblok[];
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
  logo?: PictureStoryblok[];
  logoHref?: string;
  floating?: boolean;
  navItems?: NavItemsStoryblok[];
  type?: string;
  _uid: string;
  component: "header";
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

export interface ImageTextStoryblok {
  text?: string;
  highlightText?: boolean;
  image_src?: string;
  image_alt?: string;
  layout?: "" | "above" | "below" | "beside_right" | "beside_left";
  type?: string;
  _uid: string;
  component: "image-text";
  [k: string]: any;
}

export interface LogoStoryblok {
  src?: string;
  alt?: string;
  _uid: string;
  component: "logo";
  [k: string]: any;
}

export interface LogosStoryblok {
  tagline?: string;
  logo?: LogoStoryblok[];
  align?: "" | "left" | "center";
  cta_toggle?: boolean;
  cta_text?: string;
  cta_link?: string;
  cta_label?: string;
  cta_style?: "" | "button" | "text";
  type?: string;
  _uid: string;
  component: "logos";
  [k: string]: any;
}

export interface NavItemsStoryblok {
  href?: string;
  label?: string;
  _uid: string;
  component: "navItems";
  [k: string]: any;
}

export interface PageStoryblok {
  sections?: SectionStoryblok[];
  seo?: SeoStoryblok[];
  type?: string;
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface PictureStoryblok {
  src?: string;
  srcSet?: string;
  alt?: string;
  width?: string;
  height?: string;
  className?: string;
  component: "picture";
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
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | ImageTextStoryblok
    | LogosStoryblok
    | StatsStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
  )[];
  buttons?: ButtonStoryblok[];
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
  type?: string;
  _uid: string;
  component: "settings";
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

export interface StatStoryblok {
  number?: string;
  description?: string;
  title?: string;
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

export interface TeaserCardStoryblok {
  headline?: string;
  text?: string;
  label?: string;
  layout?: "" | "stack" | "row";
  target?: string;
  button_label?: string;
  button_chevron?: boolean;
  button_hidden?: boolean;
  image?: string;
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
  image_src?: string;
  image_alt?: string;
  _uid: string;
  component: "testimonial";
  [k: string]: any;
}

export interface TestimonialsStoryblok {
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
