import Image from "next/image";
import { FlexibleContentProps, FeatureBoxesLayoutData } from "@/types/acf";

interface FeatureBoxesProps extends FlexibleContentProps {
  data?: FeatureBoxesLayoutData;
}

export default function FeatureBoxes({ data }: FeatureBoxesProps) {
  if (!data) return null;

  const isCompact = (data.boxes?.length ?? 0) > 6;

  const content = (
    <div className="feature-boxes container py-20">
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
      {data?.boxes && (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 ${isCompact ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {data.boxes.map((box, index) => (
            <div
              key={index}
              className={`flex flex-col gap-6 rounded-[20px] bg-white ${isCompact ? "p-5 lg:aspect-[3/2]" : "p-8 lg:aspect-square"}`}
            >
              {box.icon?.node?.sourceUrl && (
                <div className="flex size-[74px] items-center justify-center rounded-xl bg-[#E2EFF1]">
                  <Image src={box.icon.node.sourceUrl} alt={box.title || box.icon.node.altText || ""} width={44} height={44} className="w-11 h-11" />
                </div>
              )}
              <div className={`flex flex-col ${isCompact ? "gap-1" : "gap-1.5"}`}>
                <h3 className={`tracking-[-1px] text-[#040405] ${isCompact ? "text-[26px] leading-[30px]" : "text-[32px] leading-9"}`}>{box.title}</h3>
                {box.description && (
                  <p className={`text-black/80 ${isCompact ? "text-base leading-[26px]" : "text-xl leading-7"}`}>{box.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return !data?.removeBackground ? (
    <div className="my-14 bg-[#F4F4F5]">
      {content}
    </div>
  ) : (
    content
  );
}
