"use client";

import { useEffect, useMemo, useState } from 'react';
import { useBlogPosts, useCategories } from '@/hooks/useWordPressData';
import { BlogCard, BlogTag, FiltersTray, LoadingBar } from '@/components/ui';
import Search from '@/components/icons/Search';
import Tune from '@/components/icons/Tune';

const PAGE_SIZE = 12;

export default function BlogLayout() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [columns, setColumns] = useState<3 | 4>(3);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Debounce the search field so we don't fire a query on every keystroke
  useEffect(() => {
    const timeout = setTimeout(() => setSearch(searchInput.trim()), 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { categories } = useCategories();
  const { posts, pageInfo, loading: postsLoading, fetchMore, totalCount } = useBlogPosts(
    PAGE_SIZE,
    selectedCategories.length > 0 ? selectedCategories : undefined,
    search || undefined
  );

  const hasNextPage = pageInfo?.hasNextPage || false;
  const isInitialLoading = postsLoading && posts.length === 0;

  const activeCategories = useMemo(
    () => categories.filter((category) => selectedCategories.includes(category.id)),
    [categories, selectedCategories]
  );

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleApplyFilters = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
    setFiltersOpen(false);
  };

  const handleLoadMore = async () => {
    if (hasNextPage && pageInfo?.endCursor) {
      setLoadingMore(true);
      try {
        await fetchMore({
          variables: {
            first: PAGE_SIZE,
            after: pageInfo.endCursor,
            categoryIn: selectedCategories.length > 0 ? selectedCategories : undefined,
            search: search || undefined
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
    return `${readingTimeMinutes}min`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-[#002132] pt-[120px] pb-10">
        <div className="container flex flex-col gap-10">
          <div className="max-w-[893px]">
            <h1 className="pb-4 text-[48px] leading-[52px] font-medium tracking-[-1px] text-white lg:text-[80px] lg:leading-[88px] lg:tracking-[-2px]">
              The Blog
            </h1>
            <p className="pb-3 text-[18px] leading-[26px] text-white/80 lg:text-[20px] lg:leading-[28px]">
              Insights, tips, and industry updates from the Payline team
            </p>
          </div>

          <label className="flex h-[52px] w-full max-w-[427px] items-center justify-between gap-2 rounded border border-white/8 bg-white/6 px-4 py-2">
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search articles"
              aria-label="Search articles"
              className="min-w-0 flex-1 bg-transparent text-[16px] leading-[26px] text-white outline-none placeholder:text-white/80"
            />
            <Search className="size-6 shrink-0" fill="rgba(255,255,255,0.8)" />
          </label>
        </div>
      </section>

      {/* Filter bar */}
      <div className="border-b border-black/6 bg-white py-3">
        <div className="container flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="flex items-center gap-1 text-[14px] leading-[24px] text-black/60">
              Showing:
              <span className="text-[#040405]">{totalCount.toLocaleString()}</span>
              articles
            </p>

            {activeCategories.length > 0 && (
              <>
                <span className="text-[14px] leading-[24px] text-black/20">|</span>
                <div className="flex flex-wrap items-center gap-1">
                  {activeCategories.map((category) => (
                    <BlogTag
                      key={category.id}
                      name={category.name}
                      count={category.count}
                      selected
                      onClick={() => toggleCategory(category.id)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCategories([])}
                  className="cursor-pointer text-[14px] leading-[24px] text-[#016EA8] underline"
                >
                  Clear filters
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-5 lg:gap-10">
            <div className="hidden items-center gap-1 text-[14px] leading-[24px] xl:flex">
              <span className="text-black/60">View:</span>
              <button
                type="button"
                onClick={() => setColumns(3)}
                aria-label="Show three columns"
                className={`cursor-pointer ${columns === 3 ? 'text-[#040405]' : 'text-black/20'}`}
              >
                3
              </button>
              <span className="text-black/20">|</span>
              <button
                type="button"
                onClick={() => setColumns(4)}
                aria-label="Show four columns"
                className={`cursor-pointer ${columns === 4 ? 'text-[#040405]' : 'text-black/20'}`}
              >
                4
              </button>
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="flex h-[52px] cursor-pointer items-center justify-center gap-2 rounded-full bg-[#040405] px-8 text-[16px] font-medium text-white transition-colors hover:bg-[#040405]/85"
            >
              <Tune className="size-4" fill="white" />
              {selectedCategories.length > 0 ? `Filters (${selectedCategories.length})` : 'Filters'}
            </button>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="bg-white pt-6 pb-10">
        <div className="container">
        {isInitialLoading ? (
          <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${columns === 4 ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <div key={index} className="flex animate-pulse flex-col gap-3 pb-5">
                <div className="aspect-video w-full rounded-xl bg-gray-200" />
                <div className="h-3 w-24 rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-1/2 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="py-12 text-center text-[16px] text-black/60">
            No articles found. Try a different search or clear your filters.
          </div>
        ) : (
          <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${columns === 4 ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                slug={post.slug}
                date={formatDate(post.date)}
                readTime={calculateReadingTime(post.content)}
                category={post.categories?.nodes[0]?.name || ''}
                featuredImage={post.featuredImage?.node?.sourceUrl}
                imageAlt={post.featuredImage?.node?.altText || post.title}
              />
            ))}
          </div>
        )}
        </div>
      </div>

      {/* Load more */}
      {posts.length > 0 && (
        <div className="bg-white pb-20">
          <div className="container flex justify-center">
            <div className="flex w-full max-w-[426px] flex-col items-center gap-6">
              <p className="text-[20px] leading-[28px] text-[#040405]">
                Viewing <span className="font-medium">{posts.length}</span> of{' '}
                <span className="font-medium">{totalCount}</span>
              </p>

              <LoadingBar current={posts.length} total={totalCount} />

              {hasNextPage && (
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="flex h-[52px] cursor-pointer items-center justify-center rounded-full bg-[#040405] px-8 text-[16px] font-medium text-white transition-colors hover:bg-[#040405]/85 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loadingMore ? 'Loading…' : 'Load more'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <FiltersTray
        open={filtersOpen}
        categories={categories}
        selectedCategories={selectedCategories}
        onClose={() => setFiltersOpen(false)}
        onApply={handleApplyFilters}
      />
    </>
  );
}
