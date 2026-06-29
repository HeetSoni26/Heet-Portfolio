'use client';

import { motion } from 'framer-motion';
import { useIntroAnimation } from '@/context/IntroAnimationContext';

export default function HorizonLine() {
  const { isIntroComplete } = useIntroAnimation();

  return (
    <div className="absolute bottom-0 left-0 w-full h-32 sm:h-48 z-[2] pointer-events-none">
      {/* Curved horizon line with glow */}
      <div
        className={`relative w-full h-full ${isIntroComplete ? 'hero-horizon-animated hero-horizon-glow' : 'opacity-0'}`}
      >
        {/* SVG Curved Line - Downward arc (sides low, center high) */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradient for the line - Red to Pink to Orange */}
            <linearGradient id="horizonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF0000" stopOpacity="0" />
              <stop offset="15%" stopColor="#FF0000" stopOpacity="0.4" />
              <stop offset="35%" stopColor="#FF1493" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FF8C00" stopOpacity="1" />
              <stop offset="65%" stopColor="#FF1493" stopOpacity="0.8" />
              <stop offset="85%" stopColor="#FF0000" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF0000" stopOpacity="0" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main curved line - Downward arc (starts low, peaks in center, ends low) */}
          <path
            d="M 0 180 Q 600 20, 1200 180"
            stroke="url(#horizonGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
          />

          {/* Additional glow layer */}
          <path
            d="M 0 180 Q 600 20, 1200 180"
            stroke="url(#horizonGradient)"
            strokeWidth="4"
            fill="none"
            opacity="0.3"
            style={{ filter: 'blur(8px)' }}
          />
        </svg>

        {/* Pulse animation overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 0 180 Q 600 20, 1200 180"
              stroke="url(#horizonGradient)"
              strokeWidth="3"
              fill="none"
              style={{ filter: 'blur(6px)' }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Fade upward gradient from the curve */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-primary/8 via-primary/3 to-transparent pointer-events-none" />

      {/* Additional subtle glow spots at the bottom - Hidden on mobile for performance */}
      <div className="hidden sm:block absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-primary/4 rounded-full blur-3xl" />
    </div>
  );
}
