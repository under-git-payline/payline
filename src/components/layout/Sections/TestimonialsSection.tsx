"use client";

import Chevron from "@/components/icons/Chevron";
import Tag from "@/components/ui/Tag";
import Image from "next/image";
import { useState } from "react";
import { TestimonialsLayoutData, FlexibleContentProps } from "@/types/acf";

interface TestimonialsProps extends FlexibleContentProps {
  data?: TestimonialsLayoutData;
}

export default function TestimonialsSection({ data }: TestimonialsProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Use data from GraphQL if available, otherwise fallback to default
    const testimonialsData = {
        tag: data?.tag || "",
        title: data?.title || "",
        description: data?.description || "",
        testimonials: data?.testimonials || [],
        customerIcons: data?.customerIcons || []
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.max(1, testimonialsData.testimonials.length - 2));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + Math.max(1, testimonialsData.testimonials.length - 2)) % Math.max(1, testimonialsData.testimonials.length - 2));
    };

    return (
        <div className="container relative">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 overflow-x-hidden relative my-12">
                <div className="w-full md:w-1/3">
                    <Tag>{testimonialsData.tag}</Tag>
                    <h2 className="text-[28px] leading-[38px] md:text-[44px] md:leading-12 tracking-[-1px] font-medium py-4">{testimonialsData.title}</h2>
                    {/* <div className="flex pb-2">
                        <Star/><Star/><Star/><Star/><Star/>
                    </div>
                    {testimonialsData.description && (
                        <div className="flex pb-2 text-[14px]">
                            <div dangerouslySetInnerHTML={{ __html: testimonialsData.description }} />
                        </div>
                    )}
                    <div className="flex">
                        {testimonialsData.customerIcons.map((customerIcon, index) => (
                            <Image
                                key={index}
                                src={customerIcon?.icon?.node?.sourceUrl}
                                alt={customerIcon?.icon?.node?.altText || "Customer Logo"}
                                width={24}
                                height={25}
                                className={index !== 0 ? 'ml-2' : ''}
                            />
                        ))}
                    </div> */}
                    <div className="hidden md:flex items-center justify-start gap-2">
                        <div className="p-4 bg-black/8 rounded-full cursor-pointer hover:bg-black/12" onClick={prevSlide}>
                            <Chevron/>
                        </div>
                        <div className="p-4 bg-black/8 rounded-full cursor-pointer rotate-180 hover:bg-black/12" onClick={nextSlide}>
                            <Chevron/>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-2/3 overflow-hidden">
                    <div
                        className="w-full flex transition-transform duration-500 ease-in-out gap-6"
                        style={{ transform: `translateX(-${currentSlide * (100/2.4)}%)` }}
                    >
                        {testimonialsData.testimonials.map((testimonial, index) => {
                            const isDark = index % 2 !== 0;
                            return (
                                <div
                                    key={index}
                                    className={`flex flex-col gap-5 w-[80%] md:w-[40%] shrink-0 p-6 md:p-8 rounded-[20px] ${
                                        isDark ? 'bg-[#015582] text-white' : 'bg-[#cbebfb] text-[#040405]'
                                    }`}
                                >
                                    <div className={`size-20 shrink-0 rounded-full border overflow-hidden ${isDark ? 'border-white/8' : 'border-black/6'}`}>
                                        {testimonial.avatar?.node?.sourceUrl ? (
                                            <Image
                                                src={testimonial.avatar.node.sourceUrl}
                                                alt={testimonial.avatar.node.altText || testimonial.author}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        ) : (
                                            // Fallback avatar if no image is provided
                                            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                                                {testimonial.author?.charAt(0) || '?'}
                                            </div>
                                        )}
                                    </div>
                                    <p className="flex-1 text-[18px] leading-[26px] md:text-[20px] md:leading-7">
                                        &ldquo;{testimonial.testimonial}&rdquo;
                                    </p>
                                    <span
                                        className={`w-fit h-[52px] flex items-center justify-center px-8 rounded-full text-base font-medium mt-auto ${
                                            isDark ? 'bg-white/20 text-white' : 'bg-black/8 text-[#040405]'
                                        }`}
                                    >
                                        {testimonial.author}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}