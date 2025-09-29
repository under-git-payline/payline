"use client";

import { usePathname } from 'next/navigation';
import Header from "./Header";
import Footer from "./Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Check if this is a dynamic route that handles its own layout
  // We'll exclude specific paths that are handled by other components
  const isDynamicPage = pathname !== '/' && 
                        !pathname.startsWith('/blog') && 
                        !pathname.startsWith('/api') &&
                        !pathname.startsWith('/_next');

  if (isDynamicPage) {
    // Dynamic pages handle their own header/footer through PageLayout
    return <>{children}</>;
  }

  // Static pages and homepage use the root layout header/footer
  return (
    <div className="main">
      <Header />
      <div className="py-4">
        {children}
      </div>
      <Footer />
    </div>
  );
}