'use client';

import { memo } from 'react';

const AboutHeader = memo(function AboutHeader() {
  return (
    <div className="relative text-center mb-12 md:mb-16 about-header-container pt-10">
      {/* Orange Horizon Arc Background */}
      <div className="absolute top-[-140px] left-1/2 -translate-x-1/2 w-[150%] sm:w-[120%] md:w-[100%] max-w-[1200px] h-[350px] pointer-events-none -z-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 350"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="aboutHorizonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6000" stopOpacity="0" />
              <stop offset="25%" stopColor="#ff6000" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#ff6000" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#ff6000" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ff6000" stopOpacity="0" />
            </linearGradient>
            <filter id="aboutGlow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Main glowing arc */}
          <path
            d="M 0 350 Q 600 -100 1200 350"
            stroke="url(#aboutHorizonGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#aboutGlow)"
          />
          {/* Outer softer glow arc */}
          <path
            d="M 0 350 Q 600 -100 1200 350"
            stroke="url(#aboutHorizonGradient)"
            strokeWidth="6"
            fill="none"
            opacity="0.3"
            style={{ filter: 'blur(10px)' }}
          />
          
          {/* Center flare highlight - Positioned exactly at the peak (y = 0.5*350 + 0.5*-100 = 125) */}
          <ellipse cx="600" cy="125" rx="100" ry="8" fill="#ff6000" opacity="0.6" style={{ filter: 'blur(12px)' }} />
          <ellipse cx="600" cy="125" rx="40" ry="2" fill="#ffffff" opacity="0.9" style={{ filter: 'blur(3px)' }} />
          {/* Core bright spot */}
          <ellipse cx="600" cy="125" rx="15" ry="1" fill="#ffffff" opacity="1" style={{ filter: 'blur(1px)' }} />
        </svg>
      </div>

      {/* Badge container */}
      <div className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d0d0f]/80 backdrop-blur-md border border-white/[0.06] mb-4 text-[#38BDF8] text-xs font-semibold tracking-wider uppercase font-outfit about-badge opacity-0">
        <div className="w-3.5 h-3.5 rounded-full bg-[#38BDF8] flex items-center justify-center text-[#0F0E0E] flex-shrink-0">
          <svg className="w-[50%] h-[50%]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
          </svg>
        </div>
        <span>Get to Know Me</span>
      </div>

      {/* Title */}
      <h2
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-black tracking-[-0.03em] leading-[0.9] text-white about-title opacity-0"
        style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
        }}
      >
        Turning ideas into{' '}
        <span
          className="font-bold px-1 text-white animate-pulse"
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            textTransform: 'none',
          }}
        >
          reality
        </span>
      </h2>

      {/* Subtitle */}
      <p
        className="text-lg sm:text-xl md:text-2xl mt-4 max-w-2xl mx-auto about-subtitle opacity-0"
        style={{
          fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
          color: 'rgba(255,255,255,0.7)',
        }}
      >
        Developer by day, problem solver by nature. Let&apos;s build something amazing together.
      </p>
    </div>
  );
});

export default AboutHeader;
