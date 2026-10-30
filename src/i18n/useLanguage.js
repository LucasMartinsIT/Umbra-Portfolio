import { createContext, useContext } from 'react';
import en from './en';

export const LanguageContext = createContext({ language: 'en', setLanguage: () => {}, t: en });

export function useLanguage() {
  return useContext(LanguageContext);
}
