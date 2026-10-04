'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Skill {
  icon: ReactNode;
  name: string;
}

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="p-4 rounded-lg border text-center">
      <div className="text-2xl mb-2">{skill.icon}</div>
      <motion.div
        className="text-base sm:text-lg"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.3) 100%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
          fontFamily: 'var(--font-instrument), Georgia, serif',
          fontStyle: 'italic',
          fontWeight: '400',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '200% 0%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {skill.name}
      </motion.div>
    </div>
  );
}
