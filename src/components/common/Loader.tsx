import React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Loader: React.FC<LoaderProps> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-slate-200 border-t-brand-purple",
          sizeClasses[size]
        )}
      />
    </div>
  );
};

export default Loader;
