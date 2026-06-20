import React from 'react';
import Image from 'next/image';
import { Author } from '@/types/article';

interface AuthorBoxProps {
  author: Author;
}

export const AuthorBox: React.FC<AuthorBoxProps> = ({ author }) => {
  return (
    <div className="flex items-center p-4 bg-gradient-to-r from-brand-navy/5 to-white border border-brand-navy/10 rounded-2xl shadow-sm font-sans relative overflow-hidden">
      {/* Decorative accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-navy"></div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src={author.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150'}
            alt={author.name}
            width={56}
            height={56}
            className="rounded-full object-cover border-2 border-white shadow-md shrink-0 relative z-10"
          />
          <div className="absolute inset-0 bg-brand-navy/20 rounded-full blur-md -z-0 scale-110"></div>
        </div>
        <div>
          <div className="text-[11px] text-brand-purple font-extrabold uppercase tracking-widest mb-0.5">{author.role || 'रिपोर्टर'}</div>
          <div className="text-base font-extrabold text-slate-800">{author.name}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBox;
