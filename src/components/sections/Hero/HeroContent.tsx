'use client';

import { useMemo, memo, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIntroAnimation } from '@/context/IntroAnimationContext';
import Link from 'next/link';
import gsap from 'gsap';

// ─── Animation Variants ─────────────────────────────────────────────────────

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const customEase = [0.22, 1, 0.36, 1] as const;

// ─── Letter-by-letter reveal (memoized for performance) ─────────────────────

const AnimatedLetters = memo(function AnimatedLetters({
  text,
  baseDelay = 0,
  isActive,
  className,
  style,
  letterStyle,
  getLetterStyle,
}: {
  text: string;
  baseDelay?: number;
  isActive: boolean;
  className?: string;
  style?: React.CSSProperties;
  letterStyle?: React.CSSProperties;
  getLetterStyle?: (index: number, total: number, char: string) => React.CSSProperties;
}) {
  const letters = useMemo(() => text.split(''), [text]);

  const baseLetterStyle = useMemo(() => ({
    display: 'inline-block',
    willChange: isActive ? 'auto' : 'transform, opacity',
    ...letterStyle,
  }), [letterStyle, isActive]);

  return (
    <span className={className} style={style}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: 40 }}
          animate={
            isActive
              ? { opacity: 1, y: 0, rotateX: 0 }
              : { opacity: 0, y: 60, rotateX: 40 }
          }
          transition={{
            duration: 0.6,
            delay: baseDelay + i * 0.04,
            ease: customEase,
          }}
          style={
            getLetterStyle
              ? { ...baseLetterStyle, ...getLetterStyle(i, letters.length, char) }
              : baseLetterStyle
          }
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
});

// ─── Main Component ──────────────────────────────────────────────────────────

export default function HeroContent() {
  const { isIntroComplete } = useIntroAnimation();
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(SVGCircleElement | null)[]>([]);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const isSpotlightVisible = useRef(false);

  // Spotlight position for hover glow on the resume button
  const spotlightX = useMotionValue(0.5);
  const spotlightY = useMotionValue(0.5);

  // Magnetic spring values
  const buttonMouseX = useMotionValue(0);
  const buttonMouseY = useMotionValue(0);
  const springX = useSpring(buttonMouseX, { stiffness: 200, damping: 20, mass: 0.5 });
  const springY = useSpring(buttonMouseY, { stiffness: 200, damping: 20, mass: 0.5 });

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Magnetic pull
    buttonMouseX.set((x - centerX) * 0.08);
    buttonMouseY.set((y - centerY) * 0.12);

    // Spotlight tracking
    spotlightX.set(x / rect.width);
    spotlightY.set(y / rect.height);
  };

  const handleButtonMouseLeave = () => {
    buttonMouseX.set(0);
    buttonMouseY.set(0);
    spotlightX.set(0.5);
    spotlightY.set(0.5);
  };

  // Derive spotlight background (subtle white highlight, zero orange)
  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([x, y]: number[]) =>
      `radial-gradient(circle 90px at ${x * 100}% ${y * 100}%, rgba(255, 255, 255, 0.08), transparent)`
  );

  // Spotlight mouse track effect with cached rect and rAF throttling
  useEffect(() => {
    // Initialize blobs off-screen
    gsap.set(blobsRef.current, { x: -1000, y: -1000 });
    // Initialize reveal layer to opacity 0
    gsap.set(revealLayerRef.current, { opacity: 0 });

    let mouseTimeout: NodeJS.Timeout;
    let rAFId: number | null = null;
    let cachedRect: DOMRect | null = null;

    const updateRect = () => {
      if (textWrapperRef.current) {
        cachedRect = textWrapperRef.current.getBoundingClientRect();
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      if (rAFId) return;

      rAFId = requestAnimationFrame(() => {
        rAFId = null;
        if (!textWrapperRef.current) return;
        if (!cachedRect) updateRect();

        const rect = cachedRect || textWrapperRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update custom CSS variables for the soft background gradient circle
        textWrapperRef.current.style.setProperty('--mouse-x', `${x}px`);
        textWrapperRef.current.style.setProperty('--mouse-y', `${y}px`);

        // Snap spotlight blobs instantly to cursor coordinates if it was invisible
        if (!isSpotlightVisible.current) {
          gsap.set(blobsRef.current, { x: x, y: y });
          isSpotlightVisible.current = true;
        }

        // Fade in spotlight quickly
        gsap.to(revealLayerRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        // Exact original GSAP fluid trailing animation
        gsap.to(blobsRef.current, {
          x: x,
          y: y,
          duration: 1.2,
          stagger: 0.05,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        // Clear previous timeout and start a new one to disappear within 2 seconds
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
          gsap.to(revealLayerRef.current, {
            opacity: 0,
            duration: 1.5,
            ease: 'power2.inOut',
            onComplete: () => {
              isSpotlightVisible.current = false;
            },
          });
        }, 500);
      });
    };

    const handleMouseLeave = () => {
      clearTimeout(mouseTimeout);
      gsap.to(revealLayerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        overwrite: 'auto',
        onComplete: () => {
          isSpotlightVisible.current = false;
        },
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const wrapper = textWrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateRect);
      if (wrapper) {
        wrapper.removeEventListener('mouseleave', handleMouseLeave);
      }
      clearTimeout(mouseTimeout);
      if (rAFId) cancelAnimationFrame(rAFId);
    };
  }, []);


  const renderHeroContent = (isReveal: boolean) => {
    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isIntroComplete ? 'visible' : 'hidden'}
        className="relative w-full h-full flex flex-col items-center justify-center py-20"
      >
        {/* Floating Description Left (Top-Left area) */}
        <div
          className={`absolute left-[3%] lg:left-[5%] top-[14%] lg:top-[16%] hidden md:block max-w-[210px] lg:max-w-[240px] text-right select-none pointer-events-none transition-colors duration-300 font-mono text-[9px] lg:text-[10px] xl:text-[11px] leading-[1.6] tracking-[0.1em] ${isIntroComplete ? 'hero-diagonal-left' : 'opacity-0'}`}
          style={{
            color: isReveal ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
          }}
        >
HEET SONI • ARCHITECTING MODERN,<br />SCALABLE WEB PLATFORMS WITH PREMIUM LOGIC.
        </div>

        {/* Floating Description Right (Bottom-Right area) */}
        <div
          className={`absolute right-[3%] lg:right-[5%] bottom-[20%] lg:bottom-[22%] hidden md:block max-w-[215px] lg:max-w-[245px] text-left select-none pointer-events-none transition-colors duration-300 font-mono text-[9px] lg:text-[10px] xl:text-[11px] leading-[1.6] tracking-[0.1em] ${isIntroComplete ? 'hero-diagonal-right' : 'opacity-0'}`}
          style={{
            color: isReveal ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
          }}
        >
          CRAFTING ULTRA-FAST REACT APPLICATIONS<br />POWERED BY NEXT.JS & TYPESCRIPT.
        </div>

        {/* Main Graphic Heading Block */}
        <h1
          className="w-full flex flex-col items-center leading-[0.92] select-none text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[7.5vw] xl:text-[8vw]"
          style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: isReveal ? '#000000' : '#ffffff',
            textShadow: isReveal ? 'none' : '0 0 12px rgba(255, 255, 255, 0.25)',
            transition: 'color 0.3s ease, text-shadow 0.3s ease',
          }}
          aria-label="AI & Web Software Developer Heet Soni"
        >
          {/* Row 1: AI & WEB + GitHub */}
          <div className="flex items-center gap-x-3 sm:gap-x-4 md:gap-x-6 relative">
            <div className={isIntroComplete ? 'hero-row-mask' : ''}>
              <div className={isIntroComplete ? 'hero-row-animated' : 'opacity-0'} style={{ '--row-i': 0 } as React.CSSProperties}>
                <AnimatedLetters
                  text="AI & WEB"
                  baseDelay={0.08}
                  isActive={isIntroComplete}
                />
              </div>
            </div>
            {/* Outline GitHub Icon */}
            <a
              href="https://github.com/HeetSoni26"
              target="_blank"
              rel="noopener noreferrer"
              className={`cursor-pointer transition-all duration-300 hover:scale-115 ${isIntroComplete ? 'hero-social-icon' : 'opacity-0'} ${isReveal
                  ? 'text-black/15 hover:text-black/70'
                  : 'text-white/15 hover:text-white/80'
                }`}
              style={{
                pointerEvents: isReveal ? 'none' : 'auto',
                '--icon-i': 0,
              } as React.CSSProperties}
              aria-label="Heet Soni on GitHub"
            >
              <svg
                className="w-[0.52em] h-[0.52em] transition-colors duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          </div>

          {/* Row 2: SOFT < > WARE + LinkedIn */}
          <div className="flex items-center gap-x-2 sm:gap-x-4 md:gap-x-6 mt-2 relative">
            {/* Outline LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/heet-soni-8a9082273/"
              target="_blank"
              rel="noopener noreferrer"
              className={`cursor-pointer transition-all duration-300 hover:scale-115 ${isIntroComplete ? 'hero-social-icon' : 'opacity-0'} ${isReveal
                  ? 'text-black/15 hover:text-black/70'
                  : 'text-white/15 hover:text-white/80'
                }`}
              style={{
                pointerEvents: isReveal ? 'none' : 'auto',
                '--icon-i': 1,
              } as React.CSSProperties}
              aria-label="Heet Soni on LinkedIn"
            >
              <svg
                className="w-[0.52em] h-[0.52em] transition-colors duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <div className={isIntroComplete ? 'hero-row-mask' : ''}>
              <div className={isIntroComplete ? 'hero-row-animated' : 'opacity-0'} style={{ '--row-i': 1 } as React.CSSProperties}>
                <AnimatedLetters
                  text="SOFTWARE"
                  baseDelay={0.22}
                  isActive={isIntroComplete}
                />
              </div>
            </div>
          </div>

          {/* Row 3: DEVELOPER + Instagram */}
          <div className="flex items-center gap-x-2 sm:gap-x-4 md:gap-x-6 mt-2 relative">
            <div className={isIntroComplete ? 'hero-row-mask' : ''}>
              <div className={isIntroComplete ? 'hero-row-animated' : 'opacity-0'} style={{ '--row-i': 2 } as React.CSSProperties}>
                <AnimatedLetters
                  text="DEVELOPER"
                  baseDelay={0.4}
                  isActive={isIntroComplete}
                />
              </div>
            </div>
            {/* Outline Instagram Icon */}
            <a
              href="https://www.instagram.com/heetsoni__/"
              target="_blank"
              rel="noopener noreferrer"
              className={`cursor-pointer transition-all duration-300 hover:scale-115 ${isIntroComplete ? 'hero-social-icon' : 'opacity-0'} ${isReveal
                  ? 'text-black/15 hover:text-black/70'
                  : 'text-white/15 hover:text-white/80'
                }`}
              style={{
                pointerEvents: isReveal ? 'none' : 'auto',
                '--icon-i': 2,
              } as React.CSSProperties}
              aria-label="Heet Soni on Instagram"
            >
              <svg
                className="w-[0.52em] h-[0.52em] transition-colors duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </h1>

        {/* CTA Buttons */}
        <motion.nav
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0 mt-8 sm:mt-10 md:mt-12 z-30 ${isIntroComplete ? 'hero-btn-animated' : 'opacity-0'}`}
          aria-label="Primary navigation - View portfolio or contact Heet Soni"
        >
          <Link href={isReveal ? '#' : '/resume'}>
            <motion.div
              className={`group px-8 sm:px-10 py-3 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 inline-flex items-center gap-2 sm:gap-3 opacity-90 hover:opacity-100 cursor-pointer ${isReveal
                  ? 'glowing-border-btn-black text-black'
                  : 'glowing-border-btn-white text-white'
                }`}
              aria-label="View Heet Soni's Resume"
              onMouseMove={isReveal ? undefined : handleButtonMouseMove}
              onMouseLeave={isReveal ? undefined : handleButtonMouseLeave}
              style={{
                pointerEvents: isReveal ? 'none' : 'auto',
                x: isReveal ? 0 : springX,
                y: isReveal ? 0 : springY,
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
            {/* Inner background mask */}
            <div className={`absolute inset-0 rounded-full z-0 pointer-events-none transition-colors duration-300 ${isReveal
                ? 'bg-white'
                : 'bg-[#0F0E0E]/95 backdrop-blur-xl group-hover:bg-[#0F0E0E]'
              }`} />

            <span className="relative z-10">View Resume</span>

            {/* Arrow icon */}
            <svg
              className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.div>
        </Link>
      </motion.nav>
      </motion.div>
    );
  };

  return (
    <div
      ref={textWrapperRef}
      className="absolute inset-0 z-20 flex items-center justify-center pointer-events-auto"
      role="banner"
    >
      {/* Base Layer (spans full viewport width and height) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div className="w-full max-w-[1400px] h-full mx-auto px-4 sm:px-6 md:px-8 text-center pointer-events-auto">
          {renderHeroContent(false)}
        </div>
      </div>

      {/* Reveal Layer (spans full viewport width and height, masked, pointer events none) */}
      <div
        ref={revealLayerRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mask: 'url(#fluid-mask)',
          WebkitMask: 'url(#fluid-mask)',
          pointerEvents: 'none',
          backgroundColor: '#ff6000',
          willChange: 'opacity',
          contain: 'layout paint',
        }}
      >
        <div className="w-full max-w-[1400px] h-full mx-auto px-4 sm:px-6 md:px-8 text-center">
          {renderHeroContent(true)}
        </div>
      </div>

      {/* SVG definition of the goo filter and mask - Spans full width and height to prevent boundary clipping */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0, zIndex: -1 }} aria-hidden="true">
        <defs>
          <filter id="goo" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="goo"
            />
          </filter>
          <mask id="fluid-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="black" />
            <g filter="url(#goo)">
              {[...Array(6)].map((_, i) => (
                <circle
                  key={i}
                  ref={(el) => {
                    blobsRef.current[i] = el;
                  }}
                  cx="0"
                  cy="0"
                  r={80 - i * 10}
                  fill="white"
                />
              ))}
            </g>
          </mask>
        </defs>
      </svg>
    </div>
  );
}

