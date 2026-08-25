/**
 * 사이트 전역 SEO 상수.
 * 배포 도메인이 바뀌면 VITE_SITE_URL 환경변수로 덮어쓴다.
 */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.orangelabs.co.kr').replace(
  /\/+$/,
  '',
);

export const SITE_NAME = 'OrangeLabs';

/**
 * 타이틀 접미사. 국문 브랜드명('오렌지랩스') 검색에서도 잡히도록
 * 한국어에서는 국·영문을 함께 노출한다.
 */
export const BRAND_SUFFIX: Record<string, string> = {
  ko: '오렌지랩스 OrangeLabs',
  en: 'OrangeLabs',
  ja: 'OrangeLabs',
  'zh-Hans': 'OrangeLabs',
  'zh-Hant': 'OrangeLabs',
};

/** 공유 미리보기 기본 이미지 (1200x630 전용 이미지가 생기면 이 값만 교체) */
export const DEFAULT_OG_IMAGE = '/images/orangebox.png';
export const OG_IMAGE_WIDTH = 720;
export const OG_IMAGE_HEIGHT = 720;

/** i18n 언어 코드 → og:locale */
export const OG_LOCALE: Record<string, string> = {
  ko: 'ko_KR',
  en: 'en_US',
  ja: 'ja_JP',
  'zh-Hans': 'zh_CN',
  'zh-Hant': 'zh_TW',
};

/** i18n 언어 코드 → <html lang> 값 */
export const HTML_LANG: Record<string, string> = {
  ko: 'ko',
  en: 'en',
  ja: 'ja',
  'zh-Hans': 'zh-Hans',
  'zh-Hant': 'zh-Hant',
};

/** 경로를 절대 URL로. 루트를 제외하면 후행 슬래시를 붙이지 않는다. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  if (p === '/') return `${SITE_URL}/`;
  return SITE_URL + p.replace(/\/+$/, '');
}
