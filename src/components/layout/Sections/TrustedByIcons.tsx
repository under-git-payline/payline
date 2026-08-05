import Image from "next/image";
import { TrustedByLayoutData, FlexibleContentProps } from "@/types/acf";

interface TrustedByIconsProps extends FlexibleContentProps {
  data?: TrustedByLayoutData;
}

export default function TrustedByIcons({ data }: TrustedByIconsProps) {
  const trustedByData = {
    tag: data?.tag || "",
    content: data?.content || "",
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
    <section className="bg-[#F9F9FA] px-5 lg:px-10">
      <div className="container flex flex-col items-center gap-6">
        {(trustedByData.tag || trustedByData.content) && (
          <div className="max-w-[760px] text-center text-[#040405]">
            {trustedByData.tag && (
              <p className="mb-2 text-sm leading-6 text-black/55">{trustedByData.tag}</p>
            )}
            {trustedByData.content && (
              <h2 className="text-2xl font-medium tracking-[-0.5px] text-[#040405] md:text-3xl">
                {trustedByData.content}
              </h2>
            )}
          </div>
        )}

        <div className="relative w-full max-w-[1126px] overflow-hidden">
          <div className="no-scrollbar flex items-center justify-start gap-6 overflow-x-auto px-4 py-2 md:justify-center md:gap-8">
            {trustedByData.icons.map((iconItem, index) => {
              const { sourceUrl, altText, title, mediaDetails } = iconItem.icon.node;
              const width = mediaDetails?.width || 105;
              const height = mediaDetails?.height || 32;

              return (
                <div
                  key={index}
                  className="flex h-[90px] min-w-40 flex-none items-center justify-center rounded-xl bg-[#F9F9FA]"
                >
                  <Image
                    src={sourceUrl}
                    alt={altText || title || `Logo ${index + 1}`}
                    width={width}
                    height={height}
                    className="block h-full max-h-11 w-auto object-contain"
                  />
                </div>
              );
            })}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-14 bg-linear-to-r from-[#F9F9FA] to-transparent md:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-14 bg-linear-to-l from-[#F9F9FA] to-transparent md:block" />
        </div>
      </div>
    </section>
  );
}