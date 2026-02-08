'use client';

import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface PriceSliderProps {
  value: number; // 0 to 1
  onChange: (value: number) => void;
}

export default function PriceSlider({ value, onChange }: PriceSliderProps) {
  const [internalValue, setInternalValue] = useState(value * 100);

  // Update parent when internal value changes
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseFloat(e.target.value);
    setInternalValue(newVal);
    onChange(newVal / 100);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 glass-panel rounded-2xl relative overflow-hidden group">
      <div className="flex justify-between mb-4 text-sm font-medium tracking-wide">
        <span className={`${internalValue < 50 ? 'text-white text-glow' : 'text-zinc-500'} transition-colors duration-300`}>
          Value Option
        </span>
        <span className={`${internalValue >= 50 ? 'text-blue-400 text-glow' : 'text-zinc-500'} transition-colors duration-300`}>
          Premium Brand
        </span>
      </div>

      <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
        {/* Fill Gradient */}
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-zinc-500 to-blue-500 transition-all duration-75 ease-out"
          style={{ width: `${internalValue}%` }}
        />
        
        {/* Input Range */}
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={internalValue}
          onChange={handleSliderChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
      </div>

      {/* Thumb Indicator (Visual only, follows input) */}
      <div 
        className="absolute top-[3.25rem] w-6 h-6 bg-white rounded-full shadow-lg pointer-events-none transition-all duration-75 ease-out transform -translate-y-1/2 -ml-3"
        style={{ left: `calc(${internalValue}% * 0.94 + 3%)` }} // basic offset correction
      >
        <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full" />
      </div>

      <p className="mt-4 text-center text-xs text-zinc-500 font-mono">
        BIOEQUIVALENCE: <span className="text-emerald-400">99.8%</span>
      </p>
    </div>
  );
}
