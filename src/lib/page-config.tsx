// Configuration for automatic page generation
interface CustomFallback {
  title: string;
  description: string;
  content: React.ReactNode;
}

interface PageConfig {
  excludedPages: string[];
  customFallbacks: Record<string, CustomFallback>;
  revalidate: number;
  maxPages: number;
}

export const pageConfig: PageConfig = {
  // Pages that should be excluded from automatic generation
  excludedPages: [
    '/',           // Homepage (handled by app/page.tsx)
    '/homepage',   // Alternative homepage URI
    '/blog',       // Blog (might have custom handling)
    '/search',     // Search (might have custom functionality)
    '/404',        // Error pages
    '/500',
    '/.well-known',// Well-known directory for web standards
    '/robots.txt', // SEO files
    '/sitemap.xml',
    '/favicon.ico'
  ],
  
  // Pages that should have custom fallbacks
  customFallbacks: {},

  // Static generation settings
  revalidate: 3600, // 1 hour
  
  // Build-time settings
  maxPages: 1000, // Maximum number of pages to generate
};

// Utility function to check if a page should be excluded
export function shouldExcludePage(uri: string): boolean {
  return pageConfig.excludedPages.some(excludedPage => {
    // Exact match
    if (uri === excludedPage) return true;
    
    // Prefix match (for directories like /.well-known)
    if (excludedPage.endsWith('/') && uri.startsWith(excludedPage)) return true;
    
    // Special handling for .well-known paths
    if (excludedPage === '/.well-known' && uri.startsWith('/.well-known/')) return true;
    
    return false;
  });
}

// Utility function to get custom fallback for a page
export function getCustomFallback(uri: string): CustomFallback | null {
  return pageConfig.customFallbacks[uri] || null;
}

// Utility function to clean URI for routing
export function cleanUri(uri: string): string {
  return uri.startsWith('/') ? uri.slice(1) : uri;
}

// Utility function to convert URI to slug array
export function uriToSlugArray(uri: string): string[] {
  return cleanUri(uri).split('/').filter(segment => segment !== '');
}
