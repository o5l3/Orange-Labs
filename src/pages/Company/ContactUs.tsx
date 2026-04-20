import { useTranslation } from 'react-i18next';

export default function ContactUs() {
  const { t } = useTranslation();

  return (
    <div>
      <section className="py-24 px-4 sm:px-6" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto">
          <div
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
            style={{
              backgroundColor: 'rgba(249,115,22,0.1)',
              color: 'var(--accent)',
              border: '1px solid rgba(249,115,22,0.3)',
            }}
          >
            {t('contact.badge')}
          </div>
          <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--fg)' }}>
            {t('contact.title')}
          </h1>
          <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--fg-muted)' }}>
            {t('contact.desc')}
          </p>

          <div className="space-y-6">
            {[
              { num: '01', label: t('contact.email'), value: 'sales@orangesys.co.kr', href: 'mailto:sales@orangesys.co.kr' },
              { num: '02', label: t('contact.office'), value: t('contact.officeVal') },
              { num: '03', label: t('contact.hours'),  value: t('contact.hoursVal') },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span
                  className="text-xs font-bold tracking-widest pt-1 shrink-0"
                  style={{ color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {item.num}
                </span>
                <div>
                  <div className="text-xs font-semibold mb-0.5" style={{ color: 'var(--fg-dim)' }}>
                    {item.label}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--fg-strong)' }}>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{ color: 'var(--fg-strong)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-strong)')}
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
