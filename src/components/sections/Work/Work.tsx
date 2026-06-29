'use client';

import { useState, useCallback, memo, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { projects } from './work.data';
import ProjectCard from './ProjectCard';

const INITIAL_PROJECTS_COUNT = 3;
const categories = ['All', 'AI & ML', 'Full-Stack', 'Web Apps'] as const;
type Category = typeof categories[number];

// Scroll-triggered counter helper component
const Counter = memo(function Counter({ value, duration = 1.8 }: { value: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-10%" });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: duration,
        ease: 'easeOut',
      });
      return () => controls.stop();
    } else {
      count.set(0);
    }
  }, [inView, count, value, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
});

// Memoized stats component
const Stats = memo(function Stats() {
  return (
    <div className="flex items-center justify-center gap-6 xs:gap-8 sm:gap-14 md:gap-16 mt-8 sm:mt-10 md:mt-12 select-none">
      <div className="text-center">
        <span className="block text-4xl xs:text-5xl sm:text-6xl font-black font-outfit text-white tracking-tight leading-none mb-1.5 sm:mb-2">
          <Counter value={projects.length} />
        </span>
        <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest font-bold">
          Projects
        </span>
      </div>
      
      <div className="w-px h-10 sm:h-12 bg-white/10" />
      
      <div className="text-center">
        <span className="block text-4xl xs:text-5xl sm:text-6xl font-black font-outfit text-white tracking-tight leading-none mb-1.5 sm:mb-2">
          <Counter value={15} />+
        </span>
        <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest font-bold">
          Technologies
        </span>
      </div>
      
      <div className="w-px h-10 sm:h-12 bg-white/10" />
      
      <div className="text-center">
        <span className="block text-4xl xs:text-5xl sm:text-6xl font-black font-outfit text-white tracking-tight leading-none mb-1.5 sm:mb-2">
          <Counter value={4} />
        </span>
        <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest font-bold">
          Industries
        </span>
      </div>
    </div>
  );
});

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
    y: '105%', 
    rotateX: 70,
    opacity: 0
  },
  visible: {
    y: '0%',
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const
    }
  }
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  }
};

const statsContainerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.35,
      ease: 'easeOut' as const
    }
  }
};

const projectHeadings = [
  "Engineered Digital Products",
  "Architected Software Solutions",
  "Featured Creative Works",
  "Crafted Code Creations",
  "Designed Scalable Systems",
  "Innovated Web Applications"
];

export default function Work() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [showAll, setShowAll] = useState(false);
  const [headingIndex, setHeadingIndex] = useState(0);

  useEffect(() => {
    // Pick random index on refresh/mount
    const randomIndex = Math.floor(Math.random() * projectHeadings.length);
    setHeadingIndex(randomIndex);

    const interval = setInterval(() => {
      setHeadingIndex((prev) => (prev + 1) % projectHeadings.length);
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Filter projects dynamically based on category selection
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeCategory === 'All') return true;
      if (activeCategory === 'AI & ML') {
        return project.techStack.some((t) =>
          ['Python', 'Scikit-learn', 'TensorFlow', 'OpenAI API'].includes(t)
        );
      }
      if (activeCategory === 'Full-Stack') {
        return project.techStack.some((t) =>
          ['Node.js', 'Express.js', 'MySQL', 'MongoDB', 'PostgreSQL', 'Supabase (PostgreSQL + Auth)', 'Prisma'].includes(t)
        );
      }
      if (activeCategory === 'Web Apps') {
        return project.techStack.some((t) =>
          ['Next.js', 'React', 'Tailwind CSS'].includes(t)
        );
      }
      return true;
    });
  }, [activeCategory]);

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_PROJECTS_COUNT);
  const remainingCount = filteredProjects.length - INITIAL_PROJECTS_COUNT;

  const handleCategoryChange = useCallback((cat: Category) => {
    setActiveCategory(cat);
    setShowAll(false); // Reset list expansion on tab change
  }, []);

  return (
    <section
      id="work"
      className="relative z-20 py-16 sm:py-20 md:py-28 lg:py-32 bg-[#0F0E0E] overflow-hidden"
      aria-label="Featured Projects Portfolio"
      itemScope
      itemType="https://schema.org/CreativeWork"
      style={{ contain: 'layout style' }}
    >



      <div className="relative z-20">
      {/* SEO Microdata */}
      <meta itemProp="name" content="Featured Projects - Rameshwar Bhagwat Portfolio" />
      <meta
        itemProp="description"
        content="Showcase of full-stack and AI-focused web development projects including WebCraft, Safecoast, and AI ML Progress Tracker, built with React, Next.js, TypeScript, and modern scalable architecture."
      />
      <meta itemProp="author" content="Rameshwar Bhagwat" />

      {/* Hidden SEO Content */}
      <div className="sr-only">
        <h2>Featured Projects Portfolio - Full Stack & AI Web Development</h2>
        <p>
          Explore a curated collection of production-ready applications built by Rameshwar
          Bhagwat, highlighting modern full stack engineering and AI-focused product development.
        </p>
        <h3>Project Highlights</h3>
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <h4>{project.title}</h4>
              <p>
                {project.tagline} - {project.description}
              </p>
              <p>Technologies: {project.techStack.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Header Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }}
        variants={headerContainerVariants}
        className="container mx-auto px-4 sm:px-6 mb-10 sm:mb-12"
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Label */}
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-4 text-[#F43F5E] text-xs font-semibold tracking-wider uppercase font-outfit"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#F43F5E] flex items-center justify-center text-[#0F0E0E] flex-shrink-0">
              <svg className="w-[50%] h-[50%]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
              </svg>
            </div>
            <span>Portfolio</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            key={headingIndex}
            initial="hidden"
            animate="visible"
            variants={titleContainerVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.02em] leading-[0.95] mb-4 sm:mb-5 flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.05em]"
            style={{ perspective: 1200 }}
          >
            {projectHeadings[headingIndex].split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden py-1">
                <motion.span
                  variants={wordVariants}
                  className="inline-block origin-top text-white"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          {/* Animated line */}
          <motion.div
            className="flex justify-center mb-5 sm:mb-6"
            variants={lineVariants}
            style={{ transformOrigin: 'center' }}
          >
            <div
              className="h-[2px] w-20 sm:w-28 md:w-36"
              style={{
                background:
                  'linear-gradient(90deg, transparent, #FF8C00, #FF1493, #FF8C00, transparent)',
              }}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={descriptionVariants}
            className="text-sm sm:text-base md:text-lg text-white/50 leading-relaxed max-w-2xl mx-auto font-outfit"
          >
            A curated collection of full-stack applications showcasing modern web technologies, AI integrations, and native experiences.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={statsContainerVariants}
          >
            <Stats />
          </motion.div>
        </div>
      </motion.div>

      {/* iOS Segmented Control Switcher */}
      <div className="flex justify-center mb-10 sm:mb-14 px-4 sm:px-0">
        <div className="relative flex items-center bg-[#0d0d0f]/80 backdrop-blur-xl border border-white/[0.06] rounded-full p-[3px] max-w-md w-full sm:w-auto overflow-hidden">
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat;
            const isNextActive = categories[idx + 1] === activeCategory;
            const showDivider = idx < categories.length - 1 && !isActive && !isNextActive;

            return (
              <div key={cat} className="flex-1 sm:flex-initial flex items-center">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleCategoryChange(cat)}
                  className={`relative flex-1 sm:flex-initial w-full sm:w-auto px-4 sm:px-6 py-2 text-xs sm:text-[13px] font-semibold rounded-full text-center cursor-pointer transition-all duration-200 z-[1] select-none font-outfit ${
                    isActive ? 'text-neutral-950 font-bold' : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="segmented-active"
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
      </div>

      {/* Project Cards Grid */}
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard 
                  project={project} 
                  index={index} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* See More / Show Less Button */}
      {filteredProjects.length > INITIAL_PROJECTS_COUNT && (
        <div className="container mx-auto px-4 sm:px-6 mt-16 sm:mt-20 md:mt-24 flex flex-col items-center justify-center">
          {/* Decorative divider */}
          <div
            className="w-px h-12 mb-8"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1), transparent)',
            }}
          />

          <motion.button
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group glowing-border-btn-blue px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base text-white transition-all duration-300 inline-flex items-center gap-3 opacity-90 hover:opacity-100 cursor-pointer select-none font-outfit"
          >
            {/* Inner dark background mask */}
            <div className="absolute inset-0 rounded-full bg-[#0F0E0E]/95 backdrop-blur-xl z-0 pointer-events-none transition-colors duration-300 group-hover:bg-[#0F0E0E]" />

            <span className="relative z-10 text-sm font-semibold tracking-wider text-white/80 group-hover:text-white transition-colors">
              {showAll ? 'Show Less' : `Explore ${remainingCount} More Project${remainingCount > 1 ? 's' : ''}`}
            </span>

            {/* Dynamic Rotating Chevron */}
            <motion.svg
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative z-10 w-4 h-4 text-white/60 group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>
        </div>
      )}

      {/* iOS-Style Project Case Study Detail Modal Sheet */}
      </div>
    </section>
  );
}
