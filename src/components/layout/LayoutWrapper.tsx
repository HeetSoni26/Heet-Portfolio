'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import Chatbot from "@/components/ui/Chatbot";
import TerminalSandbox from "@/components/ui/TerminalSandbox";

import MatrixRain from "@/components/ui/MatrixRain";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith('/projects/');
  const isContactPage = pathname === '/contact';
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const handleFadeTransition = async (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      const id = customEvent.detail.id;

      // Start fade out
      setIsFading(true);

      // Wait for fade out to complete (300ms)
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Scroll instantly to target Y offset or element
      if (id === 'top' || id === 'hero') {
        // Scroll to the absolute top of the page
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lenis = (window as any).lenis;
        if (lenis && typeof lenis.scrollTo === 'function') {
          lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
        window.dispatchEvent(new Event('scroll'));
      } else {
        const element = document.getElementById(id);
        if (element) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const lenis = (window as any).lenis;
          if (lenis && typeof lenis.scrollTo === 'function') {
            lenis.scrollTo(element, { immediate: true });
          } else {
            element.scrollIntoView({ behavior: 'auto' });
          }
          window.dispatchEvent(new Event('scroll'));
        }
      }

      // Force GSAP ScrollTrigger to update immediately after the scroll
      ScrollTrigger.update();

      // Give a tiny buffer for browser layout to settle, then fade back in
      await new Promise((resolve) => setTimeout(resolve, 50));
      setIsFading(false);

      // Give a small buffer and update GSAP ScrollTrigger again once visible
      await new Promise((resolve) => setTimeout(resolve, 50));
      ScrollTrigger.update();
    };

    window.addEventListener('trigger-nav-fade', handleFadeTransition);
    return () => {
      window.removeEventListener('trigger-nav-fade', handleFadeTransition);
    };
  }, []);

  if (isProjectPage) {
    return (
      <main className="w-full min-h-screen relative" style={{ overflow: 'visible' }}>
        {children}
      </main>
    );
  }

  return (
    <>
      <MatrixRain />
      {!isContactPage && <Navbar />}
      <main 
        className={`relative z-10 transition-opacity duration-300 ease-in-out ${
          isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`} 
        style={{ overflow: 'visible' }}
      >
        {children}
      </main>
      <Footer />
      <Chatbot />
      <TerminalSandbox />
    </>
  );
}
