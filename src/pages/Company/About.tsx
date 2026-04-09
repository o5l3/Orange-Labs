import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function About() {
  const { t } = useTranslation();

  const stats = [
    { value: '2023', label: t('about.stat_founded') },
    { value: t('about.stat_gs_value'), label: t('about.stat_gs') },
    { value: 'TIPS', label: t('about.stat_tips') },
    { value: '4', label: t('about.stat_group') },
  ];

  const groupCompanies = [
    {
      nameKey: 'about.group_c2_name',
      yearKey: 'about.group_c2_year',
      roleKey: 'about.group_c2_role',
      descKey: 'about.group_c2_desc',
      isMain: true,
      color: '#f97316',
    },
    {
      nameKey: 'about.group_c1_name',
      yearKey: 'about.group_c1_year',
      roleKey: 'about.group_c1_role',
      descKey: 'about.group_c1_desc',
      isMain: false,
      color: '#6366f1',
    },
    {
      nameKey: 'about.group_c3_name',
      yearKey: 'about.group_c3_year',
      roleKey: 'about.group_c3_role',
      descKey: 'about.group_c3_desc',
      isMain: false,
      color: '#0ea5e9',
    },
    {
      nameKey: 'about.group_c4_name',
      yearKey: 'about.group_c4_year',
      roleKey: 'about.group_c4_role',
      descKey: 'about.group_c4_desc',
      isMain: false,
      color: '#10b981',
    },
  ];

  const capabilities = [
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
          />
        </svg>
      ),
      title: t('about.cap1_title'),
      desc: t('about.cap1_desc'),
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: t('about.cap2_title'),
      desc: t('about.cap2_desc'),
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
      title: t('about.cap3_title'),
      desc: t('about.cap3_desc'),
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
      title: t('about.cap4_title'),
      desc: t('about.cap4_desc'),
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: t('about.cap5_title'),
      desc: t('about.cap5_desc'),
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: t('about.cap6_title'),
      desc: t('about.cap6_desc'),
    },
  ];

  const archLayers = [
    { num: '01', label: 'Hardware', desc: t('about.arch1_desc'), color: '#374151' },
    { num: '02', label: 'Kernel Driver', desc: t('about.arch2_desc'), color: '#1e3a5f' },
    { num: '03', label: 'Agent', desc: t('about.arch3_desc'), color: '#7c2d12' },
    { num: '04', label: 'Manager / Console', desc: t('about.arch4_desc'), color: '#9a3412' },
  ];

  const valueProps = [
    { icon: '⚡', title: t('about.vp1_title'), desc: t('about.vp1_desc') },
    { icon: '🚀', title: t('about.vp2_title'), desc: t('about.vp2_desc') },
    { icon: '🛡️', title: t('about.vp3_title'), desc: t('about.vp3_desc') },
  ];

  const timeline = [
    { date: '2023.11', title: t('about.tl1_title'), desc: t('about.tl1_desc') },
    { date: '2024.04', title: t('about.tl2_title'), desc: t('about.tl2_desc') },
    { date: '2024.05', title: t('about.tl3_title'), desc: t('about.tl3_desc') },
    { date: '2024.08', title: t('about.tl4_title'), desc: t('about.tl4_desc') },
    { date: '2024.12', title: t('about.tl5_title'), desc: t('about.tl5_desc') },
    { date: '2025.02', title: t('about.tl6_title'), desc: t('about.tl6_desc') },
    { date: '2025.03', title: t('about.tl7_title'), desc: t('about.tl7_desc') },
    { date: '2025.07', title: t('about.tl8_title'), desc: t('about.tl8_desc') },
    { date: '2025.09', title: t('about.tl9_title'), desc: t('about.tl9_desc') },
    { date: '2025.10', title: t('about.tl10_title'), desc: t('about.tl10_desc') },
    { date: '2025.12', title: t('about.tl11_title'), desc: t('about.tl11_desc') },
    { date: '2026.01', title: t('about.tl12_title'), desc: t('about.tl12_desc') },
  ];


  return (
    <div style={{ backgroundColor: '#111114', color: '#f1f1f3' }}>
      {/* ── Hero ── */}
      <section
        className="relative py-32 px-4 sm:px-6 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #111114 0%, #17101a 60%, #111114 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              width: 500,
              height: 500,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '5%',
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)',
            }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-8 tracking-wider"
            style={{
              backgroundColor: 'rgba(249,115,22,0.12)',
              color: '#f97316',
              border: '1px solid rgba(249,115,22,0.3)',
            }}
          >
            {t('about.badge')}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t('about.hero_title_1')}
            <br />
            <span style={{ color: '#f97316' }}>{t('about.hero_title_2')}</span>
            <br />
            {t('about.hero_title_3')}
          </h1>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: '#9ca3af' }}
          >
            {t('about.hero_desc')}
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        style={{
          borderTop: '1px solid #1f1f28',
          borderBottom: '1px solid #1f1f28',
          backgroundColor: '#111114',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: '#f97316' }}>
                {s.value}
              </div>
              <div className="text-sm" style={{ color: '#9ca3af' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Founding Background / Mission ── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="text-xs font-semibold tracking-widest mb-4 uppercase"
              style={{ color: '#f97316' }}
            >
              {t('about.mission_badge')}
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-6 leading-snug"
              style={{ color: '#f1f1f3' }}
            >
              {t('about.mission_title')}
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#9ca3af' }}>
              {t('about.mission_p1')}
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#9ca3af' }}>
              {t('about.mission_p2')}
            </p>
          </div>
          <div
            className="rounded-2xl p-8"
            style={{
              background: 'linear-gradient(135deg, #1a1a22 0%, #1f1520 100%)',
              border: '1px solid #2a2a36',
            }}
          >
            <div
              className="text-xs font-semibold tracking-widest mb-3 uppercase"
              style={{ color: '#f97316' }}
            >
              FLAGSHIP PRODUCT
            </div>
            <div className="text-2xl font-bold mb-2" style={{ color: '#f1f1f3' }}>
              Orange The Client v1.6
            </div>
            <div className="text-sm mb-6" style={{ color: '#9ca3af' }}>
              {t('about.product_tagline')}
            </div>
            <div className="space-y-3">
              {[
                t('about.product_bullet1'),
                t('about.product_bullet2'),
                t('about.product_bullet3'),
                t('about.product_bullet4'),
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: '#f97316' }}
                  />
                  <span className="text-sm leading-relaxed" style={{ color: '#d1d5db' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5" style={{ borderTop: '1px solid #2a2a36' }}>
              <div className="text-xs mb-2" style={{ color: '#6b7280' }}>
                {t('about.compliance_label')}
              </div>
              <div className="flex flex-wrap gap-2">
                {['GDPR', 'CCPA', t('about.compliance_pipa')].map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 text-xs rounded"
                    style={{
                      backgroundColor: 'rgba(249,115,22,0.1)',
                      color: '#f97316',
                      border: '1px solid rgba(249,115,22,0.2)',
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Group Companies ── */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#0e0e12' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="text-xs font-semibold tracking-widest mb-3 uppercase"
              style={{ color: '#f97316' }}
            >
              {t('about.group_badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#f1f1f3' }}>
              {t('about.group_title')}
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#9ca3af' }}>
              {t('about.group_desc')}
            </p>
          </div>

          {/* Main company + CEO — same row */}
          <div className="flex flex-col lg:flex-row gap-5 mb-5">
            {/* Main company (OrangeLabs) card */}
            {groupCompanies
              .filter((c) => c.isMain)
              .map((c) => (
                <div
                  key={c.nameKey}
                  className="flex-1 rounded-2xl p-8 relative overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(249,115,22,0.03) 100%)',
                    border: '1px solid rgba(249,115,22,0.35)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className="px-2 py-0.5 text-xs font-bold rounded"
                          style={{ backgroundColor: 'rgba(249,115,22,0.15)', color: '#f97316' }}
                        >
                          제조사 · 개발
                        </span>
                        <span className="text-xs" style={{ color: '#6b7280' }}>
                          {t(c.yearKey)}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black mb-1" style={{ color: '#f1f1f3' }}>
                        {t(c.nameKey)}
                      </h3>
                      <p className="text-sm mb-3" style={{ color: '#f97316', fontWeight: 600 }}>
                        {t(c.roleKey)}
                      </p>
                      <p className="text-sm" style={{ color: '#9ca3af' }}>
                        {t(c.descKey)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

            {/* CEO Card */}
            <div
              className="flex-1 rounded-2xl p-6"
              style={{ backgroundColor: '#16161d', border: '1px solid #2a2a36' }}
            >
              <div className="flex items-center gap-5">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0"
                  style={{
                    backgroundColor: 'rgba(249,115,22,0.1)',
                    border: '1px solid rgba(249,115,22,0.25)',
                  }}
                >
                  👤
                </div>
                <div>
                  <div
                    className="text-xs font-semibold tracking-widest mb-1 uppercase"
                    style={{ color: '#f97316' }}
                  >
                    {t('about.ceo_badge')}
                  </div>
                  <div className="text-lg font-bold" style={{ color: '#f1f1f3' }}>
                    {t('about.ceo_name')}
                  </div>
                  <div className="text-sm mb-1" style={{ color: '#f97316' }}>
                    {t('about.ceo_title')}
                  </div>
                  <div className="text-sm" style={{ color: '#9ca3af' }}>
                    {t('about.ceo_desc')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other 3 companies */}
          <div className="grid sm:grid-cols-3 gap-4">
            {groupCompanies
              .filter((c) => !c.isMain)
              .map((c) => (
                <div
                  key={c.nameKey}
                  className="rounded-xl p-6"
                  style={{ backgroundColor: '#16161d', border: '1px solid #2a2a36' }}
                >
                  <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: c.color }} />
                  <div className="text-xs mb-1" style={{ color: '#6b7280' }}>
                    {t(c.yearKey)}
                  </div>
                  <h3 className="text-base font-bold mb-1" style={{ color: '#f1f1f3' }}>
                    {t(c.nameKey)}
                  </h3>
                  <div
                    className="text-xs font-semibold mb-3 px-2 py-0.5 rounded-full inline-block"
                    style={{
                      backgroundColor: `${c.color}18`,
                      color: c.color,
                      border: `1px solid ${c.color}40`,
                    }}
                  >
                    {t(c.roleKey)}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>
                    {t(c.descKey)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── Architecture ── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="text-xs font-semibold tracking-widest mb-3 uppercase"
              style={{ color: '#f97316' }}
            >
              {t('about.arch_badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#f1f1f3' }}>
              {t('about.arch_title')}
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#9ca3af' }}>
              {t('about.arch_sub')}
            </p>
          </div>
          <div className="flex flex-col gap-2 max-w-2xl mx-auto">
            {archLayers.map((layer, i) => (
              <div
                key={layer.num}
                className="relative flex items-center gap-5 px-6 py-4 rounded-xl"
                style={{
                  background: `linear-gradient(90deg, ${layer.color}33 0%, ${layer.color}11 100%)`,
                  border: `1px solid ${layer.color}55`,
                }}
              >
                <div
                  className="text-xs font-mono font-bold w-7 flex-shrink-0"
                  style={{ color: '#f97316' }}
                >
                  {layer.num}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-0.5" style={{ color: '#f1f1f3' }}>
                    {layer.label}
                  </div>
                  <div className="text-xs" style={{ color: '#9ca3af' }}>
                    {layer.desc}
                  </div>
                </div>
                {i < archLayers.length - 1 && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 2v10M3 9l4 4 4-4"
                        stroke="#f97316"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Capabilities ── */}
      <section className="py-24 px-4 sm:px-6" style={{ backgroundColor: '#0e0e12' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="text-xs font-semibold tracking-widest mb-3 uppercase"
              style={{ color: '#f97316' }}
            >
              {t('about.cap_badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#f1f1f3' }}>
              {t('about.cap_title')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="p-6 rounded-xl"
                style={{ backgroundColor: '#16161d', border: '1px solid #2a2a36' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316' }}
                >
                  {cap.icon}
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: '#f1f1f3' }}>
                  {cap.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value Props ── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#f1f1f3' }}>
              {t('about.vp_title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {valueProps.map((vp) => (
              <div
                key={vp.title}
                className="p-8 rounded-2xl text-center"
                style={{
                  background: 'linear-gradient(135deg, #1a1a22 0%, #16131a 100%)',
                  border: '1px solid #2a2a36',
                }}
              >
                <div className="text-4xl mb-4">{vp.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#f1f1f3' }}>
                  {vp.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                  {vp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Company Timeline ── */}
      <section className="py-24 px-4 sm:px-6" style={{ backgroundColor: '#0e0e12' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="text-xs font-semibold tracking-widest mb-3 uppercase"
              style={{ color: '#f97316' }}
            >
              {t('about.tl_badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#f1f1f3' }}>
              {t('about.tl_title')}
            </h2>
          </div>

          {/* Desktop & Mobile — vertical zigzag */}
          <div className="relative max-w-3xl mx-auto">
            {/* center line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
              style={{ backgroundColor: '#2a2a36' }}
            />
            {/* mobile left line */}
            <div
              className="absolute left-[18px] top-0 bottom-0 w-px md:hidden"
              style={{ backgroundColor: '#2a2a36' }}
            />
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <div
                  key={item.date}
                  className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Desktop card */}
                  <div
                    className={`hidden md:flex flex-1 ${i % 2 === 0 ? 'justify-end pr-10' : 'justify-start pl-10'}`}
                  >
                    <div
                      className="rounded-xl px-5 py-4 max-w-[260px] w-full"
                      style={{
                        backgroundColor: '#16161d',
                        border: `1px solid ${i === timeline.length - 1 ? 'rgba(249,115,22,0.4)' : '#2a2a36'}`,
                      }}
                    >
                      <p className="text-xs font-bold font-mono mb-1" style={{ color: '#f97316' }}>
                        {item.date}
                      </p>
                      <h3 className="text-sm font-bold mb-1" style={{ color: '#f1f1f3' }}>
                        {item.title}
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div
                    className="absolute left-[14px] md:left-1/2 w-[10px] h-[10px] rounded-full mt-4 -translate-x-[4px] md:-translate-x-[5px] z-10 ring-4"
                    style={{
                      backgroundColor: i === timeline.length - 1 ? '#f97316' : '#374151',
                      border: '2px solid',
                      borderColor: i === timeline.length - 1 ? '#f97316' : '#4b5563',
                      boxShadow: '0 0 0 4px #0e0e12',
                    }}
                  />

                  {/* Desktop spacer */}
                  <div className="hidden md:block flex-1" />

                  {/* Mobile card */}
                  <div className="md:hidden ml-10">
                    <p className="text-xs font-bold font-mono mb-0.5" style={{ color: '#f97316' }}>
                      {item.date}
                    </p>
                    <h3 className="text-sm font-bold mb-0.5" style={{ color: '#f1f1f3' }}>
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ borderTop: '1px solid #1f1f28' }} />

      {/* ── CTA ── */}
      <section className="py-24 px-4 sm:px-6" style={{ backgroundColor: '#0e0e12' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#f1f1f3' }}>
            {t('about.cta_title')}
          </h2>
          <p className="text-base mb-8" style={{ color: '#9ca3af' }}>
            {t('about.cta_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/company/contact"
              className="px-7 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{ backgroundColor: '#f97316', color: '#fff' }}
            >
              {t('about.cta_btn1')}
            </Link>
            <Link
              to="/products/orange-the-client"
              className="px-7 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{
                backgroundColor: 'transparent',
                color: '#f97316',
                border: '1px solid rgba(249,115,22,0.4)',
              }}
            >
              {t('about.cta_btn2')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
