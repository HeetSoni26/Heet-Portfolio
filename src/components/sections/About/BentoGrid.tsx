'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowUpRight, Code, Brain, Database, Cpu,
  Github, Linkedin, Instagram, Plus, Layers, LucideIcon
} from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { formatNumber } from '@/lib/visitor-utils';
import { skills } from '@/components/sections/Skills/skills.data';
import { projects } from '@/components/sections/Work/work.data';
import type { IconType } from 'react-icons';
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs,
  SiPython, SiAmazon, SiTensorflow, SiDocker
} from 'react-icons/si';

// Get social URLs safely
const linkedInUrl = SOCIAL_LINKS.find(l => l.name === 'LinkedIn')?.url || '#';
const gitHubUrl = SOCIAL_LINKS.find(l => l.name === 'GitHub')?.url || '#';
const instagramUrl = SOCIAL_LINKS.find(l => l.name === 'Instagram')?.url || '#';

interface ExpertiseItem {
  name: string;
  icon: IconType | LucideIcon;
  color: string;
}

const expertise: ExpertiseItem[] = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'AWS', icon: SiAmazon, color: '#FF9900' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'AI/ML', icon: SiTensorflow, color: '#FF6F00' },
  { name: 'System Design', icon: Layers, color: '#8B5CF6' },
];

import { createContext, useContext } from 'react';

interface BentoGlowContextType {
  mousePosition: { x: number; y: number } | null;
}

const BentoGlowContext = createContext<BentoGlowContextType>({ mousePosition: null });

export const BentoGlowGroup = memo(function BentoGlowGroup({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingPosition = useRef<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    pendingPosition.current = { x: e.clientX, y: e.clientY };
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        if (pendingPosition.current) {
          setMousePosition(pendingPosition.current);
        }
        rafRef.current = null;
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setMousePosition(null);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <BentoGlowContext.Provider value={{ mousePosition }}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </div>
    </BentoGlowContext.Provider>
  );
});

interface BentoGlowCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  glowColor?: string;
  glowSize?: number;
}

const BentoGlowCard = memo(function BentoGlowCard({
  children,
  className = '',
  onClick,
  style = {},
  glowColor = 'rgba(249, 115, 22, 0.75)', // More intense orange glow
  glowSize = 220, // Slightly larger glow radius for proximity search
}: BentoGlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const cachedRect = useRef<DOMRect | null>(null);
  const rectCacheTime = useRef<number>(0);

  const { mousePosition } = useContext(BentoGlowContext);

  const getRect = useCallback(() => {
    const now = Date.now();
    if (!cachedRect.current || now - rectCacheTime.current > 100) {
      cachedRect.current = cardRef.current?.getBoundingClientRect() || null;
      rectCacheTime.current = now;
    }
    return cachedRect.current;
  }, []);

  useEffect(() => {
    if (!cardRef.current || !glowRef.current) return;

    if (!mousePosition) {
      setIsActive(false);
      return;
    }

    const rect = getRect();
    if (!rect) {
      setIsActive(false);
      return;
    }

    // Proximity threshold: glow lights up when mouse is near card boundary
    const proximityThreshold = 100;

    const isNearOrInside =
      mousePosition.x >= rect.left - proximityThreshold &&
      mousePosition.x <= rect.right + proximityThreshold &&
      mousePosition.y >= rect.top - proximityThreshold &&
      mousePosition.y <= rect.bottom + proximityThreshold;

    if (isNearOrInside) {
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;
      glowRef.current.style.setProperty('--glow-x', `${x}px`);
      glowRef.current.style.setProperty('--glow-y', `${y}px`);
      if (!isActive) setIsActive(true);
    } else {
      if (isActive) setIsActive(false);
    }
  }, [mousePosition, getRect, isActive]);

  useEffect(() => {
    const invalidateCache = () => {
      cachedRect.current = null;
    };
    window.addEventListener('scroll', invalidateCache, { passive: true });
    window.addEventListener('resize', invalidateCache, { passive: true });
    return () => {
      window.removeEventListener('scroll', invalidateCache);
      window.removeEventListener('resize', invalidateCache);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[30px] border border-white/[0.04] transition-colors duration-300 about-bento-card ${className}`}
      style={{
        background: 'linear-gradient(180deg, rgba(30, 28, 28, 0.45) 0%, rgba(21, 19, 19, 0.9) 100%)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)',
        ...style
      }}
    >
      {/* Glow border effect - only visible on hover / proximity */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-[30px] pointer-events-none overflow-hidden"
        style={{
          opacity: isActive ? 1 : 0,
          transition: 'opacity 300ms',
          padding: '1px', // Thin border (1px instead of 2px)
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(${glowSize}px circle at var(--glow-x, 0px) var(--glow-y, 0px), ${glowColor}, transparent 45%)`,
          }}
        />
      </div>

      {/* Glossy overlay sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.02] pointer-events-none" />

      {children}
    </motion.div>
  );
});

// Custom CSS styled Bento Card for shared aesthetics
const BentoCard = memo(function BentoCard({
  children,
  className = '',
  onClick,
  showArrow = true,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  showArrow?: boolean;
}) {
  return (
    <BentoGlowCard
      className={`p-4 xs:p-4.5 sm:p-5 flex flex-col justify-between cursor-pointer select-none ${className}`}
      onClick={onClick}
    >
      {/* Content wrapper */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>

      {/* Floating premium bottom-right arrow (circle) */}
      {showArrow && (
        <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/5 bg-neutral-900/60 flex items-center justify-center text-white/30 group-hover:text-white group-hover:bg-neutral-950 group-hover:border-white/15 transition-all duration-300">
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      )}
    </BentoGlowCard>
  );
});

export default function BentoGrid() {
  const router = useRouter();
  const { stats, isLoading } = useVisitorTracking();

  const handleNav = (id: string) => {
    if (id === 'contact') {
      router.push('/contact');
    } else {
      window.dispatchEvent(new CustomEvent('trigger-nav-fade', { detail: { id } }));
    }
  };

  return (
    <BentoGlowGroup className="grid grid-cols-4 gap-4 xs:gap-5 md:gap-6 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 w-full font-jakarta">

      {/* ================= ROW 1: PROFILE & RIGHT SIDE ================= */}

      {/* 1. Profile Card (2 cols, span 2 rows on desktop) */}
      <BentoCard
        className="col-span-4 md:col-span-2 row-span-2 md:h-full justify-between"
        onClick={() => handleNav('about')}
      >
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center sm:justify-between h-full w-full">
          {/* Avatar frame with bright premium blue/indigo glow */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-tl-[30px] rounded-br-[30px] overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#1E4ED8] via-[#3B82F6] to-[#6366F1] shadow-lg">
            <div className="absolute inset-0 bg-[#0c0b0b]/15 pointer-events-none" />
            <Image
              src="/images/profile/profile.jpeg"
              alt="Rameshwar Bhagwat"
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Bio text */}
          <div className="text-center sm:text-left flex flex-col justify-center flex-1">
            <span className="text-[10px] font-mono font-medium tracking-[0.15em] text-white/30 uppercase block mb-1">
              A Full Stack Developer
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-2">
              Rameshwar Bhagwat.
            </h2>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-xs">
              I craft high-performance web applications and AI-driven products with elegant layouts.
            </p>
          </div>
        </div>
      </BentoCard>

      {/* 2. Marquee Ticker Card (2 cols, 1 row) */}
      <BentoGlowCard
        className="col-span-4 md:col-span-2 p-3 sm:p-4 flex items-center cursor-pointer select-none"
      >
        <div className="flex w-full items-center justify-between overflow-hidden relative">
          <div className="flex whitespace-nowrap animate-marquee py-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-[0.1em] text-white/40 uppercase">
            <span>Next.js Expert • Product Builder • AI & ML Integration • SaaS Architect • Next.js Expert • Product Builder • </span>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-full bg-gradient-to-l from-[#171515] to-transparent pointer-events-none" />
        </div>
      </BentoGlowCard>

      {/* 3. Visitor Stats Card (1 col) */}
      <BentoCard
        className="col-span-2 md:col-span-1 justify-between h-36 sm:h-38 md:h-40"
        onClick={() => handleNav('about')}
        showArrow={true}
      >
        <div className="flex flex-col justify-center pt-1.5 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${stats.usingFallback ? 'bg-[#38BDF8]/40' : 'bg-emerald-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${stats.usingFallback ? 'bg-[#38BDF8]' : 'bg-emerald-500'}`}></span>
            </div>
            <span className={`text-[10px] font-mono font-semibold tracking-wider uppercase ${stats.usingFallback ? 'text-[#38BDF8]' : 'text-emerald-400'}`}>
              {stats.usingFallback ? 'System Active' : 'Live Now'}
            </span>
          </div>

          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight font-outfit">
            {isLoading ? (
              <span className="animate-pulse">...</span>
            ) : (
              formatNumber(stats.uniqueVisitors)
            )}
          </div>
        </div>
        <div className="pr-10 pt-1">
          <span className="text-[10px] font-mono font-medium tracking-[0.15em] text-white/30 uppercase block">
            Stats Counter
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
            Profile Visitors
          </h3>
        </div>
      </BentoCard>

      {/* 4. Projects Showcase Card (1 col) */}
      <BentoCard
        className="col-span-2 md:col-span-1 justify-between h-36 sm:h-38 md:h-40"
        onClick={() => handleNav('work')}
      >
        <div className="flex items-center justify-center pt-1.5 flex-1">
          <div className="relative w-28 h-16 sm:w-32 sm:h-18 rounded-xl overflow-hidden border border-white/10 shadow-lg bg-neutral-900/60 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/projects/project3.png"
              alt="Project Showcase"
              fill
              className="object-cover object-top opacity-85 group-hover:opacity-100 transition-all duration-300"
            />
          </div>
        </div>
        <div className="pr-10 pt-1">
          <span className="text-[10px] font-mono font-medium tracking-[0.15em] text-white/30 uppercase block">
            Showcase
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
            Projects
          </h3>
        </div>
      </BentoCard>

      {/* ================= ROW 2: SERVICES, TECH & PROFILES ================= */}

      {/* 5. Tech Stack Card (1 col) */}
      <BentoCard
        className="col-span-2 md:col-span-1 justify-between h-36 sm:h-38 md:h-40 p-4 sm:p-5"
        onClick={() => handleNav('skills')}
        showArrow={false}
      >
        <div className="flex flex-col justify-between h-full w-full">
          <div>
            <span className="text-[10px] font-mono font-medium tracking-[0.15em] text-white/30 uppercase block mb-1.5 text-center">
              Core Expertise
            </span>
            {(() => {
              const renderBadge = (skill: typeof expertise[0]) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300"
                  >
                    <IconComponent className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" style={{ color: skill.color }} />
                    <span className="text-[8px] sm:text-[9px] text-white/60 font-medium font-jakarta">{skill.name}</span>
                  </div>
                );
              };
              return (
                <div className="flex flex-col gap-2.5 sm:gap-3 items-center w-full mt-2">
                  {/* Row 1: Next.js */}
                  <div className="flex justify-center">
                    {renderBadge(expertise[1])}
                  </div>
                  {/* Row 2: React, TypeScript */}
                  <div className="flex justify-center gap-2 sm:gap-2.5">
                    {renderBadge(expertise[0])}
                    {renderBadge(expertise[2])}
                  </div>
                  {/* Row 3: Node.js, Python, Docker */}
                  <div className="flex justify-center gap-2 sm:gap-2.5">
                    {renderBadge(expertise[3])}
                    {renderBadge(expertise[4])}
                    {renderBadge(expertise[6])}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </BentoCard>

      {/* 6. Specialization / Services Card (2 cols) */}
      <BentoCard
        className="col-span-4 md:col-span-2 h-36 sm:h-38 md:h-40"
        onClick={() => handleNav('skills')}
        showArrow={true}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-full w-full pr-8 sm:pr-10">
          {/* Left Title */}
          <div className="flex flex-col justify-center text-left w-full sm:w-auto">
            <span className="text-[9px] sm:text-[10px] font-mono font-medium tracking-[0.15em] text-white/30 uppercase block">
              Specialization
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1 leading-tight">
              Services Offering
            </h3>
          </div>

          {/* Right Services 2x2 grid of small capsules */}
          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto max-w-[280px]">
            {[
              { icon: Code, label: 'Web Apps', color: '#38BDF8' },
              { icon: Brain, label: 'AI Integrations', color: '#FF9F0A' },
              { icon: Database, label: 'Backends', color: '#34D399' },
              { icon: Cpu, label: 'Systems', color: '#A78BFA' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.08] transition-colors duration-300"
                >
                  <Icon className="w-3 h-3 flex-shrink-0" style={{ color: item.color }} />
                  <span className="text-[9px] sm:text-[10px] text-white/70 font-semibold font-jakarta leading-none">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </BentoCard>

      {/* 7. Profiles / Socials Card (1 col) */}
      <BentoCard
        className="col-span-2 md:col-span-1 justify-between h-36 sm:h-38 md:h-40"
        onClick={() => handleNav('contact')}
      >
        <div className="flex items-center justify-center gap-3 pt-1.5 flex-1">
          {[
            { icon: Github, href: gitHubUrl },
            { icon: Linkedin, href: linkedInUrl },
            { icon: Instagram, href: instagramUrl },
          ].map((social, idx) => {
            const Icon = social.icon;
            return (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/5 bg-neutral-900/60 flex items-center justify-center text-white/50 hover:text-white hover:bg-neutral-950 transition-all duration-300"
                style={{
                  boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.02)',
                }}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
        <div className="pr-10">
          <span className="text-[10px] font-mono font-medium tracking-[0.15em] text-white/30 uppercase block">
            Stay with me
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
            Profiles
          </h3>
        </div>
      </BentoCard>

      {/* ================= ROW 3: STATS & CONTACT ================= */}

      {/* 8. Stats Card (2 cols) */}
      <BentoGlowCard
        onClick={() => handleNav('about')}
        className="col-span-4 md:col-span-2 flex flex-col justify-between p-4 sm:p-5 cursor-pointer select-none"
      >
        {/* Row of stats cards (raised) */}
        <div className="flex gap-3 sm:gap-4 w-full h-full pt-1.5">
          {[
            { value: `0${new Date().getFullYear() - 2025}+`, label: 'Years', sublabel: 'Experience' },
            { value: `${skills.length}+`, label: 'Tech Stack', sublabel: 'Skills' },
            { value: `0${projects.length}+`, label: 'Total', sublabel: 'Projects' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col justify-center items-center py-2.5 sm:py-3 rounded-2xl border border-white/[0.02]"
              style={{
                background: 'linear-gradient(180deg, rgba(20, 19, 19, 0.6) 0%, rgba(12, 11, 11, 0.9) 100%)',
                boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.01)',
              }}
            >
              <span className="text-xl sm:text-2xl font-black text-white/90 tracking-tight font-outfit">
                {stat.value}
              </span>
              <span className="text-[9px] font-semibold text-white/20 uppercase tracking-widest mt-1 block">
                {stat.label}
              </span>
              <span className="text-[8px] font-medium text-white/20 uppercase tracking-wider block">
                {stat.sublabel}
              </span>
            </div>
          ))}
        </div>
      </BentoGlowCard>

      {/* 9. Let's Work Together Card (2 cols) */}
      <BentoGlowCard
        onClick={() => handleNav('contact')}
        className="col-span-4 md:col-span-2 p-4 sm:p-5 flex flex-col justify-between cursor-pointer select-none min-h-[120px] md:h-full"
      >
        {/* Star Sparkle Icon top left */}
        <div className="text-white/20 group-hover:text-orange-400 transition-colors duration-300">
          <Plus className="w-5 h-5 animate-pulse" />
        </div>

        {/* Headline */}
        <div className="pr-12 pt-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-[1.05] text-white mb-2 font-jakarta">
            Let&apos;s <br />
            work <span className="font-instrument italic font-normal text-white/90 lowercase pr-1">together.</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/55 leading-relaxed max-w-xs font-jakarta mt-2">
            Have a project in mind? Reach out and let&apos;s craft something exceptional.
          </p>
        </div>

        {/* Floating premium bottom-right arrow (circle) */}
        <div className="absolute bottom-6 right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/5 bg-neutral-900/60 flex items-center justify-center text-white/30 group-hover:text-white group-hover:bg-neutral-950 group-hover:border-white/15 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </BentoGlowCard>

    </BentoGlowGroup>
  );
}
