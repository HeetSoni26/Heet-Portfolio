'use client';

import { useEffect } from 'react';
import Hero from '@/components/sections/Hero/Hero';
import IntroScreen from '@/components/sections/Hero/IntroScreen';
import { useIntroAnimation } from '@/context/IntroAnimationContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Sections are statically imported: every section renders into the initial
// HTML and hydrates in one pass. next/dynamic with ssr:true split them into
// streamed Suspense boundaries whose completion was deferred until idle,
// leaving sections invisible for seconds after load on slower devices.
import About from '@/components/sections/About/About';
import Skills from '@/components/sections/Skills/Skills';
import Work from '@/components/sections/Work/Work';
import ActivityMetrics from '@/components/sections/Activity/ActivityMetrics';
import GitHubContributions from '@/components/sections/GitHub/GitHubContributions';
import Contact from '@/components/sections/Contact/Contact';
import MarqueeBanner from '@/components/sections/About/MarqueeBanner';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const { isIntroComplete } = useIntroAnimation();

  useEffect(() => {
    // Scroll to section based on hash in URL on mount
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lenis = (window as any).lenis;
        
        if (id === 'hero') {
          if (lenis && typeof lenis.scrollTo === 'function') {
            lenis.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo({ top: 0, behavior: 'auto' });
          }
        } else {
          const element = document.getElementById(id);
          if (element) {
            if (lenis && typeof lenis.scrollTo === 'function') {
              lenis.scrollTo(element, { immediate: true });
            } else {
              element.scrollIntoView({ behavior: 'auto' });
            }
          }
        }
        
        // Sync GSAP ScrollTrigger states after mount scroll
        ScrollTrigger.update();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Sync GSAP ScrollTrigger updates on scroll
    const handleScroll = () => {
      ScrollTrigger.update();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0E0E]" style={{ willChange: 'auto' }}>
      {/* Cinematic Intro Screen — plays once per session, then unmounts */}
      {!isIntroComplete && <IntroScreen />}

      {/* Page Content (Hero & Below Sections) — Smoothly fades in in 0.9s after intro completes */}
      <div
        className="w-full transition-opacity duration-900 ease-in-out"
        style={{
          opacity: isIntroComplete ? 1 : 0,
          pointerEvents: isIntroComplete ? 'auto' : 'none',
          transitionDuration: '0.9s',
        }}
      >
        {/* Hero Section */}
        <Hero />

        {/* Below-fold sections */}
        <About />
        <Skills />
        <Work />
        <ActivityMetrics />
        <GitHubContributions />
        <MarqueeBanner />
        <Contact />
      </div>
    </div>
  );
}

