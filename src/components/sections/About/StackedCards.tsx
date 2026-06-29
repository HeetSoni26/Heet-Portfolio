'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

// SVG Icons for each service
const icons = {
  fullstack: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  creative: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  saas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  api: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
  ),
};

interface ServiceCard {
  id: keyof typeof icons;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  skills: string[];
}

const services: ServiceCard[] = [
  {
    id: 'fullstack',
    title: 'Full Stack',
    subtitle: 'End-to-End Development',
    description:
      'Building complete web applications from database to pixel-perfect UI.',
    image: '/images/Stack cards/pankaj-patel-vxgt_Zu0O00-unsplash.jpg',
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript'],
  },
  {
    id: 'ai',
    title: 'AI Integration',
    subtitle: 'Intelligent Solutions',
    description:
      'Integrating AI/ML capabilities into production apps with custom pipelines.',
    image: '/images/Stack cards/jakub-zerdzicki-FjtWczJWRlc-unsplash.jpg',
    skills: ['OpenAI', 'TensorFlow', 'LangChain', 'Python'],
  },
  {
    id: 'creative',
    title: 'Creative Dev',
    subtitle: 'Visual Excellence',
    description:
      'Crafting animated, immersive websites with stunning visual effects.',
    image: '/images/Stack cards/amza-andrei-Bss5nhYnLKU-unsplash.jpg',
    skills: ['Framer Motion', 'Three.js', 'GSAP', 'WebGL'],
  },
  {
    id: 'saas',
    title: 'SaaS Platforms',
    subtitle: 'Scalable Products',
    description:
      'Building multi-tenant SaaS products with auth, payments & dashboards.',
    image: '/images/Stack cards/jakub-zerdzicki-O3ChbcT94NM-unsplash.jpg',
    skills: ['Stripe', 'Auth0', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'api',
    title: 'API Development',
    subtitle: 'Backend Architecture',
    description:
      'Designing RESTful and GraphQL APIs with microservice architecture.',
    image: '/images/Stack cards/sebastian-willius-GKCpRs0rcNY-unsplash.jpg',
    skills: ['REST', 'GraphQL', 'Prisma', 'Docker'],
  },
];

// Desktop grid positions (3 top + 2 bottom, pyramid style) - more spread out
const desktopPositions = [
  { x: -340, y: -130, rotation: -5 },
  { x: 0, y: -150, rotation: 2 },
  { x: 340, y: -130, rotation: -3 },
  { x: -170, y: 150, rotation: 4 },
  { x: 170, y: 150, rotation: -4 },
];

// Tablet positions - more spread
const tabletPositions = [
  { x: -200, y: -110, rotation: -4 },
  { x: 0, y: -130, rotation: 2 },
  { x: 200, y: -110, rotation: -3 },
  { x: -100, y: 140, rotation: 3 },
  { x: 100, y: 140, rotation: -3 },
];

// Mobile positions (stacked vertically with slight offsets)
const mobilePositions = [
  { x: 0, y: -300, rotation: -2 },
  { x: 0, y: -150, rotation: 1 },
  { x: 0, y: 0, rotation: -1 },
  { x: 0, y: 150, rotation: 2 },
  { x: 0, y: 300, rotation: -1 },
];

export default function StackedCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Mark animation as complete when section comes into view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated]);

  const positions =
    screenSize === 'mobile'
      ? mobilePositions
      : screenSize === 'tablet'
      ? tabletPositions
      : desktopPositions;

  const containerHeight =
    screenSize === 'mobile' ? '850px' : screenSize === 'tablet' ? '580px' : '680px';

  return (
    <div className="relative bg-[#0F0E0E] py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-12 md:mb-16 px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-primary-gradient text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 sm:mb-3"
        >
          What I Do
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-[-0.02em]"
          style={{ fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif' }}
        >
          My{' '}
          <span
            className="text-rainbow-gradient italic font-bold px-1"
            style={{
              fontFamily: 'var(--font-instrument), Georgia, serif',
              textTransform: 'none',
            }}
          >
            Expertise
          </span>
        </motion.h2>
      </div>

      {/* Cards Container */}
      <div
        ref={containerRef}
        className="relative mx-auto px-4"
        style={{
          height: containerHeight,
          maxWidth: '1400px',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {services.map((card, index) => (
            <ServiceCardItem
              key={card.id}
              card={card}
              index={index}
              position={positions[index]}
              isInView={isInView}
              screenSize={screenSize}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCardItem({
  card,
  index,
  position,
  isInView,
  screenSize,
}: {
  card: ServiceCard;
  index: number;
  position: { x: number; y: number; rotation: number };
  isInView: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
}) {
  const cardWidth = screenSize === 'mobile' ? 260 : screenSize === 'tablet' ? 220 : 260;
  const cardHeight = screenSize === 'mobile' ? 280 : screenSize === 'tablet' ? 250 : 280;

  // Staggered delay with smooth curve
  const delay = 0.15 + index * 0.08;

  // Initial stacked position (cards stacked in center with slight offset)
  const stackOffset = index * 4;

  return (
    <motion.div
      className="absolute cursor-pointer group"
      initial={{
        opacity: 0,
        y: 100 + stackOffset,
        x: 0,
        rotate: (index - 2) * 3,
        scale: 0.7,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: position.y,
              x: position.x,
              rotate: position.rotation,
              scale: 1,
            }
          : {
              opacity: 0,
              y: 100 + stackOffset,
              x: 0,
              rotate: (index - 2) * 3,
              scale: 0.7,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 70,
        damping: 14,
        mass: 0.8,
        delay: delay,
      }}
      whileHover={{
        scale: 1.06,
        rotate: 0,
        zIndex: 50,
        y: position.y - 8,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      style={{
        width: cardWidth,
        height: cardHeight,
        zIndex: index + 1,
      }}
    >
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-md"
        style={{
          boxShadow:
            '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Background Image - reduced opacity */}
        <div className="absolute inset-0">
          <Image
            src={card.image}
            alt={`${card.title} - Rameshwar Bhagwat's expertise`}
            fill
            className="object-cover opacity-20"
            sizes="(max-width: 640px) 260px, (max-width: 1024px) 220px, 260px"
            priority={index < 3}
          />
          {/* Strong dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(15,14,14,0.5) 0%, rgba(15,14,14,0.7) 50%, rgba(15,14,14,0.85) 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-5">
          {/* Top Section */}
          <div className="space-y-2">
            {/* Icon Badge */}
            <div
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-orange-400"
              style={{
                background: 'linear-gradient(135deg, rgba(255,140,0,0.15) 0%, rgba(255,20,147,0.1) 100%)',
                border: '1px solid rgba(255, 140, 0, 0.25)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              {icons[card.id]}
            </div>

            {/* Title */}
            <h3
              className="text-lg sm:text-xl font-bold text-white leading-tight"
              style={{
                fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
              }}
            >
              {card.title}
            </h3>

            {/* Subtitle with gradient */}
            <p
              className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
              style={{
                background: 'linear-gradient(90deg, #FF8C00, #FF1493)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {card.subtitle}
            </p>

            {/* Description */}
            <p
              className="text-[11px] sm:text-xs text-white/60 leading-relaxed line-clamp-3"
              style={{
                fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
              }}
            >
              {card.description}
            </p>
          </div>

          {/* Bottom Section - Skills Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
            {card.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 text-[9px] sm:text-[10px] font-medium rounded-full"
                style={{
                  background: 'rgba(255,140,0,0.1)',
                  border: '1px solid rgba(255, 140, 0, 0.3)',
                  color: '#FFB366',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255, 140, 0, 0.08) 0%, transparent 70%)',
          }}
        />

        {/* Border glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
          style={{
            boxShadow: '0 0 20px rgba(255,140,0,0.25), 0 0 40px rgba(255,20,147,0.1)',
          }}
        />
      </div>
    </motion.div>
  );
}
