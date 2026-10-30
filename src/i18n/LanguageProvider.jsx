import { useEffect, useMemo, useState } from 'react';
import en from './en';
import pt from './pt';
import { LanguageContext } from './useLanguage';

const DICTIONARIES = { en, pt };
const STORAGE_KEY = 'umbra-language';

function readStoredLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return Object.hasOwn(DICTIONARIES, stored) ? stored : 'en';
  } catch {
    return 'en';
  }
}

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readStoredLanguage);
  const t = DICTIONARIES[language];

  useEffect(() => {
    document.documentElement.lang = t.meta.locale;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The choice still applies to this visit when storage is blocked.
    }
  }, [language, t]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export default LanguageProvider;
