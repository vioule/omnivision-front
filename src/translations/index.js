import * as constants from './constants';
import { English, French } from './languages';
import { getLocale, setLocale, translate } from './helpers';

const translations = {
  en: English,
  fr: French,
};

export {
  constants,
  translations,
  getLocale,
  setLocale,
  translate,
};
