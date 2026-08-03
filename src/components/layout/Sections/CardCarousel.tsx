"use client";

import { useEffect, useRef, useState } from "react";
import { CardCarouselLayoutData, FlexibleContentProps } from "@/types/acf";

interface CardCarouselProps extends FlexibleContentProps {
  data?: CardCarouselLayoutData;
}

function CarouselChevron({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className={className}>
      <path d="M15.705 7.94149L14.295 6.53149L8.29504 12.5315L14.295 18.5315L15.705 17.1215L11.125 12.5315L15.705 7.94149Z" fill="currentColor" />
    </svg>
  );
}

export default function CardCarousel({ data }: CardCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [data]);

  if (!data) return null;

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth || 400) + 24;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <div className="bg-[#002132] px-5 py-10 lg:px-10 lg:py-20">
      <div className="container flex flex-col gap-8 lg:gap-10">
        {data.title && (
          <h2 className="text-3xl leading-10 font-medium tracking-[-0.5px] text-white lg:text-[60px] lg:leading-[66px] lg:tracking-[-1px]">
            {data.title}
          </h2>
        )}

        {data.carouselCards && data.carouselCards.length > 0 && (
          <div className="flex flex-col gap-6 lg:gap-8">
            <div
              ref={scrollRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] lg:gap-6 [&::-webkit-scrollbar]:hidden"
            >
              {data.carouselCards.map((card, index) => (
                <div
                  key={index}
                  data-card
                  className="flex w-[80%] shrink-0 snap-start flex-col gap-6 rounded-2xl bg-white/8 p-6 sm:w-[45%] lg:w-[400px] lg:p-8"
                >
                  <span className="text-3xl leading-[48px] font-medium tracking-[-1px] text-white lg:text-[44px]">
                    {index + 1}
                  </span>
                  <div className="flex flex-col gap-2">
                    {card.title && (
                      <h3 className="text-xl leading-9 font-medium tracking-[-1px] text-white lg:text-2xl">
                        {card.title}
                      </h3>
                    )}
                    {card.description && (
                      <p className="text-base leading-[26px] text-white/80">
                        {card.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => scrollByCard(-1)}
                disabled={!canScrollPrev}
                className="flex size-[52px] items-center justify-center rounded-full bg-white text-[#010B24] transition-colors enabled:cursor-pointer enabled:hover:bg-white/90 disabled:bg-white/12 disabled:text-white/40"
              >
                <CarouselChevron />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => scrollByCard(1)}
                disabled={!canScrollNext}
                className="flex size-[52px] items-center justify-center rounded-full bg-white text-[#010B24] transition-colors enabled:cursor-pointer enabled:hover:bg-white/90 disabled:bg-white/12 disabled:text-white/40"
              >
                <CarouselChevron className="rotate-180" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
