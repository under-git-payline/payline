// Types for ACF flexible content data

export interface MediaDetails {
  width: number;
  height: number;
}

export interface MediaItem {
  node: {
    altText: string;
    uri: string;
    sourceUrl: string;
    title?: string;
    mediaDetails?: MediaDetails;
    __typename: string;
  };
  __typename: string;
}

export interface CtaLink {
  target: string;
  title: string;
  url: string;
  __typename: string;
}

export interface HomepageHeroLayoutData {
  subtitle: string;
  tag: string;
  title: string;
  fieldGroupName: string;
  image: MediaItem;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  __typename: string;
}

export interface TrustedByIcon {
  fieldGroupName: string;
  icon: MediaItem;
  __typename: string;
}

export interface TrustedByLayoutData {
  content: string;
  fieldGroupName: string;
  tag: string;
  icons: TrustedByIcon[];
  __typename: string;
}

export interface CardItem {
  title: string;
  content: string;
  link: CtaLink;
  image: MediaItem;
  style?: string;
  __typename: string;
}

export interface CardsLayoutData {
  fieldGroupName: string;
  tag: string;
  title: string;
  subtitle: string;
  cards: CardItem[];
  __typename: string;
}

export interface CalculatorLayoutData {
  fieldGroupName: string;
  tag: string;
  title: string;
  subtitle: string;
  smallPrint: string;
  __typename: string;
}

export interface TestimonialItem {
  author: string;
  fieldGroupName: string;
  role: string;
  testimonial: string;
  avatar: MediaItem;
  __typename: string;
}

export interface CustomerIcon {
  icon: MediaItem;
  fieldGroupName: string;
  __typename: string;
}

export interface TestimonialsLayoutData {
  description: string;
  fieldGroupName: string;
  tag: string;
  title: string;
  testimonials: TestimonialItem[];
  customerIcons: CustomerIcon[];
  __typename: string;
}

export interface OurTeamLayoutData {
  fieldGroupName: string;
  tag: string;
  title: string;
  description: string;
  reverse: boolean;
  cta: CtaLink;
  image: MediaItem;
  __typename: string;
}

export interface HeroLayoutData {
  fieldGroupName: string;
  tag: string;
  title: string;
  description: string;
  cta: CtaLink;
  image: MediaItem;
  addCalculator: boolean;
  addForm: boolean;
  formId: string;
  __typename: string;
}

export interface ProductCardItem {
  image: MediaItem;
  title: string;
  price: string;
  description: string;
  cta: CtaLink;
  __typename: string;
}

export interface ProductCardsLayoutData {
  fieldGroupName: string;
  title: string;
  subtitle: string;
  products: ProductCardItem[];
  __typename: string;
}

export interface FeatureCardItem {
  icon: MediaItem;
  title: string;
  description: string;
  __typename: string;
}

export interface FeatureCardsLayoutData {
  fieldGroupName: string;
  title: string;
  subtitle: string;
  featureCard: FeatureCardItem[];
  __typename: string;
}

export interface OverlappingImagesLayoutData {
  fieldGroupName: string;
  title: string;
  description: string;
  largeImage: MediaItem;
  smallImage: MediaItem;
  __typename: string;
}

export interface FeatureBoxItem {
  title: string;
  description: string;
  __typename: string;
}

export interface FeatureBoxesLayoutData {
  fieldGroupName: string;
  title: string;
  subtitle: string;
  boxes: FeatureBoxItem[];
  removeBackground: boolean;
  __typename: string;
}

export interface SolutionItem {
  title: string;
  description: string;
  cta: CtaLink;
  image: MediaItem;
  __typename: string;
}

export interface ExploreSolutionsLayoutData {
  fieldGroupName: string;
  title: string;
  subtitle: string;
  solutions: SolutionItem[];
  __typename: string;
}

export interface GetStartedLayoutData {
  fieldGroupName: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaWhite: CtaLink;
  ctaBlue: CtaLink;
  image: MediaItem;
  __typename: string;
}

export interface TwoColumnContentLayoutData {
  fieldGroupName: string;
  tag: string;
  title: string;
  content: string;
  cta: CtaLink;
  image: MediaItem;
  reverse: boolean;
  background: boolean;
  __typename: string;
}

export interface FreeContentLayoutData {
  content: string;
  __typename: string;
}

export interface BoxedContentLayoutData {
  title: string;
  content: string;
  image: MediaItem;
  reverse: boolean;
  __typename: string;
}

export interface JourneyTimelineLayoutData {
  tag: string;
  title: string;
  description: string;
  timeline: {
    tag: string;
    title: string;
    description: string;
    image: MediaItem;
  }[];
  __typename: string;
}

export interface CenterCardItem {
  title: string;
  description: string;
  __typename: string;
}

export interface CenteredCardsLayoutData {
  tag: string;
  title: string;
  description: string;
  centerCard: CenterCardItem[];
  __typename: string;
}

export interface DarkCtaLayoutData {
  content: string;
  ctaBlue: CtaLink;
  ctaGrey: CtaLink;
  __typename: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  __typename: string;
}

export interface FaqsLayoutData {
  fieldGroupName?: string;
  tag: string;
  title: string;
  faqs: FaqItem[];
  __typename: string;
}

export interface ComparisonFeatureItem {
  feature: string;
  yourOldProcessor: boolean;
  payline: boolean;
  __typename: string;
}

export interface ComparisonTableLayoutData {
  fieldGroupName?: string;
  tag: string;
  title: string;
  description: string;
  featuresTable: ComparisonFeatureItem[];
  __typename: string;
}

export type FlexibleContentData = 
  | HomepageHeroLayoutData
  | TrustedByLayoutData
  | CardsLayoutData
  | CalculatorLayoutData
  | TestimonialsLayoutData
  | OurTeamLayoutData
  | HeroLayoutData
  | ProductCardsLayoutData
  | FeatureCardsLayoutData
  | OverlappingImagesLayoutData
  | FeatureBoxesLayoutData
  | ExploreSolutionsLayoutData
  | GetStartedLayoutData
  | TwoColumnContentLayoutData
  | FreeContentLayoutData
  | BoxedContentLayoutData
  | JourneyTimelineLayoutData
  | CenteredCardsLayoutData
  | DarkCtaLayoutData
  | FaqsLayoutData
  | ComparisonTableLayoutData;

export interface FlexibleContentProps {
  data?: FlexibleContentData;
}
