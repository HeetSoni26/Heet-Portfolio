'use client';

import { useEffect, useState } from 'react';

export interface VisitorStats {
  uniqueVisitors: number;
  totalVisits: number;
  todayVisitors: number;
  lastUpdated: string;
  usingFallback?: boolean;
}

const REFRESH_INTERVAL = 30000; // Refresh every 30 seconds

export function useVisitorTracking() {
  const [stats, setStats] = useState<VisitorStats>({
    uniqueVisitors: 0,
    totalVisits: 0,
    todayVisitors: 0,
    lastUpdated: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track visitor on mount
  useEffect(() => {
    let isMounted = true;

    const trackVisitor = async () => {
      try {
        const response = await fetch('/api/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to track visitor');
        }

        const data = await response.json();
        
        if (isMounted && data.stats) {
          setStats(data.stats);
          setError(null);
        }
      } catch (err) {
        console.error('Error tracking visitor:', err);
        if (isMounted) {
          setError('Failed to track visitor');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    const fetchStats = async () => {
      try {
        const response = await fetch('/api/visitors');
        
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();
        
        if (isMounted) {
          setStats(data);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
        if (isMounted) {
          setError('Failed to fetch stats');
        }
      }
    };

    // Track visitor immediately
    trackVisitor();

    // Refresh stats periodically
    const intervalId = setInterval(fetchStats, REFRESH_INTERVAL);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return { stats, isLoading, error };
}
