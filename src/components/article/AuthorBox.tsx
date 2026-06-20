import React from 'react';
import Image from 'next/image';
import { Author } from '@/types/article';

interface AuthorBoxProps {
  author: Author;
}

export const AuthorBox: React.FC<AuthorBoxProps> = ({ author }) => {
  return (
    <div className="flex items-center p-4 bg-gradient-to-r from-slate-50 to-white border border-slate-200 border-l-[5px] border-l-brand-navy rounded-2xl shadow-sm font-sans">
      <div className="flex items-center gap-4 pl-1">
        <div className="relative shrink-0">
          <Image
            src={author.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150'}
            alt={author.name}
            width={60}
            height={60}
            className="w-[60px] h-[60px] aspect-square rounded-full object-cover border-2 border-white shadow-sm"
          />
        </div>
        <div>
          <div className="text-[12px] text-brand-purple font-extrabold uppercase tracking-widest mb-0.5">{author.role || 'रिपोर्टर'}</div>
          <div className="text-[17px] font-extrabold text-slate-900">{author.name}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBox;
