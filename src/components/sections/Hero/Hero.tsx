import { useEffect, useRef } from 'react';
import HeroContent from './HeroContent';
import HeroBackground from './HeroBackground';
import AvailableForWorkBadge from '@/components/ui/AvailableForWorkBadge';
import StructuredData from '@/components/seo/StructuredData';
import { PERSONAL_INFO, SITE_URL, SOCIAL_LINKS, SEO_KEYWORDS } from '@/lib/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !heroInnerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the Hero content as we scroll down to About (Exact original blur + scale + Y transition)
      gsap.fromTo(
        heroInnerRef.current,
        {
          scale: 1,
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
        },
        {
          scale: 0.88,
          y: -100,
          opacity: 0,
          filter: 'blur(12px)',
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
            onLeave: () => {
              if (heroInnerRef.current) {
                heroInnerRef.current.style.visibility = 'hidden';
              }
            },
            onEnterBack: () => {
              if (heroInnerRef.current) {
                heroInnerRef.current.style.visibility = 'visible';
              }
            },
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <StructuredData />

      <section
        id="hero"
        ref={heroRef}
        className="sticky top-0 z-10 overflow-hidden pb-0 mb-0 w-full"
        style={{ height: '100vh' }}
        aria-label={`${PERSONAL_INFO.name} - Full Stack & AI Developer Portfolio`}
        itemScope
        itemType="https://schema.org/Person"
      >
        {/* ─── Primary Schema.org Person Microdata ─── */}
        <meta itemProp="name" content={PERSONAL_INFO.name} />
<meta itemProp="givenName" content="Heet" />
        <meta itemProp="familyName" content="Soni" />
        <meta itemProp="jobTitle" content="Full Stack & AI Developer" />
        <meta itemProp="description" content={`${PERSONAL_INFO.name} is a Full Stack & AI Developer specializing in React, Next.js, TypeScript, Node.js, Python, and AI-powered product engineering. Featured projects include OpenBeats, TrafficIQ, and EcoSphere.`} />
        <meta itemProp="url" content={SITE_URL} />
        <meta itemProp="email" content={PERSONAL_INFO.email} />
        <meta itemProp="telephone" content={PERSONAL_INFO.phone} />
        <meta itemProp="image" content={`${SITE_URL}${PERSONAL_INFO.image}`} />
        <meta itemProp="knowsAbout" content="Full Stack Development, AI Engineering, React, Next.js, TypeScript, Node.js, Python, Machine Learning, Web Development, SaaS Development" />
        <meta itemProp="hasOccupation" content="Full Stack Developer" />

        {/* Social Links for Schema */}
        {SOCIAL_LINKS.map((link) => (
          <link key={link.name} itemProp="sameAs" href={link.url} />
        ))}

        {/* Address Schema */}
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="hidden">
          <meta itemProp="addressLocality" content={PERSONAL_INFO.location.city} />
          <meta itemProp="addressRegion" content={PERSONAL_INFO.location.state} />
          <meta itemProp="addressCountry" content={PERSONAL_INFO.location.countryCode} />
        </div>

        {/* ─── Hidden SEO Content for Search Engines ─── */}
        <div className="sr-only">
          <h1>Heet Soni - Full Stack & AI Developer</h1>

          <h2>About Heet Soni</h2>
          <p>
            Heet Soni is a highly skilled Full Stack & AI Developer based in {PERSONAL_INFO.location.city}, {PERSONAL_INFO.location.state}, {PERSONAL_INFO.location.country}.
            With expertise in modern web technologies, Heet Soni specializes in building scalable, high-performance web applications and AI-powered platforms.
          </p>

          <h2>Heet Soni - Professional Skills</h2>
          <p>
            As a Full Stack Developer, Heet Soni is proficient in:
          </p>
          <ul>
            <li>Frontend Development: React.js, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS</li>
            <li>Backend Development: Node.js, Express.js, Python, FastAPI, REST APIs, GraphQL</li>
            <li>Database Technologies: MongoDB, PostgreSQL, MySQL, Redis, Prisma ORM</li>
            <li>AI & Machine Learning: TensorFlow, OpenAI, LangChain, AI Integration, ML APIs</li>
            <li>Cloud & DevOps: AWS, Google Cloud, Docker, Kubernetes, CI/CD, Vercel</li>
            <li>SaaS and AI Product Development: scalable architecture, performance optimization, and intelligent features</li>
          </ul>

          <h2>Featured Projects by Heet Soni</h2>
          <ul>
            <li>OpenBeats - Open-source, beautiful music player app for Android</li>
            <li>TrafficIQ - Autonomous traffic intelligence utilizing YOLOv8 computer vision</li>
          </ul>

          <h2>Heet Soni - Services</h2>
          <p>
            Heet Soni offers professional services including:
          </p>
          <ul>
            <li>Full Stack Web Development by Heet Soni</li>
            <li>AI-Powered Application Development by Heet Soni</li>
            <li>SaaS Platform Development by Heet Soni</li>
            <li>React & Next.js Development by Heet Soni</li>
            <li>Custom Web Application Development by Heet Soni</li>
            <li>API Development & Integration by Heet Soni</li>
            <li>E-commerce Solutions by Heet Soni</li>
            <li>Performance Optimization by Heet Soni</li>
          </ul>

          <h2>Why Choose Heet Soni?</h2>
          <p>
            Heet Soni combines technical expertise with creative problem-solving to deliver exceptional digital solutions.
            Whether you need a Full Stack Developer for your startup, an AI Engineer to integrate machine learning capabilities,
            or a Web Developer to build your next big project, Heet Soni has the skills and experience to bring your vision to life.
          </p>

          <h2>Contact Heet Soni</h2>
          <p>
            Looking to hire a Full Stack Developer? Contact Heet Soni at {PERSONAL_INFO.email} or {PERSONAL_INFO.phone}.
            Heet Soni is available for freelance projects, full-time opportunities, and consulting work.
          </p>

          <h3>Keywords</h3>
          <p>{SEO_KEYWORDS.join(', ')}, Heet Soni Portfolio, Heet Soni Developer, Heet Soni Full Stack,
          Heet Soni AI Developer, Heet Soni React Developer, Heet Soni Next.js Expert,
          Hire Heet Soni, Heet Soni Web Developer, Heet Soni Software Engineer,
          Best Full Stack Developer India, Top React Developer Gujarat, AI Developer Anand,
          Heet Soni TypeScript, Heet Soni Node.js, Heet Soni Python Developer, OpenBeats, TrafficIQ</p>
        </div>

        {/* ─── WebSite Schema for Search Appearance ─── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Heet Soni - Full Stack & AI Developer Portfolio",
              "alternateName": ["Heet Soni", "Heet Soni Developer", "Heet Soni Portfolio"],
              "url": SITE_URL,
              "description": "Official portfolio of Heet Soni, a Full Stack & AI Developer specializing in React, Next.js, TypeScript, and AI-powered web applications.",
              "author": {
                "@type": "Person",
                "name": "Heet Soni",
                "jobTitle": "Full Stack & AI Developer",
                "url": SITE_URL
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${SITE_URL}/?search={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* ─── Professional Service Schema ─── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Heet Soni - Full Stack & AI Development Services",
              "description": "Professional Full Stack Development, AI Engineering, and Web Development services by Heet Soni",
              "provider": {
                "@type": "Person",
                "name": "Heet Soni",
                "jobTitle": "Full Stack & AI Developer"
              },
              "serviceType": ["Full Stack Development", "AI Engineering", "Web Development", "SaaS Development", "React Development", "Next.js Development"],
              "areaServed": "Worldwide",
              "url": SITE_URL
            })
          }}
        />

        <div ref={heroInnerRef} className="absolute inset-0 w-full h-full" style={{ willChange: 'transform, opacity, filter' }}>
          <HeroBackground />

          {/* Main content — uses SAME absolute inset-0 + flex center */}
          <HeroContent />

          {/* Docked Right Badge — Scoped strictly to Hero section */}
          <AvailableForWorkBadge />
        </div>
      </section>
    </>
  );
}

