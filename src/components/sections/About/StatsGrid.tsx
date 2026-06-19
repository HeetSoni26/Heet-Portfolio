'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState, useMemo, memo } from 'react';
import { Briefcase, CheckCircle2, TrendingUp, LucideIcon } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import { projects } from '../Work/work.data';

interface StatItem {
  value: number;
  label: string;
  suffix: string;
  max: number;
  icon: LucideIcon;
  color: string;
}

const stats: StatItem[] = [
  { value: projects.length, label: 'Projects Built', suffix: '+', max: 12, icon: CheckCircle2, color: '#FF6B35' },
  { value: 1, label: 'Years Experience', suffix: '+', max: 5, icon: Briefcase, color: '#3B82F6' },
  { value: 20, label: 'Technologies', suffix: '+', max: 30, icon: TrendingUp, color: '#10B981' },
];

const AnimatedNumber = memo(function AnimatedNumber({ 
  value, 
  suffix = '', 
  isInView 
}: { 
  value: number; 
  suffix?: string; 
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number | null = null;
    const duration = 1500;
    
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(easeOutQuart * value));
      
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isInView, value]);

  return <span>{displayValue}{suffix}</span>;
});

interface CircularProgressProps {
  value: number;
  max: number;
  color: string;
  icon: LucideIcon;
  label: string;
  suffix: string;
  index: number;
}

const CircularProgress = memo(function CircularProgress({ 
  value, 
  max, 
  color, 
  icon: Icon, 
  label, 
  suffix,
  index 
}: CircularProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [startAnimation, setStartAnimation] = useState(false);
  
  // Use a responsive radius - will be set via viewBox scaling
  const radius = 42;
  const strokeWidth = 5;
  const normalizedRadius = radius;
  const center = 50; // viewBox center
  
  // Memoize calculations
  const { circumference, offset } = useMemo(() => {
    const percentage = (value / max) * 100;
    const circ = 2 * Math.PI * normalizedRadius;
    const off = circ - (percentage / 100) * circ;
    return { circumference: circ, offset: off };
  }, [value, max, normalizedRadius]);

  // Trigger ring animation after card animation
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setStartAnimation(true);
      }, 600 + (index * 100));
      return () => clearTimeout(timer);
    }
  }, [isInView, index]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Circular Progress */}
      <div className="relative w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-2 sm:mb-3">
        {/* Background Circle */}
        <svg 
          className="w-full h-full transform -rotate-90" 
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle
            cx={center}
            cy={center}
            r={normalizedRadius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle - Smoother CSS animation */}
          <circle
            cx={center}
            cy={center}
            r={normalizedRadius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={startAnimation ? offset : circumference}
            style={{
              filter: `drop-shadow(0 0 8px ${color}40)`,
              transition: 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: startAnimation ? 'auto' : 'stroke-dashoffset',
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-5 sm:h-5 mb-0.5 sm:mb-1" style={{ color }} aria-hidden="true" />
          <div className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-white">
            <AnimatedNumber value={value} suffix={suffix} isInView={startAnimation} />
          </div>
        </div>
      </div>

      {/* Label */}
      <p className="text-[10px] xs:text-xs sm:text-sm font-semibold text-center text-primary-gradient leading-tight">{label}</p>
    </motion.div>
  );
});

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      {stats.map((stat, index) => (
        <GlowCard
          key={stat.label}
          className="bg-gradient-to-br from-[#1c1c1f]/80 to-[#0e0e10]/80 border border-white/[0.08] rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1.5px_0_0_rgba(255,255,255,0.05)] backdrop-blur-xl"
          glowColor={stat.color}
          glowSize={180}
        >
          <div className="p-2 xs:p-3 sm:p-4 md:p-5">
            <CircularProgress
              value={stat.value}
              max={stat.max}
              color={stat.color}
              icon={stat.icon}
              label={stat.label}
              suffix={stat.suffix}
              index={index}
            />
          </div>
        </GlowCard>
      ))}
    </div>
  );
}
