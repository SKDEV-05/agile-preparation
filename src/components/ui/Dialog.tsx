import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

interface DialogContextType {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextType>({ open: false });

export function Dialog({ open = false, onOpenChange, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: React.ReactNode }) {
  React.useEffect(() => {
    if (open) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onOpenChange?.(false);
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, onOpenChange]);

  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { open, onOpenChange } = React.useContext(DialogContext);
  if (!open) return null;

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto overscroll-contain">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange?.(false)}
      />
      {/* Modal Dialog Box */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 w-full max-w-lg my-auto flex flex-col gap-3.5 max-h-[calc(100dvh-2rem)] overflow-y-auto border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] p-4.5 sm:p-6 shadow-2xl rounded-3xl text-[#0A0A0A] dark:text-white overscroll-contain",
          className
        )}
        {...props}
      >
        {children}
        <button
          type="button"
          onClick={() => onOpenChange?.(false)}
          className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 rounded-xl p-1.5 text-[#0A0A0A]/60 dark:text-white/60 hover:text-[#10B981] dark:hover:text-[#10B981] hover:bg-[#10B981]/10 transition-colors z-20 cursor-pointer"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>,
    document.body
  );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 text-left", className)} {...props} />;
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-black text-[#0A0A0A] dark:text-white leading-none tracking-tight", className)} {...props} />;
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-[#0A0A0A]/70 dark:text-white/70 leading-relaxed mt-1.5", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-3", className)} {...props} />;
}
