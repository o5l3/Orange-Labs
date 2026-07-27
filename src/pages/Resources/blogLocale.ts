export interface BlogPost {
  category: string;
  categoryColor: string;
  subject: string;
  content: string;
  readMinutes: string;
  createdAt: string;
  md: string;
}

export interface BlogData {
  language: string;
  posts: BlogPost[];
}

const localeMap: Record<string, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  'zh-Hant': 'zh-TW',
  zh: 'zh-CN',
  ja: 'ja-JP',
};

/** tech_blog.json은 날짜를 2026.07.24 형태로 담고 있다. */
const parseDate = (s: string) => new Date(s.replace(/\./g, '-'));

export function formatDate(dateStr: string, language: string): string {
  const locale = localeMap[language] ?? localeMap[language.split('-')[0]] ?? 'en-US';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(parseDate(dateStr));
}

/**
 * 언어 코드를 완전 일치 → 앞부분 일치 → en 순으로 찾는다.
 * zh-Hant는 전용 항목으로, zh-Hans는 앞부분 일치로 간체('zh') 항목에 떨어진다.
 */
export function pickPosts(data: BlogData[], language: string): BlogPost[] {
  const matched =
    data.find((d) => d.language === language) ??
    data.find((d) => d.language === language.split('-')[0]) ??
    data.find((d) => d.language === 'en');
  if (!matched) return [];
  return [...matched.posts].sort(
    (a, b) => parseDate(b.createdAt).getTime() - parseDate(a.createdAt).getTime(),
  );
}

export const getSlugFromMd = (md: string): string =>
  (md.split('/').at(-1) ?? '').replace(/\.md$/, '');
