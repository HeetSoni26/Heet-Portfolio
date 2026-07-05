'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero/Hero';
import IntroScreen from '@/components/sections/Hero/IntroScreen';
import { useIntroAnimation } from '@/context/IntroAnimationContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Lazy load sections that are below the fold
const About = dynamic(() => import('@/components/sections/About/About'), {
  loading: () => <div className="min-h-screen bg-[#0F0E0E]" />,
  ssr: true, // Still render on server for SEO
});

const Skills = dynamic(() => import('@/components/sections/Skills/Skills'), {
  loading: () => <div className="min-h-screen bg-[#0F0E0E]" />,
  ssr: true,
});

const Work = dynamic(() => import('@/components/sections/Work/Work'), {
  loading: () => <div className="min-h-screen bg-[#0F0E0E]" />,
  ssr: true,
});

const ActivityMetrics = dynamic(() => import('@/components/sections/Activity/ActivityMetrics'), {
  loading: () => <div className="min-h-screen bg-[#0F0E0E]" />,
  ssr: true,
});

const GitHubContributions = dynamic(() => import('@/components/sections/GitHub/GitHubContributions'), {
  loading: () => <div className="min-h-96 bg-[#0F0E0E]" />,
  ssr: true,
});

const Contact = dynamic(() => import('@/components/sections/Contact/Contact'), {
  loading: () => <div className="min-h-screen bg-[#0F0E0E]" />,
  ssr: true,
});

const MarqueeBanner = dynamic(() => import('@/components/sections/About/MarqueeBanner'), {
  loading: () => <div className="h-screen bg-[#0F0E0E]" />,
  ssr: true,
});

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

      {/* Hero Section - Always mounted (initializes during intro Phase 3) */}
      <Hero />

      {/* Below sections - Lazy loaded */}
      <About />
      <Skills />
      <Work />
      <ActivityMetrics />
      <GitHubContributions />
      <MarqueeBanner />
      <Contact />
    </div>
  );
}

