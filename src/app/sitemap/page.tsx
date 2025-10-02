import { getAllPagesForSitemap, getAllPostsForSitemap } from '@/lib/queries';
import PageLayout from '@/components/layout/PageLayout';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap | Payline Data',
  description: 'Complete sitemap of all pages and posts on Payline Data website.',
};

interface SitemapPageProps {
  pages: Array<{
    id: string;
    title: string;
    uri: string;
    date: string;
    modified: string;
  }>;
  posts: Array<{
    id: string;
    title: string;
    uri: string;
    date: string;
    modified: string;
    categories: {
      nodes: Array<{
        name: string;
        slug: string;
      }>;
    };
  }>;
}

function SitemapSection({ 
  title, 
  items, 
  showCategories = false 
}: { 
  title: string; 
  items: any[]; 
  showCategories?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-2">
        {title} ({items.length})
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <Link 
              href={item.uri} 
              className="block text-blue-600 hover:text-blue-800 font-medium text-lg mb-2 leading-tight overflow-hidden"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical' as any,
                textOverflow: 'ellipsis'
              }}
            >
              {item.title}
            </Link>
            <p className="text-sm text-gray-500 mb-2">
              Last updated: {new Date(item.modified || item.date).toLocaleDateString()}
            </p>
            {showCategories && item.categories?.nodes && item.categories.nodes.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.categories.nodes.map((category: any) => (
                  <span 
                    key={category.slug}
                    className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function SitemapPage() {
  let pages: any[] = [];
  let posts: any[] = [];

  try {
    // Fetch all pages and posts
    [pages, posts] = await Promise.all([
      getAllPagesForSitemap(),
      getAllPostsForSitemap()
    ]);

    // Filter out admin and system pages
    pages = pages.filter(page => 
      page.uri && 
      !page.uri.includes('/wp-admin/') && 
      !page.uri.includes('/wp-content/') &&
      page.uri !== '/sitemap' // Don't include this sitemap page itself
    );

    posts = posts.filter(post => 
      post.uri && 
      !post.uri.includes('/wp-admin/') && 
      !post.uri.includes('/wp-content/')
    );

    // Sort by last modified date (most recent first)
    pages.sort((a, b) => new Date(b.modified || b.date).getTime() - new Date(a.modified || a.date).getTime());
    posts.sort((a, b) => new Date(b.modified || b.date).getTime() - new Date(a.modified || a.date).getTime());
  } catch (error) {
    console.error('Error fetching sitemap data:', error);
  }

  // Group posts by category
  const postsByCategory: Record<string, any[]> = {};
  const uncategorizedPosts: any[] = [];

  posts.forEach(post => {
    if (post.categories?.nodes && post.categories.nodes.length > 0) {
      post.categories.nodes.forEach((category: any) => {
        if (!postsByCategory[category.name]) {
          postsByCategory[category.name] = [];
        }
        postsByCategory[category.name].push(post);
      });
    } else {
      uncategorizedPosts.push(post);
    }
  });

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Site Map
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore all the pages and content available on our website. 
            This comprehensive sitemap helps you quickly find the information you're looking for.
          </p>
          <div className="mt-6 flex justify-center">
            <Link 
              href="/sitemap.xml" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              target="_blank"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              XML Sitemap
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{pages.length}</div>
            <div className="text-blue-800 font-medium">Pages</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{posts.length}</div>
            <div className="text-green-800 font-medium">Blog Posts</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{Object.keys(postsByCategory).length}</div>
            <div className="text-purple-800 font-medium">Categories</div>
          </div>
        </div>

        {/* Pages Section */}
        <SitemapSection title="Pages" items={pages} />

        {/* Posts by Category */}
        {Object.entries(postsByCategory).map(([categoryName, categoryPosts]) => (
          <SitemapSection 
            key={categoryName}
            title={`${categoryName} Posts`} 
            items={categoryPosts} 
            showCategories={false}
          />
        ))}

        {/* Uncategorized Posts */}
        {uncategorizedPosts.length > 0 && (
          <SitemapSection 
            title="Other Posts" 
            items={uncategorizedPosts} 
            showCategories={true}
          />
        )}

        {/* Empty State */}
        {pages.length === 0 && posts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Content Found</h2>
            <p className="text-gray-500">
              We couldn't find any pages or posts to display in the sitemap.
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}