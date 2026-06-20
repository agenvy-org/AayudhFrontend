'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { X, Search, ChevronRight } from 'lucide-react';
import { FacebookIcon, TwitterIcon, YoutubeIcon } from '../common/BrandIcons';
import { AnimatePresence, motion } from 'framer-motion';
import { useUiStore } from '@/store/ui.store';
import { useSearchStore } from '@/store/search.store';
import { mainNav } from '@/config/navigation';
import { Input } from '../common/Input';

export const MobileMenu: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobileMenuOpen, setMobileMenuOpen } = useUiStore();
  const { setQuery } = useSearchStore();
  const [localSearch, setLocalSearch] = useState('');

  // Close menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(localSearch);
    if (localSearch.trim()) {
      setMobileMenuOpen(false);
      router.push(`/search?q=${encodeURIComponent(localSearch.trim())}`);
    }
  };

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-y-0 left-0 z-50 flex w-80 max-w-sm flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
              <span className="font-sans text-2xl font-black text-brand-navy">
                AAYUDH
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close Menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              
              {/* Search in Mobile Drawer */}
              <form onSubmit={handleSearchSubmit} className="mb-6">
                <div className="relative w-full">
                  <Input
                    type="text"
                    placeholder="खबरें खोजें..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="h-10 w-full pl-10 pr-4"
                  />
                  <Search className="absolute top-3 left-3.5 h-4 w-4 text-slate-400" />
                </div>
              </form>

              {/* Navigation Links */}
              <div className="mb-8">
                <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-slate-400">
                  श्रेणियां
                </p>
                <ul className="flex flex-col gap-2">
                  {mainNav.map((item) => {
                    const isActive = pathname === item.href;
                    
                    return (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          className={`flex items-center justify-between rounded-lg px-3 py-2.5 font-sans text-sm font-semibold transition-colors duration-200 ${
                            isActive
                              ? 'bg-brand-purple-light text-brand-purple'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-brand-purple'
                          }`}
                        >
                          <span>{item.title}</span>
                          <ChevronRight className={`h-4 w-4 opacity-75 ${isActive ? 'text-brand-purple' : 'text-slate-400'}`} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Special sections shortcuts */}
              <div className="mb-8 border-t border-slate-100 pt-6">
                <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-slate-400">
                  स्पेशल फीचर्स
                </p>
                <div className="grid grid-cols-1 gap-2 text-center font-sans text-xs font-semibold">
                  <Link href="/podcast" className="rounded-lg border border-slate-100 bg-slate-50 py-3 text-slate-700 hover:border-brand-purple hover:bg-brand-purple-light hover:text-brand-purple">
                    🎙️ पॉडकास्ट
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-slate-100 px-6 py-4 bg-slate-50/50">
              <div className="flex items-center justify-center gap-4 text-slate-500">
                <a href="https://facebook.com" className="hover:text-brand-purple"><FacebookIcon className="h-5 w-5" /></a>
                <a href="https://twitter.com" className="hover:text-brand-purple"><TwitterIcon className="h-5 w-5" /></a>
                <a href="https://youtube.com" className="hover:text-brand-purple"><YoutubeIcon className="h-5 w-5" /></a>
              </div>
              <p className="mt-3 text-center font-sans text-[10px] text-slate-400">
                © {new Date().getFullYear()} AAYUDH NEWS. सर्वाधिकार सुरक्षित।
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
