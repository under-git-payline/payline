import { notFound } from 'next/navigation';
import FlexiblePageBuilder from "@/components/FlexibleContent/FlexiblePageBuilder";
import { getAllPages, getPageBlocks, getPageData } from "@/lib/queries";
import { shouldExcludePage, getCustomFallback, uriToSlugArray, pageConfig } from "@/lib/page-config";
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

// Generate static params for all pages at build time
export async function generateStaticParams() {
  try {
    const pages = await getAllPages();
    
    // Filter out excluded pages and convert URIs to slug arrays
    const params = [];
    
    for (const page of pages.filter(page => !shouldExcludePage(page.uri)).slice(0, pageConfig.maxPages)) {
      try {
        // Validate that the page has content before including it
        const blocks = await getPageBlocks(page.uri);
        const customFallback = getCustomFallback(page.uri);
        
        // Only include pages that have content or custom fallbacks
        if (blocks.length > 0 || customFallback) {
          params.push({
            slug: uriToSlugArray(page.uri),
          });
        }
      } catch (error) {
        console.warn(`Skipping page ${page.uri} due to error:`, error);
        // Skip pages that cause errors during validation
      }
    }

    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const uri = '/' + resolvedParams?.slug.join('/');
  
  try {
    // Check for custom fallback first
    const customFallback = getCustomFallback(uri);
    if (customFallback) {
      return {
        title: customFallback.title,
        description: customFallback.description,
        openGraph: {
          title: customFallback.title,
          description: customFallback.description,
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: customFallback.title,
          description: customFallback.description,
        },
      };
    }

    const pageData = await getPageData(uri);
    
    if (!pageData) {
      return {
        title: 'Page Not Found',
        description: 'The requested page could not be found.',
      };
    }

    // Use SEO data if available, otherwise fallback to page title
    const title = pageData.seo?.title || pageData.title || 'Page';
    const description = pageData.seo?.metaDesc || `Learn more about ${pageData.title}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Page',
      description: 'Page content',
    };
  }
}

// Main page component
export default async function DynamicPage({ params }: PageProps) {
  const resolvedParams = await params;
  const uri = '/' + resolvedParams.slug.join('/');
  
  try {
    // Check for custom fallback first
    const customFallback = getCustomFallback(uri);
    
    // Fetch page blocks
    const blocks = await getPageBlocks(uri);
    
    // If no blocks found, use custom fallback or show 404
    if (blocks.length === 0) {
      if (customFallback) {
        return customFallback.content;
      }
      // Call notFound() to trigger the not-found page
      notFound();
    }

    return <FlexiblePageBuilder blocks={blocks} />;
  } catch (error) {
    console.error(`Error rendering page ${uri}:`, error);
    
    // Check if this is a notFound error - if so, don't catch it
    // if (error && typeof error === 'object' && 'digest' in error && 
    //     (error as any).digest === 'NEXT_HTTP_ERROR_FALLBACK;404') {
    //   throw error; // Re-throw notFound errors
    // }
    
    // Try to show custom fallback on other errors
    const customFallback = getCustomFallback(uri);
    if (customFallback) {
      return customFallback.content;
    }
    
    // For other errors, call notFound()
    notFound();
  }
}

// Enable static generation with fallback for unknown pages
export const dynamicParams = true;
export const revalidate = 3600; // 1 hour - matches pageConfig.revalidate
