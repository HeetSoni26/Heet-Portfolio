'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useMemo } from 'react';
import { useIntroAnimation } from '@/context/IntroAnimationContext';

const STRIP_COUNT = 11;
const STRIP_DURATION = 0.9;
const STRIP_STAGGER = 0.08;

// Center strip animates first, then outward
function getStripDelay(index: number): number {
  const center = Math.floor(STRIP_COUNT / 2);
  return Math.abs(index - center) * STRIP_STAGGER;
}

// Gentle start, smooth flow, no jerk at bottom
const STRIP_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

// Pre-computed keyframes CSS (static, only injected once)
const KEYFRAMES_CSS = `
  @keyframes stripReveal {
    0% { transform: scaleY(0) translateZ(0); }
    100% { transform: scaleY(1) translateZ(0); }
  }
`;

export default function HeroStrips() {
  const { isIntroComplete, completeIntro } = useIntroAnimation();
  const shouldReduceMotion = useReducedMotion();
  const hasCompleted = useRef(false);
  const hasInjectedCSS = useRef(false);

  const maxDelay = getStripDelay(0);
  const totalTime = (maxDelay + STRIP_DURATION) * 1000;

  // Generate per-strip animation styles
  const stripStyles = useMemo(() => {
    return Array.from({ length: STRIP_COUNT }, (_, i) => ({
      animation: shouldReduceMotion
        ? 'none'
        : `stripReveal ${STRIP_DURATION}s ${STRIP_EASING} ${getStripDelay(i)}s both`,
    }));
  }, [shouldReduceMotion]);

  // Inject CSS keyframes only once
  useEffect(() => {
    if (hasInjectedCSS.current) return;
    
    const styleId = 'hero-strips-keyframes';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = KEYFRAMES_CSS;
      document.head.appendChild(style);
    }
    hasInjectedCSS.current = true;
  }, []);

  useEffect(() => {
    if (hasCompleted.current) return;

    if (shouldReduceMotion) {
      completeIntro();
      hasCompleted.current = true;
      return;
    }

    // Lock scroll during strip animation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      completeIntro();
      hasCompleted.current = true;
    }, totalTime + 200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, [completeIntro, shouldReduceMotion, totalTime]);

  return (
    <>
      {/* Base dark background — always visible behind strips */}
      <div
        className="absolute inset-0 z-0 bg-[#0F0E0E]"
        aria-hidden="true"
      />

      {/* Light overlay — clean white backdrop during intro, fades out after */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: isIntroComplete ? 0 : 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          background: '#ffffff',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* 11 seamless vertical strips — pure CSS animation on GPU compositor */}
      <div
        className="absolute inset-0 z-[10] flex overflow-hidden"
        style={{ gap: 0, contain: 'strict' }}
        aria-hidden="true"
      >
        {stripStyles.map((stripStyle, i) => (
          <div
            key={i}
            style={{
              flex: '1 0 0%',
              transformOrigin: 'top center',
              transform: shouldReduceMotion ? 'scaleY(1) translateZ(0)' : 'scaleY(0) translateZ(0)',
              animation: stripStyle.animation,
              margin: '0 -0.5px',
              padding: 0,
              background: '#0F0E0E',
              boxShadow: '0 0 0 0.5px #0F0E0E',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden' as const,
              contain: 'strict',
            }}
          />
        ))}
      </div>

    </>
  );
}
