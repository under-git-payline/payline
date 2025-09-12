import Amex from "@/components/icons/Amex";
// import ArrowRight from "@/components/icons/ArrowRight";
import Mastercard from "@/components/icons/Mastercard";
import Visa from "@/components/icons/Visa";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import { CalculatorLayoutData, FlexibleContentProps } from "@/types/acf";

interface CalculatorSectionProps extends FlexibleContentProps {
  data?: CalculatorLayoutData;
}

export default function CalculatorSection({ data }: CalculatorSectionProps) {
    const { smallPrint, subtitle, tag, title } = data || {};
    return (
        <div className="container flex flex-col items-center justify-center gap-4 py-10 md:py-20 px-4 md:px-2 my-10 rounded-3xl bg-[linear-gradient(76deg,#B0E0F9_-4.48%,#E6F5FD_99.55%)]">
            <SectionHeader
                tag={tag}
                title={title}
                subtitle={subtitle}
            />
            <div className="flex flex-col items-center justify-center gap-4 relative max-w-[660px] w-full bg-white rounded-3xl p-8 mt-10">
                <div className="flex items-center justify-between w-[251px] absolute top-[-24px] left-1/2 -translate-x-1/2 bg-gray-50 rounded-[32px] p-[4px]">
                    <div className="bg-[#1A2339] text-white px-8 py-2 rounded-[24px] cursor-pointer">In-person</div>
                    <div className="text-[#676D7C] px-8 py-2 rounded-[24px] cursor-pointer transition-colors hover:bg-gray-100">Online</div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full pt-8">
                    <div className="bg-gray-50 flex flex-col rounded-lg gap-2 pt-8 pb-4 px-4 w-full md:w-1/3">
                        <span className="text-4xl font-medium">1.78% <span className="text-lg font-normal">+10¢</span></span>
                        <div className="flex items-center justify-start gap-2 text-[14px]">
                            <div className="bg-white/3 py-[3px] px-[10px] rounded-sm">
                                <Visa/>
                            </div>
                            <div className="bg-white/3 py-[3px] px-[10px] rounded-sm">
                                <Mastercard/>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 flex flex-col rounded-lg gap-2 pt-8 pb-4 px-4 w-full md:w-1/3">
                        <span className="text-4xl font-medium">2.56% <span className="text-lg font-normal">+10¢</span></span>
                        <div className="flex items-center justify-start gap-2 text-[14px]">
                            <div className="bg-white/3 py-[3px] px-[10px] rounded-sm">
                                <Amex/>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 flex flex-col rounded-lg gap-2 pt-8 pb-4 px-4 w-full md:w-1/3">
                        <span className="text-4xl font-medium">0.40%</span>
                        <div className="flex items-center justify-start gap-2 text-[14px]">
                            <div className="p-1">
                                <span className="text-[#343C50]">PIN-Debit</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
                    <div className="w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="Average transaction size *"
                            className="w-full text-[14px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <span className="text-[10px] text-[#676D7C]">Average transaction value in USD</span>
                    </div>
                    <div className="w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="Monthly processing volume *"
                            className="w-full text-[14px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <span className="text-[10px] text-[#676D7C]">Total transactions per month</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center gap-12 max-w-[660px] w-full">
                <span className="text-center text-[10px] text-[#676D7C]">{smallPrint}</span>
                <Button
                    variant="black"
                >
                    Get Started
                </Button>
            </div>
        </div>
    );
}