'use client';

import { useEffect } from 'react';

/**
 * Suppresses known Three.js deprecation warnings that come from libraries
 * (like @react-three/fiber) that haven't updated yet.
 * 
 * This is a temporary fix until the libraries update to use THREE.Timer
 * instead of the deprecated THREE.Clock.
 */
export default function SuppressThreeWarnings() {
  useEffect(() => {
    const originalWarn = console.warn;
    
    console.warn = (...args: unknown[]) => {
      // Suppress the THREE.Clock deprecation warning from @react-three/fiber
      if (
        typeof args[0] === 'string' &&
        args[0].includes('THREE.Clock') &&
        args[0].includes('deprecated')
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
