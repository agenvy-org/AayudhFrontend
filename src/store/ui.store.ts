'use client';

import { useState, useEffect } from 'react';

export const uiStore = {
  isMobileMenuOpen: false,
  setMobileMenuOpen(open: boolean) {
    this.isMobileMenuOpen = open;
    this.listeners.forEach(l => l(open));
  },
  listeners: new Set<(open: boolean) => void>(),
  subscribe(listener: (open: boolean) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
};

export const useUiStore = () => {
  const [isMobileMenuOpen, setMobileMenuOpenState] = useState(uiStore.isMobileMenuOpen);

  useEffect(() => {
    return uiStore.subscribe(setMobileMenuOpenState);
  }, []);

  return {
    isMobileMenuOpen,
    setMobileMenuOpen: (open: boolean) => uiStore.setMobileMenuOpen(open)
  };
};
