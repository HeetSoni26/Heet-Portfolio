'use client';

import { useCallback } from 'react';

export function useSmoothScroll() {
  const scrollTo = useCallback((target: string | HTMLElement, options?: { offset?: number; duration?: number }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).lenis;
    
    if (lenis && typeof lenis.scrollTo === 'function') {
      // Use Lenis for smooth scrolling
      const element = typeof target === 'string' ? document.getElementById(target) : target;
      
      if (element) {
        lenis.scrollTo(element, {
          offset: options?.offset ?? -80, // Account for fixed navbar
          duration: options?.duration ?? 1.5,
        });
      }
    } else {
      // Fallback to native smooth scroll
      const element = typeof target === 'string' ? document.getElementById(target) : target;
      if (!element) return;

      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset + (options?.offset ?? -80);
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  }, []);
  
  return scrollTo;
}

