import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DotPattern from '../components/DotPattern';

// Individual logo card
function LogoCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        margin: '0 10px',
        padding: '12px 24px',
        height: '96px',
        minWidth: '160px',
        borderRadius: '12px',
        backgroundColor: '#1a1a1f',
        border: '1px solid #2a2a33',
        flexShrink: 0,
        opacity: 1,
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.4)';
        const img = e.currentTarget.querySelector('img') as HTMLImageElement | null;
        if (img) img.style.filter = 'none';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#2a2a33';
        const img = e.currentTarget.querySelector('img') as HTMLImageElement | null;
        if (img) img.style.filter = 'brightness(0) invert(1) opacity(0.4)';
      }}
    >
      <img
        src={logo}
        alt={name}
        style={{
          maxHeight: '40px',
          maxWidth: '120px',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          filter: 'brightness(0) invert(1) opacity(0.4)',
          transition: 'filter 0.2s',
        }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />
      <span style={{
        color: '#6b7280',
        fontSize: '11px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        letterSpacing: '0.03em',
        lineHeight: 1,
      }}>
        {name}
      </span>
    </div>
  );
}

// 11 placeholder partner logos — replace src values with actual logo images later
const partners = [
  { name: '한일네트웍스', logo: '/images/partners/hanil_logo.png', },
  { name: '한일시멘트', logo: '/images/partners/hanil_logo.png' },
  { name: '효성ITX', logo: '/images/partners/hyosung_itx_logo.png' },
  { name: '국립순천대학교', logo: '/images/partners/sunchon_national_university_logo.png' },
  { name: '부천도시공사', logo: '/images/partners/bucheon_environment_logo.png' },
  { name: 'U BASE', logo: '/images/partners/ubase_logo.png' },
  { name: 'SUN AT FOOD', logo: '/images/partners/sun_at_food_logo.png' },
  { name: '교보생명', logo: '/images/partners/kyobo_life_logo.png' },
  { name: '현대해상', logo: '/images/partners/hyundai_fire_logo.png' },
  { name: '크라운해태', logo: '/images/partners/crown_haetae_logo.png' },
  { name: '유솔정보통신', logo: '/images/partners/yousol_logo.png' },
];

// Split into 3 rows (4 / 4 / 3) and duplicate for seamless loop
const row1 = partners.slice(0, 4);
const row2 = partners.slice(4, 8);
const row3 = partners.slice(8, 11);

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: t('home.feat1_title'),
      desc: t('home.feat1_desc'),
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: t('home.feat2_title'),
      desc: t('home.feat2_desc'),
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: t('home.feat3_title'),
      desc: t('home.feat3_desc'),
    },
  ];

  const stats = [
    { value: '99.9%', label: t('home.stats.uptime') },
    { value: '10M+', label: t('home.stats.tasks') },
    { value: '500+', label: t('home.stats.clients') },
    { value: '<50ms', label: t('home.stats.response') },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #111114 0%, #1a1020 50%, #111114 100%)',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(249,115,22,0.12) 0%, transparent 70%)',
          }}
        />
        {/* Dot pattern */}
        <DotPattern />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(249,115,22,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative w-full max-w-4xl px-4 sm:px-6 py-24 flex flex-col items-center text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
            style={{ backgroundColor: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', color: '#f97316' }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            {t('home.badge')}
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6"
            style={{ color: '#f1f1f3', lineHeight: '1.1' }}
          >
            {t('home.hero_title_1')}
            <br />
            <span style={{ color: '#f97316' }}>{t('home.hero_title_2')}</span>
            <br />
            {t('home.hero_title_3')}
          </h1>

          <p
            className="max-w-2xl mx-auto text-lg sm:text-xl mb-10"
            style={{ color: '#9ca3af', lineHeight: '1.7' }}
          >
            {t('home.hero_desc')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 rounded-full text-base font-semibold transition-all"
              style={{ backgroundColor: '#f97316', color: '#fff' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea6c0a')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
              onClick={() => navigate('/company/contact')}
            >
              {t('home.getStarted')}
            </button>
            <button
              className="px-8 py-4 rounded-full text-base font-semibold transition-all flex items-center justify-center gap-2"
              style={{ border: '1px solid #2a2a33', color: '#d1d5db', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.color = '#f97316'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2a2a33'; e.currentTarget.style.color = '#d1d5db'; }}
              onClick={() => navigate('/products/orange-the-client')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              {t('home.watchDemo')}
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ backgroundColor: '#0e0e11', borderTop: '1px solid #2a2a33', borderBottom: '1px solid #2a2a33' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#f97316' }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: '#6b7280' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#f1f1f3' }}>
              {t('home.features_title')}
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9ca3af' }}>
              {t('home.features_desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="p-8 rounded-2xl transition-all cursor-default text-center flex flex-col items-center"
                style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a33')}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316' }}
                >
                  {feat.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#f1f1f3' }}>{feat.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-24 px-4 sm:px-6" style={{ backgroundColor: '#0e0e11' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
            style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}
          >
            {t('home.showcase_badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#f1f1f3' }}>
            {t('home.showcase_title_1')}<br />
            <span style={{ color: '#f97316' }}>{t('home.showcase_title_2')}</span>
          </h2>
          <p className="text-base mb-8 leading-relaxed" style={{ color: '#9ca3af' }}>
            {t('home.showcase_desc')}
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <button
              className="px-6 py-3 rounded-full text-sm font-semibold transition-all"
              style={{ backgroundColor: '#f97316', color: '#fff' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea6c0a')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
              onClick={() => navigate('/products/orange-the-client')}
            >
              {t('home.exploreAgent')}
            </button>
            <button
              className="px-6 py-3 rounded-full text-sm font-semibold transition-all"
              style={{ border: '1px solid #2a2a33', color: '#d1d5db' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.color = '#f97316'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2a2a33'; e.currentTarget.style.color = '#d1d5db'; }}
              onClick={() => navigate('/products/manager')}
            >
              {t('home.exploreManager')}
            </button>
          </div>
          <div
            className="rounded-2xl overflow-hidden mx-auto"
            style={{ border: '1px solid #2a2a33', background: 'linear-gradient(135deg, #1a1a1f, #111114)', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="text-center p-8">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                </svg>
              </div>
              <p className="text-sm" style={{ color: '#4b5563' }}>{t('home.productDemo')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section — 3-row infinite marquee */}
      <section className="py-20" style={{ backgroundColor: '#111114', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-center text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#f1f1f3' }}>
            {t('home.partners_title')}
          </h2>
          <p className="text-center text-sm" style={{ color: '#6b7280' }}>
            {t('home.partners_desc')}
          </p>
        </div>

        {/* Fade edges */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '120px', height: '100%', zIndex: 2,
            background: 'linear-gradient(to right, #111114 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '120px', height: '100%', zIndex: 2,
            background: 'linear-gradient(to left, #111114 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />

          {/* Row 1 — scrolls left */}
          <div style={{ overflow: 'hidden', marginBottom: '16px' }}>
            <div className="marquee-left" style={{ display: 'flex', width: 'max-content' }}>
              {[...row1, ...row1, ...row1, ...row1].map((p, i) => (
                <LogoCard key={`r1-${i}`} name={p.name} logo={p.logo} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div style={{ overflow: 'hidden', marginBottom: '16px' }}>
            <div className="marquee-right" style={{ display: 'flex', width: 'max-content' }}>
              {[...row2, ...row2, ...row2, ...row2].map((p, i) => (
                <LogoCard key={`r2-${i}`} name={p.name} logo={p.logo} />
              ))}
            </div>
          </div>

          {/* Row 3 — scrolls left (slower) */}
          <div style={{ overflow: 'hidden' }}>
            <div className="marquee-left-slow" style={{ display: 'flex', width: 'max-content' }}>
              {[...row3, ...row3, ...row3, ...row3, ...row3, ...row3].map((p, i) => (
                <LogoCard key={`r3-${i}`} name={p.name} logo={p.logo} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-24 px-4 sm:px-6"
        style={{
          background: 'linear-gradient(135deg, #1a1020 0%, #111114 50%, #1a1020 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(249,115,22,0.1) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#f1f1f3' }}>
            {t('home.cta_title')}
          </h2>
          <p className="text-lg mb-10" style={{ color: '#9ca3af' }}>
            {t('home.cta_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 rounded-full text-base font-semibold transition-all"
              style={{ backgroundColor: '#f97316', color: '#fff' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea6c0a')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
              onClick={() => navigate('/company/contact')}
            >
              {t('home.contactSales')}
            </button>
            <button
              className="px-8 py-4 rounded-full text-base font-semibold transition-all"
              style={{ border: '1px solid #2a2a33', color: '#d1d5db' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.color = '#f97316'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2a2a33'; e.currentTarget.style.color = '#d1d5db'; }}
              onClick={() => navigate('/pricing')}
            >
              {t('home.viewPricing')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
