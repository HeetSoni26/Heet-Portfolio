'use client';

import { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Copy, Check } from 'lucide-react';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import GlowCard from '@/components/ui/GlowCard';

const EMAIL = 'rameshwarbhagwat019@gmail.com';
const EMAIL_NAME = 'rameshwarbhagwat019';

// Grid background style (static, no need to recreate)
const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
  `,
  backgroundSize: '24px 24px',
};

const InfoCards = memo(function InfoCards() {
  const [copied, setCopied] = useState(false);
  const { stats, isLoading } = useVisitorTracking();

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4 md:gap-5 w-full">
      {/* Left Box - Visitor Analytics */}
      <GlowCard
        className="bg-white/[0.01] backdrop-blur-md border border-white/[0.08] rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
        glowColor="rgba(255, 140, 0, 0.7)"
        glowSize={200}
        maskBackground="rgba(15, 14, 14, 0.6)"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-3 xs:p-4 sm:p-5 md:p-6 relative h-[120px] xs:h-[140px] sm:h-[160px] md:h-[190px] flex flex-col justify-center overflow-hidden"
        >
          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={gridBackgroundStyle}
          />

          {/* Content */}
          <div className="relative z-10 text-center space-y-1 xs:space-y-1.5 sm:space-y-2 md:space-y-3">
            {isLoading ? (
              <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white animate-pulse">...</div>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
              >
                {stats.uniqueVisitors.toLocaleString()}+
              </motion.div>
            )}

            <div className="space-y-0.5">
              <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-base font-bold text-white">
                Portfolio Visitors
              </h3>
              <p className="text-white/60 text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs leading-tight">
                Thank you for being part of my journey
              </p>
            </div>
          </div>
        </motion.div>
      </GlowCard>

      {/* Right Box - Contact */}
      <GlowCard
        className="bg-white/[0.01] backdrop-blur-md border border-white/[0.08] rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
        glowColor="rgba(255, 100, 150, 0.7)"
        glowSize={200}
        maskBackground="rgba(15, 14, 14, 0.6)"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-3 xs:p-4 sm:p-5 md:p-6 relative h-[120px] xs:h-[140px] sm:h-[160px] md:h-[190px] flex flex-col justify-center"
        >
          {/* macOS-style dots */}
          <div className="absolute top-1.5 xs:top-2 sm:top-2.5 left-1.5 xs:left-2 sm:left-2.5 flex gap-1 xs:gap-1.5 sm:gap-2">
            <div className="w-1.5 xs:w-2 sm:w-2.5 h-1.5 xs:h-2 sm:h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-1.5 xs:w-2 sm:w-2.5 h-1.5 xs:h-2 sm:h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-1.5 xs:w-2 sm:w-2.5 h-1.5 xs:h-2 sm:h-2.5 rounded-full bg-[#28CA42]" />
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-1 xs:mb-1.5 sm:mb-2">
            <div className="relative">
              <Image
                src="/icons/logo.svg"
                alt="Rameshwar Bhagwat Portfolio Logo"
                width={50}
                height={50}
                className="hover:scale-110 transition-transform duration-300 w-[32px] xs:w-[40px] sm:w-[50px] md:w-[60px] h-[32px] xs:h-[40px] sm:h-[50px] md:h-[60px]"
                style={{ filter: 'brightness(0) saturate(100%) invert(13%) sepia(98%) saturate(7471%) hue-rotate(0deg) brightness(98%) contrast(118%)' }}
              />
            </div>
          </div>

          {/* Text */}
          <div className="text-center space-y-0.5 mb-1 xs:mb-1.5 sm:mb-2">
            <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-base font-bold text-white">
              Let&apos;s innovate together
            </h3>
            <p className="text-white/60 text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] leading-tight">
              Ready to bring your vision to life?
            </p>
          </div>

          {/* Email Box */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex items-center justify-between gap-1 xs:gap-1.5 sm:gap-2 md:gap-2.5 px-2 xs:px-2.5 sm:px-3 md:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 cursor-pointer group w-fit"
              aria-label="Copy email address"
            >
              <span className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-medium text-white/70 group-hover:text-white/90 transition-colors truncate max-w-[60px] xs:max-w-[80px] sm:max-w-none">
                {EMAIL_NAME}
              </span>
              <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 flex-shrink-0">
                {copied ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-0.5 xs:gap-1 text-green-400"
                  >
                    <Check className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3" />
                    <span className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] hidden xs:inline">Copied!</span>
                  </motion.div>
                ) : (
                  <Copy className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 text-white/50 group-hover:text-white/70 transition-colors" />
                )}
              </div>
            </button>
          </div>
        </motion.div>
      </GlowCard>
    </div>
  );
});

export default InfoCards;
