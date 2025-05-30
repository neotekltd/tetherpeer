import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Currency, translations, languages, currencies } from '@/config/i18n';

type LocaleContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');
  const [currency, setCurrency] = useState<Currency>('TND');

  useEffect(() => {
    // Set HTML dir attribute for RTL support
    document.documentElement.dir = language === 'ar-TN' ? 'rtl' : 'ltr';
    // Set lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value || key;
  };

  const formatCurrency = (amount: number) => {
    const formatter = new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currency,
    });
    return formatter.format(amount);
  };

  return (
    <LocaleContext.Provider value={{ language, setLanguage, currency, setCurrency, t, formatCurrency }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
} 