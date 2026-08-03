import Link from 'next/link';
import Image from 'next/image';
import Calendar from '@/components/icons/Calendar';
import Time from '@/components/icons/Time';

interface BlogCardProps {
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  featuredImage?: string;
  imageAlt?: string;
}

export default function BlogCard({
  title,
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

  return (
    <Link href={`/blog/${slug}`} className="group flex flex-col gap-3 pb-5">
      {/* Featured Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#E8E8E8]">
        <Image
          src={featuredImage || '/images/blog-placeholder.png'}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          {category && (
            <span className="w-fit rounded-[2px] bg-black/4 px-1.5 py-1 text-[10px] leading-[12px] text-[#040405]">
              {category}
            </span>
          )}
          <h3 className="text-[16px] leading-[26px] text-[#040405] transition-colors group-hover:text-[#016EA8]">
            {stripHtml(title)}
          </h3>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-[12px] leading-[18px] text-black/60">
          <span className="flex items-center gap-1">
            <Calendar width={12} height={12} fill="rgba(0,0,0,0.6)" />
            {date}
          </span>
          <span className="flex items-center gap-1">
            <Time width={12} height={12} fill="rgba(0,0,0,0.6)" />
            {readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
