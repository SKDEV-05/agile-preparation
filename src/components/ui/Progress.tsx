import React from 'react';
import { cn } from '../../lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  indicatorColor?: string;
}

export function Progress({ className, value = 0, indicatorColor = "bg-primary", ...props }: ProgressProps) {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(safeValue)}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300/60 dark:border-white/10", className)}
      {...props}
    >
      <div
        className={cn("h-full w-full flex-1 transition-all duration-300 ease-out", indicatorColor)}
        style={{ transform: `translateX(-${100 - safeValue}%)` }}
      />
    </div>
  );
}

