import React from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = ''
}: EmptyStateProps) {
  return (
    <div className={`rounded-3xl border border-dashed border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.02] p-8 sm:p-12 text-center select-none ${className}`}>
      <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25 shadow-xs mb-4">
        <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
      </div>

      <h3 className="text-base sm:text-xl font-black text-[#0A0A0A] dark:text-white tracking-tight">
        {title}
      </h3>

      <p className="mt-2 text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 max-w-md mx-auto leading-relaxed">
        {description}
      </p>

      {(actionLabel || secondaryActionLabel) && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          {actionLabel && onAction && (
            <Button
              variant="primary"
              size="md"
              onClick={onAction}
              className="w-full sm:w-auto font-bold text-xs sm:text-sm"
            >
              {actionLabel}
            </Button>
          )}

          {secondaryActionLabel && onSecondaryAction && (
            <Button
              variant="outline"
              size="md"
              onClick={onSecondaryAction}
              className="w-full sm:w-auto font-semibold text-xs sm:text-sm"
            >
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
