'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';
import { astrologyService } from '@/services/astrology.service';
import { Horoscope } from '@/types/horoscope';
import { Loader } from '../common/Loader';

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
    <section className="py-8 border-b border-slate-100 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-2xl font-bold text-brand-navy flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" /> आज का राशिफल
        </h2>
        <span className="text-xs text-slate-400 font-semibold">दैनिक भविष्यफल</span>
      </div>

      {/* Dark Navy Zodiac Icons Banner */}
      <div className="rounded-2xl bg-[#041e42] p-4 sm:p-6 shadow-lg border border-slate-800">
        
        {/* Horizontal Signs Selector */}
        <div className="no-scrollbar flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 px-1 justify-between">
          {horoscopes.map((h, index) => {
            const isSelected = activeSignIndex === index;
            return (
              <button
                key={h.sign}
                onClick={() => setActiveSignIndex(index)}
                className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none cursor-pointer"
              >
                {/* Zodiac Circle Icon */}
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all duration-300 ${
                    isSelected
                      ? 'border-amber-400 bg-amber-400/20 scale-110 shadow-md shadow-amber-400/10'
                      : 'border-slate-700 bg-slate-800/40 text-slate-400 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  <span className={isSelected ? 'text-amber-400 font-black' : ''}>{h.icon}</span>
                </div>
                {/* Sign label */}
                <span
                  className={`text-xs font-bold transition-colors duration-200 ${
                    isSelected ? 'text-amber-400' : 'text-slate-450 group-hover:text-white'
                  }`}
                >
                  {h.sign}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Sign Prediction Panel */}
        <AnimatePresence mode="wait">
          {activeHoroscope && (
            <motion.div
              key={activeHoroscope.sign}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-6 border-t border-slate-800 pt-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-white items-center"
            >
              {/* Sign Summary Details (Col-span-1) */}
              <div className="md:col-span-1 border-r border-slate-800/60 pr-4 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                <div className="flex items-center gap-2">
                  <span className="text-3xl text-amber-400">{activeHoroscope.icon}</span>
                  <div>
                    <h3 className="text-lg font-black text-amber-400 leading-none">{activeHoroscope.sign}</h3>
                    <span className="text-[10px] text-slate-450 font-semibold">{activeHoroscope.englishSign}</span>
                  </div>
                </div>
                
                {/* Horoscope stats */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-[10px] text-slate-400 font-bold w-full max-w-[200px] md:max-w-none">
                  <div className="bg-slate-800/30 p-2 rounded-lg border border-slate-850">
                    <div>शुभ अंक</div>
                    <div className="text-sm font-black text-amber-400 mt-1">{activeHoroscope.luckyNumber}</div>
                  </div>
                  <div className="bg-slate-800/30 p-2 rounded-lg border border-slate-850">
                    <div>शुभ रंग</div>
                    <div className="text-sm font-black text-amber-400 mt-1">{activeHoroscope.luckyColor}</div>
                  </div>
                </div>
              </div>

              {/* Prediction Text (Col-span-3) */}
              <div className="md:col-span-3 pl-0 md:pl-2">
                <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-bold mb-2">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>आज का राशिफल & स्वभाव:</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-200 font-medium">
                  {activeHoroscope.prediction}
                </p>
                <div className="mt-4 flex gap-4 text-[10px] font-semibold text-slate-500">
                  <span>तत्व: <strong className="text-slate-300">{activeHoroscope.element}</strong></span>
                  <span>•</span>
                  <span>भविष्यवाणी प्रदाता: <strong className="text-slate-300">Aayudh ज्योतिष बोर्ड</strong></span>
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
