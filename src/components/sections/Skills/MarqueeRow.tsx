'use client';

import { Skill } from './skills.data';
import { useState, useEffect, useRef, memo, useMemo } from 'react';

interface MarqueeRowProps {
  skills: Skill[];
  reverse?: boolean;
  speed?: number;
  isPaused?: boolean;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
  onHover: (index: number | null) => void;
  isHovered: boolean;
}

// CSS for pulse animation - injected once
const pulseStyles = `
@keyframes skill-pulse-1 {
  0% { transform: scale(0.8); opacity: 0; }
  50% { opacity: 0.5; }
  100% { transform: scale(1.8); opacity: 0; }
}
@keyframes skill-pulse-2 {
  0% { transform: scale(0.8); opacity: 0.5; }
  50% { opacity: 0.3; }
  100% { transform: scale(1.5); opacity: 0; }
}
`;

// Inject styles once
if (typeof document !== 'undefined') {
  const styleId = 'skill-pulse-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = pulseStyles;
    document.head.appendChild(style);
  }
}

const SkillCard = memo(function SkillCard({ skill, index, onHover, isHovered }: SkillCardProps) {
  const Icon = skill.icon;
  
  // Memoize styles to avoid recreation
  const glowStyle = useMemo(() => ({
    filter: isHovered
      ? `drop-shadow(0 0 4px ${skill.color}90) drop-shadow(0 0 10px ${skill.color}50)`
      : 'none',
    transition: 'filter 0.3s ease',
  }), [isHovered, skill.color]);

  const nameStyle = useMemo(() => ({
    color: isHovered ? skill.color : 'rgba(255,255,255,0.6)',
    textShadow: isHovered ? `0 0 20px ${skill.color}80` : 'none',
    transition: 'color 0.3s ease, text-shadow 0.3s ease',
    fontFamily: 'var(--font-instrument), Georgia, serif',
    fontStyle: 'italic',
    fontWeight: '400',
  }), [isHovered, skill.color]);

  const shadowStyle = useMemo(() => ({
    background: `radial-gradient(ellipse, ${skill.color}60 0%, transparent 70%)`,
    opacity: isHovered ? 0.4 : 0,
    transform: isHovered ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0.5)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  }), [isHovered, skill.color]);

  return (
    <div
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="flex-shrink-0 relative cursor-pointer"
      style={{ 
        width: '80px', 
        minWidth: '80px',
        contain: 'layout style',
      }}
    >
      {/* Main card container */}
      <div
        className="relative flex flex-col items-center justify-center gap-2 p-3"
        style={{
          transform: isHovered ? 'translateY(-12px) scale(1.1)' : 'translateY(0) scale(1)',
          transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Icon container with glow */}
        <div className="relative" style={glowStyle}>
          <Icon
            className="text-4xl sm:text-5xl"
            style={{ 
              color: skill.color,
              transition: 'color 0.3s ease',
            }}
          />
        </div>

        {/* Skill name */}
        <span
          className="text-xs sm:text-sm whitespace-nowrap text-center"
          style={nameStyle}
        >
          {skill.name}
        </span>
      </div>

      {/* Shadow beneath */}
      <div
        className="absolute -bottom-2 left-1/2 w-12 h-2 rounded-full pointer-events-none blur-sm"
        style={shadowStyle}
      />
    </div>
  );
});

export default function MarqueeRow({ skills, reverse = false }: MarqueeRowProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef<number>(0);
  const isPausedRef = useRef(false);
  const isVisibleRef = useRef(true);

  // Memoize doubled skills array
  const displaySkills = useMemo(() => [...skills, ...skills], [skills]);

  // Visibility detection to pause animation when off-screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Initialize offset based on direction
  useEffect(() => {
    if (reverse) {
      const itemWidth = 80 + 32;
      offsetRef.current = -itemWidth * skills.length;
    }
  }, [reverse, skills.length]);

  // Update pause state ref when hover changes
  useEffect(() => {
    isPausedRef.current = hoveredIndex !== null;
  }, [hoveredIndex]);

  // Smooth animation using refs and delta time
  useEffect(() => {
    const itemWidth = 80 + 32;
    const totalWidth = itemWidth * skills.length;
    const speed = 60; // pixels per second (consistent speed)

    const animate = (currentTime: number) => {
      if (!marqueeRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Calculate delta time for consistent speed
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }
      const deltaTime = (currentTime - lastTimeRef.current) / 1000; // Convert to seconds
      lastTimeRef.current = currentTime;

      // Only update if not paused and visible
      if (!isPausedRef.current && isVisibleRef.current) {
        const movement = speed * deltaTime;
        offsetRef.current += reverse ? movement : -movement;

        // Reset position for seamless loop
        if (!reverse && offsetRef.current <= -totalWidth) {
          offsetRef.current = 0;
        } else if (reverse && offsetRef.current >= 0) {
          offsetRef.current = -totalWidth;
        }

        // Apply transform directly to DOM (no React re-render)
        marqueeRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [reverse, skills.length]);

  // Memoize edge gradient styles
  const leftGradientStyle = useMemo(() => ({
    background: 'linear-gradient(to right, #0F0E0E 0%, #0F0E0E 20%, transparent 100%)',
  }), []);

  const rightGradientStyle = useMemo(() => ({
    background: 'linear-gradient(to left, #0F0E0E 0%, #0F0E0E 20%, transparent 100%)',
  }), []);

  return (
    <div 
      className="relative overflow-hidden py-6 sm:py-8 md:py-10" 
      ref={containerRef}
      style={{ contain: 'layout style paint' }}
    >
      {/* Marquee container */}
      <div
        ref={marqueeRef}
        className="flex gap-8"
        style={{
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        {displaySkills.map((skill, index) => (
          <SkillCard
            key={`${skill.name}-${index}`}
            skill={skill}
            index={index}
            onHover={setHoveredIndex}
            isHovered={hoveredIndex === index}
          />
        ))}
      </div>

      {/* Edge fade masks */}
      <div
        className="absolute top-0 bottom-0 left-0 w-20 sm:w-28 md:w-40 pointer-events-none z-20"
        style={leftGradientStyle}
      />
      <div
        className="absolute top-0 bottom-0 right-0 w-20 sm:w-28 md:w-40 pointer-events-none z-20"
        style={rightGradientStyle}
      />
    </div>
  );
}
