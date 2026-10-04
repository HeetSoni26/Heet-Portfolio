'use client';

import { useEffect, useRef } from 'react';
import { useIntroAnimation } from '@/context/IntroAnimationContext';

interface Blob {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
}

export default function AuroraMeshBackground() {
  const { isIntroComplete } = useIntroAnimation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set low resolution scale for performance (gradients look smooth anyway)
    const renderScale = 0.5;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * renderScale;
      canvas.height = window.innerHeight * renderScale;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = (e.clientX - rect.left) * renderScale;
      mouseRef.current.targetY = (e.clientY - rect.top) * renderScale;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Initialize liquid blobs
    // Warm accent colors matching Heet's branding: Orange, Rose, Crimson, Purple
    const blobs: Blob[] = [
      {
        x: canvas.width * 0.2,
        y: canvas.height * 0.2,
        radius: Math.max(canvas.width, canvas.height) * 0.75,
        color: 'rgba(255, 140, 0, 0.22)', // Warm Orange
        vx: 0.2,
        vy: 0.15,
        targetX: canvas.width * 0.2,
        targetY: canvas.height * 0.2,
      },
      {
        x: canvas.width * 0.8,
        y: canvas.height * 0.3,
        radius: Math.max(canvas.width, canvas.height) * 0.65,
        color: 'rgba(219, 39, 119, 0.18)', // Rose-Magenta
        vx: -0.15,
        vy: 0.25,
        targetX: canvas.width * 0.8,
        targetY: canvas.height * 0.3,
      },
      {
        x: canvas.width * 0.3,
        y: canvas.height * 0.8,
        radius: Math.max(canvas.width, canvas.height) * 0.7,
        color: 'rgba(220, 38, 38, 0.16)', // Crimson-Red
        vx: 0.18,
        vy: -0.12,
        targetX: canvas.width * 0.3,
        targetY: canvas.height * 0.8,
      },
      {
        x: canvas.width * 0.7,
        y: canvas.height * 0.7,
        radius: Math.max(canvas.width, canvas.height) * 0.65,
        color: 'rgba(124, 58, 237, 0.18)', // Warm Purple
        vx: -0.12,
        vy: -0.18,
        targetX: canvas.width * 0.7,
        targetY: canvas.height * 0.7,
      },
    ];

    let animationFrameId: number;
    let time = 0;

    const draw = () => {
      time += 0.003;

      // Clear with very dark slate backdrop (maintaining dark aesthetic)
      ctx.fillStyle = '#0F0E0E';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse coordinates with inertia
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Enable additive blending for organic color overlaps
      ctx.globalCompositeOperation = 'screen';

      blobs.forEach((blob, index) => {
        // Slow float logic based on time
        const driftX = Math.sin(time + index * 10) * (canvas.width * 0.08);
        const driftY = Math.cos(time + index * 12) * (canvas.height * 0.08);

        // Gentle pull towards cursor coordinates
        const mousePullX = (mouse.x - canvas.width / 2) * (0.05 + index * 0.015);
        const mousePullY = (mouse.y - canvas.height / 2) * (0.05 + index * 0.015);

        blob.x = blob.targetX + driftX + mousePullX;
        blob.y = blob.targetY + driftY + mousePullY;

        // Render blob radial gradient
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'rgba(15, 14, 14, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Static bottom glow to transition seamlessly into the About section's top glow
      const bottomGlow = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height,
        0,
        canvas.width / 2,
        canvas.height,
        Math.max(canvas.width, canvas.height) * 0.5
      );
      bottomGlow.addColorStop(0, 'rgba(255, 80, 30, 0.15)'); // Matching About section top orange-red glow
      bottomGlow.addColorStop(0.3, 'rgba(220, 60, 20, 0.07)');
      bottomGlow.addColorStop(0.6, 'rgba(180, 40, 15, 0.03)');
      bottomGlow.addColorStop(1, 'rgba(15, 14, 14, 0)'); // Fades to transparent edge

      ctx.fillStyle = bottomGlow;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height, Math.max(canvas.width, canvas.height) * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Restore composite operation
      ctx.globalCompositeOperation = 'source-over';

      // Subtle noise texture overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillRect(x, y, 1, 1);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-[11] overflow-hidden pointer-events-none transition-opacity duration-1000 ease-out"
      style={{ opacity: isIntroComplete ? 1 : 0 }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 block w-full h-full"
        style={{ filter: 'blur(30px) saturate(1.2)' }} // blur helps blends canvas low-res boundaries
      />
    </div>
  );
}
