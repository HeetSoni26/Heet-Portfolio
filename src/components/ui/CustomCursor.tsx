'use client';

import { useEffect, useRef, useState } from 'react';

const DOT_SIZE = 5;
const RING_SIZE = 24;
const FOLLOW_SPEED = 0.16;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const hasPointerRef = useRef(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) return;

    document.documentElement.classList.add('custom-cursor-enabled');
    setEnabled(true);

    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled');
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const setVisible = (visible: boolean) => {
      dot.classList.toggle('is-visible', visible);
      ring.classList.toggle('is-visible', visible);
    };

    // Tracking mouse coordinates
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;

      const x = event.clientX;
      const y = event.clientY;

      pointerRef.current.x = x;
      pointerRef.current.y = y;

      setVisible(true);

      if (!hasPointerRef.current) {
        hasPointerRef.current = true;
        ringPosRef.current.x = x;
        ringPosRef.current.y = y;
      }

      dot.style.transform = `translate3d(${x - DOT_SIZE / 2}px, ${y - DOT_SIZE / 2}px, 0)`;
    };

    // Event delegation for clickable and text elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable = target.closest('a, button, [role="button"], .cursor-pointer, input[type="submit"], input[type="button"], label') !== null;
      const isText = target.closest('input[type="text"], input[type="email"], input[type="search"], textarea, [contenteditable="true"]') !== null;

      const dotVisual = dot.querySelector('.custom-cursor-dot-visual');
      const ringVisual = ring.querySelector('.custom-cursor-ring-visual');

      if (dotVisual && ringVisual) {
        // Toggle hovered state
        if (isClickable) {
          dotVisual.classList.add('is-hovered');
          ringVisual.classList.add('is-hovered');
        } else {
          dotVisual.classList.remove('is-hovered');
          ringVisual.classList.remove('is-hovered');
        }

        // Toggle text entry state (fade cursor to avoid blocking text caret)
        if (isText) {
          dot.classList.add('is-text');
          ring.classList.add('is-text');
        } else {
          dot.classList.remove('is-text');
          ring.classList.remove('is-text');
        }
      }
    };

    const handleMouseDown = () => {
      const dotVisual = dot.querySelector('.custom-cursor-dot-visual');
      const ringVisual = ring.querySelector('.custom-cursor-ring-visual');
      if (dotVisual && ringVisual) {
        dotVisual.classList.add('is-clicked');
        ringVisual.classList.add('is-clicked');
      }
    };

    const handleMouseUp = () => {
      const dotVisual = dot.querySelector('.custom-cursor-dot-visual');
      const ringVisual = ring.querySelector('.custom-cursor-ring-visual');
      if (dotVisual && ringVisual) {
        dotVisual.classList.remove('is-clicked');
        ringVisual.classList.remove('is-clicked');
      }
    };

    const handleWindowBlur = () => {
      setVisible(false);
    };

    const handleWindowFocus = () => {
      if (hasPointerRef.current) {
        setVisible(true);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setVisible(false);
        return;
      }
      if (hasPointerRef.current) {
        setVisible(true);
      }
    };

    const animateRing = () => {
      if (hasPointerRef.current) {
        const current = ringPosRef.current;
        const pointer = pointerRef.current;

        current.x += (pointer.x - current.x) * FOLLOW_SPEED;
        current.y += (pointer.y - current.y) * FOLLOW_SPEED;

        ring.style.transform = `translate3d(${current.x - RING_SIZE / 2}px, ${current.y - RING_SIZE / 2}px, 0)`;
      }

      rafRef.current = window.requestAnimationFrame(animateRing);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    rafRef.current = window.requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring-container" aria-hidden="true">
        <div className="custom-cursor-ring-visual" />
      </div>
      <div ref={dotRef} className="custom-cursor-dot-container" aria-hidden="true">
        <div className="custom-cursor-dot-visual" />
      </div>
    </>
  );
}