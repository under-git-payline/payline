export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  author: {
    node: {
      name: string;
      avatar: {
        url: string;
      };
    };
  };
  categories?: {
    nodes: Category[];
  };
  seo?: {
    title?: string;
    metaDesc?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface PostsQuery {
  posts: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
      total?: number;
    };
    nodes: Post[];
  };
}

export interface Page {
  id: string;
  title: string;
  content: string;
  slug: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export interface TeamMember {
  id: string;
  title: string;
  content: string;
  slug: string;
  teamMemberFields?: {
    name: string;
    position: string;
    bio: string;
    image: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export interface HeroSection {
  id: string;
  title: string;
  content: string;
  heroFields?: {
    headline: string;
    subheadline: string;
    description: string;
    primaryButtonText: string;
    primaryButtonUrl: string;
    secondaryButtonText: string;
    secondaryButtonUrl: string;
    heroImage: {
      sourceUrl: string;
      altText: string;
    };
    tagline: string;
  };
}

export interface Testimonial {
  id: string;
  title: string;
  content: string;
  testimonialFields?: {
    clientName: string;
    clientCompany: string;
    clientPosition: string;
    testimonialText: string;
    clientImage: {
      sourceUrl: string;
      altText: string;
    };
    rating: number;
  };
}
