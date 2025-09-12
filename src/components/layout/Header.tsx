"use client";

import Link from "next/link";
import { useState } from "react";
import ArrowDown from "../icons/ArrowDown";
import HamburgerMenu from "../icons/HamburgerMenu";
import Logo from "../icons/Logo";
import Button from "../ui/Button";
// import CreditCardIcon from "../icons/CreditCardIcon";
import POSTerminalIcon from "../icons/POSTerminalIcon";
// import MobilePaymentIcon from "../icons/MobilePaymentIcon";
import OnlinePaymentIcon from "../icons/OnlinePaymentIcon";
import RecurringPaymentIcon from "../icons/RecurringPaymentIcon";
// import APIIcon from "../icons/APIIcon";
// import AnalyticsIcon from "../icons/AnalyticsIcon";
import HighRiskIcon from "../icons/HighRiskIcon";
import CloverFlexIcon from "../icons/CloverFlexIcon";
import PaylineConnectIcon from "../icons/PaylineConnectIcon";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setExpandedSection(null);
    };

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };
    return (
        <header className="container flex items-center justify-between h-[76px]">
            <Link href="/" aria-label="Payline Home">
                <Logo className="h-8 w-auto" />
            </Link>
            <div className="flex items-center gap-12">
                <nav className="hidden md:flex gap-12 items-center">
                    <div className="relative group inline-block">
                        <button className="hover:underline focus:outline-none flex items-center gap-1">
                            Payments
                            <ArrowDown className="h-4 w-4" />
                        </button>
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 mt-2 w-[660px] bg-white rounded-lg shadow-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-200 z-10 p-6">
                            <div className="grid grid-cols-2 gap-6">
                                {/* Payment Types Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Payment Solutions</h3>
                                    <div className="space-y-3">
                                        <Link
                                            href="/online-payments"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                                <OnlinePaymentIcon className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">Online Payments</div>
                                                <div className="text-sm text-gray-500">Secure e-commerce processing</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/in-person-payments"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                                <POSTerminalIcon className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">In-Person Payments</div>
                                                <div className="text-sm text-gray-500">Accept payments at your location</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/recurring-payments"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                                                <RecurringPaymentIcon className="h-5 w-5 text-orange-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">Recurring Payments</div>
                                                <div className="text-sm text-gray-500">Automated subscription billing</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/high-risk-payments"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                                                <HighRiskIcon className="h-5 w-5 text-red-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">High Risk Payments</div>
                                                <div className="text-sm text-gray-500">Specialized high-risk processing</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                
                                {/* Products Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Products</h3>
                                    <div className="space-y-3">
                                        <Link
                                            href="/payline-connect"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                                                <PaylineConnectIcon className="h-5 w-5 text-indigo-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">Payline Connect</div>
                                                <div className="text-sm text-gray-500">Unlock new revenue streams with embedded payment solutions that enhance your software.</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/clover-flex-at-payline"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                                                <CloverFlexIcon className="h-5 w-5 text-teal-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">Clover Flex</div>
                                                <div className="text-sm text-gray-500">Accept payments in person or online. Businesses save 25%, on average, by switching to Payline</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link href="/pricing" className="hover:underline">
                        Pricing
                    </Link>
                    <Link href="/switch" className="hover:underline">
                        Switch to Payline
                    </Link>
                    <div className="relative group inline-block">
                        <button className="hover:underline focus:outline-none flex items-center gap-1">
                            Resources
                            <ArrowDown className="h-4 w-4" />
                        </button>
                        <div className="absolute left-1/2 transform -translate-x-1/2 top-10 mt-2 w-80 bg-white rounded-lg shadow-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-200 z-10 p-6">
                            <div className="space-y-3">
                                <Link
                                    href="#"
                                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="font-medium text-gray-900">Help & Support</div>
                                </Link>
                                <Link
                                    href="#"
                                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="font-medium text-gray-900">Software Partners</div>
                                </Link>
                                <Link
                                    href="/agents-and-isos"
                                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="font-medium text-gray-900">ISO & Agents</div>
                                </Link>
                                <Link
                                    href="/interchange"
                                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="font-medium text-gray-900">What is interchange?</div>
                                </Link>
                                <Link
                                    href="/about-us"
                                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="font-medium text-gray-900">About us</div>
                                </Link>
                                <Link
                                    href="/blog"
                                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="font-medium text-gray-900">Blog</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="flex items-center gap-2">
                    <Button variant="primary">Get Started</Button>
                    <div 
                        className="md:hidden rounded-full p-3 bg-[rgba(1,11,36,0.08)] cursor-pointer" 
                        onClick={toggleMobileMenu}
                    >
                        <HamburgerMenu />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-[76px] left-0 right-0 bg-white border-t shadow-lg z-50">
                    <div className="container py-4">
                        <nav className="space-y-4">
                            {/* Mobile Payments Section */}
                            <div>
                                <button
                                    onClick={() => toggleSection('payments')}
                                    className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900"
                                >
                                    Payments
                                    <ArrowDown className={`h-4 w-4 transition-transform ${expandedSection === 'payments' ? 'rotate-180' : ''}`} />
                                </button>
                                {expandedSection === 'payments' && (
                                    <div className="mt-3 pl-4 space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Payment Solutions</h4>
                                            <div className="space-y-3">
                                                <Link href="/online-payments" className="flex items-center gap-3 py-2">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                        <OnlinePaymentIcon className="h-4 w-4 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">Online Payments</div>
                                                        <div className="text-sm text-gray-500">Secure e-commerce processing</div>
                                                    </div>
                                                </Link>
                                                <Link href="/in-person-payments" className="flex items-center gap-3 py-2">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <POSTerminalIcon className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">In-Person Payments</div>
                                                        <div className="text-sm text-gray-500">Accept payments at your location</div>
                                                    </div>
                                                </Link>
                                                <Link href="/recurring-payments" className="flex items-center gap-3 py-2">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                                        <RecurringPaymentIcon className="h-4 w-4 text-orange-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">Recurring Payments</div>
                                                        <div className="text-sm text-gray-500">Automated subscription billing</div>
                                                    </div>
                                                </Link>
                                                <Link href="/high-risk-payments" className="flex items-center gap-3 py-2">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                                        <HighRiskIcon className="h-4 w-4 text-red-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">High Risk Payments</div>
                                                        <div className="text-sm text-gray-500">Specialized high-risk processing</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Products</h4>
                                            <div className="space-y-3">
                                                <Link href="/payline-connect" className="flex items-center gap-3 py-2">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                        <PaylineConnectIcon className="h-4 w-4 text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">Payline Connect</div>
                                                        <div className="text-sm text-gray-500">Unlock new revenue streams with embedded payment solutions</div>
                                                    </div>
                                                </Link>
                                                <Link href="/clover-flex-at-payline" className="flex items-center gap-3 py-2">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                                                        <CloverFlexIcon className="h-4 w-4 text-teal-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">Clover Flex</div>
                                                        <div className="text-sm text-gray-500">Accept payments in person or online</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Pricing Link */}
                            <Link href="/pricing" className="block py-2 font-medium text-gray-900">
                                Pricing
                            </Link>

                            {/* Mobile Switch Link */}
                            <Link href="/switch" className="block py-2 font-medium text-gray-900">
                                Switch to Payline
                            </Link>

                            {/* Mobile Resources Section */}
                            <div>
                                <button
                                    onClick={() => toggleSection('resources')}
                                    className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900"
                                >
                                    Resources
                                    <ArrowDown className={`h-4 w-4 transition-transform ${expandedSection === 'resources' ? 'rotate-180' : ''}`} />
                                </button>
                                {expandedSection === 'resources' && (
                                    <div className="mt-3 pl-4 space-y-3">
                                        <Link href="#" className="block py-2 text-gray-900">Help & Support</Link>
                                        <Link href="#" className="block py-2 text-gray-900">Software Partners</Link>
                                        <Link href="/agents-and-isos" className="block py-2 text-gray-900">ISO & Agents</Link>
                                        <Link href="/interchange" className="block py-2 text-gray-900">What is interchange?</Link>
                                        <Link href="/about-us" className="block py-2 text-gray-900">About us</Link>
                                        <Link href="/blog" className="block py-2 text-gray-900">Blog</Link>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Get Started Button */}
                            <div className="">
                                <div className="w-full">
                                    <Button variant="primary">Get Started</Button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}