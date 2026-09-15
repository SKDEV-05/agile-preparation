import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none touch-manipulation";
    
    const variants = {
      primary: "bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow",
      secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200/80",
      outline: "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm",
      ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80",
      danger: "bg-danger text-white hover:bg-red-600 shadow-sm",
      accent: "bg-accent text-white hover:bg-accent-hover shadow-sm",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs rounded-xl gap-1.5",
      md: "h-10 sm:h-11 px-4 text-xs sm:text-sm rounded-xl gap-2",
      lg: "h-11 sm:h-12 px-5 sm:px-6 text-sm sm:text-base rounded-xl gap-2.5 font-semibold",
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
