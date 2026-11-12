import React from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANG, LANGUAGES } from 'common/i18n';
import {
  BrowserStorageKeys,
  browserStorage,
} from 'common/repositories/browser-storage';
import type { Lang } from 'common/api/model';

// Applies the saved language after mount (the server always renders Indonesian)
export function LanguageSync() {
  const { i18n } = useTranslation();
  React.useEffect(() => {
    const saved = browserStorage.get(
      BrowserStorageKeys.Language,
    ) as Lang | null;
    const browser = navigator.language?.toLowerCase().startsWith('id')
      ? 'id'
      : 'en';
    const lang = saved && LANGUAGES.includes(saved) ? saved : browser;
    if (lang !== i18n.language) i18n.changeLanguage(lang);
  }, [i18n]);
  React.useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  return null;
}

export default function useLanguage() {
  const { i18n } = useTranslation();
  const lang = (
    LANGUAGES.includes(i18n.language as Lang) ? i18n.language : DEFAULT_LANG
  ) as Lang;
  const setLanguage = React.useCallback(
    (next: Lang) => {
      browserStorage.set(BrowserStorageKeys.Language, next);
      i18n.changeLanguage(next);
    },
    [i18n],
  );
  return { lang, setLanguage };
}
