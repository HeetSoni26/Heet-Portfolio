'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useIntroAnimation } from '@/context/IntroAnimationContext';

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const PARTICLE_COUNT_DESKTOP = 12;
const PARTICLE_COUNT_MOBILE = 6;

// ═══════════════════════════════════════════════════════════════════
// AMBIENT PARTICLE (pure CSS, no canvas overhead)
// ═══════════════════════════════════════════════════════════════════

function AmbientParticle({ index, total }: { index: number; total: number }) {
  const size = 3 + Math.random() * 5;
  const left = 10 + (index / total) * 80 + (Math.random() - 0.5) * 15;
  const delay = Math.random() * 3;
  const duration = 6 + Math.random() * 6;
  const opacity = 0.08 + Math.random() * 0.15;

  return (
    <div
      className="intro-ambient-particle"
      style={{
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        bottom: `-${size}px`,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(255,255,255,${opacity + 0.1}) 0%, rgba(255,255,255,0) 70%)`,
        opacity: 0,
        animationName: 'introParticleDrift',
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        animationFillMode: 'both',
        willChange: 'transform, opacity',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// INTRO SCREEN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export default function IntroScreen() {
  const { completeIntro } = useIntroAnimation();

  // Refs for GSAP targets
  const overlayRef = useRef<HTMLDivElement>(null);
  const signatureWrapperRef = useRef<HTMLDivElement>(null);
  const signatureContainerRef = useRef<HTMLDivElement>(null);
  const penTipRef = useRef<HTMLDivElement>(null);
  const penNibRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // State
  const [isMounted, setIsMounted] = useState(false);
  const [particleCount, setParticleCount] = useState(PARTICLE_COUNT_DESKTOP);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const hasExitedRef = useRef(false);

  // ─── Mount guard (SSR-safe) ─────────────────────────────────────
  useEffect(() => {
    setIsMounted(true);
    const isMobile = window.innerWidth < 768;
    setParticleCount(isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP);
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  // ─── Lock scroll during intro ──────────────────────────────────
  useEffect(() => {
    if (!isMounted) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isMounted]);

  // ─── Exit handler (shared by timeline completion + skip) ────────
  const handleExit = useCallback(() => {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;

    // Kill any running timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Quick iris-out exit
    const exitTl = gsap.timeline({
      onComplete: () => {
        completeIntro();
      },
    });

    exitTl
      .to(overlayRef.current, {
        clipPath: 'circle(150% at 50% 50%)',
        duration: 0.8,
        ease: 'power3.inOut',
      })
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        },
        '-=0.2'
      );
  }, [completeIntro]);

  // ─── Reduced motion: simple fade ────────────────────────────────
  useEffect(() => {
    if (!isMounted || !prefersReducedMotion) return;

    const tl = gsap.timeline({
      onComplete: () => {
        completeIntro();
      },
    });

    // Simple fade-in signature, then fade-out overlay
    tl.set(signatureContainerRef.current, { clipPath: 'inset(0 0% 0 0)' })
      .fromTo(
        signatureWrapperRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        delay: 0.8,
      });

    return () => {
      tl.kill();
    };
  }, [isMounted, prefersReducedMotion, completeIntro]);

  // ─── Main 4-phase GSAP Timeline ────────────────────────────────
  useEffect(() => {
    if (!isMounted || prefersReducedMotion) return;
    if (!overlayRef.current || !signatureContainerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
      });
      timelineRef.current = tl;

      // ═══════════════════════════════════════════════════════════
      // PHASE 1 — Setup (0 - 0.3s)
      // Pen nib glow appears, particles begin
      // ═══════════════════════════════════════════════════════════

      // Initial states
      tl.set(signatureContainerRef.current, {
        clipPath: 'inset(0 100% 0 0)',
      })
        .set(penTipRef.current, { opacity: 0, scale: 0.3 })
        .set(penNibRef.current, { opacity: 0, scale: 0 })
        .set(signatureWrapperRef.current, {
          scale: 1.05,
          opacity: 0,
        })
        .set(underlineRef.current, { scaleX: 0, opacity: 0 })
        .set(taglineRef.current, {
          opacity: 0,
          y: 20,
          letterSpacing: '0.3em',
        });

      // Pen nib appears
      tl.to(
        penNibRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'back.out(2)',
        },
        0
      );

      // Signature wrapper fades in (container becomes visible)
      tl.to(
        signatureWrapperRef.current,
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
        0
      );

      // ═══════════════════════════════════════════════════════════
      // PHASE 2 — Signature Draw-On (0.3s - 2.5s)
      // clip-path reveal L→R with pen tip tracking
      // ═══════════════════════════════════════════════════════════

      // Reveal signature via clip-path inset
      tl.to(
        signatureContainerRef.current,
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 2.2,
          ease: 'power2.inOut',
        },
        0.3
      );

      // Pen tip glow tracks the reveal edge
      tl.fromTo(
        penTipRef.current,
        { opacity: 0.9, left: '2%' },
        {
          left: '98%',
          opacity: 0.9,
          duration: 2.2,
          ease: 'power2.inOut',
        },
        0.3
      );

      // Fade out pen nib as pen tip takes over
      tl.to(
        penNibRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
        0.5
      );

      // Pen tip shown during draw
      tl.to(
        penTipRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        },
        0.3
      );

      // Cinematic scale settle
      tl.to(
        signatureWrapperRef.current,
        {
          scale: 1.0,
          duration: 2.2,
          ease: 'power2.out',
        },
        0.3
      );

      // ═══════════════════════════════════════════════════════════
      // PHASE 3 — Signature Complete / Hold (2.5s - 3.2s)
      // Flash glow, underline sweep, tagline
      // ═══════════════════════════════════════════════════════════

      // Pen tip fades out
      tl.to(
        penTipRef.current,
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          ease: 'power2.in',
        },
        2.5
      );

      // Flash-glow pulse on the signature
      tl.to(
        signatureContainerRef.current,
        {
          filter:
            'drop-shadow(0 0 30px rgba(255,255,255,0.8)) drop-shadow(0 0 60px rgba(255,255,255,0.4))',
          duration: 0.25,
          ease: 'power3.out',
        },
        2.5
      ).to(
        signatureContainerRef.current,
        {
          filter:
            'drop-shadow(0 0 12px rgba(255,255,255,0.25)) drop-shadow(0 0 24px rgba(255,255,255,0.08))',
          duration: 0.45,
          ease: 'power2.inOut',
        },
        2.75
      );

      // Underline sweep
      tl.to(
        underlineRef.current,
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
        },
        2.6
      );

      // Tagline fade-in
      tl.to(
        taglineRef.current,
        {
          opacity: 1,
          y: 0,
          letterSpacing: '0.05em',
          duration: 0.5,
          ease: 'power3.out',
        },
        2.7
      );

      // Skip button appears
      tl.to(
        skipBtnRef.current,
        {
          opacity: 0.4,
          duration: 0.3,
          ease: 'power2.out',
        },
        1.0
      );

      // ═══════════════════════════════════════════════════════════
      // PHASE 4 — Exit Transition into Hero (3.2s - 4.2s)
      // Iris/aperture radial clip-path reveal
      // ═══════════════════════════════════════════════════════════

      // Scale up signature + glow for "burn through" effect
      tl.to(
        signatureWrapperRef.current,
        {
          scale: 1.5,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.in',
        },
        3.3
      );

      // Iris-out the overlay
      tl.fromTo(
        overlayRef.current,
        { clipPath: 'circle(100% at 50% 50%)' },
        {
          clipPath: 'circle(0% at 50% 50%)',
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            completeIntro();
          },
        },
        3.4
      );
    });

    return () => {
      ctx.revert();
    };
  }, [isMounted, prefersReducedMotion, completeIntro]);

  // ─── Don't render on server ─────────────────────────────────────
  if (!isMounted) {
    // Render a black placeholder to avoid flash
    return (
      <div
        className="fixed inset-0 z-50 bg-black"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black overflow-hidden"
      style={{
        clipPath: 'circle(100% at 50% 50%)',
        contain: 'layout style paint',
      }}
      aria-hidden="true"
    >
      {/* ─── Ambient Particles (CSS only) ──────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: particleCount }, (_, i) => (
          <AmbientParticle key={i} index={i} total={particleCount} />
        ))}
      </div>

      {/* ─── Subtle radial vignette ────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.7) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ─── Pen Nib Glow (Phase 1 starting point) ────────────── */}
      <div
        ref={penNibRef}
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: 'calc(50% - min(40vw, 280px))',
          transform: 'translate(-50%, -50%)',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 40%, transparent 70%)',
          boxShadow:
            '0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1)',
          opacity: 0,
          willChange: 'transform, opacity',
        }}
        aria-hidden="true"
      />

      {/* ─── Signature Wrapper (scale + opacity target) ────────── */}
      <div
        ref={signatureWrapperRef}
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          willChange: 'transform, opacity',
          opacity: 0,
        }}
      >
        {/* Signature Container (clip-path target) */}
        <div
          ref={signatureContainerRef}
          className="relative"
          style={{
            clipPath: 'inset(0 100% 0 0)',
            willChange: 'clip-path, filter',
            filter:
              'drop-shadow(0 0 12px rgba(255,255,255,0.25)) drop-shadow(0 0 24px rgba(255,255,255,0.08))',
          }}
        >
          <Image
            src="/rameshwar-signature.png"
            alt="Rameshwar signature"
            width={560}
            height={200}
            priority
            unoptimized
            className="w-[65vw] max-w-[560px] h-auto select-none"
            style={{
              filter: 'brightness(1.1)',
            }}
            draggable={false}
          />

          {/* ─── Pen Tip Glow (tracks reveal edge) ───────────── */}
          <div
            ref={penTipRef}
            className="absolute pointer-events-none"
            style={{
              top: '45%',
              left: '2%',
              transform: 'translate(-50%, -50%)',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 35%, rgba(255,200,150,0.2) 60%, transparent 75%)',
              boxShadow:
                '0 0 16px rgba(255,255,255,0.7), 0 0 32px rgba(255,255,255,0.35), 0 0 48px rgba(255,200,150,0.15)',
              opacity: 0,
              willChange: 'transform, opacity, left',
            }}
            aria-hidden="true"
          />
        </div>

        {/* ─── Underline Flourish ──────────────────────────────── */}
        <div
          ref={underlineRef}
          className="mt-3 sm:mt-4"
          style={{
            width: 'min(50vw, 380px)',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.5) 80%, transparent 100%)',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
            opacity: 0,
            willChange: 'transform, opacity',
          }}
          aria-hidden="true"
        />

        {/* ─── Tagline ─────────────────────────────────────────── */}
        <div
          ref={taglineRef}
          className="mt-5 sm:mt-6 text-center"
          style={{
            opacity: 0,
            willChange: 'transform, opacity, letter-spacing',
          }}
        >
          <p
            className="text-[11px] sm:text-[13px] font-light tracking-[0.3em] uppercase"
            style={{
              color: 'rgba(255, 255, 255, 0.55)',
              fontFamily: 'var(--font-space-grotesk), sans-serif',
            }}
          >
            Full Stack Developer{' '}
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>•</span>{' '}
            AI/ML Enthusiast
          </p>
        </div>
      </div>

      {/* ─── Skip Intro Button ─────────────────────────────────── */}
      <button
        ref={skipBtnRef}
        onClick={handleExit}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[60] px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm text-[11px] sm:text-[12px] font-light tracking-[0.15em] uppercase text-white/40 hover:text-white/80 hover:border-white/25 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer select-none"
        style={{
          opacity: 0,
          fontFamily: 'var(--font-space-grotesk), sans-serif',
          willChange: 'opacity',
        }}
        aria-label="Skip intro animation"
      >
        Skip
      </button>

      {/* ─── CSS Keyframes for Ambient Particles ───────────────── */}
      <style jsx global>{`
        @keyframes introParticleDrift {
          0% {
            transform: translateY(0) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(-10vh) translateX(5px) scale(1);
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-110vh) translateX(-8px) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
