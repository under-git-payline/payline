import { useQuery } from '@apollo/client/react';
// import { GET_HERO_SECTION, GET_RECENT_POSTS, GET_PAGE_BY_SLUG } from '@/lib/queries';
import { GET_RECENT_POSTS, GET_POSTS, GET_CATEGORIES } from '@/lib/queries';
import { Post, Category, PostsQuery } from '@/types/wordpress';

// interface HeroQueryData {
//   page: {
//     heroFields: {
//       headline: string;
//       subheadline: string;
//       description: string;
//       primaryButtonText: string;
//       primaryButtonUrl: string;
//       secondaryButtonText: string;
//       secondaryButtonUrl: string;
//       heroImage: {
//         sourceUrl: string;
//         altText: string;
//       };
//       tagline: string;
//     };
//   };
// }

// export const useHeroData = () => {
//   const { data, loading, error } = useQuery<HeroQueryData>(GET_HERO_SECTION);
//   return {
//     heroData: data?.page?.heroFields,
//     loading,
//     error
//   };
// };

export const usePosts = (first: number = 6) => {
  const { data, loading, error } = useQuery<{ posts: { nodes: Post[] } }>(GET_RECENT_POSTS, {
    variables: { first }
  });
  return {
    posts: data?.posts?.nodes || [],
    loading,
    error
  };
};

export const useBlogPosts = (first: number = 9, categoryIn?: string[]) => {
  const { data, loading, error, fetchMore, networkStatus } = useQuery<PostsQuery>(GET_POSTS, {
    variables: { first, categoryIn },
    notifyOnNetworkStatusChange: true,
  });
  
  return {
    posts: data?.posts?.nodes || [],
    pageInfo: data?.posts?.pageInfo,
    totalCount: data?.posts?.pageInfo?.total || 0,
    loading,
    error,
    fetchMore,
    networkStatus
  };
};

export const useCategories = () => {
  const { data, loading, error } = useQuery<{ categories: { nodes: Category[] } }>(GET_CATEGORIES);
  return {
    categories: data?.categories?.nodes || [],
    loading,
    error
  };
};

// export const usePageData = (slug: string) => {
//   const { data, loading, error } = useQuery<{ page: Page }>(GET_PAGE_BY_SLUG, {
//     variables: { slug }
//   });
//   return {
//     pageData: data?.page,
//     loading,
//     error
//   };
// };