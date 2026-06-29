'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiTypescript,
  SiOpenai, SiPostgresql, SiPrisma
} from 'react-icons/si';
import GlowCard, { GlowCardGroup } from '@/components/ui/GlowCard';

// --- Asterisk Circular Accent Badge ---
function AsteriskBadge({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <div className={`rounded-full bg-[#C2EF3A] flex items-center justify-center text-[#0F0E0E] flex-shrink-0 ${className}`}>
      <svg className="w-[50%] h-[50%]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
      </svg>
    </div>
  );
}

// --- Growth Bar Chart Component ---
function ActivityBarChart() {
  const bars = [
    { height: 35 }, { height: 50 }, { height: 40 }, { height: 65 }, 
    { height: 55 }, { height: 80 }, { height: 70 }, { height: 90 }, 
    { height: 60 }, { height: 75 }, { height: 50 }, { height: 85 }
  ];

  return (
    <div className="relative w-full h-24 bg-[#0E0D0D] border border-white/[0.03] rounded-2xl p-4 flex flex-col justify-between overflow-hidden shadow-inner mb-4">
      {/* Growth title */}
      <div className="flex justify-between items-center z-10">
        <span className="text-[9px] uppercase tracking-wider text-white/40 font-semibold font-mono">Growth</span>
      </div>

      {/* Bars container */}
      <div className="flex justify-between items-end h-10 w-full gap-1 mt-1 select-none relative z-10 px-0.5">
        {bars.map((bar, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <div className="w-full bg-[#1C1A1A] rounded-full h-full overflow-hidden flex items-end">
              <motion.div 
                className="w-full bg-gradient-to-t from-[#C2EF3A]/40 to-[#C2EF3A] rounded-full"
                initial={{ height: 0 }}
                whileInView={{ height: `${bar.height}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.03, ease: "easeOut" }}
                style={{ filter: 'drop-shadow(0 0 3px rgba(194, 239, 58, 0.3))' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Date labels at bottom */}
      <div className="flex justify-between items-center text-[8px] font-semibold text-white/20 uppercase tracking-widest px-0.5 relative z-10">
        <span>Nov 10</span>
        <span>Nov 11</span>
        <span>Today</span>
      </div>
    </div>
  );
}

// --- Dynamic Notification Island Component ---
function NotificationIsland() {
  return (
    <div className="relative w-full h-24 bg-[#0E0D0D] border border-white/[0.03] rounded-2xl flex items-center justify-center overflow-hidden shadow-inner mb-4">
      {/* Background wireframe lines */}
      <div className="absolute inset-0 flex flex-col justify-around py-4 opacity-5 pointer-events-none">
        <div className="w-full h-[1px] border-b border-dashed border-white" />
        <div className="w-full h-[1px] border-b border-dashed border-white" />
      </div>

      {/* Pill Notification */}
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative z-10 w-[85%] max-w-[210px] bg-[#121111] border border-white/[0.06] rounded-2xl p-2.5 flex items-center gap-2.5 shadow-lg"
      >
        {/* Cloud/Wind circle badge */}
        <div className="w-8 h-8 rounded-full bg-[#C2EF3A]/10 border border-[#C2EF3A]/20 flex items-center justify-center text-[#C2EF3A] flex-shrink-0">
          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42-1.89-1.74-3.5-3.5-3.5a5.5 5.5 0 0 0-5.5 5.5c-1.39 0-3 1.11-3 3.5A3.5 3.5 0 0 0 7.5 19z" />
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C2EF3A] animate-pulse" />
            <span className="text-[8px] font-bold text-[#C2EF3A] tracking-wider uppercase">INGEST</span>
          </div>
          <p className="text-[10px] font-black text-white/90 truncate leading-tight mt-0.5">Safecoast Sync</p>
          <span className="text-[8px] text-white/40 block mt-0.5 leading-none">OpenWeather API • Just now</span>
        </div>
      </motion.div>
    </div>
  );
}

// --- Scalable Line Chart Component ---
function SmoothLineChart() {
  return (
    <div className="relative w-full h-24 bg-[#0E0D0D] border border-white/[0.03] rounded-2xl overflow-hidden p-4 flex flex-col justify-between shadow-inner mb-4">
      {/* Grid lines background */}
      <div className="absolute inset-0 flex justify-between px-6 pointer-events-none opacity-[0.02]">
        <div className="w-[1px] h-full bg-white border-dashed border-l border-white" />
        <div className="w-[1px] h-full bg-white border-dashed border-l border-white" />
        <div className="w-[1px] h-full bg-white border-dashed border-l border-white" />
        <div className="w-[1px] h-full bg-white border-dashed border-l border-white" />
      </div>

      {/* SVG graph */}
      <div className="absolute inset-0 z-10 pt-8 pb-3 px-1">
        <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C2EF3A" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#C2EF3A" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area fill */}
          <motion.path
            d="M 0 50 L 0 45 L 20 40 L 40 32 L 60 20 L 80 12 L 100 5 L 100 50 Z"
            fill="url(#lineAreaGrad)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />

          {/* Line path */}
          <motion.path
            d="M 0 45 L 20 40 L 40 32 L 60 20 L 80 12 L 100 5"
            fill="none"
            stroke="#C2EF3A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>

        {/* Pulsing indicator dot at peak */}
        <div className="absolute top-2.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C2EF3A] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C2EF3A] shadow-[0_0_8px_rgba(194,239,58,0.8)]"></span>
        </div>
      </div>

      <div className="flex justify-between items-center z-20">
        <span className="text-[9px] uppercase tracking-wider text-white/40 font-semibold font-mono">Performance</span>
      </div>
    </div>
  );
}

// --- Tool Badges Cluster Component ---
function ToolBadgeCloud() {
  const tools = [
    { icon: SiNextdotjs, color: '#FFFFFF', top: '10%', left: '10%' },
    { icon: SiReact, color: '#61DAFB', top: '5%', left: '42%' },
    { icon: SiTypescript, color: '#3178C6', top: '15%', left: '72%' },
    { icon: SiOpenai, color: '#10A37F', top: '50%', left: '15%' },
    { icon: SiPostgresql, color: '#4169E1', top: '60%', left: '48%' },
    { icon: SiPrisma, color: '#5A67D8', top: '45%', left: '78%' },
  ];

  return (
    <div className="relative w-44 h-24 flex-shrink-0 select-none mt-2 md:mt-0">
      <div className="absolute inset-0 bg-[#C2EF3A]/5 blur-2xl rounded-full pointer-events-none" />

      {tools.map((tool, idx) => {
        const IconComponent = tool.icon;
        return (
          <motion.div
            key={idx}
            className="absolute w-9 h-9 rounded-full border border-white/5 bg-[#171616] flex items-center justify-center shadow-lg hover:border-white/15 hover:scale-110 transition-all duration-300"
            style={{ 
              top: tool.top, 
              left: tool.left,
              boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.02)'
            }}
          >
            <IconComponent className="w-4.5 h-4.5" style={{ color: tool.color }} />
          </motion.div>
        );
      })}
    </div>
  );
}

// --- Study Tracker Visual Component ---
function TrackerVisual() {
  return (
    <div className="relative w-44 h-24 flex-shrink-0 flex items-center justify-between select-none mt-2 md:mt-0 bg-[#0E0D0D] border border-white/[0.03] rounded-2xl p-3 shadow-inner">
      {/* Task list mockup */}
      <div className="flex flex-col gap-1.5 justify-center flex-1 pr-1.5">
        <div className="flex items-center gap-1.5 bg-white/[0.01] border border-white/[0.03] rounded-md px-1.5 py-0.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C2EF3A]/20 border border-[#C2EF3A] flex items-center justify-center text-[7px] text-[#C2EF3A] font-bold">✓</span>
          <span className="text-[8px] text-white/60 font-mono tracking-tight truncate">RLS Policy Setup</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/[0.01] border border-white/[0.03] rounded-md px-1.5 py-0.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C2EF3A]/20 border border-[#C2EF3A] flex items-center justify-center text-[7px] text-[#C2EF3A] font-bold">✓</span>
          <span className="text-[8px] text-white/60 font-mono tracking-tight truncate">Supabase DB Sync</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/[0.01] border border-white/[0.03] rounded-md px-1.5 py-0.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C2EF3A]/10 border border-[#C2EF3A]/20 flex items-center justify-center text-[8px] text-[#C2EF3A] font-bold animate-pulse">•</span>
          <span className="text-[8px] text-white/40 font-mono tracking-tight truncate">Peer Review...</span>
        </div>
      </div>

      {/* Progress ring mockup */}
      <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0 ml-1.5">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="28"
            cy="28"
            r="22"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="3.5"
            fill="transparent"
          />
          <motion.circle
            cx="28"
            cy="28"
            r="22"
            stroke="#C2EF3A"
            strokeWidth="3.5"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 22}
            initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
            whileInView={{ strokeDashoffset: (2 * Math.PI * 22) * (1 - 0.85) }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[9px] font-mono font-bold text-white">85%</span>
      </div>
    </div>
  );
}

export default function ActivityMetrics() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await fetch('/api/visitors');
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.uniqueVisitors === 'number') {
            setVisitorCount(data.uniqueVisitors);
          }
        }
      } catch (err) {
        console.error('Failed to fetch visitors stats:', err);
      }
    };
    fetchVisitors();
  }, []);

  const serviceTags = [
    'WebCraft SaaS', 'Devory AI Platform', 'Safecoast Intelligence', 
    'AI/ML Progress Tracker', 'Next.js & React', 'Supabase Integration', 
    'Geospatial Dashboards', 'Relational DB Architecture'
  ];

  return (
    <section 
      id="activity" 
      className="relative z-20 py-16 sm:py-20 md:py-24 bg-[#0F0E0E] overflow-hidden"
      aria-label="Activity Metrics Section"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-20">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-4 text-[#C2EF3A] text-xs font-semibold tracking-wider uppercase font-outfit"
          >
            <AsteriskBadge className="w-3 h-3" />
            <span>My Workflow & Values</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-white max-w-2xl mx-auto font-jakarta"
          >
            Engineering robust products designed for business growth.
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <GlowCardGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
          
          {/* CARD 1: Cost Effective Solution */}
          <GlowCard
            className="border border-white/[0.04] rounded-[24px] overflow-hidden hover:border-white/[0.08]"
            glowColor="rgba(194, 239, 58, 0.15)"
            glowSize={250}
            borderRadius="24px"
            maskBackground="rgba(19, 18, 18, 0.95)"
          >
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="p-5 flex flex-col justify-between h-full w-full relative z-10"
            >
              <ActivityBarChart />
              <div>
                <span className="text-[9px] font-mono font-bold tracking-[0.15em] text-white/30 uppercase block mb-1">
                  SaaS Build
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug font-jakarta">
                  Cost-effective development
                </h3>
                <p className="text-[11px] text-white/50 mt-1 leading-relaxed font-jakarta">
                  Optimized web builders and e-commerce platforms serving {visitorCount > 0 ? `${visitorCount.toLocaleString()}+` : '4,850+'} visitors.
                </p>
              </div>
            </motion.div>
          </GlowCard>

          {/* CARD 2: Tailor-Made Design */}
          <GlowCard
            className="border border-white/[0.04] rounded-[24px] overflow-hidden hover:border-white/[0.08]"
            glowColor="rgba(194, 239, 58, 0.15)"
            glowSize={250}
            borderRadius="24px"
            maskBackground="rgba(19, 18, 18, 0.95)"
          >
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="p-5 flex flex-col justify-between h-full w-full relative z-10"
            >
              <NotificationIsland />
              <div>
                <span className="text-[9px] font-mono font-bold tracking-[0.15em] text-white/30 uppercase block mb-1">
                  Custom Logic
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug font-jakarta">
                  Tailor-made systems
                </h3>
                <p className="text-[11px] text-white/50 mt-1 leading-relaxed font-jakarta">
                  Coastal modeling tools and transaction-safe DBMS engines.
                </p>
              </div>
            </motion.div>
          </GlowCard>

          {/* CARD 3: Scalable As You Grow */}
          <GlowCard
            className="border border-white/[0.04] rounded-[24px] overflow-hidden hover:border-white/[0.08]"
            glowColor="rgba(194, 239, 58, 0.15)"
            glowSize={250}
            borderRadius="24px"
            maskBackground="rgba(19, 18, 18, 0.95)"
          >
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="p-5 flex flex-col justify-between h-full w-full relative z-10"
            >
              <SmoothLineChart />
              <div>
                <span className="text-[9px] font-mono font-bold tracking-[0.15em] text-white/30 uppercase block mb-1">
                  Performance
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug font-jakarta">
                  Scalable SaaS backend
                </h3>
                <p className="text-[11px] text-white/50 mt-1 leading-relaxed font-jakarta">
                  Serverless edge hosting maintaining sub-12ms queries under heavy load.
                </p>
              </div>
            </motion.div>
          </GlowCard>

        </GlowCardGroup>

        {/* Row 2: Wide Cards */}
        <GlowCardGroup className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-5xl mx-auto mb-10">

          {/* CARD 4: Workflow Integration (spans 2 cols) */}
          <GlowCard
            className="border border-white/[0.04] rounded-[24px] overflow-hidden hover:border-white/[0.08] md:col-span-2"
            glowColor="rgba(194, 239, 58, 0.15)"
            glowSize={300}
            borderRadius="24px"
            maskBackground="rgba(19, 18, 18, 0.95)"
          >
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 h-full w-full relative z-10"
            >
              <div className="flex-1 min-w-0 pr-2">
                <span className="text-[9px] font-mono font-bold tracking-[0.15em] text-white/30 uppercase block mb-1">
                  AI Integration
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug font-jakarta">
                  AI roadmap workflows
                </h3>
                <p className="text-[11px] text-white/50 mt-1 leading-relaxed font-jakarta">
                  OpenAI roadmaps and structured project mentoring in Devory.
                </p>
              </div>
              <ToolBadgeCloud />
            </motion.div>
          </GlowCard>

          {/* CARD 5: Collaborate Real-Time (spans 3 cols) */}
          <GlowCard
            className="border border-white/[0.04] rounded-[24px] overflow-hidden hover:border-white/[0.08] md:col-span-3"
            glowColor="rgba(194, 239, 58, 0.15)"
            glowSize={300}
            borderRadius="24px"
            maskBackground="rgba(19, 18, 18, 0.95)"
          >
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 h-full w-full relative z-10"
            >
              <div className="flex-1 min-w-0 pr-2">
                <span className="text-[9px] font-mono font-bold tracking-[0.15em] text-white/30 uppercase block mb-1">
                  Collaboration
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug font-jakarta">
                  Real-time study tracker
                </h3>
                <p className="text-[11px] text-white/50 mt-1 leading-relaxed font-jakarta">
                  Supabase progress dashboards with real-time peer synchronization.
                </p>
              </div>
              <TrackerVisual />
            </motion.div>
          </GlowCard>

        </GlowCardGroup>

        {/* Bottom Tag Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2.5 justify-center max-w-4xl mx-auto"
        >
          {serviceTags.map((tag, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] text-xs text-white/70 tracking-wide font-medium transition-all duration-300 select-none cursor-default"
            >
              <AsteriskBadge className="w-3.5 h-3.5" />
              <span>{tag}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
