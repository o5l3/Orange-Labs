import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../i18n/date';
import { INDEX_URL, KIND_STYLE, pickText, type Release } from './releaseNoteData';

/** 한 페이지에 보이는 릴리즈 수 */
const PAGE_SIZE = 10;
/** 카드에 보이는 항목 태그 수. 나머지는 「외 N건」으로 묶는다 (한 회차에 30건까지 있었다) */
const MAX_TAGS = 5;

export default function ReleaseNotes() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [releases, setReleases] = useState<Release[]>([]);

  useEffect(() => {
    fetch(INDEX_URL)
      .then((res) => res.json())
      .then(setReleases)
      .catch(() => setReleases([]));
  }, []);

  // ?page=N. 범위를 벗어나거나 숫자가 아니면 가장 가까운 페이지로 맞춘다
  const pageCount = Math.max(1, Math.ceil(releases.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(searchParams.get('page')) || 1), pageCount);
  const visible = releases.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageTo = (p: number) => ({ search: p === 1 ? '' : `?page=${p}` });

  // ScrollToTop 은 경로만 보므로 ?page 가 바뀔 때는 여기서 올린다
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  const cardBase = { backgroundColor: 'var(--surface)', border: '1px solid var(--border)' };
  const pageBtn = 'min-w-9 h-9 px-3 inline-flex items-center justify-center text-sm rounded-lg';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
      {/* ── Hero ── */}
      <div
        className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
        style={{
          backgroundColor: 'rgba(249,115,22,0.1)',
          color: 'var(--accent)',
          border: '1px solid rgba(249,115,22,0.3)',
        }}
      >
        {t('releaseNotes.badge')}
      </div>
      <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
        {t('releaseNotes.title')}
      </h1>
      <p className="text-lg mb-16" style={{ color: 'var(--fg-muted)', lineHeight: '1.8' }}>
        {t('releaseNotes.desc')}
      </p>

      <div className="space-y-4">
        {visible.map((release, i) => {
          const text = pickText(release, i18n.language);
          // 「외 1건」으로 묶으면 태그 하나 보이는 것과 길이가 같으니 그때는 다 보인다
          const tagCount = release.items.length <= MAX_TAGS + 1 ? release.items.length : MAX_TAGS;
          const hidden = release.items.length - tagCount;
          return (
            <article
              key={release.slug}
              className="p-6 rounded-2xl cursor-pointer transition-all"
              style={cardBase}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              onClick={() => navigate(`/resources/release-notes/${release.slug}`)}
            >
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h2 className="text-xl font-bold" style={{ color: 'var(--fg)' }}>
                  {release.version}
                </h2>
                {page === 1 && i === 0 && (
                  <span
                    className="px-2 py-0.5 text-xs font-semibold rounded"
                    style={{ backgroundColor: 'rgba(249,115,22,0.15)', color: 'var(--accent)' }}
                  >
                    {t('releaseNotes.latest')}
                  </span>
                )}
                <span className="text-sm" style={{ color: 'var(--fg-dimmer)' }}>
                  {formatDate(release.date, i18n.language)}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--fg-muted)' }}>
                {text.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {release.items.slice(0, tagCount).map(({ key, kind }) => (
                  <span
                    key={key}
                    className="px-2 py-1 text-xs rounded-lg"
                    style={{ backgroundColor: 'var(--surface-2)', color: 'var(--fg-muted)' }}
                  >
                    <span className="font-semibold mr-1.5" style={{ color: KIND_STYLE[kind].fg }}>
                      {t(`releaseNotes.tag_${kind}`)}
                    </span>
                    {text.items[key]?.title}
                  </span>
                ))}
                {hidden > 0 && (
                  <span className="px-2 py-1 text-xs font-semibold" style={{ color: 'var(--fg-muted)' }}>
                    {t('releaseNotes.moreItems', { n: hidden })}
                  </span>
                )}
              </div>

              <span
                className="text-xs font-medium flex items-center gap-1"
                style={{ color: 'var(--accent)' }}
              >
                {t('releaseNotes.readMore')}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </article>
          );
        })}
      </div>

      {/* ── 페이지 이동 ── ponytail: 번호를 전부 늘어놓는다. 10쪽을 넘으면 말줄임 추가 */}
      {pageCount > 1 && (
        <nav aria-label={t('releaseNotes.pagination')} className="flex justify-center flex-wrap gap-2 mt-12">
          {page > 1 && (
            <Link to={pageTo(page - 1)} className={pageBtn} style={{ ...cardBase, color: 'var(--fg-muted)' }}>
              {t('releaseNotes.prevPage')}
            </Link>
          )}
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              to={pageTo(p)}
              aria-current={p === page ? 'page' : undefined}
              className={`${pageBtn} font-semibold`}
              style={
                p === page
                  ? { backgroundColor: 'var(--accent)', border: '1px solid var(--accent)', color: '#fff' }
                  : { ...cardBase, color: 'var(--fg-muted)' }
              }
            >
              {p}
            </Link>
          ))}
          {page < pageCount && (
            <Link to={pageTo(page + 1)} className={pageBtn} style={{ ...cardBase, color: 'var(--fg-muted)' }}>
              {t('releaseNotes.nextPage')}
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
