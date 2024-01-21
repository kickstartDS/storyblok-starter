import {StoryblokStory} from 'storyblok-generate-ts'

export interface BlogAsideReferenceStoryblok {
  author_name?: string;
  author_byline?: string;
  author_image?: string;
  author_twitter?: string;
  author_email?: string;
  socialSharing?: SocialSharingEntryStoryblok[];
  readingTime?: string;
  date?: string;
  type?: string;
  _uid: string;
  component: "blog-aside-reference";
  [k: string]: any;
}

export interface BlogHeadReferenceStoryblok {
  date?: string;
  tags?: string;
  headline?: string;
  image?: string;
  type?: string;
  _uid: string;
  component: "blog-head-reference";
  [k: string]: any;
}

export interface BlogOverviewStoryblok {
  latest?: BlogTeaserReferenceStoryblok[];
  list?: BlogTeaserStoryblok[];
  more?: BlogTeaserStoryblok[];
  cta?: CtaReferenceStoryblok[];
  seo?: SeoReferenceStoryblok[];
  type?: string;
  _uid: string;
  component: "blog-overview";
  [k: string]: any;
}

export interface BlogPostStoryblok {
  head?: BlogHeadReferenceStoryblok[];
  aside?: BlogAsideReferenceStoryblok[];
  content?: string;
  cta?: CtaReferenceStoryblok[];
  seo?: SeoReferenceStoryblok[];
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

export interface BlogTeaserReferenceStoryblok {
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
  component: "blog-teaser-reference";
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

export interface ButtonsEntryStoryblok {
  label?: string;
  icon?: string;
  target?: string;
  _uid: string;
  component: "buttons-entry";
  [k: string]: any;
}

export interface CtaStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  highlightText?: boolean;
  buttons?: ButtonsEntryStoryblok[];
  textAlign?: "" | "left" | "center";
  type?: string;
  _uid: string;
  component: "cta";
  [k: string]: any;
}

export interface CtaReferenceStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  highlightText?: boolean;
  buttons?: ButtonsEntryStoryblok[];
  textAlign?: "" | "left" | "center";
  type?: string;
  _uid: string;
  component: "cta-reference";
  [k: string]: any;
}

export interface FaqStoryblok {
  questions?: QuestionsEntryStoryblok[];
  type?: string;
  _uid: string;
  component: "faq";
  [k: string]: any;
}

export interface FeaturesStoryblok {
  layout?: "" | "largeTiles" | "smallTiles" | "list";
  style?: "" | "intext" | "stack" | "centered" | "besideLarge" | "besideSmall";
  ctas_toggle?: boolean;
  ctas_style?: "" | "button" | "link" | "intext";
  features?: FeaturesEntryStoryblok[];
  type?: string;
  _uid: string;
  component: "features";
  [k: string]: any;
}

export interface FeaturesEntryStoryblok {
  icon?: string;
  title?: string;
  text?: string;
  cta_target?: string;
  cta_label?: string;
  _uid: string;
  component: "features-entry";
  [k: string]: any;
}

export interface FooterReferenceStoryblok {
  logo?: PictureReferenceStoryblok[];
  logoHref?: string;
  navItems?: NavItemsEntryStoryblok[];
  type?: string;
  _uid: string;
  component: "footer-reference";
  [k: string]: any;
}

export interface GalleryStoryblok {
  images?: ImagesEntryStoryblok[];
  layout?: "" | "stack" | "smallTiles" | "largeTiles";
  aspectRatio?: "" | "unset" | "square" | "wide" | "landscape";
  lightbox?: boolean;
  type?: string;
  _uid: string;
  component: "gallery";
  [k: string]: any;
}

export interface HeaderReferenceStoryblok {
  logo?: PictureReferenceStoryblok[];
  logoHref?: string;
  floating?: boolean;
  navItems?: NavItemsEntryStoryblok[];
  type?: string;
  _uid: string;
  component: "header-reference";
  [k: string]: any;
}

export interface ImagesEntryStoryblok {
  src?: string;
  alt?: string;
  caption?: string;
  _uid: string;
  component: "images-entry";
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

export interface LogosStoryblok {
  tagline?: string;
  logos?: LogosEntryStoryblok[];
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

export interface LogosEntryStoryblok {
  src?: string;
  alt?: string;
  _uid: string;
  component: "logos-entry";
  [k: string]: any;
}

export interface NavItemsEntryStoryblok {
  href?: string;
  label?: string;
  _uid: string;
  component: "navItems-entry";
  [k: string]: any;
}

export interface PageStoryblok {
  sections?: SectionStoryblok[];
  seo?: SeoReferenceStoryblok[];
  type?: string;
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface PictureReferenceStoryblok {
  src?: string;
  srcSet?: string;
  alt?: string;
  width?: string;
  height?: string;
  className?: string;
  component: "picture-reference";
  id?: string;
  itemProp?: string;
  style?: string;
  noscript?: boolean;
  lazy?: boolean;
  sources?: SourcesEntryStoryblok[];
  pictureClassName?: string;
  type?: string;
  _uid: string;
  [k: string]: any;
}

export interface QuestionsEntryStoryblok {
  question?: string;
  answer?: string;
  _uid: string;
  component: "questions-entry";
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
    | CtaStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | ImageTextStoryblok
    | LogosStoryblok
    | SplitStoryblok
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

export interface SeoReferenceStoryblok {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  cardImage?: string;
  type?: string;
  _uid: string;
  component: "seo-reference";
  [k: string]: any;
}

export interface SettingsStoryblok {
  header?: HeaderReferenceStoryblok[];
  footer?: FooterReferenceStoryblok[];
  seo?: SeoReferenceStoryblok[];
  type?: string;
  _uid: string;
  component: "settings";
  [k: string]: any;
}

export interface SocialSharingEntryStoryblok {
  icon?: string;
  href?: string;
  title?: string;
  _uid: string;
  component: "socialSharing-entry";
  [k: string]: any;
}

export interface SourcesEntryStoryblok {
  srcSet?: string;
  media?: string;
  type?: string;
  _uid: string;
  component: "sources-entry";
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
  stats?: StatsEntryStoryblok[];
  type?: string;
  _uid: string;
  component: "stats";
  [k: string]: any;
}

export interface StatsEntryStoryblok {
  number?: string;
  description?: string;
  title?: string;
  _uid: string;
  component: "stats-entry";
  [k: string]: any;
}

export interface TeaserCardStoryblok {
  headline?: string;
  text?: string;
  label?: string;
  layout?: "" | "stack" | "row";
  target?: string;
  button_label?: string;
  button_displayButton?: boolean;
  image?: string;
  imageRatio?: "" | "wide" | "landscape" | "square" | "unset";
  type?: string;
  _uid: string;
  component: "teaser-card";
  [k: string]: any;
}

export interface TestimonialsStoryblok {
  testimonials?: TestimonialsEntryStoryblok[];
  type?: string;
  _uid: string;
  component: "testimonials";
  [k: string]: any;
}

export interface TestimonialsEntryStoryblok {
  quote?: string;
  name?: string;
  title?: string;
  image_src?: string;
  image_alt?: string;
  _uid: string;
  component: "testimonials-entry";
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
