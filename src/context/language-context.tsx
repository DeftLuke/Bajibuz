
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LANGUAGE_STORAGE_KEY = 'bajibuz_language_preference';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en'); // Default to English
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // This part runs only on client after mount
    const storedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    if (storedLang && (storedLang === 'en' || storedLang === 'bn')) {
      setLanguageState(storedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    if (isClient) { // Ensure this only runs on the client
      setLanguageState(lang);
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  };
  
  // Update document lang attribute
  useEffect(() => {
    if (isClient) { // Ensure this only runs on the client
      document.documentElement.lang = language;
    }
  }, [language, isClient]);

  // Render children immediately with default language state.
  // Client-side useEffect will update if a different preference is in localStorage.
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
