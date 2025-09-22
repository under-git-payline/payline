"use client";

import { useState, useEffect } from "react";
// import ArrowRight from "@/components/icons/ArrowRight";
import Mastercard from "@/components/icons/Mastercard";
import Visa from "@/components/icons/Visa";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import { CalculatorLayoutData, FlexibleContentProps } from "@/types/acf";
import Link from "next/link";

interface CalculatorSectionProps extends FlexibleContentProps {
  data?: CalculatorLayoutData;
}

export default function CalculatorSection({ data }: CalculatorSectionProps) {
    const { smallPrint, subtitle, tag, title } = data || {};
    const [cardPresent, setCardPresent] = useState(true); // true = card present, false = card not present
    const [averageTransactionSize, setAverageTransactionSize] = useState('');
    const [monthlyProcessingVolume, setMonthlyProcessingVolume] = useState('');
    const [cardPresentText, setCardPresentText] = useState('Interchange + 0.15%');
    const [cardPresentTextSmall, setCardPresentTextSmall] = useState('+8¢');
    const [averageFee, setAverageFee] = useState('0.00');


    useEffect(() => {
        if (cardPresent) {
            setCardPresentText('Interchange + 0.15%');
            setCardPresentTextSmall('+8¢');
        } else {
            setCardPresentText('Interchange + 0.10%');
            setCardPresentTextSmall('+12¢');
        }
    }, [cardPresent]);

    // Calculate fees based on average transaction size and monthly processing volume
    useEffect(() => {
        const avgTransaction = parseFloat(averageTransactionSize);
        const monthlyVolume = parseFloat(monthlyProcessingVolume);

        // Reset to 0.00 if inputs are invalid or empty
        if (isNaN(avgTransaction) || isNaN(monthlyVolume) || avgTransaction <= 0 || monthlyVolume <= 0) {
            setAverageFee('0.00');
            return;
        }

        if (cardPresent) {
            if (monthlyVolume > 1000000) {
                // (Monthly Volume * (0.15% + 1.40%)) + ((Monthly Volume / Transaction Amount) * $0.10)
                const fee = (monthlyVolume * (0.0015 + 0.014)) + ((monthlyVolume / avgTransaction) * 0.10);
                setAverageFee(fee.toFixed(2));
                return;
            } else if (monthlyVolume > 500000) {
                // (Monthly Volume * (0.20% + 1.40%)) + ((Monthly Volume / Transaction Amount) * $0.10)
                const fee = (monthlyVolume * (0.0020 + 0.0140)) + ((monthlyVolume / avgTransaction) * 0.10);
                setAverageFee(fee.toFixed(2));
                return;
            } else if (monthlyVolume > 100000) {
                // (Monthly Volume * (0.25% + 1.40%)) + ((Monthly Volume / Transaction Amount) * $0.10)
                const fee = (monthlyVolume * (0.0025 + 0.0140)) + ((monthlyVolume / avgTransaction) * 0.10);
                setAverageFee(fee.toFixed(2));
                return;
            } else if (monthlyVolume > 50000) {
                // (Monthly Volume * (0.30% + 1.40%)) + ((Monthly Volume / Transaction Amount) * $0.10)
                const fee = (monthlyVolume * (0.0030 + 0.0140)) + ((monthlyVolume / avgTransaction) * 0.10);
                setAverageFee(fee.toFixed(2));
                return;
            } else {
                // (Monthly Volume * (0.35% + 1.40%)) + ((Monthly Volume / Transaction Amount) * $0.10)
                const fee = (monthlyVolume * (0.0035 + 0.0140)) + ((monthlyVolume / avgTransaction) * 0.10);
                setAverageFee(fee.toFixed(2));
                return;
            }
        } else {
            if (monthlyVolume > 1000000) {
                // (Monthly Volume * (0.10% + 1.85%)) + ((Monthly Volume / Transaction Amount) * $0.10)
                const fee = (monthlyVolume * (0.0010 + 0.0185)) + ((monthlyVolume / avgTransaction) * 0.10);
                setAverageFee(fee.toFixed(2));
                return;
            } else if (monthlyVolume > 500000) {
                // (Monthly Volume * (0.20% + 1.85%)) + ((Monthly Volume / Transaction Amount) * $0.10)
                const fee = (monthlyVolume * (0.0020 + 0.0185)) + ((monthlyVolume / avgTransaction) * 0.10);
                setAverageFee(fee.toFixed(2));
                return;
            } else if (monthlyVolume > 100000) {
                // (Monthly Volume * (0.40% + 1.85%)) + ((Monthly Volume / Transaction Amount) * $0.10)
                const fee = (monthlyVolume * (0.0040 + 0.0185)) + ((monthlyVolume / avgTransaction) * 0.10);
                setAverageFee(fee.toFixed(2));
                return;
            } else if (monthlyVolume > 50000) {
                // (Monthly Volume * (0.45% + 1.85%)) + ((Monthly Volume / Transaction Amount) * $0.10)
                const fee = (monthlyVolume * (0.0045 + 0.0185)) + ((monthlyVolume / avgTransaction) * 0.10);
                setAverageFee(fee.toFixed(2));
                return;
            } else {
                // (Monthly Volume * (0.50% + 1.85%)) + ((Monthly Volume / Transaction Amount) * $0.10)
                const fee = (monthlyVolume * (0.0050 + 0.0185)) + ((monthlyVolume / avgTransaction) * 0.10);
                setAverageFee(fee.toFixed(2));
                return;
            }
        }
    }, [averageTransactionSize, monthlyProcessingVolume, cardPresent]);

    return (
        <div className="container flex flex-col items-center justify-center gap-4 py-10 md:py-20 px-4 md:px-2 my-10 rounded-3xl bg-[linear-gradient(76deg,#B0E0F9_-4.48%,#E6F5FD_99.55%)]">
            <SectionHeader
                tag={tag}
                title={title}
                subtitle={subtitle}
            />
            <div className="flex flex-col items-center justify-center gap-4 relative max-w-[660px] w-full bg-white rounded-3xl p-8 mt-10">
                <div className="flex items-center justify-between w-[350px] absolute top-[-24px] left-1/2 -translate-x-1/2 bg-gray-50 rounded-[32px] p-[4px]">
                    <div 
                        className={`px-8 py-2 rounded-[24px] cursor-pointer transition-colors ${
                            cardPresent 
                                ? 'bg-[#1A2339] text-white' 
                                : 'text-[#676D7C] hover:bg-gray-100'
                        }`}
                        onClick={() => setCardPresent(true)}
                    >
                        Card Present
                    </div>
                    <div 
                        className={`px-8 py-2 rounded-[24px] cursor-pointer transition-colors ${
                            !cardPresent 
                                ? 'bg-[#1A2339] text-white' 
                                : 'text-[#676D7C] hover:bg-gray-100'
                        }`}
                        onClick={() => setCardPresent(false)}
                    >
                        Card Not Present
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full pt-8">
                    <div className="bg-gray-50 flex flex-col rounded-lg gap-2 pt-8 pb-4 px-4 w-full lg:2/3">
                        <span className="text-4xl font-medium">{cardPresentText} <span className="text-lg font-normal">{cardPresentTextSmall}</span></span>
                        <div className="flex items-center justify-start gap-2 text-[14px]">
                            <div className="bg-white/3 py-[3px] px-[10px] rounded-sm">
                                <Visa/>
                            </div>
                            <div className="bg-white/3 py-[3px] px-[10px] rounded-sm">
                                <Mastercard/>
                            </div>
                            <div className="bg-white/3 py-[3px] px-[10px] rounded-sm">
                                <Image src="/logos/Discover_Card_logo.svg" alt="Discover" width={63} height={10} />
                            </div>
                        </div>
                    </div>
                    {averageFee && averageFee !== '0.00' &&
                        <div className="bg-gray-50 flex flex-col rounded-lg gap-2 pt-8 pb-4 px-4 w-full lg:w-1/3">
                            <span className="text-4xl font-medium">${parseFloat(averageFee).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            <div className="flex items-center justify-start gap-2 text-[14px]">
                                <div className="p-1">
                                    <span className="text-[#343C50]">Average Cost*</span>
                                </div>
                            </div>
                        </div>
                    }
                    {/* <div className="bg-gray-50 flex flex-col rounded-lg gap-2 pt-8 pb-4 px-4 w-full md:w-1/3">
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
                    </div> */}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
                    <div className="w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="Average transaction size *"
                            value={averageTransactionSize}
                            onChange={(e) => setAverageTransactionSize(e.target.value)}
                            className="w-full text-[14px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <span className="text-[10px] text-[#676D7C]">Average transaction value in USD</span>
                    </div>
                    <div className="w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="Monthly processing volume *"
                            value={monthlyProcessingVolume}
                            onChange={(e) => setMonthlyProcessingVolume(e.target.value)}
                            className="w-full text-[14px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <span className="text-[10px] text-[#676D7C]">Total transactions per month</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center gap-12 max-w-[660px] w-full">
                { smallPrint && <span className="text-center text-[10px] text-[#676D7C]">{smallPrint}</span> }
                <Link href="/signup-today" className="w-full flex flex-col">
                    <Button
                        variant="black"
                    >
                        Get Started
                    </Button>
                </Link>
            </div>
        </div>
    );
}