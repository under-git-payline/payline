"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import LinkedIn from '../icons/LinkedIn';
import Twitter from '../icons/Twitter';
import WhatsApp from '../icons/WhatsApp';
import Facebook from '../icons/Facebook';
import Email from '../icons/Email';
import CopyLink from '../icons/CopyLink';

export interface ArticleHeading {
  id: string;
  text: string;
  level: number;
}

interface ArticleSidebarProps {
  title: string;
  authorName: string;
  authorAvatar?: string;
  lastEdited: string;
  readTime: string;
  headings: ArticleHeading[];
}

const shareButtonClass =
  'flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/8 transition-colors hover:bg-black/12';

export default function ArticleSidebar({
  title,
  authorName,
  authorAvatar,
  lastEdited,
  readTime,
  headings
}: ArticleSidebarProps) {
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '');

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  // Highlight the heading currently in view
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Unable to copy the article link');
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-col gap-5">
      {/* Author */}
      <div className="flex items-center gap-3">
        {authorAvatar && (
          <div className="relative size-[60px] shrink-0 overflow-hidden rounded-full border border-black/6 bg-[#E8E8E8]">
            <Image src={authorAvatar} alt={authorName} fill sizes="60px" className="object-cover" />
          </div>
        )}
        <div className="flex flex-col">
          <p className="text-[20px] leading-[28px] text-[#040405]">{authorName}</p>
          <div className="flex items-center gap-2 text-[14px] leading-[24px] text-black/60">
            <span>Last edited {lastEdited}</span>
            <span className="size-1 rounded-full bg-black/60" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>

      {/* Share links */}
      <div className="flex flex-col gap-3">
        <div className="h-px w-full bg-black/6" />
        <div className="flex flex-wrap items-start gap-2">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className={shareButtonClass}
          >
            <LinkedIn className="size-5" fill="#040405" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            className={shareButtonClass}
          >
            <Twitter className="size-5" fill="#040405" />
          </a>
          <a
            href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            className={shareButtonClass}
          >
            <WhatsApp className="size-5" fill="#040405" />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
            className={shareButtonClass}
          >
            <Facebook className="size-5" fill="#040405" />
          </a>
          <a
            href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
            aria-label="Share by email"
            className={shareButtonClass}
          >
            <Email className="size-5" fill="#040405" />
          </a>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Link copied' : 'Copy article link'}
            className={shareButtonClass}
          >
            <CopyLink className="size-5" fill="#040405" />
          </button>
        </div>
        <div className="h-px w-full bg-black/6" />
      </div>

      {/* Contents */}
      {headings.length > 0 && (
        <nav className="flex flex-col" aria-label="Article contents">
          {headings.map((heading) => {
            const isActive = heading.id === activeId;
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={`rounded py-3 pr-6 text-[16px] leading-[26px] transition-colors ${
                  heading.level > 2 ? 'pl-6' : 'pl-3'
                } ${isActive ? 'bg-black/10 text-[#040405]' : 'text-black/60 hover:text-[#040405]'}`}
              >
                {heading.text}
              </a>
            );
          })}
        </nav>
      )}
    </div>
  );
}
