export interface DownloadText {
  name: string;
  desc: string;
}

export interface DownloadItem {
  slug: string;
  version: string;
  /** YYYY-MM-DD */
  date: string;
  /** 동작 환경 한 줄. 없으면 표시하지 않는다 */
  os?: string;
  /** 바이트 수. 화면에서 환산한다 */
  size?: number;
  /** 받은 파일이 바뀌지 않았는지 받는 쪽이 확인할 수 있게 */
  sha256?: string;
  /** 사이트 루트 기준 경로 또는 https:// 로 시작하는 외부 주소 */
  file: string;
  i18n: Record<string, DownloadText>;
}

export const INDEX_URL = '/downloads/index.json';

/** 릴리즈 노트와 같은 규칙 — 완전 일치 → 앞부분 일치 → 한국어 */
export function pickText(item: DownloadItem, language: string): DownloadText {
  return item.i18n[language] ?? item.i18n[language.split('-')[0]] ?? item.i18n.ko;
}

/** 바이트 → 사람이 읽는 크기. 소수 한 자리면 충분하다 */
export function formatSize(bytes?: number): string {
  if (!bytes || bytes < 0) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let n = bytes;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i += 1;
  }
  return `${i === 0 ? n : n.toFixed(1)} ${units[i]}`;
}
