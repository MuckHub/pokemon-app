import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const translationsEn = {
  perPage: 'Pokemons per page:',
  weight: 'Weight:',
  back: 'Back',
  error: 'Something went wrong',
  refresh: 'Refresh',
};
const translationsDe = {
  perPage: 'Pokemons pro seite',
  weight: 'Gewicht:',
  back: 'Zurück',
  error: 'Etwas ist schief gelaufen',
  refresh: 'Aktualisierung',
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationsEn },
    de: { translation: translationsDe },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
