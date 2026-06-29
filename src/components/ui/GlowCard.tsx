'use client';

import { useRef, useState, useCallback, createContext, useContext, useEffect, memo } from 'react';

// Context for sharing mouse position across cards in a group
interface GlowContextType {
  mousePosition: { x: number; y: number } | null;
}

const GlowContext = createContext<GlowContextType>({ mousePosition: null });

// Container component for grouping cards with shared glow effect
export const GlowCardGroup = memo(function GlowCardGroup({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingPosition = useRef<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Store pending position
    pendingPosition.current = { x: e.clientX, y: e.clientY };
    
    // Throttle with RAF for smooth 60fps updates
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        if (pendingPosition.current) {
          setMousePosition(pendingPosition.current);
        }
        rafRef.current = null;
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setMousePosition(null);
  }, []);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <GlowContext.Provider value={{ mousePosition }}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </div>
    </GlowContext.Provider>
  );
});

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
  borderRadius?: string;
  maskBackground?: string;
}

function GlowCard({
  children,
  className = '',
  glowColor = 'rgba(255, 140, 0, 1)',
  glowSize = 200,
  borderRadius = '1.5rem',
  maskBackground = '#141414',
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const cachedRect = useRef<DOMRect | null>(null);
  const rectCacheTime = useRef<number>(0);

  // Get shared context from GlowCardGroup (if exists)
  const { mousePosition: groupMousePosition } = useContext(GlowContext);

  // Cache getBoundingClientRect for performance (invalidate after 100ms)
  const getRect = useCallback(() => {
    const now = Date.now();
    if (!cachedRect.current || now - rectCacheTime.current > 100) {
      cachedRect.current = cardRef.current?.getBoundingClientRect() || null;
      rectCacheTime.current = now;
    }
    return cachedRect.current;
  }, []);

  // Update glow position using CSS custom properties (avoids React re-renders)
  useEffect(() => {
    if (!cardRef.current || !glowRef.current) return;

    if (!groupMousePosition) {
      setIsActive(false);
      return;
    }

    const rect = getRect();
    if (!rect) {
      setIsActive(false);
      return;
    }

    const proximityThreshold = 50;

    // Check if mouse is near or inside the card
    const isNearOrInside =
      groupMousePosition.x >= rect.left - proximityThreshold &&
      groupMousePosition.x <= rect.right + proximityThreshold &&
      groupMousePosition.y >= rect.top - proximityThreshold &&
      groupMousePosition.y <= rect.bottom + proximityThreshold;

    if (isNearOrInside) {
      // Update CSS custom properties directly (no React state update)
      const x = groupMousePosition.x - rect.left;
      const y = groupMousePosition.y - rect.top;
      glowRef.current.style.setProperty('--glow-x', `${x}px`);
      glowRef.current.style.setProperty('--glow-y', `${y}px`);
      if (!isActive) setIsActive(true);
    } else {
      if (isActive) setIsActive(false);
    }
  }, [groupMousePosition, getRect, isActive]);

  // Handle direct mouse interaction (for cards not in a group)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    // Only handle if not in a group context
    if (groupMousePosition) return;

    const rect = getRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.setProperty('--glow-x', `${x}px`);
    glowRef.current.style.setProperty('--glow-y', `${y}px`);
    if (!isActive) setIsActive(true);
  }, [groupMousePosition, getRect, isActive]);

  const handleMouseLeave = useCallback(() => {
    // Only handle if not in a group context
    if (!groupMousePosition) {
      setIsActive(false);
    }
  }, [groupMousePosition]);

  // Invalidate rect cache on scroll/resize
  useEffect(() => {
    const invalidateCache = () => {
      cachedRect.current = null;
    };
    
    window.addEventListener('scroll', invalidateCache, { passive: true });
    window.addEventListener('resize', invalidateCache, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', invalidateCache);
      window.removeEventListener('resize', invalidateCache);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{ borderRadius, contain: 'layout style' }}
    >
      {/* Glow border effect - only visible on hover */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden"
        style={{
          borderRadius,
          opacity: isActive ? 1 : 0,
          transition: 'opacity 200ms',
          willChange: isActive ? 'auto' : 'opacity',
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
        }}
      >
        {/* Radial gradient glow that follows cursor */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(${glowSize}px circle at var(--glow-x, 0px) var(--glow-y, 0px), ${glowColor}, transparent 45%)`,
          }}
        />
      </div>

      {/* Inner content mask - creates the border effect by covering the center */}
      <div
        className="absolute inset-[2px] rounded-[inherit] pointer-events-none"
        style={{
          borderRadius: `calc(${borderRadius} - 2px)`,
          background: maskBackground,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}

export default memo(GlowCard);
