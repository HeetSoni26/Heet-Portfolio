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
  Laptop,
  Terminal,
  Copy,
  Check,
  Layers,
  Rocket,
  Code2
} from 'lucide-react';
import { Project } from './work.data';
import { techConfig } from './ProjectCard';
import { SiReact } from 'react-icons/si';
import { useEffect, useState, useCallback, useMemo } from 'react';

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
    pct = 100;
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

// Circular SVG Progress Ring component
function CircularProgressRing({ value, color }: { value: number; color: string }) {
  const size = 64;
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
          stroke="rgba(255, 255, 255, 0.06)"
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
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute font-outfit text-xs font-black text-white/90">
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
  hidden: { opacity: 0, y: 25 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 }
  }
};

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const imagesToDisplay = useMemo(() => {
    return project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : [project.image, project.hoverImage];
  }, [project.screenshots, project.image, project.hoverImage]);

  useEffect(() => {
    let ticking = false;
    let lastHeaderState = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const isScrolled = currentY > 120;
          if (isScrolled !== lastHeaderState) {
            lastHeaderState = isScrolled;
            setIsHeaderScrolled(isScrolled);
          }
          if (currentY < 400) {
            setScrollY(currentY);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const nextScreenshot = useCallback(() => {
    setActiveImageIdx((prev) => (prev + 1) % imagesToDisplay.length);
  }, [imagesToDisplay.length]);

  const prevScreenshot = useCallback(() => {
    setActiveImageIdx((prev) => (prev - 1 + imagesToDisplay.length) % imagesToDisplay.length);
  }, [imagesToDisplay.length]);

  const primaryTech = useMemo(() => {
    return project.techStack.find(tech => techConfig[tech]) || project.techStack[0];
  }, [project.techStack]);

  const techInfo = techConfig[primaryTech];
  const TechIcon = techInfo?.icon || SiReact;

  const firstLetter = project.longDescription.charAt(0);
  const restOfText = project.longDescription.slice(1);

  const cloneCommand = useMemo(() => {
    return `git clone ${project.githubUrl || 'https://github.com/HeetSoni26/portfolio.git'}\ncd ${project.title.toLowerCase().replace(/\s+/g, '-')}\nnpm install\nnpm run dev`;
  }, [project.githubUrl, project.title]);

  const handleCopyCommand = useCallback(() => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  }, [cloneCommand]);

  // Development Journey Milestones
  const journeyMilestones = useMemo(() => [
    {
      step: '01',
      title: 'Architecture & System Design',
      desc: `Structured the schema for ${project.title}, defining state management patterns and API route handlers.`,
      icon: Layers,
    },
    {
      step: '02',
      title: 'Full-Stack Implementation',
      desc: `Engineered core features using ${project.techStack.slice(0, 3).join(', ')} with component modularity.`,
      icon: Code2,
    },
    {
      step: '03',
      title: 'Performance & Optimization',
      desc: `Applied server-side rendering, debounced event flows, and asset compression for top Lighthouse scores.`,
      icon: Zap,
    },
    {
      step: '04',
      title: 'Deployment & CI/CD Telemetry',
      desc: `Deployed live production build with continuous integration and automated telemetry tracking.`,
      icon: Rocket,
    },
  ], [project.title, project.techStack]);

  return (
    <div className="w-full min-h-screen bg-[#0C0B0E] text-white relative font-sans overflow-x-hidden selection:bg-white/10">
      
      {/* Background Dot Grid */}
      <svg
        className="fixed inset-0 w-full h-full opacity-25 pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="detailDotGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="rgba(255, 255, 255, 0.05)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#detailDotGrid)" />
      </svg>

      {/* Dynamic iOS Sticky Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-3.5 transition-all duration-300 border-b ${
          isHeaderScrolled 
            ? 'bg-[#0C0B0E]/90 backdrop-blur-2xl border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)]' 
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Left: iOS Back Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-white/80 hover:text-white transition-all text-xs font-semibold font-outfit cursor-pointer select-none group"
          aria-label="Go back to projects"
        >
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          <span>All Projects</span>
        </button>

        {/* Center: Title (fades in as header scrolls) */}
        <div 
          className={`flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] transition-all duration-300 ${
            isHeaderScrolled ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
          }`}
        >
          <TechIcon
            size={13}
            style={{ color: techInfo?.color || '#FFFFFF' }}
          />
          <h2 className="text-white text-xs sm:text-sm font-bold font-jakarta truncate tracking-tight">
            {project.title}
          </h2>
        </div>

        {/* Right: Close Circle button */}
        <button
          onClick={onClose}
          className="w-8.5 h-8.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/[0.08] flex items-center justify-center transition-all text-white/70 hover:text-white cursor-pointer"
          aria-label="Close detail view"
        >
          <X size={15} />
        </button>
      </header>

      {/* Parallax Hero Banner Cover Section */}
      <section className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden flex items-end">
        {/* Parallax Image container */}
        <div 
          className="absolute inset-0 z-0 select-none pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0003})`,
          }}
        >
          <Image
            src={project.image}
            alt={`${project.title} Hero Cover`}
            fill
            sizes="100vw"
            className="object-cover brightness-[0.38] contrast-[1.08]"
            priority
          />
        </div>

        {/* Bottom linear gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0E] via-[#0C0B0E]/60 to-transparent z-1 pointer-events-none" />

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.1] text-[11px] font-bold uppercase tracking-[0.2em] bg-white/[0.05] text-[#FF8C00] mb-4 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
              {project.category}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight font-jakarta text-white uppercase max-w-4xl leading-[0.98] [text-shadow:0_0_30px_rgba(255,255,255,0.15)]">
              {project.title}
            </h1>

            <div className="w-24 h-1 mt-5 mb-4 rounded-full bg-gradient-to-r from-[#FF8C00] to-[#F43F5E]" />

            <p className="text-white/75 text-base sm:text-lg md:text-xl font-outfit max-w-2xl leading-relaxed font-light">
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
        className="w-full pb-44 px-6 md:px-12 relative z-10"
      >
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Restructured Two-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (Content, Capabilities, Case Study, & Journey) */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Editorial Overview Card */}
              <motion.div 
                variants={fadeUpSpring}
                className="p-6 sm:p-8 rounded-[28px] bg-[#121115] border border-white/[0.08] hover:border-white/[0.16] shadow-xl transition-all duration-300"
              >
                <h3 className="text-xs font-bold uppercase tracking-widest font-mono text-[#FF8C00] mb-4">
                  Editorial Case Review
                </h3>
                <p className="text-white/75 text-sm sm:text-base leading-relaxed font-outfit font-light">
                  <span className="text-4xl sm:text-5xl font-black mr-2.5 float-left mt-0.5 bg-gradient-to-r from-[#FF8C00] to-[#F43F5E] bg-clip-text text-transparent">
                    {firstLetter}
                  </span>
                  {restOfText}
                </p>
              </motion.div>

              {/* Core Capabilities Section */}
              <motion.div variants={fadeUpSpring} className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 font-outfit">
                  Core Capabilities
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => {
                    const KeywordIcon = getFeatureIcon(feature);

                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-[22px] bg-[#121115] border border-white/[0.08] hover:border-white/[0.16] flex items-start gap-4 transition-all duration-300 shadow-md"
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/[0.04] border border-white/[0.08] text-[#FF8C00]">
                          <KeywordIcon size={16} />
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs sm:text-sm text-white/90 font-bold font-jakarta">
                            {feature.split(' ').slice(0, 2).join(' ')}
                          </span>
                          <p className="text-xs text-white/60 font-outfit font-light leading-relaxed">
                            {feature}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Engineering Case Study Section */}
              <motion.div variants={fadeUpSpring} className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 font-outfit">
                  Engineering Case Study
                </h3>
                
                <div className="space-y-4">
                  {/* Challenge Card */}
                  <div className="p-5 sm:p-6 rounded-[22px] bg-rose-950/20 border border-rose-500/20 hover:border-rose-500/35 transition-all duration-300">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-2.5 font-outfit">
                      <AlertCircle size={15} />
                      <span>The Challenge</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/70 font-outfit leading-relaxed font-light">
                      {project.challenges}
                    </p>
                  </div>

                  {/* Solution Card */}
                  <div className="p-5 sm:p-6 rounded-[22px] bg-emerald-950/20 border border-emerald-500/20 hover:border-emerald-500/35 transition-all duration-300">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2.5 font-outfit">
                      <Lightbulb size={15} />
                      <span>The Solution</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/70 font-outfit leading-relaxed font-light">
                      {project.solution}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Development Journey Timeline Section */}
              <motion.div variants={fadeUpSpring} className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 font-outfit">
                  Development Journey &amp; Milestones
                </h3>

                <div className="p-6 sm:p-7 rounded-[28px] bg-[#121115] border border-white/[0.08] shadow-xl relative overflow-hidden">
                  <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-4 before:w-0.5 before:bg-white/[0.08] before:z-0">
                    {journeyMilestones.map((milestone, idx) => {
                      const Icon = milestone.icon;
                      return (
                        <div key={idx} className="relative z-10 flex items-start gap-4 pl-1">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#121115] border border-[#FF8C00]/40 flex items-center justify-center text-[#FF8C00] flex-shrink-0 shadow-sm">
                            <Icon size={14} />
                          </div>
                          <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-mono font-bold text-[#FF8C00] uppercase tracking-wider">
                                Phase {milestone.step}
                              </span>
                              <h4 className="text-xs sm:text-sm font-bold font-jakarta text-white truncate">
                                {milestone.title}
                              </h4>
                            </div>
                            <p className="text-xs text-white/60 font-outfit font-light leading-relaxed">
                              {milestone.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Right Column (Specifications, Tech Badges, Metrics, & Terminal) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Key Specifications Card */}
              <motion.div 
                variants={fadeUpSpring}
                className="p-6 sm:p-7 rounded-[28px] bg-[#121115] border border-white/[0.08] shadow-xl space-y-4"
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 font-outfit">
                  Key Specifications
                </h3>
                <div className="space-y-4 pt-1">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/[0.04] border border-white/[0.08] text-[#FF8C00]">
                      <User size={15} />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9px] text-white/40 uppercase font-semibold">Your Role</span>
                      <span className="block text-xs font-bold text-white/90 truncate font-outfit mt-0.5">
                        {project.role}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/[0.06]" />

                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/[0.04] border border-white/[0.08] text-[#FF8C00]">
                      <Calendar size={15} />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9px] text-white/40 uppercase font-semibold">Timeline</span>
                      <span className="block text-xs font-bold text-white/90 truncate font-outfit mt-0.5">
                        {project.timeline}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/[0.06]" />

                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/[0.04] border border-white/[0.08] text-[#FF8C00]">
                      <Folder size={15} />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9px] text-white/40 uppercase font-semibold">Category</span>
                      <span className="block text-xs font-bold text-white/90 truncate font-outfit mt-0.5">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Built With Badges */}
              <motion.div 
                variants={fadeUpSpring}
                className="p-6 sm:p-7 rounded-[28px] bg-[#121115] border border-white/[0.08] shadow-xl space-y-4"
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 font-outfit">
                  Built With
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.techStack.map((tech, idx) => {
                    const config = techConfig[tech];
                    const Icon = config?.icon;
                    const iconColor = config?.color || '#FFFFFF';

                    return (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-outfit text-white/80 transition-all hover:bg-white/[0.08] hover:text-white select-none"
                      >
                        {Icon && <Icon size={12} style={{ color: iconColor }} />}
                        <span>{tech}</span>
                      </span>
                    );
                  })}
                </div>
              </motion.div>

              {/* Product Performance Dashboard */}
              <motion.div variants={fadeUpSpring} className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 font-outfit flex items-center gap-2">
                  <TrendingUp size={14} className="text-white/40" />
                  <span>Product Performance</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {project.metrics.map((metric, idx) => {
                    const { name, valStr, pct } = parseMetric(metric);

                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-[24px] bg-[#121115] border border-white/[0.08] hover:border-white/[0.16] flex flex-col justify-between aspect-square shadow-md transition-all duration-300"
                      >
                        <div className="self-center mt-1">
                          <CircularProgressRing value={pct} color="#FF8C00" />
                        </div>

                        <div className="text-center sm:text-left mt-2">
                          <span className="block text-sm sm:text-base font-extrabold text-white tracking-tight font-outfit truncate leading-none">
                            {valStr}
                          </span>
                          <span className="block text-[9.5px] text-white/50 font-outfit mt-1.5 leading-normal font-light truncate">
                            {name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Terminal Quick Setup Commands Block */}
              <motion.div variants={fadeUpSpring} className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 font-outfit flex items-center gap-2">
                  <Terminal size={14} className="text-[#FF8C00]" />
                  <span>Local Setup Commands</span>
                </h3>

                <div className="rounded-[24px] bg-[#0A090C] border border-white/[0.08] overflow-hidden shadow-xl font-mono text-xs">
                  <div className="px-4 py-3 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      <span className="text-[10px] text-white/40 ml-2 font-mono">bash — setup</span>
                    </div>

                    <button
                      onClick={handleCopyCommand}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-white/70 hover:text-white text-[10px] font-outfit transition-all cursor-pointer"
                    >
                      {copiedCmd ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                      <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <pre className="p-4 text-white/80 overflow-x-auto leading-relaxed select-text font-mono text-[11px]">
                    <code>{cloneCommand}</code>
                  </pre>
                </div>
              </motion.div>

            </div>

          </div>

          {/* Premium Interface Gallery */}
          <motion.section 
            variants={fadeUpSpring}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6 pt-8 border-t border-white/[0.08]" 
            aria-label="Interface gallery"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 font-outfit">
                Interface Gallery
              </h3>
              
              {/* Viewport Switcher Tabs */}
              <div className="bg-white/[0.04] p-1 rounded-full border border-white/[0.08] flex items-center gap-1">
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
            
            <div className="flex flex-col items-center justify-center bg-[#121115] border border-white/[0.08] p-6 sm:p-12 md:p-14 rounded-[32px] relative overflow-hidden shadow-xl">
              {/* Viewport Mockup Render */}
              <div className="w-full flex items-center justify-center relative min-h-[220px] sm:min-h-[320px] md:min-h-[380px]">
                
                {viewportMode === 'desktop' ? (
                  /* MacBook Bezel Mockup Frame */
                  <div className="relative w-full max-w-[620px] group">
                    <div className="relative aspect-[16/10] w-full rounded-t-[20px] border-[8px] border-[#222224] bg-[#0c0c0d] overflow-hidden shadow-2xl relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`desktop-screenshot-${activeImageIdx}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
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

                      {imagesToDisplay.length > 1 && (
                        <>
                          <button
                            onClick={prevScreenshot}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 cursor-pointer"
                            aria-label="Previous screenshot"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={nextScreenshot}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 cursor-pointer"
                            aria-label="Next screenshot"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </>
                      )}
                    </div>
                    <div className="relative h-2.5 bg-[#424245] rounded-b-xl w-[108%] -ml-[4%] shadow-xl flex items-center justify-center border-t border-white/10">
                      <div className="w-16 h-1 bg-[#1c1c1e] rounded-b-sm" />
                    </div>
                  </div>
                ) : (
                  /* iPhone Mockup Frame */
                  <div className="relative w-[210px] aspect-[9/19.5] group flex-shrink-0">
                    <div className="absolute inset-0 border-[7px] border-[#222224] rounded-[36px] bg-[#0c0c0d] overflow-hidden shadow-2xl">
                      <div className="w-14 h-3.5 bg-[#1d1d1f] rounded-full absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a] ml-auto mr-1.5" />
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`mobile-screenshot-${activeImageIdx}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
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

                      {imagesToDisplay.length > 1 && (
                        <>
                          <button
                            onClick={prevScreenshot}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 cursor-pointer"
                            aria-label="Previous screenshot"
                          >
                            <ChevronLeft size={14} />
                          </button>
                          <button
                            onClick={nextScreenshot}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 cursor-pointer"
                            aria-label="Next screenshot"
                          >
                            <ChevronRight size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* Bullet Indicators */}
              {imagesToDisplay.length > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-8 select-none">
                  {imagesToDisplay.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeImageIdx === idx 
                          ? 'w-6 bg-gradient-to-r from-[#FF8C00] to-[#F43F5E]' 
                          : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to screenshot ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.section>

        </div>
      </motion.main>

      {/* Floating Bottom Action Dock */}
      <motion.footer 
        initial={{ opacity: 0, y: 50, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.4 }}
        className="fixed bottom-6 left-1/2 z-50 w-[90%] max-w-md p-2.5 bg-[#121115]/95 border border-white/[0.12] backdrop-blur-2xl rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex items-center justify-between gap-3"
      >
        {project.liveUrl && project.liveUrl.trim() !== '' && !project.liveUrl.includes('demo-link') ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center font-bold font-outfit text-xs py-3 px-5 rounded-full transition-all duration-200 text-white select-none hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-[#FF8C00] to-[#F43F5E] shadow-[0_4px_16px_rgba(244,63,94,0.4)] active:scale-95"
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
            className="flex-1 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 text-white font-semibold font-outfit text-xs py-3 px-4 rounded-full transition-all flex items-center justify-center gap-2 select-none cursor-pointer active:scale-95"
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
