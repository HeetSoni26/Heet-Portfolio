'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import { ChevronDown, Home, User, Code2, Briefcase, Mail, LucideIcon } from 'lucide-react';

interface NavLinksProps {
  activeSection: string;
  vertical?: boolean;
}

// Icon mapping for nav links
const navIcons: Record<string, LucideIcon> = {
  hero: Home,
  about: User,
  skills: Code2,
  work: Briefcase,
  contact: Mail,
};

export default function NavLinks({ activeSection, vertical = false }: NavLinksProps) {
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [hoveredLinkId, setHoveredLinkId] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const scrollTo = (id: string) => {
    if (id === 'contact') {
      router.push('/contact');
    } else if (pathname !== '/') {
      router.push('/#' + id);
    } else {
      window.dispatchEvent(new CustomEvent('trigger-nav-fade', { detail: { id } }));
    }
    setShowAboutDropdown(false);
  };

  // Vertical layout rendering (scrolled sidebar mode)
  if (vertical) {
    return (
      <div className="flex flex-col items-center gap-5 relative py-1.5">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.id;
          const hasDropdown = link.id === 'about';
          const Icon = navIcons[link.id];

          if (hasDropdown) {
            return (
              <div
                key={link.id}
                className="relative"
                onMouseEnter={() => {
                  setShowAboutDropdown(true);
                  setHoveredLinkId(link.id);
                }}
                onMouseLeave={() => {
                  setShowAboutDropdown(false);
                  setHoveredLinkId(null);
                }}
              >
                <motion.button
                  onClick={() => scrollTo(link.id)}
                  onMouseEnter={() => setHoveredLinkId(link.id)}
                  onMouseLeave={() => setHoveredLinkId(null)}
                  whileHover="hover"
                  whileTap={{ scale: 0.93 }}
                  variants={{
                    hover: { scale: 1.05 }
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center relative ${
                    isActive ? 'text-white font-bold animate-pulse' : 'text-white/70 hover:text-white'
                  }`}
                  aria-label={link.label}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLinkVertical"
                      className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/[0.1]"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 28,
                      }}
                    />
                  )}

                  {hoveredLinkId === link.id && !isActive && (
                    <motion.div
                      layoutId="hoverNavLinkVertical"
                      className="absolute inset-0 bg-white/[0.04] rounded-full border border-white/[0.05]"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                        mass: 0.8,
                      }}
                    />
                  )}

                  {Icon && (
                    <motion.div
                      variants={{
                        hover: { scale: 1.12, rotate: 6 }
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="relative z-10 flex items-center justify-center"
                    >
                      <Icon size={18} />
                    </motion.div>
                  )}

                  {/* Hover tooltip tag (flies out to the right) */}
                  <AnimatePresence>
                    {hoveredLinkId === link.id && (
                      <motion.span
                        initial={{ opacity: 0, x: 0 }}
                        animate={{ opacity: 1, x: 12 }}
                        exit={{ opacity: 0, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-full top-1/2 -translate-y-1/2 bg-neutral-950/95 border border-white/[0.08] text-[10px] tracking-wider uppercase font-outfit font-extrabold text-white px-2.5 py-1 rounded-lg shadow-lg pointer-events-none whitespace-nowrap z-50"
                      >
                        {link.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Right flyout dropdown for About sub-menu */}
                <AnimatePresence>
                  {showAboutDropdown && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.95 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 22,
                        mass: 0.8,
                      }}
                      className="absolute left-full top-0 ml-3.5 backdrop-blur-md bg-neutral-950/90 border border-white/[0.12] rounded-xl shadow-2xl overflow-hidden min-w-[130px] p-1 flex flex-col gap-0.5 z-50"
                      style={{
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      <button
                        onClick={() => scrollTo('about')}
                        className="w-full px-3 py-2 text-left text-[11px] font-bold font-outfit tracking-wide uppercase text-white/70 hover:text-white hover:bg-white/[0.08] rounded-lg transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <User size={13} className="text-[#FF2D55]" />
                        <span>About Me</span>
                      </button>
                      <button
                        onClick={() => scrollTo('my-journey')}
                        className="w-full px-3 py-2 text-left text-[11px] font-bold font-outfit tracking-wide uppercase text-white/70 hover:text-white hover:bg-white/[0.08] rounded-lg transition-all border-t border-white/[0.04] pt-2 flex items-center gap-2 cursor-pointer"
                      >
                        <Briefcase size={13} className="text-[#0A84FF]" />
                        <span>My Journey</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          return (
            <motion.button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              onMouseEnter={() => setHoveredLinkId(link.id)}
              onMouseLeave={() => setHoveredLinkId(null)}
              whileHover="hover"
              whileTap={{ scale: 0.93 }}
              variants={{
                hover: { scale: 1.05 }
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center relative ${
                isActive ? 'text-white font-bold' : 'text-white/70 hover:text-white'
              }`}
              aria-label={link.label}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavLinkVertical"
                  className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/[0.1]"
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 28,
                  }}
                />
              )}

              {hoveredLinkId === link.id && !isActive && (
                <motion.div
                  layoutId="hoverNavLinkVertical"
                  className="absolute inset-0 bg-white/[0.04] rounded-full border border-white/[0.05]"
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                    mass: 0.8,
                  }}
                />
              )}

              {Icon && (
                <motion.div
                  variants={{
                    hover: { scale: 1.12, rotate: 6 }
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="relative z-10 flex items-center justify-center"
                >
                  <Icon size={18} />
                </motion.div>
              )}

              {/* Hover tooltip label */}
              <AnimatePresence>
                {hoveredLinkId === link.id && (
                  <motion.span
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 12 }}
                    exit={{ opacity: 0, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 bg-neutral-950/95 border border-white/[0.08] text-[10px] tracking-wider uppercase font-outfit font-extrabold text-white px-2.5 py-1 rounded-lg shadow-lg pointer-events-none whitespace-nowrap z-50"
                  >
                    {link.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    );
  }

  // Horizontal layout (original top nav mode)
  return (
    <div className="flex items-center gap-2 relative">
      {NAV_LINKS.map((link) => {
        const isActive = activeSection === link.id;
        const hasDropdown = link.id === 'about';
        const Icon = navIcons[link.id];

        if (hasDropdown) {
          return (
            <div
              key={link.id}
              className="relative"
              onMouseEnter={() => {
                setShowAboutDropdown(true);
                setHoveredLinkId(link.id);
              }}
              onMouseLeave={() => {
                setShowAboutDropdown(false);
                setHoveredLinkId(null);
              }}
            >
              <motion.button
                onClick={() => scrollTo(link.id)}
                whileHover="hover"
                whileTap={{ scale: 0.93 }}
                variants={{
                  hover: { scale: 1.05, y: -1 }
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`relative text-sm px-4 py-2 rounded-full cursor-pointer flex items-center gap-1.5 ${
                  isActive ? 'text-white font-semibold' : 'text-white/70 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavLink"
                    className="absolute inset-0 bg-white/[0.05] rounded-full border border-white/[0.08]"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                {hoveredLinkId === link.id && !isActive && (
                  <motion.div
                    layoutId="hoverNavLinkHorizontal"
                    className="absolute inset-0 bg-white/[0.03] rounded-full border border-white/[0.04]"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                      mass: 0.8,
                    }}
                  />
                )}

                {Icon && (
                  <motion.div
                    variants={{
                      hover: { scale: 1.12, rotate: 6 }
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="relative z-10 flex items-center justify-center mr-1"
                  >
                    <Icon size={16} />
                  </motion.div>
                )}
                <span className="relative z-10">{link.label}</span>
                <ChevronDown size={14} className="relative z-10" />
              </motion.button>

              <AnimatePresence>
                {showAboutDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.96 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 22,
                      mass: 0.8,
                    }}
                    className="absolute top-full mt-2 left-0 backdrop-blur-md bg-white/[0.03] border border-white/[0.15] rounded-b-xl shadow-lg overflow-hidden min-w-[160px]"
                    style={{
                      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                    }}
                  >
                    <button
                      onClick={() => scrollTo('about')}
                      className="w-full px-4 py-2.5 text-left text-sm text-white/70 hover:text-white hover:bg-white/[0.08] transition-all duration-200 flex items-center gap-2 cursor-pointer"
                    >
                      <User size={14} />
                      About Me
                    </button>
                    <button
                      onClick={() => scrollTo('my-journey')}
                      className="w-full px-4 py-2.5 text-left text-sm text-white/70 hover:text-white hover:bg-white/[0.08] transition-all duration-200 border-t border-white/[0.08] flex items-center gap-2 cursor-pointer"
                    >
                      <Briefcase size={14} />
                      My Journey
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }

        return (
          <div
            key={link.id}
            className="relative"
            onMouseEnter={() => setHoveredLinkId(link.id)}
            onMouseLeave={() => setHoveredLinkId(null)}
          >
            <motion.button
              onClick={() => scrollTo(link.id)}
              whileHover="hover"
              whileTap={{ scale: 0.93 }}
              variants={{
                hover: { scale: 1.05, y: -1 }
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`relative text-sm px-4 py-2 rounded-full cursor-pointer flex items-center gap-1.5 ${
                isActive ? 'text-white font-semibold' : 'text-white/70 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavLink"
                  className="absolute inset-0 bg-white/[0.05] rounded-full border border-white/[0.08]"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}

              {hoveredLinkId === link.id && !isActive && (
                <motion.div
                  layoutId="hoverNavLinkHorizontal"
                  className="absolute inset-0 bg-white/[0.03] rounded-full border border-white/[0.04]"
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                    mass: 0.8,
                  }}
                />
              )}

              {Icon && (
                <motion.div
                  variants={{
                    hover: { scale: 1.12, rotate: 6 }
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="relative z-10 flex items-center justify-center mr-1"
                >
                  <Icon size={16} />
                </motion.div>
              )}
              <span className="relative z-10">{link.label}</span>
            </motion.button>
          </div>
        );
      })}
    </div>
  );
}
