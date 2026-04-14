import { useTranslation } from 'react-i18next';

export default function ContactUs() {
  const { t } = useTranslation();

  return (
    <div>
      <section className="py-24 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-5xl mx-auto">
          <div
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
            style={{
              backgroundColor: 'rgba(249,115,22,0.1)',
              color: '#f97316',
              border: '1px solid rgba(249,115,22,0.3)',
            }}
          >
            {t('contact.badge')}
          </div>
          <h1 className="text-4xl font-bold mb-6" style={{ color: '#f1f1f3' }}>
            {t('contact.title')}
          </h1>
          <p className="text-base leading-relaxed mb-10" style={{ color: '#9ca3af' }}>
            {t('contact.desc')}
          </p>

          <div className="space-y-6">
            {[
              { icon: '📧', label: t('contact.email'), value: 'sales@orangesys.co.kr', href: 'mailto:sales@orangesys.co.kr' },
              { icon: '🏢', label: t('contact.office'), value: t('contact.officeVal') },
              { icon: '🕐', label: t('contact.hours'),  value: t('contact.hoursVal') },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <div className="text-xs font-semibold mb-0.5" style={{ color: '#6b7280' }}>
                    {item.label}
                  </div>
                  <div className="text-sm" style={{ color: '#d1d5db' }}>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{ color: '#d1d5db' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#f97316')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#d1d5db')}
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
