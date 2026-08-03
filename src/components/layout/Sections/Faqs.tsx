"use client";

import { useState } from "react";
import { FaqsLayoutData, FlexibleContentProps } from "@/types/acf";

interface FaqsProps extends FlexibleContentProps {
  data?: FaqsLayoutData;
}

export default function Faqs({ data }: FaqsProps) {
  const { tag, title, faqs } = data || {} as FaqsLayoutData;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="bg-[#F4F4F5]">
      <div className="mx-auto flex w-full max-w-[894px] flex-col items-center gap-10 px-5 pt-16 pb-20 lg:px-10 lg:pt-20 lg:pb-30">
        {(tag || title) && (
          <div className="flex w-full max-w-[660px] flex-col items-center gap-1.5 pb-3 text-center">
            {tag && (
              <span className="flex items-center justify-center rounded bg-black/4 px-3 py-1 text-sm leading-6 text-[#040405]">
                {tag}
              </span>
            )}
            {title && (
              <h2 className="text-[32px] leading-[38px] font-medium tracking-[-1px] text-[#040405] lg:text-[60px] lg:leading-[66px]">
                {title}
              </h2>
            )}
          </div>
        )}
        <div className="w-full">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-content-${index}`;
            return (
              <div key={`${item.question}-${index}`} className="border-b border-black/6 py-3">
                <button
                  className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-[17px] leading-6 font-medium text-[#040405] md:text-xl md:leading-7">
                    {item.question}
                  </span>
                  <span className="flex size-6 shrink-0 items-center justify-center" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 8V6H14V8H0Z" fill="#040405" />
                      <path
                        d="M6 14V0H8V14H6Z"
                        fill="#040405"
                        className={`origin-center transition-transform duration-300 ease-in-out ${isOpen ? 'scale-y-0' : ''}`}
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={contentId}
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-1 text-base leading-7 text-black/80" dangerouslySetInnerHTML={{ __html: item.answer }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
