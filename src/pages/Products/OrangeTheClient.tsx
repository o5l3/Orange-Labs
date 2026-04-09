import { useState, useRef, useEffect, useCallback } from 'react';
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

const chartData = [
  { year: '2019', bank: 23, securities: 20, insurance: 7, savings: 7, card: 3 },
  { year: '2020', bank: 33, securities: 30, insurance: 10, savings: 10, card: 4 },
  { year: '2021', bank: 50, securities: 45, insurance: 15, savings: 15, card: 7 },
  { year: '2022', bank: 90, securities: 81, insurance: 27, savings: 27, card: 13 },
];

const legendItems = [
  { labelKey: 'otc.legend_card', color: '#fed7aa' },
  { labelKey: 'otc.legend_savings', color: '#fdba74' },
  { labelKey: 'otc.legend_insurance', color: '#fb923c' },
  { labelKey: 'otc.legend_securities', color: '#f97316' },
  { labelKey: 'otc.legend_bank', color: '#c2410c' },
];

const impactRows = [
  ['otc.impact_r1_name', 'otc.impact_r1_before', 'otc.impact_r1_after', 'otc.impact_r1_note'],
  ['otc.impact_r2_name', 'otc.impact_r2_before', 'otc.impact_r2_after', 'otc.impact_r2_note'],
  ['otc.impact_r3_name', 'otc.impact_r3_before', 'otc.impact_r3_after', 'otc.impact_r3_note'],
  ['otc.impact_r4_name', 'otc.impact_r4_before', 'otc.impact_r4_after', 'otc.impact_r4_note'],
  ['otc.impact_r5_name', 'otc.impact_r5_before', 'otc.impact_r5_after', 'otc.impact_r5_note'],
];

const compareRows = [
  {
    categoryKey: 'otc.cmp_cat_perf',
    itemKey: 'otc.cmp_item_1',
    orangeLabs: true,
    n: false,
    t: false,
  },
  {
    categoryKey: 'otc.cmp_cat_perf',
    itemKey: 'otc.cmp_item_2',
    orangeLabs: true,
    n: 'partial',
    t: 'partial',
  },
  {
    categoryKey: 'otc.cmp_cat_dash',
    itemKey: 'otc.cmp_item_3',
    orangeLabs: true,
    n: false,
    t: false,
  },
  {
    categoryKey: 'otc.cmp_cat_analysis',
    itemKey: 'otc.cmp_item_4',
    orangeLabs: true,
    n: false,
    t: false,
  },
  {
    categoryKey: 'otc.cmp_cat_analysis',
    itemKey: 'otc.cmp_item_5',
    orangeLabs: true,
    n: false,
    t: false,
  },
  {
    categoryKey: 'otc.cmp_cat_analysis',
    itemKey: 'otc.cmp_item_6',
    orangeLabs: true,
    n: false,
    t: false,
  },
  {
    categoryKey: 'otc.cmp_cat_analysis',
    itemKey: 'otc.cmp_item_7',
    orangeLabs: true,
    n: false,
    t: false,
  },
  {
    categoryKey: 'otc.cmp_cat_collect',
    itemKey: 'otc.cmp_item_8',
    orangeLabs: true,
    n: true,
    t: true,
  },
  {
    categoryKey: 'otc.cmp_cat_manage',
    itemKey: 'otc.cmp_item_9',
    orangeLabs: true,
    n: true,
    t: true,
  },
  {
    categoryKey: 'otc.cmp_cat_analysis',
    itemKey: 'otc.cmp_item_10',
    orangeLabs: true,
    n: false,
    t: false,
  },
];

const managerItems = [
  {
    img: '/images/products/manager_1.png',
    titleKey: 'otc.mgr1_title',
    contentKeys: ['otc.mgr1_c1', 'otc.mgr1_c2', 'otc.mgr1_c3'],
  },
  {
    img: '/images/products/manager_2.png',
    titleKey: 'otc.mgr2_title',
    contentKeys: ['otc.mgr2_c1', 'otc.mgr2_c2', 'otc.mgr2_c3'],
  },
  {
    img: '/images/products/manager_3.png',
    titleKey: 'otc.mgr3_title',
    contentKeys: ['otc.mgr3_c1', 'otc.mgr3_c2', 'otc.mgr3_c3'],
  },
  {
    img: '/images/products/manager_4.png',
    titleKey: 'otc.mgr4_title',
    contentKeys: ['otc.mgr4_c1', 'otc.mgr4_c2', 'otc.mgr4_c3'],
  },
  {
    img: '/images/products/manager_5.png',
    titleKey: 'otc.mgr5_title',
    contentKeys: ['otc.mgr5_c1', 'otc.mgr5_c2', 'otc.mgr5_c3'],
  },
  {
    img: '/images/products/manager_6.png',
    titleKey: 'otc.mgr6_title',
    contentKeys: ['otc.mgr6_c1', 'otc.mgr6_c2', 'otc.mgr6_c3'],
  },
];

const MGR_COUNT = managerItems.length;

export default function OrangeTheClient() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // ── 캐러셀 상태 ──
  const [mgrIdx, setMgrIdx] = useState(0);
  const mgrTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mgrNext = useCallback(() => setMgrIdx((p) => (p + 1) % MGR_COUNT), []);
  const mgrPrev = useCallback(() => setMgrIdx((p) => (p - 1 + MGR_COUNT) % MGR_COUNT), []);

  const mgrResetTimer = useCallback(() => {
    if (mgrTimerRef.current) clearTimeout(mgrTimerRef.current);
    mgrTimerRef.current = setTimeout(mgrNext, 3000);
  }, [mgrNext]);

  useEffect(() => {
    mgrResetTimer();
    return () => {
      if (mgrTimerRef.current) clearTimeout(mgrTimerRef.current);
    };
  }, [mgrIdx, mgrResetTimer]);

  // 현재 인덱스 기준 슬롯 위치 계산 (-1=왼쪽, 0=가운데, 1=오른쪽, 나머지=숨김)
  const getSlot = (i: number): number => {
    let slot = (((i - mgrIdx) % MGR_COUNT) + MGR_COUNT) % MGR_COUNT;
    if (slot > MGR_COUNT / 2) slot -= MGR_COUNT;
    return slot;
  };

  // ── 라이트박스 상태 ──
  const [lbOpen, setLbOpen]   = useState(false);
  const [lbSrc,  setLbSrc]    = useState('');
  const [lbZoom, setLbZoom]   = useState(1);
  const [lbPos,  setLbPos]    = useState({ x: 0, y: 0 });
  const lbDragging = useRef(false);
  const lbDragStart = useRef({ mx: 0, my: 0, ix: 0, iy: 0 });

  const openLightbox = (src: string) => {
    setLbSrc(src);
    setLbZoom(1);
    setLbPos({ x: 0, y: 0 });
    setLbOpen(true);
  };
  const closeLightbox = () => setLbOpen(false);
  const lbZoomIn  = () => setLbZoom((z) => Math.min(+(z + 0.25).toFixed(2), 4));
  const lbZoomOut = () => setLbZoom((z) => Math.max(+(z - 0.25).toFixed(2), 0.25));

  const lbMouseDown = (e: React.MouseEvent) => {
    lbDragging.current = true;
    lbDragStart.current = { mx: e.clientX, my: e.clientY, ix: lbPos.x, iy: lbPos.y };
    e.preventDefault();
  };
  const lbMouseMove = (e: React.MouseEvent) => {
    if (!lbDragging.current) return;
    setLbPos({
      x: lbDragStart.current.ix + (e.clientX - lbDragStart.current.mx),
      y: lbDragStart.current.iy + (e.clientY - lbDragStart.current.my),
    });
  };
  const lbMouseUp = () => { lbDragging.current = false; };

  const lbWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setLbZoom((z) => {
      const next = z - e.deltaY * 0.001;
      return Math.min(Math.max(+next.toFixed(2), 0.25), 4);
    });
  };

  return (
    <div style={{ backgroundColor: '#0e0e11' }}>

      {/* ── 라이트박스 오버레이 ── */}
      {lbOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center select-none"
          style={{ zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.88)' }}
          onMouseMove={lbMouseMove}
          onMouseUp={lbMouseUp}
          onMouseLeave={lbMouseUp}
          onWheel={lbWheel}
        >
          {/* 배경 클릭 시 닫기 */}
          <div className="absolute inset-0" onClick={closeLightbox} />

          {/* 이미지 (드래그 가능) */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              transform: `translate(${lbPos.x}px, ${lbPos.y}px) scale(${lbZoom})`,
              transformOrigin: 'center center',
              cursor: lbDragging.current ? 'grabbing' : 'grab',
              transition: lbDragging.current ? 'none' : 'transform 0.15s ease',
            }}
            onMouseDown={lbMouseDown}
          >
            <img
              src={lbSrc}
              draggable={false}
              style={{ maxWidth: '88vw', maxHeight: '82vh', display: 'block', borderRadius: '8px', pointerEvents: 'none' }}
            />
          </div>

          {/* 상단 우측: 닫기 버튼 */}
          <button
            className="absolute top-5 right-5 flex items-center justify-center rounded-full transition-all"
            style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.12)', color: '#fff', zIndex: 2, border: '1px solid rgba(255,255,255,0.2)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.22)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
            onClick={closeLightbox}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* 하단 중앙: 확대/축소 컨트롤 */}
          <div
            className="absolute bottom-6 flex items-center gap-3 px-4 py-2 rounded-full"
            style={{ zIndex: 2, backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <button
              className="flex items-center justify-center rounded-full transition-all"
              style={{ width: '32px', height: '32px', backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
              onClick={lbZoomOut}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
            </button>
            <span className="text-sm font-semibold tabular-nums" style={{ color: '#e5e7eb', minWidth: '44px', textAlign: 'center' }}>
              {Math.round(lbZoom * 100)}%
            </span>
            <button
              className="flex items-center justify-center rounded-full transition-all"
              style={{ width: '32px', height: '32px', backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
              onClick={lbZoomIn}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
            <button
              className="flex items-center justify-center rounded-full transition-all"
              style={{ width: '32px', height: '32px', backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
              title="원래 크기"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
              onClick={() => { setLbZoom(1); setLbPos({ x: 0, y: 0 }); }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M16 4h4v4M4 16v4h4M16 20h4v-4" />
              </svg>
            </button>
          </div>
        </div>
      )}
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
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(249,115,22,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-widest"
            style={{
              backgroundColor: 'rgba(249,115,22,0.1)',
              color: '#f97316',
              border: '1px solid rgba(249,115,22,0.3)',
            }}
          >
            {t('otc.hero_badge')}
          </div>
          <h1
            className="text-5xl sm:text-7xl font-bold tracking-tight mb-3"
            style={{ color: '#f1f1f3' }}
          >
            {t('otc.hero_title')}
          </h1>
          <p className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: '#f97316' }}>
            {t('otc.hero_tagline')}
          </p>
          <p
            className="text-lg max-w-2xl mx-auto mb-10"
            style={{ color: '#9ca3af', lineHeight: '1.8' }}
          >
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
              style={{
                border: '1px solid rgba(249,115,22,0.5)',
                color: '#f97316',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  'rgba(249,115,22,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
              }}
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
              style={{
                backgroundColor: 'rgba(249,115,22,0.1)',
                color: '#f97316',
                border: '1px solid rgba(249,115,22,0.2)',
              }}
            >
              {t('otc.problem_badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#f1f1f3' }}>
              {t('otc.problem_title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* ── 스택 바 차트 카드 ── */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: '#1a1a1f',
                border: '1px solid rgba(249,115,22,0.2)',
              }}
            >
              {/* 카드 헤더 */}
              <h3 className="text-sm font-bold mb-1" style={{ color: '#f1f1f3' }}>
                {t('otc.chart_title')}
              </h3>
              <p className="text-xs mb-0.5" style={{ color: '#9ca3af' }}>
                {t('otc.chart_subtitle')}
              </p>
              <p className="text-3xl font-black mb-5" style={{ color: '#f97316' }}>
                {t('otc.chart_stat')}
              </p>

              {/* 차트 + 범례 */}
              <div className="flex gap-4">
                {/* 스택 바 */}
                <div className="flex-1 flex items-end justify-around gap-2" style={{ height: 160 }}>
                  {chartData.map((d) => {
                    const total = d.bank + d.securities + d.insurance + d.savings + d.card;
                    const barH = Math.round((total / 238) * 160);
                    return (
                      <div key={d.year} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full flex flex-col rounded-t overflow-hidden"
                          style={{ height: barH }}
                        >
                          <div style={{ flex: d.card, backgroundColor: '#fed7aa' }} />
                          <div style={{ flex: d.savings, backgroundColor: '#fdba74' }} />
                          <div style={{ flex: d.insurance, backgroundColor: '#fb923c' }} />
                          <div style={{ flex: d.securities, backgroundColor: '#f97316' }} />
                          <div style={{ flex: d.bank, backgroundColor: '#c2410c' }} />
                        </div>
                        <span
                          className="mt-2 text-xs"
                          style={{
                            color: d.year === '2022' ? '#f97316' : '#6b7280',
                            fontWeight: d.year === '2022' ? 700 : 400,
                          }}
                        >
                          {d.year}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* 범례 */}
                <div className="flex flex-col gap-3" style={{ minWidth: 130 }}>
                  <ul className="space-y-1.5">
                    {legendItems.map((item) => (
                      <li key={item.labelKey} className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-sm shrink-0"
                          style={{
                            backgroundColor: item.color,
                            border: '1px solid rgba(255,255,255,0.15)',
                          }}
                        />
                        <span className="text-xs" style={{ color: '#9ca3af' }}>
                          {t(item.labelKey)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 출처 */}
              <p className="mt-4 text-right" style={{ color: '#4b5563', fontSize: '0.6rem' }}>
                {t('otc.chart_source')}
              </p>
            </div>
            <div>
              <p className="text-base mb-4" style={{ color: '#9ca3af', lineHeight: '1.8' }}>
                {t('otc.problem_desc')}
              </p>

              <div
                className="rounded-xl px-6 py-4 flex items-start gap-3"
                style={{
                  backgroundColor: 'rgba(249,115,22,0.06)',
                  border: '1px solid rgba(249,115,22,0.2)',
                }}
              >
                <span className="text-lg mt-0.5">💡</span>
                <div>
                  <span className="text-sm" style={{ color: '#d1d5db' }}>
                    {t('otc.problem_p2')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sub 1: PC 장애 인지의 어려움 ── */}
          <div className="mt-14">
            <h3
              className="text-2xl sm:text-3xl font-bold mb-12 text-center"
              style={{ color: '#f1f1f3' }}
            >
              {t('otc.prob2_title')}
            </h3>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              {/* 왼쪽: 4개 포인트 */}
              <div
                className="rounded-2xl p-6 space-y-4"
                style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
              >
                {(
                  [
                    t('otc.prob2_p1'),
                    t('otc.prob2_p2'),
                    t('otc.prob2_p3'),
                    t('otc.prob2_p4'),
                  ] as string[]
                ).map((text, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    {/*<span*/}
                    {/*  className="flex-shrink-0 w-2 h-2 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"*/}
                    {/*  style={{ backgroundColor: 'rgba(249,115,22,0.15)', color: '#f97316' }}*/}
                    {/*>*/}
                    {/*  /!*{i + 1}*!/*/}
                    {/*</span>*/}
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#4b5563' }}
                    />
                    <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
              {/* 오른쪽: 결과 callout */}
              <div
                className="rounded-2xl overflow-hidden relative"
                style={{
                  border: '1px solid rgba(239,68,68,0.3)',
                }}
              >
                <img
                  src="/images/products/pc_error.png"
                  alt="PC Error"
                  className="w-full h-auto block"
                  style={{ filter: 'grayscale(1)', opacity: 0.5 }}
                />
                {/* 도장 오버레이 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-3xl font-black tracking-widest px-5 py-2"
                    style={{
                      color: '#ffffff',
                      // color: '#dc2626',
                      border: '4px solid #dc2626',
                      borderRadius: '3px',
                      transform: 'rotate(-22deg)',
                      opacity: 1.0,
                      letterSpacing: '0.18em',
                      // textShadow: [
                      //   '-1px -1px 0 rgba(255,255,255,0.58)',
                      //   ' 1px -1px 0 rgba(255,255,255,0.58)',
                      //   '-1px  1px 0 rgba(255,255,255,0.58)',
                      //   ' 1px  1px 0 rgba(255,255,255,0.58)',
                      //   '0 0 5px rgba(220,38,38,0.6)',
                      // ].join(','),
                      backgroundColor: 'rgba(239,68,68,0.65)',
                      // backgroundColor: 'rgba(0,0,0,0.15)',
                      boxShadow: '0 0 0 2px rgba(220,38,38,0.25)',
                    }}
                  >
                    {t('otc.prob2_result')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sub 2: 수작업 방식의 비효율 ── */}
          <div className="mt-14">
            <h3
              className="text-2xl sm:text-3xl font-bold mb-12 text-center"
              style={{ color: '#f1f1f3' }}
            >
              {t('otc.prob3_title')}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* 01 */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid #2a2a33', backgroundColor: '#1a1a1f' }}
              >
                <div
                  className="px-5 py-3 flex items-center gap-3"
                  style={{ backgroundColor: '#22222a' }}
                >
                  <span className="text-base font-black" style={{ color: '#f97316' }}>
                    {t('otc.prob3_col1_num')}
                  </span>
                  <span className="text-base font-bold" style={{ color: '#f1f1f3' }}>
                    {t('otc.prob3_col1_title')}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  {([t('otc.prob3_col1_p1'), t('otc.prob3_col1_p2')] as string[]).map((text, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: '#4b5563' }}
                      />
                      <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                        {text}
                      </p>
                    </div>
                  ))}
                  <div className="flex gap-2 items-start pt-1">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#f97316' }}
                    />
                    <p className="text-sm leading-relaxed font-medium" style={{ color: '#f97316' }}>
                      {t('otc.prob3_col1_highlight')}
                    </p>
                  </div>
                </div>
              </div>
              {/* 02 */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid #2a2a33', backgroundColor: '#1a1a1f' }}
              >
                <div
                  className="px-5 py-3 flex items-center gap-3"
                  style={{ backgroundColor: '#22222a' }}
                >
                  <span className="text-base font-black" style={{ color: '#f97316' }}>
                    {t('otc.prob3_col2_num')}
                  </span>
                  <span className="text-base font-bold" style={{ color: '#f1f1f3' }}>
                    {t('otc.prob3_col2_title')}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  {(
                    [
                      t('otc.prob3_col2_p1'),
                      t('otc.prob3_col2_p2'),
                      t('otc.prob3_col2_p3'),
                    ] as string[]
                  ).map((text, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: '#4b5563' }}
                      />
                      <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                        {text}
                      </p>
                    </div>
                  ))}
                  <div className="flex gap-2 items-start pt-1">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#f97316' }}
                    />
                    <p className="text-sm leading-relaxed font-medium" style={{ color: '#f97316' }}>
                      {t('otc.prob3_col2_highlight')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* 하단 결과 배너 */}
            <div
              className="mt-4 rounded-xl px-6 py-4 text-center"
              style={{ backgroundColor: '#1a1410', border: '1px solid rgba(249,115,22,0.3)' }}
            >
              <p className="text-base font-bold" style={{ color: '#f97316' }}>
                {t('otc.prob3_result')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 제품 개요 ── */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-6xl mx-auto">
          {/* Badge + Title */}
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-widest"
              style={{
                backgroundColor: 'rgba(249,115,22,0.1)',
                color: '#f97316',
                border: '1px solid rgba(249,115,22,0.2)',
              }}
            >
              {t('otc.overview_badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#f1f1f3' }}>
              {t('otc.overview_title')}
            </h2>
          </div>

          {/* ── Part 1: Endpoint 개요 ── */}
          <div className="mb-16">
            <div className="grid md:grid-cols-3 gap-5">
              {/* Col 1: 정의 */}
              <div
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
              >
                <div
                  className="px-5 py-3 flex items-center gap-3"
                  style={{ backgroundColor: '#222228', borderBottom: '1px solid #2a2a33' }}
                >
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: 'rgba(249,115,22,0.15)', color: '#f97316' }}
                  >
                    {t('otc.ep_col1_num')}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: '#f1f1f3' }}>
                    {t('otc.ep_col1_title')}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                    {t('otc.ep_col1_desc')}
                  </p>
                  {/* Device icon row */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['노트북', '데스크탑', '스마트폰', 'ATM', '의료단말'].map((d) => (
                      <span
                        key={d}
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: 'rgba(249,115,22,0.08)',
                          color: '#fb923c',
                          border: '1px solid rgba(249,115,22,0.2)',
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Col 2: 중요성 */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
              >
                <div
                  className="px-5 py-3 flex items-center gap-3"
                  style={{ backgroundColor: '#222228', borderBottom: '1px solid #2a2a33' }}
                >
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: 'rgba(249,115,22,0.15)', color: '#f97316' }}
                  >
                    {t('otc.ep_col2_num')}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: '#f1f1f3' }}>
                    {t('otc.ep_col2_title')}
                  </span>
                </div>
                <div className="p-5 space-y-4">
                  {(
                    [
                      { title: t('otc.ep_col2_b1_title'), desc: t('otc.ep_col2_b1_desc') },
                      { title: t('otc.ep_col2_b2_title'), desc: t('otc.ep_col2_b2_desc') },
                      { title: t('otc.ep_col2_b3_title'), desc: t('otc.ep_col2_b3_desc') },
                    ] as { title: string; desc: string }[]
                  ).map((item, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span
                        className="mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(249,115,22,0.15)' }}
                      >
                        <span
                          className="block w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: '#f97316' }}
                        />
                      </span>
                      <div>
                        <p className="text-xs font-semibold mb-0.5" style={{ color: '#f97316' }}>
                          {item.title}
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Col 3: 필요성 */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
              >
                <div
                  className="px-5 py-3 flex items-center gap-3"
                  style={{ backgroundColor: '#222228', borderBottom: '1px solid #2a2a33' }}
                >
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: 'rgba(249,115,22,0.15)', color: '#f97316' }}
                  >
                    {t('otc.ep_col3_num')}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: '#f1f1f3' }}>
                    {t('otc.ep_col3_title')}
                  </span>
                </div>
                <div className="p-5 space-y-4">
                  {([t('otc.ep_col3_b1'), t('otc.ep_col3_b2')] as string[]).map((text, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span
                        className="mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(249,115,22,0.15)' }}
                      >
                        <span
                          className="block w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: '#f97316' }}
                        />
                      </span>
                      <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Part 2: 제품 구성 ── */}
          <div className="text-center mb-12">
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
                style={{
                  backgroundColor: '#1a1a1f',
                  border: '1px solid #2a2a33',
                }}
              >
                <div className="text-3xl mb-3">{comp.icon}</div>
                <h3
                  className="text-lg font-bold mb-2 px-3 py-1 rounded-full inline-block"
                  style={{
                    backgroundColor: 'rgba(249,115,22,0.12)',
                    color: '#f97316',
                  }}
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

      {/* ── Key Features ── */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#0e0e11' }}>
        <div className="max-w-6xl mx-auto">
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-widest"
              style={{
                backgroundColor: 'rgba(249,115,22,0.1)',
                color: '#f97316',
                border: '1px solid rgba(249,115,22,0.2)',
              }}
            >
              {t('otc.features_badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#f1f1f3' }}>
              {t('otc.features_title')}
            </h2>
          </div>

          <div className="mb-14 grid md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div
                key={p.titleKey}
                className="rounded-2xl p-7"
                style={{
                  backgroundColor: '#1a1a1f',
                  border: '1px solid #2a2a33',
                }}
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
                    <li
                      key={ik}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: '#d1d5db' }}
                    >
                      <span style={{ color: '#f97316', marginTop: 2 }}>•</span>
                      {t(ik)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {/* ── 카드 SPD-A: 신속성 - 실시간 탐지 ── */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid #2a2a33', backgroundColor: '#1a1a1f' }}
            >
              <div className="px-6 pt-6 pb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: 'rgba(249,115,22,0.15)',
                      color: '#f97316',
                      border: '1px solid rgba(249,115,22,0.35)',
                    }}
                  >
                    {t('otc.feat_spd')}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-6" style={{ color: '#f1f1f3' }}>
                  {t('otc.feat_card_spd1_title')}
                </h3>

                {/* 플로우차트 */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  {/* 장애 발생 */}
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                      style={{
                        backgroundColor: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.3)',
                      }}
                    >
                      ⚠️
                    </div>
                    <span className="text-xs font-semibold" style={{ color: '#ef4444' }}>
                      {t('otc.feat_card_spd1_fault')}
                    </span>
                  </div>

                  {/* 화살표 */}
                  <span style={{ color: '#f97316', fontSize: '1.2rem' }}>→</span>

                  {/* ① 실시간 인지 + 관리자 */}
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                      style={{
                        backgroundColor: 'rgba(249,115,22,0.1)',
                        border: '1px solid rgba(249,115,22,0.3)',
                      }}
                    >
                      👨‍💻
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold" style={{ color: '#f97316' }}>
                        ① {t('otc.feat_card_spd1_s1')}
                      </div>
                      <div className="text-xs" style={{ color: '#9ca3af' }}>
                        {t('otc.feat_card_spd1_s1_label')}
                      </div>
                    </div>
                  </div>

                  <span style={{ color: '#f97316', fontSize: '1.2rem' }}>→</span>

                  {/* ② 관리자 원인확인 */}
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                      style={{
                        backgroundColor: 'rgba(249,115,22,0.1)',
                        border: '1px solid rgba(249,115,22,0.3)',
                      }}
                    >
                      🔍
                    </div>
                    <div className="text-xs font-semibold text-center" style={{ color: '#f97316' }}>
                      ② {t('otc.feat_card_spd1_s2')}
                    </div>
                  </div>

                  <span style={{ color: '#f97316', fontSize: '1.2rem' }}>→</span>

                  {/* ③ 제조사 통보 */}
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                      style={{
                        backgroundColor: 'rgba(249,115,22,0.1)',
                        border: '1px solid rgba(249,115,22,0.3)',
                      }}
                    >
                      📢
                    </div>
                    <div className="text-xs font-semibold text-center" style={{ color: '#f97316' }}>
                      ③ {t('otc.feat_card_spd1_s3')}
                    </div>
                  </div>

                  <span style={{ color: '#f97316', fontSize: '1.2rem' }}>→</span>

                  {/* ④ 분석 리포트 제공 + 조치 */}
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                      style={{
                        backgroundColor: 'rgba(249,115,22,0.1)',
                        border: '1px solid rgba(249,115,22,0.3)',
                      }}
                    >
                      ⚙️
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold" style={{ color: '#f97316' }}>
                        ④ {t('otc.feat_card_spd1_s4')}
                      </div>
                      <div className="text-xs" style={{ color: '#9ca3af' }}>
                        {t('otc.feat_card_spd1_s4_label')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 카드 SPD-B: 신속성 - 실시간 성능 모니터링 ── */}
            <div
              className="rounded-2xl p-6"
              style={{ border: '1px solid #2a2a33', backgroundColor: '#1a1a1f' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: 'rgba(249,115,22,0.15)',
                    color: '#f97316',
                    border: '1px solid rgba(249,115,22,0.35)',
                  }}
                >
                  {t('otc.feat_spd')}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-5" style={{ color: '#f1f1f3' }}>
                {t('otc.feat_card_spd2_title')}
              </h3>
              <div className="space-y-3">
                {(['otc.feat_card_spd2_p1', 'otc.feat_card_spd2_p2'] as string[]).map((key) => (
                  <div key={key} className="flex items-start gap-2">
                    <span className="text-sm mt-0.5 shrink-0" style={{ color: '#f97316' }}>
                      ✓
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                      {t(key)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 카드 1: 정확성 - 장애분석기술 ── */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid #2a2a33', backgroundColor: '#1a1a1f' }}
            >
              {/* 카드 헤더 */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: 'rgba(139,92,246,0.15)',
                      color: '#a78bfa',
                      border: '1px solid rgba(139,92,246,0.3)',
                    }}
                  >
                    {t('otc.feat_acc')}
                  </span>
                </div>
                <h3 className="text-lg font-bold" style={{ color: '#f1f1f3' }}>
                  {t('otc.feat_card1_title')}
                </h3>
              </div>

              {/* 장애 유형 별 */}
              <div className="mx-6 mb-0">
                <div className="px-4 py-2 rounded-t-lg" style={{ backgroundColor: '#111114' }}>
                  <span className="text-base font-bold" style={{ color: '#ffffff' }}>
                    {t('otc.feat_card1_type_label')}
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  {(
                    [
                      {
                        titleKey: 'otc.feat_card1_type1_title',
                        descKey: 'otc.feat_card1_type1_desc',
                      },
                      {
                        titleKey: 'otc.feat_card1_type2_title',
                        descKey: 'otc.feat_card1_type2_desc',
                      },
                      {
                        titleKey: 'otc.feat_card1_type3_title',
                        descKey: 'otc.feat_card1_type3_desc',
                      },
                    ] as { titleKey: string; descKey: string }[]
                  ).map((item, idx) => (
                    <div
                      key={item.titleKey}
                      className="p-4"
                      style={{
                        backgroundColor: '#1a1a1f',
                        borderRight: idx < 2 ? '1px solid #2a2a33' : 'none',
                      }}
                    >
                      <span
                        className="inline-block text-sm font-semibold px-2 py-0.5 rounded mb-2"
                        style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316' }}
                      >
                        {t(item.titleKey)}
                      </span>
                      <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>
                        {t(item.descKey)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 솔루션 별 */}
              <div className="mx-6 mb-6 mt-px">
                <div className="px-4 py-2" style={{ backgroundColor: '#111114' }}>
                  <span className="text-base font-bold" style={{ color: '#ffffff' }}>
                    {t('otc.feat_card1_sol_label')}
                  </span>
                </div>
                <div className="grid grid-cols-3 rounded-b-lg overflow-hidden">
                  {(
                    [
                      'otc.feat_card1_sol1_desc',
                      'otc.feat_card1_sol2_desc',
                      'otc.feat_card1_sol3_desc',
                    ] as string[]
                  ).map((descKey, idx) => (
                    <div
                      key={descKey}
                      className="p-4"
                      style={{
                        backgroundColor: '#1a1a1f',
                        borderRight: idx < 2 ? '1px solid #2a2a33' : 'none',
                      }}
                    >
                      <span
                        className="inline-block text-sm font-semibold px-2 py-0.5 rounded mb-2"
                        style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316' }}
                      >
                        {t('otc.feat_card1_sol_badge')}
                      </span>
                      <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>
                        {t(descKey)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 하단 요약 */}
              <div
                className="grid md:grid-cols-2 gap-px"
                style={{ backgroundColor: '#2a2a33', borderTop: '1px solid #2a2a33' }}
              >
                <div className="p-6" style={{ backgroundColor: '#111114' }}>
                  <p className="text-sm font-bold mb-4" style={{ color: '#f1f1f3' }}>
                    {t('otc.feat_card1_summary_title')}
                  </p>
                  {(
                    [
                      'otc.feat_card1_summary_p1',
                      'otc.feat_card1_summary_p2',
                      'otc.feat_card1_summary_p3',
                    ] as string[]
                  ).map((key) => (
                    <div key={key} className="flex items-start gap-2 mb-2">
                      <span className="text-xs mt-0.5" style={{ color: '#f97316' }}>
                        ✓
                      </span>
                      <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>
                        {t(key)}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className="p-6 flex flex-col justify-center gap-3"
                  style={{
                    backgroundColor: 'rgba(249,115,22,0.06)',
                    borderLeft: '1px solid rgba(249,115,22,0.2)',
                  }}
                >
                  {(
                    [
                      {
                        preKey: 'otc.feat_card1_result1_pre',
                        boldKey: 'otc.feat_card1_result1_bold',
                      },
                      {
                        preKey: 'otc.feat_card1_result2_pre',
                        boldKey: 'otc.feat_card1_result2_bold',
                      },
                    ] as { preKey: string; boldKey: string }[]
                  ).map((item) => (
                    <div key={item.boldKey} className="flex items-start gap-2">
                      <span className="text-sm mt-0.5 shrink-0" style={{ color: '#f97316' }}>
                        ✓
                      </span>
                      <p className="text-sm leading-relaxed" style={{ color: '#d1d5db' }}>
                        {t(item.preKey)}
                        <strong style={{ color: '#f1f1f3' }}>{t(item.boldKey)}</strong>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 카드 2: 정확성 - 신뢰성 있는 분석자료 ── */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid #2a2a33', backgroundColor: '#1a1a1f' }}
            >
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: 'rgba(139,92,246,0.15)',
                      color: '#a78bfa',
                      border: '1px solid rgba(139,92,246,0.3)',
                    }}
                  >
                    {t('otc.feat_acc')}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#f1f1f3' }}>
                  {t('otc.feat_card2_title')}
                </h3>
                {(['otc.feat_card2_p1', 'otc.feat_card2_p2'] as string[]).map((key) => (
                  <div key={key} className="flex items-start gap-2 mb-2">
                    <span className="text-sm mt-0.5 shrink-0" style={{ color: '#f97316' }}>
                      ✓
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                      {t(key)}
                    </p>
                  </div>
                ))}
              </div>
              <div
                className="grid md:grid-cols-2 gap-px"
                style={{ backgroundColor: '#2a2a33', borderTop: '1px solid #2a2a33' }}
              >
                <div className="p-6" style={{ backgroundColor: '#111114' }}>
                  <p className="text-sm font-bold mb-4" style={{ color: '#f1f1f3' }}>
                    {t('otc.feat_card2_ai_title')}
                  </p>
                  {(['otc.feat_card2_ai_p1', 'otc.feat_card2_ai_p2'] as string[]).map((key) => (
                    <div key={key} className="flex items-start gap-2 mb-2">
                      <span className="text-xs mt-0.5" style={{ color: '#f97316' }}>
                        ✓
                      </span>
                      <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>
                        {t(key)}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className="p-6 flex flex-col justify-center gap-3"
                  style={{
                    backgroundColor: 'rgba(249,115,22,0.06)',
                    borderLeft: '1px solid rgba(249,115,22,0.2)',
                  }}
                >
                  {(['otc.feat_card2_result1', 'otc.feat_card2_result2'] as string[]).map((key) => (
                    <div key={key} className="flex items-start gap-2">
                      <span className="text-sm mt-0.5 shrink-0" style={{ color: '#f97316' }}>
                        ✓
                      </span>
                      <p
                        className="text-sm font-semibold leading-relaxed"
                        style={{ color: '#f1f1f3' }}
                      >
                        {t(key)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 카드 3·4: 안정성 ── */}
            <div className="grid md:grid-cols-2 gap-6">
              {(
                [
                  {
                    titleKey: 'otc.feat_card3_title',
                    points: ['otc.feat_card3_p1', 'otc.feat_card3_p2'],
                  },
                  {
                    titleKey: 'otc.feat_card4_title',
                    points: ['otc.feat_card4_p1', 'otc.feat_card4_p2'],
                  },
                ] as { titleKey: string; points: string[] }[]
              ).map((card) => (
                <div
                  key={card.titleKey}
                  className="rounded-2xl p-6"
                  style={{ border: '1px solid #2a2a33', backgroundColor: '#1a1a1f' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: 'rgba(16,185,129,0.15)',
                        color: '#34d399',
                        border: '1px solid rgba(16,185,129,0.3)',
                      }}
                    >
                      {t('otc.feat_sta')}
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-5" style={{ color: '#f1f1f3' }}>
                    {t(card.titleKey)}
                  </h3>
                  <div className="space-y-3">
                    {card.points.map((key) => (
                      <div key={key} className="flex items-start gap-2">
                        <span className="text-sm mt-0.5 shrink-0" style={{ color: '#f97316' }}>
                          ✓
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                          {t(key)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Manager Features (주요 기능) ── */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-6xl mx-auto">
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-widest"
              style={{
                backgroundColor: 'rgba(249,115,22,0.1)',
                color: '#f97316',
                border: '1px solid rgba(249,115,22,0.2)',
              }}
            >
              {t('otc.mgr_badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#f1f1f3' }}>
              {t('otc.mgr_title')}
            </h2>
          </div>

          {/* 캐러셀(2/3) + 설명(1/3) */}
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* 왼쪽: 캐러셀 (2/3) */}
            <div className="lg:col-span-2 flex items-center gap-3">
              {/* 왼쪽 chevron */}
              <button
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all z-10"
                style={{
                  backgroundColor: 'rgba(249,115,22,0.1)',
                  color: '#f97316',
                  border: '1px solid rgba(249,115,22,0.3)',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = 'rgba(249,115,22,0.22)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'rgba(249,115,22,0.1)')
                }
                onClick={mgrPrev}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* 슬라이드 트랙
                  가운데: width=66.67%, left=16.67%, top=0%, height=100%
                  왼쪽:   width=16.67%, left=8.335%, top=25%, height=50%
                          → 범위 8.335~25%, 가운데가 16.67~25% 가림 = 정확히 50% 가려짐
                  오른쪽: width=16.67%, left=75%,    top=25%, height=50%
                          → 범위 75~91.67%, 가운데가 75~83.33% 가림 = 정확히 50% 가려짐
              */}
              <div
                className="flex-1 relative overflow-hidden rounded-xl"
                style={{ paddingBottom: '37.5%' }}
              >
                {managerItems.map((item, i) => {
                  const slot = getSlot(i);
                  const isCenter = slot === 0;
                  const isLeft = slot === -1;
                  const isRight = slot === 1;
                  const visible = isCenter || isLeft || isRight;

                  const left = isLeft
                    ? '8.335%'
                    : isCenter
                      ? '16.67%'
                      : isRight
                        ? '75%'
                        : slot < 0
                          ? '-25%'
                          : '110%';

                  const width = isCenter ? '66.67%' : '16.67%';
                  const height = isCenter ? '100%' : '50%';
                  const top = isCenter ? '0' : '25%';

                  return (
                    <div
                      key={i}
                      onClick={
                        isLeft   ? mgrPrev :
                        isRight  ? mgrNext :
                        isCenter ? () => openLightbox(item.img) :
                        undefined
                      }
                      style={{
                        position: 'absolute',
                        top,
                        left,
                        width,
                        height,
                        zIndex: isCenter ? 3 : 1,
                        opacity: isCenter ? 1 : visible ? 0.5 : 0,
                        cursor: isCenter ? 'zoom-in' : (isLeft || isRight) ? 'pointer' : 'default',
                        transition:
                          'left 0.45s cubic-bezier(0.4,0,0.2,1), width 0.45s cubic-bezier(0.4,0,0.2,1), height 0.45s cubic-bezier(0.4,0,0.2,1), top 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        border: isCenter
                          ? '2px solid rgba(249,115,22,0.55)'
                          : '2px solid transparent',
                        boxShadow: isCenter ? '0 0 24px rgba(249,115,22,0.18)' : 'none',
                      }}
                      className="px-1 bg-white"
                    >
                      <img
                        src={item.img}
                        alt={isCenter ? t(item.titleKey) : ''}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          display: 'block',
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* 오른쪽 chevron */}
              <button
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all z-10"
                style={{
                  backgroundColor: 'rgba(249,115,22,0.1)',
                  color: '#f97316',
                  border: '1px solid rgba(249,115,22,0.3)',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = 'rgba(249,115,22,0.22)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'rgba(249,115,22,0.1)')
                }
                onClick={mgrNext}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* 오른쪽: 선택된 아이템 설명 (1/3) */}
            <div
              className="lg:col-span-1 rounded-2xl p-6"
              style={{ backgroundColor: '#1a1a1f', border: '1px solid rgba(249,115,22,0.25)' }}
            >
              {/* 인디케이터 */}
              <div className="flex items-center gap-1.5 mb-4">
                {managerItems.map((_, i) => (
                  <button
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === mgrIdx ? '20px' : '6px',
                      height: '6px',
                      backgroundColor: i === mgrIdx ? '#f97316' : '#374151',
                    }}
                    onClick={() => setMgrIdx(i)}
                  />
                ))}
              </div>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#f97316' }}>
                {t(managerItems[mgrIdx].titleKey)}
              </h3>
              <ul className="space-y-3">
                {managerItems[mgrIdx].contentKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5" style={{ color: '#f97316' }}>
                      ✦
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                      {t(key)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Expected Impact ── */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-widest"
              style={{
                backgroundColor: 'rgba(249,115,22,0.1)',
                color: '#f97316',
                border: '1px solid rgba(249,115,22,0.2)',
              }}
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
                  {['otc.impact_col1', 'otc.impact_col2', 'otc.impact_col3', 'otc.impact_col4'].map(
                    (col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left font-semibold"
                        style={{
                          color: '#f1f1f3',
                          borderBottom: '1px solid #2a2a33',
                        }}
                      >
                        {t(col)}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {impactRows.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: i < impactRows.length - 1 ? '1px solid #1f1f27' : undefined,
                    }}
                  >
                    <td className="px-4 py-3 font-semibold" style={{ color: '#f97316' }}>
                      {t(row[0])}
                    </td>
                    <td className="px-4 py-3" style={{ color: '#6b7280' }}>
                      {t(row[1])}
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{ color: '#f1f1f3' }}>
                      {t(row[2])}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: '#9ca3af' }}>
                      {t(row[3])}
                    </td>
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
              style={{
                backgroundColor: 'rgba(249,115,22,0.1)',
                color: '#f97316',
                border: '1px solid rgba(249,115,22,0.2)',
              }}
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
                  <th
                    className="px-4 py-3 text-left font-semibold"
                    style={{
                      color: '#9ca3af',
                      borderBottom: '1px solid #2a2a33',
                    }}
                  >
                    {t('otc.cmp_col_category')}
                  </th>
                  <th
                    className="px-4 py-3 text-left font-semibold"
                    style={{
                      color: '#9ca3af',
                      borderBottom: '1px solid #2a2a33',
                    }}
                  >
                    {t('otc.cmp_col_item')}
                  </th>
                  <th
                    className="px-4 py-3 text-center font-black"
                    style={{
                      color: '#f97316',
                      borderBottom: '1px solid #2a2a33',
                    }}
                  >
                    OrangeLabs
                  </th>
                  <th
                    className="px-4 py-3 text-center font-semibold"
                    style={{
                      color: '#9ca3af',
                      borderBottom: '1px solid #2a2a33',
                    }}
                  >
                    N社
                  </th>
                  <th
                    className="px-4 py-3 text-center font-semibold"
                    style={{
                      color: '#9ca3af',
                      borderBottom: '1px solid #2a2a33',
                    }}
                  >
                    T社
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: i < compareRows.length - 1 ? '1px solid #1f1f27' : undefined,
                    }}
                  >
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded text-xs font-semibold"
                        style={{
                          backgroundColor: 'rgba(249,115,22,0.1)',
                          color: '#f97316',
                        }}
                      >
                        {t(row.categoryKey)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: '#d1d5db' }}>
                      {t(row.itemKey)}
                    </td>
                    <td
                      className="px-4 py-3 text-center font-bold text-base"
                      style={{ color: '#f97316' }}
                    >
                      {row.orangeLabs ? t('otc.cmp_provided') : t('otc.cmp_unavailable')}
                    </td>
                    <td
                      className="px-4 py-3 text-center text-xs"
                      style={{
                        color:
                          row.n === true ? '#9ca3af' : row.n === 'partial' ? '#9ca3af' : '#374151',
                      }}
                    >
                      {row.n === true
                        ? t('otc.cmp_provided')
                        : row.n === 'partial'
                          ? t('otc.cmp_partial')
                          : t('otc.cmp_unavailable')}
                    </td>
                    <td
                      className="px-4 py-3 text-center text-xs"
                      style={{
                        color:
                          row.t === true ? '#9ca3af' : row.t === 'partial' ? '#9ca3af' : '#374151',
                      }}
                    >
                      {row.t === true
                        ? t('otc.cmp_provided')
                        : row.t === 'partial'
                          ? t('otc.cmp_partial')
                          : t('otc.cmp_unavailable')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="rounded-xl px-6 py-4 flex items-start gap-3"
            style={{
              backgroundColor: 'rgba(249,115,22,0.06)',
              border: '1px solid rgba(249,115,22,0.2)',
            }}
          >
            <span className="text-lg mt-0.5">💡</span>
            <div>
              <span className="font-bold text-sm" style={{ color: '#f97316' }}>
                {t('otc.compare_key')}{' '}
              </span>
              <span className="text-sm" style={{ color: '#d1d5db' }}>
                {t('otc.compare_key_desc')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 text-center" style={{ backgroundColor: '#0e0e11' }}>
        <div
          className="max-w-2xl mx-auto rounded-2xl px-8 py-12"
          style={{
            background:
              'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(249,115,22,0.03) 100%)',
            border: '1px solid rgba(249,115,22,0.2)',
          }}
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
              style={{
                border: '1px solid rgba(249,115,22,0.5)',
                color: '#f97316',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  'rgba(249,115,22,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
              }}
            >
              {t('otc.cta_btn2')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
