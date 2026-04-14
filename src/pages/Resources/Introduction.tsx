import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Introduction() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const components = [
    { key: 'agent',   icon: '🖥️' },
    { key: 'kernel',  icon: '⚙️' },
    { key: 'manager', icon: '🗄️' },
    { key: 'console', icon: '📊' },
  ];

  const concepts = [
    { key: '1', icon: '⚡' },
    { key: '2', icon: '🔒' },
    { key: '3', icon: '🔑' },
  ];

  const steps = [1, 2, 3, 4];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">

      {/* Hero */}
      <div
        className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
        style={{
          backgroundColor: 'rgba(249,115,22,0.1)',
          color: '#f97316',
          border: '1px solid rgba(249,115,22,0.3)',
        }}
      >
        {t('introduction.badge')}
      </div>
      <h1 className="text-4xl font-bold mb-6" style={{ color: '#f1f1f3' }}>
        {t('introduction.title')}
      </h1>
      <p className="text-lg mb-16" style={{ color: '#9ca3af', lineHeight: '1.8' }}>
        {t('introduction.desc')}
      </p>

      {/* System Components */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#f1f1f3' }}>
        {t('introduction.components_title')}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-16">
        {components.map(({ key, icon }) => (
          <div
            key={key}
            className="p-6 rounded-xl"
            style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{icon}</span>
              <h3 className="font-bold text-lg" style={{ color: '#f97316' }}>
                {t(`introduction.component_${key}_title`)}
              </h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
              {t(`introduction.component_${key}_desc`)}
            </p>
          </div>
        ))}
      </div>

      {/* Core Concepts */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#f1f1f3' }}>
        {t('introduction.concepts_title')}
      </h2>
      <div className="space-y-4 mb-16">
        {concepts.map(({ key, icon }) => (
          <div
            key={key}
            className="p-6 rounded-xl flex gap-4"
            style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
          >
            <span className="text-xl mt-0.5 shrink-0">{icon}</span>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: '#f1f1f3' }}>
                {t(`introduction.concept_${key}_title`)}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                {t(`introduction.concept_${key}_desc`)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Start */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#f1f1f3' }}>
        {t('introduction.quickstart_title')}
      </h2>
      <div className="space-y-3 mb-16">
        {steps.map((n) => (
          <div
            key={n}
            className="flex items-start gap-4 p-5 rounded-xl"
            style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
          >
            <span
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: 'rgba(249,115,22,0.15)', color: '#f97316' }}
            >
              {n}
            </span>
            <p className="text-sm leading-relaxed pt-0.5" style={{ color: '#9ca3af' }}>
              {t(`introduction.step_${n}`)}
            </p>
          </div>
        ))}
      </div>

      {/* Agent System Requirements */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#f1f1f3' }}>
        {t('introduction.specs_title')}
      </h2>
      <div
        className="rounded-xl overflow-hidden mb-16"
        style={{ border: '1px solid #2a2a33' }}
      >
        {/* Header */}
        <div
          className="grid grid-cols-3 text-sm font-semibold tracking-wider"
          style={{ backgroundColor: '#16161a' }}
        >
          <div className="p-4" style={{ color: '#9ca3af' }}>
            {t('introduction.specs_category')}
          </div>
          <div
            className="p-4 text-left"
            style={{ color: '#9ca3af', borderLeft: '1px solid #2a2a33' }}
          >
            {t('introduction.specs_min')}
          </div>
          <div
            className="p-4 text-left font-bold"
            style={{ color: '#f97316', borderLeft: '1px solid #2a2a33', backgroundColor: 'rgba(249,115,22,0.08)' }}
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
              backgroundColor: i % 2 === 0 ? '#1a1a1f' : '#16161a',
              borderTop: '1px solid #2a2a33',
            }}
          >
            <div className="p-4 text-sm font-semibold" style={{ color: '#f1f1f3' }}>
              {t(`introduction.specs_${row}`)}
            </div>
            <div
              className="p-4 text-sm"
              style={{ color: '#9ca3af', borderLeft: '1px solid #2a2a33' }}
            >
              {t(`introduction.specs_${row}_min`)}
            </div>
            <div
              className="p-4 text-sm"
              style={{ color: '#d1d5db', borderLeft: '1px solid #2a2a33', backgroundColor: 'rgba(249,115,22,0.06)' }}
            >
              {t(`introduction.specs_${row}_rec`)}
            </div>
          </div>
        ))}
      </div>

      {/* Next Steps */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#f1f1f3' }}>
        {t('introduction.next_title')}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div
          className="p-6 rounded-xl cursor-pointer transition-all"
          style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
          onClick={() => navigate('/resources/user-manual')}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a33')}
        >
          <div className="text-2xl mb-3">📖</div>
          <h3 className="font-semibold mb-2" style={{ color: '#f1f1f3' }}>
            {t('introduction.next_manual_title')}
          </h3>
          <p className="text-sm" style={{ color: '#9ca3af' }}>
            {t('introduction.next_manual_desc')}
          </p>
        </div>
        <div
          className="p-6 rounded-xl cursor-pointer transition-all"
          style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
          onClick={() => navigate('/resources/tech-blog')}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a33')}
        >
          <div className="text-2xl mb-3">✍️</div>
          <h3 className="font-semibold mb-2" style={{ color: '#f1f1f3' }}>
            {t('introduction.next_blog_title')}
          </h3>
          <p className="text-sm" style={{ color: '#9ca3af' }}>
            {t('introduction.next_blog_desc')}
          </p>
        </div>
      </div>

    </div>
  );
}
