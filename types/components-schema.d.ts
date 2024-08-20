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
  section?: SectionStoryblok[];
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
  logo_srcInverted?: AssetStoryblok;
  logo_alt?: string;
  logo_homepageHref?: MultilinkStoryblok;
  logo_width?: string;
  logo_height?: string;
  byline?: string;
  inverted?: boolean;
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
  logo_srcInverted?: AssetStoryblok;
  logo_alt?: string;
  logo_homepageHref?: MultilinkStoryblok;
  logo_width?: string;
  logo_height?: string;
  flyoutInverted?: boolean;
  floating?: boolean;
  inverted?: boolean;
  navItems?: NavItemsStoryblok[];
  type?: string;
  _uid: string;
  component: "header";
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
  image_srcMobile?: AssetStoryblok;
  image_srcTablet?: AssetStoryblok;
  image_srcDesktop?: AssetStoryblok;
  image_src?: AssetStoryblok;
  image_indent?: "" | "none" | "left" | "right";
  image_alt?: string;
  textPosition?: "" | "center" | "below" | "left" | "right";
  type?: string;
  _uid: string;
  component: "hero";
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

export interface ImageStoryStoryblok {
  headline?: string;
  largeHeadline?: boolean;
  sub?: string;
  text?: string;
  layout?: "" | "textLeft" | "imageLeft";
  padding?: boolean;
  buttons?: ButtonsStoryblok[];
  image_src?: AssetStoryblok;
  image_aspectRatio?: "" | "unset" | "square" | "wide" | "landscape";
  image_alt?: string;
  image_vAlign?: "" | "center" | "top" | "bottom";
  textAlign?: "" | "left" | "center";
  type?: string;
  _uid: string;
  component: "image-story";
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

export interface MosaicStoryblok {
  layout?: "" | "alternate" | "textLeft" | "textRight";
  largeHeadlines?: boolean;
  tile?: TileStoryblok[];
  type?: string;
  _uid: string;
  component: "mosaic";
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
  header_floating?: boolean;
  header_inverted?: boolean;
  footer_inverted?: boolean;
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
    | HeroStoryblok
    | ImageStoryStoryblok
    | ImageTextStoryblok
    | LogosStoryblok
    | MosaicStoryblok
    | SliderStoryblok
    | StatsStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
    | VideoCurtainStoryblok
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
  cardImage?: AssetStoryblok;
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

export interface SliderStoryblok {
  autoplay?: boolean;
  nav?: boolean;
  teaseNeighbours?: boolean;
  equalHeight?: boolean;
  gap?: string;
  arrows?: boolean;
  type?: string;
  className?: string;
  components?: (
    | BlogTeaserStoryblok
    | CtaStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeroStoryblok
    | ImageStoryStoryblok
    | ImageTextStoryblok
    | LogosStoryblok
    | MosaicStoryblok
    | SliderStoryblok
    | StatsStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
    | VideoCurtainStoryblok
  )[];
  typeProp?: "" | "slider" | "carousel";
  _uid: string;
  component: "slider";
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

export interface TileStoryblok {
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
  type?: string;
  _uid: string;
  component: "tile";
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
  video_srcMobile?: AssetStoryblok;
  video_srcTablet?: AssetStoryblok;
  video_srcDesktop?: AssetStoryblok;
  textPosition?: "" | "center" | "left" | "right";
  type?: string;
  _uid: string;
  component: "video-curtain";
  [k: string]: any;
}
