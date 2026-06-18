'use client';

import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';
import { FacebookIcon, TwitterIcon } from '../common/BrandIcons';
import { SHARE_LINKS } from '@/lib/constants';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2055);
    }
  };

  return (
    <div className="flex gap-2 items-center font-sans">
      <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5" /> शेयर करें:
      </span>
      
      {/* Facebook */}
      <a
        href={SHARE_LINKS.facebook(url)}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
        aria-label="Facebook"
      >
        <FacebookIcon className="w-3.5 h-3.5" />
      </a>

      {/* Twitter */}
      <a
        href={SHARE_LINKS.twitter(url, title)}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-900 hover:text-white transition-all duration-200"
        aria-label="Twitter"
      >
        <TwitterIcon className="w-3.5 h-3.5" />
      </a>

      {/* WhatsApp */}
      <a
        href={SHARE_LINKS.whatsapp(url, title)}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-green-600 hover:text-white transition-all duration-200 flex items-center justify-center"
        aria-label="WhatsApp"
      >
        <span className="text-[9px] font-black leading-none px-0.5">WA</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-brand-purple hover:text-white transition-all duration-200"
        aria-label="Copy Link"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <LinkIcon className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};

export default ShareButtons;
