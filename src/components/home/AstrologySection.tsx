'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';
import { astrologyService } from '@/services/astrology.service';
import { Horoscope } from '@/types/horoscope';
import { Loader } from '../common/Loader';
import { SectionHeading } from '../common/SectionHeading';

export const AstrologySection: React.FC = () => {
  const [horoscopes, setHoroscopes] = useState<Horoscope[]>([]);
  const [activeSignIndex, setActiveSignIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHoroscopes = async () => {
      try {
        const data = await astrologyService.getAllHoroscopes();
        setHoroscopes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHoroscopes();
  }, []);

  const activeHoroscope = horoscopes[activeSignIndex];

  if (loading) return <Loader size="md" className="py-12" />;
  if (horoscopes.length === 0) return null;

  return (
    <section className="py-4 border-b border-slate-100 font-sans">
      <SectionHeading 
        title="आज का राशिफल" 
        icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        actionLink="/astrology" 
        actionText="दैनिक भविष्यफल" 
        hideLine={true}
      />

      {/* High-End Minimal Dark Navy Container */}
      <div className="relative rounded-2xl bg-[#041e42] p-6 sm:p-8 shadow-sm border border-slate-800 overflow-hidden">
        
        {/* Horizontal Signs Selector */}
        <div className="relative z-10 no-scrollbar overflow-x-auto pb-8 pt-2 px-4 border-b border-slate-800/80">
          {/* Subtle connecting line behind circles */}
          <div className="absolute top-[34px] left-8 right-8 h-[1px] bg-slate-800/50 -z-10" />
          
          <div className="flex items-center gap-6 md:gap-10 justify-between min-w-max">
          {horoscopes.map((h, index) => {
            const isSelected = activeSignIndex === index;
            return (
              <button
                key={h.sign}
                onClick={() => setActiveSignIndex(index)}
                className="relative flex flex-col items-center gap-3 shrink-0 group focus:outline-none cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-tr from-amber-500 to-amber-300 text-[#041e42] scale-110 shadow-[0_4px_15px_rgba(251,191,36,0.3)] ring-4 ring-[#041e42] z-10'
                      : 'bg-[#041e42] border-[1.5px] border-slate-700/50 text-slate-400 group-hover:border-amber-400/50 group-hover:text-amber-300 group-hover:bg-[#0b2545] z-10'
                  }`}
                >
                  <span className={isSelected ? 'font-black' : 'font-medium'}>{h.icon}</span>
                </div>
                {/* Sign label */}
                <span
                  className={`text-[13px] font-bold tracking-wide transition-colors duration-200 ${
                    isSelected ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {h.sign}
                </span>
                
                {/* Active Indicator Dot under text */}
                {isSelected && (
                  <motion.div
                    layoutId="activeZodiacDot"
                    className="absolute -bottom-3 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
          </div>
        </div>

        {/* Selected Sign Prediction Panel */}
        <AnimatePresence mode="wait">
          {activeHoroscope && (
            <motion.div
              key={activeHoroscope.sign}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12 text-white items-start"
            >
              {/* Sign Summary Details (Col-span-1) */}
              <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0b2545] to-[#020f21] border border-slate-700/50 flex items-center justify-center text-4xl text-amber-400 shadow-inner">
                    {activeHoroscope.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white leading-none tracking-tight">{activeHoroscope.sign}</h3>
                    <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-[0.25em] mt-2 block">{activeHoroscope.englishSign}</span>
                  </div>
                </div>
                
                {/* Horoscope stats */}
                <div className="mt-8 w-full flex flex-row divide-x divide-slate-800/80 border-y border-slate-800/80 py-5">
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-2 font-medium">शुभ अंक</div>
                    <div className="text-3xl font-black text-amber-400 font-serif leading-none">{activeHoroscope.luckyNumber}</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-2 font-medium">शुभ रंग</div>
                    <div className="text-3xl font-black text-amber-400 font-serif leading-none">{activeHoroscope.luckyColor}</div>
                  </div>
                </div>
              </div>

              {/* Prediction Text (Col-span-3) */}
              <div className="lg:col-span-3 pl-0 lg:pl-8 lg:border-l border-slate-800/80 flex flex-col justify-center h-full pt-2">
                <div className="flex items-center gap-3 mb-5">
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                  <h4 className="text-xl font-bold text-white tracking-wide">आज का स्वभाव</h4>
                </div>
                <p className="text-[16px] sm:text-[17px] leading-[1.9] text-slate-300 font-normal opacity-95">
                  {activeHoroscope.prediction}
                </p>
                
                <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-400">
                  <div className="flex items-center gap-2 bg-[#0b2545] px-4 py-2 rounded-full border border-slate-700/50">
                    <span className="opacity-70">तत्व:</span>
                    <strong className="text-slate-200">{activeHoroscope.element}</strong>
                  </div>
                  <div className="flex items-center gap-2 bg-[#0b2545] px-4 py-2 rounded-full border border-slate-700/50">
                    <span className="opacity-70">भविष्यवाणी प्रदाता:</span>
                    <strong className="text-slate-200">Aayudh ज्योतिष बोर्ड</strong>
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default AstrologySection;
