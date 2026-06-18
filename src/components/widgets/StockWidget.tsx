'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface IndexData {
  name: string;
  value: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

const mockIndices: IndexData[] = [
  { name: 'NIFTY 50', value: '23,450.15', change: '+185.30', changePercent: '+0.80%', isPositive: true },
  { name: 'SENSEX', value: '77,150.40', change: '+620.10', changePercent: '+0.81%', isPositive: true },
  { name: 'NIFTY BANK', value: '50,120.80', change: '-110.45', changePercent: '-0.22%', isPositive: false },
];

export const StockWidget: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm font-sans">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">शेयर बाजार</span>
        <span className="text-[10px] text-live-green font-bold">मार्केट ओपन</span>
      </div>

      <div className="space-y-3">
        {mockIndices.map((idx) => (
          <div key={idx.name} className="flex justify-between items-center py-1.5 border-b border-slate-50 last:border-0 last:pb-0">
            <div>
              <div className="text-xs font-extrabold text-slate-800">{idx.name}</div>
              <div className="text-sm font-black text-slate-900 mt-0.5">{idx.value}</div>
            </div>
            <div className={`text-right text-xs font-bold flex flex-col items-end ${idx.isPositive ? 'text-live-green' : 'text-live-red'}`}>
              <div className="flex items-center gap-0.5">
                {idx.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                <span>{idx.change}</span>
              </div>
              <span className="text-[10px] opacity-90">{idx.changePercent}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockWidget;
