import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../i18n/date';
import { INDEX_URL, KIND_STYLE, pickText, type Release } from './releaseNotes';

export default function ReleaseNotes() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [releases, setReleases] = useState<Release[]>([]);

  useEffect(() => {
    fetch(INDEX_URL)
      .then((res) => res.json())
      .then(setReleases)
      .catch(() => setReleases([]));
  }, []);

  const cardBase = { backgroundColor: 'var(--surface)', border: '1px solid var(--border)' };

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
        {releases.map((release, i) => {
          const text = pickText(release, i18n.language);
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
                {i === 0 && (
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
                {release.items.map(({ key, kind }) => (
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
    </div>
  );
}
