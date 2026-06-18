'use client';

import { useState, useEffect } from 'react';

export const searchStore = {
  query: '',
  setQuery(q: string) {
    this.query = q;
    this.listeners.forEach(l => l(q));
  },
  listeners: new Set<(q: string) => void>(),
  subscribe(listener: (q: string) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
};

export const useSearchStore = () => {
  const [query, setQueryState] = useState(searchStore.query);

  useEffect(() => {
    return searchStore.subscribe(setQueryState);
  }, []);

  return {
    query,
    setQuery: (q: string) => searchStore.setQuery(q)
  };
};
