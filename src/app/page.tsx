'use client';

import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import PriceSlider from '@/components/ui/PriceSlider';
import ScanSection from '@/components/ui/ScanSection';
import ComparisonCard from '@/components/ui/ComparisonCard';
import { motion } from 'framer-motion';

// Dynamically import Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

export default function Home() {
  const [sliderValue, setSliderValue] = useState(0.5);

  return (
    <main className="relative w-full min-h-[300vh] bg-black text-white selection:bg-blue-500/30">

      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none md:pointer-events-auto">
        <Suspense fallback={null}>
          <Scene sliderValue={sliderValue} />
        </Suspense>
      </div>

      {/* Hero Content */}
      <section className="relative z-10 w-full h-screen flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4 pointer-events-auto hover:bg-white/10 transition-colors cursor-pointer">
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-300">
              New Standard in Pharmacology
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Smart Medicine.
          </h1>
          <p className="text-xl text-zinc-400 max-w-lg mx-auto leading-relaxed">
            AI-powered analysis for better health decisions.
            Compare, analyze, and choose with confidence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium text-zinc-500 tracking-widest uppercase">Scroll to Analyze</span>
          <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
        </motion.div>
      </section>

      {/* Scan Section */}
      <ScanSection />

      {/* Comparison Section */}
      <section className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-transparent to-black/80">
        <div className="w-full max-w-5xl space-y-12">

          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Choice is Yours</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Real-time bioequivalence matching found identical active ingredients at a fraction of the cost.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            <ComparisonCard
              type="value"
              name="Ibuprofen 200mg"
              manufacturer="Generic Labs"
              price="$4.50"
              isActive={sliderValue < 0.5}
            />
            <ComparisonCard
              type="brand"
              name="Advil Liqui-Gels"
              manufacturer="Pfizer Consumer"
              price="$16.99"
              isActive={sliderValue >= 0.5}
            />
          </div>

          <div className="py-12 flex justify-center sticky bottom-10 z-50">
            <div className="bg-black/50 backdrop-blur-xl p-2 rounded-3xl border border-white/10 shadow-2xl">
              <PriceSlider value={sliderValue} onChange={setSliderValue} />
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
