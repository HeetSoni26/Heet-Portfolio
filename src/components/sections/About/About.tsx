'use client';

import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import AboutHeader from './AboutHeader';
import ProfileCard from './ProfileCard';
import StatsGrid from './StatsGrid';
import TimelineStrip from './TimelineStrip';
import MarqueeBanner from './MarqueeBanner';
import ExpertiseShowcase from './ExpertiseShowcase';
import InfoCards from './InfoCards';
import GlowCard, { GlowCardGroup } from '@/components/ui/GlowCard';
import { PERSONAL_INFO } from '@/lib/constants';

export default function About() {

  return (
    <section 
      id="about" 
      className="relative pt-24 sm:pt-32 md:pt-40 pb-12 px-4 sm:px-6 bg-[#0F0E0E] overflow-x-clip"
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
        <meta itemProp="experienceRequirements" content="5+ years" />
      </div>
      
      {/* Educational Background */}
      <div itemProp="alumniOf" itemScope itemType="https://schema.org/EducationalOrganization" className="hidden">
        <meta itemProp="name" content="Computer Science" />
      </div>

      {/* Extended horizon glow from Hero - fading upward */}
      <div className="absolute top-0 left-0 w-full h-48 sm:h-64 pointer-events-none" aria-hidden="true">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full"
          style={{
            background: 'radial-gradient(ellipse at center top, rgba(255, 80, 30, 0.08) 0%, rgba(220, 60, 20, 0.04) 30%, rgba(180, 40, 15, 0.02) 60%, transparent 100%)',
            filter: 'blur(60px)',
            willChange: 'auto',
          }}
        />
      </div>

      {/* Subtle ambient glows */}
      <div 
        className="absolute top-1/4 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
        style={{ willChange: 'auto' }}
      />
      <div 
        className="absolute bottom-1/4 left-0 w-56 sm:w-80 h-56 sm:h-80 bg-primary/3 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
        style={{ willChange: 'auto' }}
      />

      <Container>
        {/* Header */}
        <AboutHeader />

        {/* Hidden SEO Content */}
          <div className="sr-only">
            <h2>About Rameshwar Bhagwat - Full Stack & AI Developer</h2>
            <p>
              Rameshwar Bhagwat is a Full Stack & AI Developer based in Yeola, Maharashtra, India, 
              specializing in React, Next.js, TypeScript, and modern web technologies. 
              With 5+ years of experience, Rameshwar Bhagwat builds scalable web applications and AI-driven products 
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
              Rameshwar Bhagwat has 5+ years of professional experience in web development, having worked on 50+ projects 
              with 15+ happy clients. Achieved a 98% success rate in project delivery. Notable projects by Rameshwar Bhagwat 
              include Devory (AI-powered SaaS platform) and ThinkVerse (collaborative platform).
            </p>
            <h3>Achievements</h3>
            <ul>
              <li>Built scalable web applications serving thousands of users</li>
              <li>Contributed to open-source projects</li>
              <li>Technical blog writer sharing knowledge with the developer community</li>
              <li>Mentored junior developers</li>
            </ul>
            <h3>Education and Continuous Learning</h3>
            <p>
              Rameshwar Bhagwat has an IT Engineering background with continuous skill development through online certifications, 
              courses, and active participation in the tech community.
            </p>
            <h3>Contact Rameshwar Bhagwat</h3>
            <address>
              <p>Location: Yeola, Maharashtra, India</p>
              <p>Email: rameshwarbhagwat019@gmail.com</p>
              <p>Phone: +91 9699245170</p>
              <p>Rameshwar Bhagwat is open to remote opportunities worldwide</p>
            </address>
          </div>

          {/* Main Content Grid */}
          <GlowCardGroup className="max-w-7xl mx-auto">
            {/* Two-column layout: Profile Card | Right Content */}
            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-10">
              {/* Left Side - Contained Profile Card */}
              <div className="flex justify-center lg:justify-start">
                <ProfileCard />
              </div>

              {/* Right Side - Stats + Description + Info Cards */}
              <div className="flex flex-col gap-4 xs:gap-5 sm:gap-6 md:gap-8">
                {/* Stats Row */}
                <StatsGrid />

                {/* Description Block */}
                <GlowCard
                  className="bg-gradient-to-br from-[#1c1c1f]/80 to-[#0e0e10]/80 border border-white/[0.08] rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1.5px_0_0_rgba(255,255,255,0.05)] backdrop-blur-xl"
                  glowColor="rgba(255, 100, 200, 0.6)"
                  glowSize={250}
                >
                  <motion.div
                    className="relative p-4 xs:p-5 sm:p-6 md:p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Accent bar */}
                    <div className="absolute top-4 xs:top-5 sm:top-6 md:top-8 left-0 w-1 h-10 xs:h-12 sm:h-14 md:h-16 bg-gradient-to-b from-orange-500 to-pink-500 rounded-r-full" />
                    <div className="pl-3 xs:pl-4 sm:pl-5 space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4">
                      <p
                        className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.5] xs:leading-[1.6] sm:leading-[1.7] font-normal text-white/90"
                        style={{ fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif' }}
                      >
                        Rameshwar Bhagwat crafts high-performance web applications with clean architecture and exceptional user experiences.
                      </p>
                      <p
                        className="text-xs xs:text-sm sm:text-base md:text-lg leading-[1.5] xs:leading-[1.6] sm:leading-[1.7] font-normal text-white/50"
                        style={{ fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif' }}
                      >
                        Specializing in scalable AI-powered applications that blend cutting-edge technology with intuitive design.
                      </p>
                    </div>
                  </motion.div>
                </GlowCard>

                {/* Info Cards - Visitor + Contact */}
                <InfoCards />
              </div>
            </div>
          </GlowCardGroup>
      </Container>

      {/* Expertise Showcase — Split Screen Interactive */}
      <ExpertiseShowcase />

      {/* Marquee Banner — above timeline */}
      <MarqueeBanner />

      <Container>
          <div className="max-w-7xl mx-auto pt-8 sm:pt-12">
            {/* Timeline Strip */}
            <div className="mb-12 sm:mb-16">
              <TimelineStrip />
            </div>
          </div>
      </Container>
    </section>
  );
}
