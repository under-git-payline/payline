import Header from "./Header";
import Footer from "./Footer";
import SimpleHeader from "./SimpleHeader";
import SimpleFooter from "./SimpleFooter";
import { isCustomTemplate } from "@/lib/queries";

interface PageLayoutProps {
  children: React.ReactNode;
  templateName?: string;
}

export default function PageLayout({ children, templateName }: PageLayoutProps) {
  const useSimpleLayout = isCustomTemplate(templateName);

  if (useSimpleLayout) {
    return (
      <div className="main">
        <SimpleHeader />
        <div className="py-4">
          {children}
        </div>
        <SimpleFooter />
      </div>
    );
  }

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