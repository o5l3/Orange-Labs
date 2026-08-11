import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SITE_NAME = 'OrangeLabs';
export const SITE_URL = 'https://orangelabs.xyz';

interface SeoProps {
  /** 페이지 제목. 뒤에 사이트명이 붙는다. 비우면 사이트명만 쓴다. */
  title?: string;
  description: string;
  /** 검색결과에서 제외할 페이지에만 켠다. */
  noindex?: boolean;
}

/** name= 또는 property= 로 찾아 내용만 갈아끼운다. 없으면 만든다. */
function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * 페이지별 title · description · canonical · og를 넣는다.
 *
 * JSX로 <title>·<meta>를 렌더하면(React 19의 메타데이터 호이스팅) index.html에
 * 이미 있는 태그를 대체하지 않고 뒤에 하나 더 붙인다. canonical이 둘이면
 * 검색엔진이 어느 쪽도 신뢰하지 않으므로, 여기서는 head의 기존 태그를 직접
 * 갱신한다. index.html의 값은 JS를 실행하지 않는 크롤러·SNS 미리보기 봇을
 * 위한 기본값으로 남는다.
 */
export default function Seo({ title, description, noindex }: SeoProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
    const canonical = SITE_URL + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''));

    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setCanonical(canonical);
  }, [title, description, noindex, pathname]);

  return null;
}
