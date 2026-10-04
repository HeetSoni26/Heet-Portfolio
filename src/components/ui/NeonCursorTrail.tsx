'use client';

import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  timestamp: number;
}

export default function NeonCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0, timestamp: 0 });
  const trailRef = useRef<Point[]>([]);
  const particlesRef = useRef<Point[]>([]);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Setup canvas
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    setupCanvas();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        timestamp: now,
      };

      // Add to trail
      trailRef.current.push({ x: e.clientX, y: e.clientY, timestamp: now });

      // Keep trail length optimal for smooth curves
      if (trailRef.current.length > 30) {
        trailRef.current.shift();
      }

      // Add particles along the trail occasionally
      if (Math.random() < 0.3) {
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          timestamp: now,
        });
      }
    };

    // Draw smooth curve using Catmull-Rom spline
    const drawSmoothCurve = (points: Point[]) => {
      if (points.length < 2) return;

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(0, i - 1)];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[Math.min(points.length - 1, i + 2)];

        const tension = 0.5;
        const cp1x = p1.x + (p2.x - p0.x) / 6 * tension;
        const cp1y = p1.y + (p2.y - p0.y) / 6 * tension;
        const cp2x = p2.x - (p3.x - p1.x) / 6 * tension;
        const cp2y = p2.y - (p3.y - p1.y) / 6 * tension;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
    };

    // Animation loop
    const animate = () => {
      const now = Date.now();

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Remove old trail points (older than 800ms)
      trailRef.current = trailRef.current.filter(p => now - p.timestamp < 800);

      // Remove old particles (older than 1000ms)
      particlesRef.current = particlesRef.current.filter(p => now - p.timestamp < 1000);

      // Draw trail if we have enough points
      if (trailRef.current.length > 2) {
        const trail = trailRef.current;

        // Create gradient along the trail
        const gradient = ctx.createLinearGradient(
          trail[0].x,
          trail[0].y,
          trail[trail.length - 1].x,
          trail[trail.length - 1].y
        );
        gradient.addColorStop(0, 'rgba(255, 96, 0, 0)');
        gradient.addColorStop(0.3, 'rgba(255, 96, 0, 0.6)');
        gradient.addColorStop(0.7, 'rgba(255, 96, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 96, 0, 1)');

        // Draw outer glow
        ctx.save();
        drawSmoothCurve(trail);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = 'rgba(255, 96, 0, 0.5)';
        ctx.shadowBlur = 15;
        ctx.globalAlpha = 0.4;
        ctx.stroke();
        ctx.restore();

        // Draw main trail
        ctx.save();
        drawSmoothCurve(trail);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = 'rgba(255, 96, 0, 0.8)';
        ctx.shadowBlur = 8;
        ctx.globalAlpha = 0.9;
        ctx.stroke();
        ctx.restore();
      }

      // Draw particles along the trail
      particlesRef.current.forEach(particle => {
        const age = now - particle.timestamp;
        const life = 1 - age / 1000;
        const size = 3 + life * 2;
        const opacity = life * 0.8;

        // Particle glow
        const particleGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size * 2
        );
        particleGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        particleGradient.addColorStop(0.4, `rgba(255, 96, 0, ${opacity * 0.8})`);
        particleGradient.addColorStop(1, `rgba(255, 96, 0, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 96, 0, ${opacity})`;
        ctx.shadowColor = 'rgba(255, 96, 0, 0.8)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw cursor dot
      if (mouseRef.current.timestamp > 0) {
        const cursorGradient = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 8
        );
        cursorGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        cursorGradient.addColorStop(0.3, 'rgba(255, 96, 0, 0.9)');
        cursorGradient.addColorStop(0.7, 'rgba(255, 96, 0, 0.6)');
        cursorGradient.addColorStop(1, 'rgba(255, 96, 0, 0)');

        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = cursorGradient;
        ctx.fill();

        // Inner bright core
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 96, 0, 1)';
        ctx.shadowColor = 'rgba(255, 96, 0, 1)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Resize handler
    const handleResize = () => {
      setupCanvas();
    };

    // Start
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
