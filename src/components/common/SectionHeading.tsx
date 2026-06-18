import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  accentColor?: 'navy' | 'purple';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  className,
  accentColor = 'navy'
}) => {
  return (
    <div className={cn("mb-6 border-b border-slate-100 pb-3", className)}>
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-brand-navy font-serif">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-slate-500 font-sans tracking-wide">
            {subtitle}
          </p>
        )}
      </div>
      <div
        className={cn(
          "mt-2 h-[3px] w-16 rounded-full",
          accentColor === 'purple' ? "bg-brand-purple" : "bg-brand-navy"
        )}
      />
    </div>
  );
};

export default SectionHeading;
