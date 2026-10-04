'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MatrixRain() {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Event listener to toggle matrix rain
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      const state = customEvent.detail?.active ?? !isActive;
      setIsActive(state);
    };

    window.addEventListener('toggle-matrix-rain', handleToggle);

    return () => {
      window.removeEventListener('toggle-matrix-rain', handleToggle);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    // Suppress scroll when active
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high density displays
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters (Katakana + digits + uppercase English)
    const katakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabet = katakana.split('');

    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize);

    // Array to track current y positions for each column
    const rainDrops: number[] = Array.from({ length: columns }, () => 
      Math.floor(Math.random() * -100) // Start above viewport for staggered start
    );

    let animationFrameId: number;

    const draw = () => {
      // Draw translucent black background to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0'; // Green text
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        // Pick a random character
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        // Draw a brighter character at the head of the drop
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#FFF'; // White head
        } else {
          ctx.fillStyle = '#00ff33'; // Neon green body
        }

        ctx.fillText(text, x, y);

        // Reset drop back to top once it goes past screen height (with randomized delay)
        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }

        rainDrops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Listen to Escape key to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  const handleClose = () => {
    setIsActive(false);
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[99999] bg-black font-mono cursor-none select-none overflow-hidden"
          onClick={handleClose}
        >
          <canvas ref={canvasRef} className="absolute inset-0 block" />

          {/* User instructions */}
          <div className="absolute inset-x-0 bottom-10 flex flex-col items-center justify-center gap-2 pointer-events-none text-center px-4">
            <motion.p
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[#00ff33] text-xs sm:text-sm tracking-[0.2em] font-semibold text-shadow-glow uppercase"
              style={{ textShadow: '0 0 8px rgba(0, 255, 0, 0.8)' }}
            >
              [ Click anywhere or press ESC to exit console sandbox ]
            </motion.p>
            <p className="text-[#00ff33]/40 text-[10px] uppercase tracking-wider">
              Matrix Rain Overlay Mode
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
