import Link from "next/link";
import Button from "@/components/ui/Button";
import ArrowRight from "@/components/icons/ArrowRight";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-blue-500 leading-none">
              404
            </h1>
          </div>
          
          {/* Error Message */}
          <div className="mb-8">
            <h2 className="section-header-text mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-neutral-800 leading-relaxed">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been moved, deleted, or you may have entered an incorrect URL.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <Button variant="primary">
                Go to Homepage
                <ArrowRight fill="#ffffff" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="gray">
                Browse Blog
              </Button>
            </Link>
          </div>
          
          {/* Additional Help */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-neutral-800 text-sm">
              Need help? <Link href="/contact" className="text-blue-500 hover:underline">Contact our support team</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
