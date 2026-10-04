'use client';

import { Github, Linkedin, Instagram, Mail, ArrowUp, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/HeetSoni26', icon: Github, color: '#FFFFFF' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/heet-soni-8a9082273/', icon: Linkedin, color: '#0A66C2' },
  { name: 'Instagram', url: 'https://www.instagram.com/heetsoni__/', icon: Instagram, color: '#E4405F' },
  { name: 'Email', url: 'mailto:heetks2607@gmail.com', icon: Mail, color: '#30D158' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0F0E0E] w-full px-4 xs:px-5 sm:px-6 md:px-8 pb-8 pt-4">
      <footer 
        className="relative max-w-4xl mx-auto rounded-full border border-white/[0.08] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.85)]"
        style={{
          background: 'linear-gradient(180deg, rgba(20, 18, 18, 0.65) 0%, rgba(13, 12, 12, 0.95) 100%)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.85), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Subtle top border reflection */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Ambient background glows */}
        <div 
          className="absolute bottom-0 right-0 w-[200px] h-[100px] pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(191, 90, 242, 0.12) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }}
          aria-hidden="true"
        />

        {/* Inner Padding Container */}
        <div className="relative z-10 px-8 py-6 sm:px-12 sm:py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4">
            
            {/* Left Side: Brand Sign-off, Status, Copyright */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <span
                  className="text-lg sm:text-xl font-medium tracking-tight select-none"
                  style={{ fontFamily: 'var(--font-instrument), Georgia, serif', textTransform: 'none' }}
                >
                  <span className="text-white">Heet</span>{' '}
                  <span className="text-white italic">Soni</span>
                </span>
                
                {/* Available for Projects / Pulse indicator */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-[10px] text-white/55 font-mono">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#30D158] relative">
                    <span className="absolute inset-0 rounded-full bg-[#30D158] animate-ping opacity-75" />
                  </div>
                  <span>Active Status</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[11px] text-white/35 font-medium tracking-wider uppercase font-outfit select-none flex items-center gap-1.5">
                  &copy; {currentYear} &bull; Handcrafted with
                  <motion.span 
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    className="text-[#BF5AF2] text-[11px] inline-block"
                  >
                    ♥
                  </motion.span>
                  in India
                </p>
                <p className="text-[10px] text-white/20 font-mono">
                  Engineered for Performance & Scalability
                </p>
              </div>
            </div>

            {/* Right Side: Social links, Location, and navigation */}
            <div className="flex flex-col items-center md:items-center gap-3">
              
              {/* Row with Social Buttons & Scroll to Top button */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
                {/* Circular Social Buttons */}
                <div className="flex items-center gap-2.5">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        whileHover={{ y: -3, scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 overflow-hidden"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          borderColor: 'rgba(255, 255, 255, 0.06)',
                          '--hover-color': social.color,
                        } as React.CSSProperties}
                      >
                        {/* Glow backdrop indicator */}
                        <span 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
                          style={{
                            background: `radial-gradient(circle, ${social.color}18 0%, transparent 70%)`,
                            boxShadow: `inset 0 0 8px ${social.color}15`
                        }}
                        />
                        <Icon
                          size={15}
                          className="text-white/45 group-hover:text-[var(--hover-color)] transition-colors duration-300 relative z-10"
                        />
                      </motion.a>
                    );
                  })}
                </div>

                {/* Scroll to top trigger */}
                <button
                  onClick={handleScrollToTop}
                  className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.06] hover:border-white/10 text-white/55 hover:text-white text-xs font-semibold transition-all duration-300 active:scale-95 cursor-pointer font-outfit"
                >
                  <span>Back to Top</span>
                  <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
                </button>
              </div>

              {/* Location Badge */}
              <div 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.05] bg-white/[0.02] text-[10px] text-white/45 font-mono select-none"
                style={{
                  boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.02)'
                }}
              >
                <MapPin size={11} className="text-[#BF5AF2]" />
                <span>Anand, Gujarat, India</span>
              </div>
            </div>
            
          </div>
        </div>
      </footer>
    </div>
  );
}
