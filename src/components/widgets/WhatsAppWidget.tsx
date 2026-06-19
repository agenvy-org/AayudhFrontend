'use client';

import React from 'react';
import Link from 'next/link';

// Since lucide-react doesn't have a perfect WhatsApp icon, we can use an SVG or similar, but let's use a custom SVG for WhatsApp
const WhatsAppIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="w-6 h-6 text-white"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export const WhatsAppWidget: React.FC = () => {
  return (
    <div className="rounded-3xl border border-green-100 shadow-xl shadow-green-200/20 overflow-hidden font-sans relative group cursor-pointer bg-gradient-to-br from-green-50 to-white">
      {/* Premium top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-400 to-[#25D366] z-20"></div>

      {/* Decorative WhatsApp background shapes */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-400/10 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:scale-125"></div>

      <div className="relative p-6 sm:p-7 flex flex-col items-center text-center z-10">
        
        {/* WhatsApp Icon wrapper */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] shadow-lg shadow-green-400/30 flex items-center justify-center mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <div className="absolute inset-0 rounded-full border-4 border-white"></div>
          <WhatsAppIcon />
          
          {/* Notification Ping */}
          <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full">
            <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></div>
          </div>
        </div>

        {/* Text Content */}
        <h3 className="font-serif text-[22px] font-black text-slate-800 leading-tight mb-2">
          Aayudh WhatsApp ग्रुप
        </h3>
        <p className="text-slate-500 text-[14px] font-medium leading-relaxed mb-6">
          हर बड़ी और ताज़ा खबर सबसे पहले अपने WhatsApp पर पाने के लिए अभी ग्रुप से जुड़ें!
        </p>

        {/* Join Button */}
        <Link 
          href="https://chat.whatsapp.com/YOUR_INVITE_LINK_HERE" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] text-white rounded-xl py-3.5 text-[15px] font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-xl hover:bg-[#128C7E] transition-colors duration-300"
        >
          अभी जुड़ें
        </Link>
        
      </div>
    </div>
  );
};

export default WhatsAppWidget;
