'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import useScrollSpy from '@/hooks/useScrollSpy';
import { useIntroAnimation } from '@/context/IntroAnimationContext';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(['hero', 'about', 'skills', 'work', 'contact']);
  const { isIntroComplete } = useIntroAnimation();
  const [isHoveredHorizontal, setIsHoveredHorizontal] = useState(false);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);

  // Scroll visibility states
  const [isVisible, setIsVisible] = useState(true);

  // Mark intro as played after first animation cycle completes
  useEffect(() => {
    if (isIntroComplete && !hasPlayedIntro) {
      const timer = setTimeout(() => {
        setHasPlayedIntro(true);
      }, 3200); // After all Phase 3 animations complete
      return () => clearTimeout(timer);
    }
  }, [isIntroComplete, hasPlayedIntro]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      // Always show navbar near top or when mobile menu is open
      if (currentScrollY < 50 || isMobileMenuOpen) {
        setIsVisible(true);
      } else {
        // Scroll down -> hide instantly
        if (diff > 0) {
          setIsVisible(false);
        } 
        // Scroll up -> show instantly
        else if (diff < 0) {
          setIsVisible(true);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  const shouldBeVisibleMobile = isIntroComplete && isVisible;

  return (
    <>
      {/* Desktop Logo - Fixed at Top Left */}
      <div className="hidden md:block">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={isIntroComplete ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
          transition={{ duration: 0.8, delay: isIntroComplete && !hasPlayedIntro ? 0.9 : 0, ease: [0.34, 1.56, 0.64, 1] }}
          className={`fixed top-6 left-6 md:left-10 z-50 cursor-pointer w-20 h-20 ${isIntroComplete && !hasPlayedIntro ? 'hero-logo-animated' : ''}`}
          onClick={() => {
            if (pathname === '/') {
              window.dispatchEvent(new CustomEvent('trigger-nav-fade', { detail: { id: 'hero' } }));
            } else {
              router.push('/');
            }
          }}
          whileHover={{ scale: 1.1 }}
        >
          <Image
            src="/icons/logo.svg"
            alt="Rameshwar Bhagwat Logo"
            width={80}
            height={80}
            className="w-full h-full object-contain"
            priority
          />
        </motion.div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:block">
        {/* TOP HORIZONTAL NAV MODE */}
        <motion.nav
          initial={{ y: -100, scale: 0.95, opacity: 0, rotateX: 10 }}
          animate={{
            y: isIntroComplete && isVisible ? 0 : -100,
            scale: isIntroComplete && isVisible ? 1 : 0.95,
            opacity: isIntroComplete && isVisible ? 1 : 0,
            rotateX: isIntroComplete && isVisible ? 0 : 10
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 22, mass: 0.9, delay: isIntroComplete && isVisible && !hasPlayedIntro ? 0.9 : 0 }}
          onMouseEnter={() => setIsHoveredHorizontal(true)}
          onMouseLeave={() => setIsHoveredHorizontal(false)}
          className={`fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-6 md:px-10 ${isIntroComplete && !hasPlayedIntro ? 'hero-nav-animated' : ''}`}
        >
          <div
            className="relative rounded-full px-3 py-1.5 flex items-center gap-1 border pointer-events-auto"
            style={{
              background: 'rgba(15, 14, 14, 0.4)',
              backdropFilter: 'blur(8px)',
              borderColor: 'rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Rotating border wrapper */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
              style={{
                padding: '1px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
              }}
            >
              <div
                className="absolute left-1/2 top-1/2 w-[150%] aspect-square animate-navbar-border-spin"
                style={{
                  background: 'conic-gradient(from 0deg, #ffffff, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.2) 75%, #ffffff)',
                  animationDuration: isHoveredHorizontal ? '2s' : '6s',
                  transition: 'animation-duration 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </div>
            <NavLinks activeSection={activeSection} vertical={false} />
          </div>
        </motion.nav>
      </div>

      {/* Mobile Navbar */}
      <motion.nav
        className="fixed top-4 left-0 right-0 z-50 px-4 md:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          y: shouldBeVisibleMobile ? 0 : isIntroComplete ? -90 : -20,
          opacity: shouldBeVisibleMobile ? 1 : isIntroComplete ? 0 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex justify-between items-center bg-[#0F0E0E]/40 border border-white/[0.05]">
          {/* Rotating white thin border */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
            style={{
              padding: '1px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 w-[150%] aspect-square animate-navbar-border-spin"
              style={{
                background: 'conic-gradient(from 0deg, #ffffff, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.2) 75%, #ffffff)',
              }}
            />
          </div>
          {/* Logo */}
          <div
            className="cursor-pointer flex-shrink-0"
            onClick={() => {
              if (pathname === '/') {
                window.dispatchEvent(new CustomEvent('trigger-nav-fade', { detail: { id: 'hero' } }));
              } else {
                router.push('/');
              }
            }}
          >
            <Image
              src="/icons/logo.svg"
              alt="Rameshwar Bhagwat Logo"
              width={40}
              height={40}
              priority
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-1.5 hover:bg-white/[0.05] rounded-full transition-all"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeSection={activeSection}
        />
      </motion.nav>
    </>
  );
}
