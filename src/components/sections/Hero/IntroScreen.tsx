'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [isSvgLoaded, setIsSvgLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mount guard & motion preference check
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

  // Fallback timer: ensure isSvgLoaded becomes true quickly even if onLoad fires before React hydration
  useEffect(() => {
    if (!isMounted) return;
    const timer = setTimeout(() => {
      setIsSvgLoaded(true);
    }, 60);
    return () => clearTimeout(timer);
  }, [isMounted]);

  // Main GSAP Timeline — Runs once SVG is ready in the DOM
  useEffect(() => {
    if (!isMounted || !isSvgLoaded || prefersReducedMotion) return;
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
        // Map progress (0 -> 100) to animated edge position (-12 -> 112) so starting text is 100% hidden on frame 0
        const currentEdge = -12 + (progress / 100) * 124;
        const start = Math.max(0, currentEdge - 12);
        const end = Math.min(100, Math.max(0, currentEdge + 12));

        let mask: string;
        if (currentEdge <= -12) {
          mask = 'linear-gradient(to right, transparent 0%, transparent 100%)';
        } else {
          mask = `linear-gradient(to right, #ffffff 0%, #ffffff ${Math.max(0, start)}%, transparent ${end}%, transparent 100%)`;
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

      // Phase 2 — Handwriting Reveal (0.3s - 2.5s) over 2.2s at constant smooth speed across SVG calligraphy
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
      // PHASE 3 — Signature Hold & Explosive Scale Zoom Portal Exit
      // 1. Brief hold for 0.2s (2.5s - 2.7s)
      // 2. Signature text zooms extremely large towards viewer (scale: 1.0 -> 18.0)
      //    with motion blur and opacity fade (2.7s - 3.55s)
      // 3. Smooth overlay fade out revealing Hero section from within (2.85s - 3.7s)
      // ═══════════════════════════════════════════════════════════

      // Dramatic explosive zoom of signature SVG past the camera
      tl.to(
        signatureWrapperRef.current,
        {
          scale: 18.0,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 0.85,
          ease: 'power3.in',
        },
        2.7
      );

      // Smooth overlay fade out to reveal Hero section emerging from center
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.85,
          ease: 'power3.inOut',
          onComplete: () => {
            completeIntro();
          },
        },
        2.85
      );
    });

    return () => {
      ctx.revert();
    };
  }, [isMounted, isSvgLoaded, prefersReducedMotion, completeIntro]);

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
          className="relative flex items-center justify-center w-[52vw] max-w-[460px]"
          style={{
            aspectRatio: '832.725 / 236.312',
          }}
        >
          <img
            src="/rameshwar-signature.svg"
            alt="Rameshwar signature"
            onLoad={() => setIsSvgLoaded(true)}
            className="w-full h-full object-contain brightness-0 invert select-none pointer-events-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
