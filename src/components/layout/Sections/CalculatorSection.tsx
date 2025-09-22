"use client";

import { useState, useEffect} from "react";
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
    embedded?: boolean;
}

export default function CalculatorSection({ data, embedded = false }: CalculatorSectionProps) {
    const { smallPrint, subtitle, tag, title } = data || {};
    const [cardPresent, setCardPresent] = useState(true); // true = card present, false = card not present
    const [sliderValue, setSliderValue] = useState(0); // 0-7 representing the volume tiers
    const [cardPresentText, setCardPresentText] = useState('1.75%');
    const [cardPresentTextSmall, setCardPresentTextSmall] = useState('+10¢');
    const [showPricing, setShowPricing] = useState(false);

    // Predefined monthly volume tiers
    const volumeTiers = [
        { label: '$5K', value: 5000, avgTransaction: 50 },
        { label: '$10K', value: 10000, avgTransaction: 50 },
        { label: '$25K', value: 25000, avgTransaction: 50 },
        { label: '$50K', value: 50000, avgTransaction: 75 },
        { label: '$100K', value: 100000, avgTransaction: 100 },
        { label: '$250K', value: 250000, avgTransaction: 150 },
        { label: '$500K', value: 500000, avgTransaction: 150 },
        { label: '$1M+', value: 1000000, avgTransaction: 200 }
    ];


    useEffect(() => {
        const currentTier = volumeTiers[sliderValue];
        const monthlyVolume = currentTier?.value || 0;
        
        let percentageRate;
        if (cardPresent) {
            if (monthlyVolume >= 1000000) {
                percentageRate = 1.55;
            } else if (monthlyVolume >= 500000) {
                percentageRate = 1.60;
            } else if (monthlyVolume >= 100000) {
                percentageRate = 1.65;
            } else if (monthlyVolume >= 50000) {
                percentageRate = 1.70;
            } else {
                percentageRate = 1.75;
            }
        } else {
            if (monthlyVolume >= 1000000) {
                percentageRate = 1.95;
            } else if (monthlyVolume >= 500000) {
                percentageRate = 2.05;
            } else if (monthlyVolume >= 100000) {
                percentageRate = 2.25;
            } else if (monthlyVolume >= 50000) {
                percentageRate = 2.30;
            } else {
                percentageRate = 2.35;
            }
        }
        
        setCardPresentText(`${percentageRate}%`);
        setCardPresentTextSmall('+10¢');
    }, [cardPresent, sliderValue, volumeTiers]);

    // // Calculate fees based on slider selection
    // useEffect(() => {
    //     const currentTier = volumeTiers[sliderValue];
    //     const monthlyVolume = currentTier.value;

    //     if (cardPresent) {
    //         let percentageRate;
    //         if (monthlyVolume >= 1000000) {
    //             percentageRate = 0.0155; // 1.55% (0.15% + 1.40% interchange)
    //         } else if (monthlyVolume >= 500000) {
    //             percentageRate = 0.0160; // 1.60% (0.20% + 1.40% interchange)
    //         } else if (monthlyVolume >= 100000) {
    //             percentageRate = 0.0165; // 1.65% (0.25% + 1.40% interchange)
    //         } else if (monthlyVolume >= 50000) {
    //             percentageRate = 0.0170; // 1.70% (0.30% + 1.40% interchange)
    //         } else {
    //             percentageRate = 0.0175; // 1.75% (0.35% + 1.40% interchange)
    //         }
    //     } else {
    //         let percentageRate;
    //         if (monthlyVolume >= 1000000) {
    //             percentageRate = 0.0195; // 1.95% (0.10% + 1.85% interchange)
    //         } else if (monthlyVolume >= 500000) {
    //             percentageRate = 0.0205; // 2.05% (0.20% + 1.85% interchange)
    //         } else if (monthlyVolume >= 100000) {
    //             percentageRate = 0.0225; // 2.25% (0.40% + 1.85% interchange)
    //         } else if (monthlyVolume >= 50000) {
    //             percentageRate = 0.0230; // 2.30% (0.45% + 1.85% interchange)
    //         } else {
    //             percentageRate = 0.0235; // 2.35% (0.50% + 1.85% interchange)
    //         }
    //     }

    // }, [sliderValue, cardPresent]);

    // Derived values for pricing table
    const currentMonthlyVolume = volumeTiers[sliderValue]?.value ?? 0;
    const pricingRows = cardPresent
        ? [
            { range: 'Under $50K', rate: '1.75% +10¢' },
            { range: '$50K - $100K', rate: '1.70% +10¢' },
            { range: '$100K - $500K', rate: '1.65% +10¢' },
            { range: '$500K - $1M', rate: '1.60% +10¢' },
            { range: '$1M+', rate: '1.55% +10¢' },
        ]
        : [
            { range: 'Under $50K', rate: '2.35% +10¢' },
            { range: '$50K - $100K', rate: '2.30% +10¢' },
            { range: '$100K - $500K', rate: '2.25% +10¢' },
            { range: '$500K - $1M', rate: '2.05% +10¢' },
            { range: '$1M+', rate: '1.95% +10¢' },
        ];

    const activeTierIndex = (() => {
        if (currentMonthlyVolume >= 1_000_000) return 4; // $1M+
        if (currentMonthlyVolume >= 500_000) return 3;   // $500K - $1M
        if (currentMonthlyVolume >= 100_000) return 2;   // $100K - $500K
        if (currentMonthlyVolume >= 50_000) return 1;    // $50K - $100K
        return 0;                                        // Under $50K
    })();

    return (
        <div className={embedded ? "w-full flex flex-col items-center justify-center" : "container flex flex-col items-center justify-center gap-4 py-10 md:py-20 px-4 md:px-2 my-10 rounded-3xl bg-[linear-gradient(76deg,#B0E0F9_-4.48%,#E6F5FD_99.55%)]"}>
            {!embedded && (
                <SectionHeader
                    tag={tag}
                    title={title}
                    subtitle={subtitle}
                />
            )}
            <div className={`${embedded ? "shadow-lg" : ''} flex flex-col items-center justify-center gap-4 relative max-w-[660px] w-full bg-white rounded-3xl p-8 mt-10`}>
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
                        <span className="text-4xl font-bold text-center">{cardPresentText} <span className="text-lg font-normal">{cardPresentTextSmall}</span></span>
                        <div className="flex items-center justify-center gap-2 text-[14px]">
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
                <div className="flex flex-col items-center justify-center gap-4 w-full">
                    <div className="w-full max-w-md">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Monthly Sales Volume
                            </label>
                            <div className="relative">
                                <input
                                    type="range"
                                    min="0"
                                    max="7"
                                    value={sliderValue}
                                    onChange={(e) => setSliderValue(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 range-slider"
                                    style={{
                                        background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(sliderValue / 7) * 100}%, #E5E7EB ${(sliderValue / 7) * 100}%, #E5E7EB 100%)`
                                    }}
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    {volumeTiers.map((tier, index) => (
                                        <span key={index} className={`${index === sliderValue ? 'font-semibold text-blue-600' : ''}`}>
                                            {tier.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Toggle: See your rate */}
                <div className="w-full mt-4">
                    <button
                        type="button"
                        onClick={() => setShowPricing((v) => !v)}
                        className="w-full flex items-center justify-center gap-2 text-[#1A2339] hover:text-[#0f1424] font-medium py-3 border-t border-gray-200 cursor-pointer"
                        aria-expanded={showPricing}
                        aria-controls="pricing-table"
                    >
                        <svg
                            className={`h-5 w-5 transition-transform duration-200 ${showPricing ? 'rotate-180' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                        </svg>
                        <span>See your rate</span>
                    </button>
                    {showPricing && (
                        <div id="pricing-table" className="mt-3 w-full overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="text-left text-sm font-semibold text-gray-700 px-4 py-2 border-b border-b-gray-100">Monthly Volume</th>
                                            <th className="text-left text-sm font-semibold text-gray-700 px-4 py-2 border-b border-b-gray-100">Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pricingRows.map((row, idx) => (
                                            <tr key={row.range} className={`${idx === activeTierIndex ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-50`}>
                                                <td className="px-4 py-2 border-b border-b-gray-100 text-sm text-[#343C50]">{row.range}</td>
                                                <td className="px-4 py-2 border-b border-b-gray-100 text-sm font-medium text-[#1A2339]">{row.rate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {!embedded && (
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
            )}
        </div>
    );
}