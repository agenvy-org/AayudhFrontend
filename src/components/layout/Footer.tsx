'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FacebookIcon, TwitterIcon, YoutubeIcon } from '../common/BrandIcons';
import { footerNav } from '@/config/navigation';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy-dark text-slate-300 border-t border-slate-800">
      
      {/* Top Footer Link Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link href="/" className="font-sans text-3xl font-black tracking-wider text-white">
              Ayudh
            </Link>
            <p className="mt-4 font-sans text-xs leading-relaxed text-slate-400">
              Digital-first news platform for MP news, shorts, videos, cricket, weather, astrology and market updates. 
              ताजातरीन और निष्पक्ष खबरों का एकमात्र ठिकाना।
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="rounded-full bg-brand-navy-light p-2 text-slate-300 hover:text-white" aria-label="Facebook">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="rounded-full bg-brand-navy-light p-2 text-slate-300 hover:text-white" aria-label="Twitter">
                <TwitterIcon className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="rounded-full bg-brand-navy-light p-2 text-slate-300 hover:text-white" aria-label="Youtube">
                <YoutubeIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-white">
              श्रेणियां
            </h3>
            <ul className="mt-4 space-y-2 text-xs">
              {footerNav.categories.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="hover:text-white transition-colors duration-200">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-white">
              स्पेशल फीचर्स
            </h3>
            <ul className="mt-4 space-y-2 text-xs">
              {footerNav.features.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="hover:text-white transition-colors duration-200">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Company */}
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-white">
              संपर्क & कंपनी
            </h3>
            <ul className="mt-4 space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-brand-purple" />
                <span>भोपाल, मध्य प्रदेश, भारत</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-purple" />
                <a href="mailto:info@aayudhnews.com" className="hover:text-white">info@aayudhnews.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-purple" />
                <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a>
              </li>
            </ul>
            <div className="mt-6 border-t border-slate-800 pt-4">
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px]">
                {footerNav.company.map((item) => (
                  <Link key={item.title} href={item.href} className="hover:text-white">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center font-sans text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} AAYUDH HINDI NEWS. सर्वाधिकार सुरक्षित।</p>
          <p className="mt-1">
            Developed with ❤️ for Madhya Pradesh.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
