import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const faqs = [
  {
    q: 'What is the SLA for Orange The Client?',
    a: 'We guarantee 99.9% uptime with 24/7 monitoring. Any downtime beyond this threshold is credited to your account.',
  },
  {
    q: 'How do I get technical support?',
    a: 'Enterprise customers have access to a dedicated support channel with guaranteed response times. You can also submit tickets via our support portal.',
  },
  {
    q: 'Is there a sandbox environment?',
    a: 'Yes, all plans include access to a fully isolated sandbox environment for testing and development.',
  },
  {
    q: 'How are software updates handled?',
    a: 'Updates are deployed automatically with zero downtime. We use rolling deployments and always notify customers in advance of major releases.',
  },
];

export default function Support() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const cards = [
    {
      icon: '📚',
      title: t('support.docs_title'),
      desc: t('support.docs_desc'),
      action: () => navigate('/resources/introduction'),
    },
    {
      icon: '💬',
      title: t('support.contact_title'),
      desc: t('support.contact_desc'),
      action: () => navigate('/company/contact'),
    },
    {
      icon: '🎓',
      title: t('support.onboard_title'),
      desc: t('support.onboard_desc'),
      action: () => navigate('/company/contact'),
    },
  ];

  return (
    <div>
      <section className="py-24 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
            style={{
              backgroundColor: 'rgba(249,115,22,0.1)',
              color: '#f97316',
              border: '1px solid rgba(249,115,22,0.3)',
            }}
          >
            {t('support.badge')}
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#f1f1f3' }}>
            {t('support.title')}
          </h1>
          <p className="text-lg mb-16" style={{ color: '#9ca3af' }}>
            {t('support.desc')}
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {cards.map((card) => (
              <div
                key={card.title}
                className="p-6 rounded-xl cursor-pointer transition-all"
                style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
                onClick={card.action}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a33')}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-semibold mb-2" style={{ color: '#f1f1f3' }}>
                  {card.title}
                </h3>
                <p className="text-sm" style={{ color: '#9ca3af' }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-8" style={{ color: '#f1f1f3' }}>
            {t('support.faq')}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-xl"
                style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
              >
                <h3 className="font-semibold mb-2" style={{ color: '#f1f1f3' }}>
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
