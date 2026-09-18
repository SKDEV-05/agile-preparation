import React from 'react';

export function ViewSkeleton() {
  return (
    <div 
      role="status" 
      aria-label="Chargement du module..." 
      className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8 animate-pulse"
    >
      {/* Header skeleton */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8 space-y-4">
        <div className="h-6 w-36 rounded-full bg-black/10 dark:bg-white/10" />
        <div className="h-10 w-3/4 max-w-lg rounded-xl bg-black/10 dark:bg-white/10" />
        <div className="h-4 w-1/2 max-w-md rounded-lg bg-black/5 dark:bg-white/5" />
      </div>

      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i} 
            className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-6 space-y-4 min-h-[180px] flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="h-5 w-2/3 rounded-lg bg-black/10 dark:bg-white/10" />
              <div className="h-3.5 w-full rounded-md bg-black/5 dark:bg-white/5" />
              <div className="h-3.5 w-4/5 rounded-md bg-black/5 dark:bg-white/5" />
            </div>
            <div className="h-9 w-28 rounded-xl bg-[#10B981]/20" />
          </div>
        ))}
      </div>
      <span className="sr-only">Chargement de la page...</span>
    </div>
  );
}
