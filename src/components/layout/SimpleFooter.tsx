import Link from "next/link";

export default function SimpleFooter() {
    return (
        <footer className="px-2 py-8 text-[#343C50]">
            <div className="container text-xs text-[#676D7C]">
                <div>
                    <p>Payline Data Services, LLC is an ISO of Wells Fargo Bank N.A., Concord, CA</p>
                    <p>Payline Data Services LLC is a registered ISO for Fifth Third Bank, N.A. Cincinnati, OH, USA</p>
                </div>

                <div className="flex flex-col gap-2 justify-between items-center lg:flex-row mt-6 pt-6 border-t border-gray-300">
                    <div>
                        <Link href="/terms-of-service" className="mr-2">Terms of Service</Link>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                    </div>
                    <span>© {new Date().getFullYear()} Payline Data Services, LLC. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}