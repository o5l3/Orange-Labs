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
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
      <span
        style={{
          color: '#6b7280',
          fontSize: '11px',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          letterSpacing: '0.03em',
          lineHeight: 1,
        }}
      >
        {name}
      </span>
    </div>
  );
}

// 11 placeholder partner logos — replace src values with actual logo images later
const partners = [
  { name: '한일네트웍스', logo: '/images/partners/hanil_logo.png' },
  { name: '한일시멘트', logo: '/images/partners/hanil_logo.png' },
  { name: '효성ITX', logo: '/images/partners/hyosung_itx_logo.png' },
  {
    name: '국립순천대학교',
    logo: '/images/partners/sunchon_national_university_logo.png',
  },
  {
    name: '부천도시공사',
    logo: '/images/partners/bucheon_environment_logo.png',
  },
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

  const stats = [
    { value: '2023', label: t('home.stats.founded') },
    { value: t('home.stats.gsValue'), label: t('home.stats.gs') },
    { value: 'TIPS', label: t('home.stats.tips') },
    { value: '4', label: t('home.stats.group') },
  ];

  const pillars = [
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      ),
      title: t('home.p1_title'),
      sub: t('home.p1_sub'),
      desc: t('home.p1_desc'),
    },
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: t('home.p2_title'),
      sub: t('home.p2_sub'),
      desc: t('home.p2_desc'),
    },
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75l2.25 2.25 4.5-4.5m0 0a9 9 0 11-12.728 0 9 9 0 0112.728 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3 3" />
        </svg>
      ),
      title: t('home.p3_title'),
      sub: t('home.p3_sub'),
      desc: t('home.p3_desc'),
    },
  ];

  const keyFeatures = [
    {
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      ),
      title: t('home.kf1_title'),
      desc: t('home.kf1_desc'),
    },
    {
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
      ),
      title: t('home.kf2_title'),
      desc: t('home.kf2_desc'),
    },
    {
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      ),
      title: t('home.kf3_title'),
      desc: t('home.kf3_desc'),
    },
    {
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: t('home.kf4_title'),
      desc: t('home.kf4_desc'),
    },
    {
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
      title: t('home.kf5_title'),
      desc: t('home.kf5_desc'),
    },
    {
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
          />
        </svg>
      ),
      title: t('home.kf6_title'),
      desc: t('home.kf6_desc'),
    },
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
            background:
              'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(249,115,22,0.12) 0%, transparent 70%)',
          }}
        />
        {/* Dot pattern */}
        <DotPattern />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(249,115,22,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative w-full max-w-4xl px-4 sm:px-6 py-24 flex flex-col items-center text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
            style={{
              backgroundColor: 'rgba(249,115,22,0.1)',
              border: '1px solid rgba(249,115,22,0.3)',
              color: '#f97316',
            }}
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
              className="px-8 py-4 rounded-full text-base font-semibold transition-all flex items-center justify-center gap-2"
              style={{
                border: '1px solid #2a2a33',
                color: '#d1d5db',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#f97316';
                e.currentTarget.style.color = '#f97316';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2a2a33';
                e.currentTarget.style.color = '#d1d5db';
              }}
              onClick={() => navigate('/resources/demo-videos')}
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
      <section
        style={{
          backgroundColor: '#0e0e11',
          borderTop: '1px solid #2a2a33',
          borderBottom: '1px solid #2a2a33',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#f97316' }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: '#6b7280' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Background Section */}
      <section className="py-24 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left: stat highlight */}
            <div className="flex-shrink-0 text-center lg:text-left">
              <div
                className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
                style={{
                  backgroundColor: 'rgba(249,115,22,0.1)',
                  color: '#f97316',
                  border: '1px solid rgba(249,115,22,0.3)',
                }}
              >
                {t('home.problem_badge')}
              </div>
              <div
                className="text-6xl sm:text-7xl font-bold mb-2"
                style={{ color: '#f97316', lineHeight: 1 }}
              >
                {t('home.problem_stat')}
              </div>
              <div className="text-sm mb-2" style={{ color: '#6b7280' }}>
                {t('home.problem_stat_label')}
              </div>
            </div>
            {/* Right: description */}
            <div>
              <h2
                className="text-2xl sm:text-3xl font-bold mb-5"
                style={{ color: '#f1f1f3', lineHeight: '1.35' }}
              >
                {t('home.problem_title')}
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#9ca3af' }}>
                {t('home.problem_desc')}
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#9ca3af' }}>
                {t('home.problem_p2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars Section */}
      <section className="py-24 px-4 sm:px-6" style={{ backgroundColor: '#0e0e11' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-wider"
              style={{
                backgroundColor: 'rgba(249,115,22,0.1)',
                color: '#f97316',
                border: '1px solid rgba(249,115,22,0.3)',
              }}
            >
              {t('home.pillars_badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#f1f1f3' }}>
              {t('home.pillars_title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="p-8 rounded-2xl transition-all cursor-default flex flex-col items-center text-center"
                style={{
                  backgroundColor: '#1a1a1f',
                  border: '1px solid #2a2a33',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a33')}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: 'rgba(249,115,22,0.1)',
                    color: '#f97316',
                  }}
                >
                  {p.icon}
                </div>
                <div
                  className="text-xs font-semibold tracking-widest mb-1"
                  style={{ color: '#f97316' }}
                >
                  {p.sub}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#f1f1f3' }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-24 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-wider"
              style={{
                backgroundColor: 'rgba(249,115,22,0.1)',
                color: '#f97316',
                border: '1px solid rgba(249,115,22,0.3)',
              }}
            >
              {t('home.kf_badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#f1f1f3' }}>
              {t('home.kf_title')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {keyFeatures.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl transition-all cursor-default flex gap-4"
                style={{
                  backgroundColor: '#1a1a1f',
                  border: '1px solid #2a2a33',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a33')}
              >
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{
                    backgroundColor: 'rgba(249,115,22,0.1)',
                    color: '#f97316',
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1.5" style={{ color: '#f1f1f3' }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              className="px-8 py-3.5 rounded-full text-sm font-semibold transition-all"
              style={{ backgroundColor: '#f97316', color: '#fff' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea6c0a')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
              onClick={() => navigate('/products/orange-the-client')}
            >
              {t('home.kf_cta')}
            </button>
          </div>
        </div>
      </section>

      {/* Partners Section — 3-row infinite marquee */}
      <section
        className="py-20"
        style={{
          backgroundColor: '#111114',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/company/partners')}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
          <h2
            className="text-center text-2xl sm:text-3xl font-bold mb-3"
            style={{ color: '#f1f1f3' }}
          >
            {t('home.partners_title')}
          </h2>
          <p className="text-center text-sm" style={{ color: '#6b7280' }}>
            {t('home.partners_desc')}
          </p>
        </div>

        {/* Fade edges */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '120px',
              height: '100%',
              zIndex: 2,
              background: 'linear-gradient(to right, #111114 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '120px',
              height: '100%',
              zIndex: 2,
              background: 'linear-gradient(to left, #111114 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

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
            background:
              'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(249,115,22,0.1) 0%, transparent 70%)',
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
            {/*<button*/}
            {/*  className="px-8 py-4 rounded-full text-base font-semibold transition-all"*/}
            {/*  style={{ backgroundColor: '#f97316', color: '#fff' }}*/}
            {/*  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea6c0a')}*/}
            {/*  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}*/}
            {/*  onClick={() => navigate('/company/contact')}*/}
            {/*>*/}
            {/*  {t('home.contactSales')}*/}
            {/*</button>*/}
            <a
              href="/pdf/OrangeTheClient_Product_Introduction.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-base font-semibold transition-all"
              style={{ border: '1px solid #2a2a33', color: '#d1d5db' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#f97316';
                (e.currentTarget as HTMLAnchorElement).style.color = '#f97316';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#2a2a33';
                (e.currentTarget as HTMLAnchorElement).style.color = '#d1d5db';
              }}
            >
              {t('home.viewPricing')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
