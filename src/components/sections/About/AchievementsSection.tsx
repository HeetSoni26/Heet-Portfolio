'use client';

import { motion } from 'framer-motion';
import AchievementsMarquee from './AchievementsMarquee';

export default function AchievementsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8 mb-16"
    >
      {/* Marquee Row */}
      <AchievementsMarquee />
    </motion.div>
  );
}
