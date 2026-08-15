import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../i18n/date';
import { INDEX_URL, formatSize, pickText, type DownloadItem } from './downloadData';

export default function Downloads() {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState<DownloadItem[] | null>(null);

  useEffect(() => {
    fetch(INDEX_URL)
      .then((res) => res.json())
      .then(setItems)
      .catch(() => setItems([]));
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
        {t('downloads.badge')}
      </div>
      <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
        {t('downloads.title')}
      </h1>
      <p className="text-lg mb-16" style={{ color: 'var(--fg-muted)', lineHeight: '1.8' }}>
        {t('downloads.desc')}
      </p>

      {items === null && (
        <p className="text-sm" style={{ color: 'var(--fg-dimmer)' }}>
          {t('downloads.loading')}
        </p>
      )}

      {items !== null && items.length === 0 && (
        <div className="p-10 rounded-2xl text-center" style={cardBase}>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            {t('downloads.empty')}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {(items ?? []).map((item) => {
          const text = pickText(item, i18n.language);
          const size = formatSize(item.size);
          return (
            <article key={item.slug} className="p-6 rounded-2xl" style={cardBase}>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h2 className="text-xl font-bold" style={{ color: 'var(--fg)' }}>
                  {text.name}
                </h2>
                <span
                  className="px-2 py-0.5 text-xs font-semibold rounded"
                  style={{ backgroundColor: 'rgba(249,115,22,0.15)', color: 'var(--accent)' }}
                >
                  {item.version}
                </span>
                <span className="text-sm" style={{ color: 'var(--fg-dimmer)' }}>
                  {formatDate(item.date, i18n.language)}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--fg-muted)' }}>
                {text.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {[item.os, size].filter(Boolean).map((v) => (
                  <span
                    key={v}
                    className="px-2 py-1 text-xs rounded-lg"
                    style={{ backgroundColor: 'var(--surface-2)', color: 'var(--fg-muted)' }}
                  >
                    {v}
                  </span>
                ))}
              </div>

              <a
                href={item.file}
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 3v12M7 12l5 5 5-5M5 21h14" />
                </svg>
                {t('downloads.download_btn')}
              </a>

              {/* 받은 파일이 도중에 바뀌지 않았는지 확인할 수 있게 같이 적어 둔다 */}
              {item.sha256 && (
                <p
                  className="mt-4 text-xs break-all"
                  style={{ color: 'var(--fg-dimmer)', fontFamily: 'monospace' }}
                >
                  SHA-256 {item.sha256}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
