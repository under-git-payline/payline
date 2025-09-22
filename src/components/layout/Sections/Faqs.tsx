"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { FaqsLayoutData, FlexibleContentProps } from "@/types/acf";

interface FaqsProps extends FlexibleContentProps {
  data?: FaqsLayoutData;
}

export default function Faqs({ data }: FaqsProps) {
  const { tag, title, faqs } = data || {} as FaqsLayoutData;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="container flex flex-col items-center justify-center gap-6 py-16 px-4 md:px-2 bg-black/3 rounded-4xl my-10">
      <SectionHeader tag={tag} title={title} />
      <div className="w-full max-w-3xl mx-auto mt-2 divide-y divide-gray-200">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          const contentId = `faq-content-${index}`;
          return (
            <div key={`${item.question}-${index}`} className="py-4">
              <button
                className="w-full text-left flex items-center justify-between py-3 cursor-pointer"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="font-medium text-[#1A2339]">{item.question}</span>
                <svg
                  className={`h-5 w-5 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                </svg>
              </button>
              <div
                id={contentId}
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden text-[#343C50] text-base leading-7" dangerouslySetInnerHTML={{ __html: item.answer }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
