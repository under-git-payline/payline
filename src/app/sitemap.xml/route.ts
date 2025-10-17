import { NextResponse } from 'next/server';
import { getAllPagesForSitemap, getAllPostsForSitemap } from '@/lib/queries';

// Define the base URL for your site
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://paylinedata.com';

// Function to format date for sitemap (ISO 8601 format)
function formatDateForSitemap(dateString: string): string {
  if (!dateString) {
    return new Date().toISOString().split('T')[0]; // Fallback to today's date in YYYY-MM-DD format
  }
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return new Date().toISOString().split('T')[0]; // Fallback if invalid date
    }
    return date.toISOString().split('T')[0]; // Return YYYY-MM-DD format
  } catch (error) {
    console.error('Error formatting date:', dateString, error);
    return new Date().toISOString().split('T')[0]; // Fallback
  }
}

function generateSitemapXML(pages: any[], posts: any[]): string {
  const currentDate = new Date().toISOString().split('T')[0]; // Use YYYY-MM-DD format
  
  // Generate page entries
  const pageEntries = pages.map(page => `
  <url>
    <loc>${BASE_URL}${page.uri}</loc>
    <lastmod>${formatDateForSitemap(page.modified || page.date)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

  // Generate post entries with proper /blog/ prefix
  const postEntries = posts.map(post => {
    // Ensure proper blog URL format: /blog/slug/
    let blogUrl;
    if (post.slug) {
      // Use slug if available for cleaner URLs
      blogUrl = `/blog/${post.slug}/`;
    } else if (post.uri && post.uri !== '/') {
      // Use URI but ensure it starts with /blog/
      const cleanUri = post.uri.startsWith('/') ? post.uri.slice(1) : post.uri;
      blogUrl = `/blog/${cleanUri}`;
      if (!blogUrl.endsWith('/')) blogUrl += '/';
    } else {
      // Skip posts without valid slugs or URIs
      return '';
    }
    
    return `
  <url>
    <loc>${BASE_URL}${blogUrl}</loc>
    <lastmod>${formatDateForSitemap(post.modified || post.date)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }).filter(entry => entry !== '').join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>${pageEntries}${postEntries}
</urlset>`;
}

export async function GET() {
  try {
    console.log('Starting sitemap generation...');
    
    // Fetch all pages and posts from WordPress
    const [pages, posts] = await Promise.all([
      getAllPagesForSitemap(),
      getAllPostsForSitemap()
    ]);

    console.log(`Sitemap: Retrieved ${pages.length} pages and ${posts.length} posts from WordPress`);

    // Filter out any pages/posts that shouldn't be in the sitemap
    const filteredPages = pages.filter(page => 
      page.uri && 
      !page.uri.includes('/wp-admin/') && 
      !page.uri.includes('/wp-content/')
    );

    const filteredPosts = posts.filter(post => 
      post.uri && 
      !post.uri.includes('/wp-admin/') && 
      !post.uri.includes('/wp-content/')
    );

    console.log(`Sitemap: After filtering - ${filteredPages.length} pages and ${filteredPosts.length} posts`);

    // Generate the XML sitemap
    const sitemap = generateSitemapXML(filteredPages, filteredPosts);

    // Return the XML with proper headers
    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

// Support both GET and HEAD requests
export { GET as HEAD };