'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  RefreshCw,
  ArrowLeft,
} from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';
import Container from '@/components/layout/Container';

// --- Form Data Structure ---
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// --- Social Link Data (Bento Grid) ---
interface SocialBentoItem {
  id: string;
  name: string;
  handle: string;
  url: string;
  icon: typeof Github;
  color: string; // Theme color for hover glows
  watermark: string; // SVG path data for faint watermark logo
}

const socialHoverColors: Record<string, string> = {
  github: 'hover:text-white',
  linkedin: 'hover:text-[#0A84FF]',
  instagram: 'hover:text-[#FF2D55]',
  email: 'hover:text-[#FF8C00]',
  phone: 'hover:text-[#30D158]',
  discord: 'hover:text-[#BF5AF2]',
};

const socialBentoData: SocialBentoItem[] = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@Rameshwar-bhagwat10',
    url: 'https://github.com/Rameshwar-bhagwat10',
    icon: Github,
    color: 'rgba(255, 255, 255, 0.15)',
    watermark: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Rameshwar Bhagwat',
    url: 'https://www.linkedin.com/in/rameshwar-bhagwat-888540328',
    icon: Linkedin,
    color: 'rgba(10, 132, 255, 0.25)',
    watermark: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@imram111_',
    url: 'https://www.instagram.com/imram111_/',
    icon: Instagram,
    color: 'rgba(255, 45, 85, 0.25)',
    watermark: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    id: 'email',
    name: 'Email',
    handle: 'rameshwarbhagwat019@gmail.com',
    url: 'mailto:rameshwarbhagwat019@gmail.com',
    icon: Mail,
    color: 'rgba(255, 140, 0, 0.25)',
    watermark: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  },
  {
    id: 'phone',
    name: 'Phone',
    handle: '+91 9699245170',
    url: 'tel:+919699245170',
    icon: Phone,
    color: 'rgba(48, 209, 88, 0.25)',
    watermark: 'M6.62 10.79a15.149 15.149 0 006.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
  },
  {
    id: 'discord',
    name: 'Discord',
    handle: 'rameshwar#1234',
    url: 'https://discord.com',
    icon: MessageSquare,
    color: 'rgba(191, 90, 242, 0.25)',
    watermark: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z',
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendAnother = () => {
    setIsSuccess(false);
    setError(null);
    reset();
  };

  return (
    <section className="relative min-h-screen bg-[#0F0E0E] text-white pt-28 pb-20 overflow-x-hidden">
      
      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-8 left-6 sm:left-8 z-30 flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-xs font-semibold text-white/70 hover:text-white hover:border-white/20 transition-all active:scale-[0.98] group cursor-pointer"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
        <span>Back</span>
      </Link>
      
      {/* Background radial overlays */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-orange-500/[0.015] rounded-full blur-[140px] pointer-events-none" />

      {/* Premium Dark Tech SVG Background */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(255, 255, 255, 0.08)" />
          </pattern>
        </defs>
        {/* Dot pattern */}
        <rect width="100%" height="100%" fill="url(#dotGrid)" />
        
        {/* Glowing grid line vectors */}
        <path
          d="M-200,300 C200,450 600,100 1400,250 M-200,310 C200,460 600,110 1400,260"
          fill="none"
          stroke="rgba(255, 255, 255, 0.015)"
          strokeWidth="1.5"
        />
        <path
          d="M-100,500 C400,300 700,700 1500,450"
          fill="none"
          stroke="rgba(48, 209, 88, 0.02)"
          strokeWidth="2"
        />
        <path
          d="M-50,150 C300,50 900,450 1400,150"
          fill="none"
          stroke="rgba(255, 140, 0, 0.015)"
          strokeWidth="1.5"
        />

        {/* Decorative subtle node connections */}
        <circle cx="250" cy="380" r="3" fill="rgba(255,255,255,0.08)" />
        <circle cx="580" cy="180" r="2.5" fill="rgba(48,209,88,0.1)" />
        <circle cx="850" cy="400" r="3.5" fill="rgba(255,140,0,0.08)" />
        <circle cx="1100" cy="220" r="2" fill="rgba(255,255,255,0.08)" />
        
        <line x1="250" y1="380" x2="580" y2="180" stroke="rgba(255, 255, 255, 0.015)" strokeWidth="1" />
        <line x1="580" y1="180" x2="850" y2="400" stroke="rgba(48, 209, 88, 0.01)" strokeWidth="1" />
        <line x1="850" y1="400" x2="1100" y2="220" stroke="rgba(255, 140, 0, 0.01)" strokeWidth="1" />
      </svg>

      <Container>
        {/* TOP SECTION: Giant heavy scrolling headings moving in opposite directions */}
        <div className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] mb-16 py-6 bg-[#0F0E0E] border-y border-white/[0.04] overflow-hidden select-none pointer-events-none z-20 flex flex-col gap-5">
          {/* Row 1: Scroll Left */}
          <div className="flex whitespace-nowrap animate-marquee" style={{ animationDuration: '13s' }}>
            <span className="text-[8.5vw] font-black tracking-[-0.03em] uppercase text-white/[0.08] mx-4 leading-none font-jakarta">
              LET&apos;S BUILD SOMETHING • AVAILABLE FOR ROLES • FULL STACK & AI •
            </span>
            <span className="text-[8.5vw] font-black tracking-[-0.03em] uppercase text-white/[0.08] mx-4 leading-none font-jakarta">
              LET&apos;S BUILD SOMETHING • AVAILABLE FOR ROLES • FULL STACK & AI •
            </span>
            <span className="text-[8.5vw] font-black tracking-[-0.03em] uppercase text-white/[0.08] mx-4 leading-none font-jakarta">
              LET&apos;S BUILD SOMETHING • AVAILABLE FOR ROLES • FULL STACK & AI •
            </span>
          </div>
          {/* Row 2: Scroll Right */}
          <div className="flex whitespace-nowrap animate-marquee-reverse" style={{ animationDuration: '13s' }}>
            <span className="text-[8.5vw] font-black tracking-[-0.03em] uppercase text-white/[0.08] mx-4 leading-none font-jakarta">
              CODE & INTELLIGENCE • CREATIVE EXPERIENCES • INNOVATIVE SOLUTIONS •
            </span>
            <span className="text-[8.5vw] font-black tracking-[-0.03em] uppercase text-white/[0.08] mx-4 leading-none font-jakarta">
              CODE & INTELLIGENCE • CREATIVE EXPERIENCES • INNOVATIVE SOLUTIONS •
            </span>
            <span className="text-[8.5vw] font-black tracking-[-0.03em] uppercase text-white/[0.08] mx-4 leading-none font-jakarta">
              CODE & INTELLIGENCE • CREATIVE EXPERIENCES • INNOVATIVE SOLUTIONS •
            </span>
          </div>
        </div>

        {/* Main Grid: Lanyard / Form Split */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Lanyard ID Badge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full pt-10 lg:pt-0">
            
            {/* Lanyard Strap (Fabric Ribbon) */}
            <div className="absolute top-[-300px] bottom-[320px] w-4 bg-[#141313] border-x border-white/5 shadow-inner z-0 pointer-events-none flex flex-col items-center py-4 gap-12">
              {/* Repeating logo pattern on strap */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
              ))}
            </div>

            {/* Plastic Slot Clip / Carabiner */}
            <div className="w-8 h-8 rounded-full border border-neutral-700 bg-gradient-to-tr from-neutral-800 to-neutral-600 shadow-md relative z-10 flex items-center justify-center mb-[-12px]">
              <div className="w-3 h-5 border-2 border-neutral-800 rounded-b-md bg-neutral-900 mt-2 shadow-inner" />
            </div>

            {/* Swinging motion container */}
            <motion.div
              initial={{ rotate: -5, y: -20, opacity: 0 }}
              animate={{ rotate: 0, y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 15,
                mass: 1.2,
                delay: 0.1,
              }}
              whileHover={{
                rotate: [0, 2, -1.5, 0.8, 0],
                transition: { duration: 0.8, ease: 'easeInOut' },
              }}
              className="relative z-10 w-full max-w-[310px] aspect-[3/4.6] bg-white border border-neutral-200 rounded-[20px] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden"
              style={{
                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.55), inset 0 2px 0 rgba(255, 255, 255, 0.9)',
              }}
            >
              {/* Corner Design Accents */}
              <svg className="absolute top-0 right-0 w-28 h-28 pointer-events-none z-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 0H40C55 20 70 25 100 35V0Z" fill="#30D158" />
                <path d="M100 0H60C70 12 85 15 100 20V0Z" fill="#1E853C" />
                <path d="M100 35C80 25 70 20 40 0H20C35 25 60 40 100 50V35Z" fill="#E5FFE9" opacity="0.5" />
              </svg>

              <svg className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none z-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 100H50C40 85 25 70 0 65V100Z" fill="#30D158" />
                <path d="M0 100H30C22 90 12 82 0 80V100Z" fill="#1E853C" />
                <path d="M0 65C15 70 25 80 50 100H70C55 75 30 60 0 50V65Z" fill="#E5FFE9" opacity="0.4" />
              </svg>

              <div className="w-10 h-2 bg-neutral-900 mx-auto rounded-full opacity-90 z-10 shadow-inner" />

              <div className="flex justify-between items-center border-b border-neutral-100 pb-2.5 z-10 mt-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-extrabold tracking-[0.15em] text-neutral-800 font-jakarta">R</span>
                  <span className="text-[9px] font-bold tracking-[0.1em] text-neutral-500 font-jakarta">BHAGWAT</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50 border border-green-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] relative">
                    <span className="absolute inset-0 rounded-full bg-[#30D158] animate-ping opacity-75" />
                  </span>
                  <span className="text-[8px] font-mono tracking-wider font-semibold text-[#1E853C]">ONLINE</span>
                </div>
              </div>

              <div className="flex flex-col items-center my-3 z-10">
                <div className="relative w-24 h-24 rounded-full p-0.5 bg-[#30D158] shadow-md mb-2.5">
                  <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-100">
                    <Image
                      src={PERSONAL_INFO.image}
                      alt={PERSONAL_INFO.name}
                      fill
                      className="object-cover"
                      sizes="(max-w-96px) 100vw, 96px"
                      priority
                    />
                  </div>
                </div>

                <h3 className="text-base font-extrabold tracking-tight text-neutral-900 mb-0.5 font-jakarta">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-[9px] font-extrabold tracking-[0.2em] text-[#1E853C] uppercase mb-3 font-mono">
                  {PERSONAL_INFO.jobTitle}
                </p>

                <div className="w-full border border-dashed border-[#1E853C]/20 bg-[#F7FDF9]/80 backdrop-blur-sm rounded-xl p-3 flex flex-col gap-1.5 text-[9.5px]">
                  <div className="flex justify-between items-center text-neutral-600">
                    <span className="font-bold text-neutral-400 font-mono">EMAIL :</span>
                    <span className="font-mono text-neutral-800 select-all truncate max-w-[170px]">{PERSONAL_INFO.email}</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-600">
                    <span className="font-bold text-neutral-400 font-mono">PHONE :</span>
                    <span className="font-mono text-neutral-800 select-all">{PERSONAL_INFO.phone}</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-600">
                    <span className="font-bold text-neutral-400 font-mono">LOC :</span>
                    <span className="font-mono text-neutral-800">{PERSONAL_INFO.location.city}, {PERSONAL_INFO.location.country}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-2.5 flex flex-col items-center gap-1.5 z-10">
                <div className="w-full h-7 opacity-90 flex items-center justify-center px-2">
                  <svg className="w-full h-full text-neutral-900" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <rect x="0" width="2" height="20" fill="currentColor" />
                    <rect x="3" width="1" height="20" fill="currentColor" />
                    <rect x="6" width="3" height="20" fill="currentColor" />
                    <rect x="11" width="1" height="20" fill="currentColor" />
                    <rect x="14" width="2" height="20" fill="currentColor" />
                    <rect x="18" width="4" height="20" fill="currentColor" />
                    <rect x="24" width="1" height="20" fill="currentColor" />
                    <rect x="27" width="2" height="20" fill="currentColor" />
                    <rect x="31" width="3" height="20" fill="currentColor" />
                    <rect x="36" width="1" height="20" fill="currentColor" />
                    <rect x="39" width="5" height="20" fill="currentColor" />
                    <rect x="46" width="1" height="20" fill="currentColor" />
                    <rect x="49" width="3" height="20" fill="currentColor" />
                    <rect x="54" width="2" height="20" fill="currentColor" />
                    <rect x="58" width="4" height="20" fill="currentColor" />
                    <rect x="64" width="1" height="20" fill="currentColor" />
                    <rect x="67" width="2" height="20" fill="currentColor" />
                    <rect x="71" width="3" height="20" fill="currentColor" />
                    <rect x="76" width="1" height="20" fill="currentColor" />
                    <rect x="79" width="5" height="20" fill="currentColor" />
                    <rect x="86" width="2" height="20" fill="currentColor" />
                    <rect x="90" width="1" height="20" fill="currentColor" />
                    <rect x="93" width="3" height="20" fill="currentColor" />
                    <rect x="98" width="2" height="20" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-[7px] font-mono tracking-[0.25em] text-neutral-400 uppercase select-none">
                  RB-9699245170-2026
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Minimalist Form */}
          <div className="lg:col-span-7 w-full flex flex-col justify-center">
            
            <div className="mb-10">
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white leading-none font-jakarta mb-4"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                LET&apos;S TALK
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-white/70 text-base sm:text-lg max-w-xl font-sans"
              >
                Have an idea? Let&apos;s build something extraordinary together.
              </motion.p>
            </div>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="rounded-2xl border border-white/10 p-6 sm:p-8 bg-white/[0.01] backdrop-blur-md flex flex-col items-center text-center shadow-lg"
                >
                  <div className="w-14 h-14 rounded-full bg-[#30D158]/10 border border-[#30D158]/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-7 h-7 text-[#30D158]" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 font-jakarta">Message Sent!</h4>
                  <p className="text-sm text-white/50 mb-6 max-w-sm">
                    Thank you for reaching out. Your message has been routed successfully. I will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={handleSendAnother}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] text-xs font-semibold text-white/90 hover:text-white transition-all active:scale-[0.98]"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form-fields"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {error && (
                    <div className="p-3 rounded-lg bg-[#FF453A]/10 border border-[#FF453A]/20">
                      <p className="text-[#FF453A] text-xs">{error}</p>
                    </div>
                  )}

                  <div className="relative">
                    <label className="text-[10px] font-mono tracking-[0.25em] text-white/40 block">YOUR NAME</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      placeholder="ENTER NAME"
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-white/20 focus:border-white focus:outline-none transition-colors font-mono text-xs tracking-wider uppercase disabled:opacity-50"
                      disabled={isSubmitting}
                    />
                    {errors.name && <p className="text-[#FF453A] text-[10px] font-mono mt-1">{errors.name.message}</p>}
                  </div>

                  <div className="relative">
                    <label className="text-[10px] font-mono tracking-[0.25em] text-white/40 block">YOUR EMAIL</label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' },
                      })}
                      type="email"
                      placeholder="ENTER EMAIL ADDRESS"
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-white/20 focus:border-white focus:outline-none transition-colors font-mono text-xs tracking-wider uppercase disabled:opacity-50"
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-[#FF453A] text-[10px] font-mono mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="relative">
                    <label className="text-[10px] font-mono tracking-[0.25em] text-white/40 block">SUBJECT</label>
                    <input
                      {...register('subject', { required: 'Subject is required' })}
                      type="text"
                      placeholder="ENTER TOPIC OR PROJECT TYPE"
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-white/20 focus:border-white focus:outline-none transition-colors font-mono text-xs tracking-wider uppercase disabled:opacity-50"
                      disabled={isSubmitting}
                    />
                    {errors.subject && <p className="text-[#FF453A] text-[10px] font-mono mt-1">{errors.subject.message}</p>}
                  </div>

                  <div className="relative">
                    <label className="text-[10px] font-mono tracking-[0.25em] text-white/40 block">TELL ME ABOUT YOUR PROJECT...</label>
                    <textarea
                      {...register('message', { required: 'Message content is required' })}
                      placeholder="WRITE YOUR ENQUIRY HERE..."
                      rows={3}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-white/20 focus:border-white focus:outline-none transition-colors font-mono text-xs tracking-wider uppercase resize-none disabled:opacity-50"
                      disabled={isSubmitting}
                    />
                    {errors.message && <p className="text-[#FF453A] text-[10px] font-mono mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-end justify-between border-b border-white/10 pb-5 text-left group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-transparent focus:outline-none pt-4"
                  >
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.25em] text-white/30 block mb-2">
                        {isSubmitting ? 'PROCESSING...' : 'READY TO SEND'}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-neutral-400 transition-colors font-jakarta uppercase">
                        {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                      </h3>
                    </div>

                    <div className="flex gap-3 pb-1">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black shadow-md transition-all duration-300 group-hover:scale-105 group-hover:bg-neutral-100">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black shadow-md transition-all duration-300 group-hover:scale-105 group-hover:bg-neutral-100">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 20L20 4m0 0H8m12 0v12" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Social Ticker: Interactive scrolling social names */}
        <div className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] mt-24 py-6 overflow-hidden group">
          <div className="flex whitespace-nowrap">
            {/* Scroll Track 1 */}
            <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] py-2" style={{ animationDuration: '12s' }}>
              {socialBentoData.map((social) => {
                const Icon = social.icon;
                const hoverColorClass = socialHoverColors[social.id] || 'hover:text-white';
                return (
                  <div key={`${social.id}-1`} className="inline-flex items-center">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2.5 sm:gap-3.5 transition-all duration-300 font-jakarta font-black uppercase text-2xl sm:text-3xl md:text-4xl tracking-tighter text-white/20 hover:scale-[1.03] ${hoverColorClass} group/item`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 opacity-50 group-hover/item:opacity-100 transition-all duration-300" />
                      <span>{social.name}</span>
                    </a>
                    <span className="text-white/[0.06] font-light self-center text-lg sm:text-xl md:text-2xl mx-8 sm:mx-12 pointer-events-none select-none">•</span>
                  </div>
                );
              })}
            </div>
            {/* Scroll Track 2 */}
            <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] py-2" aria-hidden="true" style={{ animationDuration: '12s' }}>
              {socialBentoData.map((social) => {
                const Icon = social.icon;
                const hoverColorClass = socialHoverColors[social.id] || 'hover:text-white';
                return (
                  <div key={`${social.id}-2`} className="inline-flex items-center">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2.5 sm:gap-3.5 transition-all duration-300 font-jakarta font-black uppercase text-2xl sm:text-3xl md:text-4xl tracking-tighter text-white/20 hover:scale-[1.03] ${hoverColorClass} group/item`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 opacity-50 group-hover/item:opacity-100 transition-all duration-300" />
                      <span>{social.name}</span>
                    </a>
                    <span className="text-white/[0.06] font-light self-center text-lg sm:text-xl md:text-2xl mx-8 sm:mx-12 pointer-events-none select-none">•</span>
                  </div>
                );
              })}
            </div>
            {/* Scroll Track 3 */}
            <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] py-2" aria-hidden="true" style={{ animationDuration: '12s' }}>
              {socialBentoData.map((social) => {
                const Icon = social.icon;
                const hoverColorClass = socialHoverColors[social.id] || 'hover:text-white';
                return (
                  <div key={`${social.id}-3`} className="inline-flex items-center">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2.5 sm:gap-3.5 transition-all duration-300 font-jakarta font-black uppercase text-2xl sm:text-3xl md:text-4xl tracking-tighter text-white/20 hover:scale-[1.03] ${hoverColorClass} group/item`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 opacity-50 group-hover/item:opacity-100 transition-all duration-300" />
                      <span>{social.name}</span>
                    </a>
                    <span className="text-white/[0.06] font-light self-center text-lg sm:text-xl md:text-2xl mx-8 sm:mx-12 pointer-events-none select-none">•</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
