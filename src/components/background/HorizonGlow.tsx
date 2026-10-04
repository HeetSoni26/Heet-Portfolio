'use client';

import { motion } from 'framer-motion';

export default function HorizonGlow() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[600px] z-[13] pointer-events-none overflow-visible">
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
      >
        {/* SVG Sharp Curved Arc */}
        <svg
          className="absolute bottom-0 inset-x-0 w-full h-48 z-10"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="whiteHorizonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            
            <filter id="horizonGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path
            d="M 0 200 Q 600 50, 1200 200"
            stroke="url(#whiteHorizonGradient)"
            strokeWidth="8"
            fill="none"
            opacity="0.5"
            style={{ filter: 'blur(8px)' }}
          />
          
          <path
            d="M 0 200 Q 600 50, 1200 200"
            stroke="url(#whiteHorizonGradient)"
            strokeWidth="3"
            fill="none"
            filter="url(#horizonGlow)"
          />
        </svg>
      </motion.div>
    </div>
  );
}
