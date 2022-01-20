import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { I18N_EN } from './en/en.i18n';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: I18N_EN
        }
    },
    fallbackLng: 'en'
});
