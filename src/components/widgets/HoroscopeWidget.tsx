'use client';

import React from 'react';
import Link from 'next/link';

export const HoroscopeWidget: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm font-sans">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">आज का राशिफल</span>
        <span className="text-[10px] text-brand-purple font-bold">ज्योतिष 🌟</span>
      </div>

      <div className="text-center py-2 flex flex-col items-center">
        <div className="text-4xl mb-1.5 animate-pulse">♈</div>
        <div className="text-sm font-extrabold text-slate-800">मेष राशि (Aries)</div>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          आज आपका स्वास्थ्य उत्तम रहेगा। कार्यक्षेत्र में नए अवसर मिलेंगे। आर्थिक लाभ के योग हैं, लेकिन फिजूलखर्ची से बचें...
        </p>
        <Link 
          href="/astrology" 
          className="mt-3.5 text-[10px] font-bold text-brand-purple hover:underline hover:text-brand-purple-dark"
        >
          सभी 12 राशियों का राशिफल देखें →
        </Link>
      </div>
    </div>
  );
};

export default HoroscopeWidget;
