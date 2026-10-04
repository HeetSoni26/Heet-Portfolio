'use client';

import { useState, useEffect } from 'react';

export default function useScrollSpy(ids: string[]): string {
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navbar height
      
      // Check each section from bottom to top
      // This ensures we get the correct section even when multiple are visible
      let currentSection = 'hero';
      
      for (let i = ids.length - 1; i >= 0; i--) {
        const id = ids[i];
        const element = document.getElementById(id);
        
        if (element) {
          const offsetTop = element.offsetTop;
          
          // If we've scrolled past this section's start, it's the active one
          if (scrollPosition >= offsetTop) {
            currentSection = id;
            break;
          }
        }
      }
      
      setActiveId(currentSection);
    };

    // Run on mount
    handleScroll();
    
    // Run on scroll with throttling for performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [ids]);

  return activeId;
}
