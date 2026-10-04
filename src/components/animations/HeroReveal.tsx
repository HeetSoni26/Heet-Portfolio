'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useIntroAnimation } from '@/context/IntroAnimationContext';

const STRIP_COUNT = 5;
const STRIP_DURATION = 0.85;
const STRIP_STAGGER = 0.2;

// Distance from center determines delay: center (index 2) first, then outward
function getStripDelay(index: number): number {
  const center = Math.floor(STRIP_COUNT / 2);
  return Math.abs(index - center) * STRIP_STAGGER;
}

export default function HeroReveal() {
  const { completeIntro } = useIntroAnimation();
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const hasCompleted = useRef(false);

  const maxDelay = getStripDelay(0); // outer strip has max delay
  const totalTime = (maxDelay + STRIP_DURATION) * 1000;

  useEffect(() => {
    if (hasCompleted.current) return;

    // Skip animation for users who prefer reduced motion
    if (shouldReduceMotion) {
      setIsVisible(false);
      completeIntro();
      hasCompleted.current = true;
      return;
    }

    // Lock scroll during animation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      setIsVisible(false);
      completeIntro();
      hasCompleted.current = true;
    }, totalTime + 250);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, [completeIntro, shouldReduceMotion, totalTime]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Light background visible before strips cover it */}
      <div className="absolute inset-0 bg-[#e8e8e8]" />

      {/* Orange/red gradient glow at bottom (visible through strip gaps) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[45%]"
        style={{
          background:
            'linear-gradient(to top, rgba(255, 80, 0, 0.55) 0%, rgba(255, 30, 60, 0.3) 35%, transparent 100%)',
        }}
      />

      {/* 5 vertical dark strips growing from bottom to top */}
      <div className="absolute inset-0 flex" style={{ gap: '1px' }}>
        {Array.from({ length: STRIP_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 relative overflow-hidden"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: STRIP_DURATION,
              delay: getStripDelay(i),
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ transformOrigin: 'bottom center' }}
          >
            {/* Dark background matching hero section */}
            <div className="absolute inset-0 bg-[#0F0E0E]" />

            {/* Gradient glow at bottom of each strip (matches hero HorizonGlow) */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[40%]"
              style={{
                background:
                  'radial-gradient(ellipse at center bottom, rgba(255, 60, 0, 0.22) 0%, rgba(255, 20, 147, 0.1) 35%, transparent 75%)',
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
