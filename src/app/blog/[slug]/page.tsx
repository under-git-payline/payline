import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GET_POST_BY_SLUG } from '@/lib/queries';
import client from '@/lib/apollo-client';
import { Post } from '@/types/wordpress';
import Image from 'next/image';
import ArticleSidebar, { ArticleHeading } from '@/components/layout/ArticleSidebar';

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
}

/** Adds anchor ids to the article headings and collects them for the contents list. */
function buildContents(content: string) {
  const headings: ArticleHeading[] = [];
  const usedIds = new Set<string>();

  const contentWithIds = content.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level: string, attrs: string, inner: string) => {
      const text = inner.replace(/<[^>]*>/g, '').trim();
      if (!text) return match;

      const base = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
      let id = base;
      let suffix = 2;
      while (usedIds.has(id)) {
        id = `${base}-${suffix}`;
        suffix += 1;
      }
      usedIds.add(id);
      headings.push({ id, text, level: Number(level) });

      const cleanedAttrs = attrs.replace(/\s+id\s*=\s*(".*?"|'.*?')/gi, '');
      return `<h${level}${cleanedAttrs} id="${id}">${inner}</h${level}>`;
    }
  );

  return { headings, contentWithIds };
}

/** Concave corner used where the title panel meets the hero image edges. */
function CornerNotch({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M0 0V20H20C8.9547 20 0 11.0459 0 0Z" fill="#002132" />
    </svg>
  );
}

export default async function PostPage({ params }: PostPageProps) {
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
        month: '2-digit',
        day: '2-digit'
      });
    };

    const calculateReadingTime = (content: string): string => {
      const plainText = content.replace(/<[^>]*>/g, '');
      const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
      const readingTimeMinutes = Math.ceil(wordCount / 225);
      return `${readingTimeMinutes}min read`;
    };

    const { headings, contentWithIds } = buildContents(post.content);
    const category = post.categories?.nodes[0]?.name;

    return (
      <article>
        {/* Editorial hero */}
        <header className="bg-[#002132] px-5 pt-[120px] pb-10 lg:px-10">
          <div className="relative mx-auto max-w-[1126px]">
            <div className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-[#E8E8E8]">
              <Image
                src={post.featuredImage?.node.sourceUrl || '/images/blog-placeholder.png'}
                alt={post.featuredImage?.node.altText || post.title}
                fill
                priority
                sizes="(max-width: 1126px) 100vw, 1126px"
                className="object-cover"
              />
            </div>

            <div className="relative w-full rounded-tr-[20px] bg-[#002132] p-6 sm:absolute sm:bottom-0 sm:left-0 sm:w-[70%] lg:w-[48.2%]">
              <CornerNotch className="absolute -top-5 left-0 hidden sm:block" />
              <CornerNotch className="absolute -right-5 bottom-0 hidden sm:block" />

              <div className="flex flex-col items-start gap-3">
                {category && (
                  <span className="rounded bg-white/8 px-3 py-1 text-[14px] leading-[24px] text-white">
                    {category}
                  </span>
                )}
                <h1 className="text-[32px] leading-[38px] font-medium tracking-[-0.5px] text-white lg:text-[44px] lg:leading-[48px] lg:tracking-[-1px]">
                  {post.title}
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Article body */}
        <div className="bg-white px-5 py-10 lg:px-10">
          <div className="mx-auto flex max-w-[1126px] flex-col gap-10 lg:flex-row">
            <aside className="lg:w-[427px] lg:shrink-0">
              <div className="lg:sticky lg:top-10">
                <ArticleSidebar
                  title={post.title}
                  authorName={post.author.node.name}
                  authorAvatar={post.author.node.avatar?.url}
                  lastEdited={formatDate(post.date)}
                  readTime={calculateReadingTime(post.content)}
                  headings={headings}
                />
              </div>
            </aside>

            <main className="min-w-0 flex-1">
              <div dangerouslySetInnerHTML={{ __html: contentWithIds }} />
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
