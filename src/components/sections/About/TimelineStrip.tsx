'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, memo } from 'react';
import { Code2, Briefcase, GraduationCap, Rocket, Award, Brain, Bot, Microscope, Laptop, LucideIcon } from 'lucide-react';

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isCurrent?: boolean;
}

const milestones: Milestone[] = [
  {
    year: '2022',
    title: 'The Curiosity Phase',
    description: 'Discovered the world of web development. Started with HTML, CSS, and JavaScript fundamentals. Built my first static websites and fell in love with creating things for the web.',
    icon: Code2,
  },
  {
    year: '2023',
    title: 'Engineering Foundation',
    description: 'Began pursuing a B.Tech in Artificial Intelligence & Data Science at CVM University. Built a strong foundation in programming, algorithms, databases and machine learning while exploring modern web technologies.',
    icon: GraduationCap,
  },
  {
    year: '2024',
    title: 'Full-Stack Developer',
    description: 'Built modern web applications with React, Next.js, TypeScript and backend technologies. Learned databases, APIs and production-ready development while creating real-world projects.',
    icon: Laptop,
  },
  {
    year: '2025',
    title: 'AI Exploration',
    description: 'Transitioned into Artificial Intelligence through machine learning, computer vision, LLMs and open-source contributions. Started building intelligent software beyond traditional web applications.',
    icon: Brain,
  },
  {
    year: '2026',
    title: 'AI Product Development',
    description: 'Building AI-powered products including OpenBeats, Event Horizon and intelligent automation systems while strengthening expertise in backend engineering and computer vision.',
    icon: Bot,
    isCurrent: true,
  },
  {
    year: '2027',
    title: 'Research & Graduate Journey',
    description: 'Preparing for thesis-based graduate studies, AI research publications and building advanced intelligent systems with real-world impact.',
    icon: Microscope,
  },
];

// Animation Variants
const headerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 350,
      damping: 20,
    }
  }
};

const titleContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    }
  }
};

const wordVariants = {
  hidden: { 
    y: '102%', 
    opacity: 0 
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};

const itemVariants = (isLeft: boolean) => ({
  hidden: { 
    opacity: 0, 
    x: isLeft ? -35 : 35,
    y: 15
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    y: 0,
    transition: { 
      type: 'spring' as const,
      stiffness: 130,
      damping: 18,
      mass: 0.95
    }
  }
});

const markerVariants = {
  hidden: { scale: 0 },
  visible: { 
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 15,
      delay: 0.15
    }
  }
};

// Memoized Timeline Item with premium motion
const TimelineItem = memo(function TimelineItem({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const Icon = milestone.icon;
  const variants = itemVariants(isLeft);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12%" }}
      variants={variants}
      className="relative"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Desktop layout */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:items-center">
        {/* Left content */}
        <div className={`${isLeft ? 'text-right' : 'opacity-0 pointer-events-none'}`}>
          {isLeft && (
            <div className="group cursor-default">
              {/* Year badge */}
              <div className="inline-flex items-center gap-2 mb-2 group-hover:-translate-x-1 transition-transform duration-200">
                <span className="text-xs font-bold tracking-wider text-[#BF5AF2]">
                  {milestone.year}
                </span>
                <div className="w-8 h-[1px] bg-gradient-to-l from-[#BF5AF2] to-transparent" />
              </div>

              {/* Title with icon */}
              <div className="flex items-center justify-end gap-3 mb-2">
                <h4
                  className="text-lg font-bold text-white group-hover:text-[#BF5AF2] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                >
                  {milestone.title}
                </h4>
                <div className="w-9 h-9 rounded-lg bg-[#BF5AF2]/10 border border-[#BF5AF2]/20 flex items-center justify-center group-hover:bg-[#BF5AF2]/20 group-hover:border-[#BF5AF2]/40 transition-all duration-300">
                  <Icon size={18} className="text-[#BF5AF2]" strokeWidth={1.5} />
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-white/50 leading-[1.7] group-hover:text-white/70 transition-colors duration-300">
                {milestone.description}
              </p>
            </div>
          )}
        </div>

        {/* Center - Timeline marker */}
        <div className="relative flex justify-center">
          <motion.div
            variants={markerVariants}
            className="w-3 h-3 rounded-full bg-[#BF5AF2] relative z-10"
            style={{
              boxShadow: '0 0 20px rgba(191, 90, 242, 0.5), 0 0 40px rgba(191, 90, 242, 0.2)',
            }}
          >
            {/* Current pulse */}
            {milestone.isCurrent && (
              <>
                <span className="absolute inset-0 rounded-full bg-[#BF5AF2] timeline-pulse-1" />
                <span className="absolute inset-0 rounded-full bg-[#BF5AF2] timeline-pulse-2" />
              </>
            )}
          </motion.div>
        </div>

        {/* Right content */}
        <div className={`${!isLeft ? 'text-left' : 'opacity-0 pointer-events-none'}`}>
          {!isLeft && (
            <div className="group cursor-default">
              {/* Year badge */}
              <div className="inline-flex items-center gap-2 mb-2 group-hover:translate-x-1 transition-transform duration-200">
                <div className="w-8 h-[1px] bg-gradient-to-r from-[#BF5AF2] to-transparent" />
                <span className="text-xs font-bold tracking-wider text-[#BF5AF2]">
                  {milestone.year}
                </span>
              </div>

              {/* Title with icon */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-[#BF5AF2]/10 border border-[#BF5AF2]/20 flex items-center justify-center group-hover:bg-[#BF5AF2]/20 group-hover:border-[#BF5AF2]/40 transition-all duration-300">
                  <Icon size={18} className="text-[#BF5AF2]" strokeWidth={1.5} />
                </div>
                <h4
                  className="text-lg font-bold text-white group-hover:text-[#BF5AF2] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                >
                  {milestone.title}
                </h4>
              </div>

              {/* Description */}
              <p className="text-sm text-white/50 leading-[1.7] group-hover:text-white/70 transition-colors duration-300">
                {milestone.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden flex gap-4">
        {/* Timeline marker */}
        <div className="relative flex flex-col items-center">
          <motion.div
            variants={markerVariants}
            className="w-2.5 h-2.5 rounded-full bg-[#BF5AF2] relative z-10 flex-shrink-0"
            style={{
              boxShadow: '0 0 15px rgba(191, 90, 242, 0.5)',
            }}
          >
            {milestone.isCurrent && (
              <span className="absolute inset-0 rounded-full bg-[#BF5AF2] timeline-pulse-1" />
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 pb-6 group">
          {/* Year */}
          <span className="text-[11px] font-bold tracking-wider text-[#BF5AF2]">
            {milestone.year}
          </span>

          {/* Title with icon */}
          <div className="flex items-center gap-2.5 mt-1 mb-1.5">
            <div className="w-7 h-7 rounded-md bg-[#BF5AF2]/10 border border-[#BF5AF2]/20 flex items-center justify-center">
              <Icon size={14} className="text-[#BF5AF2]" strokeWidth={1.5} />
            </div>
            <h4
              className="text-base font-bold text-white"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              {milestone.title}
            </h4>
          </div>

          {/* Description */}
          <p className="text-xs text-white/50 leading-[1.6]">
            {milestone.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

export default function TimelineStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 50%'],
  });

  // Direct transform without spring - follows scroll exactly
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const dotY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="my-journey"
      ref={containerRef}
      className="relative py-16 sm:py-20 bg-[#0F0E0E]"
      style={{ contain: 'layout style' }}
    >
      {/* Section Title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={headerContainerVariants}
        className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16 px-4"
      >
        <motion.div
          variants={badgeVariants}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-4 text-[#BF5AF2] text-xs font-semibold tracking-wider uppercase font-outfit"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-[#BF5AF2] flex items-center justify-center text-[#0F0E0E] flex-shrink-0">
            <svg className="w-[50%] h-[50%]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
              <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
            </svg>
          </div>
          <span>The Story So Far</span>
        </motion.div>
        
        <motion.h2
          variants={titleContainerVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.02em] leading-[0.95] text-white flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.05em]"
        >
          {"Growing Into an AI Engineer".split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden py-0.5">
              <motion.span
                variants={wordVariants}
                className="inline-block"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800 }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h2>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto px-6" ref={timelineRef}>
        {/* Desktop: Centered line (static background) */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/[0.06]" />

        {/* Desktop: Animated progress line - direct scroll binding */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 pointer-events-none">
          <motion.div
            className="w-[2px] origin-top will-change-transform"
            style={{
              height: lineHeight,
              background: '#BF5AF2',
              boxShadow: '0 0 10px rgba(191, 90, 242, 0.4)',
            }}
          />
          {/* Moving dot - follows scroll directly */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full will-change-transform"
            style={{
              top: dotY,
              marginTop: '-8px',
              background: '#BF5AF2',
              boxShadow: '0 0 20px rgba(191, 90, 242, 0.8), 0 0 40px rgba(191, 90, 242, 0.4)',
            }}
          >
            <div className="absolute inset-1 rounded-full bg-white/80" />
          </motion.div>
        </div>

        {/* Mobile: Left-aligned line (static background) */}
        <div className="lg:hidden absolute left-[17px] top-0 bottom-0 w-[2px] bg-white/[0.06]" />

        {/* Mobile: Animated progress line */}
        <div className="lg:hidden absolute left-[17px] top-0 bottom-0 pointer-events-none">
          <motion.div
            className="w-[2px] origin-top will-change-transform"
            style={{
              height: lineHeight,
              background: '#BF5AF2',
              boxShadow: '0 0 8px rgba(191, 90, 242, 0.4)',
            }}
          />
          {/* Moving dot */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full will-change-transform"
            style={{
              top: dotY,
              marginTop: '-6px',
              background: '#BF5AF2',
              boxShadow: '0 0 15px rgba(191, 90, 242, 0.8)',
            }}
          >
            <div className="absolute inset-0.5 rounded-full bg-white/80" />
          </motion.div>
        </div>

        {/* Timeline Items */}
        <div className="relative space-y-4 lg:space-y-6">
          {milestones.map((milestone, index) => (
            <TimelineItem
              key={milestone.year}
              milestone={milestone}
              index={index}
            />
          ))}
        </div>

        {/* End marker */}
        <motion.div
          className="flex justify-center lg:justify-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="hidden lg:flex flex-col items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-[#BF5AF2]/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#BF5AF2]/50" />
            </div>
            <span className="text-[10px] text-white/20 uppercase tracking-wider">
              To be continued
            </span>
          </div>
        </motion.div>
      </div>

      {/* CSS for pulse animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .timeline-pulse-1 {
              animation: timeline-pulse 1.5s ease-out infinite;
            }
            .timeline-pulse-2 {
              animation: timeline-pulse 1.5s ease-out infinite 0.3s;
            }
            @keyframes timeline-pulse {
              0% {
                transform: scale(1);
                opacity: 0.5;
              }
              100% {
                transform: scale(2.5);
                opacity: 0;
              }
            }
          `,
        }}
      />
    </section>
  );
}
