import { useTranslation } from 'react-i18next';

const partners = [
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', category: 'Technology' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg', category: 'Technology' },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', category: 'Cloud' },
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg', category: 'Technology' },
  { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg', category: 'Enterprise' },
  { name: 'Salesforce', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg', category: 'CRM' },
  { name: 'Oracle', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg', category: 'Enterprise' },
  { name: 'SAP', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg', category: 'Enterprise' },
];

export default function Partners() {
  const { t } = useTranslation();

  return (
    <div>
      <section
        className="py-24 px-4 sm:px-6"
        style={{ background: 'linear-gradient(135deg, #111114 0%, #1a1020 100%)', position: 'relative', overflow: 'hidden' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 30%, rgba(249,115,22,0.08) 0%, transparent 70%)' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider" style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}>
            {t('partners.badge')}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#f1f1f3' }}>{t('partners.title')}</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9ca3af', lineHeight: '1.7' }}>
            {t('partners.desc')}
          </p>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center" style={{ color: '#f1f1f3' }}>{t('partners.ourPartners')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="p-8 rounded-xl flex flex-col items-center justify-center gap-4 transition-all"
                style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33', aspectRatio: '3/2' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a33')}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
                  style={{ maxWidth: '100%' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                    if (sibling) sibling.style.display = 'block';
                  }}
                />
                <span className="hidden text-sm font-semibold" style={{ color: '#9ca3af' }}>{partner.name}</span>
                <span className="text-xs" style={{ color: '#4b5563' }}>{partner.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-20 px-4 sm:px-6 text-center" style={{ backgroundColor: '#0e0e11' }}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#f1f1f3' }}>{t('partners.become_title')}</h2>
          <p className="mb-8" style={{ color: '#9ca3af' }}>
            {t('partners.become_desc')}
          </p>
          <button
            className="px-6 py-3 rounded-full font-semibold transition-all"
            style={{ backgroundColor: '#f97316', color: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea6c0a')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
          >
            {t('partners.become_cta')}
          </button>
        </div>
      </section>
    </div>
  );
}
