'use client';

import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { achievements } from './achievements.data';

interface AchievementsMarqueeProps {
  reverse?: boolean;
}

// Memoized achievement card to prevent unnecessary re-renders
const AchievementCard = memo(function AchievementCard({ 
  achievement, 
  index, 
  onHover, 
  onLeave 
}: { 
  achievement: typeof achievements[0];
  index: number;
  onHover: (index: number) => void;
  onLeave: () => void;
}) {
  const Icon = achievement.icon;
  
  return (
    <motion.div
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      className="flex-shrink-0 relative group"
      style={{ width: '150px' }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] overflow-hidden transition-all duration-300 group-hover:border-white/[0.12] group-hover:bg-white/[0.04]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 relative">
          <div className="p-1 xs:p-1.5 sm:p-2 rounded-md xs:rounded-lg bg-white/[0.03]">
            <Icon className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-white/70" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] xs:text-[10px] sm:text-xs font-medium text-white/90 truncate">
              {achievement.title}
            </p>
            <p className="text-[7px] xs:text-[8px] sm:text-[10px] text-white/50 truncate">
              {achievement.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

function AchievementsMarquee({ reverse = false }: AchievementsMarqueeProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const isVisibleRef = useRef(true);
  const lastTimeRef = useRef(0);
  
  const [offset, setOffset] = useState(() => {
    if (reverse) {
      const cardWidth = 150 + 12;
      return -cardWidth * achievements.length;
    }
    return 0;
  });

  const handleHover = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  useEffect(() => {
    // Visibility detection
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (hoveredIndex !== null) return;

    const targetFPS = 30; // Throttle to 30 FPS for smoother performance
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      // Skip if not visible
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // FPS throttling
      const elapsed = currentTime - lastTimeRef.current;
      if (elapsed < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = currentTime - (elapsed % frameInterval);

      setOffset((prev) => {
        const cardWidth = 150 + 12;
        const totalWidth = cardWidth * achievements.length;
        const newOffset = prev + (reverse ? 0.8 : -0.8);
        
        if (!reverse && newOffset <= -totalWidth) {
          return 0;
        } else if (reverse && newOffset >= 0) {
          return -totalWidth;
        }
        
        return newOffset;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hoveredIndex, reverse]);

  const displayAchievements = [...achievements, ...achievements];

  return (
    <div className="relative overflow-hidden py-3 sm:py-4 w-full max-w-full" ref={containerRef}>
      <div
        className="flex gap-3 sm:gap-5 will-change-transform"
        style={{ 
          transform: `translateX(${offset}px)`,
        }}
      >
        {displayAchievements.map((achievement, index) => (
          <AchievementCard
            key={`${achievement.id}-${index}`}
            achievement={achievement}
            index={index}
            onHover={handleHover}
            onLeave={handleLeave}
          />
        ))}
      </div>

      {/* Edge fade masks */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0F0E0E] to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0F0E0E] to-transparent pointer-events-none z-20" />
    </div>
  );
}

export default memo(AchievementsMarquee);
