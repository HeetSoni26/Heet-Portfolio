'use client';

import { motion } from 'framer-motion';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { formatNumber } from '@/lib/visitor-utils';

interface VisitorCounterProps {
  variant?: 'navbar' | 'footer' | 'hero' | 'floating';
  showDetails?: boolean;
}

export default function VisitorCounter({ 
  variant = 'navbar',
  showDetails = false 
}: VisitorCounterProps) {
  const { stats, isLoading, error } = useVisitorTracking();

  if (error && !stats.uniqueVisitors) {
    return null; // Gracefully hide if error and no data
  }

  // Navbar variant - compact badge
  if (variant === 'navbar') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
        title={stats.usingFallback ? 'Demo mode - Set up Vercel KV for real tracking' : 'Live visitor count'}
      >
        <div className="relative">
          <div className={`w-2 h-2 rounded-full ${stats.usingFallback ? 'bg-orange-500' : 'bg-green-500'} animate-pulse`} />
          <div className={`absolute inset-0 w-2 h-2 rounded-full ${stats.usingFallback ? 'bg-orange-500' : 'bg-green-500'} animate-ping opacity-75`} />
        </div>
        <span className="text-sm text-white/80 font-medium">
          {isLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            <>
              {formatNumber(stats.uniqueVisitors)}
              <span className="text-white/50 ml-1">visitors</span>
            </>
          )}
        </span>
      </motion.div>
    );
  }

  // Footer variant - detailed stats with rounded boxes
  if (variant === 'footer') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-center gap-3"
      >
        {/* Total Visitors */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
          <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-sm text-white/80">
            {isLoading ? (
              <span className="animate-pulse">...</span>
            ) : (
              <>
                <span className="font-semibold text-white">
                  {stats.uniqueVisitors.toLocaleString()}
                </span>
                <span className="text-white/50 ml-1">Visitors</span>
              </>
            )}
          </span>
        </div>

        {showDetails && !isLoading && (
          <>
            {/* Today's Visitors */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-sm text-white/80">
                <span className="font-semibold text-white">
                  {stats.todayVisitors.toLocaleString()}
                </span>
                <span className="text-white/50 ml-1">Today</span>
              </span>
            </div>

            {/* Total Views */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm text-white/80">
                <span className="font-semibold text-white">
                  {stats.totalVisits.toLocaleString()}
                </span>
                <span className="text-white/50 ml-1">Views</span>
              </span>
            </div>
          </>
        )}
      </motion.div>
    );
  }

  // Hero variant - large display
  if (variant === 'hero') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {isLoading ? (
          <div className="text-white/50 animate-pulse">Loading visitors...</div>
        ) : (
          <div className="text-lg text-white/70">
            Join{' '}
            <span className="text-primary-gradient font-bold text-xl">
              {formatNumber(stats.uniqueVisitors)}+
            </span>
            {' '}developers who visited
          </div>
        )}
      </motion.div>
    );
  }

  // Floating variant - bottom right badge
  if (variant === 'floating') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="fixed bottom-6 right-6 z-40 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 shadow-2xl"
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75" />
          </div>
          <span className="text-sm text-white font-medium">
            {isLoading ? (
              <span className="animate-pulse">...</span>
            ) : (
              <>
                {formatNumber(stats.uniqueVisitors)}
                <span className="text-white/60 ml-1">visitors</span>
              </>
            )}
          </span>
        </div>
      </motion.div>
    );
  }

  return null;
}
