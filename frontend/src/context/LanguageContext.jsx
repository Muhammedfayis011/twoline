import { createContext, useContext, useState } from 'react';
import { en } from '../translations/en';
import { ar } from '../translations/ar';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const isAr = lang === 'ar';
  const t = isAr ? ar : en;

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    setLang(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang === 'ar' ? 'ar' : 'en';
    document.body.style.fontFamily = newLang === 'ar'
      ? "'Cairo', sans-serif"
      : "'Inter', sans-serif";
  };

  return (
    <LanguageContext.Provider value={{ lang, isAr, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
