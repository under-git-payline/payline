import { gql } from '@apollo/client';
import client from './apollo-client';

export const GET_PAGE_BLOCKS = gql`
  query PageBlocks($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Page {
        id
        title
        seo {
          title
          metaDesc
        }
        pageBlocks {
          pageBlocks {
            ... on PageBlocksPageBlocksHomepageHeroLayout {
              subtitle
              tag
              title
              __typename
              image {
                node {
                  altText
                  uri
                  sourceUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              primaryCta {
                target
                title
                url
              }
              secondaryCta {
                target
                title
                url
              }
            }
            ... on PageBlocksPageBlocksTrustedByLayout {
              content
              __typename
              tag
              icons {
                __typename
                icon {
                  node {
                    altText
                    sourceUrl
                    uri
                    title
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
              }
            }
            ... on PageBlocksPageBlocksCardsSectionLayout {
              __typename
              tag
              title
              subtitle
              cards {
                __typename
                title
                content
                cta {
                  target
                  title
                  url
                }
                image {
                  node {
                    altText
                    sourceUrl
                    uri
                    title
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
              }
            }
            ... on PageBlocksPageBlocksCalculatorSectionLayout {
              __typename
              smallPrint
              subtitle
              tag
              title
            }
            ... on PageBlocksPageBlocksCustomerTestimonialsLayout {
              description
              __typename
              tag
              title
              testimonials {
                author
                __typename
                role
                testimonial
                avatar {
                  cursor
                  node {
                    altText
                    sourceUrl
                    uri
                    title
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
              }
              customerIcons {
                icon {
                  node {
                    altText
                    sourceUrl
                    uri
                    title
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
                __typename
              }
            }
            ... on PageBlocksPageBlocksOurTeamLayout {
              __typename
              tag
              title
              description
              reverse
              cta {
                target
                title
                url
              }
              image {
                node {
                  altText
                  sourceUrl
                  uri
                  title
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
            ... on PageBlocksPageBlocksBlogSliderLayout {
              __typename
              numberOfPosts
            }
            ... on PageBlocksPageBlocksHeroLayout {
              __typename
              tag
              title
              description
              cta {
                target
                title
                url
              }
              image {
                node {
                  altText
                  sourceUrl
                  uri
                  title
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
            ... on PageBlocksPageBlocksProductCardsLayout {
              __typename
              title
              subtitle
              products {
                title
                price
                description
                cta {
                  target
                  title
                  url
                }
                image {
                  node {
                    altText
                    sourceUrl
                    uri
                    title
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
              }
            }
            ... on PageBlocksPageBlocksFeatureCardsLayout {
              __typename
              title
              subtitle
              featureCard {
                title
                description
                icon {
                  node {
                    altText
                    sourceUrl
                    uri
                    title
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
              }
            }
            ... on PageBlocksPageBlocksOverlappingImagesLayout {
              __typename
              largeImage {
                node {
                  altText
                  sourceUrl
                  uri
                  title
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              smallImage {
                node {
                  altText
                  sourceUrl
                  uri
                  title
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              title
              description
            }
            ... on PageBlocksPageBlocksFeatureBoxesLayout {
              __typename
              title
              subtitle
              boxes {
                title
                description
              }
              removeBackground
            }
            ... on PageBlocksPageBlocksExploreSolutionsLayout {
              __typename
              title
              subtitle
              solution {
                title
                description
                cta {
                  target
                  title
                  url
                }
                image {
                  node {
                    altText
                    sourceUrl
                    uri
                    title
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
              }
            }
            ... on PageBlocksPageBlocksGetStartedLayout {
              __typename
              tag
              title
              subtitle
              ctaWhite {
                target
                title
                url
              }
              ctaBlue {
                target
                title
                url
              }
              image {
                node {
                  altText
                  sourceUrl
                  uri
                  title
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
            ... on PageBlocksPageBlocksTwoColumnContentLayout {
              __typename
              tag
              title
              content
              reverse
              background
              cta {
                target
                title
                url
              }
              image {
                node {
                  altText
                  sourceUrl
                  uri
                  title
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
            ... on PageBlocksPageBlocksFreeContentLayout {
              __typename
              content
            }
            ... on PageBlocksPageBlocksBoxedContentLayout {
              __typename
              title
              content
              image {
                node {
                  altText
                  sourceUrl
                  uri
                  title
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              reverse
            }
            ... on PageBlocksPageBlocksJourneyTimelineLayout {
              __typename
              tag
              title
              description
              timeline {
                tag
                title
                description
                image {
                  node {
                    altText
                    sourceUrl
                    uri
                    title
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
              }
            }
            ... on PageBlocksPageBlocksCenteredCardsLayout {
              __typename
              tag
              title
              description
              centerCard {
                title
                description
              }
            }
            ... on PageBlocksPageBlocksDarkCtaLayout {
              __typename
              content
              ctaBlue {
                target
                title
                url
              }
              ctaGrey {
                target
                title
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($first: Int = 10, $after: String, $categoryIn: [ID]) {
    posts(first: $first, after: $after, where: { status: PUBLISH, categoryIn: $categoryIn }) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
        total
      }
      nodes {
        id
        title
        content
        excerpt
        slug
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(first: 100, where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      seo {
        title
        metaDesc
      }
    }
  }
`;

export const GET_RECENT_POSTS = gql`
  query GetRecentPosts($first: Int = 6) {
    posts(first: $first, where: { status: PUBLISH }) {
      nodes {
        id
        title
        excerpt
        content
        slug
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

// Types for page blocks
interface PageBlock {
  __typename?: string;
}

interface PageBlocksData {
  nodeByUri?: {
    id: string;
    title: string;
    seo?: {
      title?: string;
      metaDesc?: string;
    };
    pageBlocks?: {
      pageBlocks: PageBlock[];
    };
  };
}

// Function to fetch page blocks using ACF flexible content
export async function getPageBlocks(uri: string): Promise<PageBlock[]> {
  try {
    const result = await client.query<PageBlocksData>({
      query: GET_PAGE_BLOCKS,
      variables: { uri },
      fetchPolicy: 'cache-first', // Enable caching for production
    });

    // console.log('results:', result);

    return result.data?.nodeByUri?.pageBlocks?.pageBlocks || [];
  } catch (error) {
    console.error('Error fetching page blocks:', error);
    return [];
  }
}

// Query to fetch all pages for static generation
export const GET_ALL_PAGES = gql`
  query GetAllPages {
    pages(first: 100, where: { status: PUBLISH }) {
      nodes {
        id
        title
        slug
        uri
        seo {
          title
          metaDesc
        }
        pageBlocks {
          pageBlocks {
            __typename
          }
        }
      }
    }
  }
`;

// Types for all pages query
interface AllPagesData {
  pages: {
    nodes: Array<{
      id: string;
      title: string;
      slug: string;
      uri: string;
      seo?: {
        title?: string;
        metaDesc?: string;
      };
      pageBlocks?: {
        pageBlocks: Array<{
          __typename: string;
        }>;
      };
    }>;
  };
}

// Function to fetch all pages for static generation
export async function getAllPages() {
  try {
    const result = await client.query<AllPagesData>({
      query: GET_ALL_PAGES,
      fetchPolicy: 'cache-first',
    });

    return result.data?.pages?.nodes || [];
  } catch (error) {
    console.error('Error fetching all pages:', error);
    return [];
  }
}

// Function to get page data by URI with metadata
export async function getPageData(uri: string) {
  try {
    const { data } = await client.query<PageBlocksData>({
      query: GET_PAGE_BLOCKS,
      variables: { uri },
      fetchPolicy: 'cache-first',
    });
    
    return data?.nodeByUri || null;
  } catch (error) {
    console.error('Error fetching page data:', error);
    return null;
  }
}
