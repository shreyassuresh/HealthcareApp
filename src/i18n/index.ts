import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../translations/en.json';
import hi from '../translations/hi.json';
import ta from '../translations/ta.json';
import gu from '../translations/gu.json';
import te from '../translations/te.json';

const resources = {
  en: {
    translation: en,
  },
  hi: {
    translation: hi,
  },
  ta: {
    translation: ta,
  },
  gu: {
    translation: gu,
  },
  te: {
    translation: te,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',
    debug: __DEV__,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
    },
  })
  .catch((error) => {
    console.error('i18n initialization error:', error);
  });

export default i18n; 