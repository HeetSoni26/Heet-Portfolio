'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { 
  X, 
  ChevronLeft,
  ChevronRight,
  ExternalLink, 
  Github, 
  Calendar, 
  User, 
  Folder, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  TrendingUp,
  Zap,
  Palette,
  Search,
  Shield,
  Database,
  Cpu,
  Globe,
  Smartphone,
  Laptop
} from 'lucide-react';
import { Project } from './work.data';
import { techConfig } from './ProjectCard';
import { SiReact } from 'react-icons/si';
import { useEffect, useState } from 'react';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

// Function to map feature keywords to distinct icons
function getFeatureIcon(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes('speed') || lower.includes('performance') || lower.includes('fast') || lower.includes('loading')) {
    return Zap;
  }
  if (lower.includes('design') || lower.includes('ui') || lower.includes('ux') || lower.includes('visual')) {
    return Palette;
  }
  if (lower.includes('seo') || lower.includes('search') || lower.includes('visibility')) {
    return Search;
  }
  if (lower.includes('secure') || lower.includes('auth') || lower.includes('role-based')) {
    return Shield;
  }
  if (lower.includes('db') || lower.includes('database') || lower.includes('sql') || lower.includes('data') || lower.includes('store') || lower.includes('mongodb')) {
    return Database;
  }
  if (lower.includes('ai') || lower.includes('openai') || lower.includes('learning') || lower.includes('predict')) {
    return Cpu;
  }
  if (lower.includes('responsive') || lower.includes('mobile') || lower.includes('platform')) {
    return Globe;
  }
  return CheckCircle2;
}

// Helper to intelligently parse various metric text formats
function parseMetric(metric: string) {
  const parts = metric.split(':');
  const name = parts[0]?.trim() || '';
  const valStr = parts.slice(1).join(':').trim() || '';
  const lowerName = name.toLowerCase();
  const lowerVal = valStr.toLowerCase();

  let pct = 100;

  if (lowerVal.includes('real-time') || lowerVal.includes('a+') || lowerVal.includes('100%') || lowerVal.includes('fps')) {
    pct = 100;
  } else if (lowerName.includes('leakage') && lowerVal.includes('0%')) {
    pct = 100; // 0% security leakage = 100% success rating
  } else {
    const pctMatch = valStr.match(/(\d+(?:\.\d+)?)\s*%/);
    const fracMatch = valStr.match(/(\d+(?:\.\d+)?)\s*\/\s*(\d+)/);
    const numMatch = valStr.match(/(\d+(?:\.\d+)?)/);

    if (pctMatch) {
      pct = parseFloat(pctMatch[1]);
    } else if (fracMatch) {
      const num = parseFloat(fracMatch[1]);
      const den = parseFloat(fracMatch[2]);
      pct = (num / den) * 100;
    } else if (numMatch) {
      const val = parseFloat(numMatch[1]);
      if (val < 1 && val > 0) {
        pct = val * 100;
      } else if (lowerVal.includes('ms')) {
        pct = val < 10 ? 99 : val < 20 ? 97 : val < 50 ? 92 : 85;
      } else if (lowerVal.includes('s') && !lowerVal.includes('ms')) {
        pct = val < 0.5 ? 99 : val < 1.0 ? 96 : val < 2.0 ? 90 : 85;
      } else if (lowerVal.includes('min')) {
        pct = 90;
      } else if (val <= 100 && val > 0) {
        pct = val;
      }
    }
  }

  pct = Math.min(Math.max(pct, 0), 100);
  return { name, valStr, pct };
}

// Circular SVG Progress Ring component for iOS Health-style dashboard widgets
function CircularProgressRing({ value, color }: { value: number; color: string }) {
  const size = 68;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.04)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute font-outfit text-[11px] font-black text-white/90">
        {Math.round(value)}%
      </div>
    </div>
  );
}

// Stagger Animation Variants
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const fadeUpSpring: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 16 }
  }
};

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const brandColor = `rgb(${project.color})`;
  const brandColorGlow = `rgba(${project.color}, 0.25)`;

  const [scrollY, setScrollY] = useState(0);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const imagesToDisplay = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [project.image, project.hoverImage];

  // Bind scroll listener to body
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Gallery Navigation
  const nextScreenshot = () => {
    setActiveImageIdx((prev) => (prev + 1) % imagesToDisplay.length);
  };

  const prevScreenshot = () => {
    setActiveImageIdx((prev) => (prev - 1 + imagesToDisplay.length) % imagesToDisplay.length);
  };

  // Primary tech icon mapping
  const primaryTech = project.techStack.find(tech => techConfig[tech]) || project.techStack[0];
  const techInfo = techConfig[primaryTech];
  const TechIcon = techInfo?.icon || SiReact;

  // Split description first character for iOS editorial drop-cap
  const firstLetter = project.longDescription.charAt(0);
  const restOfText = project.longDescription.slice(1);

  // Header scroll fade thresholds
  const isHeaderScrolled = scrollY > 120;

  return (
    <div className="w-full min-h-screen bg-[#0F0E0E] text-white relative font-sans overflow-x-hidden selection:bg-white/10">
      
      {/* Dynamic iOS Sticky Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-3.5 transition-all duration-300 border-b ${
          isHeaderScrolled 
            ? 'bg-[#0F0E0E]/85 backdrop-blur-xl border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.4)]' 
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Left: iOS Back Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-white/70 hover:text-white transition-all text-sm font-semibold font-outfit cursor-pointer select-none group"
          aria-label="Go back"
        >
          <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-0.5" />
          <span>Projects</span>
        </button>

        {/* Center: Title (fades in as header scrolls) */}
        <div 
          className={`flex items-center gap-3 min-w-0 mx-4 transition-all duration-300 ${
            isHeaderScrolled ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
          }`}
        >
          <div
            className="w-8 h-8 rounded-[9px] flex-shrink-0 flex items-center justify-center border border-white/[0.08]"
            style={{
              background: `rgba(${project.color}, 0.08)`,
              borderColor: `rgba(${project.color}, 0.22)`,
            }}
          >
            <TechIcon
              size={14}
              style={{ color: techInfo?.color || '#FFFFFF' }}
            />
          </div>
          <h2 className="text-white text-sm sm:text-base font-bold font-outfit truncate tracking-tight">
            {project.title}
          </h2>
        </div>

        {/* Right: Close Circle button */}
        <button
          onClick={onClose}
          className="w-8.5 h-8.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] flex items-center justify-center transition-all text-white/70 hover:text-white cursor-pointer"
          aria-label="Close detail view"
        >
          <X size={15} />
        </button>
      </header>

      {/* Parallax Hero Banner Cover */}
      <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden flex items-end">
        {/* Parallax Image container */}
        <div 
          className="absolute inset-0 z-0 select-none pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.32}px) scale(${1 + scrollY * 0.00035})`,
          }}
        >
          <Image
            src={project.image}
            alt={`${project.title} Hero Cover`}
            fill
            sizes="100vw"
            className="object-cover brightness-[0.38] contrast-[1.05]"
            priority
          />
        </div>

        {/* Brand Accent Radial Backlight Glow */}
        <div 
          className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full blur-[160px] opacity-25 z-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${brandColorGlow} 0%, transparent 70%)`
          }}
        />

        {/* Dynamic bottom linear gradient fade to fit background tone */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0E] via-[#0F0E0E]/40 to-transparent z-1 pointer-events-none" />

        {/* Cover Text Overlays */}
        <div 
          className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pb-10 sm:pb-14 text-left"
          style={{
            opacity: Math.max(0, 1 - scrollY / 380),
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 15 }}
          >
            <span 
              className="inline-block text-xs font-bold tracking-[0.25em] uppercase mb-3.5 font-outfit"
              style={{ color: brandColor }}
            >
              {project.category}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight font-outfit text-white uppercase max-w-4xl leading-[0.98]">
              {project.title}
            </h1>
            <div className="w-20 h-[2.5px] mt-5 mb-4" style={{ backgroundColor: brandColor }} />
            <p className="text-white/60 text-sm sm:text-base md:text-lg lg:text-xl font-outfit max-w-2xl leading-relaxed font-light">
              {project.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Container with Staggered Entrance */}
      <motion.main 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-full pb-44 px-6 md:px-12"
      >
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Restructured Two-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (Content & Engineering Analysis) */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Editorial Overview Card */}
              <motion.div 
                variants={fadeUpSpring}
                className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] flex flex-col justify-between relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                style={{
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.04)',
                }}
              >
                <div 
                  className="absolute top-0 left-0 w-40 h-40 rounded-full blur-[70px] opacity-15 pointer-events-none transition-all duration-700 group-hover:opacity-30 group-hover:scale-110"
                  style={{ backgroundColor: brandColor }}
                />

                <div className="space-y-4 relative z-10">
                  <h3 
                    className="text-xs font-bold uppercase tracking-widest font-outfit"
                    style={{ color: brandColor }}
                  >
                    Editorial Case Review
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed font-outfit font-light">
                    <span 
                      className="text-4xl sm:text-5xl font-black mr-2 float-left mt-0.5" 
                      style={{ color: brandColor }}
                    >
                      {firstLetter}
                    </span>
                    {restOfText}
                  </p>
                </div>
              </motion.div>

              {/* Core Capabilities Section */}
              <motion.div variants={fadeUpSpring} className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 font-outfit">
                  Core Capabilities
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => {
                    const KeywordIcon = getFeatureIcon(feature);

                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -4, scale: 1.012 }}
                        whileTap={{ scale: 0.988 }}
                        className="p-5 rounded-[24px] bg-gradient-to-br from-white/[0.02] to-transparent hover:bg-white/[0.04] border border-white/[0.05] flex items-start gap-4 transition-all duration-300 hover:border-white/[0.12] shadow-[0_4px_15px_rgba(0,0,0,0.15)] group"
                        style={{
                          boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.04)',
                        }}
                      >
                        <motion.div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `rgba(${project.color}, 0.08)`,
                            border: `1px solid rgba(${project.color}, 0.2)`
                          }}
                          whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <KeywordIcon 
                            size={16} 
                            style={{ color: brandColor }}
                            className="flex-shrink-0"
                          />
                        </motion.div>
                        <div className="space-y-1">
                          <span className="text-xs sm:text-sm text-white/80 font-bold font-outfit">
                            {feature.split(' ').slice(0, 2).join(' ')}
                          </span>
                          <p className="text-xs text-white/55 font-outfit font-light leading-relaxed">
                            {feature}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Case Study Section */}
              <motion.div variants={fadeUpSpring} className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 font-outfit">
                  Engineering Case Study
                </h3>
                
                <div className="space-y-4">
                  {/* Challenge Card */}
                  <div 
                    className="p-5 rounded-2xl bg-gradient-to-br from-red-500/[0.015] to-transparent border border-red-500/10 hover:border-red-500/20 transition-all duration-300 relative overflow-hidden group shadow-lg"
                    style={{
                      boxShadow: 'inset 0 1px 1px rgba(239, 68, 68, 0.04)',
                    }}
                  >
                    <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider mb-2.5 font-outfit">
                      <AlertCircle size={14} className="flex-shrink-0" />
                      <span>The Challenge</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/60 font-outfit leading-relaxed font-light">
                      {project.challenges}
                    </p>
                  </div>

                  {/* Solution Card */}
                  <div 
                    className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/[0.015] to-transparent border border-emerald-500/10 hover:border-emerald-500/20 transition-all duration-300 relative overflow-hidden group shadow-lg"
                    style={{
                      boxShadow: 'inset 0 1px 1px rgba(16, 185, 129, 0.04)',
                    }}
                  >
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2.5 font-outfit">
                      <Lightbulb size={14} className="flex-shrink-0" />
                      <span>The Solution</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/60 font-outfit leading-relaxed font-light">
                      {project.solution}
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Right Column (Specifications, Tech Badges, & Custom Metrics widgets) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Key Facts checklist metadata card */}
              <motion.div 
                variants={fadeUpSpring}
                className="p-6 rounded-[32px] bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                style={{
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.04)',
                }}
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 font-outfit mb-5">
                  Key Facts
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white/80"
                      style={{
                        background: `rgba(${project.color}, 0.08)`,
                        border: `1px solid rgba(${project.color}, 0.2)`
                      }}
                    >
                      <User size={15} style={{ color: brandColor }} />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9px] text-white/35 uppercase font-semibold">Your Role</span>
                      <span className="block text-xs font-bold text-white/90 truncate font-outfit mt-0.5">
                        {project.role}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/[0.04]" />

                  <div className="flex items-center gap-3.5">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white/80"
                      style={{
                        background: `rgba(${project.color}, 0.08)`,
                        border: `1px solid rgba(${project.color}, 0.2)`
                      }}
                    >
                      <Calendar size={15} style={{ color: brandColor }} />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9px] text-white/35 uppercase font-semibold">Timeline</span>
                      <span className="block text-xs font-bold text-white/90 truncate font-outfit mt-0.5">
                        {project.timeline}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/[0.04]" />

                  <div className="flex items-center gap-3.5">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white/80"
                      style={{
                        background: `rgba(${project.color}, 0.08)`,
                        border: `1px solid rgba(${project.color}, 0.2)`
                      }}
                    >
                      <Folder size={15} style={{ color: brandColor }} />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9px] text-white/35 uppercase font-semibold">Category</span>
                      <span className="block text-xs font-bold text-white/90 truncate font-outfit mt-0.5">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Technology Badges Card (Proper Badges in One Column) */}
              <motion.div 
                variants={fadeUpSpring}
                className="p-6 rounded-[32px] bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.3)] space-y-4"
                style={{
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.04)',
                }}
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 font-outfit">
                  Built With
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => {
                    const config = techConfig[tech];
                    const Icon = config?.icon;
                    const iconColor = config?.color || '#FFFFFF';

                    return (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.04] text-[11px] font-outfit text-white/60 transition-all hover:bg-white/[0.05] hover:text-white/85 select-none"
                      >
                        {Icon && <Icon size={11} style={{ color: iconColor }} />}
                        <span>{tech}</span>
                      </span>
                    );
                  })}
                </div>
              </motion.div>

              {/* Improved Metrics Performance Dashboard */}
              <motion.div variants={fadeUpSpring} className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 font-outfit flex items-center gap-2">
                  <TrendingUp size={14} className="text-white/35" />
                  <span>Product Performance</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {project.metrics.map((metric, idx) => {
                    const { name, valStr, pct } = parseMetric(metric);

                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -5, scale: 1.02, borderColor: `rgba(${project.color}, 0.3)` }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 rounded-[28px] bg-gradient-to-br from-neutral-900/60 to-neutral-900/20 border border-white/[0.06] relative overflow-hidden group flex flex-col justify-between aspect-square shadow-[0_12px_24px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-default"
                        style={{
                          boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.04)',
                        }}
                      >
                        {/* Radial brand accent glow behind card */}
                        <div 
                          className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at center, ${brandColorGlow} 0%, transparent 70%)`
                          }}
                        />
                        
                        {/* SVG Circular Progress Ring */}
                        <div className="self-center mt-0.5">
                          <CircularProgressRing value={pct} color={brandColor} />
                        </div>

                        {/* Label details */}
                        <div className="relative z-10 text-center sm:text-left mt-2">
                          <span className="block text-sm sm:text-base font-extrabold text-white tracking-tight font-outfit truncate leading-none">
                            {valStr}
                          </span>
                          <span className="block text-[9px] text-white/45 font-outfit mt-1.5 leading-normal font-light truncate">
                            {name}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

            </div>

          </div>

          {/* Premium Gallery: Relocated at the Bottom */}
          <motion.section 
            variants={fadeUpSpring}
            className="space-y-6 pt-6 border-t border-white/[0.04]" 
            aria-label="Interface gallery"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 font-outfit">
                Interface Gallery
              </h3>
              
              {/* Viewport Switcher Tabs */}
              <div className="bg-white/[0.03] p-1 rounded-full border border-white/[0.06] flex items-center gap-0.5 shadow-inner">
                <button
                  onClick={() => {
                    setViewportMode('desktop');
                    setActiveImageIdx(0);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold font-outfit transition-all flex items-center gap-1.5 select-none cursor-pointer ${
                    viewportMode === 'desktop'
                      ? 'bg-white text-black shadow-md'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Laptop size={13} />
                  <span>Desktop View</span>
                </button>
                <button
                  onClick={() => {
                    setViewportMode('mobile');
                    setActiveImageIdx(1 % imagesToDisplay.length);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold font-outfit transition-all flex items-center gap-1.5 select-none cursor-pointer ${
                    viewportMode === 'mobile'
                      ? 'bg-white text-black shadow-md'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Smartphone size={13} />
                  <span>Mobile View</span>
                </button>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center bg-white/[0.01] border border-white/[0.03] p-6 sm:p-12 md:p-16 rounded-[40px] relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              {/* Ambient backlight background */}
              <div 
                className="absolute inset-0 opacity-12 pointer-events-none transition-all duration-700"
                style={{
                  background: `radial-gradient(circle at center, ${brandColorGlow} 0%, transparent 68%)`
                }}
              />

              {/* Viewport Mockup Render */}
              <div className="w-full flex items-center justify-center relative min-h-[220px] sm:min-h-[320px] md:min-h-[380px]">
                
                {viewportMode === 'desktop' ? (
                  /* MacBook Bezel Mockup Frame */
                  <motion.div 
                    key="macbook-mockup"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="relative w-full max-w-[620px] group"
                  >
                    {/* Screens display frame */}
                    <div className="relative aspect-[16/10] w-full rounded-t-[20px] border-[8px] border-[#222224] bg-[#0c0c0d] overflow-hidden shadow-2xl relative">
                      
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`desktop-screenshot-${activeImageIdx}`}
                          initial={{ opacity: 0, x: 25 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -25 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="absolute inset-0"
                        >
                          <Image 
                            src={imagesToDisplay[activeImageIdx]} 
                            alt={`${project.title} Desktop Screenshot ${activeImageIdx + 1}`} 
                            fill 
                            sizes="(max-width: 768px) 100vw, 620px"
                            className="object-cover" 
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Overlays chevron navigation */}
                      {imagesToDisplay.length > 1 && (
                        <>
                          <button
                            onClick={prevScreenshot}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60 cursor-pointer"
                            aria-label="Previous screenshot"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={nextScreenshot}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60 cursor-pointer"
                            aria-label="Next screenshot"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </>
                      )}
                    </div>
                    {/* Keypad bottom base */}
                    <div className="relative h-2.5 bg-[#424245] rounded-b-xl w-[108%] -ml-[4%] shadow-xl flex items-center justify-center border-t border-white/10">
                      <div className="w-16 h-1 bg-[#1c1c1e] rounded-b-sm" />
                    </div>
                  </motion.div>
                ) : (
                  /* iPhone 15 Pro Mockup Frame */
                  <motion.div 
                    key="iphone-mockup"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="relative w-[210px] aspect-[9/19.5] group flex-shrink-0"
                  >
                    {/* iPhone Display Border */}
                    <div className="absolute inset-0 border-[7px] border-[#222224] rounded-[36px] bg-[#0c0c0d] overflow-hidden shadow-2xl">
                      
                      {/* Dynamic Island Notch */}
                      <div className="w-14 h-3.5 bg-[#1d1d1f] rounded-full absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a] ml-auto mr-1.5" />
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`mobile-screenshot-${activeImageIdx}`}
                          initial={{ opacity: 0, y: 25 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -25 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="absolute inset-0"
                        >
                          <Image 
                            src={imagesToDisplay[activeImageIdx]} 
                            alt={`${project.title} Mobile Screenshot ${activeImageIdx + 1}`} 
                            fill 
                            sizes="210px"
                            className="object-cover" 
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation buttons */}
                      {imagesToDisplay.length > 1 && (
                        <>
                          <button
                            onClick={prevScreenshot}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60 cursor-pointer"
                            aria-label="Previous screenshot"
                          >
                            <ChevronLeft size={14} />
                          </button>
                          <button
                            onClick={nextScreenshot}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60 cursor-pointer"
                            aria-label="Next screenshot"
                          >
                            <ChevronRight size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}

              </div>

              {/* Bullet Pagination Indicators */}
              {imagesToDisplay.length > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-8 select-none">
                  {imagesToDisplay.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeImageIdx === idx 
                          ? 'w-5' 
                          : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                      style={{
                        backgroundColor: activeImageIdx === idx ? brandColor : undefined
                      }}
                      aria-label={`Go to screenshot ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.section>

        </div>
      </motion.main>

      {/* Floating Apple-style Bottom Action Dock */}
      <motion.footer 
        initial={{ opacity: 0, y: 50, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.4 }}
        className="fixed bottom-6 left-1/2 z-40 w-[90%] max-w-lg p-3 bg-neutral-900/80 border border-white/[0.08] backdrop-blur-xl rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.65)] flex items-center justify-between gap-3"
      >
        {project.liveUrl && project.liveUrl.trim() !== '' && !project.liveUrl.includes('demo-link') ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center font-bold font-outfit text-xs py-3 rounded-full transition-all duration-300 text-white select-none hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
            style={{
              backgroundColor: brandColor,
              boxShadow: `0 4px 18px rgba(${project.color}, 0.35)`,
            }}
          >
            <span>Explore App</span>
            <ExternalLink size={13} />
          </a>
        ) : (
          <button
            disabled
            className="flex-1 text-center font-bold font-outfit text-xs py-3 rounded-full text-white/40 bg-white/[0.03] border border-white/[0.06] select-none flex items-center justify-center gap-2 cursor-not-allowed"
          >
            <span>Demo Soon</span>
          </button>
        )}

        {project.githubUrl && project.githubUrl.trim() !== '' && !project.githubUrl.includes('yourusername') ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border border-white/10 hover:bg-white/[0.04] hover:border-white/20 text-white font-semibold font-outfit text-xs py-3 rounded-full transition-all flex items-center justify-center gap-2 select-none cursor-pointer active:scale-95"
          >
            <Github size={13} className="text-white/80" />
            <span>Source Code</span>
          </a>
        ) : (
          <button
            disabled
            className="flex-1 border border-white/[0.04] text-white/30 bg-white/[0.01] font-semibold font-outfit text-xs py-3 rounded-full flex items-center justify-center gap-2 cursor-not-allowed"
          >
            <Github size={13} className="text-white/20" />
            <span>Private Repo</span>
          </button>
        )}
      </motion.footer>
    </div>
  );
}
