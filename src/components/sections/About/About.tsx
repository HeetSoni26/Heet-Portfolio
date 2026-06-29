'use client';

import { useEffect, useRef } from 'react';
import Container from '@/components/layout/Container';
import AboutHeader from './AboutHeader';
import TimelineStrip from './TimelineStrip';
import ExpertiseShowcase from './ExpertiseShowcase';
import BentoGrid from './BentoGrid';
import { PERSONAL_INFO } from '@/lib/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollDirection } from '@/hooks/useScrollDirection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const scrollDirection = useScrollDirection();
  const isScrollingDown = scrollDirection === 'down';

  useEffect(() => {
    if (!aboutRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 55%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      });

      // Choreographed header entrance animation
      tl.fromTo(
        '.about-badge',
        { opacity: 0, scale: 0.7, y: 25 },
        { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'back.out(1.5)' }
      );

      tl.fromTo(
        '.about-title',
        { opacity: 0, y: 55, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
        { opacity: 1, y: 0, clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', duration: 0.95, ease: 'power4.out' },
        '-=0.45'
      );

      tl.fromTo(
        '.about-subtitle',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      // Staggered Bento Cards entrance animation with 3D perspective pop
      tl.fromTo(
        '.about-bento-card',
        { opacity: 0, scale: 0.88, y: 55, transformPerspective: 800, rotateX: 12 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,perspective,rotateX' // Essential: releases transforms so Framer Motion spring hovers work cleanly
        },
        '-=0.55'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative z-20 w-full bg-[#0F0E0E] overflow-x-clip pb-12 rounded-t-[32px] md:rounded-t-[48px] lg:rounded-t-[64px] border-t border-white/15 shadow-[0_-24px_48px_rgba(0,0,0,0.8)]"
      aria-label="About Rameshwar Bhagwat - Full Stack & AI Developer"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* SEO Microdata - Enhanced */}
      <meta itemProp="name" content={PERSONAL_INFO.name} />
      <meta itemProp="jobTitle" content={PERSONAL_INFO.jobTitle} />
      <meta itemProp="description" content={PERSONAL_INFO.bio} />
      <meta itemProp="url" content="https://rameshwarbhagwat.me" />
      <meta itemProp="email" content={PERSONAL_INFO.email} />
      <meta itemProp="telephone" content={PERSONAL_INFO.phone} />
      <meta itemProp="image" content={`https://rameshwarbhagwat.me${PERSONAL_INFO.image}`} />

      {/* Address Schema */}
      <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="hidden">
        <meta itemProp="addressLocality" content={PERSONAL_INFO.location.city} />
        <meta itemProp="addressRegion" content={PERSONAL_INFO.location.state} />
        <meta itemProp="addressCountry" content={PERSONAL_INFO.location.countryCode} />
      </div>

      {/* Skills & Expertise */}
      <meta itemProp="knowsAbout" content="React" />
      <meta itemProp="knowsAbout" content="Next.js" />
      <meta itemProp="knowsAbout" content="TypeScript" />
      <meta itemProp="knowsAbout" content="JavaScript" />
      <meta itemProp="knowsAbout" content="Node.js" />
      <meta itemProp="knowsAbout" content="Full Stack Development" />
      <meta itemProp="knowsAbout" content="Web Development" />
      <meta itemProp="knowsAbout" content="MERN Stack" />
      <meta itemProp="knowsAbout" content="RESTful API" />
      <meta itemProp="knowsAbout" content="Database Design" />

      {/* Occupation Schema */}
      <div itemProp="hasOccupation" itemScope itemType="https://schema.org/Occupation" className="hidden">
        <meta itemProp="name" content="Full Stack Developer" />
        <meta itemProp="occupationLocation" content="Yeola, Maharashtra, India" />
        <meta itemProp="skills" content="React, Next.js, TypeScript, Node.js, JavaScript, MongoDB, Express.js" />
        <meta itemProp="experienceRequirements" content="1+ years" />
      </div>

      {/* Educational Background */}
      <div itemProp="alumniOf" itemScope itemType="https://schema.org/EducationalOrganization" className="hidden">
        <meta itemProp="name" content="Computer Science" />
      </div>

      {/* About Section Header (scrolls normally above the bento grid) */}
      <div className="pt-24 sm:pt-32 md:pt-40 pb-6 sm:pb-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 w-full">
        <AboutHeader />
      </div>

      <div className="relative">
        {/* Card 1: Sticky About Bento Grid (centered vertically in viewport) */}
        <div
          ref={cardRef}
          className={`${isScrollingDown ? 'lg:sticky' : 'relative'} z-10 px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 w-full lg:h-screen lg:flex lg:flex-col lg:justify-center pt-8 pb-16 lg:pt-0 lg:pb-0`}
          style={{ top: '0px' }}
        >
          <Container>
            {/* Hidden SEO Content */}
            <div className="sr-only">
              <h2>About Rameshwar Bhagwat - Full Stack & AI Developer</h2>
              <p>
                Rameshwar Bhagwat is a Full Stack & AI Developer based in Yeola, Maharashtra, India,
                specializing in React, Next.js, TypeScript, and modern web technologies.
                With 1+ years of experience, Rameshwar Bhagwat builds scalable web applications and AI-driven products
                like Devory and ThinkVerse. The Rameshwar Bhagwat portfolio showcases expertise in full-stack development,
                machine learning integration, and SaaS platform development.
              </p>
              <h3>Rameshwar Bhagwat - Core Skills and Expertise</h3>
              <ul>
                <li>Full Stack Development with MERN Stack (MongoDB, Express.js, React, Node.js)</li>
                <li>Frontend Development: React, Next.js, TypeScript, JavaScript, HTML5, CSS3</li>
                <li>Backend Development: Node.js, Express.js, RESTful API Design</li>
                <li>Database: MongoDB, PostgreSQL, MySQL, Database Optimization</li>
                <li>Cloud Services: AWS, Azure, Google Cloud Platform</li>
                <li>DevOps: Docker, CI/CD, Git, GitHub Actions</li>
                <li>AI/ML Integration: TensorFlow, Python, Machine Learning APIs</li>
                <li>System Design and Architecture</li>
              </ul>
              <h3>Rameshwar Bhagwat - Professional Experience</h3>
              <p>
                Rameshwar Bhagwat has 1+ years of professional experience in web development, having worked on 7 projects
                with happy clients. Notable projects by Rameshwar Bhagwat include Devory (AI-powered SaaS platform) and ThinkVerse (collaborative platform).
              </p>
              <h3>Achievements</h3>
              <ul>
                <li>Built scalable web applications serving thousands of users</li>
                <li>Contributed to open-source projects</li>
                <li>Technical blog writer sharing knowledge with the developer community</li>
                <li>Mentored junior developers</li>
                <li>IT Engineering background</li>
              </ul>
              <h3>Contact Rameshwar Bhagwat</h3>
              <address>
                <p>Location: Yeola, Maharashtra, India</p>
                <p>Email: rameshwarbhagwat019@gmail.com</p>
                <p>Phone: +91 9699245170</p>
                <p>Rameshwar Bhagwat is open to remote opportunities worldwide</p>
              </address>
            </div>

            {/* Bento Grid */}
            <div className="about-bento-container w-full">
              <BentoGrid />
            </div>
          </Container>
        </div>

        {/* Spacer for extra scroll before Expertise Showcase (only on desktop lg screens where Card 1 is sticky) */}
        <div className="hidden lg:block h-[50vh] pointer-events-none" />

        {/* Card 2: Expertise Showcase sliding above Card 1 */}
        <div
          className="relative z-20 bg-[#0F0E0E] rounded-t-[32px] md:rounded-t-[48px] lg:rounded-t-[64px] border-t border-white/15 shadow-[0_-12px_48px_rgba(0,0,0,0.9)]"
        >
          <ExpertiseShowcase />
        </div>

        {/* Card 3: Timeline Strip */}
        <div className="relative z-20 bg-[#0F0E0E]">
          <Container className="px-4 sm:px-6">
            <div className="max-w-7xl mx-auto pt-8 sm:pt-12">
              <div className="mb-12 sm:mb-16">
                <TimelineStrip />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
