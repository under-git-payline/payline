import Link from "next/dist/client/link";
import Logo from "../icons/Logo";
import Button from "../ui/Button";
import LinkedIn from "../icons/LinkedIn";
import Twitter from "../icons/Twitter";
import Instagram from "../icons/Instagram";
import ArrowRight from "../icons/ArrowRight";

interface FooterProps {
    // Square off the top corners when the section directly above is the same
    // #002132 as the footer. The rounded corners cut notches out of that shared
    // colour, exposing the page background as two pale wedges mid-field.
    flushTop?: boolean;
}

export default function Footer({ flushTop = false }: FooterProps) {
    return (
        <footer className={`flex justify-between flex-col ${flushTop ? '' : 'rounded-t-[40px] '}rounded-b-[0] bg-[#002132] px-2 py-10 lg:pt-20 lg:px-10 lg:pb-5 text-white`}>
            <div className="container">
                <div className="flex flex-col md:flex-row md:justify-between gap-10 w-full mb-10 md:mb-[160px]">
                    <div className="w-full md:max-w-[427px] flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Logo className="h-[48px] w-auto self-start" fill="white" />
                            <span className="text-white/80 text-xl leading-7 font-medium">Flexible and Friendly Payment Processing Solutions, Tailored To Suit Your Needs.</span>
                        </div>
                        <ul className="flex flex-wrap gap-2">
                            <li><Link href="https://www.linkedin.com/company/payline-data/" target="_blank"><span className="flex items-center justify-center size-[52px] rounded-full bg-white/20 hover:bg-white/30 transition-colors"><LinkedIn fill="white" /></span></Link></li>
                            <li><Link href="https://x.com/hashtag/paylinedata" target="_blank"><span className="flex items-center justify-center size-[52px] rounded-full bg-white/20 hover:bg-white/30 transition-colors"><Twitter fill="white" /></span></Link></li>
                            <li><Link href="https://www.instagram.com/paylinedata/" target="_blank"><span className="flex items-center justify-center size-[52px] rounded-full bg-white/20 hover:bg-white/30 transition-colors"><Instagram fill="white" /></span></Link></li>
                        </ul>
                        <Link href="/apply" className="w-full md:w-fit">
                            <Button variant="heroPrimary">
                                Get Started
                                <ArrowRight fill="currentColor" />
                            </Button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:flex md:flex-nowrap md:gap-10 w-full md:w-[660px]">
                        <div className="md:flex-1">
                            <span className="block mb-2 text-white/60 text-sm">Payments</span>
                            <ul className="flex flex-col gap-2 text-base leading-[26px]">
                                <li><Link className="hover:underline" href="/in-person-payments">In-Person</Link></li>
                                <li><Link className="hover:underline" href="/online-payments">Online</Link></li>
                                <li><Link className="hover:underline" href="/recurring-payments">Recurring</Link></li>
                                <li><Link className="hover:underline" href="/high-risk-merchant-account">High Risk</Link></li>
                            </ul>
                        </div>
                        <div className="md:flex-1">
                            <span className="block mb-2 text-white/60 text-sm">Quick Links</span>
                            <ul className="flex flex-col gap-2 text-base leading-[26px]">
                                <li><Link className="hover:underline" href="/resources">Resources</Link></li>
                                <li><Link className="hover:underline" href="/contact-us">Help & Support</Link></li>
                                <li><Link className="hover:underline" href="/partners">Software Partners</Link></li>
                                <li><Link className="hover:underline" href="/agents-and-isos">ISO & Agents</Link></li>
                                <li><Link className="hover:underline" href="/interchange">What is Interchange?</Link></li>
                                <li><Link className="hover:underline" href="/about">About Us</Link></li>
                                <li><Link className="hover:underline" href="/blog">Blog</Link></li>
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-1 md:flex-1">
                            <ul className="flex flex-col gap-2 text-base leading-[26px]">
                                <li><Link className="hover:underline" href="/credit-card-processing-pricing">Pricing</Link></li>
                                <li><Link className="hover:underline" href="/switch-to-payline">Switch to Payline</Link></li>
                                <li><Link className="hover:underline" href="/apply">Get Started</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-white/60 text-xs leading-[18px] mb-10">
                    <span className="block">Payline Data Services, LLC is an ISO of Wells Fargo Bank N.A., Concord, CA</span>
                    <span className="block">Payline Data Services LLC is a registered ISO for Fifth Third Bank, N.A. Cincinnati, OH, USA</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 w-full text-white/60 text-xs leading-[18px]">
                    <span className="md:flex-1">© {new Date().getFullYear()} Payline Data Services, LLC. All right reserved.</span>
                    <div className="flex gap-6 md:justify-end">
                        <Link className="hover:underline" href="/terms-of-service">Terms and Conditions</Link>
                        <Link className="hover:underline" href="/privacy-policy">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}