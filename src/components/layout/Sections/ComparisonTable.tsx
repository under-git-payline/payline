"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import CheckCircle from "@/components/icons/CheckCircle";
import Close from "@/components/icons/Close";
import { ComparisonTableLayoutData, FlexibleContentProps } from "@/types/acf";

interface ComparisonTableProps extends FlexibleContentProps {
  data?: ComparisonTableLayoutData;
}

export default function ComparisonTable({ data }: ComparisonTableProps) {
  const { tag, title, description, featuresTable } = data || ({} as ComparisonTableLayoutData);

  if (!featuresTable || featuresTable.length === 0) return null;

  return (
    <div className="container flex flex-col items-center justify-center gap-12 py-16 px-4 md:px-2">
        <SectionHeader tag={tag} title={title} subtitle={description} />
        <div className="w-full max-w-[900px] mx-auto rounded-4xl bg-black/3 p-6 md:p-8">
            <div className="grid grid-cols-4 items-center text-left text-[16px] font-medium text-[#1A2339] px-2">
                <div className="py-2 col-span-2">Feature</div>
                <div className="py-2">Your Old Processor</div>
                <div className="py-2">Payline</div>
                </div>
                <div className="mt-2 divide-y divide-gray-200">
                {featuresTable.map((row, idx) => (
                    <div key={`${row.feature}-${idx}`} className="grid grid-cols-4 items-center px-2 py-4">
                    <div className="text-[#343C50] text-[16px] col-span-2">{row.feature}</div>
                    <div className="flex">
                        {row.yourOldProcessor ? (
                        <CheckCircle className="w-6 h-6 text-[#2A7A5C]" />
                        ) : (
                        <Close className="w-6 h-6 text-[#CCCED3]" />
                        )}
                    </div>
                    <div className="flex">
                        {row.payline ? (
                        <CheckCircle className="w-6 h-6 text-[#2A7A5C]" />
                        ) : (
                        <Close className="w-6 h-6 text-[#CCCED3]" />
                        )}
                    </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
