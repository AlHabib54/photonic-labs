'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Locale } from '@/lib/i18n';

type Dict = Record<string, string>;

const en: Dict = {
  nav_home: 'Home',
  nav_about: 'About',
  nav_photonic: 'Photonic CPU',
  nav_research: 'Research',
  nav_algorithms: 'Algorithms',
  nav_it: 'IT Projects',
  nav_downloads: 'Downloads',
  nav_blog: 'Blog',
  nav_contact: 'Contact',
  search_placeholder: 'Search research, projects, publications...',
  search_empty: 'No results found.',
  search_title: 'Search',
  footer_tagline: 'An independent research laboratory advancing photonic computing and intelligent systems.',
  footer_rights: 'All rights reserved.',
  cta_explore: 'Explore Research',
  cta_contact: 'Contact Us',
  cta_read: 'Read More',
  cta_download: 'Download',
  cta_view_all: 'View All',
  lang_label: 'Language',
};

const ar: Dict = {
  ...en,
  nav_home: 'الرئيسية',
  nav_about: 'حول',
  nav_photonic: 'المعالج الفوتوني',
  nav_research: 'الأبحاث',
  nav_algorithms: 'الخوارزميات',
  nav_it: 'مشاريع تقنية المعلومات',
  nav_downloads: 'التحميلات',
  nav_blog: 'المدونة',
  nav_contact: 'اتصل بنا',
  search_placeholder: 'ابحث في الأبحاث والمشاريع والمنشورات...',
  search_empty: 'لا توجد نتائج.',
  search_title: 'بحث',
  footer_tagline: 'مختبر أبحاث مستقل يطور الحوسبة الفوتونية والأنظمة الذكية.',
  footer_rights: 'جميع الحقوق محفوظة.',
  cta_explore: 'استكشف الأبحاث',
  cta_contact: 'اتصل بنا',
  cta_read: 'اقرأ المزيد',
  cta_download: 'تحميل',
  cta_view_all: 'عرض الكل',
  lang_label: 'اللغة',
};

const de: Dict = {
  ...en,
  nav_home: 'Startseite',
  nav_about: 'Über uns',
  nav_photonic: 'Photonische CPU',
  nav_research: 'Forschung',
  nav_algorithms: 'Algorithmen',
  nav_it: 'IT-Projekte',
  nav_downloads: 'Downloads',
  nav_blog: 'Blog',
  nav_contact: 'Kontakt',
  search_placeholder: 'Suche nach Forschung, Projekten, Veröffentlichungen...',
  search_empty: 'Keine Ergebnisse gefunden.',
  search_title: 'Suche',
  footer_tagline: 'Ein unabhängiges Forschungslabor für photonisches Rechnen und intelligente Systeme.',
  footer_rights: 'Alle Rechte vorbehalten.',
  cta_explore: 'Forschung erkunden',
  cta_contact: 'Kontakt aufnehmen',
  cta_read: 'Mehr lesen',
  cta_download: 'Herunterladen',
  cta_view_all: 'Alle anzeigen',
  lang_label: 'Sprache',
};

const dicts: Record<Locale, Dict> = { en, ar, de };

type Ctx = {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  setLocale: (l: Locale) => void;
  t: (key: keyof typeof en) => string;
};

const LanguageContext = createContext<Ctx>({
  locale: 'en',
  dir: 'ltr',
  setLocale: () => {},
  t: (k) => en[k] ?? String(k),
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    setDir(l === 'ar' ? 'rtl' : 'ltr');
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const t = useCallback((key: keyof typeof en) => dicts[locale][key] ?? en[key] ?? String(key), [locale]);

  return (
    <LanguageContext.Provider value={{ locale, dir, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
