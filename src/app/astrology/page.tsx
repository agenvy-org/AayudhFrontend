'use client';

import React, { useState, useEffect } from 'react';
import { astrologyService } from '@/services/astrology.service';
import { Horoscope } from '@/types/horoscope';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Loader } from '@/components/common/Loader';
import { Card } from '@/components/common/Card';

export default function AstrologyPage() {
  const [horoscopes, setHoroscopes] = useState<Horoscope[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await astrologyService.getAllHoroscopes();
        setHoroscopes(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
        <Loader size="lg" />
        <p className="mt-4 text-xs font-semibold text-slate-500 animate-pulse font-sans">
          राशिफल लोड हो रहा है...
        </p>
      </div>
    );
  }

  return (
    <div className="py-6 font-sans">
      <SectionHeading 
        title="दैनिक राशिफल" 
        subtitle="जानिए आज का भविष्यफल, शुभ अंक और शुभ रंग सभी 12 राशियों के लिए" 
        accentColor="purple" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {horoscopes.map((h) => (
          <Card 
            key={h.sign} 
            className="relative overflow-hidden group hover:shadow-md border border-slate-100 flex flex-col justify-between p-4"
          >
            {/* Top Sign Header */}
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl text-amber-500">{h.icon}</span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-800 leading-none">{h.sign}</h3>
                    <span className="text-[10px] text-slate-455 font-semibold">{h.englishSign}</span>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-brand-purple bg-brand-purple-light px-2 py-0.5 rounded-full uppercase tracking-wide">
                  {h.element} तत्व
                </span>
              </div>
              
              {/* Prediction text */}
              <p className="text-xs text-slate-600 leading-relaxed font-medium font-sans">
                {h.prediction}
              </p>
            </div>

            {/* Lucky details */}
            <div className="mt-4 pt-3 border-t border-slate-50 grid grid-cols-2 gap-3 text-[10px] text-slate-500 font-bold">
              <div className="bg-slate-50 p-2 rounded-lg text-center border border-slate-100">
                <span>शुभ अंक</span>
                <div className="text-sm font-black text-brand-purple mt-0.5">{h.luckyNumber}</div>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg text-center border border-slate-100">
                <span>शुभ रंग</span>
                <div className="text-sm font-black text-brand-purple mt-0.5">{h.luckyColor}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
