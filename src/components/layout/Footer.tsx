'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { FacebookIcon, TwitterIcon, YoutubeIcon, InstagramIcon } from '../common/BrandIcons';
import { footerNav } from '@/config/navigation';

export const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-[#0a0d14] text-slate-400 font-sans border-t border-slate-800/50">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-0 sm:px-6 lg:px-8">
        
        {/* Top Footer Link Grid - Swiss Minimal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Brand & Identity */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col items-start lg:pr-8">
            <div className="mb-8 w-full">
              <Link href="/" className="inline-block relative group">
                <span className="absolute -inset-2 bg-brand-purple/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative font-sans text-[36px] font-black tracking-tighter bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent drop-shadow-md">
                  Aayudh.
                </span>
              </Link>
            </div>
            <p className="text-[14px] leading-relaxed text-slate-400 font-medium mb-8 max-w-sm">
              A digital-first initiative focused on building awareness, skills, and brighter futures across India.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-[11px] font-semibold text-slate-300 backdrop-blur-sm mb-10 tracking-wide">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              न दैन्यं न पलायनम्
            </div>
            
            {/* Minimal Social Icons */}
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-brand-purple hover:text-white hover:shadow-[0_0_15px_rgba(124,58,ed,0.5)] transition-all duration-300" aria-label="Facebook">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-brand-purple hover:text-white hover:shadow-[0_0_15px_rgba(124,58,ed,0.5)] transition-all duration-300" aria-label="Twitter">
                <TwitterIcon className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-brand-purple hover:text-white hover:shadow-[0_0_15px_rgba(124,58,ed,0.5)] transition-all duration-300" aria-label="Youtube">
                <YoutubeIcon className="h-4 w-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-brand-purple hover:text-white hover:shadow-[0_0_15px_rgba(124,58,ed,0.5)] transition-all duration-300" aria-label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-6 lg:col-span-5 lg:pl-8">
            <h3 className="text-[10px] font-bold text-slate-500 mb-8 uppercase tracking-[0.3em]">Navigation</h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-5 text-[13.5px] text-slate-400 font-medium">
              <li>
                <Link href="/" className="group flex items-center hover:text-white transition-colors duration-300">
                  <span className="w-0 overflow-hidden group-hover:w-3.5 transition-all duration-300 ease-out">
                    <ChevronRight className="h-3.5 w-3.5 text-brand-purple" />
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Home</span>
                </Link>
              </li>
              {footerNav.categories.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="group flex items-center hover:text-white transition-colors duration-300">
                    <span className="w-0 overflow-hidden group-hover:w-3.5 transition-all duration-300 ease-out">
                      <ChevronRight className="h-3.5 w-3.5 text-brand-purple" />
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/about" className="group flex items-center hover:text-white transition-colors duration-300">
                  <span className="w-0 overflow-hidden group-hover:w-3.5 transition-all duration-300 ease-out">
                    <ChevronRight className="h-3.5 w-3.5 text-brand-purple" />
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="group flex items-center hover:text-white transition-colors duration-300">
                  <span className="w-0 overflow-hidden group-hover:w-3.5 transition-all duration-300 ease-out">
                    <ChevronRight className="h-3.5 w-3.5 text-brand-purple" />
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-6 lg:col-span-3">
            <h3 className="text-[10px] font-bold text-slate-500 mb-8 uppercase tracking-[0.3em]">Contact</h3>
            <div className="space-y-6">
              <div className="group">
                <span className="flex items-center gap-2 text-white mb-1.5 font-bold text-[10px] tracking-[0.15em] uppercase">
                  <span className="h-1 w-1 rounded-full bg-brand-purple shadow-[0_0_8px_rgba(124,58,ed,0.8)]"></span>
                  Registered Address
                </span>
                <span className="block text-slate-400 group-hover:text-slate-300 transition-colors duration-300 text-[13px] leading-relaxed pl-3 border-l border-white/5">
                  A-494, Shahpura, Bhopal,<br />Madhya Pradesh, 462016
                </span>
              </div>
              <div className="group">
                <span className="flex items-center gap-2 text-white mb-1.5 font-bold text-[10px] tracking-[0.15em] uppercase">
                  <span className="h-1 w-1 rounded-full bg-brand-purple shadow-[0_0_8px_rgba(124,58,ed,0.8)]"></span>
                  Office Address
                </span>
                <span className="block text-slate-400 group-hover:text-slate-300 transition-colors duration-300 text-[13px] leading-relaxed pl-3 border-l border-white/5">
                  E4/230, E-4, Arera Colony,<br />Bhopal, Madhya Pradesh 462016
                </span>
              </div>
              <div className="pt-2 flex flex-col gap-2 pl-3">
                <a href="mailto:info@aayudhnews.com" className="group flex items-center text-slate-400 hover:text-white transition-colors duration-300 text-[13px] font-medium">
                  <Mail className="h-3.5 w-3.5 mr-2 text-slate-500 group-hover:text-brand-purple transition-colors" />
                  info@aayudhnews.com
                </a>
                <a href="tel:+919876543210" className="group flex items-center text-slate-400 hover:text-white transition-colors duration-300 text-[13px] font-medium">
                  <Phone className="h-3.5 w-3.5 mr-2 text-slate-500 group-hover:text-brand-purple transition-colors" />
                  +(91) 98765 43210
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Gradient Divider */}
        <div className="mt-20 mb-8 h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-[13px] text-slate-400 pb-16 font-medium">
          <p>
            Copyright &copy; {new Date().getFullYear()} <span className="text-white font-bold tracking-wide">AAYUDH</span>. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8 mt-5 md:mt-0">
            <Link href="/terms" className="hover:text-white transition-colors duration-300">Terms of Services</Link>
            <Link href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
