import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  featuredImage?: string;
  imageAlt?: string;
}

export default function BlogCard({
  title,
  excerpt,
  slug,
  date,
  readTime,
  category,
  featuredImage,
  imageAlt = ''
}: BlogCardProps) {
  
  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const truncateText = (text: string, maxLength: number = 120): string => {
    const cleanText = stripHtml(text);
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength).trim() + '...';
  };

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article>
        {/* Featured Image */}
        <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <Image
              src='/images/blog-placeholder.png'
              alt={imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>

        {/* Content */}
        <div className="py-6">
          {/* Title */}
          <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-[#016EA8] transition-colors">
            {stripHtml(title)}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 leading-relaxed">
            {truncateText(excerpt)}
          </p>

          {/* Meta */}
          <div className="flex items-center text-[12px] text-[#676D7C]">
            {/* Category */}
            {category && (
                <span className="inline-block bg-black/6 text-[010B24] text-[10px] px-3 py-1 rounded-md">
                    {category}
                </span>
            )}
            <span className="mx-2">•</span>
            <span>{date}</span>
            <span className="mx-2">•</span>
            <span>{readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
