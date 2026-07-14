'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/layout/Container';
import MarqueeRow from './MarqueeRow';
import { skills } from './skills.data';

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
    opacity: 0,
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

const dynamicWordVariants = {
  enter: {
    y: '100%',
    rotateX: 75,
    opacity: 0,
  },
  center: {
    y: '0%',
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    }
  },
  exit: {
    y: '-100%',
    rotateX: -75,
    opacity: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    }
  }
};

const changingWords = ['master', 'engineer', 'architect', 'deploy', 'orchestrate', 'scale'];

export default function Skills() {
  const [isHeadingAnimated, setIsHeadingAnimated] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (!isHeadingAnimated) return;

    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % changingWords.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [isHeadingAnimated]);

  // Split skills into two groups for different rows
  const midPoint = Math.ceil(skills.length / 2);
  const topRowSkills = skills.slice(0, midPoint);
  const bottomRowSkills = skills.slice(midPoint);

  return (
    <section
      id="skills"
      className="relative z-20 py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#0F0E0E] overflow-hidden"
      aria-label="Technical Skills and Expertise"
      itemScope
      itemType="https://schema.org/ItemList"
    >

      <div className="relative z-20">
      {/* SEO Microdata */}
      <meta itemProp="name" content="Technical Skills - Heet Soni" />
      <meta itemProp="description" content="Comprehensive list of programming languages, frameworks, and technologies mastered by Heet Soni including React, Next.js, TypeScript, Node.js, Python, and modern web development tools." />
      <meta itemProp="numberOfItems" content={skills.length.toString()} />

      {/* Hidden SEO Content */}
      <div className="sr-only">
        <h2>Technical Skills and Expertise</h2>
        <p>
          Heet Soni is proficient in a wide range of modern web development technologies,
          frameworks, and tools. With expertise spanning frontend, backend, databases, cloud services,
          and DevOps, he delivers comprehensive full-stack solutions.
        </p>

        <h3>Frontend Development Skills</h3>
        <ul>
          <li>React.js - Advanced component architecture and state management</li>
          <li>Next.js - Server-side rendering and static site generation</li>
          <li>TypeScript - Type-safe JavaScript development</li>
          <li>JavaScript (ES6+) - Modern JavaScript features and patterns</li>
          <li>HTML5 & CSS3 - Semantic markup and modern styling</li>
          <li>Tailwind CSS - Utility-first CSS framework</li>
          <li>Framer Motion - Advanced animations and interactions</li>
          <li>Redux & Zustand - State management solutions</li>
          <li>React Query - Data fetching and caching</li>
        </ul>

        <h3>Backend Development Skills</h3>
        <ul>
          <li>Node.js - Server-side JavaScript runtime</li>
          <li>Express.js - Web application framework</li>
          <li>Python - Backend development and scripting</li>
          <li>FastAPI - Modern Python web framework</li>
          <li>RESTful API Design - API architecture and best practices</li>
          <li>GraphQL - Query language for APIs</li>
          <li>WebSocket - Real-time communication</li>
        </ul>

        <h3>Database Technologies</h3>
        <ul>
          <li>MongoDB - NoSQL database</li>
          <li>PostgreSQL - Relational database</li>
          <li>MySQL - Relational database management</li>
          <li>Redis - In-memory data structure store</li>
          <li>Prisma - Next-generation ORM</li>
          <li>Database Design - Schema design and optimization</li>
        </ul>

        <h3>Cloud & DevOps</h3>
        <ul>
          <li>AWS (Amazon Web Services) - Cloud infrastructure</li>
          <li>Google Cloud Platform - Cloud services</li>
          <li>Docker - Containerization</li>
          <li>Kubernetes - Container orchestration</li>
          <li>CI/CD - Continuous integration and deployment</li>
          <li>GitHub Actions - Automated workflows</li>
          <li>Vercel - Deployment platform</li>
          <li>Netlify - Web hosting and automation</li>
        </ul>

        <h3>Tools & Technologies</h3>
        <ul>
          <li>Git & GitHub - Version control</li>
          <li>VS Code - Code editor</li>
          <li>Postman - API testing</li>
          <li>Figma - Design collaboration</li>
          <li>Jest & Vitest - Testing frameworks</li>
          <li>Webpack & Vite - Build tools</li>
          <li>ESLint & Prettier - Code quality tools</li>
        </ul>

        <h3>Specialized Skills</h3>
        <ul>
          <li>AI/ML Integration - TensorFlow, Machine Learning APIs</li>
          <li>Blockchain Development - Smart contracts and DApps</li>
          <li>WebRTC - Real-time communication</li>
          <li>Payment Integration - Stripe, PayPal</li>
          <li>SEO Optimization - Technical SEO and performance</li>
          <li>Accessibility (A11y) - WCAG compliance</li>
          <li>Performance Optimization - Core Web Vitals</li>
          <li>Security Best Practices - OWASP guidelines</li>
        </ul>

        <h3>Soft Skills</h3>
        <ul>
          <li>Problem Solving - Analytical thinking and debugging</li>
          <li>System Design - Architecture and scalability</li>
          <li>Code Review - Best practices and mentoring</li>
          <li>Technical Writing - Documentation and blogs</li>
          <li>Agile Methodology - Scrum and Kanban</li>
          <li>Team Collaboration - Git workflow and communication</li>
        </ul>
      </div>

      {/* Particle Background - Removed for performance */}
      {/* <CustomParticleBackground color="100, 150, 255" particleCount={35} /> */}

      <Container>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={headerContainerVariants}
          onAnimationComplete={(definition) => {
            if (definition === 'visible') {
              setIsHeadingAnimated(true);
            } else if (definition === 'hidden') {
              setIsHeadingAnimated(false);
              setWordIndex(0);
            }
          }}
          className="mb-10 sm:mb-12 md:mb-16 text-center"
        >
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-4 text-[#FF9F0A] text-xs font-semibold tracking-wider uppercase font-outfit"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#FF9F0A] flex items-center justify-center text-[#0F0E0E] flex-shrink-0">
              <svg className="w-[50%] h-[50%]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
              </svg>
            </div>
            <span>My Arsenal</span>
          </motion.div>
          
          <motion.h2
            variants={titleContainerVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.02em] leading-[0.95] text-white mb-2 sm:mb-3 md:mb-4 px-2 flex flex-wrap justify-center items-center gap-x-[0.25em] gap-y-[0.05em]"
            style={{ perspective: 1200 }}
          >
            {"Technologies i".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden py-1">
                <motion.span
                  variants={wordVariants}
                  className="inline-block origin-top text-white"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="inline-flex justify-start overflow-hidden py-1 pr-6 relative w-[185px] xs:w-[215px] sm:w-[270px] md:w-[325px] lg:w-[380px] text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={changingWords[wordIndex]}
                  variants={dynamicWordVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="inline-block origin-left text-white"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800 }}
                >
                  {changingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h2>
          
          <motion.p 
            variants={descriptionVariants}
            className="text-muted text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4"
          >
            Building modern web experiences with cutting-edge tools and frameworks
          </motion.p>
        </motion.div>

        {/* Marquee Rows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8 sm:space-y-12 md:space-y-16"
          role="list"
          aria-label="Technology skills showcase"
        >
          {/* Top Row - Left to Right */}
          <MarqueeRow skills={topRowSkills} speed={15} />

          {/* Bottom Row - Right to Left (Reverse) */}
          <MarqueeRow skills={bottomRowSkills} speed={15} reverse />
        </motion.div>
      </Container>
      </div>
    </section>
  );
}

