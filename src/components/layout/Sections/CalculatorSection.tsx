"use client";

import { useState, useEffect } from "react";
import ArrowRight from "@/components/icons/ArrowRight";
import ArrowDown from "@/components/icons/ArrowDown";
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
        <div className={embedded ? "w-full flex flex-col items-center justify-center" : "container flex flex-col items-center justify-center gap-10 py-10 md:py-20 px-4 md:px-2 my-10 rounded-[40px] bg-[linear-gradient(76deg,#B0E0F9_-4.48%,#E6F5FD_99.55%)]"}>
            {!embedded && (
                <SectionHeader
                    tag={tag}
                    title={title}
                    subtitle={subtitle}
                />
            )}
            <div className="w-full max-w-[894px] bg-white border border-black/6 rounded-xl shadow-[0px_0px_32px_0px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="flex flex-col md:flex-row gap-4 p-6">
                    <div className="flex-1 flex flex-col gap-1.5">
                        <span className="text-base text-[#040405]">Card Present <span className="text-[#B9442E]">*</span></span>
                        <div className="flex h-[52px]">
                            <button
                                type="button"
                                onClick={() => setCardPresent(true)}
                                className={`flex-1 flex items-center justify-center rounded-l-sm text-base cursor-pointer transition-colors ${
                                    cardPresent ? 'bg-[#040405] text-white' : 'bg-white text-black/60 border border-black/20'
                                }`}
                            >
                                Yes
                            </button>
                            <button
                                type="button"
                                onClick={() => setCardPresent(false)}
                                className={`flex-1 flex items-center justify-center rounded-r-sm text-base cursor-pointer transition-colors ${
                                    !cardPresent ? 'bg-[#040405] text-white' : 'bg-white text-black/60 border border-black/20'
                                }`}
                            >
                                No
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                        <label htmlFor="average-transaction-size" className="text-base text-[#040405]">Average transaction size <span className="text-[#B9442E]">*</span></label>
                        <div className="flex items-center gap-2 h-[52px] px-4 border border-[#040405] rounded-sm has-focus:ring-2 has-focus:ring-black/20">
                            <span className="flex items-center gap-1 text-base text-black/60 shrink-0">
                                USD <ArrowDown className="size-4" fill="currentColor" />
                            </span>
                            <input
                                id="average-transaction-size"
                                type="text"
                                value={averageTransactionSize}
                                onChange={(e) => setAverageTransactionSize(formatCurrencyInput(e.target.value))}
                                className="flex-1 min-w-0 text-base text-[#040405] outline-none bg-transparent"/>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                        <label htmlFor="monthly-processing-volume" className="text-base text-[#040405]">Monthly processing volume <span className="text-[#B9442E]">*</span></label>
                        <div className="flex items-center gap-2 h-[52px] px-4 border border-[#040405] rounded-sm has-focus:ring-2 has-focus:ring-black/20">
                            <span className="flex items-center gap-1 text-base text-black/60 shrink-0">
                                USD <ArrowDown className="size-4" fill="currentColor" />
                            </span>
                            <input
                                id="monthly-processing-volume"
                                type="text"
                                value={monthlyProcessingVolume}
                                onChange={(e) => setMonthlyProcessingVolume(formatCurrencyInput(e.target.value))}
                                className="flex-1 min-w-0 text-base text-[#040405] outline-none bg-transparent"/>
                        </div>
                    </div>
                </div>
                <div className="h-px w-full bg-black/6" />
                <div className="flex flex-col md:flex-row gap-4 bg-black/4 p-6">
                    <div className="w-full md:w-[258px] shrink-0 flex flex-col gap-3 bg-white border border-black/6 rounded-xl p-5">
                        <div className="flex flex-col gap-1 text-[#040405]">
                            <span className="text-sm">Our fees:</span>
                            <div className="flex items-center gap-3">
                                <span className="text-[44px] leading-12 tracking-[-1px] font-medium">{effectiveRate}%</span>
                                <span className="text-xl leading-7 font-medium">+{cents}¢</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="h-6 w-[39px] flex items-center justify-center bg-white border border-black/6 rounded-sm">
                                <Visa/>
                            </div>
                            <div className="h-6 w-[39px] flex items-center justify-center bg-white border border-black/6 rounded-sm">
                                <Mastercard/>
                            </div>
                            <div className="h-6 w-[39px] flex items-center justify-center bg-white border border-black/6 rounded-sm">
                                <Image src="/logos/Discover_Card_logo.svg" alt="Discover" width={39} height={10} />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-white border border-black/6 rounded-xl px-5 pt-5 pb-10">
                        <div className="flex gap-4 md:gap-10 px-2 text-sm font-medium text-[#040405]">
                            <span className="flex-1 min-w-0">Monthly Volume</span>
                            <span className="flex-1 min-w-0">Rate</span>
                        </div>
                        {pricingRows.map((row, idx) => (
                            <div key={row.range}>
                                {idx > 0 && <div className="h-px w-full bg-black/6" />}
                                <div className={`flex gap-4 md:gap-10 px-2 py-1.5 text-sm ${idx === activeTierIndex ? 'bg-[#E6F5FD]' : ''}`}>
                                    <span className="flex-1 min-w-0 text-black/60">{row.range}</span>
                                    <span className="flex-1 min-w-0 font-medium text-[#040405]">{row.rate}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {!embedded && (
                <div className="flex flex-col items-center gap-4 w-full max-w-[343px] md:max-w-none">
                    { smallPrint && <span className="text-center text-[10px] text-black/60">{smallPrint}</span> }
                    <Link href="/signup-today" className="block w-full md:w-auto">
                        <Button variant="heroPrimary">
                            Get Started
                            <ArrowRight fill="currentColor" />
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
