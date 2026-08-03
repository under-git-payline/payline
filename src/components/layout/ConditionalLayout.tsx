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
  // Blog pages open on a dark hero, so the header sits on top of it in its dark variant
  const headerVariant = pathname.startsWith('/blog') ? 'dark' : 'light';

  return (
    <div className="main">
      <Header variant={headerVariant} />
      {children}
      <Footer />
    </div>
  );
}