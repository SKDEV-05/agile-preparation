import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'default', size = 'md', children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-slate-100 text-slate-700 border-slate-200",
    primary: "bg-primary-light text-primary border-indigo-200",
    accent: "bg-accent-light text-accent-dark border-teal-200",
    success: "bg-success-light text-success border-success-border",
    warning: "bg-warning-light text-amber-800 border-warning-border",
    danger: "bg-danger-light text-danger border-danger-border",
    outline: "bg-white text-slate-600 border-slate-200",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase",
    md: "px-2.5 py-1 text-xs font-medium",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border transition-colors",
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
