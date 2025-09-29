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
  embedded?: boolean;
}

export default function CalculatorSection({ data, embedded = false }: CalculatorSectionProps) {
    const { smallPrint, subtitle, tag, title } = data || {};

    const formatCurrencyInput = (value: string) => {
        const sanitized = value.replace(/[^0-9.]/g, "");

        if (!sanitized) {
            return "";
        }

        const [integerPartRaw, ...decimalParts] = sanitized.split(".");
        const strippedInteger = integerPartRaw.replace(/^0+(?=\d)/, "");
        const safeInteger = strippedInteger === "" ? "0" : strippedInteger;
        const formattedInteger = safeInteger.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const decimal = decimalParts.join("");
        const hasTrailingDecimal = sanitized.endsWith(".") && decimal === "";

        if (decimal) {
            return `${formattedInteger}.${decimal}`;
        }

        return hasTrailingDecimal ? `${formattedInteger}.` : formattedInteger;
    };

    const toNumericValue = (value: string) => parseFloat(value.replace(/,/g, ""));
    const [cardPresent, setCardPresent] = useState(true); // true = card present, false = card not present
    const [averageTransactionSize, setAverageTransactionSize] = useState(() => formatCurrencyInput("250"));
    const [monthlyProcessingVolume, setMonthlyProcessingVolume] = useState(() => formatCurrencyInput("60000"));
    const [effectiveRate, setEffectiveRate] = useState('0.00');
    const [cents, setCents] = useState('0');
    const [showPricing, setShowPricing] = useState(false);

    // Card Present - Credit Card Rate
    // Interchange + 0.35% + $0.10
    // Interchange + 0.30% + $0.10
    // Interchange + 0.25% + $0.10
    // Interchange + 0.20% + $0.08
    // Interchange + 0.15% + $0.08

    // Card Not Present - Credit Card Rate
    // Interchange + 0.50% + $0.20
    // Interchange + 0.45% + $0.20
    // Interchange + 0.40% + $0.15
    // Interchange + 0.20% + $0.15
    // Interchange + 0.10% + $0.12

    // Derived values for pricing table
    const currentMonthlyVolume = toNumericValue(monthlyProcessingVolume) || 0;
    const pricingRows = cardPresent
        ? [
            { range: 'Under $50K', rate: 'Interchange + 0.35% + 10¢' },
            { range: '$50K - $100K', rate: 'Interchange + 0.30% + 10¢' },
            { range: '$100K - $500K', rate: 'Interchange + 0.25% + 10¢' },
            { range: '$500K - $1M', rate: 'Interchange + 0.20% + 8¢' },
            { range: '$1M+', rate: 'Interchange + 0.15% + 8¢' },
        ]
        : [
            { range: 'Under $50K', rate: 'Interchange + 0.50% + 20¢' },
            { range: '$50K - $100K', rate: 'Interchange + 0.45% + 20¢' },
            { range: '$100K - $500K', rate: 'Interchange + 0.40% + 15¢' },
            { range: '$500K - $1M', rate: 'Interchange + 0.20% + 15¢' },
            { range: '$1M+', rate: 'Interchange + 0.10% + 12¢' },
        ];

    const activeTierIndex = (() => {
        if (currentMonthlyVolume >= 1_000_000) return 4; // $1M+
        if (currentMonthlyVolume >= 500_000) return 3;   // $500K - $1M
        if (currentMonthlyVolume >= 100_000) return 2;   // $100K - $500K
        if (currentMonthlyVolume >= 50_000) return 1;    // $50K - $100K
        return 0;                                        // Under $50K
    })();

    // Calculate fees based on average transaction size and monthly processing volume
    useEffect(() => {
        const avgTransaction = toNumericValue(averageTransactionSize);
        const monthlyVolume = toNumericValue(monthlyProcessingVolume);

        // Reset to 0.00 if inputs are invalid or empty
        if (isNaN(avgTransaction) || isNaN(monthlyVolume) || avgTransaction <= 0 || monthlyVolume <= 0) {
            setEffectiveRate('1.74');
            setCents('8');
            // setAverageFee('0.00');
            return;
        }

        if (cardPresent) {
            if (monthlyVolume > 1000000) {
                // (Monthly Volume * (0.15% + 1.40%)) + ((Monthly Volume / Transaction Amount) * $0.08)
                const fee = (monthlyVolume * (0.0015 + 0.014)) + ((monthlyVolume / avgTransaction) * 0.08);
                const effectiveRate = (fee / monthlyVolume) * 100;
                setEffectiveRate(effectiveRate.toFixed(2));
                setCents('8');
                return;
            } else if (monthlyVolume > 500000) {
                // (Monthly Volume * (0.20% + 1.40%)) + ((Monthly Volume / Transaction Amount) * $0.08)
                const fee = (monthlyVolume * (0.0020 + 0.0140)) + ((monthlyVolume / avgTransaction) * 0.08);
                const effectiveRate = (fee / monthlyVolume) * 100;
                setEffectiveRate(effectiveRate.toFixed(2));
                setCents('8');
                return;
            } else if (monthlyVolume > 100000) {
                // (Monthly Volume * (0.25% + 1.40%)) + ((Monthly Volume / Transaction Amount) * $0.10)
                const fee = (monthlyVolume * (0.0025 + 0.0140)) + ((monthlyVolume / avgTransaction) * 0.10);
                const effectiveRate = (fee / monthlyVolume) * 100;
                setEffectiveRate(effectiveRate.toFixed(2));
                setCents('10');
                return;
            } else if (monthlyVolume > 50000) {
                // (Monthly Volume * (0.30% + 1.40%)) + ((Monthly Volume / Transaction Amount) * $0.10)
                const fee = (monthlyVolume * (0.0030 + 0.0140)) + ((monthlyVolume / avgTransaction) * 0.10);
                const effectiveRate = (fee / monthlyVolume) * 100;
                setEffectiveRate(effectiveRate.toFixed(2));
                setCents('10');
                return;
            } else {
                // (Monthly Volume * (0.35% + 1.40%)) + ((Monthly Volume / Transaction Amount) * $0.10)
                const fee = (monthlyVolume * (0.0035 + 0.0140)) + ((monthlyVolume / avgTransaction) * 0.10);
                const effectiveRate = (fee / monthlyVolume) * 100;
                setEffectiveRate(effectiveRate.toFixed(2));
                setCents('10');
                return;
            }
        } else {
            if (monthlyVolume > 1000000) {
                // (Monthly Volume * (0.10% + 1.85%)) + ((Monthly Volume / Transaction Amount) * $0.12)
                const fee = (monthlyVolume * (0.0010 + 0.0185)) + ((monthlyVolume / avgTransaction) * 0.12);
                const effectiveRate = (fee / monthlyVolume) * 100;
                setEffectiveRate(effectiveRate.toFixed(2));
                setCents('12');
                return;
            } else if (monthlyVolume > 500000) {
                // (Monthly Volume * (0.20% + 1.85%)) + ((Monthly Volume / Transaction Amount) * $0.12)
                const fee = (monthlyVolume * (0.0020 + 0.0185)) + ((monthlyVolume / avgTransaction) * 0.15);
                const effectiveRate = (fee / monthlyVolume) * 100;
                setEffectiveRate(effectiveRate.toFixed(2));
                setCents('15');
                return;
            } else if (monthlyVolume > 100000) {
                // (Monthly Volume * (0.40% + 1.85%)) + ((Monthly Volume / Transaction Amount) * $0.15)
                const fee = (monthlyVolume * (0.0040 + 0.0185)) + ((monthlyVolume / avgTransaction) * 0.15);
                const effectiveRate = (fee / monthlyVolume) * 100;
                setEffectiveRate(effectiveRate.toFixed(2));
                setCents('15');
                return;
            } else if (monthlyVolume > 50000) {
                // (Monthly Volume * (0.45% + 1.85%)) + ((Monthly Volume / Transaction Amount) * $0.20)
                const fee = (monthlyVolume * (0.0045 + 0.0185)) + ((monthlyVolume / avgTransaction) * 0.20);
                const effectiveRate = (fee / monthlyVolume) * 100;
                setEffectiveRate(effectiveRate.toFixed(2));
                setCents('20');
                return;
            } else {
                // (Monthly Volume * (0.50% + 1.85%)) + ((Monthly Volume / Transaction Amount) * $0.20)
                const fee = (monthlyVolume * (0.0050 + 0.0185)) + ((monthlyVolume / avgTransaction) * 0.20);
                const effectiveRate = (fee / monthlyVolume) * 100;
                setEffectiveRate(effectiveRate.toFixed(2));
                setCents('20');
                return;
            }
        }
    }, [averageTransactionSize, monthlyProcessingVolume, cardPresent]);

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
                        <span className="text-5xl font-medium text-center">{effectiveRate}% <span className="text-lg font-normal">+{cents}¢</span></span>
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
                    {/* {averageFee && averageFee !== '0.00' &&
                        <div className="bg-gray-50 flex flex-col rounded-lg gap-2 pt-8 pb-4 px-4 w-full lg:w-1/3">
                            <span className="text-4xl font-medium">${parseFloat(averageFee).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            <div className="flex items-center justify-start gap-2 text-[14px]">
                                <div className="p-1">
                                    <span className="text-[#343C50]">Average Cost*</span>
                                </div>
                            </div>
                        </div>
                    } */}
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
                        <div className="relative">
                            <span className="pointer-events-none absolute left-4 top-[28px] -translate-y-1/2 text-[#676D7C] text-sm">$</span>
                            <input
                                type="text"
                                placeholder="Average transaction size *"
                                value={averageTransactionSize}
                                onChange={(e) => setAverageTransactionSize(formatCurrencyInput(e.target.value))}
                                className="w-full text-[14px] py-4 pr-4 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <span className="text-[10px] text-[#676D7C]">Average transaction value in USD</span>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            <span className="pointer-events-none absolute left-4 top-[28px] -translate-y-1/2 text-[#676D7C] text-sm">$</span>
                            <input
                                type="text"
                                placeholder="Monthly processing volume *"
                                value={monthlyProcessingVolume}
                                onChange={(e) => setMonthlyProcessingVolume(formatCurrencyInput(e.target.value))}
                                className="w-full text-[14px] py-4 pr-4 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <span className="text-[10px] text-[#676D7C]">Total transactions per month</span>
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
