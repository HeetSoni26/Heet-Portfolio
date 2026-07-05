'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface IntroAnimationContextType {
  isIntroComplete: boolean;
  completeIntro: () => void;
}

const IntroAnimationContext = createContext<IntroAnimationContextType>({
  isIntroComplete: true,
  completeIntro: () => {},
});

export function IntroAnimationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Default to true (intro complete) — avoids SSR hydration mismatch.
  // On the homepage, useEffect below will flip this to false if intro hasn't played yet.
  const [isIntroComplete, setIsIntroComplete] = useState(true);

  // SSR-safe: check sessionStorage only in useEffect (client-side)
  useEffect(() => {
    if (!isHomePage) {
      setIsIntroComplete(true);
      return;
    }

    // On homepage: check if intro has already played this session
    const hasPlayed = sessionStorage.getItem('intro_played');
    if (hasPlayed) {
      setIsIntroComplete(true);
    } else {
      setIsIntroComplete(false);
    }
  }, [isHomePage]);

  const completeIntro = useCallback(() => {
    setIsIntroComplete(true);
    // Mark intro as played for this session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('intro_played', '1');
    }
  }, []);

  // If navigating away from home, ensure intro is complete
  useEffect(() => {
    if (!isHomePage) {
      setIsIntroComplete(true);
    }
  }, [isHomePage]);

  return (
    <IntroAnimationContext.Provider value={{ isIntroComplete, completeIntro }}>
      {children}
    </IntroAnimationContext.Provider>
  );
}

export function useIntroAnimation() {
  return useContext(IntroAnimationContext);
}

