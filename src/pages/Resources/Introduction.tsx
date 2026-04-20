import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Introduction() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const components = [
    { key: 'agent',   num: '01' },
    { key: 'kernel',  num: '02' },
    { key: 'manager', num: '03' },
    { key: 'console', num: '04' },
  ];

  const concepts = [
    { key: '1', num: '01' },
    { key: '2', num: '02' },
    { key: '3', num: '03' },
  ];

  const steps = [1, 2, 3, 4];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">

      {/* Hero */}
      <div
        className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
        style={{
          backgroundColor: 'rgba(249,115,22,0.1)',
          color: 'var(--accent)',
          border: '1px solid rgba(249,115,22,0.3)',
        }}
      >
        {t('introduction.badge')}
      </div>
      <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--fg)' }}>
        {t('introduction.title')}
      </h1>
      <p className="text-lg mb-16" style={{ color: 'var(--fg-muted)', lineHeight: '1.8' }}>
        {t('introduction.desc')}
      </p>

      {/* System Components */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--fg)' }}>
        {t('introduction.components_title')}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-16">
        {components.map(({ key, num }) => (
          <div
            key={key}
            className="p-6 rounded-xl"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-sm font-bold tracking-widest"
                style={{ color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}
              >
                {num}
              </span>
              <h3 className="font-bold text-lg" style={{ color: 'var(--accent)' }}>
                {t(`introduction.component_${key}_title`)}
              </h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              {t(`introduction.component_${key}_desc`)}
            </p>
          </div>
        ))}
      </div>

      {/* Core Concepts */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--fg)' }}>
        {t('introduction.concepts_title')}
      </h2>
      <div className="space-y-4 mb-16">
        {concepts.map(({ key, num }) => (
          <div
            key={key}
            className="p-6 rounded-xl flex gap-4"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <span
              className="text-sm font-bold tracking-widest mt-1 shrink-0"
              style={{ color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}
            >
              {num}
            </span>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--fg)' }}>
                {t(`introduction.concept_${key}_title`)}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                {t(`introduction.concept_${key}_desc`)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Start */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--fg)' }}>
        {t('introduction.quickstart_title')}
      </h2>
      <div className="space-y-3 mb-16">
        {steps.map((n) => (
          <div
            key={n}
            className="flex items-start gap-4 p-5 rounded-xl"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <span
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: 'rgba(249,115,22,0.15)', color: 'var(--accent)' }}
            >
              {n}
            </span>
            <p className="text-sm leading-relaxed pt-0.5" style={{ color: 'var(--fg-muted)' }}>
              {t(`introduction.step_${n}`)}
            </p>
          </div>
        ))}
      </div>

      {/* Agent System Requirements */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--fg)' }}>
        {t('introduction.specs_title')}
      </h2>
      <div
        className="rounded-xl overflow-hidden mb-16"
        style={{ border: '1px solid var(--border)' }}
      >
        {/* Header */}
        <div
          className="grid grid-cols-3 text-sm font-semibold tracking-wider"
          style={{ backgroundColor: 'var(--surface-2)' }}
        >
          <div className="p-4" style={{ color: 'var(--fg-muted)' }}>
            {t('introduction.specs_category')}
          </div>
          <div
            className="p-4 text-left"
            style={{ color: 'var(--fg-muted)', borderLeft: '1px solid var(--border)' }}
          >
            {t('introduction.specs_min')}
          </div>
          <div
            className="p-4 text-left font-bold"
            style={{ color: 'var(--accent)', borderLeft: '1px solid var(--border)', backgroundColor: 'rgba(249,115,22,0.08)' }}
          >
            {t('introduction.specs_rec')}
          </div>
        </div>

        {/* Rows */}
        {(['os', 'cpu', 'ram', 'disk', 'network'] as const).map((row, i) => (
          <div
            key={row}
            className="grid grid-cols-3"
            style={{
              backgroundColor: i % 2 === 0 ? 'var(--surface)' : 'var(--surface-2)',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div className="p-4 text-sm font-semibold" style={{ color: 'var(--fg)' }}>
              {t(`introduction.specs_${row}`)}
            </div>
            <div
              className="p-4 text-sm"
              style={{ color: 'var(--fg-muted)', borderLeft: '1px solid var(--border)' }}
            >
              {t(`introduction.specs_${row}_min`)}
            </div>
            <div
              className="p-4 text-sm"
              style={{ color: 'var(--fg-strong)', borderLeft: '1px solid var(--border)', backgroundColor: 'rgba(249,115,22,0.06)' }}
            >
              {t(`introduction.specs_${row}_rec`)}
            </div>
          </div>
        ))}
      </div>

      {/* Next Steps */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--fg)' }}>
        {t('introduction.next_title')}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div
          className="p-6 rounded-xl cursor-pointer transition-all"
          style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
          onClick={() => navigate('/resources/user-manual')}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          <div
            className="text-xs font-bold tracking-widest mb-3"
            style={{ color: 'var(--accent)' }}
          >
            MANUAL
          </div>
          <h3 className="font-semibold mb-2" style={{ color: 'var(--fg)' }}>
            {t('introduction.next_manual_title')}
          </h3>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            {t('introduction.next_manual_desc')}
          </p>
        </div>
        <div
          className="p-6 rounded-xl cursor-pointer transition-all"
          style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
          onClick={() => navigate('/resources/tech-blog')}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          <div
            className="text-xs font-bold tracking-widest mb-3"
            style={{ color: 'var(--accent)' }}
          >
            BLOG
          </div>
          <h3 className="font-semibold mb-2" style={{ color: 'var(--fg)' }}>
            {t('introduction.next_blog_title')}
          </h3>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            {t('introduction.next_blog_desc')}
          </p>
        </div>
      </div>

    </div>
  );
}
