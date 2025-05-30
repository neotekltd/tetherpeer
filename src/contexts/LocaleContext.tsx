'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { languages, currencies } from '@/config/i18n';
import translations from '@/config/translations';

type LocaleContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextType>({
  language: 'en',
  setLanguage: () => {},
  currency: 'TND',
  setCurrency: () => {},
  t: (key: string) => key,
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('TND');

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    const savedCurr = localStorage.getItem('currency');
    if (savedLang && languages[savedLang]) setLanguage(savedLang);
    if (savedCurr && currencies[savedCurr]) setCurrency(savedCurr);
  }, []);

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleSetCurrency = (curr: string) => {
    setCurrency(curr);
    localStorage.setItem('currency', curr);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <LocaleContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        currency,
        setCurrency: handleSetCurrency,
        t,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
} 