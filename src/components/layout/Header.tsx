"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ArrowDown from "../icons/ArrowDown";
import HamburgerMenu from "../icons/HamburgerMenu";
import Logo from "../icons/Logo";
import Button from "../ui/Button";
import CreditCardIcon from "../icons/CreditCardIcon";
import POSTerminalIcon from "../icons/POSTerminalIcon";
import OnlinePaymentIcon from "../icons/OnlinePaymentIcon";
import APIIcon from "../icons/APIIcon";
import RecurringPaymentIcon from "../icons/RecurringPaymentIcon";
import HighRiskIcon from "../icons/HighRiskIcon";
import PaylineConnectIcon from "../icons/PaylineConnectIcon";

interface HeaderProps {
    variant?: "light" | "dark";
}

export default function Header({ variant = "light" }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null);
    const pathname = usePathname();

    // Hide Get Started button on /apply page
    const hideGetStartedButton = pathname === "/apply";

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const isHeaderSolid = isMobileMenuOpen || activeDesktopMenu !== null;
    const isDark = variant === "dark" && !isHeaderSolid;
    const navTextClass = isDark ? "text-white" : "text-[#010B24]";
    const navIconFill = isDark ? "#FFFFFF" : "#010B24";

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <div className={`transition-colors duration-200 ${isHeaderSolid ? "bg-white" : "bg-white/0"}`}>
                <div className="container relative z-40 flex h-[74px] items-center justify-between">
                    <div className="flex items-center gap-4 lg:gap-6">
                        <Link href="/" aria-label="Payline Home">
                            <Logo className="h-8 w-auto" fill={isDark ? "#FFFFFF" : "#010B24"} />
                        </Link>
                        <div className={`hidden h-7 w-px lg:block ${isDark ? "bg-white/20" : "bg-[#E6EAF1]"}`} />
                        <a href="tel:+17792178932" className="hidden text-[16px] leading-none font-normal text-[#55BCF2] hover:underline lg:block">
                            +1 (779) 217-8932
                        </a>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-8">
                        <nav className="hidden items-center gap-10 lg:flex">
                    <div
                        className="relative inline-block"
                        onMouseEnter={() => setActiveDesktopMenu("solutions")}
                        onMouseLeave={() => setActiveDesktopMenu(null)}
                    >
                        <button className={`flex items-center gap-1 text-[15px] font-medium cursor-pointer focus:outline-none ${navTextClass}`}>
                            Solutions
                            <ArrowDown className="h-4 w-4" fill={navIconFill} />
                        </button>
                        {/* Invisible bridge so hover doesn't drop between the trigger and the dropdown below it */}
                        <div className={`absolute left-1/2 top-0 h-[66px] w-[730px] -translate-x-[38%] ${activeDesktopMenu === "solutions" ? "pointer-events-auto" : "pointer-events-none"}`} />
                        <div className={`absolute top-[66px] left-1/2 z-20 w-[730px] -translate-x-[38%] rounded-2xl border border-black/8 bg-white p-5 shadow-[0_20px_60px_rgba(1,11,36,0.12)] transition-all duration-250 ease-out ${activeDesktopMenu === "solutions" ? "translate-y-0 opacity-100 visible pointer-events-auto" : "-translate-y-2 opacity-0 invisible pointer-events-none"}`}>
                            <div className="grid grid-cols-3 gap-8">
                                {/* Payment Types Section */}
                                <div>
                                    <h3 className="mb-3 text-[17px] font-medium text-[#019BEC]">Payments</h3>
                                    <div className="space-y-3">
                                        <Link
                                            href="/in-person-payments"
                                            className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/4 text-black/55">
                                                <POSTerminalIcon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="text-[16px] leading-none text-[#343A46]">In-Person Payments</div>
                                                <div className="mt-1 text-[13px] leading-none text-[#676D7C]">Accept payments at your location</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/online-payments"
                                            className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/4 text-black/55">
                                                <OnlinePaymentIcon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="text-[16px] leading-none text-[#343A46]">Online Payments</div>
                                                <div className="mt-1 text-[13px] leading-none text-[#676D7C]">Secure eCommerce processing</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/high-risk-merchant-account"
                                            className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/4 text-black/55">
                                                <HighRiskIcon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="text-[16px] leading-none text-[#343A46]">High Risk Payments</div>
                                                <div className="mt-1 text-[13px] leading-none text-[#676D7C]">Specialized high-risk processing</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                {/* Products Section */}
                                <div>
                                    <h3 className="mb-3 text-[17px] font-medium text-[#019BEC]">Products</h3>
                                    <div className="space-y-3">
                                        <Link
                                            href="/payments-link"
                                            className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/4 text-black/55">
                                                <APIIcon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="text-[16px] leading-none text-[#343A46]">Payment Links</div>
                                                <div className="mt-1 text-[13px] leading-none text-[#676D7C]">No code payments</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/recurring-payments"
                                            className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/4 text-black/55">
                                                <RecurringPaymentIcon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="text-[16px] leading-none text-[#343A46]">Recurring</div>
                                                <div className="mt-1 text-[13px] leading-none text-[#676D7C]">Automated Subscription billing</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                
                                {/* Hardware Section */}
                                <div>
                                    <h3 className="mb-3 text-[17px] font-medium text-[#019BEC]">Hardware</h3>
                                    <div className="space-y-3">
                                        <Link
                                            href="/countertop-terminals"
                                            className="block rounded-lg p-1 transition-colors hover:bg-gray-50"
                                        >
                                            <div className="text-[16px] leading-none text-[#343A46]">Countertop Terminal</div>
                                        </Link>
                                        <Link
                                            href="/smart-terminal"
                                            className="block rounded-lg p-1 transition-colors hover:bg-gray-50"
                                        >
                                            <div className="text-[16px] leading-none text-[#343A46]">Smart Terminal</div>
                                        </Link>
                                        <Link
                                            href="/mobile-app-card-reader"
                                            className="block rounded-lg p-1 transition-colors hover:bg-gray-50"
                                        >
                                            <div className="text-[16px] leading-none text-[#343A46]">Mobile Reader</div>
                                        </Link>
                                        <Link
                                            href="/pos"
                                            className="block rounded-lg p-1 transition-colors hover:bg-gray-50"
                                        >
                                            <div className="text-[16px] leading-none text-[#343A46]">Basic POS</div>
                                        </Link>
                                        <Link
                                            href="/all-in-one-pos"
                                            className="block rounded-lg p-1 transition-colors hover:bg-gray-50"
                                        >
                                            <div className="text-[16px] leading-none text-[#343A46]">All-in-one POS</div>
                                        </Link>
                                        <Link
                                            href="/virtual-terminal-online-dashboard"
                                            className="block rounded-lg p-1 transition-colors hover:bg-gray-50"
                                        >
                                            <div className="text-[16px] leading-none text-[#343A46]">Virtual Terminal</div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="relative inline-block"
                        onMouseEnter={() => setActiveDesktopMenu("who")}
                        onMouseLeave={() => setActiveDesktopMenu(null)}
                    >
                        <button className={`flex items-center gap-1 text-[15px] font-medium cursor-pointer focus:outline-none ${navTextClass}`}>
                            Who we serve
                            <ArrowDown className="h-4 w-4" fill={navIconFill} />
                        </button>
                        {/* Invisible bridge so hover doesn't drop between the trigger and the dropdown below it */}
                        <div className={`absolute left-1/2 top-0 h-[66px] w-[510px] -translate-x-1/2 ${activeDesktopMenu === "who" ? "pointer-events-auto" : "pointer-events-none"}`} />
                        <div className={`absolute top-[66px] left-1/2 z-20 w-[510px] -translate-x-1/2 rounded-2xl border border-black/8 bg-white p-5 shadow-[0_20px_60px_rgba(1,11,36,0.12)] transition-all duration-250 ease-out ${activeDesktopMenu === "who" ? "translate-y-0 opacity-100 visible pointer-events-auto" : "-translate-y-2 opacity-0 invisible pointer-events-none"}`}>
                            <h3 className="mb-4 text-[17px] font-medium text-[#019BEC]">Who we serve</h3>
                            <div className="grid grid-cols-2 gap-x-7 gap-y-4">
                                <Link
                                    href="/payline-connect"
                                    className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/4 text-black/55">
                                        <PaylineConnectIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-[16px] leading-none text-[#343A46]">Software Companies</div>
                                        <div className="mt-1 text-[13px] leading-none text-[#676D7C]">Integrate payments & grow revenue</div>
                                    </div>
                                </Link>
                                <Link
                                    href="/agents-and-isos"
                                    className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/4 text-black/55">
                                        <HighRiskIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-[16px] leading-none text-[#343A46]">Sales Partners</div>
                                        <div className="mt-1 text-[13px] leading-none text-[#676D7C]">Agents & ISO program</div>
                                    </div>
                                </Link>
                                <Link
                                    href="/partners"
                                    className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/4 text-black/55">
                                        <CreditCardIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-[16px] leading-none text-[#343A46]">Associations</div>
                                        <div className="mt-1 text-[13px] leading-none text-[#676D7C]">Empower your members</div>
                                    </div>
                                </Link>

                                <Link
                                    href="/partners"
                                    className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/4 text-black/55">
                                        <POSTerminalIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-[16px] leading-none text-[#343A46]">Merchants</div>
                                        <div className="mt-1 text-[13px] leading-none text-[#676D7C]">Accept Payments</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div
                        className="relative inline-block"
                        onMouseEnter={() => setActiveDesktopMenu("developers")}
                        onMouseLeave={() => setActiveDesktopMenu(null)}
                    >
                        <button className={`flex items-center gap-1 text-[15px] font-medium cursor-pointer focus:outline-none ${navTextClass}`}>
                            Developers
                            <ArrowDown className="h-4 w-4" fill={navIconFill} />
                        </button>
                        {/* Invisible bridge so hover doesn't drop between the trigger and the dropdown below it */}
                        <div className={`absolute right-0 top-0 h-[66px] w-[300px] ${activeDesktopMenu === "developers" ? "pointer-events-auto" : "pointer-events-none"}`} />
                        <div className={`absolute top-[66px] right-0 z-20 w-[300px] rounded-2xl border border-black/8 bg-white p-5 shadow-[0_20px_60px_rgba(1,11,36,0.12)] transition-all duration-250 ease-out ${activeDesktopMenu === "developers" ? "translate-y-0 opacity-100 visible pointer-events-auto" : "-translate-y-2 opacity-0 invisible pointer-events-none"}`}>
                            <h3 className="mb-4 text-[17px] font-medium text-[#019BEC]">Developers</h3>
                            <div className="space-y-3">
                                <Link href="https://payline.transactiongateway.com/merchants/resources/integration/integration_portal.php" target="_blank" className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/4 text-black/55">
                                        <APIIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-[16px] leading-none text-[#343A46]">APIs</div>
                                        <div className="mt-1 text-[13px] leading-none text-[#676D7C]">Embed payments into your platform</div>
                                    </div>
                                </Link>
                                <Link href="/digital-merchant-onboarding" className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/4 text-black/55">
                                        <RecurringPaymentIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-[16px] leading-none text-[#343A46]">No Code</div>
                                        <div className="mt-1 text-[13px] leading-none text-[#676D7C]">No code & low code for fast implementation</div>
                                    </div>
                                </Link>
                                <Link href="/digital-merchant-onboarding" className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/4 text-black/55">
                                        <RecurringPaymentIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-[16px] leading-none text-[#343A46]">Boarding</div>
                                        <div className="mt-1 text-[13px] leading-none text-[#676D7C]">API & Hosted form onboarding</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Link href="/credit-card-processing-pricing" className={`text-[15px] font-medium ${navTextClass}`}>
                        Pricing
                    </Link>
                </nav>

                {!hideGetStartedButton && (
                    <div>
                        <Link href="/apply">
                            <Button variant="heroPrimary">Get Started</Button>
                        </Link>
                    </div>
                )}
                <div
                    className={`lg:hidden rounded-full p-3 cursor-pointer ${isDark ? "bg-white/10" : "bg-[rgba(1,11,36,0.08)]"}`}
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? (
                        <span className="block w-6 text-center text-[24px] leading-6 text-[#010B24]">×</span>
                    ) : (
                        <HamburgerMenu fill={navIconFill} />
                    )}
                </div>
            </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute left-0 right-0 top-[74px] z-50 h-[calc(100vh-74px)] overflow-y-auto border-t border-black/8 bg-white pb-8 lg:hidden">
                    <div className="container py-6">
                        <nav className="space-y-8">
                            <div>
                                <h3 className="mb-3 border-b border-black/8 pb-3 text-[19px] font-medium text-[#019BEC]">Payments</h3>
                                <div className="space-y-4">
                                    <Link href="/in-person-payments" className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black/4 text-black/55">
                                            <POSTerminalIcon className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <div className="text-[20px] leading-none text-[#343A46]">In-Person Payments</div>
                                            <div className="mt-1 text-[16px] leading-none text-[#676D7C]">Accept payments at your location</div>
                                        </div>
                                    </Link>
                                    <Link href="/online-payments" className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black/4 text-black/55">
                                            <OnlinePaymentIcon className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <div className="text-[20px] leading-none text-[#343A46]">Online Payments</div>
                                            <div className="mt-1 text-[16px] leading-none text-[#676D7C]">Secure eCommerce processing</div>
                                        </div>
                                    </Link>
                                    <Link href="/high-risk-merchant-account" className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black/4 text-black/55">
                                            <HighRiskIcon className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <div className="text-[20px] leading-none text-[#343A46]">High Risk Payments</div>
                                            <div className="mt-1 text-[16px] leading-none text-[#676D7C]">Specialized high-risk processing</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 border-b border-black/8 pb-3 text-[19px] font-medium text-[#019BEC]">Products</h3>
                                <div className="space-y-4">
                                    <Link href="/payments-link" className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black/4 text-black/55">
                                            <APIIcon className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <div className="text-[20px] leading-none text-[#343A46]">Payment Links</div>
                                            <div className="mt-1 text-[16px] leading-none text-[#676D7C]">No code payments</div>
                                        </div>
                                    </Link>
                                    <Link href="/recurring-payments" className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black/4 text-black/55">
                                            <RecurringPaymentIcon className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <div className="text-[20px] leading-none text-[#343A46]">Recurring</div>
                                            <div className="mt-1 text-[16px] leading-none text-[#676D7C]">Automated Subscription billing</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 border-b border-black/8 pb-3 text-[19px] font-medium text-[#019BEC]">Hardware</h3>
                                <div className="space-y-5 text-[20px] leading-none text-[#343A46]">
                                    <Link href="/countertop-terminals" className="block">Countertop Terminal</Link>
                                    <Link href="/smart-terminal" className="block">Smart Terminal</Link>
                                    <Link href="/mobile-app-card-reader" className="block">Mobile Reader</Link>
                                    <Link href="/pos" className="block">Basic POS</Link>
                                    <Link href="/all-in-one-pos" className="block">All-in-one POS</Link>
                                    <Link href="/virtual-terminal-online-dashboard" className="block">Virtual Terminal</Link>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 border-b border-black/8 pb-3 text-[19px] font-medium text-[#019BEC]">Who we serve</h3>
                                <div className="space-y-4">
                                    <Link href="/payline-connect" className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black/4 text-black/55">
                                            <PaylineConnectIcon className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <div className="text-[20px] leading-none text-[#343A46]">Software Companies</div>
                                            <div className="mt-1 text-[16px] leading-none text-[#676D7C]">Integrate payments & grow revenue</div>
                                        </div>
                                    </Link>
                                    <Link href="/agents-and-isos" className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black/4 text-black/55">
                                            <HighRiskIcon className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <div className="text-[20px] leading-none text-[#343A46]">Sales Partners</div>
                                            <div className="mt-1 text-[16px] leading-none text-[#676D7C]">Agents & ISO program</div>
                                        </div>
                                    </Link>
                                    <Link href="/partners" className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black/4 text-black/55">
                                            <CreditCardIcon className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <div className="text-[20px] leading-none text-[#343A46]">Associations</div>
                                            <div className="mt-1 text-[16px] leading-none text-[#676D7C]">Empower your members</div>
                                        </div>
                                    </Link>
                                    <Link href="/partners" className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black/4 text-black/55">
                                            <POSTerminalIcon className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <div className="text-[20px] leading-none text-[#343A46]">Merchants</div>
                                            <div className="mt-1 text-[16px] leading-none text-[#676D7C]">Accept Payments</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 border-b border-black/8 pb-3 text-[19px] font-medium text-[#019BEC]">Developers</h3>
                                <div className="space-y-4">
                                    <Link href="https://payline.transactiongateway.com/merchants/resources/integration/integration_portal.php" target="_blank" className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black/4 text-black/55">
                                            <APIIcon className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <div className="text-[20px] leading-none text-[#343A46]">APIs</div>
                                            <div className="mt-1 text-[16px] leading-none text-[#676D7C]">Embed payments into your platform</div>
                                        </div>
                                    </Link>
                                    <Link href="/digital-merchant-onboarding" className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black/4 text-black/55">
                                            <RecurringPaymentIcon className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <div className="text-[20px] leading-none text-[#343A46]">No Code</div>
                                            <div className="mt-1 text-[16px] leading-none text-[#676D7C]">No code & low code for fast implementation</div>
                                        </div>
                                    </Link>
                                    <Link href="/digital-merchant-onboarding" className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black/4 text-black/55">
                                            <RecurringPaymentIcon className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <div className="text-[20px] leading-none text-[#343A46]">Boarding</div>
                                            <div className="mt-1 text-[16px] leading-none text-[#676D7C]">API & Hosted form onboarding</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 border-b border-black/8 pb-3 text-[19px] font-medium text-[#019BEC]">About</h3>
                                <div className="space-y-5 text-[20px] leading-none text-[#343A46]">
                                    <Link href="/credit-card-processing-pricing" className="block">Pricing</Link>
                                    <Link href="/about-us" className="block">About us</Link>
                                    <Link href="/blog" className="block">Blog</Link>
                                    <Link href="/pos" className="block">Basic POS</Link>
                                    <Link href="/all-in-one-pos" className="block">All-in-one POS</Link>
                                    <Link href="/virtual-terminal-online-dashboard" className="block">Virtual Terminal</Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}