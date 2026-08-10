export type Locale = 'en' | 'ar' | 'de';

export const locales: Locale[] = ['en', 'ar', 'de'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  de: 'Deutsch',
};

export const localeFlags: Record<Locale, string> = {
  en: 'EN',
  ar: 'AR',
  de: 'DE',
};
