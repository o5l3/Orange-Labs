export type ChangeKind = 'new' | 'improved' | 'fixed';

export interface ChangeItem {
  key: string;
  kind: ChangeKind;
}

export interface ReleaseText {
  excerpt: string;
  items: Record<string, { title: string; sub: string; desc: string }>;
}

export interface Release {
  version: string;
  slug: string;
  date: string;
  /** 사이트 루트 기준 경로 */
  pdf: string;
  /** 상세 본문 md의 사이트 루트 기준 경로 */
  body: string;
  items: ChangeItem[];
  i18n: Record<string, ReleaseText>;
}

export const INDEX_URL = '/release_notes/index.json';

export const KIND_STYLE: Record<ChangeKind, { bg: string; fg: string }> = {
  new: { bg: 'rgba(249,115,22,0.15)', fg: 'var(--accent)' },
  improved: { bg: 'rgba(59,130,246,0.15)', fg: '#3b82f6' },
  fixed: { bg: 'rgba(16,185,129,0.15)', fg: '#10b981' },
};

/**
 * 언어 코드를 완전 일치 → 앞부분 일치 → 한국어 순으로 찾는다.
 * 릴리즈 노트 본문(md)은 언어와 무관하게 한국어 원문을 쓰므로 최종 대체도 한국어다.
 */
export function pickText(release: Release, language: string): ReleaseText {
  return (
    release.i18n[language] ?? release.i18n[language.split('-')[0]] ?? release.i18n.ko
  );
}
