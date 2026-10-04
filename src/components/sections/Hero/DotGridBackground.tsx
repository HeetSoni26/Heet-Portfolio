'use client';

import { useEffect, useRef, useState } from 'react';

export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Setup canvas
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    // Grid configuration
    const dotSize = 1.5;
    const spacing = isMobile ? 20 : 16;
    const defaultOpacity = 0.03;

    // Calculate grid
    const cols = Math.ceil(canvas.width / (window.devicePixelRatio || 1) / spacing);
    const rows = Math.ceil(canvas.height / (window.devicePixelRatio || 1) / spacing);

    // Animation parameters for diagonal sweep
    const animationDuration = 8000; // 8 seconds for one complete sweep
    let startTime = Date.now();

    // Animation loop with automated diagonal sweep
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = (elapsed % animationDuration) / animationDuration;

      // Get canvas dimensions
      const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
      const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dots with diagonal wave glow effect
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing + spacing / 2;
          const y = row * spacing + spacing / 2;

          // Calculate diagonal position of this dot (0 = bottom-left, 1 = top-right)
          const dotDiagonalPos = (x / canvasWidth + (1 - y / canvasHeight)) / 2;

          // Wave parameters - grows from both sides
          const baseWaveWidth = 0.15; // Base width
          const maxWaveWidth = 0.5; // Maximum width when fully expanded
          
          // Calculate wave width that grows as it moves
          // Grows from 0 to max in first 40%, stays at max for 20%, shrinks in last 40%
          let currentWaveWidth;
          if (progress < 0.4) {
            // Growing phase
            currentWaveWidth = baseWaveWidth + (maxWaveWidth - baseWaveWidth) * (progress / 0.4);
          } else if (progress < 0.6) {
            // Peak phase
            currentWaveWidth = maxWaveWidth;
          } else {
            // Shrinking phase
            currentWaveWidth = maxWaveWidth - (maxWaveWidth - baseWaveWidth) * ((progress - 0.6) / 0.4);
          }
          
          // Wave center moves from start to end
          const waveCenter = progress;

          // Calculate distance from wave center
          const distanceFromWave = Math.abs(dotDiagonalPos - waveCenter);

          let glowIntensity = 0;

          // If dot is within wave width, calculate glow
          if (distanceFromWave < currentWaveWidth) {
            // Smooth falloff from center of wave
            const normalizedDistance = distanceFromWave / currentWaveWidth;
            glowIntensity = (1 - Math.pow(normalizedDistance, 3)) * 0.95;
          }

          // Draw dot with glow
          const dotOpacity = defaultOpacity + glowIntensity;
          ctx.fillStyle = `rgba(255, 255, 255, ${dotOpacity})`;
          
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Pause animation when tab is inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      } else {
        startTime = Date.now(); // Reset start time when tab becomes active
        animate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener('resize', setupCanvas);
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
