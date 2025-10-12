import Link from "next/dist/client/link";
import Logo from "../icons/Logo";
import Button from "../ui/Button";
import LinkedIn from "../icons/LinkedIn";
import Twitter from "../icons/Twitter";
import Instagram from "../icons/Instagram";

export default function Footer() {
    return (
        <footer className="flex justify-between flex-col rounded-t-[40px] rounded-b-[0] bg-[#F2F3F4] px-2 py-10 lg:pt-20 lg:px-10 lg:pb-10 text-[#343C50]">
            <div className="container">
                <div className="flex flex-col md:flex-row gap-4 w-full mb-10 md:mb-[160px]">
                    <div className="w-full md:w-4/10">
                        <Logo className="h-8 w-auto mb-3" />
                        <span>Flexible and Friendly Payment Processing <br/> Solutions, Tailored To Suit Your Needs</span>
                        <ul className="mt-10 flex gap-2">
                            <li><Link href="https://www.linkedin.com/company/payline-data/" target="_blank"><span className="block p-3 rounded-full bg-[rgba(1,11,36,0.08)]"><LinkedIn/></span></Link></li>
                            <li><Link href="https://x.com/hashtag/paylinedata" target="_blank"><span className="block p-3 rounded-full bg-[rgba(1,11,36,0.08)]"><Twitter/></span></Link></li>
                            <li><Link href="https://www.instagram.com/paylinedata/" target="_blank"><span className="block p-3 rounded-full bg-[rgba(1,11,36,0.08)]"><Instagram/></span></Link></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-2/10">
                        <span className="block mb-2"><strong>Payments</strong></span>
                        <ul>
                            <li className="mb-2"><Link className="hover:underline" href="/in-person-payments">In-person</Link></li>
                            <li className="mb-2"><Link className="hover:underline" href="/online-payments">Online</Link></li>
                            <li className="mb-2"><Link className="hover:underline" href="/recurring-payments">Recurring</Link></li>
                            <li className="mb-2"><Link className="hover:underline" href="/high-risk-merchant-account">High Risk</Link></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-2/10">
                        <span className="block mb-2"><strong>Resources</strong></span>
                        <ul>
                            <li className="mb-2"><Link className="hover:underline" href="/contact-us">Help & Support</Link></li>
                            <li className="mb-2"><Link className="hover:underline" href="/payline-connect">Software Partners</Link></li>
                            <li className="mb-2"><Link className="hover:underline" href="/agents-and-isos">ISO & Agents</Link></li>
                            <li className="mb-2"><Link className="hover:underline" href="/interchange">What is interchange?</Link></li>
                            <li className="mb-2"><Link className="hover:underline" href="/about">About us</Link></li>
                            <li className="mb-2"><Link className="hover:underline" href="/blog">Blog</Link></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-2/10">
                        <span className="block mb-2"><strong>Pricing</strong></span>
                        <ul>
                            <li className="mb-2"><Link className="hover:underline" href="/switch-to-payline">Switch to Payline</Link></li>
                            <li className="mb-2">
                                <Link href="/signup-today">
                                    <Button variant="black">
                                        Get Started
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-[#676D7C] text-[12px] mb-10">
                    <span className="block mb-1">Payline Data Services, LLC is an ISO of Wells Fargo Bank N.A., Concord, CA</span>
                    <span className="block mb-1">Payline Data Services LLC is a registered ISO for Fifth Third Bank, N.A. Cincinnati, OH, USA</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 w-full text-[#676D7C] text-[12px]">
                    <div className="flex flex-row gap-2">
                        <Link className="underline" href="/terms-of-service">Terms of Service</Link>
                        <Link className="underline" href="/privacy-policy">Privacy Policy</Link>
                    </div>
                    <div>
                        <span>© {new Date().getFullYear()} Payline Data Services, LLC. All right reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}