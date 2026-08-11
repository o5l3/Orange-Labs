import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Pricing() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const plans = [
    {
      name: t('pricing.plan1_name'),
      subtitle: t('pricing.plan1_sub'),
      price: t('pricing.plan1_price'),
      priceNote: t('pricing.plan1_note'),
      features: [
        'Up to 3 Agents',
        '1,000 tasks / month',
        'Basic Manager dashboard',
        'Community support',
        'REST API access',
      ],
      cta: t('pricing.cta_get'),
      highlight: false,
    },
    {
      name: t('pricing.plan2_name'),
      subtitle: t('pricing.plan2_sub'),
      price: t('pricing.plan2_price'),
      priceNote: t('pricing.plan2_note'),
      features: [
        'Up to 10 Agents',
        '100,000 tasks / month',
        'Advanced Manager dashboard',
        'Priority email support',
        'Workflow Builder',
        'Custom integrations',
        'SSO / SAML',
      ],
      cta: t('pricing.cta_trial'),
      highlight: true,
    },
    {
      name: t('pricing.plan3_name'),
      subtitle: t('pricing.plan3_sub'),
      price: t('pricing.plan3_price'),
      priceNote: t('pricing.plan3_note'),
      features: [
        'Up to 100 Agents',
        '1M tasks / month',
        'Full Manager suite',
        'Dedicated account manager',
        'SLA: 99.9% uptime',
        'Advanced analytics',
        'On-prem deployment option',
      ],
      cta: t('pricing.cta_sales'),
      highlight: false,
    },
    {
      name: t('pricing.plan4_name'),
      subtitle: t('pricing.plan4_sub'),
      price: t('pricing.plan4_price'),
      priceNote: t('pricing.plan4_note'),
      features: [
        'Unlimited Agents',
        'Unlimited tasks',
        'White-glove onboarding',
        '24/7 dedicated support',
        'Custom SLA',
        'Private cloud deployment',
        'Custom compliance & audit',
      ],
      cta: t('pricing.cta_sales'),
      highlight: false,
    },
  ];

  return (
    <div>
      <section className="py-24 px-4 sm:px-6" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
              style={{
                backgroundColor: 'rgba(249,115,22,0.1)',
                color: 'var(--accent)',
                border: '1px solid rgba(249,115,22,0.3)',
              }}
            >
              {t('pricing.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
              {t('pricing.title')}
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--fg-muted)' }}>
              {t('pricing.desc')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="p-8 rounded-2xl flex flex-col relative"
                style={{
                  backgroundColor: plan.highlight ? 'var(--surface)' : 'var(--surface)',
                  border: plan.highlight ? '1px solid rgba(249,115,22,0.5)' : '1px solid var(--border)',
                }}
              >
                {plan.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
                  >
                    {t('pricing.popular')}
                  </div>
                )}
                <div className="mb-6">
                  <div
                    className="text-xs font-semibold tracking-wider mb-1"
                    style={{ color: 'var(--accent)' }}
                  >
                    {plan.subtitle.toUpperCase()}
                  </div>
                  <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
                    {plan.name}
                  </h2>
                  <div className="text-4xl font-bold mb-1" style={{ color: 'var(--fg)' }}>
                    {plan.price}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--fg-dim)' }}>
                    {plan.priceNote}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: 'var(--fg-strong)' }}
                    >
                      <svg
                        className="mt-0.5 flex-shrink-0"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="2.5"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-3 rounded-full font-semibold text-sm transition-all"
                  style={
                    plan.highlight
                      ? { backgroundColor: 'var(--accent)', color: '#fff' }
                      : { border: '1px solid var(--border)', color: 'var(--fg-strong)' }
                  }
                  onMouseEnter={(e) => {
                    if (plan.highlight) {
                      e.currentTarget.style.backgroundColor = 'var(--accent-strong)';
                    } else {
                      e.currentTarget.style.borderColor = 'var(--accent)';
                      e.currentTarget.style.color = 'var(--accent)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.highlight) {
                      e.currentTarget.style.backgroundColor = 'var(--accent)';
                    } else {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = 'var(--fg-strong)';
                    }
                  }}
                  onClick={() => navigate('/company/contact')}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          {/* FAQ note */}
          <p className="text-center mt-12 text-sm" style={{ color: 'var(--fg-dim)' }}>
            {t('pricing.note')}{' '}
            <span
              className="cursor-pointer transition-colors"
              style={{ color: 'var(--accent)' }}
              onClick={() => navigate('/company/contact')}
            >
              {t('pricing.custom')}
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
