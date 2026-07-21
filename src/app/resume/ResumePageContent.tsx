'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Download, 
  ExternalLink, 
  FileText, 
  Sparkles,
} from 'lucide-react';
import Container from '@/components/layout/Container';

export default function ResumePageContent() {
  const [isMobile, setIsMobile] = useState(false);

  // Optimized mobile viewport detection via matchMedia
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    handleMediaChange(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
      return () => mediaQuery.removeListener(handleMediaChange);
    }
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0F0E0E] text-white pt-24 pb-12 overflow-x-hidden font-jakarta select-none">
      
      {/* Background radial overlays */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-red-500/[0.015] rounded-full blur-[140px] pointer-events-none" />

      {/* Premium Dark Tech SVG Background */}
      <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="resumeDotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(255, 255, 255, 0.08)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#resumeDotGrid)" />
        
        {/* Curved circuit-style glowing lines */}
        <path
          d="M-200,200 C300,350 700,50 1500,200"
          fill="none"
          stroke="rgba(255, 140, 0, 0.025)"
          strokeWidth="1.5"
        />
        <path
          d="M-100,600 C500,400 800,800 1600,500"
          fill="none"
          stroke="rgba(244, 63, 94, 0.02)"
          strokeWidth="1.5"
        />
      </svg>

      <Container className="relative z-10 max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
        
        {/* Top bar Actions / Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 border-b border-white/[0.08] pb-6 mb-8">
          
          {/* Back button & Title info */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 active:scale-95 group cursor-pointer"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#FF8C00] uppercase font-bold">
                  Curriculum Vitae
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF8C00] to-[#F43F5E]" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase mt-0.5 font-jakarta">
                Heet Soni
              </h1>
            </div>
          </div>

          {/* Clean Top Action Buttons (Only Open in New Tab & Download PDF) */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Open in New Tab */}
            <a
              href="/Resume/Heet_Soni_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/[0.16] text-xs font-bold text-white/80 hover:text-white transition-all duration-300 active:scale-[0.97]"
            >
              <ExternalLink size={14} />
              <span>Open in New Tab</span>
            </a>

            {/* Primary Download Button */}
            <a
              href="/Resume/Heet_Soni_Resume.pdf"
              download="Heet_Soni_Resume.pdf"
              className="relative overflow-hidden flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF8C00] to-[#F43F5E] hover:opacity-90 active:scale-[0.97] transition-all duration-300 cursor-pointer shadow-lg shadow-orange-500/10 font-jakarta"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Viewport Frame - Obsidian Dark Aesthetic */}
        <div 
          className="relative w-full rounded-[24px] border border-white/[0.08] bg-[#121115] p-4 sm:p-5 shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Top bezel layout controls */}
          <div className="flex justify-between items-center pb-4 mb-4 border-b border-white/[0.06] text-[10px] font-mono tracking-wider text-white/40">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-80" />
              <span className="ml-2 font-semibold text-white/60">RESUME_VIEWER.PDF</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-white/60">PDF / 1 PAGE</span>
              <span>•</span>
              <span className="text-white/40">247 KB</span>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="w-full h-[60vh] sm:h-[75vh] rounded-2xl overflow-hidden bg-white/5 relative z-10 border border-white/5">
            <iframe 
              src="/Resume/Heet_Soni_Resume.pdf" 
              className="w-full h-full border-none"
              title="Heet Soni Resume"
            />
          </div>
        </div>

        {/* Footer info/credentials */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 text-[11px] font-mono text-white/35">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8C00]" />
            <span>Heet Soni • AI Engineer</span>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/HeetSoni26" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/heet-soni-8a9082273/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>

      </Container>
    </section>
  );
}

