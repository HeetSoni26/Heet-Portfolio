'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';

interface StrengthCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export default function StrengthCard({ icon: Icon, title, description, delay = 0 }: StrengthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card padding="md" hover className="group">
        <div className="mb-4 text-primary">
          <Icon size={32} strokeWidth={1.5} />
        </div>
        <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-sm text-muted">{description}</p>
      </Card>
    </motion.div>
  );
}
