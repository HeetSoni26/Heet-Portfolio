'use client';

import { useEffect } from 'react';

/**
 * Polyfill for smooth scrolling with better performance
 * Uses requestAnimationFrame for buttery-smooth scrolling
 */
export function useSmoothScrollPolyfill() {
  useEffect(() => {
    // Check if smooth scroll is already supported
    if ('scrollBehavior' in document.documentElement.style) {
      return;
    }

    // Polyfill for browsers that don't support smooth scroll
    const smoothScroll = (target: HTMLElement, duration: number = 800) => {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth deceleration
        const ease = (t: number) => t < 0.5 
          ? 4 * t * t * t 
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        
        window.scrollTo(0, startPosition + distance * ease(progress));

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    // Override default anchor click behavior
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            smoothScroll(targetElement as HTMLElement);
          }
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
}
