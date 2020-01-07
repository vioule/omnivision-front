import { English, French } from './languages';

const translations = {
  en: English,
  fr: French,
};

export const getLocale = () => (document.documentElement && document.documentElement.lang) || 'fr';

export const setLocale = (locale) => {
  document.documentElement.lang = locale;
};

export const translate = (name = 'default', language) => {
  const locale = language && translations[language] ? language : getLocale();
  const translated = translations[locale][name];
  return translated || name;
};
