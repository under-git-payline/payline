import { notFound } from 'next/navigation';
import FlexiblePageBuilder from "@/components/FlexibleContent/FlexiblePageBuilder";
import PageLayout from "@/components/layout/PageLayout";
import { getAllPages, getPageBlocks, getPageData } from "@/lib/queries";
import { shouldExcludePage, getCustomFallback, uriToSlugArray, pageConfig } from "@/lib/page-config";
import { isLightHero } from "@/lib/hero";
import { HeroLayoutData } from "@/types/acf";
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
    
    // Fetch page data including template information
    const pageData = await getPageData(uri);
    const templateName = pageData?.template?.templateName;
    
    // Fetch page blocks
    const blocks = await getPageBlocks(uri);

    // If no blocks found, use custom fallback or show 404
    if (blocks.length === 0) {
      if (customFallback) {
        return (
          <PageLayout templateName={templateName}>
            {customFallback.content}
          </PageLayout>
        );
      }
      // Call notFound() to trigger the not-found page
      notFound();
    }

    // The header is absolutely positioned over the first block, so its variant follows
    // that block's background. Hero renders dark unless it's one of the light variants
    // (kept in sync with Hero.tsx via the shared predicate); Two Column Content renders
    // its dark editorial variant whenever it is first.
    const firstBlock = blocks[0];
    const isDarkHero = firstBlock?.__typename === 'PageBlocksPageBlocksHeroLayout'
      && !isLightHero(firstBlock as HeroLayoutData);
    const isDarkEditorial = firstBlock?.__typename === 'PageBlocksPageBlocksTwoColumnContentLayout';
    const headerVariant = isDarkHero || isDarkEditorial ? 'dark' : 'light';

    // The footer shares the editorial section's #002132, so its rounded top corners
    // would cut two pale wedges out of what should read as one continuous field.
    // Square them off only when that section actually touches the footer — the dark
    // variant renders only as the first block, so that means it is also the last.
    const footerFlushTop = isDarkEditorial && blocks.length === 1;

    return (
      <PageLayout templateName={templateName} headerVariant={headerVariant} footerFlushTop={footerFlushTop}>
        <FlexiblePageBuilder blocks={blocks} />
      </PageLayout>
    );
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
      const pageData = await getPageData(uri);
      const templateName = pageData?.template?.templateName;
      
      return (
        <PageLayout templateName={templateName}>
          {customFallback.content}
        </PageLayout>
      );
    }
    
    // For other errors, call notFound()
    notFound();
  }
}

// Enable static generation with fallback for unknown pages
export const dynamicParams = true;
export const revalidate = 3600; // 1 hour - matches pageConfig.revalidate
