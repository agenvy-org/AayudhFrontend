import React from 'react';
import Link from 'next/link';
import { ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  accentColor?: 'navy' | 'purple';
  actionLink?: string;
  actionText?: string;
  icon?: React.ReactNode;
  hideLine?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  className,
  accentColor = 'navy',
  actionLink,
  actionText = 'और भी',
  icon,
  hideLine = false,
}) => {
  return (
    <div className={cn("mb-6 relative pb-3.5 select-none px-[10px]", className)}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 font-serif flex items-center gap-2">
            {icon && <span className="flex items-center justify-center text-brand-yellow">{icon}</span>}
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-500 font-sans tracking-wide">
              {subtitle}
            </p>
          )}
        </div>
        {actionLink && (
          <Link
            href={actionLink}
            className="shrink-0 flex items-center justify-center gap-1 rounded-[10px] px-4 py-1.5 text-[12px] font-semibold tracking-wide transition-all duration-300 border cursor-pointer bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 self-start sm:self-auto mb-1 group"
          >
            {actionText}
            <ChevronsRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
      {/* Integrated bottom border design */}
      {!hideLine && (
        <>
          <div className="absolute bottom-0 left-[10px] right-[10px] h-[1px] bg-slate-200" />
          <div
            className={cn(
              "absolute bottom-0 left-[10px] h-[3px] w-24 rounded-full -mb-[1px]",
              "bg-brand-yellow"
            )}
          />
        </>
      )}
    </div>
  );
};

export default SectionHeading;
