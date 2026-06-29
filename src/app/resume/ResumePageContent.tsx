'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Download, 
  ExternalLink, 
  FileText, 
  Printer,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import Container from '@/components/layout/Container';

export default function ResumePageContent() {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport size for custom UX
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: "Rameshwar Bhagwat's Resume",
      text: "Check out Rameshwar Bhagwat's professional resume - Full Stack & AI Developer.",
      url: window.location.href,
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback to copy link
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    const iframe = document.getElementById('resume-pdf-frame') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } else {
      window.open('/Resume/Rameshwar_Bhagwat_Resume.pdf', '_blank');
    }
  };

  return (
    <section className="relative min-h-screen bg-[#0F0E0E] text-white pt-24 pb-12 overflow-x-hidden font-jakarta">
      
      {/* Background radial overlays */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-[#C2EF3A]/[0.015] rounded-full blur-[140px] pointer-events-none" />

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
          stroke="rgba(194, 239, 58, 0.02)"
          strokeWidth="1.5"
        />
        <path
          d="M-100,600 C500,400 800,800 1600,500"
          fill="none"
          stroke="rgba(56, 189, 248, 0.02)"
          strokeWidth="1.5"
        />
      </svg>

      <Container className="relative z-10 max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
        
        {/* Top bar Actions / Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 border-b border-white/[0.05] pb-6 mb-8">
          
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
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#C2EF3A] uppercase font-bold">
                  Curriculum Vitae
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C2EF3A]" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase mt-0.5">
                Rameshwar Bhagwat
              </h1>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Open in New Tab */}
            <a
              href="/Resume/Rameshwar_Bhagwat_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/[0.12] text-xs font-bold text-white/80 hover:text-white transition-all duration-300 active:scale-[0.97]"
            >
              <ExternalLink size={14} />
              <span>Open in New Tab</span>
            </a>

            {/* Print Button - only visible on desktop */}
            <button
              onClick={handlePrint}
              className="hidden md:flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/[0.12] text-xs font-bold text-white/80 hover:text-white transition-all duration-300 active:scale-[0.97]"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>

            {/* Share / Link Copy */}
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/[0.12] text-xs font-bold text-white/80 hover:text-white transition-all duration-300 active:scale-[0.97]"
            >
              {copied ? <CheckCircle size={14} className="text-[#C2EF3A]" /> : <FileText size={14} />}
              <span>{copied ? 'Link Copied!' : 'Share Link'}</span>
            </button>

            {/* Primary Download Button */}
            <a
              href="/Resume/Rameshwar_Bhagwat_Resume.pdf"
              download="Rameshwar_Bhagwat_Resume.pdf"
              className="relative overflow-hidden flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-[#C2EF3A] hover:bg-[#b5e032] active:scale-[0.97] transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(194,239,58,0.15)] font-jakarta"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Viewport Frame */}
        <div className="relative w-full rounded-[24px] border border-white/[0.06] bg-[#121111]/60 backdrop-blur-xl p-4 sm:p-5 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
          {/* Top bezel layout controls */}
          <div className="flex justify-between items-center pb-4 mb-4 border-b border-white/[0.04] text-[10px] font-mono tracking-wider text-white/30">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-75" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-75" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-75" />
              <span className="ml-2 font-semibold">PREVIEW_FRAME.EXE</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span>PDF_VERSION_1.4</span>
              <span>•</span>
              <span className="text-white/40">247 KB</span>
            </div>
          </div>

          {/* Conditional Mobile PDF fallbacks */}
          {isMobile ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-2xl border border-dashed border-white/5 bg-white/[0.01]">
              <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/40 mb-6">
                <FileText className="w-8 h-8 text-[#C2EF3A]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Resume Preview</h3>
              <p className="text-xs text-white/50 max-w-sm mb-8 leading-relaxed">
                Mobile web browsers do not support rendering PDF documents directly. Click below to view the file or download it to your device.
              </p>
              <div className="flex flex-col gap-3 w-full max-w-xs">
                <a
                  href="/Resume/Rameshwar_Bhagwat_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-sm font-bold transition-all duration-300"
                >
                  <ExternalLink size={16} />
                  <span>Open in Browser</span>
                </a>
                <a
                  href="/Resume/Rameshwar_Bhagwat_Resume.pdf"
                  download="Rameshwar_Bhagwat_Resume.pdf"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-black bg-[#C2EF3A] shadow-md transition-all duration-300"
                >
                  <Download size={16} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          ) : (
            /* Desktop Frame */
            <div className="relative w-full h-[78vh] overflow-hidden rounded-2xl bg-neutral-900 border border-white/[0.04]">
              <iframe
                id="resume-pdf-frame"
                src="/Resume/Rameshwar_Bhagwat_Resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                className="w-full h-full border-0 bg-neutral-900"
                title="Rameshwar Bhagwat Curriculum Vitae"
              />
            </div>
          )}
        </div>

        {/* Footer info/credentials */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 text-[11px] font-mono text-white/35">
          <div className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C2EF3A]" />
            <span>Built by Rameshwar Bhagwat • IT Engineering</span>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/Rameshwar-bhagwat10" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/rameshwar-bhagwat-888540328" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>

      </Container>
    </section>
  );
}
