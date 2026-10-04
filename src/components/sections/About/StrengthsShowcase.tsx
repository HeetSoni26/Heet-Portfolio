'use client';

import { motion } from 'framer-motion';
import { Zap, Target, Rocket, Code2, Lightbulb, Users } from 'lucide-react';

const strengths = [
  {
    icon: Zap,
    title: 'Fast Development',
    description: 'Rapid prototyping and iteration',
    color: 'from-red-500 via-pink-500 to-orange-500',
  },
  {
    icon: Target,
    title: 'User-Centric',
    description: 'Designing with users in mind',
    color: 'from-pink-500 via-orange-500 to-red-500',
  },
  {
    icon: Rocket,
    title: 'Scalable Solutions',
    description: 'Building for growth',
    color: 'from-red-500 via-pink-500 to-orange-500',
  },
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Maintainable architecture',
    color: 'from-orange-500 via-pink-500 to-red-500',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Creative problem solving',
    color: 'from-red-500 via-pink-500 to-orange-500',
  },
  {
    icon: Users,
    title: 'Team Player',
    description: 'Collaborative mindset',
    color: 'from-orange-500 via-pink-500 to-red-500',
  },
];

export default function StrengthsShowcase() {
  return (
    <div className="relative py-16">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl font-bold mb-2">Core Strengths</h3>
        <p className="text-muted">What I bring to the table</p>
      </motion.div>

      {/* Hexagon Grid Layout */}
      <div className="max-w-5xl mx-auto">
        {/* Desktop: Creative Hexagon-inspired Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 relative">
          {strengths.map((strength, index) => (
            <motion.div
              key={strength.title}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              className={`relative group ${index >= 3 ? 'md:col-start-auto' : ''}`}
            >
              {/* Strength Card */}
              <div className="relative h-full">
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${strength.color} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500 rounded-3xl`} />
                
                {/* Card content */}
                <div className="relative h-full bg-card/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 group-hover:border-primary/50 transition-all duration-300 flex flex-col items-center text-center">
                  {/* Icon with gradient background */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative mb-6"
                  >
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${strength.color} p-[2px] group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                        <strength.icon className="text-primary" size={36} strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    {/* Animated ring */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${strength.color} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`} />
                  </motion.div>

                  {/* Title */}
                  <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {strength.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-muted leading-relaxed">
                    {strength.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${strength.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Stacked Cards */}
        <div className="md:hidden space-y-6">
          {strengths.map((strength, index) => (
            <motion.div
              key={strength.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${strength.color} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500 rounded-2xl`} />
              
              {/* Card content */}
              <div className="relative bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 group-hover:border-primary/50 transition-all duration-300 flex items-start gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${strength.color} p-[2px]`}>
                  <div className="w-full h-full bg-background rounded-xl flex items-center justify-center">
                    <strength.icon className="text-primary" size={24} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                    {strength.title}
                  </h4>
                  <p className="text-sm text-muted">
                    {strength.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
