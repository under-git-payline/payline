"use client";

import { useEffect, useState } from 'react';
import { Category } from '@/types/wordpress';
import BlogTag from './BlogTag';
import Close from '../icons/Close';

interface FiltersTrayProps {
  open: boolean;
  categories: Category[];
  selectedCategories: string[];
  onClose: () => void;
  onApply: (categoryIds: string[]) => void;
}

export default function FiltersTray({
  open,
  categories,
  selectedCategories,
  onClose,
  onApply
}: FiltersTrayProps) {
  const [draft, setDraft] = useState<string[]>(selectedCategories);

  // Reset the draft selection every time the tray is opened
  useEffect(() => {
    if (open) setDraft(selectedCategories);
  }, [open, selectedCategories]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const toggleCategory = (categoryId: string) => {
    setDraft((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div
      className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[467px] flex-col bg-white transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Heading */}
        <div className="flex items-center gap-5 border-b border-black/6 py-2 pl-5 pr-2">
          <p className="flex-1 text-[20px] leading-[28px] font-medium text-[#040405]">Filters</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex size-[52px] cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/4"
          >
            <Close fill="#040405" />
          </button>
        </div>

        {/* Filter list */}
        <div className="flex flex-1 flex-wrap content-start gap-2 overflow-y-auto p-5">
          {categories.map((category) => (
            <BlogTag
              key={category.id}
              name={category.name}
              count={category.count}
              selected={draft.includes(category.id)}
              onClick={() => toggleCategory(category.id)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 border-t border-black/6 px-5 py-4">
          <button
            type="button"
            onClick={() => onApply(draft)}
            className="h-[52px] flex-1 cursor-pointer rounded-full bg-[#040405] px-8 text-[16px] font-medium text-white transition-colors hover:bg-[#040405]/85"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={() => onApply([])}
            className="h-[52px] flex-1 cursor-pointer rounded-full bg-black/8 px-8 text-[16px] font-medium text-[#040405] transition-colors hover:bg-black/12"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
