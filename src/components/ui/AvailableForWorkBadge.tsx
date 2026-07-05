'use client';

import { useIntroAnimation } from '@/context/IntroAnimationContext';
import { usePathname } from 'next/navigation';

export default function AvailableForWorkBadge() {
  const { isIntroComplete } = useIntroAnimation();
  const pathname = usePathname();

  // Only show badge when intro animation completes
  if (!isIntroComplete) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === '/') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lenis = (window as any).lenis;
        if (lenis && typeof lenis.scrollTo === 'function') {
          lenis.scrollTo(contactSection, { offset: -40 });
        } else {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      window.location.href = '/contact';
    }
  };

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center pointer-events-auto">
      {/* Docked Vertical Pill Badge on Right Side */}
      <button
        onClick={handleClick}
        className="flex flex-col items-center justify-start py-6 px-3 rounded-l-2xl border-l border-y border-white/15 bg-[#0F0E0E]/90 backdrop-blur-2xl hover:bg-white/[0.12] hover:border-white/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] group cursor-pointer transition-all duration-300 select-none"
        title="Click to view contact — Available for opportunities"
        aria-label="Available for opportunity status badge"
      >
        <span
          className="font-mono text-[10.5px] font-medium tracking-[0.25em] text-white/70 group-hover:text-white transition-colors duration-300 uppercase [writing-mode:vertical-lr]"
          style={{
            fontFamily: 'var(--font-space-grotesk), monospace',
          }}
        >
          AVAILABLE FOR OPPORTUNITY
        </span>
      </button>
    </div>
  );
}
