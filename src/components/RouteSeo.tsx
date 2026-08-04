import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from './Seo';
import { organizationJsonLd } from '../seo/organization';
import routes from '../seo/routes.json';
import { SITE_URL, SITE_NAME, absoluteUrl } from '../seo/site';

/** 블로그 글·릴리즈 노트 상세는 각 데이터를 가진 페이지 컴포넌트가 직접 Seo를 렌더링한다. */
const DETAIL_PATH = /^\/resources\/(tech-blog|release-notes)\/[^/]+$/;

const FAQ_COUNT = 7;

/**
 * 경로 → 메타데이터 매핑을 한곳에서 처리한다.
 * Layout에 한 번만 붙여두면 모든 정적 라우트가 자동으로 커버된다.
 */
export default function RouteSeo() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

  if (DETAIL_PATH.test(path)) return null;

  const route = routes.find((r) => r.path === path);
  if (!route) return <Seo seoKey="notFound" path={path} noindex />;

  const jsonLd: Record<string, unknown>[] = [];

  if (route.key === 'home') {
    jsonLd.push(...organizationJsonLd);
  } else {
    // 홈 외의 페이지는 "홈 > 현재 페이지" 2단 브레드크럼을 노출한다.
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: t(`seo.${route.key}.title`),
          item: absoluteUrl(path),
        },
      ],
    });
  }

  if (route.key === 'otc') {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Orange The Client',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Windows',
      description: t('seo.otc.description'),
      url: absoluteUrl(path),
      publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
    });
  }

  if (route.key === 'support') {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: Array.from({ length: FAQ_COUNT }, (_, i) => ({
        '@type': 'Question',
        name: t(`support.faq_${i + 1}_q`),
        acceptedAnswer: { '@type': 'Answer', text: t(`support.faq_${i + 1}_a`) },
      })),
    });
  }

  if (route.key === 'techBlog') {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: t('seo.techBlog.title'),
      description: t('seo.techBlog.description'),
      url: absoluteUrl(path),
      publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
    });
  }

  return <Seo seoKey={route.key} path={path} jsonLd={jsonLd} />;
}
