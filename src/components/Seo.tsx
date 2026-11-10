import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  SITE_NAME,
  BRAND_SUFFIX,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  OG_LOCALE,
  HTML_LANG,
  absoluteUrl,
} from '../seo/site';
import { LOCALES, DEFAULT_LANG, localizedPath, splitLangPath } from '../i18n/locales';

type JsonLd = Record<string, unknown>;

interface SeoProps {
  /** 로케일 파일의 seo.<seoKey>.title / .description 을 사용한다. */
  seoKey?: string;
  /** seoKey 대신 직접 지정 (블로그 글처럼 동적인 페이지용) */
  title?: string;
  description?: string;
  /**
   * 언어 접두어를 뗀 기준 경로. 기본값은 현재 경로에서 접두어를 뗀 것.
   * canonical과 hreflang은 여기에 현재 언어 접두어를 붙여 만든다.
   */
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  /**
   * 이 페이지에 언어별 URL이 존재하는지.
   *
   * false면 hreflang을 내보내지 않고 canonical을 기본 언어(접두어 없는)
   * 주소로 고정한다. 블로그 글이 그렇다 — 제목·요약은 번역돼 있지만 본문
   * 마크다운은 한국어뿐이어서 언어별 URL을 만들지 않았다. 접두어가 붙은
   * 주소로 들어와도 한국어 주소로 합쳐지도록 canonical을 고정한다.
   */
  localized?: boolean;
  article?: { publishedTime?: string; section?: string };
  jsonLd?: JsonLd | JsonLd[];
}

/**
 * 페이지 단위 메타데이터.
 * React 19의 네이티브 메타데이터 호이스팅을 쓰므로 별도 헬멧 라이브러리가 필요 없다.
 * JSON-LD만 <script>라 호이스팅 대상이 아니어서 직접 head에 넣는다.
 */
export default function Seo({
  seoKey,
  title,
  description,
  path,
  image,
  type = 'website',
  noindex = false,
  localized = true,
  article,
  jsonLd,
}: SeoProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const lang = i18n.language;
  const basePath = path ?? splitLangPath(location.pathname).basePath;
  const canonicalPath = localized ? localizedPath(basePath, lang) : basePath;
  const url = absoluteUrl(canonicalPath);

  const rawTitle = title ?? (seoKey ? t(`seo.${seoKey}.title`) : SITE_NAME);
  const rawDesc =
    description ?? (seoKey ? t(`seo.${seoKey}.description`) : t('seo.home.description'));

  // 홈처럼 타이틀에 이미 브랜드가 들어간 경우에는 접미사를 덧붙이지 않는다.
  const brand = BRAND_SUFFIX[lang] ?? SITE_NAME;
  const fullTitle = rawTitle.includes(SITE_NAME) ? rawTitle : `${rawTitle} | ${brand}`;
  const ogImage = absoluteUrl(image ?? DEFAULT_OG_IMAGE);

  // <html lang>은 React가 렌더링할 수 없으므로 직접 동기화한다.
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang] ?? lang.split('-')[0] ?? 'ko';
  }, [lang]);

  // JSON-LD 구조화 데이터.
  // 인라인 객체 리터럴로 넘어오는 경우가 많아 직렬화 결과를 의존성으로 쓴다.
  const jsonLdText = jsonLd ? JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : null;
  useEffect(() => {
    if (!jsonLdText) return;
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.dataset.seoJsonld = '';
    el.textContent = jsonLdText;
    document.head.appendChild(el);
    return () => el.remove();
  }, [jsonLdText]);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={rawDesc} />
      <link rel="canonical" href={url} />
      {/*
        언어별 URL 신고. 모든 언어판이 서로를 가리켜야 구글이 묶어 준다.
        x-default는 언어가 맞지 않는 방문자에게 보여 줄 판으로, 기본 언어를 쓴다.
      */}
      {localized &&
        LOCALES.map(({ code, hreflang }) => (
          <link
            key={hreflang}
            rel="alternate"
            hrefLang={hreflang}
            href={absoluteUrl(localizedPath(basePath, code))}
          />
        ))}
      {localized && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={absoluteUrl(localizedPath(basePath, DEFAULT_LANG))}
        />
      )}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={rawDesc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
      <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
      <meta property="og:locale" content={OG_LOCALE[lang] ?? 'ko_KR'} />
      {Object.entries(OG_LOCALE)
        .filter(([code]) => code !== lang)
        .map(([code, ogLocale]) => (
          <meta key={code} property="og:locale:alternate" content={ogLocale} />
        ))}

      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.section && <meta property="article:section" content={article.section} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={rawDesc} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}
