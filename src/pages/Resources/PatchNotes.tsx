import { useTranslation } from 'react-i18next';

type ChangeKind = 'new' | 'improved';

interface ChangeItem {
  /** i18n 키 접두사 — patchNotes.<release>_<key>_title / _sub / _desc */
  key: string;
  kind: ChangeKind;
}

interface Release {
  /** 배포 버전. i18n 키 접두사로도 쓰이므로 점 대신 언더스코어를 쓴 id를 함께 둔다. */
  version: string;
  id: string;
  date: string;
  pdf: string;
  items: ChangeItem[];
}

/**
 * 새 버전을 낼 때는 이 배열 맨 앞에 항목을 하나 추가하고,
 * 같은 접두사의 i18n 키(<id>_desc, <id>_<key>_title/_sub/_desc)를 채우면 된다.
 */
const RELEASES: Release[] = [
  {
    version: 'OR.1.6.242.0724',
    id: 'r_1_6_242_0724',
    date: '2026-07-24',
    pdf: '/pdf/OrangeTheClient_ReleaseNotes_1.6.242.0724.pdf',
    items: [
      { key: 'process', kind: 'new' },
      { key: 'loadSummary', kind: 'new' },
      { key: 'routine', kind: 'new' },
      { key: 'network', kind: 'new' },
      { key: 'fileBox', kind: 'new' },
      { key: 'command', kind: 'improved' },
      { key: 'loadChart', kind: 'improved' },
    ],
  },
];

const KIND_STYLE: Record<ChangeKind, { bg: string; fg: string }> = {
  new: { bg: 'rgba(249,115,22,0.15)', fg: 'var(--accent)' },
  improved: { bg: 'rgba(59,130,246,0.15)', fg: '#3b82f6' },
};

const localeMap: Record<string, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  zh: 'zh-CN',
  ja: 'ja-JP',
};

export default function PatchNotes() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.split('-')[0];

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(localeMap[lang] ?? 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(iso));

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
        {t('patchNotes.badge')}
      </div>
      <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
        {t('patchNotes.title')}
      </h1>
      <p className="text-lg mb-16" style={{ color: 'var(--fg-muted)', lineHeight: '1.8' }}>
        {t('patchNotes.desc')}
      </p>

      {RELEASES.map((release, releaseIndex) => (
        <section key={release.id} className="mb-16">
          {/* ── Release header ── */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--fg)' }}>
              {release.version}
            </h2>
            {releaseIndex === 0 && (
              <span
                className="px-2 py-0.5 text-xs font-semibold rounded"
                style={{ backgroundColor: 'rgba(249,115,22,0.15)', color: 'var(--accent)' }}
              >
                {t('patchNotes.latest')}
              </span>
            )}
            <span className="text-sm" style={{ color: 'var(--fg-dimmer)' }}>
              {formatDate(release.date)}
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--fg-muted)' }}>
            {t(`patchNotes.${release.id}_desc`)}
          </p>

          <div className="mb-10">
            <a
              href={release.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-full font-semibold transition-all"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-strong)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
            >
              {t('patchNotes.download_btn')}
            </a>
          </div>

          {/* ── At a glance ── */}
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--fg)' }}>
            {t('patchNotes.summary_title')}
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {release.items.map(({ key, kind }, i) => (
              <div key={key} className="p-5 rounded-xl flex gap-3" style={cardBase}>
                <span
                  className="text-xs font-bold tracking-widest mt-1 shrink-0"
                  style={{ color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-semibold text-sm" style={{ color: 'var(--fg)' }}>
                      {t(`patchNotes.${release.id}_${key}_title`)}
                    </h4>
                    <span
                      className="px-1.5 py-0.5 text-[10px] font-bold rounded tracking-wider shrink-0"
                      style={{ backgroundColor: KIND_STYLE[kind].bg, color: KIND_STYLE[kind].fg }}
                    >
                      {t(`patchNotes.tag_${kind}`)}
                    </span>
                  </div>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--accent)' }}>
                    {t(`patchNotes.${release.id}_${key}_sub`)}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                    {t(`patchNotes.${release.id}_${key}_desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <p className="text-xs" style={{ color: 'var(--fg-dimmer)' }}>
        {t('patchNotes.pdf_note')}
      </p>
    </div>
  );
}
