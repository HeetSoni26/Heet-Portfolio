'use client';

import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
      <span className="text-xs text-muted uppercase tracking-widest">Scroll</span>
      <div className="w-[1px] h-16 bg-gradient-to-b from-muted to-transparent relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-primary to-transparent"
          animate={{
            y: [0, 32, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
}
