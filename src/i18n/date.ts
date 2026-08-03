const localeMap: Record<string, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  'zh-Hant': 'zh-TW',
  zh: 'zh-CN',
  ja: 'ja-JP',
};

/** tech_blog.json은 2026.07.24, 릴리즈 노트는 2026-07-24 형태를 쓴다. 둘 다 받는다. */
export const parseDate = (s: string) => new Date(s.replace(/\./g, '-'));

export function formatDate(dateStr: string, language: string): string {
  const locale = localeMap[language] ?? localeMap[language.split('-')[0]] ?? 'en-US';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(parseDate(dateStr));
}
