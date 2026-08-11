import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ko from './locales/ko.json';
import zhHans from './locales/zh-Hans.json';
import zhHant from './locales/zh-Hant.json';
import ja from './locales/ja.json';

/**
 * 첫 방문은 한국어로 연다.
 *
 * 예전에는 navigator.language를 따라갔는데, 그러면 검색엔진 크롤러가 영어판을
 * 색인한다. Googlebot은 JS를 실행하고 스스로를 en-US로 보고하므로,
 * main.tsx가 사전 렌더링된 한국어 메타를 걷어낸 자리에 Seo 컴포넌트가 영어
 * 제목·설명을 채워 넣게 된다. 그 결과 사전 렌더링·canonical은 한국어인데
 * 구글 검색결과만 영어로 잡혔다.
 *
 * 다른 언어는 헤더의 언어 선택으로 바꾸며, 선택값은 localStorage('lang')에
 * 남아 다음 방문에도 유지된다.
 */
const DEFAULT_LANG = 'ko';

// 기존 'zh' 설정 사용자를 'zh-Hans'로 마이그레이션
const storedLang = localStorage.getItem('lang');
const initialLang = storedLang === 'zh' ? 'zh-Hans' : storedLang || DEFAULT_LANG;

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
