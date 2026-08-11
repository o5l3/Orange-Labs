import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Support() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const faqs = [1, 2, 3, 4, 5, 6].map((n) => ({
    q: t(`support.faq_${n}_q`),
    a: t(`support.faq_${n}_a`),
  }));

  const cards = [
    {
      num: '01',
      title: t('support.docs_title'),
      desc: t('support.docs_desc'),
      action: () => navigate('/resources/user-manual'),
    },
    {
      num: '02',
      title: t('support.contact_title'),
      desc: t('support.contact_desc'),
      action: () => navigate('/company/contact'),
    },
    {
      num: '03',
      title: t('support.onboard_title'),
      desc: t('support.onboard_desc'),
      action: () => navigate('/company/contact'),
    },
  ];

  return (
    <div>
      <section className="py-24 px-4 sm:px-6" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
            style={{
              backgroundColor: 'rgba(249,115,22,0.1)',
              color: 'var(--accent)',
              border: '1px solid rgba(249,115,22,0.3)',
            }}
          >
            {t('support.badge')}
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
            {t('support.title')}
          </h1>
          <p className="text-lg mb-16" style={{ color: 'var(--fg-muted)' }}>
            {t('support.desc')}
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {cards.map((card) => (
              <div
                key={card.title}
                className="p-6 rounded-xl cursor-pointer transition-all"
                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
                onClick={card.action}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div
                  className="text-2xl font-bold mb-3 tracking-tight"
                  style={{ color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {card.num}
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--fg)' }}>
                  {card.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--fg)' }}>
            {t('support.faq')}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-xl overflow-hidden relative"
                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <span
                  className="absolute -top-6 -left-2 text-9xl font-black leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(249,115,22,0.08)' }}
                >
                  Q
                </span>
                <div className="relative">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--fg)' }}>
                    {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
