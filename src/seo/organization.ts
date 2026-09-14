import { SITE_URL } from './site';
import schema from './organization.json';

/**
 * 사이트 공통 Organization / WebSite 구조화 데이터 (홈에서 사용).
 * '오렌지랩스' 브랜드 검색에서 이 도메인이 잡히도록 국문 표기를 함께 등록한다.
 *
 * 실제 내용은 organization.json에 있다. 빌드 스크립트(scripts/generate-seo.mjs)가
 * 같은 파일을 읽어 사전 렌더링 HTML에도 넣기 때문이다 — JS를 실행하지 않는
 * 크롤러와, 렌더링 큐를 기다려야 하는 구글에게는 그쪽이 먼저 보인다.
 * 양쪽이 갈라지지 않도록 값은 한 곳에만 둔다.
 */
export const organizationJsonLd: Record<string, unknown>[] = JSON.parse(
  JSON.stringify(schema).replaceAll('{{SITE_URL}}', SITE_URL),
);
