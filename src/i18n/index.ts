import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ko from './locales/ko.json';
import zhHans from './locales/zh-Hans.json';
import zhHant from './locales/zh-Hant.json';
import ja from './locales/ja.json';

// 브라우저 언어 감지 (첫 방문자용)
function detectBrowserLang(): string {
  const lang = (navigator.language || '').toLowerCase();
  if (lang.startsWith('ko')) return 'ko';
  if (lang.startsWith('ja')) return 'ja';
  if (/^zh-(tw|hk|mo|hant)/i.test(lang)) return 'zh-Hant';
  if (lang.startsWith('zh')) return 'zh-Hans';
  if (lang.startsWith('en')) return 'en';
  return 'ko';
}

// 기존 'zh' 설정 사용자를 'zh-Hans'로 마이그레이션
const storedLang = localStorage.getItem('lang');
const initialLang =
  storedLang === 'zh' ? 'zh-Hans' : storedLang || detectBrowserLang();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ko: { translation: ko },
    'zh-Hans': { translation: zhHans },
    'zh-Hant': { translation: zhHant },
    ja: { translation: ja },
  },
  lng: initialLang,
  fallbackLng: 'ko',
  interpolation: { escapeValue: false },
});

export default i18n;
