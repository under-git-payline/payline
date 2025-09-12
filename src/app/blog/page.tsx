import BlogLayout from '@/components/layout/BlogLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Payline',
  description: 'Insights, tips, and industry updates from the Payline team.',
};

export default function BlogPage() {
  return <BlogLayout />;
}
