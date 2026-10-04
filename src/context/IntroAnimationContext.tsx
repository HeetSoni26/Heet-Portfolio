'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
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

  // Initialize state: on homepage entry/refresh, start as false to play intro once.
  // On non-homepage entry (e.g. /projects), start as true.
  const [isIntroComplete, setIsIntroComplete] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname !== '/';
    }
    return !isHomePage;
  });

  const completeIntro = useCallback(() => {
    setIsIntroComplete(true);
  }, []);

  return (
    <IntroAnimationContext.Provider value={{ isIntroComplete, completeIntro }}>
      {children}
    </IntroAnimationContext.Provider>
  );
}

export function useIntroAnimation() {
  return useContext(IntroAnimationContext);
}
