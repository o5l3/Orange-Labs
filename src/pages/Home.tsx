import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CircuitBackground from '../components/CircuitBackground';

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
        padding: '16px 20px',
        height: '104px',
        borderRadius: '12px',
        backgroundColor: 'var(--partner-card-bg)',
        border: '1px solid var(--partner-card-border)',
        transition: 'border-color 0.2s, background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.5)';
        (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--partner-card-bg-hover)';
        const img = e.currentTarget.querySelector('img') as HTMLImageElement | null;
        if (img) img.style.filter = 'none';
        const label = e.currentTarget.querySelector('span') as HTMLElement | null;
        if (label) label.style.color = 'var(--partner-card-label-hover)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--partner-card-border)';
        (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--partner-card-bg)';
        const img = e.currentTarget.querySelector('img') as HTMLImageElement | null;
        if (img) img.style.filter = 'var(--partner-logo-filter)';
        const label = e.currentTarget.querySelector('span') as HTMLElement | null;
        if (label) label.style.color = 'var(--partner-card-label)';
      }}
    >
      <img
        src={logo}
        alt={name}
        style={{
          maxHeight: '40px',
          maxWidth: '140px',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          filter: 'var(--partner-logo-filter)',
          transition: 'filter 0.2s',
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
      <span
        style={{
          color: 'var(--partner-card-label)',
          fontSize: '11px',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          letterSpacing: '0.03em',
          lineHeight: 1,
          transition: 'color 0.2s',
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

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
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
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
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
            d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
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
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      ),
      title: t('home.kf4_title'),
      desc: t('home.kf4_desc'),
    },
  ];

  const axisColors = [
    { short: '성능', main: '#60a5fa', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.35)' },
    { short: '증상', main: '#f87171', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)' },
    { short: '1:1', main: '#c084fc', bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.35)' },
    { short: '1:N', main: '#4ade80', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.35)' },
  ];

  const usecases = [
    { key: 1, axes: [0, 1, 3] },
    { key: 2, axes: [0, 1, 3] },
    { key: 3, axes: [1, 2] },
    { key: 4, axes: [3] },
    { key: 5, axes: [2] },
    { key: 6, axes: [3] },
    { key: 7, axes: [3] },
    { key: 8, axes: [1, 3] },
    { key: 9, axes: [1, 3] },
    { key: 10, axes: [3] },
    { key: 11, axes: [3] },
    { key: 12, axes: [] },
  ];

  // Scroll reveal
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSpotlightMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

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
        {/* Circuit background */}
        <CircuitBackground />

        <div className="relative w-full max-w-4xl px-4 sm:px-6 py-24 flex flex-col items-center text-center">
          <h1
            className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6"
            style={{
              background: 'linear-gradient(135deg, #fb923c 0%, #f97316 55%, #ea6c0a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1.1',
              filter: 'drop-shadow(0 0 30px rgba(249,115,22,0.15))',
            }}
          >
            {t('home.hero_title')}
          </h1>

          <p
            className="max-w-2xl mx-auto text-2xl sm:text-3xl mb-10 font-bold"
            style={{ color: '#f1f1f3', lineHeight: '1.4' }}
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

      {/* Key Features Section — 4축 다이어그램 */}
      <section
        className="py-24 px-4 sm:px-6"
        style={{
          background:
            'linear-gradient(to bottom, #111114 0%, #111114 85%, #0e0e11 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto reveal">
          {/* 상단 라벨: 관찰·수집 */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div style={{ flex: 1, height: 1, backgroundColor: '#2a2a33', maxWidth: 160 }} />
            <span
              className="text-xs font-semibold tracking-widest"
              style={{ color: '#6b7280' }}
            >
              {t('home.kf_label_observe')}
            </span>
            <div style={{ flex: 1, height: 1, backgroundColor: '#2a2a33', maxWidth: 160 }} />
          </div>

          {/* 2×2 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {keyFeatures.map((f, i) => {
              const axis = axisColors[i];
              return (
                <div
                  key={f.title}
                  className="relative p-8 rounded-2xl transition-all duration-300 overflow-hidden spotlight"
                  style={{
                    background: `linear-gradient(135deg, ${axis.bg} 0%, #16161b 55%)`,
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseMove={handleSpotlightMove}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = axis.border;
                    e.currentTarget.style.boxShadow = `0 12px 40px -12px ${axis.main}55`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* 축 번호 워터마크 */}
                  <div
                    className="absolute top-5 right-6 text-6xl font-black pointer-events-none select-none"
                    style={{
                      color: axis.main,
                      opacity: 0.08,
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="relative flex gap-5">
                    <div
                      className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${axis.bg} 0%, rgba(0,0,0,0.2) 100%)`,
                        color: axis.main,
                        boxShadow: `inset 0 0 0 1px ${axis.border}`,
                      }}
                    >
                      {f.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-xs font-bold mb-2"
                        style={{
                          color: axis.main,
                          letterSpacing: '0.18em',
                        }}
                      >
                        {axis.short}
                      </div>
                      <h3
                        className="text-lg font-bold mb-2"
                        style={{ color: '#f1f1f3', letterSpacing: '-0.01em' }}
                      >
                        {f.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: '#9ca3af' }}
                      >
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 하단 라벨: 조치·실행 */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div style={{ flex: 1, height: 1, backgroundColor: '#2a2a33', maxWidth: 160 }} />
            <span
              className="text-xs font-semibold tracking-widest"
              style={{ color: '#6b7280' }}
            >
              {t('home.kf_label_act')}
            </span>
            <div style={{ flex: 1, height: 1, backgroundColor: '#2a2a33', maxWidth: 160 }} />
          </div>

        </div>
      </section>

      {/* Usecases Section — 활용 사례 */}
      <section
        className="py-24 px-4 sm:px-6"
        style={{
          background:
            'linear-gradient(to bottom, #0e0e11 0%, #0e0e11 85%, #111114 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto reveal">
          <div className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: '#f1f1f3' }}
            >
              {t('home.usecase_title')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {usecases.map((u) => (
              <div
                key={u.key}
                className="p-6 rounded-xl flex flex-col gap-4 transition-all spotlight"
                style={{
                  backgroundColor: '#1a1a1f',
                  border: '1px solid #2a2a33',
                }}
                onMouseMove={handleSpotlightMove}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')
                }
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a33')}
              >
                <div className="flex-1">
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ color: '#f1f1f3' }}
                  >
                    {t(`home.usecase_${u.key}_title`)}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                    {t(`home.usecase_${u.key}_desc`)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {u.axes.map((idx) => {
                    const axis = axisColors[idx];
                    return (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          color: axis.main,
                          backgroundColor: axis.bg,
                          border: `1px solid ${axis.border}`,
                        }}
                      >
                        {axis.short}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
            <button
              className="px-8 py-3.5 rounded-full text-sm font-semibold transition-all btn-with-arrow"
              style={{ border: '1px solid #2a2a33', color: '#d1d5db' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#f97316';
                e.currentTarget.style.color = '#f97316';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2a2a33';
                e.currentTarget.style.color = '#d1d5db';
              }}
              onClick={() => navigate('/products/orange-the-client')}
            >
              {t('home.kf_cta')}
              <span className="btn-arrow">→</span>
            </button>
            <a
              href="/pdf/OrangeTheClient_Product_Introduction.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full text-sm font-semibold transition-all flex items-center justify-center btn-with-arrow"
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
              <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Partners Section — 정적 그리드 */}
      <section
        className="py-20 px-4 sm:px-6"
        style={{
          background:
            'linear-gradient(to bottom, #111114 0%, #111114 85%, #0e0e11 100%)',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/company/partners')}
      >
        <div className="max-w-6xl mx-auto reveal">
          <h2
            className="text-center text-2xl sm:text-3xl font-bold mb-12"
            style={{ color: '#f1f1f3' }}
          >
            {t('home.partners_title')}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {partners.map((p) => (
              <LogoCard key={p.name} name={p.name} logo={p.logo} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
