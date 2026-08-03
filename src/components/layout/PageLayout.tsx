import Header from "./Header";
import Footer from "./Footer";
import SimpleHeader from "./SimpleHeader";
import SimpleFooter from "./SimpleFooter";
import { isCustomTemplate } from "@/lib/queries";

interface PageLayoutProps {
  children: React.ReactNode;
  templateName?: string;
  headerVariant?: "light" | "dark";
  footerFlushTop?: boolean;
}

export default function PageLayout({ children, templateName, headerVariant = "light", footerFlushTop = false }: PageLayoutProps) {
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
      <Header variant={headerVariant} />
      {children}
      <Footer flushTop={footerFlushTop} />
    </div>
  );
}