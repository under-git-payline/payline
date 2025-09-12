import Image from "next/image";
import { FeatureCardsLayoutData, FlexibleContentProps } from "@/types/acf";

interface FeatureCardsProps extends FlexibleContentProps {
  data?: FeatureCardsLayoutData;
}

export default function FeatureCards({ data }: FeatureCardsProps) {
  return (
    <div className="my-14 bg-[#F9F9FA] text-[#010B24]">
      <div className="container py-20">
        {data?.title && <h2 className="text-5xl leading-14 mb-2">{data.title}</h2>}
        {data?.subtitle && <p className="text-lg text-[#343C50]">{data.subtitle}</p>}
        {data?.featureCard && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {data.featureCard.map((card, index) => (
              <div key={index} className="bg-black/3 rounded-2xl p-5">
                <div className="rounded-xl bg-[#B0E0F9] p-2 max-w-max">
                  <Image src={card.icon.node.sourceUrl} alt={card.title} width={40} height={40} className="w-10 h-10" />
                </div>
                <div className="flex flex-col gap-2 pt-4">
                  <h3 className="text-2xl">{card.title}</h3>
                  <p className="text-lg text-[#343C50]">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}