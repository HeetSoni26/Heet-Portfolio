'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';

const GITHUB_USERNAME = 'Rameshwar-bhagwat10';

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubStats {
  totalContributions: number;
  weeks: ContributionWeek[];
  longestStreak: number;
  currentStreak: number;
}

const headerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 350,
      damping: 20,
    }
  }
};

const titleContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    }
  }
};

const wordVariants = {
  hidden: { 
    y: '105%', 
    rotateX: 70,
    opacity: 0,
  },
  visible: {
    y: '0%',
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.97
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 18,
      mass: 0.9,
      delay: 0.15
    }
  }
};

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.003,
    }
  }
};

const cellVariants = {
  hidden: { 
    scale: 0, 
    opacity: 0,
    rotateY: -30
  },
  visible: {
    scale: 1,
    opacity: 1,
    rotateY: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 180,
      damping: 14,
    }
  }
};

const generateMockData = (): GitHubStats => {
  const weeks: ContributionWeek[] = [];
  const today = new Date();
  let totalContributions = 0;

  // Generate last 52 weeks of data
  for (let week = 51; week >= 0; week--) {
    const contributionDays: ContributionDay[] = [];
    
    for (let day = 0; day < 7; day++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (week * 7 + (6 - day)));
      
      const count = Math.floor(Math.random() * 15);
      totalContributions += count;
      
      let color = '#161b22';
      if (count > 0) color = '#0e4429';
      if (count > 3) color = '#006d32';
      if (count > 6) color = '#26a641';
      if (count > 9) color = '#39d353';
      
      contributionDays.push({
        date: date.toISOString().split('T')[0],
        contributionCount: count,
        color,
      });
    }
    
    weeks.push({ contributionDays });
  }

  return {
    totalContributions,
    weeks,
    longestStreak: 47,
    currentStreak: 12,
  };
};

export default function GitHubContributions() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [_error, _setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubContributions = async () => {
      try {
        const response = await fetch('/api/github-contributions');
        
        if (!response.ok) {
          throw new Error('Failed to fetch contributions');
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        setStats(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub contributions:', err);
        // Fallback to mock data if API fails
        const mockData: GitHubStats = generateMockData();
        setStats(mockData);
        setLoading(false);
      }
    };

    fetchGitHubContributions();
  }, []);

  const getContributionLevel = (count: number): string => {
    if (count === 0) return 'No contributions';
    if (count < 4) return 'Low activity';
    if (count < 7) return 'Moderate activity';
    if (count < 10) return 'High activity';
    return 'Very high activity';
  };

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (loading) {
    return (
      <section className="relative py-12 xs:py-16 sm:py-20 px-4 xs:px-5 sm:px-6 bg-[#0F0E0E]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64 xs:h-80 sm:h-96">
            <div className="flex flex-col items-center gap-3 xs:gap-4">
              <div className="w-10 h-10 xs:w-12 xs:h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-white/60 text-xs xs:text-sm">Loading GitHub activity...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (_error || !stats) {
    return null;
  }

  return (
    <section id="github" className="relative z-20 py-12 xs:py-16 sm:py-20 px-4 xs:px-5 sm:px-6 bg-[#0F0E0E] overflow-hidden">


      <div className="relative z-20 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
          variants={headerContainerVariants}
          className="text-center mb-8 xs:mb-10 sm:mb-12"
        >
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full bg-white/5 border border-white/10 mb-3 xs:mb-4"
          >
            <Github className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-white/70" />
            <span className="text-[10px] xs:text-xs font-medium text-white/70 uppercase tracking-wider">Open Source</span>
          </motion.div>
          
          <motion.h2
            variants={titleContainerVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-2 xs:mb-3 tracking-[-0.02em] leading-[0.95] flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.05em]"
            style={{ perspective: 1200 }}
          >
            {"My code contributions".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden py-1">
                <motion.span
                  variants={wordVariants}
                  className="inline-block origin-top text-white"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          
          <motion.p 
            variants={descriptionVariants}
            className="text-muted text-sm xs:text-base sm:text-lg max-w-2xl mx-auto px-2"
          >
            Consistent contributions and continuous learning
          </motion.p>
        </motion.div>

        {/* Contribution Heatmap */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
          variants={cardVariants}
          className="relative p-4 xs:p-5 sm:p-6 md:p-8 rounded-xl xs:rounded-2xl backdrop-blur-xl bg-white/[0.01] border border-white/[0.08] overflow-hidden shadow-2xl"
          style={{
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.03] via-transparent to-purple-500/[0.03] pointer-events-none" />
          
          <div className="relative z-10">
            {/* Heatmap Header */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between mb-4 xs:mb-5 sm:mb-6 gap-3 xs:gap-4">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 xs:w-5 xs:h-5 text-white/70" />
                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white">{PERSONAL_INFO.name}</h3>
              </div>
              <div className="flex items-center gap-2 xs:gap-3">
                <span className="text-[10px] xs:text-xs text-white/50 font-medium">Less</span>
                <div className="flex gap-1 xs:gap-1.5">
                  <div className="w-3 h-3 xs:w-4 xs:h-4 rounded-sm bg-white/10 border border-white/20" />
                  <div className="w-3 h-3 xs:w-4 xs:h-4 rounded-sm bg-[#0e4429] border border-white/10" />
                  <div className="w-3 h-3 xs:w-4 xs:h-4 rounded-sm bg-[#006d32] border border-white/10" />
                  <div className="w-3 h-3 xs:w-4 xs:h-4 rounded-sm bg-[#26a641] border border-white/10" />
                  <div className="w-3 h-3 xs:w-4 xs:h-4 rounded-sm bg-[#39d353] border border-white/10" />
                </div>
                <span className="text-[10px] xs:text-xs text-white/50 font-medium">More</span>
              </div>
            </div>

            {/* Heatmap Grid with stylish scrollbar */}
            <div 
              className="overflow-x-auto pb-3 xs:pb-4 github-scrollbar"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(57, 211, 83, 0.5) rgba(255, 255, 255, 0.05)',
              }}
            >
              <div className="inline-flex flex-col gap-1.5 xs:gap-2">
                {/* Month labels at top */}
                <div className="flex gap-[3px] xs:gap-1 pl-8 xs:pl-10 sm:pl-[52px]">
                  {stats.weeks.map((week, weekIndex) => {
                    // Get the first day of the week to determine month
                    const firstDay = new Date(week.contributionDays[0].date);
                    const month = firstDay.getMonth();
                    const isFirstWeekOfMonth = weekIndex === 0 || 
                      new Date(stats.weeks[weekIndex - 1].contributionDays[0].date).getMonth() !== month;
                    
                    return (
                      <div key={weekIndex} className="w-[10px] xs:w-3 text-[9px] xs:text-[10px] sm:text-xs text-white/40">
                        {isFirstWeekOfMonth && (
                          <span className="inline-block -ml-1 xs:-ml-2">
                            {monthLabels[month]}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Grid container */}
                <div className="flex gap-[3px] xs:gap-1">
                {/* Day labels */}
                <div className="flex flex-col gap-[3px] xs:gap-1 pr-1 xs:pr-1.5 sm:pr-2 justify-around text-[8px] xs:text-[10px] sm:text-xs text-white/40">
                  {dayLabels.map((day, i) => (
                    i % 2 === 1 && <div key={day} className="h-[10px] xs:h-3 flex items-center">{day}</div>
                  ))}
                </div>

                  {/* Contribution grid */}
                  <motion.div 
                    variants={gridContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-10%" }}
                    className="flex gap-[3px] xs:gap-1"
                  >
                    {stats.weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-[3px] xs:gap-1">
                        {week.contributionDays.map((day) => (
                          <motion.div
                            key={day.date}
                            variants={cellVariants}
                            whileHover={{ 
                              scale: 1.5, 
                              zIndex: 10,
                              transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
                            }}
                            className="w-[10px] h-[10px] xs:w-3 xs:h-3 rounded-[2px] xs:rounded-sm cursor-pointer relative group"
                            style={{ backgroundColor: day.color }}
                            title={`${day.contributionCount} contributions on ${day.date}`}
                          >
                            {/* Tooltip - hidden on small mobile, show on hover for larger */}
                            <div className="hidden xs:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 xs:px-3 py-1.5 xs:py-2 rounded-md xs:rounded-lg bg-black/90 border border-white/20 text-[10px] xs:text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                              <div className="font-semibold">{day.contributionCount} contributions</div>
                              <div className="text-white/60">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                              <div className="text-white/40 text-[9px] xs:text-[10px] mt-0.5 xs:mt-1">{getContributionLevel(day.contributionCount)}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Scroll hint for mobile */}
            <div className="flex xs:hidden items-center justify-center gap-2 mt-2 text-[10px] text-white/30">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>Scroll to explore</span>
            </div>

            {/* Footer with GitHub Profile Button */}
            <div className="mt-4 xs:mt-5 sm:mt-6 pt-4 xs:pt-5 sm:pt-6 border-t border-white/10 flex justify-center">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group glowing-border-btn-green px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 rounded-full font-medium text-xs xs:text-sm text-white/70 hover:text-white transition-all duration-300 inline-flex items-center gap-1.5 xs:gap-2 opacity-90 hover:opacity-100 cursor-pointer select-none"
              >
                {/* Inner dark background mask */}
                <div className="absolute inset-0 rounded-full bg-[#0F0E0E]/95 backdrop-blur-xl z-0 pointer-events-none transition-colors duration-300 group-hover:bg-[#0F0E0E]" />

                <Github className="relative z-10 w-4 h-4 xs:w-[18px] xs:h-[18px] text-white/70 group-hover:text-white transition-colors" />
                <span className="relative z-10 text-xs xs:text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                  Visit GitHub Profile
                </span>
                <svg 
                  className="relative z-10 w-3.5 h-3.5 xs:w-4 xs:h-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
