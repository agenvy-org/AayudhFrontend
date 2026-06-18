'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface Match {
  id: string;
  type: 'live' | 'upcoming' | 'recent';
  teamA: { name: string; score?: string; overs?: string; logo: string };
  teamB: { name: string; score?: string; overs?: string; logo: string };
  status: string;
  matchName: string;
  venue: string;
}

const mockMatches: Match[] = [
  {
    id: 'm1',
    type: 'live',
    teamA: { name: 'आयरलैंड', score: '156/6', overs: '20.0', logo: '🇮🇪' },
    teamB: { name: 'वेस्ट इंडीज', score: '133/4', overs: '16.2', logo: '🌴' },
    status: 'लाइव: वेस्टइंडीज को 22 गेंदों में 24 रन चाहिए',
    matchName: 'महिला टी20 सीरीज, 2026',
    venue: 'डबलिन'
  },
  {
    id: 'm2',
    type: 'upcoming',
    teamA: { name: 'भारत', logo: '🇮🇳' },
    teamB: { name: 'ऑस्ट्रेलिया', logo: '🇦🇺' },
    status: 'जून 10, 19:30 (IST)',
    matchName: 'पहला टेस्ट, WTC फाइनल',
    venue: 'लंदन'
  },
  {
    id: 'm3',
    type: 'recent',
    teamA: { name: 'भारत', score: '348/5', overs: '50.0', logo: '🇮🇳' },
    teamB: { name: 'पाकिस्तान', score: '224/10', overs: '42.1', logo: '🇵🇰' },
    status: 'भारत 124 रन से जीता',
    matchName: 'एशिया कप फाइनल',
    venue: 'कोलंबो'
  }
];

export const CricketWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'recent'>('live');

  const filteredMatches = mockMatches.filter(m => m.type === activeTab);

  return (
    <div className="rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden font-sans">
      {/* Widget Header */}
      <div className="bg-brand-navy p-3 text-white flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          क्रिकेट लाइव स्कोर
        </span>
        <span className="text-[10px] text-slate-300">Aayudh स्पोर्ट्स</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 text-xs font-bold">
        {(['live', 'upcoming', 'recent'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2.5 text-center transition-all duration-200 border-b-2",
              activeTab === tab 
                ? "bg-slate-50/50 text-brand-purple border-brand-purple" 
                : "text-slate-500 hover:text-brand-purple border-transparent"
            )}
          >
            {tab === 'live' ? '• लाइव' : tab === 'upcoming' ? 'अपकमिंग' : 'रिसेंट'}
          </button>
        ))}
      </div>

      {/* Matches List */}
      <div className="p-3 space-y-3">
        {filteredMatches.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4">कोई मैच उपलब्ध नहीं है</p>
        ) : (
          filteredMatches.map((match) => (
            <div key={match.id} className="border border-slate-100 rounded-lg p-2.5 bg-slate-50/30 hover:bg-slate-50 transition-colors duration-200">
              <div className="text-[10px] text-slate-400 font-semibold mb-2 flex justify-between">
                <span>{match.matchName}</span>
                <span>{match.venue}</span>
              </div>
              
              {/* Score content */}
              <div className="space-y-2">
                {/* Team A */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <span className="text-base">{match.teamA.logo}</span>
                    <span>{match.teamA.name}</span>
                  </div>
                  {match.teamA.score && (
                    <div className="text-right font-sans">
                      <span className="font-extrabold text-slate-900">{match.teamA.score}</span>
                      <span className="text-[9px] text-slate-400 ml-1">({match.teamA.overs})</span>
                    </div>
                  )}
                </div>

                {/* Team B */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <span className="text-base">{match.teamB.logo}</span>
                    <span>{match.teamB.name}</span>
                  </div>
                  {match.teamB.score && (
                    <div className="text-right font-sans">
                      <span className="font-extrabold text-slate-900">{match.teamB.score}</span>
                      <span className="text-[9px] text-slate-400 ml-1">({match.teamB.overs})</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] font-semibold text-brand-purple">
                {match.status}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CricketWidget;
