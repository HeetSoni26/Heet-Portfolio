'use client';

import { memo } from 'react';

const AboutHeader = memo(function AboutHeader() {
  return (
    <div className="text-center mb-12 md:mb-16 about-header-container">
      {/* Badge container */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-4 text-[#38BDF8] text-xs font-semibold tracking-wider uppercase font-outfit about-badge opacity-0">
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
