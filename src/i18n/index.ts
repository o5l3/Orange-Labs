import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ko from './locales/ko.json';
import zhHans from './locales/zh-Hans.json';
import zhHant from './locales/zh-Hant.json';
import ja from './locales/ja.json';
import { DEFAULT_LANG, splitLangPath } from './locales';

/**
 * 언어는 URL이 결정한다. 접두어가 없으면 한국어다.
 *   /pricing     → ko
 *   /en/pricing  → en
 *
 * 예전에는 navigator.language를 따라갔는데, 그러면 검색엔진 크롤러가 영어판을
 * 색인한다. Googlebot은 JS를 실행하고 스스로를 en-US로 보고하므로,
 * main.tsx가 사전 렌더링된 한국어 메타를 걷어낸 자리에 Seo 컴포넌트가 영어
 * 제목·설명을 채워 넣게 된다. 그 결과 사전 렌더링·canonical은 한국어인데
 * 구글 검색결과만 영어로 잡혔다.
 *
 * 그 뒤로는 localStorage('lang')를 썼지만, 그러면 같은 URL이 사람마다 다른
 * 언어를 보여 주고 크롤러에게는 한국어판만 보인다. 언어별 URL을 도입하면서
 * URL을 단일 출처로 바꿨다 — 사람과 크롤러가 같은 주소에서 같은 언어를 본다.
 * 언어 선택은 이제 localStorage에 쓰는 대신 해당 언어 주소로 이동한다.
 */
const initialLang = splitLangPath(
  typeof window === 'undefined' ? '/' : window.location.pathname,
).lang;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ko: { translation: ko },
    'zh-Hans': { translation: zhHans },
    'zh-Hant': { translation: zhHant },
    ja: { translation: ja },
  },
  lng: initialLang,
  fallbackLng: DEFAULT_LANG,
  interpolation: { escapeValue: false },
});

export default i18n;
