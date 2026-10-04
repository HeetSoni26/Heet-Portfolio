import { Trophy, Award, Star, Target, Zap, Code, Users, BookOpen } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  details: string;
  icon: LucideIcon;
  color: string;
  year?: string;
}

export const achievements: Achievement[] = [
  {
    id: 'projects',
    title: 'Production Apps',
    description: 'Built & deployed scalable applications',
    details: 'Successfully delivered multiple full-stack applications serving thousands of users with 99.9% uptime',
    icon: Code,
    color: '#3B82F6',
    year: '2024'
  },
  {
    id: 'opensource',
    title: 'Open Source',
    description: 'Active contributor to community projects',
    details: 'Contributed to popular open-source projects and maintained personal repositories with 100+ stars',
    icon: Star,
    color: '#F59E0B',
  },
  {
    id: 'mentorship',
    title: 'Mentorship',
    description: 'Guided junior developers',
    details: 'Mentored 10+ junior developers, helping them grow their skills and advance their careers',
    icon: Users,
    color: '#10B981',
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'Optimized apps for 50% faster load times',
    details: 'Implemented advanced optimization techniques reducing load times and improving Core Web Vitals scores',
    icon: Zap,
    color: '#EF4444',
  },
  {
    id: 'blogging',
    title: 'Tech Blogger',
    description: 'Sharing knowledge through articles',
    details: 'Published technical articles reaching 10K+ readers, covering modern web development practices',
    icon: BookOpen,
    color: '#8B5CF6',
  },
  {
    id: 'excellence',
    title: 'Code Quality',
    description: 'Maintained high standards & best practices',
    details: 'Established coding standards and review processes ensuring maintainable, scalable codebases',
    icon: Award,
    color: '#EC4899',
  },
  {
    id: 'goals',
    title: 'Project Goals',
    description: 'Consistently delivered on time',
    details: 'Achieved 95% on-time delivery rate across all projects with zero critical production bugs',
    icon: Target,
    color: '#06B6D4',
  },
  {
    id: 'recognition',
    title: 'Recognition',
    description: 'Acknowledged for technical excellence',
    details: 'Received recognition for innovative solutions and exceptional problem-solving abilities',
    icon: Trophy,
    color: '#F97316',
  },
];
