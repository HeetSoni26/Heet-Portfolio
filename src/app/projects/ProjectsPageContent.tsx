'use client';

import { useState, useMemo, useCallback, useEffect, useRef, memo } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Search,
  X,
  ArrowUpDown,
  ArrowUpRight,
  FolderOpen,
  LayoutGrid,
  List,
  Github,
} from 'lucide-react';
import Image from 'next/image';
import type { Project } from '@/components/sections/Work/work.data';
import ProjectCard from '@/components/sections/Work/ProjectCard';

interface ProjectsPageContentProps {
  projects: Project[];
}

const categories = ['All', 'AI', 'Research', 'Android', 'Web'] as const;
type Category = (typeof categories)[number];

type SortMode = 'featured' | 'newest' | 'oldest' | 'az';
const sortOptions: { id: SortMode; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'oldest', label: 'Oldest' },
  { id: 'az', label: 'A – Z' },
];

// Glass surface style — "Obsidian Glassmorphism"
const glassStyle: React.CSSProperties = {
  background: 'rgba(25, 25, 25, 0.55)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 8px 32px rgba(0, 0, 0, 0.4)',
};

// Memoized List View Item for Projects
const ProjectListItem = memo(function ProjectListItem({ project, index }: { project: Project; index: number }) {
  const router = useRouter();

  const handleLiveClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.liveUrl && project.liveUrl.trim() !== "" && !project.liveUrl.includes("demo-link")) {
      window.open(project.liveUrl, '_blank');
    }
  }, [project.liveUrl]);

  const handleGithubClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.githubUrl && project.githubUrl.trim() !== "" && !project.githubUrl.includes("yourusername")) {
      window.open(project.githubUrl, '_blank');
    }
  }, [project.githubUrl]);

  return (
    <motion.article
      onClick={() => router.push(`/projects/${project.id}`)}
      whileHover={{ y: -5, scale: 1.008 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden bg-[#141416]/85 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.2] rounded-[28px] p-4 sm:p-5 flex flex-col sm:flex-row items-stretch gap-5 sm:gap-6 cursor-pointer shadow-[0_12px_36px_-8px_rgba(0,0,0,0.5)]"
      style={{
        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 12px 36px -8px rgba(0, 0, 0, 0.5)',
        willChange: 'transform'
      }}
    >
      {/* Thumbnail */}
      <div className="w-full sm:w-56 md:w-60 h-40 sm:h-44 rounded-[20px] overflow-hidden bg-[#0A0A0C] border border-white/[0.08] relative flex-shrink-0">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 240px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={index < 4}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Main Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between w-full py-0.5">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="block text-[10px] font-bold font-mono tracking-widest bg-gradient-to-r from-[#FF8C00] to-[#F43F5E] bg-clip-text text-transparent uppercase">
              {project.tagline.split('for')[0].trim()}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center flex-shrink-0 text-white/50 group-hover:text-white group-hover:bg-[#FF8C00]/20 group-hover:border-[#FF8C00]/40 transition-all duration-200">
              <ArrowUpRight size={14} />
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-jakarta text-white truncate group-hover:text-white transition-colors tracking-tight mb-2">
            {project.title}
          </h3>

          <p className="text-xs sm:text-[13px] text-white/60 font-outfit leading-relaxed line-clamp-3 mb-4">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Pills & Action buttons */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-1 text-[10px] rounded-full bg-white/[0.04] border border-white/[0.06] text-white/70 font-outfit font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex items-center gap-2.5 pt-3 border-t border-white/[0.06]">
            {/* Live App Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLiveClick}
              className="flex-1 bg-gradient-to-r from-[#FF8C00] to-[#F43F5E] hover:opacity-90 active:scale-95 text-white font-bold font-outfit text-xs py-2.5 px-5 rounded-full transition-all text-center cursor-pointer shadow-[0_4px_16px_rgba(244,63,94,0.35)]"
            >
              Live App
            </motion.button>

            {/* Source Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleGithubClick}
              className="flex-1 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-white/90 font-semibold font-outfit text-xs py-2.5 px-4 rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Github size={13} className="text-white/80" />
              <span>Source</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

// Shared category matcher — mirrors the logic used in the Work section
function matchesCategory(project: Project, category: Category): boolean {
  if (category === 'All') return true;
  if (category === 'AI') {
    return project.category.includes('AI') || project.category.includes('Machine Learning') || project.category.includes('LLM');
  }
  if (category === 'Research') {
    return project.category.includes('Research') || project.category.includes('Computer Vision');
  }
  if (category === 'Android') {
    return project.category.includes('Android');
  }
  if (category === 'Web') {
    return project.category.includes('Web');
  }
  return true;
}

// Short display label for a project's category chip
function hasLink(url?: string): boolean {
  return !!url && url.trim() !== '' && !url.includes('demo-link') && !url.includes('yourusername');
}

// Extract a sortable timestamp from a timeline string like "3 Weeks (June 2025)"
function timelineToTime(timeline: string): number {
  const match = timeline.match(/\(([^)]+)\)/);
  const raw = match ? match[1] : timeline;
  const parsed = Date.parse(raw);
  return Number.isNaN(parsed) ? 0 : parsed;
}

// Scroll-triggered animated counter
function Counter({ value, duration = 1.6 }: { value: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration, ease: 'easeOut' });
      return () => controls.stop();
    }
  }, [inView, count, value, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

// Editorial line reveal (mask + slide-up)
function HeadingLine({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: '108%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export default function ProjectsPageContent({ projects }: ProjectsPageContentProps) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [query, setQuery] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('featured');
  const [sortOpen, setSortOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = {} as Record<Category, number>;
    categories.forEach((cat) => {
      counts[cat] = projects.filter((p) => matchesCategory(p, cat)).length;
    });
    return counts;
  }, [projects]);

  const totalTech = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.techStack.forEach((t) => set.add(t)));
    return set.size;
  }, [projects]);

  const liveCount = useMemo(() => projects.filter((p) => hasLink(p.liveUrl)).length, [projects]);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = projects.filter((project) => {
      if (!matchesCategory(project, activeCategory)) return false;
      if (!q) return true;
      const haystack = [
        project.title,
        project.tagline,
        project.description,
        project.category,
        project.role,
        ...project.techStack,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });

    const sorted = [...result];
    switch (sortMode) {
      case 'newest':
        sorted.sort((a, b) => timelineToTime(b.timeline) - timelineToTime(a.timeline));
        break;
      case 'oldest':
        sorted.sort((a, b) => timelineToTime(a.timeline) - timelineToTime(b.timeline));
        break;
      case 'az':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    return sorted;
  }, [projects, activeCategory, query, sortMode]);

  const resetFilters = useCallback(() => {
    setActiveCategory('All');
    setQuery('');
    setSortMode('featured');
  }, []);

  const activeSortLabel = sortOptions.find((s) => s.id === sortMode)?.label ?? 'Featured';

  return (
    <section className="relative min-h-screen text-white pt-28 sm:pt-32 pb-24 overflow-x-hidden">
      <svg
        className="fixed inset-0 w-full h-full opacity-40 pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="projectsDotGrid" width="34" height="34" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="rgba(255, 255, 255, 0.04)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#projectsDotGrid)" />
      </svg>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs font-semibold text-white/70 hover:text-white hover:border-white/25 transition-all active:scale-[0.98] group font-outfit"
            style={glassStyle}
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* ── Editorial Hero (AURA style) ── */}
        <section className="flex flex-col md:flex-row gap-10 md:gap-8 md:items-end border-b border-white/[0.07] pb-12 sm:pb-16 mb-10 sm:mb-14">
          <div className="md:w-2/3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 340, damping: 20 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 font-outfit"
              style={glassStyle}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C00] shadow-[0_0_8px_#FF8C00]" />
              The Full Collection
            </motion.div>

            <h1
              className="font-jakarta font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2.75rem,8vw,5.5rem)] mb-6"
              style={{ perspective: 1200 }}
            >
              <HeadingLine
                delay={0.05}
                className="text-white [text-shadow:0_0_30px_rgba(255,255,255,0.18)]"
              >
                ENGINEERED PRODUCTS
              </HeadingLine>
              <HeadingLine delay={0.15} className="text-white/40">
                &amp; CREATIVE WORKS
              </HeadingLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-base sm:text-lg text-white/55 leading-relaxed max-w-2xl font-outfit"
            >
              A curated selection of high-performance web applications, intelligent systems, and
              digital experiences — built with precision and modern aesthetics.
            </motion.p>
          </div>

          {/* Stats — right aligned, bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:w-1/3 flex flex-wrap gap-8 sm:gap-10 md:justify-end"
          >
            {[
              { value: projects.length, suffix: '', label: 'Projects' },
              { value: totalTech, suffix: '+', label: 'Technologies' },
              { value: liveCount, suffix: '', label: 'Live Apps' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-4xl sm:text-5xl font-black font-jakarta text-white leading-none [text-shadow:0_0_20px_rgba(255,255,255,0.15)]">
                  <Counter value={stat.value} />
                  {stat.suffix}
                </span>
                <span className="text-[11px] mt-2 uppercase tracking-[0.12em] font-semibold text-white/45 font-outfit">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── Controls: search + sort + layout toggle ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 max-w-4xl mx-auto"
        >
          <div className="relative flex-1 group">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#FF8C00] transition-colors pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, tech, or categories…"
              aria-label="Search projects"
              className="w-full rounded-full pl-11 pr-10 py-3 text-sm text-white placeholder-white/35 border border-white/10 focus:border-white/25 focus:outline-none transition-all font-outfit"
              style={glassStyle}
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/[0.08] hover:bg-white/[0.16] flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={13} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Sort Menu */}
          <div ref={sortRef} className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white/80 hover:text-white border border-white/10 hover:border-white/25 transition-all font-outfit cursor-pointer select-none"
              style={glassStyle}
            >
              <ArrowUpDown size={14} className="text-white/50" />
              <span className="text-white/50 hidden xs:inline">Sort:</span>
              <span>{activeSortLabel}</span>
            </button>

            <AnimatePresence>
              {sortOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  role="listbox"
                  className="absolute right-0 mt-2 w-44 z-30 p-1.5 rounded-2xl border border-white/10"
                  style={glassStyle}
                >
                  {sortOptions.map((option) => {
                    const isActive = sortMode === option.id;
                    return (
                      <li key={option.id} role="option" aria-selected={isActive}>
                        <button
                          onClick={() => {
                            setSortMode(option.id);
                            setSortOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-outfit transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-white/[0.1] text-white font-semibold'
                              : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                          }`}
                        >
                          {option.label}
                        </button>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Grid / List View Mode Switcher */}
          <div 
            className="flex items-center gap-1 rounded-full p-1 border border-white/10 select-none flex-shrink-0"
            style={glassStyle}
          >
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
              title="Grid View"
              className={`p-2 sm:px-3 sm:py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                viewMode === 'grid'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              <LayoutGrid size={15} />
              <span className="hidden sm:inline">Grid</span>
            </button>

            <button
              onClick={() => setViewMode('list')}
              aria-label="List View"
              title="List View"
              className={`p-2 sm:px-3 sm:py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                viewMode === 'list'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              <List size={15} />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </motion.div>

        {/* ── Category filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mb-10 sm:mb-14 px-4 sm:px-0"
        >
          <div className="relative flex items-center bg-[#0d0d0f]/80 backdrop-blur-xl border border-white/[0.06] rounded-full p-[3px] max-w-full w-full sm:w-auto overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat, idx) => {
              const isActive = activeCategory === cat;
              const isNextActive = categories[idx + 1] === activeCategory;
              const showDivider = idx < categories.length - 1 && !isActive && !isNextActive;

              return (
                <div key={cat} className="flex-1 sm:flex-initial flex items-center">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative flex-1 sm:flex-initial w-full sm:w-auto px-4 sm:px-6 py-2 text-xs sm:text-[13px] font-semibold rounded-full text-center cursor-pointer transition-all duration-200 z-[1] select-none font-outfit whitespace-nowrap ${
                      isActive ? 'text-neutral-950 font-bold' : 'text-white/60 hover:text-white/90'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="projects-active-pill"
                        className="absolute inset-0 bg-white rounded-full z-[-1]"
                        style={{
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1), inset 0 0.5px 0 rgba(255, 255, 255, 0.4)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {cat}
                  </motion.button>
                  {/* iOS-style vertical divider */}
                  {idx < categories.length - 1 && (
                    <div
                      className="w-[1px] h-3.5 bg-white/[0.08] self-center transition-all duration-200"
                      style={{
                        opacity: showDivider ? 1 : 0,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Result meta */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <p className="text-xs sm:text-sm text-white/40 font-outfit">
            Showing <span className="text-white/80 font-semibold">{filteredProjects.length}</span>{' '}
            {filteredProjects.length === 1 ? 'project' : 'projects'}
            {activeCategory !== 'All' && (
              <> in <span className="text-white/80 font-semibold">{activeCategory}</span></>
            )}
          </p>
          {(activeCategory !== 'All' || query || sortMode !== 'featured') && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-white/50 hover:text-white transition-colors font-outfit cursor-pointer flex items-center gap-1.5"
            >
              <X size={12} />
              Reset
            </button>
          )}
        </div>

        {/* ── Grid or List Layout ── */}
        {viewMode === 'grid' ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div layout className="flex flex-col gap-4 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
                >
                  <ProjectListItem project={project} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex flex-col items-center justify-center text-center py-24"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border border-white/10"
                style={glassStyle}
              >
                <FolderOpen size={26} className="text-white/40" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5 font-jakarta">No projects found</h3>
              <p className="text-sm text-white/50 max-w-sm mb-6 font-outfit">
                Nothing matches your current filters. Try a different keyword or category.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF8C00] to-[#F43F5E] hover:opacity-90 text-xs font-bold text-white transition-all cursor-pointer shadow-[0_4px_20px_rgba(244,63,94,0.35)] active:scale-95"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
