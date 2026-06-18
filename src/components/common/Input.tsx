import React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-1 text-sm transition-all duration-200 placeholder:text-slate-400 focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/15 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
