import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'default', size = 'md', children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-white border border-black/20 dark:border-white/20",
    primary: "bg-[#10B981] text-white border border-transparent",
    accent: "bg-[#22C55E] text-white border border-transparent",
    success: "bg-[#10B981] text-white border border-transparent",
    warning: "bg-[#0A0A0A] text-white border border-black/30 dark:bg-white dark:text-[#0A0A0A] dark:border-white",
    danger: "bg-[#0A0A0A] text-white border border-white/20 dark:bg-white dark:text-[#0A0A0A]",
    outline: "bg-transparent text-[#10B981] border border-[#10B981]",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase",
    md: "px-2.5 py-1 text-xs font-semibold",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full transition-colors select-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
