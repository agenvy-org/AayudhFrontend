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
  underlineStyle?: 'glow' | 'simple';
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
  underlineStyle = 'simple',
}) => {
  return (
    <div className={cn("mb-6 relative pb-4 select-none px-[10px]", className)}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-1 z-10">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 font-serif flex items-center gap-2">
            {icon && <span className="flex items-center justify-center text-[#e01a22]">{icon}</span>}
            {title}
          </h2>
          {subtitle && (
            <p className="text-[13px] text-slate-500 font-medium tracking-wide">
              {subtitle}
            </p>
          )}
        </div>
        {actionLink && (
          <Link
            href={actionLink}
            className="shrink-0 flex items-center justify-center gap-1.5 rounded-full px-5 py-2 text-[13px] font-bold tracking-wide transition-all duration-300 border cursor-pointer bg-gradient-to-r from-[#e01a22] to-[#b91118] text-white border-transparent shadow-[0_4px_12px_rgba(224,26,34,0.25)] hover:shadow-[0_6px_16px_rgba(224,26,34,0.4)] hover:-translate-y-0.5 active:translate-y-0 self-start sm:self-auto mb-1 group"
          >
            {actionText}
            <ChevronsRight size={16} strokeWidth={3} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
      
      {/* Enhanced Integrated bottom border design */}
      {!hideLine && (
        <>
          <div className="absolute bottom-0 left-[10px] right-[10px] h-[2px] bg-slate-200/60 rounded-full" />
          <div
            className={cn(
              "absolute bottom-0 left-[10px] h-[3px] w-20 rounded-full",
              underlineStyle === 'glow' ? "bg-gradient-to-r from-[#e01a22] to-brand-yellow shadow-[0_0_8px_rgba(224,26,34,0.5)]" : "bg-brand-yellow"
            )}
          />
        </>
      )}
    </div>
  );
};

export default SectionHeading;
