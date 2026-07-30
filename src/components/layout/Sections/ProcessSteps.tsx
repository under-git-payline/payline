import Image from "next/image";
import { ProcessStepsLayoutData, FlexibleContentProps } from "@/types/acf";

interface ProcessStepsProps extends FlexibleContentProps {
  data?: ProcessStepsLayoutData;
}

export default function ProcessSteps({ data }: ProcessStepsProps) {
  if (!data) return null;

  return (
    <div className="bg-[#002132] px-5 py-10 lg:px-10 lg:py-20">
      <div className="container">
        <div className="mx-auto mb-14 flex max-w-[660px] flex-col items-center gap-3 text-center lg:mb-16">
          {data.title && (
            <h2 className="text-3xl leading-10 font-medium tracking-[-0.5px] text-white lg:text-[60px] lg:leading-[66px] lg:tracking-[-1px]">
              {data.title}
            </h2>
          )}
          {data.description && (
            <p className="text-lg text-white/80 lg:text-xl lg:leading-7">
              {data.description}
            </p>
          )}
        </div>

        {data.steps && data.steps.length > 0 && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {data.steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center gap-8 text-center">
                <div className="relative w-full">
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-white/10">
                    {step.image?.node?.sourceUrl && (
                      <Image
                        src={step.image.node.sourceUrl}
                        alt={step.image.node.altText || step.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="absolute bottom-0 left-1/2 flex size-10 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 border-[#040405] bg-white">
                    <span className="text-2xl leading-9 font-medium tracking-[-1px] text-[#040405]">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {step.title && (
                    <h3 className="text-base leading-[26px] font-medium text-white">
                      {step.title}
                    </h3>
                  )}
                  {step.description && (
                    <p className="text-sm leading-6 text-white/80">
                      {step.description}
                    </p>
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
