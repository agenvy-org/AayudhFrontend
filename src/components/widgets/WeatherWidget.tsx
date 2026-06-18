'use client';

import React, { useState } from 'react';
import { Sun, CloudRain, Cloud, CloudLightning } from 'lucide-react';

interface CityWeather {
  city: string;
  temp: number;
  condition: string;
  humidity: string;
  windSpeed: string;
  icon: 'sun' | 'rain' | 'cloud' | 'lightning';
}

const mockWeather: CityWeather[] = [
  { city: 'भोपाल', temp: 32, condition: 'आंशिक रूप से बादल', humidity: '60%', windSpeed: '12 km/h', icon: 'cloud' },
  { city: 'इंदौर', temp: 31, condition: 'साफ़ मौसम', humidity: '55%', windSpeed: '10 km/h', icon: 'sun' },
  { city: 'जबलपुर', temp: 33, condition: 'हल्की बारिश', humidity: '72%', windSpeed: '15 km/h', icon: 'rain' },
  { city: 'ग्वालियर', temp: 36, condition: 'तेज गर्मी', humidity: '45%', windSpeed: '8 km/h', icon: 'sun' }
];

export const WeatherWidget: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState(0);
  const weather = mockWeather[selectedCity];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'sun': return <Sun className="w-10 h-10 text-amber-500 animate-pulse" />;
      case 'rain': return <CloudRain className="w-10 h-10 text-blue-400" />;
      case 'lightning': return <CloudLightning className="w-10 h-10 text-purple-400" />;
      default: return <Cloud className="w-10 h-10 text-slate-400" />;
    }
  };

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm font-sans">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">मौसम अपडेट (MP)</span>
        <span className="text-[10px] text-brand-purple font-bold">लाइव</span>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
        {mockWeather.map((w, index) => (
          <button
            key={w.city}
            onClick={() => setSelectedCity(index)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
              selectedCity === index
                ? 'bg-brand-navy border-brand-navy text-white'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {w.city}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-slate-50 pt-3">
        <div className="flex items-center gap-3">
          {renderIcon(weather.icon)}
          <div>
            <div className="text-2xl font-black text-slate-800">{weather.temp}°C</div>
            <div className="text-xs text-slate-500 font-medium">{weather.condition}</div>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 font-semibold space-y-1">
          <div>आर्द्रता: {weather.humidity}</div>
          <div>हवा की गति: {weather.windSpeed}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
