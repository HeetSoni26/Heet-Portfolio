'use client';

import { useEffect, useState, useRef, useMemo, memo } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Activity, TrendingUp, Clock, ArrowUpRight } from 'lucide-react';
import { 
  activityRings, 
  weeklyFocusData, 
  weeklyTrafficData, 
  otherMetrics 
} from './activity.data';
import { projects } from '../Work/work.data';

// --- Count Up Numeric Component ---
const CountUpNumber = memo(function CountUpNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 70,
    damping: 22,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{displayValue.toLocaleString()}{suffix}</span>;
});

// --- SVG Activity Rings Component ---
function ActivityRings({ projectsPct, commitsPct, hoursPct }: { projectsPct: number; commitsPct: number; hoursPct: number }) {
  const c1 = 2 * Math.PI * 60; // ~377 (radius 60)
  const c2 = 2 * Math.PI * 46; // ~289 (radius 46)
  const c3 = 2 * Math.PI * 32; // ~201 (radius 32)

  return (
    <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center select-none flex-shrink-0">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
        {/* Ring 1 (Red / Projects Shipped) */}
        <circle cx="80" cy="80" r="60" stroke="rgba(255, 45, 85, 0.08)" fill="none" strokeWidth="12" />
        <motion.circle 
          cx="80" 
          cy="80" 
          r="60" 
          stroke="#FF2D55" 
          fill="none" 
          strokeWidth="12" 
          strokeLinecap="round"
          initial={{ strokeDasharray: c1, strokeDashoffset: c1 }}
          whileInView={{ strokeDashoffset: c1 - (c1 * Math.min(projectsPct, 99.9)) / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Ring 2 (Green / GitHub Commits) */}
        <circle cx="80" cy="80" r="46" stroke="rgba(48, 209, 88, 0.08)" fill="none" strokeWidth="12" />
        <motion.circle 
          cx="80" 
          cy="80" 
          r="46" 
          stroke="#30D158" 
          fill="none" 
          strokeWidth="12" 
          strokeLinecap="round"
          initial={{ strokeDasharray: c2, strokeDashoffset: c2 }}
          whileInView={{ strokeDashoffset: c2 - (c2 * Math.min(commitsPct, 99.9)) / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Ring 3 (Blue / Weekly Focus) */}
        <circle cx="80" cy="80" r="32" stroke="rgba(10, 132, 255, 0.08)" fill="none" strokeWidth="12" />
        <motion.circle 
          cx="80" 
          cy="80" 
          r="32" 
          stroke="#0A84FF" 
          fill="none" 
          strokeWidth="12" 
          strokeLinecap="round"
          initial={{ strokeDasharray: c3, strokeDashoffset: c3 }}
          whileInView={{ strokeDashoffset: c3 - (c3 * Math.min(hoursPct, 99.9)) / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      
      {/* Dynamic central indicator */}
      <div className="absolute flex flex-col items-center justify-center">
        <Activity size={18} className="text-white/20 animate-pulse" />
      </div>
    </div>
  );
}

// --- Dynamic Traffic Bar Graph ---
function TrafficBarChart({ data }: { data: { day: string; value: number }[] }) {
  const values = useMemo(() => data.map(d => d.value), [data]);
  const max = useMemo(() => Math.max(...values), [values]);
  const min = useMemo(() => Math.min(...values), [values]);
  const range = max - min || 1;

  return (
    <div className="flex justify-between items-end h-16 w-full gap-2.5 mt-4 select-none px-1">
      {data.map((item, idx) => {
        const heightPct = ((item.value - min) / range) * 70 + 30; // Min 30% for visibility
        return (
          <div key={idx} className="flex-1 flex flex-col items-center gap-1 group/bar">
            {/* Bar container */}
            <div className="w-full bg-white/[0.04] border border-white/[0.03] rounded-t-md h-12 relative overflow-hidden flex items-end">
              <motion.div 
                className="w-full bg-gradient-to-t from-[#30D158]/30 to-[#30D158] rounded-t-sm"
                initial={{ height: 0 }}
                whileInView={{ height: `${heightPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.05, ease: "easeOut" }}
              />
            </div>
            {/* Day label */}
            <span className="text-[9px] text-white/30 font-semibold font-outfit uppercase">
              {item.day}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// --- Animated Sparkline Line Graph ---
function FocusSparkline({ data }: { data: { day: string; value: number }[] }) {
  const values = useMemo(() => data.map(d => d.value), [data]);
  const max = useMemo(() => Math.max(...values), [values]);
  const min = useMemo(() => Math.min(...values), [values]);
  const range = max - min || 1;

  // Map 7 data values to SVG viewBox coordinates (100w x 80h)
  const points = useMemo(() => {
    return data.map((item, idx) => {
      const x = (idx / (data.length - 1)) * 100;
      const y = 65 - ((item.value - min) / range) * 50; // Inverted Y axis with padding
      return `${x},${y}`;
    }).join(' ');
  }, [data, min, range]);

  return (
    <div className="w-full h-16 mt-4 relative">
      <svg className="w-full h-full" viewBox="0 0 100 70" preserveAspectRatio="none">
        {/* Draw subtle guidelines */}
        <line x1="0" y1="15" x2="100" y2="15" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        <line x1="0" y1="65" x2="100" y2="65" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

        {/* Drawn sparkline path */}
        <motion.polyline
          fill="none"
          stroke="url(#focusSparklineGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Gradient specs */}
        <defs>
          <linearGradient id="focusSparklineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0A84FF" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// --- Caffeine Mug Liquid Fill ---
function CaffeineLogGauge() {
  return (
    <div className="relative w-14 h-14 bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden flex items-center justify-center">
      {/* Animated fluid background */}
      <svg className="absolute bottom-0 w-full h-[65%]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path 
          d="M0,50 Q25,35 50,50 T100,50 L100,100 L0,100 Z" 
          fill="rgba(249, 115, 22, 0.45)" // Coffee orange-tint
          animate={{
            d: [
              "M0,50 Q25,35 50,50 T100,50 L100,100 L0,100 Z",
              "M0,50 Q25,65 50,50 T100,50 L100,100 L0,100 Z",
              "M0,50 Q25,35 50,50 T100,50 L100,100 L0,100 Z"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.path 
          d="M0,55 Q35,45 70,55 T100,55 L100,100 L0,100 Z" 
          fill="rgba(236, 72, 153, 0.3)" // Secondary blending pink
          animate={{
            d: [
              "M0,55 Q35,45 70,55 T100,55 L100,100 L0,100 Z",
              "M0,55 Q35,65 70,55 T100,55 L100,100 L0,100 Z",
              "M0,55 Q35,45 70,55 T100,55 L100,100 L0,100 Z"
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </svg>
      {/* Cup icon emoji */}
      <span className="relative z-10 text-xl font-bold select-none filter drop-shadow">☕</span>
    </div>
  );
}

// --- Main Activity Metrics Section ---
export default function ActivityMetrics() {
  const pMetric = activityRings[0];
  const cMetric = activityRings[1];
  const hMetric = activityRings[2];

  // Dynamic state hooks for live activity values
  const [projectCount] = useState(projects.length);
  const [commitsGoalCount, setCommitsGoalCount] = useState(cMetric.value);
  const [visitorCount, setVisitorCount] = useState(otherMetrics.visitorStats.value);
  const [yearlyCommits, setYearlyCommits] = useState(otherMetrics.commitsThisYear.value);

  // Fetch live stats on mount
  useEffect(() => {
    // 1. Fetch live page visits
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

    // 2. Fetch live GitHub contributions
    const fetchContributions = async () => {
      try {
        const res = await fetch('/api/github-contributions');
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.totalContributions === 'number') {
            setYearlyCommits(data.totalContributions);

            // Sum commits in the last 30 days for this month's commits ring
            if (Array.isArray(data.weeks)) {
              let recentCommits = 0;
              const thirtyDaysAgo = new Date();
              thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

              for (const week of data.weeks) {
                if (Array.isArray(week.contributionDays)) {
                  for (const day of week.contributionDays) {
                    const dayDate = new Date(day.date);
                    if (dayDate >= thirtyDaysAgo) {
                      recentCommits += day.contributionCount;
                    }
                  }
                }
              }
              if (recentCommits > 0) {
                setCommitsGoalCount(recentCommits);
              }
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch contributions stats:', err);
      }
    };

    fetchVisitors();
    fetchContributions();
  }, []);

  const projectsPct = (projectCount / pMetric.target) * 100;
  const commitsPct = (commitsGoalCount / cMetric.target) * 100;
  const hoursPct = (hMetric.value / hMetric.target) * 100;

  return (
    <section 
      id="activity" 
      className="relative py-16 sm:py-20 md:py-28 lg:py-32"
      aria-label="Activity Metrics Stats Dashboard"
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      {/* Background radial accent glow */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none select-none"
        style={{
          background: 'radial-gradient(circle at 80% 80%, rgba(255, 45, 85, 0.05) 0%, transparent 60%), radial-gradient(circle at 20% 20%, rgba(10, 132, 255, 0.05) 0%, transparent 60%)'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3 font-outfit"
            style={{
              background: 'linear-gradient(90deg, #FF2D55, #0A84FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Metrics
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.02em] mb-4 sm:mb-5 font-outfit text-white"
          >
            Activity <span className="text-rainbow-gradient">Dashboard</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base text-white/50 leading-relaxed font-outfit max-w-xl mx-auto"
          >
            An interactive display of my development activity logs, code contributions, and execution statistics.
          </motion.p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* CARD 1: Concordive Rings (2x column width on larger screens) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden bg-[#161619]/70 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-[28px] p-6 sm:p-8 md:col-span-2 flex flex-col sm:flex-row items-center gap-8 transition-colors duration-300"
          >
            {/* Ambient subtle glow backplate */}
            <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10 bg-gradient-to-r from-red-500/5 via-green-500/5 to-blue-500/5" />

            <ActivityRings 
              projectsPct={projectsPct} 
              commitsPct={commitsPct} 
              hoursPct={hoursPct} 
            />

            {/* Legends list */}
            <div className="flex-1 space-y-4 w-full">
              <h3 className="text-xs uppercase tracking-widest text-white/40 font-bold font-outfit mb-2">
                Activity Ring Log
              </h3>
              
              {/* Ring Item 1 */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF2D55] flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-xs sm:text-sm font-semibold text-white/90 font-outfit">{pMetric.name}</span>
                    <span className="block text-[10px] text-white/40 font-outfit truncate max-w-[180px] sm:max-w-none">{pMetric.description}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-bold text-white font-outfit">
                    <CountUpNumber value={projectCount} /> / {pMetric.target}
                  </span>
                  <span className="block text-[9px] text-[#FF2D55] font-bold font-outfit">{Math.round(projectsPct)}% Complete</span>
                </div>
              </div>

              {/* Ring Item 2 */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#30D158] flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-xs sm:text-sm font-semibold text-white/90 font-outfit">{cMetric.name}</span>
                    <span className="block text-[10px] text-white/40 font-outfit truncate max-w-[180px] sm:max-w-none">{cMetric.description}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-bold text-white font-outfit">
                    <CountUpNumber value={commitsGoalCount} /> / {cMetric.target}
                  </span>
                  <span className="block text-[9px] text-[#30D158] font-bold font-outfit">{Math.round(commitsPct)}% Complete</span>
                </div>
              </div>

              {/* Ring Item 3 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#0A84FF] flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-xs sm:text-sm font-semibold text-white/90 font-outfit">{hMetric.name}</span>
                    <span className="block text-[10px] text-white/40 font-outfit truncate max-w-[180px] sm:max-w-none">{hMetric.description}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-bold text-white font-outfit">
                    <CountUpNumber value={hMetric.value} /> / {hMetric.target} {hMetric.unit}
                  </span>
                  <span className="block text-[9px] text-[#0A84FF] font-bold font-outfit">{Math.round(hoursPct)}% Complete</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARD 2: Visitor stats (Green, bar graph) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative overflow-hidden bg-[#161619]/70 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-[28px] p-6 transition-colors duration-300 flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10 bg-gradient-to-r from-green-500/5 to-transparent" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-widest text-[#30D158] font-bold font-outfit">
                  Unique Visits
                </span>
                <TrendingUp size={16} className="text-[#30D158]" />
              </div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight font-outfit">
                <CountUpNumber value={visitorCount} suffix="+" />
              </h3>
              <p className="text-[11px] text-white/40 mt-1 leading-normal font-outfit">
                {otherMetrics.visitorStats.description}
              </p>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 mt-2 rounded-full bg-[#30D158]/10 text-[#30D158] text-[10px] font-bold font-outfit">
                <span>+12.4% this week</span>
              </div>
            </div>
            
            {/* Dynamic Graph */}
            <TrafficBarChart data={weeklyTrafficData} />
          </motion.div>

          {/* CARD 3: Focus Hours logged (Blue, sparkline) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group relative overflow-hidden bg-[#161619]/70 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-[28px] p-6 transition-colors duration-300 flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10 bg-gradient-to-r from-blue-500/5 to-transparent" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-widest text-[#0A84FF] font-bold font-outfit">
                  Focus Logged
                </span>
                <Clock size={16} className="text-[#0A84FF]" />
              </div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight font-outfit">
                <CountUpNumber value={otherMetrics.focusHoursTotal.value} /> <span className="text-sm font-semibold text-white/40 font-outfit">hrs</span>
              </h3>
              <p className="text-[11px] text-white/40 mt-1 leading-normal font-outfit">
                {otherMetrics.focusHoursTotal.description}
              </p>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 mt-2 rounded-full bg-[#0A84FF]/10 text-[#0A84FF] text-[10px] font-bold font-outfit">
                <span>Editor active logs</span>
              </div>
            </div>

            {/* Dynamic Sparkline */}
            <FocusSparkline data={weeklyFocusData} />
          </motion.div>

          {/* CARD 4: Coffee logging (Orange, liquid cup fill) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative overflow-hidden bg-[#161619]/70 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-[28px] p-6 transition-colors duration-300 flex flex-col justify-between h-full"
          >
            <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10 bg-gradient-to-r from-orange-500/5 to-transparent" />
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-orange-500 font-bold font-outfit block mb-1">
                  Fuel Level
                </span>
                <h3 className="text-3xl font-extrabold text-white tracking-tight font-outfit mt-1">
                  <CountUpNumber value={otherMetrics.coffeeConsumed.value} /> <span className="text-sm font-semibold text-white/40 font-outfit">cups</span>
                </h3>
                <p className="text-[11px] text-white/40 mt-2 leading-relaxed font-outfit">
                  {otherMetrics.coffeeConsumed.description}
                </p>
              </div>
              <CaffeineLogGauge />
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-3.5">
              <span className="text-[10px] font-semibold text-white/40 font-outfit">Performance Multiplier</span>
              <span className="text-[10px] font-bold text-orange-500 font-outfit">2.4x Speed boost</span>
            </div>
          </motion.div>

          {/* CARD 5: GitHub Contributions (Purple/Pink glow, Yearly Total) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="group relative overflow-hidden bg-[#161619]/70 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-[28px] p-6 transition-colors duration-300 flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10 bg-gradient-to-r from-purple-500/5 to-transparent" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-widest text-[#a855f7] font-bold font-outfit">
                  GitHub Code
                </span>
                <ArrowUpRight size={16} className="text-[#a855f7]/60 group-hover:text-[#a855f7] transition-colors" />
              </div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight font-outfit">
                <CountUpNumber value={yearlyCommits} /> <span className="text-sm font-semibold text-white/40 font-outfit">commits</span>
              </h3>
              <p className="text-[11px] text-white/40 mt-1 leading-normal font-outfit">
                {otherMetrics.commitsThisYear.description}
              </p>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 mt-2 rounded-full bg-[#a855f7]/10 text-[#a855f7] text-[10px] font-bold font-outfit">
                <span>Active contributor</span>
              </div>
            </div>

            {/* iOS Styled progress indicator bar */}
            <div className="mt-6">
              <div className="flex justify-between items-center text-[10px] font-semibold text-white/40 font-outfit mb-1.5">
                <span>Daily Contribution Goal</span>
                <span className="text-[#a855f7]">100% Consistent</span>
              </div>
              <div className="w-full h-1.5 bg-white/[0.04] border border-white/[0.03] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#0A84FF] to-[#a855f7] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
