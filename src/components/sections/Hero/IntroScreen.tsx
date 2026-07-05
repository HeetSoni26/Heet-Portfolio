'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useIntroAnimation } from '@/context/IntroAnimationContext';

// INTRO SCREEN COMPONENT
export default function IntroScreen() {
  const { completeIntro } = useIntroAnimation();

  // Refs for GSAP targets
  const overlayRef = useRef<HTMLDivElement>(null);
  const signatureWrapperRef = useRef<HTMLDivElement>(null);
  const signatureContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // State
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const hasExitedRef = useRef(false);

  // Mount guard (SSR-safe)
  useEffect(() => {
    setIsMounted(true);
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  // Lock scroll during intro
  useEffect(() => {
    if (!isMounted) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isMounted]);

  // Reduced motion fallback: simple fade
  useEffect(() => {
    if (!isMounted || !prefersReducedMotion) return;

    const tl = gsap.timeline({
      onComplete: () => {
        completeIntro();
      },
    });

    tl.set(signatureContainerRef.current, { clipPath: 'inset(0 0% 0 0)' })
      .fromTo(
        signatureWrapperRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.9,
        ease: 'power2.inOut',
        delay: 0.6,
      });

    return () => {
      tl.kill();
    };
  }, [isMounted, prefersReducedMotion, completeIntro]);

  // Main GSAP Timeline
  useEffect(() => {
    if (!isMounted || prefersReducedMotion) return;
    if (!overlayRef.current || !signatureContainerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
      });
      timelineRef.current = tl;

      // Phase 1 — Setup (0 - 0.3s)
      const revealState = { progress: 0 };
      const updateSoftMask = (progress: number) => {
        if (!signatureContainerRef.current) return;
        if (progress >= 100) {
          signatureContainerRef.current.style.maskImage = 'none';
          signatureContainerRef.current.style.webkitMaskImage = 'none';
          return;
        }
        // Map progress (0 -> 100) to animated edge position (-12 -> 112) so starting text is 100% hidden
        const currentEdge = -12 + (progress / 100) * 124;
        const start = Math.max(0, currentEdge - 12);
        const end = Math.min(100, Math.max(0, currentEdge + 12));

        let mask: string;
        if (currentEdge <= -12) {
          mask = 'linear-gradient(to right, transparent 0%, transparent 100%)';
        } else {
          mask = `linear-gradient(to right, #000 0%, #000 ${Math.max(0, start)}%, transparent ${end}%, transparent 100%)`;
        }
        signatureContainerRef.current.style.maskImage = mask;
        signatureContainerRef.current.style.webkitMaskImage = mask;
      };
      updateSoftMask(0);

      tl.set(signatureWrapperRef.current, {
        scale: 1.04,
        opacity: 0,
      });

      // Signature wrapper fades in smoothly
      tl.to(
        signatureWrapperRef.current,
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        0
      );

      // Phase 2 — Handwriting Reveal (0.3s - 2.5s) over 2.2s at constant smooth speed
      tl.to(
        revealState,
        {
          progress: 100,
          duration: 2.2,
          ease: 'none',
          onUpdate: () => updateSoftMask(revealState.progress),
        },
        0.3
      );

      // Scale settle over 2.2 seconds
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
      // PHASE 3 — Signature Hold & Cinematic Dissolve Exit (2.5s - 3.8s)
      // 1. Brief hold for 0.25s (2.5s - 2.75s)
      // 2. Signature atmospheric blur dissolve & lift (2.75s - 3.45s)
      // 3. Seamless 0.9s overlay fade opening into Hero section (2.95s - 3.85s)
      // ═══════════════════════════════════════════════════════════

      // Atmospheric lift & blur dissolve on signature wrapper
      tl.to(
        signatureWrapperRef.current,
        {
          scale: 1.08,
          y: -24,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 0.75,
          ease: 'power3.inOut',
        },
        2.75
      );

      // Smooth 0.9s overlay fade out to reveal Hero section
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.9,
          ease: 'power3.inOut',
          onComplete: () => {
            completeIntro();
          },
        },
        2.95
      );
    });

    return () => {
      ctx.revert();
    };
  }, [isMounted, prefersReducedMotion, completeIntro]);

  if (!isMounted) {
    return (
      <div
        className="fixed inset-0 z-[9999] bg-[#0F0E0E]"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-[#0F0E0E] overflow-hidden"
      style={{
        contain: 'layout style paint',
      }}
      aria-hidden="true"
    >
      {/* Signature Wrapper — Centered on plane #0F0E0E background */}
      <div
        ref={signatureWrapperRef}
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          willChange: 'transform, opacity',
          opacity: 0,
        }}
      >
        <div
          ref={signatureContainerRef}
          className="relative"
        >
          <Image
            src="/rameshwar-signature.png"
            alt="Rameshwar signature"
            width={560}
            height={200}
            priority
            unoptimized
            className="w-[65vw] max-w-[560px] h-auto select-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
