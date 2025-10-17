import { NextResponse } from 'next/server';
import { getAllPagesForSitemap, getAllPostsForSitemap } from '@/lib/queries';

// Define the base URL for your site
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://paylinedata.com';

function generateSitemapXML(pages: any[], posts: any[]): string {
  const currentDate = new Date().toISOString();
  
  // Generate page entries
  const pageEntries = pages.map(page => `
  <url>
    <loc>${BASE_URL}${page.uri}</loc>
    <lastmod>${page.modified || page.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

  // Generate post entries
  const postEntries = posts.map(post => `
  <url>
    <loc>${BASE_URL}/blog${post.uri}</loc>
    <lastmod>${post.modified || post.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('');

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