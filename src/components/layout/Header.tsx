'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Menu, X, MapPin, ChevronRight, TrendingUp } from 'lucide-react';
import { useSearchStore } from '@/store/search.store';
import { useUiStore } from '@/store/ui.store';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { FacebookIcon, TwitterIcon, YoutubeIcon, InstagramIcon } from '../common/BrandIcons';
import { mainNav, mpDistricts } from '@/config/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { query, setQuery } = useSearchStore();
  const { isMobileMenuOpen, setMobileMenuOpen } = useUiStore();
  const [localSearch, setLocalSearch] = useState(query);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(localSearch);
    if (localSearch.trim()) {
      router.push(`/search?q=${encodeURIComponent(localSearch.trim())}`);
      setIsSearchExpanded(false);
    }
  };

  return (
    <header className="font-sans w-full bg-transparent pt-4 pb-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Capsule container */}
        <div className="relative flex h-14 items-center justify-between rounded-full bg-brand-navy px-6 text-white shadow-lg border border-brand-navy-light">

          {/* Left Section: Mobile Menu Toggle, Brand Logo & Main categories */}
          <div className="flex items-center gap-6 xl:gap-8 min-w-0">
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-lg p-1.5 text-slate-300 hover:bg-brand-navy-light hover:text-white lg:hidden cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.jpg"
                  alt="Ayudh Logo"
                  width={32}
                  height={32}
                  className="rounded-md object-contain"
                  priority
                />
                <span className="font-sans text-xl font-black tracking-wider text-white hidden sm:block">
                  AAYUDH
                </span>
              </Link>
            </div>

            <span className="hidden lg:inline-block h-4 w-[1px] bg-slate-700/60 shrink-0" />

            {/* Main categories (Hidden on tablet/mobile) */}
            <nav className="hidden lg:block min-w-0">
              <ul className="flex items-center gap-3 xl:gap-5 font-sans text-[13px] xl:text-[14px] font-semibold text-white whitespace-nowrap">
                {mainNav.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  const isMPNews = item.title === "मध्यप्रदेश न्यूज़";

                  return (
                    <li key={item.title} className={cn(isMPNews && "group")}>
                      <Link
                        href={item.href}
                        className={cn(
                          "transition-colors duration-200 hover:text-brand-yellow py-4 relative block",
                          isActive ? "text-brand-yellow font-bold" : "text-white"
                        )}
                      >
                        {item.title}
                      </Link>

                      {isMPNews && (
                        <div className="absolute top-[64px] left-1/2 -translate-x-1/2 mt-0 w-[850px] rounded-2xl bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] border border-slate-200/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] transform origin-top translate-y-4 group-hover:translate-y-0 p-6 cursor-default">
                          
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                            <h3 className="text-brand-navy font-bold text-lg flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-brand-purple" /> मध्य प्रदेश के 55 जिले
                            </h3>
                            <div className="flex items-center gap-3">
                              <span className="text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full shadow-sm">अ-ज्ञ क्रम में</span>
                              <Link href="/category/madhya-pradesh" className="text-[12px] font-bold text-white bg-brand-purple hover:bg-brand-purple-dark px-4 py-1.5 rounded-full transition-colors flex items-center gap-1 shadow-sm group/btn">
                                सभी खबरें <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </div>
                          
                          {/* Compact grid without scroll */}
                          <ul className="grid grid-cols-5 gap-2">
                            {mpDistricts.map((district) => (
                              <li key={district.title}>
                                <Link
                                  href={district.href}
                                  className="group/pill flex items-center justify-center px-2.5 py-1.5 bg-white border border-slate-200/80 rounded-lg transition-all duration-300 hover:border-brand-purple hover:bg-gradient-to-br hover:from-brand-purple/5 hover:to-brand-purple/10 hover:shadow-[0_4px_12px_-2px_rgba(168,85,247,0.25)] hover:-translate-y-0.5"
                                >
                                  <span className="text-[12px] font-semibold text-slate-600 group-hover/pill:text-brand-purple transition-colors text-center w-full">
                                    {district.title}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Right Section: Search, Social Media Icons, Magazine Button */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Animated Search Bar (Desktop) */}
            <div className="relative hidden md:flex items-center">
              <AnimatePresence>
                {isSearchExpanded && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 140, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearchSubmit}
                    className="mr-2"
                  >
                    <Input
                      type="text"
                      placeholder="खबरें खोजें..."
                      value={localSearch}
                      onChange={(e) => setLocalSearch(e.target.value)}
                      className="h-8 w-full border-none bg-brand-navy-light pl-3 pr-3 text-xs text-white placeholder:text-slate-400 focus:bg-white focus:text-slate-900 focus:ring-1 focus:ring-brand-purple/20"
                      autoFocus
                    />
                  </motion.form>
                )}
              </AnimatePresence>

              <button
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="rounded-[8px] p-1.5 text-white hover:bg-brand-navy-light hover:text-brand-yellow cursor-pointer transition-colors"
                aria-label="Toggle search input"
              >
                {isSearchExpanded ? <X className="h-4.5 w-4.5" /> : <Search className="h-4.5 w-4.5" />}
              </button>
            </div>

            <span className="hidden md:inline-block h-4 w-[1px] bg-slate-700/60 mx-1 shrink-0" />

            {/* Social Media Icons (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-1 shrink-0">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="rounded-[8px] p-1.5 text-white hover:text-brand-yellow hover:bg-brand-navy-light/40 transition-colors" aria-label="Facebook">
                <FacebookIcon className="h-3.5 w-3.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="rounded-[8px] p-1.5 text-white hover:text-brand-yellow hover:bg-brand-navy-light/40 transition-colors" aria-label="Twitter">
                <TwitterIcon className="h-3.5 w-3.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="rounded-[8px] p-1.5 text-white hover:text-brand-yellow hover:bg-brand-navy-light/40 transition-colors" aria-label="Youtube">
                <YoutubeIcon className="h-3.5 w-3.5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="rounded-[8px] p-1.5 text-white hover:text-brand-yellow hover:bg-brand-navy-light/40 transition-colors" aria-label="Instagram">
                <InstagramIcon className="h-3.5 w-3.5" />
              </a>
            </div>

            <span className="h-4 w-[1px] bg-slate-700/60 mx-1 shrink-0" />

            {/* Magazine Button (Replaced Shorts) */}
            <Link href="/category/magazine" className="shrink-0 group">
              <Button className="bg-gradient-to-b from-[#FDE047] via-[#FACC15] to-[#EAB308] hover:from-[#FEF08A] hover:via-[#FDE047] hover:to-[#FACC15] text-[#422006] font-sans text-[13px] px-4 py-1.5 rounded-[10px] font-black tracking-wide border border-[#CA8A04]/80 shadow-[0_2px_8px_rgba(202,138,4,0.4),inset_0_1px_1px_rgba(255,255,255,0.8)] hover:shadow-[0_4px_12px_rgba(202,138,4,0.5),inset_0_2px_2px_rgba(255,255,255,0.9)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_1px_2px_rgba(202,138,4,0.4),inset_0_1px_2px_rgba(0,0,0,0.1)] transition-all duration-300 flex items-center gap-1.5 cursor-pointer overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">मैगज़ीन</span>
                <span className="text-[14px] relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 origin-bottom-right">📖</span>
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
