import SectionHeader from "@/components/ui/SectionHeader";
import Image from "next/image";
import { TrustedByLayoutData, FlexibleContentProps } from "@/types/acf";

interface TrustedByIconsProps extends FlexibleContentProps {
  data?: TrustedByLayoutData;
}

export default function TrustedByIcons({ data }: TrustedByIconsProps) {
  // Fallback to default values if no data is provided
  const trustedByData = {
    tag: data?.tag || "Customers",
    content: data?.content || "Trusted by 24,000+ businesses",
    icons: data?.icons || [
      { icon: { node: { sourceUrl: "/logos/occasion.png", altText: "Occasion", title: "Occasion", mediaDetails: { width: 105, height: 32 } } } },
      { icon: { node: { sourceUrl: "/logos/ace-hardware.png", altText: "Ace Hardware", title: "Ace Hardware", mediaDetails: { width: 52, height: 32 } } } },
      { icon: { node: { sourceUrl: "/logos/schooltoday.png", altText: "SchoolToday", title: "SchoolToday", mediaDetails: { width: 147, height: 32 } } } },
      { icon: { node: { sourceUrl: "/logos/logo-1.png", altText: "Logo", title: "Logo", mediaDetails: { width: 32, height: 32 } } } },
      { icon: { node: { sourceUrl: "/logos/boonli.png", altText: "Boonli", title: "Boonli", mediaDetails: { width: 90, height: 28 } } } },
      { icon: { node: { sourceUrl: "/logos/payzer.png", altText: "Payzer", title: "Payzer", mediaDetails: { width: 121, height: 22 } } } },
    ]
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-10 py-20 px-2 bg-black/3 text-white rounded-4xl my-10">
      <SectionHeader
        tag={trustedByData.tag}
        title={trustedByData.content}
      />
      <div className="flex flex-wrap items-center justify-center gap-15">
        {trustedByData.icons.map((iconItem, index) => {
          const { sourceUrl, altText, title, mediaDetails } = iconItem.icon.node;
          const width = mediaDetails?.width || 105; // Fallback width
          const height = mediaDetails?.height || 32; // Fallback height
          
          return (
            <Image
              key={index}
              src={sourceUrl}
              alt={altText || title || `Logo ${index + 1}`}
              width={width}
              height={height}
              className="block"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                objectFit: 'contain'
              }}
            />
          );
        })}
      </div>
    </div>
  );
}