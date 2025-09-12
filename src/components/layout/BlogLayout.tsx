"use client";

import { useState } from 'react';
import { useBlogPosts, useCategories } from '@/hooks/useWordPressData';
import { BlogCard, CategoryFilter, LoadingBar, Button } from '@/components/ui';

export default function BlogLayout() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  // Get categories and posts using our custom hooks
  const { categories } = useCategories();
  const { posts, pageInfo, loading: postsLoading, fetchMore, totalCount } = useBlogPosts(9, selectedCategories.length > 0 ? selectedCategories : undefined);

  const hasNextPage = pageInfo?.hasNextPage || false;
  
  // Check if this is initial loading (no posts yet) vs loading more
  const isInitialLoading = postsLoading && posts.length === 0;

  const handleCategoryFilter = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
  };

  const handleLoadMore = async () => {
    if (hasNextPage && pageInfo?.endCursor) {
      setLoadingMore(true);
      try {
        await fetchMore({
          variables: {
            first: 9,
            after: pageInfo.endCursor,
            categoryIn: selectedCategories.length > 0 ? selectedCategories : undefined
          },
        });
      } catch (error) {
        console.error('Error loading more posts:', error);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  const calculateReadingTime = (content: string): string => {
    const plainText = content.replace(/<[^>]*>/g, '');
    const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
    const readingTimeMinutes = Math.ceil(wordCount / 225);
    return `${readingTimeMinutes} min`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
    <div className="container mx-auto my-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          The Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Insights, tips, and industry updates from the PaylineData team
        </p>
      </div>
    </div>

    <div className='py-10 bg-gradient-to-b from-[#F9F9FA] to-white'>
      {/* Content Layout */}
      <div className="container grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <CategoryFilter 
              categories={categories} 
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryFilter}
            />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="lg:col-span-3">
          {isInitialLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No posts found for the selected categories.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {posts.map((post) => (
                  <BlogCard
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    slug={post.slug}
                    date={formatDate(post.date)}
                    readTime={calculateReadingTime(post.content)}
                    category={post.categories?.nodes[0]?.name || ''}
                    featuredImage={post.featuredImage?.node?.sourceUrl}
                    imageAlt={post.featuredImage?.node?.altText || post.title}
                  />
                ))}
              </div>

              {/* Load More Section */}
              <div className="text-center">
                <div className="mb-4">
                  <span className="text-gray-600">
                    Viewing {posts.length} of {totalCount} posts
                  </span>
                </div>
                
                {/* Loading Bar */}
                <LoadingBar 
                  current={posts.length} 
                  total={totalCount} 
                  className="mb-6"
                />
                
                {hasNextPage && (
                    <div className='flex align-center justify-center'> 
                        <Button 
                            variant={loadingMore ? "gray" : "primary"}
                            onClick={handleLoadMore}
                        >
                            {loadingMore ? 'Loading...' : 'Load More'}
                        </Button>
                    </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
