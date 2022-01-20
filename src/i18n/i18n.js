import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { I18N_EN } from './en/en.i18n';
import { I18N_DE } from './de/de.i18n';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: I18N_EN
            },
            'de-AT': {
                translation: I18N_DE
            },
            'de-DE': {
                translation: I18N_DE
            }
        },
        fallbackLng: 'en'
    });
