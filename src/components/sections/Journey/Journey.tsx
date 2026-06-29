'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Rocket } from 'lucide-react';
import { journeyMilestones, JourneyMilestone } from './journey.data';

const typeConfig = {
  work: {
    icon: Briefcase,
    color: '#0A84FF',
    label: 'Work',
  },
  education: {
    icon: GraduationCap,
    color: '#30D158',
    label: 'Education',
  },
  achievement: {
    icon: Rocket,
    color: '#FF9F0A',
    label: 'Milestone',
  },
};

function TimelineCard({ milestone, index }: { milestone: JourneyMilestone; index: number }) {
  const config = typeConfig[milestone.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline connector line */}
      {index < journeyMilestones.length - 1 && (
        <div
          className="absolute left-[23px] top-[60px] w-[2px] h-[calc(100%+32px)] hidden md:block"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
          }}
        />
      )}

      <div className="flex gap-4 md:gap-6">
        {/* Year & Icon Column */}
        <div className="flex flex-col items-center flex-shrink-0">
          {/* Year badge */}
          <div
            className="px-3 py-1.5 rounded-full text-[13px] font-semibold mb-3 border"
            style={{
              background: `${config.color}15`,
              borderColor: `${config.color}30`,
              color: config.color,
            }}
          >
            {milestone.year}
          </div>

          {/* Icon */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center border backdrop-blur-sm"
            style={{
              background: `${config.color}10`,
              borderColor: `${config.color}25`,
              boxShadow: `0 8px 32px ${config.color}15`,
            }}
          >
            <Icon size={22} style={{ color: config.color }} />
          </div>
        </div>

        {/* Content Card */}
        <div
          className="flex-1 p-5 sm:p-6 rounded-[20px] border border-white/[0.08] backdrop-blur-sm mb-8"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Type label */}
          <span
            className="inline-block text-[10px] font-semibold uppercase tracking-wider mb-2"
            style={{ color: config.color }}
          >
            {config.label}
          </span>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1 tracking-[-0.01em]">
            {milestone.title}
          </h3>

          {/* Organization */}
          <p className="text-white/50 text-sm mb-3">{milestone.organization}</p>

          {/* Description */}
          <p className="text-white/60 text-[14px] leading-relaxed mb-4">
            {milestone.description}
          </p>

          {/* Skills */}
          {milestone.skills && (
            <div className="flex flex-wrap gap-2">
              {milestone.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-[11px] rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  return (
    <section
      id="journey"
      className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#0F0E0E] overflow-hidden"
      aria-label="Career Journey and Milestones"
    >
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(10, 132, 255, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(48, 209, 88, 0.06) 0%, transparent 50%)',
        }}
      />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <p className="text-primary-gradient text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 sm:mb-3">
            Experience
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2 sm:mb-3 md:mb-4 text-white px-2 tracking-[-0.02em] leading-[0.95]"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 800,
            }}
          >
            My career{' '}
            <span
              className="font-bold px-1 text-white"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                textTransform: 'none',
              }}
            >
              journey
            </span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            A timeline of my professional growth and key milestones
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {journeyMilestones.map((milestone, index) => (
            <TimelineCard key={milestone.id} milestone={milestone} index={index} />
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mt-8"
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #0A84FF, #30D158)',
              boxShadow: '0 0 20px rgba(10, 132, 255, 0.4)',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
