'use client';

import { useState, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/components/sections/Work/work.data';
import {
  Layers,
  Cpu,
  Sparkles,
  Cloud,
  Code2,
  Check,
  Clock,
  Target,
  MessageSquare,
  ArrowRight,
  Briefcase,
  Star,
  LucideIcon
} from 'lucide-react';

// Tech Stack Icons (using Lucide + custom SVGs) - moved outside component
const TechIcons: Record<string, React.ReactNode> = {
  React: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
      <path fill="none" stroke="currentColor" strokeWidth="1" d="M12 21c-4.97 0-9-2.686-9-6s4.03-6 9-6 9 2.686 9 6-4.03 6-9 6Z"/>
      <path fill="none" stroke="currentColor" strokeWidth="1" d="M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9Z" transform="rotate(60 12 12)"/>
      <path fill="none" stroke="currentColor" strokeWidth="1" d="M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9Z" transform="rotate(-60 12 12)"/>
    </svg>
  ),
  'Next.js': (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-1.5 14.5V10l6 8h-2l-4-5.333V16.5h-1.5v-6l1.5 2v4Z"/>
    </svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5Zm0 2.18L18.36 7.5 12 10.82 5.64 7.5 12 4.18ZM5 8.82l6 3.32v6.36l-6-3.32V8.82Zm8 9.68V12.14l6-3.32v6.36l-6 3.32Z"/>
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M3 3h18v18H3V3Zm10.71 13.44c.33.26.78.44 1.33.54v-1.44c-.26-.09-.42-.22-.5-.4-.08-.18-.08-.44.02-.78.1-.35.3-.65.58-.9.28-.25.6-.38.96-.38.39 0 .72.12.99.38.27.25.47.55.58.9.1.34.1.6.02.78-.08.18-.24.31-.5.4v1.44c.55-.1 1-.28 1.33-.54.33-.26.55-.58.67-.96.12-.38.12-.78 0-1.2-.12-.42-.36-.8-.72-1.14-.36-.34-.82-.6-1.38-.8-.56-.2-1.18-.3-1.86-.3-.68 0-1.3.1-1.86.3-.56.2-1.02.46-1.38.8-.36.34-.6.72-.72 1.14-.12.42-.12.82 0 1.2.12.38.34.7.67.96ZM8 11h2v6H8v-6Zm4-3H6v2h6V8Z"/>
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M3 3h18v18H3V3Zm4.5 15c.83 0 1.5-.34 2-.76V15.5c-.37.36-.88.5-1.5.5-.83 0-1.5-.67-1.5-1.5v-1c0-.83.67-1.5 1.5-1.5.62 0 1.13.14 1.5.5v-1.74c-.5-.42-1.17-.76-2-.76-1.66 0-3 1.34-3 3v1c0 1.66 1.34 3 3 3Zm7.5 0c.83 0 1.5-.34 2-.76V15.5c-.37.36-.88.5-1.5.5-.83 0-1.5-.67-1.5-1.5v-4h3V9h-3V7h-2v7.5c0 1.66 1.34 3 3 3Z"/>
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12 2C9.24 2 7 4.24 7 7c0 2.85 2.92 7.21 5 9.88 2.08-2.67 5-7.03 5-9.88 0-2.76-2.24-5-5-5Zm0 7.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/>
      <path d="M12 22c-.55 0-1-.45-1-1v-3h2v3c0 .55-.45 1-1 1Z"/>
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm-1-13h2v6h-2V7Zm0 8h2v2h-2v-2Z"/>
    </svg>
  ),
  OpenAI: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M22.2 11.2c.4-1.3.2-2.8-.6-4-1.2-1.9-3.5-2.7-5.6-2.1-.8-.9-1.9-1.6-3.2-1.8-2.2-.4-4.4.6-5.5 2.5-1.2-.1-2.4.3-3.4 1.2-1.5 1.4-1.9 3.6-1 5.4-.4 1.3-.2 2.8.6 4 1.2 1.9 3.5 2.7 5.6 2.1.8.9 1.9 1.6 3.2 1.8 2.2.4 4.4-.6 5.5-2.5 1.2.1 2.4-.3 3.4-1.2 1.5-1.4 1.9-3.6 1-5.4Z"/>
    </svg>
  ),
  TensorFlow: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12 2 4 6v12l8 4 8-4V6l-8-4Zm6 14.5-6 3-6-3v-9l6-3 6 3v9Z"/>
    </svg>
  ),
  LangChain: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-1-13h2v6h-2V7Zm0 8h2v2h-2v-2Z"/>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12 2c-1.66 0-3 1.34-3 3v2H6c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h1v3c0 1.66 1.34 3 3 3h4c1.66 0 3-1.34 3-3v-2h3c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-1V5c0-1.66-1.34-3-3-3h-4Zm-1 3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1Zm2 12c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z"/>
    </svg>
  ),
  'Framer Motion': (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M4 4h16v5.33H9.33L4 4Zm0 5.33h5.33L14.67 14.67H4V9.33Zm0 5.34h10.67l5.33 5.33H4v-5.33Z"/>
    </svg>
  ),
  'Three.js': (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12 2L2 19.5h20L12 2Zm0 4l6.5 11.5h-13L12 6Z"/>
    </svg>
  ),
  GSAP: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 3c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7Z"/>
    </svg>
  ),
  WebGL: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  Stripe: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305Z"/>
    </svg>
  ),
  Auth0: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5Zm0 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"/>
    </svg>
  ),
  Redis: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 14.5L5.5 12 12 7.5l6.5 4.5-6.5 4.5Z"/>
    </svg>
  ),
  REST: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16v4H4V4Zm0 6h16v4H4v-4Zm0 6h16v4H4v-4Z"/>
    </svg>
  ),
  GraphQL: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.18L18.36 7.5 12 10.82 5.64 7.5 12 4.18ZM5 8.82l6 3.32v6.36l-6-3.32V8.82Zm8 9.68V12.14l6-3.32v6.36l-6 3.32Z"/>
    </svg>
  ),
  Prisma: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2 2 22h20L12 2Zm0 4 7 14H5l7-14Z"/>
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M13 3h2v2h-2V3Zm-3 0h2v2h-2V3Zm-3 0h2v2H7V3ZM4 6h2v2H4V6Zm3 0h2v2H7V6Zm3 0h2v2h-2V6Zm3 0h2v2h-2V6Zm3 0h2v2h-2V6ZM4 9h2v2H4V9Zm3 0h2v2H7V9Zm3 0h2v2h-2V9Zm3 0h2v2h-2V9Zm5.5 0c2.49 0 4.5 2.01 4.5 4.5S20.49 18 18 18H3v-4h17v4h-2.5c1.38 0 2.5-1.12 2.5-2.5S18.88 13 17.5 13H3V9h16.5Z"/>
    </svg>
  ),
  MySQL: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm8.5-4.43c-.19-.46-.57-.8-.94-.97L15 13v-2c0-.55-.45-1-1-1h-4v-2h2c.55 0 1-.45 1-1V5.5c2.33.67 4.07 2.71 4.38 5.18l1.62.82c-.08.68-.26 1.34-.5 1.98v1.02Z"/>
    </svg>
  ),
  'Scikit-learn': (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5Zm0 10L2 17l10 5 10-5-10-5Z"/>
    </svg>
  ),
  NLTK: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  'Tailwind CSS': (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.002 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.002 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
    </svg>
  ),
  'CSS Grid/Flexbox': (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
    </svg>
  ),
  Supabase: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M21.362 9.356H12.83l5.656-7.856a.5.5 0 0 0-.6-.756L6.225 7.15c-.412.18-.58.656-.375 1.05.08.156.22.28.388.344h8.53l-5.656 7.856a.5.5 0 0 0 .6.756l11.662-7.4a.5.5 0 0 0-.062-.9z"/>
    </svg>
  ),
  'Auth / RLS': (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  'Express.js': (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  'MySQL Triggers': (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
};

// Expertise Data
interface TechStackItem {
  name: string;
  color: string;
  level: number; // Proficiency percentage (e.g. 95)
}

interface ExpertiseItem {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  techStack: TechStackItem[];
  highlights: string[];
  stats: {
    projects: string;
    experience: string;
  };
}

// Expertise configurations type definitions

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15 },
  },
};

const dividerVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
  },
};

const techStackItemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.35 + index * 0.04,
      type: 'spring' as const,
      stiffness: 500,
      damping: 25,
    },
  }),
};

const highlightItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.45 + index * 0.06,
      type: 'spring' as const,
      stiffness: 400,
      damping: 25,
    },
  }),
};

const footerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6,
      type: 'spring' as const,
      stiffness: 300,
      damping: 25,
    },
  },
};

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
      staggerChildren: 0.04,
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

const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const leftCardVariants = {
  hidden: { 
    opacity: 0, 
    x: -30, 
    rotateY: -8,
    transformPerspective: 1000
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    rotateY: 0,
    transition: { 
      type: 'spring' as const,
      stiffness: 140,
      damping: 20,
      mass: 1.0
    }
  }
};

const rightCardVariants = {
  hidden: { 
    opacity: 0, 
    x: 30, 
    rotateY: 8,
    transformPerspective: 1000
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    rotateY: 0,
    transition: { 
      type: 'spring' as const,
      stiffness: 140,
      damping: 20,
      mass: 1.0
    }
  }
};

export default function ExpertiseShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const overallExp = useMemo(() => currentYear - 2025, [currentYear]);

  const expertiseData = useMemo<ExpertiseItem[]>(() => {
    const fullstackCount = projects.filter(p => 
      p.techStack.some(t => ['React', 'Next.js', 'Node.js', 'Express.js', 'Express', 'Supabase (PostgreSQL + Auth)', 'TypeScript', 'MongoDB', 'MySQL'].includes(t))
    ).length;

    const aiCount = projects.filter(p => 
      p.techStack.some(t => ['Python', 'OpenAI API', 'Scikit-learn', 'NLTK', 'Pandas', 'NumPy'].includes(t))
    ).length;

    const creativeCount = projects.filter(p => 
      p.techStack.some(t => ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'GSAP'].includes(t))
    ).length;

    const saasCount = projects.filter(p => 
      p.category?.toLowerCase().includes('saas') || 
      p.category?.toLowerCase().includes('commerce') || 
      p.techStack.some(t => ['Stripe', 'Supabase (PostgreSQL + Auth)', 'Supabase'].includes(t))
    ).length;

    const apiCount = projects.filter(p => 
      p.techStack.some(t => ['Node.js', 'Express.js', 'Express', 'MySQL', 'Supabase (PostgreSQL + Auth)', 'REST API', 'PostgreSQL', 'Prisma'].includes(t))
    ).length;

    return [
      {
        id: 'fullstack',
        icon: Layers,
        title: 'Full Stack Development',
        subtitle: 'End-to-End Web Applications',
        description: 'Building complete, transaction-safe web platforms with robust database schemas, secure session management, and highly optimized search capabilities. I focus on creating high-performance, modular architectures.',
        techStack: [
          { name: 'React', color: '#61DAFB', level: 95 },
          { name: 'Next.js', color: '#ffffff', level: 95 },
          { name: 'Node.js', color: '#339933', level: 90 },
          { name: 'TypeScript', color: '#3178C6', level: 92 },
          { name: 'MongoDB', color: '#47A248', level: 88 },
          { name: 'MySQL', color: '#336791', level: 85 },
        ],
        highlights: [
          'Production Next.js (App Router) & React architectures',
          'Transaction-safe database operations (MySQL, MongoDB, PostgreSQL)',
          'Performance optimization (Lighthouse audits & fast page load)',
          'Responsive MERN & Next.js layouts with clean state flows',
        ],
        stats: { projects: `${fullstackCount} Projects`, experience: `${currentYear - 2025}+ Years` },
      },
      {
        id: 'ai',
        icon: Cpu,
        title: 'AI & ML Integration',
        subtitle: 'Intelligent Systems',
        description: 'Integrating cutting-edge language models and text classifiers into production-ready platforms. I build semantic search tools, conversational agents, and data preprocessing pipelines.',
        techStack: [
          { name: 'OpenAI', color: '#00A67E', level: 88 },
          { name: 'Python', color: '#3776AB', level: 90 },
          { name: 'Scikit-learn', color: '#FF6F00', level: 82 },
          { name: 'NLTK', color: '#3B82F6', level: 85 },
        ],
        highlights: [
          'Intelligent recommendation engines (Devory)',
          'NLP text classification & spam filtering (Spam Detection)',
          'OpenAI Function Calling & structured JSON parsing',
          'Semantic caching & LLM rate-limit management',
        ],
        stats: { projects: `${aiCount} Projects`, experience: `1.5 Years` },
      },
      {
        id: 'creative',
        icon: Sparkles,
        title: 'Creative Development',
        subtitle: 'Premium Interfaces',
        description: 'Developing rich user interfaces with fluid animations, custom layouts, and interactive visuals. I combine clean styling conventions with visual choreography to create highly polished portfolio sites.',
        techStack: [
          { name: 'Framer Motion', color: '#BB4B96', level: 92 },
          { name: 'Tailwind CSS', color: '#06B6D4', level: 95 },
          { name: 'CSS Grid/Flexbox', color: '#FF5733', level: 95 },
          { name: 'GSAP', color: '#88CE02', level: 80 },
        ],
        highlights: [
          'Fluid transition animations & page fades (Journey Timeline)',
          'Dynamic parallax & sticky-scroll layouts',
          'Micro-animations, spring physics & hover feedbacks',
          'Zero-layout-shift responsive components',
        ],
        stats: { projects: `${creativeCount} Projects`, experience: `${currentYear - 2025}+ Years` },
      },
      {
        id: 'saas',
        icon: Cloud,
        title: 'SaaS Platforms',
        subtitle: 'Scale & Multi-Tenancy',
        description: 'Engineering SaaS-style dashboards with secure authentication, isolated tenant workspaces, and real-time activity metrics. Built with a focus on data privacy and analytics.',
        techStack: [
          { name: 'Supabase', color: '#3ECF8E', level: 88 },
          { name: 'Stripe', color: '#635BFF', level: 85 },
          { name: 'MongoDB', color: '#47A248', level: 88 },
          { name: 'Auth / RLS', color: '#F00000', level: 90 },
        ],
        highlights: [
          'Multi-user progress dashboards & trackers (AI/ML Tracker)',
          'Stripe webhook checkout & stock pipelines (Moungiri Store)',
          'Row Level Security (RLS) policies in PostgreSQL',
          'Real-time activity logs & metric counters',
        ],
        stats: { projects: `${saasCount} Projects`, experience: `${currentYear - 2025}+ Years` },
      },
      {
        id: 'api',
        icon: Code2,
        title: 'API & System Design',
        subtitle: 'Robust Backend Systems',
        description: 'Designing modular backend systems and RESTful APIs with clean folder architecture. I construct secure endpoints, write analytical database queries, and integrate third-party webhooks.',
        techStack: [
          { name: 'REST', color: '#009688', level: 92 },
          { name: 'Express.js', color: '#ffffff', level: 90 },
          { name: 'MySQL Triggers', color: '#336791', level: 85 },
          { name: 'PostgreSQL', color: '#2D3748', level: 88 },
        ],
        highlights: [
          'Secure endpoints & token authentication',
          'Automated database triggers & transaction safety (DBMS project)',
          'Integration of OpenWeather & OpenAI API services (Safecoast)',
          'Clean MVC backend folder architecture',
        ],
        stats: { projects: `${apiCount} Projects`, experience: `${currentYear - 2025}+ Years` },
      },
    ];
  }, [currentYear]);

  const activeItem = expertiseData[activeIndex];

  const handleTabClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="relative py-16 xs:py-18 sm:py-20 md:py-24 overflow-hidden bg-[#0F0E0E]">
      <div className="relative z-10 max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
          variants={headerContainerVariants}
          className="text-center mb-10 xs:mb-12 sm:mb-14 md:mb-16"
        >
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-4 text-[#C2EF3A] text-xs font-semibold tracking-wider uppercase font-outfit"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#C2EF3A] flex items-center justify-center text-[#0F0E0E] flex-shrink-0">
              <svg className="w-[50%] h-[50%]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
              </svg>
            </div>
            <span>My Core Expertise</span>
          </motion.div>
          
          <motion.h2
            variants={titleContainerVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-white max-w-2xl mx-auto font-jakarta flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.05em]"
          >
            {"Professional disciplines engineered for high performance.".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden py-0.5">
                <motion.span
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>
        </motion.div>

        {/* Split Screen Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
          variants={cardContainerVariants}
          className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-4 xs:gap-5 sm:gap-6 lg:gap-8 items-stretch"
        >
          {/* Left Side - Tab Navigation Panel */}
          <motion.div 
            variants={leftCardVariants}
            className="relative flex flex-col justify-between rounded-[30px] border border-white/[0.04] p-5 xs:p-6 lg:p-7 xl:p-8 overflow-hidden h-full"
            style={{
              background: 'linear-gradient(180deg, rgba(30, 28, 28, 0.45) 0%, rgba(21, 19, 19, 0.95) 100%)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)',
            }}
          >
            {/* Glossy sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.02] pointer-events-none" />

            {/* Content wrapper */}
            <div className="relative z-10 flex flex-col gap-5 lg:gap-6 flex-1 justify-start">
              <div className="hidden lg:block">
                <p className="text-[10px] font-mono font-bold tracking-[0.15em] text-white/35 uppercase mb-1">
                  Disciplines
                </p>
                <h3 className="text-sm font-extrabold text-white font-jakarta tracking-tight">
                  Expertise Areas
                </h3>
              </div>

              {/* Tab items list */}
              <div 
                className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-hide -mx-4 xs:-mx-5 sm:-mx-6 px-4 xs:px-5 sm:px-6 lg:mx-0 lg:px-0"
                data-lenis-prevent
              >
                {expertiseData.map((item, index) => (
                  <TabItem
                    key={item.id}
                    item={item}
                    isActive={activeIndex === index}
                    onClick={handleTabClick}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Footer - Compact Stats Row */}
            <div className="relative z-10 flex lg:flex-row items-center gap-3 mt-6 pt-4 border-t border-white/[0.04]">
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-[16px] bg-[#0E0D0D] border border-white/[0.03] flex-1 justify-center lg:justify-start">
                <Clock className="w-3.5 h-3.5 text-[#C2EF3A]" />
                <span className="text-[10px] font-bold font-mono text-white/55 uppercase tracking-wide whitespace-nowrap">
                  {overallExp < 10 ? `0${overallExp}` : overallExp}+ Years Exp
                </span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-[16px] bg-[#0E0D0D] border border-white/[0.03] flex-1 justify-center lg:justify-start">
                <Target className="w-3.5 h-3.5 text-[#C2EF3A]" />
                <span className="text-[10px] font-bold font-mono text-white/55 uppercase tracking-wide whitespace-nowrap">
                  {projects.length < 10 ? `0${projects.length}` : projects.length}+ Projects
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Preview Area */}
          <motion.div
            variants={rightCardVariants}
            className="relative rounded-[30px] border border-white/[0.04] overflow-hidden h-full flex flex-col"
            style={{
              background: 'linear-gradient(180deg, rgba(30, 28, 28, 0.45) 0%, rgba(21, 19, 19, 0.95) 100%)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)',
            }}
          >
            {/* Glossy sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.02] pointer-events-none" />

            {/* Subtle gradient orb */}
            <div
              className="absolute top-0 right-0 w-[200px] xs:w-[300px] sm:w-[400px] h-[200px] xs:h-[300px] sm:h-[400px] pointer-events-none opacity-20"
              style={{
                background: 'radial-gradient(circle at 80% 20%, rgba(194, 239, 58, 0.15) 0%, transparent 60%)',
              }}
              aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-10 p-5 xs:p-6 sm:p-7 md:p-8 lg:p-10 flex-1 flex flex-col">
              <AnimatePresence mode="wait">
                <PreviewContent key={activeItem.id} item={activeItem} />
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// Tab Item Component - styled like Bento Grid cards
const TabItem = memo(function TabItem({
  item,
  isActive,
  onClick,
  index,
}: {
  item: ExpertiseItem;
  isActive: boolean;
  onClick: (index: number) => void;
  index: number;
}) {
  const handleClick = useCallback(() => {
    onClick(index);
  }, [onClick, index]);

  const Icon = item.icon;

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ y: -2, scale: 1.01 }}
      className={`group relative flex items-center gap-3 lg:gap-4 p-3.5 sm:p-4 rounded-[20px] min-w-[150px] sm:min-w-[180px] lg:min-w-0 w-full text-left overflow-hidden flex-shrink-0 lg:flex-shrink transition-all duration-300 ${
        isActive ? 'border-white/10' : 'border-white/[0.04]'
      }`}
      style={{
        background: isActive
          ? 'linear-gradient(180deg, rgba(40, 36, 36, 0.6) 0%, rgba(26, 23, 23, 0.95) 100%)'
          : 'linear-gradient(180deg, rgba(30, 28, 28, 0.4) 0%, rgba(21, 19, 19, 0.85) 100%)',
        boxShadow: isActive 
          ? '0 6px 20px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)'
          : '0 4px 12px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.02)',
        borderWidth: '1px',
      }}
    >
      {/* Glossy sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.02] pointer-events-none" />

      {/* Active indicator bar - bottom on mobile, left on desktop */}
      {isActive && (
        <motion.div 
          layoutId="activeIndicator"
          className="absolute left-3.5 right-3.5 lg:left-0 bottom-0 lg:bottom-3.5 lg:top-3.5 h-[2px] lg:h-auto w-auto lg:w-[3px] rounded-t-full lg:rounded-r-full bg-[#C2EF3A]"
          style={{
            boxShadow: '0 0 8px rgba(194, 239, 58, 0.6)'
          }}
        />
      )}

      {/* Icon Box */}
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] flex items-center justify-center border transition-all duration-300 ${
          isActive 
            ? 'bg-[#C2EF3A]/10 border-[#C2EF3A]/30 text-[#C2EF3A]' 
            : 'bg-white/5 border-white/5 text-white/50 group-hover:text-white/80 group-hover:bg-white/10'
        }`}
      >
        <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
      </div>

      {/* Text block */}
      <div className="flex-1 min-w-0">
        <h3
          className={`text-[12px] sm:text-[13px] font-bold font-jakarta truncate transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
          }`}
        >
          {item.title}
        </h3>
        <p
          className={`text-[9px] sm:text-[10px] font-medium font-jakarta truncate transition-colors duration-300 ${
            isActive ? 'text-white/45' : 'text-white/30 group-hover:text-white/40'
          }`}
        >
          {item.subtitle}
        </p>
      </div>
    </motion.button>
  );
});

// Preview Content Component
const PreviewContent = memo(function PreviewContent({ item }: { item: ExpertiseItem }) {
  const Icon = item.icon;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col flex-grow justify-between gap-6 h-full"
      style={{ contain: 'layout style' }}
    >
      <div className="flex-1 flex flex-col justify-start">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5 sm:mb-6">
          <div className="flex items-center gap-3">
            {/* Large Icon Box */}
            <div
              className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-[16px] flex items-center justify-center text-[#C2EF3A] border"
              style={{
                background: 'linear-gradient(135deg, rgba(194, 239, 58, 0.1) 0%, rgba(194, 239, 58, 0.02) 100%)',
                borderColor: 'rgba(194, 239, 58, 0.25)',
                boxShadow: '0 4px 20px rgba(194, 239, 58, 0.12)',
              }}
            >
              <Icon className="w-5.5 h-5.5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>

            <div className="min-w-0">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-0.5 truncate font-jakarta">
                {item.title}
              </h3>
              <p className="text-[10px] xs:text-xs sm:text-sm font-bold text-[#C2EF3A] tracking-wider uppercase font-mono">
                {item.subtitle}
              </p>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0E0D0D] border border-white/[0.04] text-[10px] sm:text-[11px] font-mono font-bold text-white/55 select-none uppercase tracking-wide">
              <Briefcase className="w-3.5 h-3.5 text-[#C2EF3A]" />
              <span>{item.stats.projects}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0E0D0D] border border-white/[0.04] text-[10px] sm:text-[11px] font-mono font-bold text-white/55 select-none uppercase tracking-wide">
              <Star className="w-3.5 h-3.5 text-[#C2EF3A]" />
              <span>{item.stats.experience}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed text-white/50 mb-6 max-w-3xl font-jakarta"
        >
          {item.description}
        </motion.p>

        {/* Animated Divider */}
        <motion.div
          variants={dividerVariants}
          className="h-px bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04] mb-6 origin-left"
        />

        {/* Tech Stack Grid */}
        <motion.div variants={itemVariants} className="mb-6">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 font-mono font-bold mb-3">
            Tech Stack & Proficiency
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
            {item.techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                variants={techStackItemVariants}
                custom={index}
                className="group relative flex items-center justify-between px-3.5 py-2.5 rounded-[16px] border border-white/[0.04] hover:border-white/[0.12] transition-all duration-300 bg-neutral-900/40 cursor-default select-none shadow-sm"
                style={{
                  background: 'linear-gradient(180deg, rgba(24, 22, 22, 0.45) 0%, rgba(14, 13, 13, 0.95) 100%)',
                  boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.01)'
                }}
              >
                {/* Glossy sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.005] to-transparent rounded-[16px] pointer-events-none" />

                <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                  <span style={{ color: tech.color }} className="flex-shrink-0 [&>svg]:w-4.5 [&>svg]:h-4.5">
                    {TechIcons[tech.name] || <Code2 className="w-4.5 h-4.5" />}
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold font-jakarta text-white/80 truncate group-hover:text-white transition-colors duration-200">{tech.name}</span>
                </div>

                {/* Progress visual bar */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0 w-16">
                  <span className="text-[9px] font-mono font-bold text-white/40 group-hover:text-[#C2EF3A] transition-colors duration-200">{tech.level}%</span>
                  <div className="w-full h-1 bg-[#1C1A1A] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#C2EF3A]/60 to-[#C2EF3A] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.04, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Highlights */}
        <motion.div variants={itemVariants} className="mb-6">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 font-mono font-bold mb-3">
            Core Focus & Competencies
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {item.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={highlightItemVariants}
                custom={index}
                className="flex items-start gap-2.5 group cursor-default hover:translate-x-0.5 transition-transform duration-200"
              >
                <div
                  className="flex-shrink-0 w-[18px] h-[18px] rounded-[6px] flex items-center justify-center mt-0.5 bg-[#C2EF3A]/10 border border-[#C2EF3A]/20 group-hover:scale-105 transition-transform duration-200"
                >
                  <Check className="w-3 h-3 text-[#C2EF3A]" />
                </div>
                <span className="text-[11px] sm:text-xs text-white/55 leading-relaxed font-jakarta group-hover:text-white/80 transition-colors duration-200">
                  {highlight}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer CTA */}
      <motion.div
        variants={footerVariants}
        className="pt-4 border-t border-white/[0.04] mt-auto"
      >
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4">
          <div className="flex items-center gap-3 hover:translate-x-0.5 transition-transform duration-200">
            <div
              className="w-10 h-10 rounded-[12px] flex items-center justify-center border hover:scale-110 transition-transform duration-200 bg-[#C2EF3A]/10 border-[#C2EF3A]/20 text-[#C2EF3A]"
            >
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[12px] sm:text-[13px] font-bold text-white font-jakarta">Interested in this service?</p>
              <p className="text-[10px] sm:text-[11px] text-white/30 font-jakarta">Let&apos;s discuss your project</p>
            </div>
          </div>
          <a
            href="#contact"
            className="group flex items-center gap-2 px-4 py-2.5 rounded-[16px] border border-white/[0.05] hover:border-[#C2EF3A]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full xs:w-auto justify-center xs:justify-start"
            style={{
              background: 'linear-gradient(135deg, rgba(194, 239, 58, 0.1) 0%, rgba(194, 239, 58, 0.02) 100%)',
              boxShadow: '0 2px 12px rgba(194, 239, 58, 0.05)',
            }}
          >
            <span className="text-[12px] font-bold text-white/85 group-hover:text-white transition-colors duration-200 font-jakarta">
              Get in Touch
            </span>
            <NavbarArrowRight />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
});

// Small helper component to wrap arrow rendering to avoid build/import/lint issues
const NavbarArrowRight = () => {
  return <ArrowRight className="w-4 h-4 text-[#C2EF3A] group-hover:translate-x-0.5 transition-transform duration-200" />;
};
