import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "कोई डेटा नहीं मिला",
  description = "इस श्रेणी में फिलहाल कोई सामग्री उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।",
  className
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50", className)}>
      <AlertCircle className="w-10 h-10 text-slate-400 mb-3" />
      <h3 className="text-base font-semibold text-slate-700 font-sans">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mt-1 font-sans">{description}</p>
    </div>
  );
};

export default EmptyState;
