'use client';

import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiNodedotjs, 
  SiPython, 
  SiAmazon,
  SiTensorflow,
  SiDocker
} from 'react-icons/si';
import { Layers } from 'lucide-react';

const expertise = [
  // Row 1 - 4 items (top of inverted triangle)
  [
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  ],
  // Row 2 - 3 items (middle of inverted triangle)
  [
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'AWS', icon: SiAmazon, color: '#FF9900' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  ],
  // Row 3 - 2 items (bottom of inverted triangle)
  [
    { name: 'AI/ML', icon: SiTensorflow, color: '#FF6F00' },
    { name: 'System Design', icon: Layers, color: '#8B5CF6' },
  ],
];

export default function AboutStory() {
  return (
    <div className="space-y-3 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Core Expertise Heading */}
      <h4 className="text-sm sm:text-lg font-bold text-center text-primary-gradient">Core Expertise</h4>
      
      {/* Inverted Triangle Layout - 4-3-2 pattern on all screens */}
      <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
        {expertise.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="flex gap-1 sm:gap-3 justify-center w-full max-w-full px-2"
          >
            {row.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex-1 max-w-[70px] sm:max-w-[110px]"
              >
                <skill.icon size={12} style={{ color: skill.color }} className="flex-shrink-0 sm:w-4 sm:h-4" />
                <span className="text-[8px] sm:text-xs font-medium text-white/70 truncate">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
