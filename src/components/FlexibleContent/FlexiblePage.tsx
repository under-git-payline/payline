import FlexiblePageBuilder from "@/components/FlexibleContent/FlexiblePageBuilder";
import { getPageBlocks } from "@/lib/queries";

interface FlexiblePageProps {
  uri: string;
  fallback?: React.ReactNode;
}

/**
 * A reusable component for creating pages with ACF flexible content
 * @param uri - The page URI to fetch from WordPress
 * @param fallback - Optional fallback content if no blocks are found
 */
export default async function FlexiblePage({ uri, fallback }: FlexiblePageProps) {
  const blocks = await getPageBlocks(uri);

  if (blocks.length === 0) {
    return (
      fallback || (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p>This page has no content blocks configured.</p>
        </div>
      )
    );
  }

  return <FlexiblePageBuilder blocks={blocks} />;
}
