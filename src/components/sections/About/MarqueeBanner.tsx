'use client';

import { useRef, useMemo, memo } from 'react';
import { motion, useInView } from 'framer-motion';

// Static data - defined outside component
const topRowItems = [
  'AI & ML Integration',
  'RAG',
  'LLM',
  'Computer Vision',
  'Multi-Agent Systems',
  'AI Automations',
  'Software Development',
  'Android Development',
];

const bottomRowItems = [
  'AI Engineer',
  'Software Developer',
  'Research Enthusiast',
  'Prompt Engineering',
  'Innovation Driven',
  'Full-Stack Development',
  'System Design',
  'Problem Solver',
];

const PORTFOLIO_BACKGROUND = '#0F0E0E';

// Pre-computed repeated arrays (avoiding useMemo recreation)
const topRowRepeated = [...topRowItems, ...topRowItems, ...topRowItems];
const bottomRowRepeated = [...bottomRowItems, ...bottomRowItems, ...bottomRowItems];

// Animation variants - static placement without slide intro
const stripVariants = {
  hidden: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
};

// Smooth cubic-bezier spring transition
const stripTransition = (delay: number) => ({
  duration: 1.0,
  ease: [0.16, 1, 0.3, 1] as const,
  delay,
});

/* Marquee row - memoized with CSS animation only */
const MarqueeRow = memo(function MarqueeRow({
  items,
  direction = 'left',
  duration = 40,
  variant = 'primary',
}: {
  items: string[];
  direction?: 'left' | 'right';
  duration?: number;
  variant?: 'primary' | 'secondary';
}) {
  const textStyle = useMemo(() => ({
    color: variant === 'primary' ? '#ffffff' : 'rgba(255,255,255,0.85)',
    textShadow: variant === 'primary'
      ? '0 2px 20px rgba(255,255,255,0.15)'
      : '0 1px 10px rgba(255,255,255,0.05)',
    fontFamily: 'var(--font-instrument), Georgia, serif',
    fontStyle: 'italic',
    fontWeight: '400',
    fontSize: 'clamp(1.5rem, 5vw, 3rem)',
    textTransform: 'none' as const,
    letterSpacing: '0.02em',
  }), [variant]);

  const separatorStyle = useMemo(() => ({
    opacity: variant === 'primary' ? 0.6 : 0.3,
    color: variant === 'primary' ? '#fff' : 'rgba(255,255,255,0.5)',
  }), [variant]);

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <div
        className={direction === 'left' ? 'marquee-scroll-left' : 'marquee-scroll-right'}
        style={{ '--marquee-duration': `${duration}s`, transform: 'translateZ(0)' } as React.CSSProperties}
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="marquee-text-enhanced" style={textStyle}>
              {item}
            </span>
            <span className="marquee-separator" style={separatorStyle}>
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
});

export default function MarqueeBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      className="relative h-[55vh] sm:h-[60vh] flex items-center justify-center overflow-hidden select-none"
      style={{
        backgroundColor: PORTFOLIO_BACKGROUND,
        contain: 'layout style paint',
        isolation: 'isolate',
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
        aria-hidden="true"
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-16 sm:h-24 pointer-events-none z-10"
        style={{
          background: `linear-gradient(to bottom, ${PORTFOLIO_BACKGROUND} 0%, ${PORTFOLIO_BACKGROUND} 20%, rgba(15,14,14,0.85) 60%, transparent 100%)`
        }}
        aria-hidden="true"
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 pointer-events-none z-10"
        style={{
          background: `linear-gradient(to top, ${PORTFOLIO_BACKGROUND} 0%, ${PORTFOLIO_BACKGROUND} 20%, rgba(15,14,14,0.85) 60%, transparent 100%)`
        }}
        aria-hidden="true"
      />

      {/* Strips Container */}
      <div className="relative w-full h-32 sm:h-40">
        {/* Strip 1 — Primary (slides from right) */}
        <motion.div
          className="marquee-strip absolute left-0 right-0 z-[2]"
          style={{ top: '50%', translateY: '-50%', rotate: -5, willChange: 'transform, opacity' }}
          variants={stripVariants}
          custom="right"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={stripTransition(0.1)}
        >
          <div className="marquee-strip-enhanced marquee-strip-secondary">
            <MarqueeRow items={topRowRepeated} direction="right" duration={50} variant="primary" />
          </div>
        </motion.div>

        {/* Strip 2 — Secondary (slides from left) */}
        <motion.div
          className="marquee-strip absolute left-0 right-0 z-[1]"
          style={{ top: '50%', translateY: '-50%', rotate: 5, willChange: 'transform, opacity' }}
          variants={stripVariants}
          custom="left"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={stripTransition(0.2)}
        >
          <div className="marquee-strip-enhanced marquee-strip-secondary">
            <MarqueeRow items={bottomRowRepeated} direction="left" duration={42} variant="secondary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
