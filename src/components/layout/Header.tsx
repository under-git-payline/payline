"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ArrowDown from "../icons/ArrowDown";
import HamburgerMenu from "../icons/HamburgerMenu";
import Logo from "../icons/Logo";
import Button from "../ui/Button";
// import CreditCardIcon from "../icons/CreditCardIcon";
import POSTerminalIcon from "../icons/POSTerminalIcon";
// import MobilePaymentIcon from "../icons/MobilePaymentIcon";
import OnlinePaymentIcon from "../icons/OnlinePaymentIcon";
// import APIIcon from "../icons/APIIcon";
// import AnalyticsIcon from "../icons/AnalyticsIcon";
import HighRiskIcon from "../icons/HighRiskIcon";
// import CloverFlexIcon from "../icons/CloverFlexIcon";
// import PaylineConnectIcon from "../icons/PaylineConnectIcon";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const pathname = usePathname();

    // Hide Get Started button on /apply page
    const hideGetStartedButton = pathname === "/apply";

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
                        <button className="cursor-pointer focus:outline-none flex items-center gap-1">
                            Solutions
                            <ArrowDown className="h-4 w-4" />
                        </button>
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-5 w-[1000px] bg-white rounded-lg shadow-xl opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-300 ease-out z-10 p-6">
                            <div className="grid grid-cols-4 gap-6">
                                {/* Payment Types Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Payments</h3>
                                    <div className="space-y-3">
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
                                            href="/high-risk-merchant-account"
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
                                            href="/payment-links"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900">Payment Links</div>
                                                <div className="text-sm text-gray-500">No code payments</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/recurring-payments"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900">Recurring</div>
                                                <div className="text-sm text-gray-500">Automated subscription billing</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                
                                {/* Hardware Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Hardware</h3>
                                    <div className="space-y-3">
                                        <Link
                                            href="/countertop-terminals"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900">Countertop Terminal</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/smart-terminal"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900">Smart Terminal</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/mobile-app-card-reader"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900">Mobile Reader</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/pos"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900">Basic POS</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/all-in-one-pos"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900">All-in-One POS</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/virtual-terminal-online-dashboard"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900">Virtual Terminal</div>
                                            </div>
                                        </Link>
                                    </div>
                                
                                </div>
                                
                                {/* Developers Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Developers</h3>
                                    <div className="space-y-3">
                                        <Link
                                            href="https://payline.transactiongateway.com/merchants/resources/integration/&sa=D&source=editors&ust=1781722362680320&usg=AOvVaw21JS-9uvn6NrZG0nRkB5rH" target="_blank"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900">APIs</div>
                                                <div className="text-sm text-gray-500">Embed payments into your platform</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/digital-merchant-onboarding"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900">No Code</div>
                                                <div className="text-sm text-gray-500">No code & low code for fast implementation</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/digital-merchant-onboarding"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900">Boarding</div>
                                                <div className="text-sm text-gray-500">API & Hosted Form Onboarding</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <Link href="/switch-to-payline">
                        Switch to Payline
                    </Link> */}
                    <div className="relative group inline-block">
                        <button className="cursor-pointer focus:outline-none flex items-center gap-1">
                            Who we serve
                            <ArrowDown className="h-4 w-4" />
                        </button>
                        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-5 top-6 w-80 bg-white rounded-lg shadow-xl opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-300 ease-out z-10 p-6">
                            <div className="space-y-3">
                                <Link
                                    href="/payline-connect"
                                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="font-medium text-gray-900">Software Companies</div>
                                    <div className="text-sm text-gray-500">Integrate payments & grow revenue</div>
                                </Link>
                                <Link
                                    href="/agents-and-isos"
                                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="font-medium text-gray-900">Sales Partners</div>
                                    <div className="text-sm text-gray-500">Agents & ISO program</div>
                                </Link>
                                <Link
                                    href="/partners"
                                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="font-medium text-gray-900">Associations</div>
                                    <div className="text-sm text-gray-500">Empower your members</div>
                                </Link>

                                <Link
                                    href="/partners"
                                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="font-medium text-gray-900">Merchants</div>
                                    <div className="text-sm text-gray-500">Accept Payments</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Link href="https://payline.transactiongateway.com/merchants/resources/integration/integration_portal.php&sa=D&source=editors&ust=1781722362680653&usg=AOvVaw3b9DUweHuK-ift4bpZyxAW" target="_blank">
                        Developers
                    </Link>
                    <Link href="/credit-card-processing-pricing">
                        Pricing
                    </Link>
                </nav>
                <div className="flex items-center gap-2">
                    <a href="tel:+17792178932" className="hidden md:block hover:underline cursor-pointer mr-2">
                        +1 (779) 217-8932
                    </a>
                </div>
                {!hideGetStartedButton && (
                    <div className="flex items-center gap-2">
                        <Link href="/apply">
                            <Button variant="primary">Get Started</Button>
                        </Link>
                    </div>
                )}
                <div 
                    className="md:hidden rounded-full p-3 bg-[rgba(1,11,36,0.08)] cursor-pointer" 
                    onClick={toggleMobileMenu}
                >
                    <HamburgerMenu />
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-[76px] left-0 right-0 bg-white border-t shadow-lg z-50">
                    <div className="container py-4">
                        <nav className="space-y-4">
                            {/* Mobile Solutions Section */}
                            <div>
                                <button
                                    onClick={() => toggleSection('solutions')}
                                    className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900"
                                >
                                    Solutions
                                    <ArrowDown className={`h-4 w-4 transition-transform ${expandedSection === 'solutions' ? 'rotate-180' : ''}`} />
                                </button>
                                {expandedSection === 'solutions' && (
                                    <div className="mt-3 pl-4 space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Payments</h4>
                                            <div className="space-y-3">
                                                <Link href="/in-person-payments" className="flex items-center gap-3 py-2">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <POSTerminalIcon className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">In-Person Payments</div>
                                                        <div className="text-sm text-gray-500">Accept payments at your location</div>
                                                    </div>
                                                </Link>
                                                <Link href="/online-payments" className="flex items-center gap-3 py-2">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                        <OnlinePaymentIcon className="h-4 w-4 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">Online Payments</div>
                                                        <div className="text-sm text-gray-500">Secure e-commerce processing</div>
                                                    </div>
                                                </Link>
                                                <Link href="/high-risk-merchant-account" className="flex items-center gap-3 py-2">
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
                                                <Link href="/payment-links" className="block py-2">
                                                    <div className="font-medium text-gray-900">Payment Links</div>
                                                    <div className="text-sm text-gray-500">No code payments</div>
                                                </Link>
                                                <Link href="/recurring-payments" className="block py-2">
                                                    <div className="font-medium text-gray-900">Recurring</div>
                                                    <div className="text-sm text-gray-500">Automated subscription billing</div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Hardware</h4>
                                            <div className="space-y-3">
                                                <Link href="/countertop-terminals" className="block py-2">
                                                    <div className="font-medium text-gray-900">Countertop Terminal</div>
                                                </Link>
                                                <Link href="/smart-terminal" className="block py-2">
                                                    <div className="font-medium text-gray-900">Smart Terminal</div>
                                                </Link>
                                                <Link href="/mobile-app-card-reader" className="block py-2">
                                                    <div className="font-medium text-gray-900">Mobile Reader</div>
                                                </Link>
                                                <Link href="/pos" className="block py-2">
                                                    <div className="font-medium text-gray-900">Basic POS</div>
                                                </Link>
                                                <Link href="/all-in-one-pos" className="block py-2">
                                                    <div className="font-medium text-gray-900">All-in-One POS</div>
                                                </Link>
                                                <Link href="/virtual-terminal-online-dashboard" className="block py-2">
                                                    <div className="font-medium text-gray-900">Virtual Terminal</div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Developers</h4>
                                            <div className="space-y-3">
                                                <Link href="https://payline.transactiongateway.com/merchants/resources/integration/&sa=D&source=editors&ust=1781722362680320&usg=AOvVaw21JS-9uvn6NrZG0nRkB5rH" target="_blank" className="block py-2">
                                                    <div className="font-medium text-gray-900">APIs</div>
                                                    <div className="text-sm text-gray-500">Embed payments into your platform</div>
                                                </Link>
                                                <Link href="/digital-merchant-onboarding" className="block py-2">
                                                    <div className="font-medium text-gray-900">No Code</div>
                                                    <div className="text-sm text-gray-500">No code & low code for fast implementation</div>
                                                </Link>
                                                <Link href="/digital-merchant-onboarding" className="block py-2">
                                                    <div className="font-medium text-gray-900">Boarding</div>
                                                    <div className="text-sm text-gray-500">API & Hosted Form Onboarding</div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Who We Serve Section */}
                            <div>
                                <button
                                    onClick={() => toggleSection('who-we-serve')}
                                    className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900"
                                >
                                    Who we serve
                                    <ArrowDown className={`h-4 w-4 transition-transform ${expandedSection === 'who-we-serve' ? 'rotate-180' : ''}`} />
                                </button>
                                {expandedSection === 'who-we-serve' && (
                                    <div className="mt-3 pl-4 space-y-3">
                                        <Link href="/payline-connect" className="block py-2">
                                            <div className="font-medium text-gray-900">Software Companies</div>
                                            <div className="text-sm text-gray-500">Integrate payments & grow revenue</div>
                                        </Link>
                                        <Link href="/agents-and-isos" className="block py-2">
                                            <div className="font-medium text-gray-900">Sales Partners</div>
                                            <div className="text-sm text-gray-500">Agents & ISO program</div>
                                        </Link>
                                        <Link href="/partners" className="block py-2">
                                            <div className="font-medium text-gray-900">Associations</div>
                                            <div className="text-sm text-gray-500">Empower your members</div>
                                        </Link>
                                        <Link href="/partners" className="block py-2">
                                            <div className="font-medium text-gray-900">Merchants</div>
                                            <div className="text-sm text-gray-500">Accept Payments</div>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Developers Link */}
                            <Link href="https://payline.transactiongateway.com/merchants/resources/integration/integration_portal.php&sa=D&source=editors&ust=1781722362680653&usg=AOvVaw3b9DUweHuK-ift4bpZyxAW" target="_blank" className="block py-2 font-medium text-gray-900">
                                Developers
                            </Link>

                            {/* Mobile Pricing Link */}
                            <Link href="/credit-card-processing-pricing" className="block py-2 font-medium text-gray-900">
                                Pricing
                            </Link>

                            <div>
                                <a href="tel:+17792178932" className="font-medium">
                                    +1 (779) 217-8932
                                </a>
                            </div>

                            {/* Mobile Get Started Button */}
                            {!hideGetStartedButton && (
                                <div>
                                    <div className="w-full">
                                        <Link href="/apply">
                                            <Button variant="primary">Get Started</Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}