import React from 'react';
import { CloudSun, Wind, Droplets, CloudRain, Sun } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl p-5 text-white shadow-sm relative overflow-hidden">
      {/* Decorative Cloud Icon Background */}
      <CloudSun className="absolute -right-4 -top-4 w-32 h-32 text-white/10" />
      
      <div className="relative z-10">
        <h3 className="font-sans text-sm font-bold tracking-wider text-white/90 uppercase mb-1">Bhopal, MP</h3>
        
        <div className="flex items-end gap-3 mb-4">
          <div className="text-5xl font-black tracking-tight leading-none">32°</div>
          <div className="text-lg font-medium text-white/90 pb-1">Partly Cloudy</div>
        </div>
        
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-3 text-sm font-medium mb-4">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-white/80" />
            <span>12 km/h</span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-white/80" />
            <span>45% Hum</span>
          </div>
        </div>

        {/* Other Cities */}
        <div className="space-y-3 pt-3 border-t border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-yellow-300" />
              <span className="font-medium text-sm">Indore</span>
            </div>
            <span className="font-bold">34°</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-blue-200" />
              <span className="font-medium text-sm">Ujjain</span>
            </div>
            <span className="font-bold">29°</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudSun className="w-4 h-4 text-slate-100" />
              <span className="font-medium text-sm">Jabalpur</span>
            </div>
            <span className="font-bold">31°</span>
          </div>
        </div>
      </div>
    </div>
  );
};
