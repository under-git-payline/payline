import { FeaturePillsLayoutData, FlexibleContentProps } from "@/types/acf";

interface FeaturePillsProps extends FlexibleContentProps {
  data?: FeaturePillsLayoutData;
}

export default function FeaturePills({ data }: FeaturePillsProps) {
  const pillsData = {
    title: data?.title || "Give customers the payment methods they prefer.",
    subtitle: data?.subtitle || "",
    pills: data?.pills || [
      { label: "Credit & Debit Cards" },
      { label: "ACH Bank Payments" },
      { label: "One-Time Payments" },
      { label: "Recurring Payments" },
      { label: "Fixed or Custom Amounts" },
    ],
  };

  return (
    <section className="bg-[#F9F9FA] px-5 py-10 lg:px-10 lg:py-16">
      <div className="container">
        <div className="feature-pills-clouds rounded-[24px] px-6 py-12 lg:rounded-[40px] lg:px-10 lg:py-20">
          <div className="relative z-10 mx-auto flex max-w-[840px] flex-col items-center gap-3 text-center">
            <h2 className="text-[32px] leading-[38px] font-medium tracking-[-1px] text-[#040405] lg:text-[60px] lg:leading-[66px]">
              {pillsData.title}
            </h2>
            {pillsData.subtitle && (
              <p className="max-w-[640px] text-[17px] leading-[1.45] text-black/80 md:text-xl md:leading-7">
                {pillsData.subtitle}
              </p>
            )}
          </div>
          <div className="relative z-10 mx-auto mt-8 flex max-w-[1060px] flex-wrap items-center justify-center gap-3 lg:mt-10">
            {pillsData.pills.map((pill, index) => (
              <span
                key={index}
                className="rounded-full bg-white px-6 py-4 text-lg font-medium tracking-[-0.5px] text-[#040405] lg:px-8 lg:py-5 lg:text-[32px] lg:leading-9 lg:tracking-[-1px]"
              >
                {pill.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
