import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const axisIcon1 = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
    />
  </svg>
);
const axisIcon2 = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    />
  </svg>
);
const axisIcon3 = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
    />
  </svg>
);
const axisIcon4 = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
    />
  </svg>
);

const pillars = [
  {
    label: '성능',
    titleKey: 'home.kf1_title',
    descKey: 'home.kf1_desc',
    num: '01',
    main: '#60a5fa',
    bg: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.35)',
    icon: axisIcon1,
  },
  {
    label: '증상',
    titleKey: 'home.kf2_title',
    descKey: 'home.kf2_desc',
    num: '02',
    main: '#f87171',
    bg: 'rgba(239,68,68,0.12)',
    border: 'rgba(239,68,68,0.35)',
    icon: axisIcon2,
  },
  {
    label: '1:1',
    titleKey: 'home.kf3_title',
    descKey: 'home.kf3_desc',
    num: '03',
    main: '#c084fc',
    bg: 'rgba(168,85,247,0.12)',
    border: 'rgba(168,85,247,0.35)',
    icon: axisIcon3,
  },
  {
    label: '1:N',
    titleKey: 'home.kf4_title',
    descKey: 'home.kf4_desc',
    num: '04',
    main: '#4ade80',
    bg: 'rgba(34,197,94,0.12)',
    border: 'rgba(34,197,94,0.35)',
    icon: axisIcon4,
  },
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
  const [lbOpen, setLbOpen] = useState(false);
  const [lbSrc, setLbSrc] = useState('');
  const [lbZoom, setLbZoom] = useState(1);
  const [lbPos, setLbPos] = useState({ x: 0, y: 0 });
  const lbDragging = useRef(false);
  const lbDragStart = useRef({ mx: 0, my: 0, ix: 0, iy: 0 });

  const openLightbox = (src: string) => {
    setLbSrc(src);
    setLbZoom(1);
    setLbPos({ x: 0, y: 0 });
    setLbOpen(true);
  };
  const closeLightbox = () => setLbOpen(false);
  const lbZoomIn = () => setLbZoom((z) => Math.min(+(z + 0.25).toFixed(2), 4));
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
  const lbMouseUp = () => {
    lbDragging.current = false;
  };

  const lbWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setLbZoom((z) => {
      const next = z - e.deltaY * 0.001;
      return Math.min(Math.max(+next.toFixed(2), 0.25), 4);
    });
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)' }}>
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
              style={{
                maxWidth: '88vw',
                maxHeight: '82vh',
                display: 'block',
                borderRadius: '8px',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* 상단 우측: 닫기 버튼 */}
          <button
            className="absolute top-5 right-5 flex items-center justify-center rounded-full transition-all"
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--overlay-mid)',
              color: '#fff',
              zIndex: 2,
              border: '1px solid var(--overlay-strong)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--overlay-strong)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--overlay-mid)')}
            onClick={closeLightbox}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* 하단 중앙: 확대/축소 컨트롤 */}
          <div
            className="absolute bottom-6 flex items-center gap-3 px-4 py-2 rounded-full"
            style={{
              zIndex: 2,
              backgroundColor: 'rgba(0,0,0,0.6)',
              border: '1px solid var(--overlay-mid)',
            }}
          >
            <button
              className="flex items-center justify-center rounded-full transition-all"
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'var(--overlay-mid)',
                color: '#fff',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--overlay-strong)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--overlay-mid)')
              }
              onClick={lbZoomOut}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
            </button>
            <span
              className="text-sm font-semibold tabular-nums"
              style={{ color: 'var(--fg-strong)', minWidth: '44px', textAlign: 'center' }}
            >
              {Math.round(lbZoom * 100)}%
            </span>
            <button
              className="flex items-center justify-center rounded-full transition-all"
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'var(--overlay-mid)',
                color: '#fff',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--overlay-strong)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--overlay-mid)')
              }
              onClick={lbZoomIn}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <div
              style={{ width: '1px', height: '20px', backgroundColor: 'var(--overlay-strong)' }}
            />
            <button
              className="flex items-center justify-center rounded-full transition-all"
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'var(--overlay-mid)',
                color: '#fff',
              }}
              title="원래 크기"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--overlay-strong)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--overlay-mid)')
              }
              onClick={() => {
                setLbZoom(1);
                setLbPos({ x: 0, y: 0 });
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8V4h4M16 4h4v4M4 16v4h4M16 20h4v-4"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* ── Hero ── */}
      <section
        className="py-24 px-4 sm:px-6"
        style={{
          background: 'linear-gradient(135deg, var(--bg) 0%, var(--surface) 100%)',
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
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-12 items-center">
            {/* 좌측: 텍스트 콘텐츠 */}
            <div className="text-center lg:text-left">
              <div
                className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-widest"
                style={{
                  backgroundColor: 'rgba(249,115,22,0.1)',
                  color: 'var(--accent)',
                  border: '1px solid rgba(249,115,22,0.3)',
                }}
              >
                {t('otc.hero_badge')}
              </div>
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-3"
                style={{ color: 'var(--fg)' }}
              >
                {t('otc.hero_title')}
              </h1>
              <p
                className="text-lg max-w-2xl mx-auto lg:mx-0 mb-8"
                style={{ color: 'var(--fg-muted)', lineHeight: '1.8' }}
              >
                {t('otc.hero_desc')}
              </p>
              <div
                className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 text-xs mb-10"
                style={{ color: 'var(--fg-muted)' }}
              >
                <span>{t('home.badges_gs')}</span>
                <span aria-hidden="true">·</span>
                <span>{t('home.badges_tips')}</span>
                <span aria-hidden="true">·</span>
                <span>{t('home.badges_g2b')}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/pdf/OrangeTheClient_Product_Introduction.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full text-base font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(249,115,22,0.5)',
                    color: 'var(--accent)',
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

            {/* 우측: 박스 이미지 */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="/images/orangebox_gs.png"
                alt="Orange The Client"
                className="w-full max-w-sm h-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(249,115,22,0.25))',
                }}
              />
            </div>
          </div>
        </div>
      </section>


      {/* ── Key Features ── */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: 'var(--bg-deep)' }}>
        <div className="max-w-6xl mx-auto">
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-widest"
              style={{
                backgroundColor: 'rgba(249,115,22,0.1)',
                color: 'var(--accent)',
                border: '1px solid rgba(249,115,22,0.2)',
              }}
            >
              {t('otc.features_badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--fg)' }}>
              {t('otc.features_title')}
            </h2>
          </div>

          <div className="mb-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div
                key={p.num}
                className="relative p-6 rounded-2xl transition-all duration-300 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${p.bg} 0%, var(--surface) 55%)`,
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = p.border;
                  e.currentTarget.style.boxShadow = `0 12px 40px -12px ${p.main}55`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="absolute top-4 right-5 text-5xl font-black pointer-events-none select-none"
                  style={{
                    color: p.main,
                    opacity: 0.12,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {p.num}
                </div>

                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${p.bg} 0%, rgba(0,0,0,0.12) 100%)`,
                        color: p.main,
                        boxShadow: `inset 0 0 0 1px ${p.border}`,
                      }}
                    >
                      {p.icon}
                    </div>
                    <div
                      className="text-xs font-bold"
                      style={{ color: p.main, letterSpacing: '0.18em' }}
                    >
                      {p.label}
                    </div>
                  </div>

                  <div>
                    <h3
                      className="text-base font-bold mb-2"
                      style={{ color: 'var(--fg)', letterSpacing: '-0.01em' }}
                    >
                      {t(p.titleKey)}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                      {t(p.descKey)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 pt-4 pb-1">
              <div className="h-1 w-8 rounded-full" style={{ backgroundColor: '#60a5fa' }} />
              <div className="text-xs font-bold tracking-widest" style={{ color: '#60a5fa', letterSpacing: '0.22em' }}>
                성능
              </div>
            </div>
            {/* ── 카드 SPD-B: 신속성 - 실시간 성능 모니터링 ── */}
            <div
              className="rounded-2xl p-6"
              style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: 'rgba(249,115,22,0.15)',
                    color: 'var(--accent)',
                    border: '1px solid rgba(249,115,22,0.35)',
                  }}
                >
                  {t('otc.feat_spd')}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-5" style={{ color: 'var(--fg)' }}>
                {t('otc.feat_card_spd2_title')}
              </h3>
              <div className="space-y-3">
                {(['otc.feat_card_spd2_p1', 'otc.feat_card_spd2_p2'] as string[]).map((key) => (
                  <div key={key} className="flex items-start gap-2">
                    <span className="text-sm mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>
                      —
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                      {t(key)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 pb-1">
              <div className="h-1 w-8 rounded-full" style={{ backgroundColor: '#f87171' }} />
              <div className="text-xs font-bold tracking-widest" style={{ color: '#f87171', letterSpacing: '0.22em' }}>
                증상
              </div>
            </div>
            {/* ── 카드 SPD-A: 신속성 - 실시간 탐지 ── */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
            >
              <div className="px-6 pt-6 pb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: 'rgba(249,115,22,0.15)',
                      color: 'var(--accent)',
                      border: '1px solid rgba(249,115,22,0.35)',
                    }}
                  >
                    {t('otc.feat_spd')}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--fg)' }}>
                  {t('otc.feat_card_spd1_title')}
                </h3>

                {/* 플로우차트 */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  {/* 장애 발생 */}
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold"
                      style={{
                        backgroundColor: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.3)',
                        color: '#ef4444',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      00
                    </div>
                    <span className="text-xs font-semibold" style={{ color: '#ef4444' }}>
                      {t('otc.feat_card_spd1_fault')}
                    </span>
                  </div>

                  {/* 화살표 */}
                  <span style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>→</span>

                  {/* ① 실시간 인지 + 관리자 */}
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold"
                      style={{
                        backgroundColor: 'rgba(249,115,22,0.1)',
                        border: '1px solid rgba(249,115,22,0.3)',
                        color: 'var(--accent)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      01
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                        {t('otc.feat_card_spd1_s1')}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                        {t('otc.feat_card_spd1_s1_label')}
                      </div>
                    </div>
                  </div>

                  <span style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>→</span>

                  {/* ② 관리자 원인확인 */}
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold"
                      style={{
                        backgroundColor: 'rgba(249,115,22,0.1)',
                        border: '1px solid rgba(249,115,22,0.3)',
                        color: 'var(--accent)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      02
                    </div>
                    <div className="text-xs font-semibold text-center" style={{ color: 'var(--accent)' }}>
                      {t('otc.feat_card_spd1_s2')}
                    </div>
                  </div>

                  <span style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>→</span>

                  {/* ③ 제조사 통보 */}
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold"
                      style={{
                        backgroundColor: 'rgba(249,115,22,0.1)',
                        border: '1px solid rgba(249,115,22,0.3)',
                        color: 'var(--accent)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      03
                    </div>
                    <div className="text-xs font-semibold text-center" style={{ color: 'var(--accent)' }}>
                      {t('otc.feat_card_spd1_s3')}
                    </div>
                  </div>

                  <span style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>→</span>

                  {/* ④ 분석 리포트 제공 + 조치 */}
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold"
                      style={{
                        backgroundColor: 'rgba(249,115,22,0.1)',
                        border: '1px solid rgba(249,115,22,0.3)',
                        color: 'var(--accent)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      04
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                        {t('otc.feat_card_spd1_s4')}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                        {t('otc.feat_card_spd1_s4_label')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 카드 1: 정확성 - 장애분석기술 ── */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
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
                <h3 className="text-lg font-bold" style={{ color: 'var(--fg)' }}>
                  {t('otc.feat_card1_title')}
                </h3>
              </div>

              {/* 장애 유형 별 */}
              <div className="mx-6 mb-0">
                <div className="px-4 py-2 rounded-t-lg" style={{ backgroundColor: 'var(--bg)' }}>
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
                        backgroundColor: 'var(--surface)',
                        borderRight: idx < 2 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      <span
                        className="inline-block text-sm font-semibold px-2 py-0.5 rounded mb-2"
                        style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: 'var(--accent)' }}
                      >
                        {t(item.titleKey)}
                      </span>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                        {t(item.descKey)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 솔루션 별 */}
              <div className="mx-6 mb-6 mt-px">
                <div className="px-4 py-2" style={{ backgroundColor: 'var(--bg)' }}>
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
                        backgroundColor: 'var(--surface)',
                        borderRight: idx < 2 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      <span
                        className="inline-block text-sm font-semibold px-2 py-0.5 rounded mb-2"
                        style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: 'var(--accent)' }}
                      >
                        {t('otc.feat_card1_sol_badge')}
                      </span>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                        {t(descKey)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 하단 요약 */}
              <div
                className="grid md:grid-cols-2 gap-px"
                style={{ backgroundColor: 'var(--border)', borderTop: '1px solid var(--border)' }}
              >
                <div className="p-6" style={{ backgroundColor: 'var(--bg)' }}>
                  <p className="text-sm font-bold mb-4" style={{ color: 'var(--fg)' }}>
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
                      <span className="text-xs mt-0.5" style={{ color: 'var(--accent)' }}>
                        —
                      </span>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
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
                      <span className="text-sm mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>
                        —
                      </span>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-strong)' }}>
                        {t(item.preKey)}
                        <strong style={{ color: 'var(--fg)' }}>{t(item.boldKey)}</strong>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 카드 2: 정확성 - 신뢰성 있는 분석자료 ── */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
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
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>
                  {t('otc.feat_card2_title')}
                </h3>
                {(['otc.feat_card2_p1', 'otc.feat_card2_p2'] as string[]).map((key) => (
                  <div key={key} className="flex items-start gap-2 mb-2">
                    <span className="text-sm mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>
                      —
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                      {t(key)}
                    </p>
                  </div>
                ))}
              </div>
              <div
                className="grid md:grid-cols-2 gap-px"
                style={{ backgroundColor: 'var(--border)', borderTop: '1px solid var(--border)' }}
              >
                <div className="p-6" style={{ backgroundColor: 'var(--bg)' }}>
                  <p className="text-sm font-bold mb-4" style={{ color: 'var(--fg)' }}>
                    {t('otc.feat_card2_ai_title')}
                  </p>
                  {(['otc.feat_card2_ai_p1', 'otc.feat_card2_ai_p2'] as string[]).map((key) => (
                    <div key={key} className="flex items-start gap-2 mb-2">
                      <span className="text-xs mt-0.5" style={{ color: 'var(--accent)' }}>
                        —
                      </span>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
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
                      <span className="text-sm mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>
                        —
                      </span>
                      <p
                        className="text-sm font-semibold leading-relaxed"
                        style={{ color: 'var(--fg)' }}
                      >
                        {t(key)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 pb-1">
              <div className="h-1 w-8 rounded-full" style={{ backgroundColor: '#4ade80' }} />
              <div className="text-xs font-bold tracking-widest" style={{ color: '#4ade80', letterSpacing: '0.22em' }}>
                1:N
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
                  style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
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
                  <h3 className="text-base font-bold mb-5" style={{ color: 'var(--fg)' }}>
                    {t(card.titleKey)}
                  </h3>
                  <div className="space-y-3">
                    {card.points.map((key) => (
                      <div key={key} className="flex items-start gap-2">
                        <span className="text-sm mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>
                          —
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
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
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto">
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-widest"
              style={{
                backgroundColor: 'rgba(249,115,22,0.1)',
                color: 'var(--accent)',
                border: '1px solid rgba(249,115,22,0.2)',
              }}
            >
              {t('otc.mgr_badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: 'var(--fg)' }}>
              {t('otc.mgr_title')}
            </h2>
            <p className="max-w-2xl mx-auto text-sm" style={{ color: 'var(--fg-muted)' }}>
              {t('otc.mgr_desc')}
            </p>
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
                  color: 'var(--accent)',
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
                        isLeft
                          ? mgrPrev
                          : isRight
                            ? mgrNext
                            : isCenter
                              ? () => openLightbox(item.img)
                              : undefined
                      }
                      style={{
                        position: 'absolute',
                        top,
                        left,
                        width,
                        height,
                        zIndex: isCenter ? 3 : 1,
                        opacity: isCenter ? 1 : visible ? 0.5 : 0,
                        cursor: isCenter ? 'zoom-in' : isLeft || isRight ? 'pointer' : 'default',
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
                  color: 'var(--accent)',
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
              style={{ backgroundColor: 'var(--surface)', border: '1px solid rgba(249,115,22,0.25)' }}
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
                      backgroundColor: i === mgrIdx ? 'var(--accent)' : 'var(--fg-dimmer)',
                    }}
                    onClick={() => setMgrIdx(i)}
                  />
                ))}
              </div>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--accent)' }}>
                {t(managerItems[mgrIdx].titleKey)}
              </h3>
              <ul className="space-y-3">
                {managerItems[mgrIdx].contentKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2">
                    <span className="shrink-0 -mt-0.5" style={{ color: 'var(--accent)' }}>
                      *
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
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
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-widest"
              style={{
                backgroundColor: 'rgba(249,115,22,0.1)',
                color: 'var(--accent)',
                border: '1px solid rgba(249,115,22,0.2)',
              }}
            >
              {t('otc.impact_badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--fg)' }}>
              {t('otc.impact_title')}
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: 'var(--surface)' }}>
                  {['otc.impact_col1', 'otc.impact_col2', 'otc.impact_col3', 'otc.impact_col4'].map(
                    (col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left font-semibold"
                        style={{
                          color: 'var(--fg)',
                          borderBottom: '1px solid var(--border)',
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
                      borderBottom: i < impactRows.length - 1 ? '1px solid var(--surface-3)' : undefined,
                    }}
                  >
                    <td className="px-4 py-3 font-semibold" style={{ color: 'var(--accent)' }}>
                      {t(row[0])}
                    </td>
                    <td className="px-4 py-3" style={{ color: 'var(--fg-dim)' }}>
                      {t(row[1])}
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{ color: 'var(--fg)' }}>
                      {t(row[2])}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--fg-muted)' }}>
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
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: 'var(--bg-deep)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-widest"
              style={{
                backgroundColor: 'rgba(249,115,22,0.1)',
                color: 'var(--accent)',
                border: '1px solid rgba(249,115,22,0.2)',
              }}
            >
              {t('otc.compare_badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--fg)' }}>
              {t('otc.compare_title')}
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl mb-6" style={{ border: '1px solid var(--border)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: 'var(--surface)' }}>
                  <th
                    className="px-4 py-3 text-left font-semibold"
                    style={{
                      color: 'var(--fg-muted)',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    {t('otc.cmp_col_category')}
                  </th>
                  <th
                    className="px-4 py-3 text-left font-semibold"
                    style={{
                      color: 'var(--fg-muted)',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    {t('otc.cmp_col_item')}
                  </th>
                  <th
                    className="px-4 py-3 text-center font-black"
                    style={{
                      color: 'var(--accent)',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    OrangeLabs
                  </th>
                  <th
                    className="px-4 py-3 text-center font-semibold"
                    style={{
                      color: 'var(--fg-muted)',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    N社
                  </th>
                  <th
                    className="px-4 py-3 text-center font-semibold"
                    style={{
                      color: 'var(--fg-muted)',
                      borderBottom: '1px solid var(--border)',
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
                      borderBottom: i < compareRows.length - 1 ? '1px solid var(--surface-3)' : undefined,
                    }}
                  >
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded text-xs font-semibold"
                        style={{
                          backgroundColor: 'rgba(249,115,22,0.1)',
                          color: 'var(--accent)',
                        }}
                      >
                        {t(row.categoryKey)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--fg-strong)' }}>
                      {t(row.itemKey)}
                    </td>
                    <td
                      className="px-4 py-3 text-center font-bold text-base"
                      style={{ color: 'var(--accent)' }}
                    >
                      {row.orangeLabs ? t('otc.cmp_provided') : t('otc.cmp_unavailable')}
                    </td>
                    <td
                      className="px-4 py-3 text-center text-xs"
                      style={{
                        color:
                          row.n === true ? 'var(--fg-muted)' : row.n === 'partial' ? 'var(--fg-muted)' : 'var(--fg-dimmer)',
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
                          row.t === true ? 'var(--fg-muted)' : row.t === 'partial' ? 'var(--fg-muted)' : 'var(--fg-dimmer)',
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
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 text-center" style={{ backgroundColor: 'var(--bg-deep)' }}>
        <div
          className="max-w-2xl mx-auto rounded-2xl px-8 py-12"
          style={{
            background:
              'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(249,115,22,0.03) 100%)',
            border: '1px solid rgba(249,115,22,0.2)',
          }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
            {t('otc.cta_title')}
          </h2>
          <p className="mb-8 text-base" style={{ color: 'var(--fg-muted)' }}>
            {t('otc.cta_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/pdf/OrangeTheClient_Product_Introduction.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full font-semibold transition-all"
              style={{
                border: '1px solid rgba(249,115,22,0.5)',
                color: 'var(--accent)',
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
