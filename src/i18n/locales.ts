import localeConfig from '../seo/locales.json';

export interface LocaleEntry {
  code: string;
  prefix: string;
  htmlLang: string;
  hreflang: string;
  ogLocale: string;
  dataKey: string;
  brandSuffix: string;
}

export const LOCALES: LocaleEntry[] = localeConfig.languages;
export const DEFAULT_LANG = localeConfig.default;
export const LANG_CODES = LOCALES.map((l) => l.code);

const byCode = new Map(LOCALES.map((l) => [l.code, l]));

export const localeOf = (code: string): LocaleEntry =>
  byCode.get(code) ?? byCode.get(DEFAULT_LANG)!;

/** tech_blog.json / release_notes 의 i18n 키 (간체는 그쪽에서 'zh'). */
export const dataKeyOf = (code: string): string => localeOf(code).dataKey;

/*
 * 접두어가 긴 것부터 비교한다. 'zh-Hans'와 'zh-Hant'처럼 한쪽이 다른 쪽의
 * 접두사는 아니지만, 나중에 '/zh' 같은 항목이 들어오면 짧은 쪽이 먼저
 * 걸려 잘못 잡힌다.
 */
const PREFIXED = LOCALES.filter((l) => l.prefix).sort((a, b) => b.prefix.length - a.prefix.length);

/**
 * 경로에서 언어를 떼어낸다.
 * '/en/pricing' → { lang: 'en', basePath: '/pricing' }
 * '/en'         → { lang: 'en', basePath: '/' }
 * '/pricing'    → { lang: 'ko', basePath: '/pricing' }
 */
export function splitLangPath(pathname: string): { lang: string; basePath: string } {
  for (const l of PREFIXED) {
    if (pathname === l.prefix || pathname.startsWith(`${l.prefix}/`)) {
      return { lang: l.code, basePath: pathname.slice(l.prefix.length) || '/' };
    }
  }
  return { lang: DEFAULT_LANG, basePath: pathname };
}

/**
 * 기본 언어 경로를 해당 언어 경로로.
 * ('/pricing', 'en') → '/en/pricing'   ('/', 'en') → '/en'   ('/', 'ko') → '/'
 */
export function localizedPath(basePath: string, lang: string): string {
  const { prefix } = localeOf(lang);
  const p = basePath.startsWith('/') ? basePath : `/${basePath}`;
  if (!prefix) return p;
  return p === '/' ? prefix : prefix + p;
}
