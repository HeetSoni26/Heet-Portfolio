export interface RingMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  color: string; // Hex color code
  rgb: string;   // RGB comma separated values (for opacity backgrounds)
  description: string;
}

export interface DayMetric {
  day: string;
  value: number;
}

export interface MetricCardData {
  title: string;
  value: string;
  unit?: string;
  trend?: string; // e.g. "+12.4% this week"
  trendDirection?: 'up' | 'down' | 'neutral';
  color: string;
  rgb: string;
  weeklyData?: DayMetric[];
  description: string;
}

export const activityRings: RingMetric[] = [
  {
    name: 'Projects Shipped',
    value: 7,
    target: 10,
    unit: 'shipped',
    color: '#FF2D55',
    rgb: '255, 45, 85',
    description: 'Active and completed projects built in the last 12 months.'
  },
  {
    name: 'GitHub Commits',
    value: 185,
    target: 250,
    unit: 'commits',
    color: '#30D158',
    rgb: '48, 209, 88',
    description: 'Direct code commits registered on GitHub this month.'
  },
  {
    name: 'Weekly Focus Time',
    value: 48,
    target: 60,
    unit: 'hrs',
    color: '#0A84FF',
    rgb: '10, 132, 255',
    description: 'Productive keyboard-interactive coding time in editor.'
  }
];

export const weeklyFocusData: DayMetric[] = [
  { day: 'M', value: 6.5 },
  { day: 'T', value: 8.0 },
  { day: 'W', value: 7.2 },
  { day: 'T', value: 9.0 },
  { day: 'F', value: 8.5 },
  { day: 'S', value: 5.0 },
  { day: 'S', value: 3.8 }
];

export const weeklyTrafficData: DayMetric[] = [
  { day: 'M', value: 420 },
  { day: 'T', value: 510 },
  { day: 'W', value: 480 },
  { day: 'T', value: 620 },
  { day: 'F', value: 550 },
  { day: 'S', value: 380 },
  { day: 'S', value: 340 }
];

export const otherMetrics = {
  commitsThisYear: {
    value: 1254,
    description: 'Yearly contributions logged.'
  },
  coffeeConsumed: {
    value: 342,
    description: 'Caffeine inputs powering complex logic.'
  },
  visitorStats: {
    value: 4850,
    description: 'Unique portfolio visits logged.'
  },
  focusHoursTotal: {
    value: 1420,
    description: 'Lifetime focus developer hours logged.'
  }
};
