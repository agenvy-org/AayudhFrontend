'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { useSearchStore } from '@/store/search.store';
import { useUiStore } from '@/store/ui.store';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { FacebookIcon, TwitterIcon, YoutubeIcon } from '../common/BrandIcons';
import { mainNav } from '@/config/navigation';
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
            <nav className="hidden lg:block min-w-0 overflow-hidden">
              <ul className="flex items-center gap-3 xl:gap-5 font-sans text-[13px] xl:text-[14px] font-semibold text-slate-300 whitespace-nowrap">
                {mainNav.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className={cn(
                          "transition-colors duration-200 hover:text-white py-1 relative block",
                          isActive ? "text-white font-bold" : "text-slate-300"
                        )}
                      >
                        {item.title}
                        {isActive && (
                          <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-brand-purple" />
                        )}
                      </Link>
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
                className="rounded-[8px] p-1.5 text-slate-300 hover:bg-brand-navy-light hover:text-white cursor-pointer"
                aria-label="Toggle search input"
              >
                {isSearchExpanded ? <X className="h-4.5 w-4.5" /> : <Search className="h-4.5 w-4.5" />}
              </button>
            </div>

            <span className="hidden md:inline-block h-4 w-[1px] bg-slate-700/60 mx-1 shrink-0" />

            {/* Social Media Icons (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-1 shrink-0">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="rounded-[8px] p-1.5 text-slate-300 hover:text-white hover:bg-brand-navy-light/40 transition-colors" aria-label="Facebook">
                <FacebookIcon className="h-3.5 w-3.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="rounded-[8px] p-1.5 text-slate-300 hover:text-white hover:bg-brand-navy-light/40 transition-colors" aria-label="Twitter">
                <TwitterIcon className="h-3.5 w-3.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="rounded-[8px] p-1.5 text-slate-300 hover:text-white hover:bg-brand-navy-light/40 transition-colors" aria-label="Youtube">
                <YoutubeIcon className="h-3.5 w-3.5" />
              </a>
            </div>

            <span className="h-4 w-[1px] bg-slate-700/60 mx-1 shrink-0" />

            {/* Magazine Button (Replaced Shorts) */}
            <Link href="/category/magazine" className="shrink-0">
              <Button className="bg-brand-purple hover:bg-brand-purple-dark text-white font-sans text-xs px-4 py-1.5 rounded-[8px] font-bold border-none hover:shadow-md hover:shadow-brand-purple/20 transition-all cursor-pointer">
                मैगज़ीन 📖
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
