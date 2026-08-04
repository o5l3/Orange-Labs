import { useState, useEffect, startTransition } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Markdown from '../../components/Markdown';
import Seo from '../../components/Seo';
import { SITE_NAME, SITE_URL, absoluteUrl } from '../../seo/site';
import { formatDate } from '../../i18n/date';
import { INDEX_URL, KIND_STYLE, pickText, type Release } from './releaseNotes';

export default function ReleaseNoteContent() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [releases, setReleases] = useState<Release[]>([]);
  // null = 로딩 중, '' = 에러/없음, string = 정상
  const [body, setBody] = useState<string | null>(null);

  useEffect(() => {
    fetch(INDEX_URL)
      .then((res) => res.json())
      .then(setReleases)
      .catch(() => setReleases([]));
  }, []);

  const release = releases.find((r) => r.slug === slug) ?? null;

  useEffect(() => {
    if (!release) return;
    let cancelled = false;
    startTransition(() => setBody(null));
    fetch(release.body)
      .then((res) => (res.ok ? res.text() : Promise.reject()))
      .then((text) => {
        if (!cancelled) setBody(text);
      })
      .catch(() => {
        if (!cancelled) setBody('');
      });
    return () => {
      cancelled = true;
    };
  }, [release]);

  const text = release ? pickText(release, i18n.language) : null;
  const notePath = `/resources/release-notes/${slug}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {release && text && (
        <Seo
          title={`${release.version} ${t('releaseNotes.title')}`}
          description={text.excerpt}
          path={notePath}
          type="article"
          article={{ publishedTime: release.date }}
          jsonLd={{
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: `${release.version} ${t('releaseNotes.title')}`,
            description: text.excerpt,
            datePublished: release.date,
            inLanguage: i18n.language,
            mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(notePath) },
            about: { '@type': 'SoftwareApplication', name: 'Orange The Client' },
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
              url: `${SITE_URL}/`,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/images/orangelabs_mark_logo.png`,
              },
            },
          }}
        />
      )}

      {/* 뒤로 가기 */}
      <button
        className="flex items-center gap-1 text-sm font-semibold mb-10 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
        style={{ color: 'var(--accent)', backgroundColor: 'transparent' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--accent-strong)';
          e.currentTarget.style.backgroundColor = 'rgba(249,115,22,0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--accent)';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        onClick={() => navigate('/resources/release-notes')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        {t('releaseNotes.back')}
      </button>

      {release && text && (
        <>
          {/* 헤더 */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <h1 className="text-3xl font-bold" style={{ color: 'var(--fg)' }}>
              {release.version}
            </h1>
            <span className="text-sm" style={{ color: 'var(--fg-dimmer)' }}>
              {formatDate(release.date, i18n.language)}
            </span>
          </div>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--fg-muted)' }}>
            {text.excerpt}
          </p>

          <div className="mb-12">
            <a
              href={release.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-full font-semibold transition-all"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-strong)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
            >
              {t('releaseNotes.download_btn')}
            </a>
          </div>

          {/* 한눈에 */}
          <h2
            className="text-xl font-bold mb-4 pb-2"
            style={{ color: 'var(--fg)', borderBottom: '1px solid var(--border)' }}
          >
            {t('releaseNotes.summary_title')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-16">
            {release.items.map(({ key, kind }, i) => (
              <div
                key={key}
                className="p-5 rounded-xl flex gap-3"
                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <span
                  className="text-xs font-bold tracking-widest mt-1 shrink-0"
                  style={{ color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--fg)' }}>
                      {text.items[key]?.title}
                    </h3>
                    <span
                      className="px-1.5 py-0.5 text-[10px] font-bold rounded tracking-wider shrink-0"
                      style={{ backgroundColor: KIND_STYLE[kind].bg, color: KIND_STYLE[kind].fg }}
                    >
                      {t(`releaseNotes.tag_${kind}`)}
                    </span>
                  </div>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--accent)' }}>
                    {text.items[key]?.sub}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                    {text.items[key]?.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 상세 본문 — 언어와 무관하게 한국어 원문 */}
      {body === null ? (
        <div className="text-center py-24" style={{ color: 'var(--fg-dim)' }}>
          {t('releaseNotes.loading')}
        </div>
      ) : (
        body && (
          <article>
            <Markdown>{body}</Markdown>
          </article>
        )
      )}
    </div>
  );
}
