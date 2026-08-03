import Image from "next/image";
import { FeatureCardsLayoutData, FlexibleContentProps } from "@/types/acf";

interface FeatureCardsProps extends FlexibleContentProps {
  data?: FeatureCardsLayoutData;
}

export default function FeatureCards({ data }: FeatureCardsProps) {
  const isThreeColCount = data?.featureCard ? [3, 5, 6].includes(data.featureCard.length) : false;
  const centered = Boolean(data?.centerContent);
  const lightBackground = Boolean(data?.lightBackground);
  // Hero card-grid variant: square cards showing an icon plus a single line of
  // heading copy, sitting directly beneath the hero on the same light background.
  const compact = Boolean(data?.featureCard?.length) && !data!.featureCard.some((card) => card.title);

  return (
    <div className={`${compact || lightBackground ? "bg-[#F9F9FA]" : "bg-[#F4F4F5]"} text-[#010B24]`}>
      <div className={`container ${compact ? "py-10 px-4! lg:px-10!" : "py-20"}`}>
        {centered ? (
          <>
            {(data?.title || data?.subtitle) && (
              <div className="mx-auto flex max-w-[660px] flex-col items-center gap-3 text-center">
                {data?.title && (
                  <h2 className="text-[32px] leading-[38px] font-medium tracking-[-1px] text-[#040405] lg:text-[60px] lg:leading-[66px]">
                    {data.title}
                  </h2>
                )}
                {data?.subtitle && (
                  <p className="text-[17px] leading-[1.45] text-black/80 md:text-xl md:leading-7">
                    {data.subtitle}
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {data?.title && <h2 className="text-5xl leading-14 mb-2">{data.title}</h2>}
            {data?.subtitle && <p className="text-lg text-[#343C50]">{data.subtitle}</p>}
          </>
        )}
        {data?.featureCard && (
          <div
            className={
              centered
                ? "flex flex-wrap justify-center gap-6 mt-10"
                : `grid grid-cols-1 md:grid-cols-2 gap-6 ${compact ? "" : "mt-10"} ${isThreeColCount ? "lg:grid-cols-3" : "lg:grid-cols-4"}`
            }
          >
            {data.featureCard.map((card, index) => (
              <div
                key={index}
                className={`flex flex-col gap-6 rounded-[20px] bg-white p-5${compact ? " md:aspect-square" : ""}${
                  centered
                    ? ` w-full min-w-0 md:w-[calc(50%-12px)] ${isThreeColCount ? "lg:w-[calc((100%-48px)/3)]" : "lg:w-[calc(25%-18px)]"}`
                    : ""
                }`}
              >
                <div className="flex size-[74px] shrink-0 items-center justify-center rounded-xl bg-[#CBEBFB]">
                  <Image src={card.icon.node.sourceUrl} alt={card.title || card.icon.node.altText || ""} width={44} height={44} className="w-11 h-11" />
                </div>
                <div className="flex flex-col gap-1">
                  {compact ? (
                    <h3 className="text-[26px] leading-[30px] font-medium tracking-[-1px] text-[#040405]">{card.description}</h3>
                  ) : (
                    <>
                      <h3 className="text-[26px] leading-[30px] font-medium tracking-[-1px] text-[#040405]">{card.title}</h3>
                      <p className="text-base leading-[26px] text-black/80">{card.description}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
