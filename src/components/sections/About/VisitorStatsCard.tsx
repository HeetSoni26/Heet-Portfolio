'use client';

import { motion } from 'framer-motion';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { formatNumber } from '@/lib/visitor-utils';

export default function VisitorStatsCard() {
  const { stats, isLoading } = useVisitorTracking();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-md rounded-2xl backdrop-blur-md bg-white/[0.02] border border-white/10 p-6 overflow-hidden group hover:border-white/20 transition-all duration-300"
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{
          background: stats.usingFallback
            ? 'radial-gradient(circle at top, rgba(255, 140, 0, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle at top, rgba(34, 197, 94, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={`w-3 h-3 rounded-full ${
                stats.usingFallback ? 'bg-orange-500' : 'bg-green-500'
              } animate-pulse`}
            />
            <div
              className={`absolute inset-0 w-3 h-3 rounded-full ${
                stats.usingFallback ? 'bg-orange-500' : 'bg-green-500'
              } animate-ping opacity-75`}
            />
          </div>
          <h3 className="text-lg font-bold text-white">Visitor Analytics</h3>
        </div>
        
        {stats.usingFallback && (
          <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full">
            Demo
          </span>
        )}
      </div>

      {/* Stats Grid */}
      <div className="relative z-10 space-y-4">
        {/* Total Visitors */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-white/60">Total Visitors</p>
              <p className="text-2xl font-bold text-white">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  formatNumber(stats.uniqueVisitors)
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Today's Visitors */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-white/60">Today</p>
              <p className="text-2xl font-bold text-white">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  formatNumber(stats.todayVisitors)
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Total Views */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-orange-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-white/60">Total Views</p>
              <p className="text-2xl font-bold text-white">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  formatNumber(stats.totalVisits)
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-white/50 text-center">
          {stats.usingFallback
            ? 'Demo data - Set up Vercel KV for live tracking'
            : 'Real-time visitor analytics'}
        </p>
      </div>
    </motion.div>
  );
}
