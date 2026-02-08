'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ComparisonCardProps {
    type: 'brand' | 'value';
    price: string;
    name: string;
    manufacturer: string;
    isActive: boolean;
}

export default function ComparisonCard({ type, price, name, manufacturer, isActive }: ComparisonCardProps) {
    const isBrand = type === 'brand';

    return (
        <motion.div
            className={`relative p-8 rounded-3xl border transition-all duration-500 overflow-hidden group
        ${isActive
                    ? 'bg-white/10 border-white/20 shadow-[0_0_50px_-12px_rgba(255,255,255,0.2)] scale-105 z-10'
                    : 'bg-white/5 border-white/5 opacity-50 scale-95 hover:opacity-80'
                }
      `}
            layout
        >
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${isBrand ? 'blue' : 'emerald'}-500/20 blur-[60px] rounded-full -mr-10 -mt-10 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold tracking-widest uppercase px-2 py-1 rounded-full ${isBrand ? 'bg-blue-500/20 text-blue-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                            {isBrand ? 'Premium' : 'Value Option'}
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-white mb-1">{name}</h3>
                    <p className="text-sm text-zinc-400">{manufacturer}</p>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        <span>Active Ingredient: <span className="text-white font-medium">Ibuprofen 200mg</span></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        <span>FDA Approved</span>
                    </div>
                    {isBrand && (
                        <div className="flex items-center gap-3 text-sm text-zinc-300">
                            <CheckCircle2 size={16} className="text-blue-400" />
                            <span>Patented Delivery</span>
                        </div>
                    )}
                </div>

                <div className="mt-4 pt-6 border-t border-white/10 flex items-end justify-between">
                    <div>
                        <span className="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Estimated Cost</span>
                        <span className="text-4xl font-light tracking-tighter text-white">{price}</span>
                    </div>
                    {type === 'value' && (
                        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs font-bold">
                            SAVE 85%
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
