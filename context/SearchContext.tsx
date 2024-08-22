"use client"// context/SearchContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface SearchContextType {
  sku: string;
  setSku: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sku, setSku] = useState<string>('');

  return (
    <SearchContext.Provider value={{ sku, setSku }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
