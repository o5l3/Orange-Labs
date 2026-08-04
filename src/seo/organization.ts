import { SITE_NAME, SITE_URL } from './site';

/**
 * 사이트 공통 Organization / WebSite 구조화 데이터 (홈에서 사용).
 * '오렌지랩스' 브랜드 검색에서 이 도메인이 잡히도록 국문 표기를 함께 등록한다.
 */
export const organizationJsonLd: Record<string, unknown>[] = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: ['오렌지랩스', 'Orange Labs', 'オレンジラボ', '橙实验室'],
    description:
      '오렌지랩스(OrangeLabs)는 엔드포인트 성능·장애관리 솔루션 Orange The Client를 개발하는 기업입니다.',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/images/orangelabs_mark_logo.png`,
    email: 'contact@orangesys.co.kr',
    address: {
      '@type': 'PostalAddress',
      addressLocality: '서울 강남구',
      addressCountry: 'KR',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'sales@orangesys.co.kr',
        availableLanguage: ['ko', 'en', 'ja', 'zh'],
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: '오렌지랩스',
    url: `${SITE_URL}/`,
    inLanguage: ['ko', 'en', 'ja', 'zh-Hans', 'zh-Hant'],
  },
];
