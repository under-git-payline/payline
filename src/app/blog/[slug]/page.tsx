import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GET_POST_BY_SLUG } from '@/lib/queries';
import client from '@/lib/apollo-client';
import { Post } from '@/types/wordpress';
import Image from 'next/image';
import Contents from '@/components/icons/Contents';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const { data } = await client.query<{ post: Post }>({
      query: GET_POST_BY_SLUG,
      variables: { slug: resolvedParams.slug },
    });

    if (!data?.post) {
      return {
        title: 'Post Not Found',
      };
    }

    return {
      title: data.post.seo?.title || data.post.title,
      description: data.post.seo?.metaDesc || data.post.excerpt,
    };
  } catch {
    return {
      title: 'Post Not Found',
    };
  }
}export default async function PostPage({ params }: PostPageProps) {
  try {
    const resolvedParams = await params;
    const { data } = await client.query<{ post: Post }>({
      query: GET_POST_BY_SLUG,
      variables: { slug: resolvedParams.slug },
    });

    if (!data?.post) {
      notFound();
    }

    const post = data.post;

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const calculateReadingTime = (content: string): string => {
      const plainText = content.replace(/<[^>]*>/g, '');
      const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
      const readingTimeMinutes = Math.ceil(wordCount / 225);
      return `${readingTimeMinutes} min read`;
    };

    return (
      <article>
        {/* Full-width Hero Section */}
        <header className="bg-[#016EA8] w-full py-12 mb-8">
          <div className="max-w-[900px] mx-auto px-4">
            {post.featuredImage && (
              <div className="relative w-full h-64 md:h-120 rounded-xl overflow-hidden mb-6">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-cover"
                />
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-auto">
                  <div className="bg-[#016EA8] rounded-tr-lg pt-6 pr-6 max-w-[430px]">
                    <div className="mb-4">
                    {post.categories?.nodes.map((category) => (
                        <span
                        key={category.id}
                        className="inline-block bg-black/6 text-white px-3 text-[12px] py-1 rounded-sm mr-2"
                        >
                        {category.name}
                        </span>
                    ))}
                    </div>
                    <h1 className="text-2xl md:text-4xl font-medium text-white">
                      {post.title}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            
            {/* Fallback for posts without featured image */}
            {!post.featuredImage && (
                <div className="bg-[#016EA8] rounded-tr-lg pt-6 pr-6 max-w-[430px]">
                    <div className="mb-4">
                    {post.categories?.nodes.map((category) => (
                        <span
                        key={category.id}
                        className="inline-block bg-black/6 text-white px-3 text-[12px] py-1 rounded-sm mr-2"
                        >
                        {category.name}
                        </span>
                    ))}
                    </div>
                    <h1 className="text-2xl md:text-4xl font-medium text-white">
                    {post.title}
                    </h1>
                </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="max-w-[900px] mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar - 1/3 */}
            <aside className="lg:col-span-1">
              {/* Author Information */}
              <div className="text-[14px]">
                <p className="text-[#343C50] font-medium">Written by <span className='font-bold text-[#010B24]'>{post.author.node.name}</span></p>
                <div className='text-[#676D7C]'>
                    <span className="font-medium">Last Edited: {formatDate(post.date)} • {calculateReadingTime(post.content)} </span>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="mt-5">
                <h3 className="flex gap-2 align-center font-semibold text-gray-900 mb-3"><Contents /> Contents</h3>
                <nav className="space-y-2">
                  <div className="text-[14px] text-gray-600">
                    <div 
                      className="prose-headings-toc"
                      dangerouslySetInnerHTML={{ 
                        __html: post.content
                          .match(/<h[2-6][^>]*>.*?<\/h[2-6]>/gi)
                          ?.map((heading) => {
                            const text = heading.replace(/<[^>]*>/g, '');
                            const level = parseInt(heading.match(/h([2-6])/)?.[1] || '2');
                            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                            return `<a href="#${id}" class="block py-1 text-[#010B24] hover:underline ${level > 2 ? 'ml-4' : ''}">${text}</a>`;
                          })
                          .join('') || '<p class="text-gray-500 italic">No headings found</p>'
                      }}
                    />
                  </div>
                </nav>
              </div>
            </aside>

            {/* Main Content - 2/3 */}
            <main className="lg:col-span-2">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(
                    /<h([2-6])([^>]*)>/g, 
                    (match, level, attrs) => {
                      const text = post.content.match(new RegExp(`<h${level}[^>]*>(.*?)</h${level}>`))?.[1] || '';
                      const id = text.replace(/<[^>]*>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      return `<h${level} id="${id}"${attrs}>`;
                    }
                  )
                }}
              />
            </main>
          </div>
        </div>
      </article>
    );
  } catch {
    console.error('Error fetching post');
    notFound();
  }
}
