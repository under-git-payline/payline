"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../icons/Logo";

export default function SimpleHeader() {
    const [agentCount, setAgentCount] = useState(0);

    useEffect(() => {
        // Generate random number between 3 and 15
        const randomCount = Math.floor(Math.random() * 13) + 3;
        setAgentCount(randomCount);
    }, []);

    return (
        <header className="container flex flex-col gap-2 items-center justify-between py-[22px] lg:flex-row">
            <Link href="/" aria-label="Payline Home">
                <Logo className="h-8 w-auto" />
            </Link>
            {agentCount > 0 && (
                <div className="text-md text-gray-500 font-light flex items-center gap-2">
                    <div className="relative flex items-center justify-center mr-2">
                        {/* Static green center dot */}
                        <div 
                            className="w-3 h-3 rounded-full relative z-10"
                            style={{ 
                                backgroundColor: '#2A7A5C'
                            }}
                        />
                        {/* Animated outer rings */}
                        <div 
                            className="absolute w-4 h-4 rounded-full"
                            style={{ 
                                backgroundColor: 'transparent',
                                border: '6px solid #EAF2EF',
                                animation: 'outward-flash 2s ease-in-out infinite'
                            }}
                        />
                        <div 
                            className="absolute w-4 h-4 rounded-full"
                            style={{ 
                                backgroundColor: 'transparent',
                                border: '6px solid #EAF2EF',
                                animation: 'outward-flash 2s ease-in-out infinite 1s'
                            }}
                        />
                    </div>
                    {agentCount} Agents available to take your call
                </div>
            )}
            <Link href="tel:7792178932" aria-label="Call Now" className="text-[18px] hover:underline">
                (779) 217-8932
            </Link>
            <style jsx>{`
                @keyframes outward-flash {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `}</style>
        </header>
    );
}