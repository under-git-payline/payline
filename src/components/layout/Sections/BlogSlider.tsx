"use client";

import Chevron from "@/components/icons/Chevron";
import Time from "@/components/icons/Time";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import { useState } from "react";
import { usePosts } from "@/hooks/useWordPressData";
// import { Post } from "@/types/wordpress";
import Link from "next/link";
import Image from "next/image";

export default function BlogSlider() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const { posts: blogs, loading, error } = usePosts(10);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const calculateReadingTime = (content: string): string => {
        // Remove HTML tags and get plain text
        const plainText = content.replace(/<[^>]*>/g, '');
        // Count words (split by whitespace and filter out empty strings)
        const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
        // Average reading speed is 200-250 words per minute, using 225
        const readingTimeMinutes = Math.ceil(wordCount / 225);
        return `${readingTimeMinutes}min`;
    };

    // const extractImageFromContent = (content: string): string => {
    //     const imgMatch = content.match(/<img[^>]*src="([^"]*)"[^>]*>/);
    //     return imgMatch ? imgMatch[1] : "/images/blog1.jpg"; // fallback image
    // };

    // const stripHtml = (html: string): string => {
    //     return html.replace(/<[^>]*>/g, '').trim();
    // };

    if (loading) {
        return (
            <div className="px-2 my-10">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading blog posts...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="px-2 my-10">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg text-red-500">Error loading blog posts</div>
                </div>
            </div>
        );
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div className="px-2 my-10">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">No blog posts found</div>
                </div>
            </div>
        );
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % (blogs.length - 2));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + (blogs.length - 2)) % (blogs.length - 2));
    };

    return (
        <div className="container px-2 my-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-8">
                <div className="flex flex-col justify-center">
                    <Tag>Blog</Tag>
                    <h2 className="text-[36px] pt-2 font-medium">What we&apos;re talking about</h2>
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
            <div className="flex items-stretch gap-4 overflow-hidden">
                <div
                    className="w-full flex transition-transform duration-500 ease-in-out gap-4"
                    style={{ transform: `translateX(-${currentSlide * (100/3.45)}%)` }}
                >
                    {blogs.map((blog) => (
                        <div key={blog.id} className="flex flex-col gap-4 w-[80%] md:w-[28%] flex-shrink-0">
                            <Link href={`/blog/${blog.slug}`} className="max-h-[285px] overflow-hidden rounded-lg mb-4">
                                <Image 
                                    src={blog.featuredImage?.node?.sourceUrl || "/images/blog1.jpg"} 
                                    alt={blog.featuredImage?.node?.altText || blog.title} 
                                    className="w-full h-auto hover:opacity-90 transition-opacity cursor-pointer object-cover"
                                    width={400}
                                    height={300}
                                />
                            </Link>
                            <Tag>News</Tag>
                            <Link href={`/blog/${blog.slug}`} className="hover:text-blue-600 transition-colors">
                                <p className="text-[18px] font-medium">{blog.title}</p>
                            </Link>
                            <div className="flex items-center text-[12px] text-gray-500">
                                <span>{formatDate(blog.date)}</span>
                                <span className="mx-2">|</span>
                                <span className="flex items-center gap-1"><Time/> {calculateReadingTime(blog.content)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-12 flex">
                <Button variant="gray">
                    <Link href="/blog">See More Blog Posts</Link>
                </Button>
            </div>
        </div>
    );
}