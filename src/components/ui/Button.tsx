import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none touch-manipulation cursor-pointer";
    
    const variants = {
      primary: "bg-[#10B981] text-white hover:bg-[#22C55E] border border-transparent shadow-xs",
      secondary: "bg-[#22C55E] text-white hover:bg-[#10B981] border border-transparent shadow-xs",
      outline: "bg-white text-[#10B981] border border-[#10B981] hover:bg-[#10B981] hover:text-white dark:bg-[#0A0A0A] dark:text-white dark:border-[#10B981] dark:hover:bg-[#10B981] dark:hover:text-white shadow-xs",
      ghost: "bg-transparent text-[#0A0A0A] hover:bg-[#10B981]/10 hover:text-[#10B981] dark:text-white dark:hover:bg-[#10B981]/15 dark:hover:text-[#10B981]",
      danger: "bg-[#0A0A0A] text-white hover:bg-[#22C55E] border border-black/20 dark:border-white/20 shadow-xs",
      accent: "bg-[#22C55E] text-white hover:bg-[#10B981] border border-transparent shadow-xs",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs rounded-xl gap-1.5",
      md: "h-10 sm:h-11 px-4 text-xs sm:text-sm rounded-xl gap-2",
      lg: "h-11 sm:h-12 px-5 sm:px-6 text-sm sm:text-base rounded-xl gap-2.5",
      icon: "h-10 w-10 p-0 rounded-xl",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
