import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt from './pt.json';
import en from './en.json';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n.use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: true,
    },
  });
