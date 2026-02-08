'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ApiKeyCheck } from "@/components/ApiKeyCheck";
import Link from 'next/link';


gsap.registerPlugin(ScrollTrigger);

export default function ScanSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Scanning bar animation loop
        gsap.to(barRef.current, {
            y: 300,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });

        // Reveal on scroll
        gsap.fromTo(cardRef.current,
            {
                opacity: 0,
                scale: 0.9,
                filter: "blur(10px)"
            },
            {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "center center",
                    scrub: 1,
                }
            }
        );
    }, { scope: containerRef });

    return (
        <ApiKeyCheck>
            <section ref={containerRef} className="min-h-screen flex items-center justify-center py-20 relative z-10">
                <div ref={cardRef} className="relative w-full max-w-2xl aspect-[3/4] md:aspect-video glass-panel rounded-3xl overflow-hidden border border-white/10">

                    {/* Header */}
                    <Link href="/chat" className="absolute top-0 left-0 w-full p-6 flex justify-between items-center border-b border-white/5 bg-black/20 z-20">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-xs font-mono text-zinc-400">AI ANALYSIS PROTOCOL_V2</span>
                    </Link>

                    {/* Content being scanned */}
                    <div className="w-full h-full flex flex-col items-center justify-center p-12">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-center">
                            Analyzing Components
                        </h2>
                        <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-24 bg-white/5 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    </div>

                    {/* Scanning Light Bar */}
                    <div
                        ref={barRef}
                        className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_20px_rgba(96,165,250,0.8)] z-30 pointer-events-none opacity-80"
                        style={{ top: '10%' }}
                    />

                    {/* Overlay Grid */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                </div>
            </section>
        </ApiKeyCheck>
    );
}
