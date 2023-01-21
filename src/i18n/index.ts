import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en';
import ar from './locales/ar';
import {languageDetectorPlugin} from '../utils/languageDetectorPlugin';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(languageDetectorPlugin)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      ar: {
        translation: ar,
      },
      en: {
        translation: en,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false, //in case you have any suspense related errors
    },
  });

export default i18n;
