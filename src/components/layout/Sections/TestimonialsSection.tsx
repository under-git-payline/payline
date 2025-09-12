"use client";

import Chevron from "@/components/icons/Chevron";
import Star from "@/components/icons/Star";
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
            <div className="flex flex-col md:flex-row gap-4 overflow-x-hidden relative my-12">
                <div className="w-full md:w-1/3">
                    <Tag>{testimonialsData.tag}</Tag>
                    <h2 className="text-[32px] py-4">{testimonialsData.title}</h2>
                    <div className="flex pb-2">
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
                                src={customerIcon.icon.node.sourceUrl}
                                alt={customerIcon.icon.node.altText || "Customer Logo"}
                                width={24}
                                height={25}
                                className={index !== 0 ? 'ml-2' : ''}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-2/3 overflow-hidden">
                    <div
                        className="w-full flex transition-transform duration-500 ease-in-out gap-4"
                        style={{ transform: `translateX(-${currentSlide * (100/2.4)}%)` }}
                    >
                        {testimonialsData.testimonials.map((testimonial, index) => (
                            <div key={index} className="flex flex-col gap-4 w-[80%] md:w-[40%] flex-shrink-0 p-8 bg-gray-50 rounded-lg">
                                <div className="flex pb-2">
                                    <Star/><Star/><Star/><Star/><Star/>
                                </div>
                                <p>{testimonial.testimonial}</p>
                                <div className="flex items-center gap-4 pt-4">
                                    {testimonial.avatar?.node?.sourceUrl ? (
                                        <Image
                                            src={testimonial.avatar.node.sourceUrl}
                                            alt={testimonial.avatar.node.altText || testimonial.author}
                                            width={50}
                                            height={50}
                                            className="rounded-full"
                                        />
                                    ) : (
                                        // Fallback avatar if no image is provided
                                        <div className="w-[50px] h-[50px] bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                                            {testimonial.author?.charAt(0) || '?'}
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-medium">{testimonial.author}</span>
                                        <span className="text-[12px] text-gray-500">{testimonial.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="hidden md:flex items-center justify-end gap-2">
                <div className="p-4 bg-black/8 rounded-full cursor-pointer hover:bg-black/12" onClick={prevSlide}>
                    <Chevron/>
                </div>
                <div className="p-4 bg-black/8 rounded-full cursor-pointer rotate-180 hover:bg-black/12" onClick={nextSlide}>
                    <Chevron/>
                </div>
            </div>
        </div>
    );
}