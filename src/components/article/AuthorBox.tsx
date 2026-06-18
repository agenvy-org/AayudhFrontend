import React from 'react';
import { Author } from '@/types/article';

interface AuthorBoxProps {
  author: Author;
}

export const AuthorBox: React.FC<AuthorBoxProps> = ({ author }) => {
  return (
    <div className="flex gap-4 p-4 border border-slate-100 bg-slate-50/50 rounded-xl items-center font-sans">
      <img
        src={author.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150'}
        alt={author.name}
        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
      />
      <div>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{author.role || 'रिपोर्टर'}</div>
        <div className="text-sm font-black text-slate-800 mt-0.5">{author.name}</div>
        {author.bio && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{author.bio}</p>}
      </div>
    </div>
  );
};

export default AuthorBox;
