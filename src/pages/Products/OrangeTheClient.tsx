import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function OrangeTheClient() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    { icon: '🤖', title: t('manager.feat1_title'), desc: t('manager.feat1_desc') },
    { icon: '📊', title: t('manager.feat2_title'), desc: t('manager.feat2_desc') },
    { icon: '🔗', title: t('manager.feat3_title'), desc: t('manager.feat3_desc') },
    { icon: '⚡', title: t('manager.feat4_title'), desc: t('manager.feat4_desc') },
    { icon: '🛡️', title: t('manager.feat5_title'), desc: t('manager.feat5_desc') },
    { icon: '📈', title: t('manager.feat6_title'), desc: t('manager.feat6_desc') },
  ];

  return (
    <div>
      {/* Hero */}
      <section
        className="py-24 px-4 sm:px-6"
        style={{ background: 'linear-gradient(135deg, #111114 0%, #1a1020 100%)', position: 'relative', overflow: 'hidden' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 30%, rgba(249,115,22,0.1) 0%, transparent 70%)' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider" style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}>
            {t('solution.solutions')}
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-6" style={{ color: '#f1f1f3' }}>
            {t('solution.orange-the-client')}<br />
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: '#9ca3af', lineHeight: '1.7' }}>
            {t('manager.desc')}
          </p>
          <button
            className="px-8 py-4 rounded-full text-base font-semibold transition-all"
            style={{ backgroundColor: '#f97316', color: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea6c0a')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
            onClick={() => navigate('/company/contact')}
          >
            {t('manager.requestDemo')}
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#0e0e11' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12" style={{ color: '#f1f1f3' }}>{t('manager.features')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => (
              <div key={feat.title} className="p-6 rounded-xl flex gap-4" style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}>
                <span className="text-2xl">{feat.icon}</span>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#f1f1f3' }}>{feat.title}</h3>
                  <p className="text-sm" style={{ color: '#9ca3af' }}>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 text-center" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#f1f1f3' }}>{t('manager.cta_title')}</h2>
          <p className="mb-8" style={{ color: '#9ca3af' }}>{t('manager.cta_desc')}</p>
          <button
            className="px-6 py-3 rounded-full font-semibold transition-all"
            style={{ backgroundColor: '#f97316', color: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea6c0a')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
            onClick={() => navigate('/company/contact')}
          >
            {t('manager.contactSales')}
          </button>
        </div>
      </section>
    </div>
  );
}
