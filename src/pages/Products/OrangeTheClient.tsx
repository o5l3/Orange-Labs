import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const pillars = [
  {
    titleKey: 'otc.p1_title',
    subKey: 'otc.p1_sub',
    items: ['otc.p1_i1', 'otc.p1_i2', 'otc.p1_i3'],
    icon: '⚡',
    color: '#f97316',
  },
  {
    titleKey: 'otc.p2_title',
    subKey: 'otc.p2_sub',
    items: ['otc.p2_i1', 'otc.p2_i2', 'otc.p2_i3'],
    icon: '🎯',
    color: '#f97316',
  },
  {
    titleKey: 'otc.p3_title',
    subKey: 'otc.p3_sub',
    items: ['otc.p3_i1', 'otc.p3_i2', 'otc.p3_i3'],
    icon: '🛡️',
    color: '#f97316',
  },
];

const archComponents = [
  { titleKey: 'otc.arch1_title', descKey: 'otc.arch1_desc', icon: '💻' },
  { titleKey: 'otc.arch2_title', descKey: 'otc.arch2_desc', icon: '⚙️' },
  { titleKey: 'otc.arch3_title', descKey: 'otc.arch3_desc', icon: '🖥️' },
  { titleKey: 'otc.arch4_title', descKey: 'otc.arch4_desc', icon: '📊' },
];

const features = [
  { titleKey: 'otc.f1_title', descKey: 'otc.f1_desc', icon: '📋' },
  { titleKey: 'otc.f2_title', descKey: 'otc.f2_desc', icon: '📈' },
  { titleKey: 'otc.f3_title', descKey: 'otc.f3_desc', icon: '🔍' },
  { titleKey: 'otc.f4_title', descKey: 'otc.f4_desc', icon: '🕐' },
  { titleKey: 'otc.f5_title', descKey: 'otc.f5_desc', icon: '⌨️' },
  { titleKey: 'otc.f6_title', descKey: 'otc.f6_desc', icon: '🤖' },
];

const impactRows = [
  ['otc.impact_r1_name', 'otc.impact_r1_before', 'otc.impact_r1_after', 'otc.impact_r1_note'],
  ['otc.impact_r2_name', 'otc.impact_r2_before', 'otc.impact_r2_after', 'otc.impact_r2_note'],
  ['otc.impact_r3_name', 'otc.impact_r3_before', 'otc.impact_r3_after', 'otc.impact_r3_note'],
  ['otc.impact_r4_name', 'otc.impact_r4_before', 'otc.impact_r4_after', 'otc.impact_r4_note'],
  ['otc.impact_r5_name', 'otc.impact_r5_before', 'otc.impact_r5_after', 'otc.impact_r5_note'],
];

const compareRows = [
  { category: '성능관리', item: '소프트웨어 자원의 장애 성능 관리', orangeLabs: true, n: false, t: false },
  { category: '성능관리', item: '하드웨어 자원의 장애 성능 관리', orangeLabs: true, n: 'partial', t: 'partial' },
  { category: '대시보드', item: '위젯 타입의 유연한 구성 관리', orangeLabs: true, n: false, t: false },
  { category: '분석기능', item: '소프트웨어간 충돌로 인한 원인 분석', orangeLabs: true, n: false, t: false },
  { category: '분석기능', item: '소프트웨어 - 하드웨어간 영향도 분석', orangeLabs: true, n: false, t: false },
  { category: '분석기능', item: '커널 성능 모니터링', orangeLabs: true, n: false, t: false },
  { category: '분석기능', item: '장애원인의 수치화된 제공', orangeLabs: true, n: false, t: false },
  { category: '수집기능', item: '소프트웨어 자원의 버전, 정보관리', orangeLabs: true, n: true, t: true },
  { category: '관리기능', item: '원격접속 기능(1:1, 1:N)', orangeLabs: true, n: true, t: true },
  { category: '분석기능', item: '프로세스, 쓰레드 단위 실시간 분석 기능', orangeLabs: true, n: false, t: false },
];

const enterpriseClients = ['한일네트웍스', 'CROWN', 'HYOSUNG ITX', 'U BASE GROUP', 'SUN AT FOOD', '한일시멘트', '한일현대시멘트'];
const publicClients = ['부천도시공사', '국립순천대학교'];

export default function OrangeTheClient() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div style={{ backgroundColor: '#0e0e11' }}>

      {/* ── Hero ── */}
      <section
        className="py-24 px-4 sm:px-6"
        style={{
          background: 'linear-gradient(135deg, #111114 0%, #1a0e08 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(249,115,22,0.12) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-widest"
            style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}
          >
            {t('otc.hero_badge')}
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-3" style={{ color: '#f1f1f3' }}>
            {t('otc.hero_title')}
          </h1>
          <p className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: '#f97316' }}>
            {t('otc.hero_tagline')}
          </p>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: '#9ca3af', lineHeight: '1.8' }}>
            {t('otc.hero_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 rounded-full text-base font-semibold transition-all"
              style={{ backgroundColor: '#f97316', color: '#fff' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea6c0a')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
              onClick={() => navigate('/company/contact')}
            >
              {t('otc.hero_cta1')}
            </button>
            <a
              href="/pdf/OrangeTheClient_Product_Introduction.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-base font-semibold transition-all"
              style={{ border: '1px solid rgba(249,115,22,0.5)', color: '#f97316' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(249,115,22,0.1)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'; }}
            >
              {t('otc.hero_cta2')}
            </a>
          </div>
        </div>
      </section>

      {/* ── Problem / Background ── */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-widest"
              style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)' }}
            >
              {t('otc.problem_badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#f1f1f3' }}>
              {t('otc.problem_title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div
              className="rounded-2xl p-8 text-center"
              style={{ backgroundColor: '#1a1a1f', border: '1px solid rgba(249,115,22,0.2)' }}
            >
              <div className="text-6xl font-black mb-2" style={{ color: '#f97316' }}>
                {t('otc.problem_stat')}
              </div>
              <div className="text-sm font-semibold mb-6" style={{ color: '#9ca3af' }}>
                {t('otc.problem_stat_label')}
              </div>
              {/* mini bar chart decoration */}
              <div className="flex items-end justify-center gap-2 h-20">
                {[40, 55, 70, 90].map((h, i) => (
                  <div key={i} className="w-10 rounded-t" style={{ height: `${h}%`, backgroundColor: i === 3 ? '#f97316' : 'rgba(249,115,22,0.3)' }} />
                ))}
              </div>
              <div className="flex justify-center gap-6 mt-2 text-xs" style={{ color: '#6b7280' }}>
                <span>2019</span><span>2020</span><span>2021</span><span style={{ color: '#f97316', fontWeight: 700 }}>2022</span>
              </div>
            </div>
            <div>
              <p className="text-base mb-4" style={{ color: '#9ca3af', lineHeight: '1.8' }}>
                {t('otc.problem_desc')}
              </p>
              <div
                className="rounded-xl px-5 py-4 font-bold text-base"
                style={{ backgroundColor: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)', color: '#f1f1f3' }}
              >
                {t('otc.problem_p2')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── System Architecture ── */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#0e0e11' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-widest"
              style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)' }}
            >
              {t('otc.arch_badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#f1f1f3' }}>
              {t('otc.arch_title')}
            </h2>
            <p className="max-w-2xl mx-auto text-sm" style={{ color: '#9ca3af' }}>
              {t('otc.arch_desc')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {archComponents.map((comp) => (
              <div
                key={comp.titleKey}
                className="rounded-xl p-6 text-center"
                style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
              >
                <div className="text-3xl mb-3">{comp.icon}</div>
                <h3
                  className="text-lg font-bold mb-2 px-3 py-1 rounded-full inline-block"
                  style={{ backgroundColor: 'rgba(249,115,22,0.12)', color: '#f97316' }}
                >
                  {t(comp.titleKey)}
                </h3>
                <p className="text-xs mt-3" style={{ color: '#9ca3af', lineHeight: '1.7' }}>
                  {t(comp.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 Pillars ── */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-widest"
              style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)' }}
            >
              {t('otc.pillars_badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#f1f1f3' }}>
              {t('otc.pillars_title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div
                key={p.titleKey}
                className="rounded-2xl p-7"
                style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
              >
                <div className="text-3xl mb-4">{p.icon}</div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#9ca3af' }}>
                  {t(p.titleKey)}
                </div>
                <div className="text-xl font-black mb-5" style={{ color: '#f97316' }}>
                  {t(p.subKey)}
                </div>
                <ul className="space-y-2">
                  {p.items.map((ik) => (
                    <li key={ik} className="flex items-start gap-2 text-sm" style={{ color: '#d1d5db' }}>
                      <span style={{ color: '#f97316', marginTop: 2 }}>•</span>
                      {t(ik)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Features ── */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#0e0e11' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-widest"
              style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)' }}
            >
              {t('otc.features_badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#f1f1f3' }}>
              {t('otc.features_title')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, idx) => (
              <div
                key={f.titleKey}
                className="rounded-xl p-6 flex gap-4"
                style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                  style={{ backgroundColor: 'rgba(249,115,22,0.1)' }}
                >
                  {f.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold" style={{ color: '#f97316' }}>0{idx + 1}</span>
                    <h3 className="font-semibold text-sm" style={{ color: '#f1f1f3' }}>{t(f.titleKey)}</h3>
                  </div>
                  <p className="text-xs" style={{ color: '#9ca3af', lineHeight: '1.7' }}>{t(f.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expected Impact ── */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-widest"
              style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)' }}
            >
              {t('otc.impact_badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#f1f1f3' }}>
              {t('otc.impact_title')}
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #2a2a33' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#1a1a1f' }}>
                  {['otc.impact_col1', 'otc.impact_col2', 'otc.impact_col3', 'otc.impact_col4'].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left font-semibold"
                      style={{ color: '#f1f1f3', borderBottom: '1px solid #2a2a33' }}
                    >
                      {t(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {impactRows.map((row, i) => (
                  <tr
                    key={i}
                    style={{ borderBottom: i < impactRows.length - 1 ? '1px solid #1f1f27' : undefined }}
                  >
                    <td className="px-4 py-3 font-semibold" style={{ color: '#f97316' }}>{t(row[0])}</td>
                    <td className="px-4 py-3" style={{ color: '#6b7280' }}>{t(row[1])}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: '#f1f1f3' }}>{t(row[2])}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: '#9ca3af' }}>{t(row[3])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Product Comparison ── */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#0e0e11' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-widest"
              style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)' }}
            >
              {t('otc.compare_badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#f1f1f3' }}>
              {t('otc.compare_title')}
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl mb-6" style={{ border: '1px solid #2a2a33' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#1a1a1f' }}>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: '#9ca3af', borderBottom: '1px solid #2a2a33' }}>구분</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: '#9ca3af', borderBottom: '1px solid #2a2a33' }}>항목</th>
                  <th className="px-4 py-3 text-center font-black" style={{ color: '#f97316', borderBottom: '1px solid #2a2a33' }}>OrangeLabs</th>
                  <th className="px-4 py-3 text-center font-semibold" style={{ color: '#9ca3af', borderBottom: '1px solid #2a2a33' }}>N社</th>
                  <th className="px-4 py-3 text-center font-semibold" style={{ color: '#9ca3af', borderBottom: '1px solid #2a2a33' }}>T社</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < compareRows.length - 1 ? '1px solid #1f1f27' : undefined }}>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded text-xs font-semibold"
                        style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316' }}
                      >
                        {row.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: '#d1d5db' }}>{row.item}</td>
                    <td className="px-4 py-3 text-center font-bold text-base" style={{ color: '#f97316' }}>
                      {row.orangeLabs === true ? '제공' : '불가'}
                    </td>
                    <td className="px-4 py-3 text-center text-xs" style={{ color: row.n === true ? '#9ca3af' : row.n === 'partial' ? '#9ca3af' : '#374151' }}>
                      {row.n === true ? '제공' : row.n === 'partial' ? '일부 제공' : '불가'}
                    </td>
                    <td className="px-4 py-3 text-center text-xs" style={{ color: row.t === true ? '#9ca3af' : row.t === 'partial' ? '#9ca3af' : '#374151' }}>
                      {row.t === true ? '제공' : row.t === 'partial' ? '일부제공' : '불가'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="rounded-xl px-6 py-4 flex items-start gap-3"
            style={{ backgroundColor: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)' }}
          >
            <span className="text-lg mt-0.5">💡</span>
            <div>
              <span className="font-bold text-sm" style={{ color: '#f97316' }}>{t('otc.compare_key')} </span>
              <span className="text-sm" style={{ color: '#d1d5db' }}>{t('otc.compare_key_desc')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reference Clients ── */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-widest"
              style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)' }}
            >
              {t('otc.clients_badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#f1f1f3' }}>
              {t('otc.clients_title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl p-6" style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}>
              <div className="font-bold text-xs mb-4 tracking-widest" style={{ color: '#9ca3af' }}>
                {t('otc.clients_enterprise')}
              </div>
              <div className="flex flex-wrap gap-2">
                {enterpriseClients.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium"
                    style={{ backgroundColor: '#252530', color: '#d1d5db', border: '1px solid #2a2a33' }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-6" style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}>
              <div className="font-bold text-xs mb-4 tracking-widest" style={{ color: '#9ca3af' }}>
                {t('otc.clients_public')}
              </div>
              <div className="flex flex-wrap gap-2">
                {publicClients.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium"
                    style={{ backgroundColor: '#252530', color: '#d1d5db', border: '1px solid #2a2a33' }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 text-center" style={{ backgroundColor: '#0e0e11' }}>
        <div
          className="max-w-2xl mx-auto rounded-2xl px-8 py-12"
          style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(249,115,22,0.03) 100%)', border: '1px solid rgba(249,115,22,0.2)' }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#f1f1f3' }}>
            {t('otc.cta_title')}
          </h2>
          <p className="mb-8 text-base" style={{ color: '#9ca3af' }}>
            {t('otc.cta_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-3 rounded-full font-semibold transition-all"
              style={{ backgroundColor: '#f97316', color: '#fff' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea6c0a')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
              onClick={() => navigate('/company/contact')}
            >
              {t('otc.cta_btn1')}
            </button>
            <a
              href="/pdf/OrangeTheClient_Product_Introduction.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full font-semibold transition-all"
              style={{ border: '1px solid rgba(249,115,22,0.5)', color: '#f97316' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(249,115,22,0.1)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'; }}
            >
              {t('otc.cta_btn2')}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
