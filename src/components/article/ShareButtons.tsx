'use client';

import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';
import { FacebookIcon, TwitterIcon, WhatsAppIcon } from '../common/BrandIcons';
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
        className="rounded-full bg-[#1877F2] w-[30px] h-[30px] flex items-center justify-center text-white hover:bg-[#1877F2]/90 hover:scale-105 transition-all duration-200 shadow-sm"
        aria-label="Facebook"
      >
        <FacebookIcon className="w-3.5 h-3.5" />
      </a>

      {/* Twitter */}
      <a
        href={SHARE_LINKS.twitter(url, title)}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-black w-[30px] h-[30px] flex items-center justify-center text-white hover:bg-black/90 hover:scale-105 transition-all duration-200 shadow-sm"
        aria-label="Twitter"
      >
        <TwitterIcon className="w-3.5 h-3.5" />
      </a>

      {/* WhatsApp */}
      <a
        href={SHARE_LINKS.whatsapp(url, title)}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-[#25D366] w-[30px] h-[30px] flex items-center justify-center text-white hover:bg-[#25D366]/90 hover:scale-105 transition-all duration-200 shadow-sm"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon className="w-3.5 h-3.5" />
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className={`rounded-full w-[30px] h-[30px] flex items-center justify-center text-white hover:scale-105 transition-all duration-200 shadow-sm ${
          copied ? 'bg-green-500 hover:bg-green-600' : 'bg-brand-purple hover:bg-brand-purple/90'
        }`}
        aria-label="Copy Link"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <LinkIcon className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};

export default ShareButtons;
