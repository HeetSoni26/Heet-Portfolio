'use client';

import { Mail, Phone, MapPin, Github, Linkedin, Instagram, X, Clock, ArrowUpRight } from 'lucide-react';
import ContactForm from './ContactForm';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/lib/constants';

interface ContactCardProps {
  onClose?: () => void;
}

const socialIcons: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram,
};

export default function ContactCard({ onClose }: ContactCardProps) {
  return (
    <div
      className="relative rounded-[24px] overflow-hidden"
      style={{
        background: 'rgba(30, 30, 35, 0.45)',
        backdropFilter: 'blur(24px) saturate(150%)',
        WebkitBackdropFilter: 'blur(24px) saturate(150%)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Glassmorphism gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 40%, rgba(255, 255, 255, 0.02) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/[0.1] hover:bg-white/[0.2] border border-white/[0.15] flex items-center justify-center transition-colors z-20 backdrop-blur-sm"
          aria-label="Close"
        >
          <X size={14} className="text-white/70" />
        </button>
      )}

      <div className="flex flex-col md:flex-row max-h-[85vh] md:max-h-none overflow-y-auto md:overflow-visible scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Left Column - Contact Info */}
        <div className="md:w-[45%] p-3 xs:p-4 sm:p-5 md:p-6 border-b md:border-b-0 md:border-r border-white/[0.08]">
          {/* Header */}
          <div className="mb-3 sm:mb-4 md:mb-5">
            <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-1.5 tracking-[-0.02em]">
              Let's Connect
            </h3>
            <p className="text-[11px] xs:text-[12px] sm:text-[13px] text-white/50 leading-relaxed">
              I'm always open to discussing new projects and opportunities.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-1.5 xs:space-y-2 sm:space-y-2.5 mb-3 sm:mb-4 md:mb-5">
            {/* Email */}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 p-1.5 xs:p-2 sm:p-2.5 rounded-lg xs:rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.1] transition-all group"
            >
              <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-md xs:rounded-lg bg-[#0A84FF]/10 border border-[#0A84FF]/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-3 h-3 xs:w-[13px] xs:h-[13px] sm:w-[14px] sm:h-[14px] text-[#0A84FF]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-wider text-white/35">Email</p>
                <p className="text-[11px] xs:text-[12px] sm:text-[13px] text-white/80 truncate group-hover:text-white transition-colors">
                  {PERSONAL_INFO.email}
                </p>
              </div>
              <ArrowUpRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-white/20 group-hover:text-white/40 transition-colors flex-shrink-0" />
            </a>

            {/* Phone */}
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 p-1.5 xs:p-2 sm:p-2.5 rounded-lg xs:rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.1] transition-all group"
            >
              <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-md xs:rounded-lg bg-[#30D158]/10 border border-[#30D158]/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-3 h-3 xs:w-[13px] xs:h-[13px] sm:w-[14px] sm:h-[14px] text-[#30D158]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-wider text-white/35">Phone</p>
                <p className="text-[11px] xs:text-[12px] sm:text-[13px] text-white/80 group-hover:text-white transition-colors">
                  {PERSONAL_INFO.phone}
                </p>
              </div>
              <ArrowUpRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-white/20 group-hover:text-white/40 transition-colors flex-shrink-0" />
            </a>

            {/* Location */}
            <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 p-1.5 xs:p-2 sm:p-2.5 rounded-lg xs:rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-md xs:rounded-lg bg-[#FF9F0A]/10 border border-[#FF9F0A]/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-3 h-3 xs:w-[13px] xs:h-[13px] sm:w-[14px] sm:h-[14px] text-[#FF9F0A]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-wider text-white/35">Location</p>
                <p className="text-[11px] xs:text-[12px] sm:text-[13px] text-white/80">
                  {PERSONAL_INFO.location.city}, {PERSONAL_INFO.location.country}
                </p>
              </div>
            </div>

            {/* Response Time */}
            <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 p-1.5 xs:p-2 sm:p-2.5 rounded-lg xs:rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-md xs:rounded-lg bg-[#BF5AF2]/10 border border-[#BF5AF2]/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-3 h-3 xs:w-[13px] xs:h-[13px] sm:w-[14px] sm:h-[14px] text-[#BF5AF2]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-wider text-white/35">Response Time</p>
                <p className="text-[11px] xs:text-[12px] sm:text-[13px] text-white/80">Within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <p className="text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-wider text-white/35 mb-1.5 sm:mb-2">Follow Me</p>
            <div className="flex gap-1 xs:gap-1.5 sm:gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcons[social.name] || Github;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-md xs:rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/[0.12] transition-all group"
                    aria-label={social.name}
                  >
                    <Icon className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-white/50 group-hover:text-white/80 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="md:w-[55%] p-3 xs:p-4 sm:p-5 md:p-6">
          {/* Form Header */}
          <div className="mb-3 sm:mb-4 md:mb-5">
            <h4 className="text-sm xs:text-base sm:text-lg font-semibold text-white mb-0.5 sm:mb-1 tracking-[-0.01em]">
              Send a Message
            </h4>
            <p className="text-[10px] xs:text-[11px] sm:text-[12px] text-white/45">
              Fill out the form and I'll get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Form */}
          <ContactForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
