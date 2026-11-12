import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enAccount from 'locales/en/account.json';
import enBooking from 'locales/en/booking.json';
import enCommon from 'locales/en/common.json';
import enHome from 'locales/en/home.json';
import enLayout from 'locales/en/layout.json';
import idAccount from 'locales/id/account.json';
import idBooking from 'locales/id/booking.json';
import idCommon from 'locales/id/common.json';
import idHome from 'locales/id/home.json';
import idLayout from 'locales/id/layout.json';
import type { Lang } from 'common/api/model';

export const LANGUAGES: Lang[] = ['id', 'en'];
export const DEFAULT_LANG: Lang = 'id';
export const NAMESPACES = [
  'common',
  'home',
  'booking',
  'account',
  'layout',
] as const;

// Every namespace is bundled, so there is no loading state. The server and the
// first client render always use Indonesian; the saved choice is applied after
// mount (see hooks/use-language) to keep hydration consistent.
i18n.use(initReactI18next).init({
  resources: {
    id: {
      common: idCommon,
      home: idHome,
      booking: idBooking,
      account: idAccount,
      layout: idLayout,
    },
    en: {
      common: enCommon,
      home: enHome,
      booking: enBooking,
      account: enAccount,
      layout: enLayout,
    },
  },
  lng: DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  ns: NAMESPACES,
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
