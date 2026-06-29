'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PERSONAL_INFO, SITE_URL } from '@/lib/constants';

const headerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 15,
      mass: 0.9,
    }
  }
};

export default function Contact() {
  const router = useRouter();

  useEffect(() => {
    const handleOpen = () => {
      router.push('/contact');
    };
    window.addEventListener('open-contact-form', handleOpen);
    return () => window.removeEventListener('open-contact-form', handleOpen);
  }, [router]);

  return (
    <section
      id="contact"
      className="relative z-20 min-h-[60vh] flex items-center justify-center pt-8 pb-20 sm:pt-12 sm:pb-28 px-4 sm:px-6 bg-[#0F0E0E] overflow-hidden"
      aria-label="Contact Information and Inquiry Form"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      {/* Curved Grid Wave Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-80 mix-blend-screen"
        style={{
          backgroundImage: 'url("/images/contact/grid backgorund.avif")',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 75%)',
        }}
      />

      {/* SEO Microdata */}
      <meta itemProp="name" content="Contact Rameshwar Bhagwat - Full Stack Developer" />
      <meta itemProp="description" content="Get in touch with Rameshwar Bhagwat for full-time opportunities, freelance projects, or collaboration. Available for web development, React, Next.js, and full-stack development projects." />
      <meta itemProp="url" content={`${SITE_URL}#contact`} />

      {/* Contact Information Schema */}
      <div itemProp="mainEntity" itemScope itemType="https://schema.org/Person" className="hidden">
        <meta itemProp="name" content={PERSONAL_INFO.name} />
        <meta itemProp="jobTitle" content={PERSONAL_INFO.jobTitle} />
        <meta itemProp="email" content={PERSONAL_INFO.email} />
        <meta itemProp="telephone" content={PERSONAL_INFO.phone} />
        <meta itemProp="url" content={SITE_URL} />
        
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <meta itemProp="addressLocality" content={PERSONAL_INFO.location.city} />
          <meta itemProp="addressRegion" content={PERSONAL_INFO.location.state} />
          <meta itemProp="addressCountry" content={PERSONAL_INFO.location.countryCode} />
        </div>
      </div>

      {/* Hidden SEO Content */}
      <div className="sr-only">
        <h2>Contact Rameshwar Bhagwat - Full Stack Developer</h2>
        
        <h3>Get in Touch</h3>
        <p>
          Rameshwar Bhagwat is available for full-time roles, freelance projects, and consulting opportunities. 
          With expertise in React, Next.js, TypeScript, Node.js, and modern web development, 
          he helps startups and enterprises build scalable, high-performance web applications.
        </p>

        <h3>Contact Information</h3>
        <address>
          <p>Name: {PERSONAL_INFO.name}</p>
          <p>Title: {PERSONAL_INFO.jobTitle}</p>
          <p>Email: <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a></p>
          <p>Phone: <a href={`tel:${PERSONAL_INFO.phone}`}>{PERSONAL_INFO.phone}</a></p>
          <p>Location: {PERSONAL_INFO.location.city}, {PERSONAL_INFO.location.state}, {PERSONAL_INFO.location.country}</p>
          <p>Website: <a href={SITE_URL}>{SITE_URL}</a></p>
        </address>

        <h3>Services Offered</h3>
        <ul>
          <li>Full Stack Web Development - End-to-end application development</li>
          <li>React & Next.js Development - Modern frontend applications</li>
          <li>TypeScript Development - Type-safe JavaScript solutions</li>
          <li>Node.js Backend Development - Scalable server-side applications</li>
          <li>API Development - RESTful and GraphQL APIs</li>
          <li>Database Design & Optimization - MongoDB, PostgreSQL, MySQL</li>
          <li>Cloud Deployment - AWS, Google Cloud, Vercel</li>
          <li>Performance Optimization - Core Web Vitals and SEO</li>
          <li>Technical Consulting - Architecture and best practices</li>
          <li>Code Review & Mentoring - Team support and guidance</li>
        </ul>

        <h3>Availability</h3>
        <p>
          Currently available for:
        </p>
        <ul>
          <li>Full-time employment opportunities</li>
          <li>Selective freelance projects</li>
          <li>Technical consulting engagements</li>
          <li>Contract-to-hire positions</li>
          <li>Remote work worldwide</li>
        </ul>

        <h3>Project Types</h3>
        <ul>
          <li>Startup MVP Development - Launch your product quickly</li>
          <li>Enterprise Web Applications - Scalable business solutions</li>
          <li>E-commerce Platforms - Online stores and marketplaces</li>
          <li>SaaS Applications - Software as a Service products</li>
          <li>Progressive Web Apps - Mobile-first web applications</li>
          <li>API Integration - Third-party service integration</li>
          <li>Legacy System Modernization - Upgrade outdated systems</li>
          <li>Performance Optimization - Speed up existing applications</li>
        </ul>

        <h3>Why Work With Me</h3>
        <ul>
          <li>5+ years of professional web development experience</li>
          <li>50+ successfully delivered projects</li>
          <li>98% client satisfaction rate</li>
          <li>Expertise in modern JavaScript ecosystem</li>
          <li>Strong focus on code quality and best practices</li>
          <li>Excellent communication and collaboration skills</li>
          <li>Agile methodology and iterative development</li>
          <li>Commitment to deadlines and project success</li>
        </ul>

        <h3>Response Time</h3>
        <p>
          I typically respond to inquiries within 24 hours during business days. 
          For urgent matters, please mention "URGENT" in your subject line.
        </p>

        <h3>Time Zone</h3>
        <p>
          Based in India (IST - UTC+5:30). Available for meetings across all time zones 
          with flexible scheduling.
        </p>
      </div>

      {/* Bottom horizon fade */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0F0E0E] to-transparent pointer-events-none" style={{ zIndex: 2 }} aria-hidden="true" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }}
        variants={headerContainerVariants}
        className="relative z-20 max-w-5xl mx-auto text-center px-2"
      >
        {/* Label */}
        <motion.div
          variants={badgeVariants}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6 text-[#10B981] text-xs font-semibold tracking-wider uppercase font-outfit"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-[#10B981] flex items-center justify-center text-[#0F0E0E] flex-shrink-0">
            <svg className="w-[50%] h-[50%]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
              <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
            </svg>
          </div>
          <span>Get in Touch</span>
        </motion.div>

        {/* Cinematic Headline */}
        <motion.h2
          variants={titleContainerVariants}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-[-0.02em] leading-[0.95] text-white mb-4 sm:mb-6"
          style={{ perspective: 1200 }}
        >
          <span className="block mb-1.5 sm:mb-2.5 flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.05em]">
            {"Let's build something".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden py-1">
                <motion.span
                  variants={wordVariants}
                  className="inline-block origin-top text-white"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800 }}
                >
                  {word === "Let's" ? "Let's" : word}
                </motion.span>
              </span>
            ))}
          </span>
          <span className="block overflow-hidden py-1">
            <motion.span
              variants={wordVariants}
              className="inline-block origin-top text-white font-bold"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                textTransform: 'none',
              }}
            >
              extraordinary
            </motion.span>
          </span>
        </motion.h2>

        <motion.p
          variants={descriptionVariants}
          className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 sm:mb-12 px-2"
          style={{
            fontFamily: 'var(--font-instrument), Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 400,
            lineHeight: 1.4
          }}
        >
          &ldquo;Whether you're launching a{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #FF5C29 0%, #FF1493 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 500,
            }}
          >
            startup
          </span>{' '}
          or scaling an{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #FF1493 0%, #FF8C00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 500,
            }}
          >
            enterprise
          </span>
          , I'm here to turn your{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #00D2FF 0%, #3A7BD5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 500,
            }}
          >
            vision
          </span>{' '}
          into reality.&rdquo;
        </motion.p>

        {/* Get in Touch Button */}
        <Link href="/contact" passHref legacyBehavior>
          <motion.a
            variants={buttonVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group glowing-border-btn px-8 sm:px-10 py-3 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base text-white transition-all duration-300 inline-flex items-center gap-2 sm:gap-3 opacity-90 hover:opacity-100 cursor-pointer"
            aria-label="Navigate to contact page"
          >
            {/* Inner dark background mask */}
            <div className="absolute inset-0 rounded-full bg-[#0F0E0E]/95 backdrop-blur-xl z-0 pointer-events-none transition-colors duration-300 group-hover:bg-[#0F0E0E]" />

            <span className="relative z-10">Get in Touch</span>
            
            {/* Arrow icon */}
            <svg
              className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
        </Link>
      </motion.div>
    </section>
  );
}
