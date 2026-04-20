import { useEffect, useRef, useState } from 'react';

type Node = { id: string; x: number; y: number };
type Line = { id: string; d: string; delay: number };

// 회로 교차점/종단점
const nodes: Node[] = [
  // 상단
  { id: 'n1', x: 80, y: 80 }, { id: 'n2', x: 200, y: 80 },
  { id: 'n3', x: 200, y: 160 }, { id: 'n4', x: 340, y: 160 },
  { id: 'n5', x: 340, y: 60 }, { id: 'n6', x: 460, y: 60 },
  { id: 'n7', x: 150, y: 40 }, { id: 'n8', x: 580, y: 120 },
  { id: 'n9', x: 700, y: 80 }, { id: 'n10', x: 760, y: 80 },
  { id: 'n11', x: 900, y: 80 }, { id: 'n12', x: 900, y: 180 },
  { id: 'n13', x: 1060, y: 180 }, { id: 'n14', x: 1060, y: 60 },
  { id: 'n15', x: 1140, y: 60 }, { id: 'n16', x: 640, y: 140 },
  // 중단 (카피 뒤쪽)
  { id: 'n17', x: 60, y: 280 }, { id: 'n18', x: 240, y: 280 },
  { id: 'n19', x: 240, y: 340 }, { id: 'n20', x: 400, y: 340 },
  { id: 'n21', x: 180, y: 220 }, { id: 'n22', x: 380, y: 380 },
  { id: 'n23', x: 500, y: 220 }, { id: 'n24', x: 620, y: 220 },
  { id: 'n25', x: 620, y: 340 }, { id: 'n26', x: 500, y: 340 },
  { id: 'n27', x: 720, y: 300 }, { id: 'n28', x: 720, y: 240 },
  { id: 'n29', x: 820, y: 300 }, { id: 'n30', x: 960, y: 300 },
  { id: 'n31', x: 960, y: 240 }, { id: 'n32', x: 1100, y: 240 },
  { id: 'n33', x: 860, y: 380 }, { id: 'n34', x: 1100, y: 380 },
  { id: 'n35', x: 1140, y: 320 }, { id: 'n36', x: 460, y: 260 },
  // 하단
  { id: 'n37', x: 100, y: 460 }, { id: 'n38', x: 240, y: 460 },
  { id: 'n39', x: 240, y: 540 }, { id: 'n40', x: 400, y: 540 },
  { id: 'n41', x: 400, y: 440 }, { id: 'n42', x: 180, y: 400 },
  { id: 'n43', x: 720, y: 480 }, { id: 'n44', x: 860, y: 480 },
  { id: 'n45', x: 860, y: 560 }, { id: 'n46', x: 1000, y: 560 },
  { id: 'n47', x: 1000, y: 420 }, { id: 'n48', x: 1120, y: 420 },
  { id: 'n49', x: 940, y: 400 }, { id: 'n50', x: 540, y: 500 },
];

// 회로 라인 (직각 꺾임, 촘촘하게)
const lines: Line[] = [
  // 상단
  { id: 'l1', d: 'M80,80 L200,80 L200,160 L340,160 L340,60 L460,60', delay: 0 },
  { id: 'l2', d: 'M200,80 L200,40 L340,40', delay: 3 },
  { id: 'l3', d: 'M340,160 L420,160', delay: 6 },
  { id: 'l4', d: 'M150,80 L150,40', delay: 16 },
  { id: 'l5', d: 'M460,60 L580,60 L580,120 L700,120 L700,80', delay: 13 },
  { id: 'l6', d: 'M760,80 L900,80 L900,180 L1060,180 L1060,60 L1140,60', delay: 2 },
  { id: 'l7', d: 'M900,180 L820,180', delay: 9 },
  { id: 'l8', d: 'M1060,60 L980,60', delay: 12 },
  { id: 'l9', d: 'M720,80 L640,80 L640,140', delay: 15 },
  { id: 'l10', d: 'M760,80 L760,140 L700,140', delay: 22 },
  // 중단 (카피 뒤쪽 촘촘)
  { id: 'l11', d: 'M60,280 L240,280 L240,340 L400,340', delay: 2 },
  { id: 'l12', d: 'M180,220 L180,280', delay: 8 },
  { id: 'l13', d: 'M100,380 L380,380 L380,420', delay: 11 },
  { id: 'l14', d: 'M500,220 L620,220 L620,340 L500,340 Z', delay: 14 },
  { id: 'l15', d: 'M720,300 L820,300 L820,380 L860,380', delay: 7 },
  { id: 'l16', d: 'M720,300 L720,240 L640,240', delay: 19 },
  { id: 'l17', d: 'M820,300 L960,300 L960,240 L1100,240', delay: 5 },
  { id: 'l18', d: 'M860,380 L1100,380', delay: 20 },
  { id: 'l19', d: 'M980,320 L980,260', delay: 6 },
  { id: 'l20', d: 'M320,260 L460,260 L460,200', delay: 9 },
  { id: 'l21', d: 'M540,220 L540,180 L700,180', delay: 17 },
  { id: 'l22', d: 'M1140,320 L1140,220 L1060,220', delay: 14 },
  { id: 'l23', d: 'M60,280 L60,340 L140,340', delay: 23 },
  { id: 'l24', d: 'M400,340 L400,260 L460,260', delay: 4 },
  // 하단
  { id: 'l25', d: 'M100,460 L240,460 L240,540 L400,540 L400,440', delay: 8 },
  { id: 'l26', d: 'M240,460 L240,400 L180,400', delay: 11 },
  { id: 'l27', d: 'M400,540 L540,540 L540,500', delay: 4 },
  { id: 'l28', d: 'M100,460 L100,520 L60,520', delay: 19 },
  { id: 'l29', d: 'M720,480 L860,480 L860,560 L1000,560 L1000,420 L1120,420', delay: 1 },
  { id: 'l30', d: 'M860,480 L860,400 L940,400', delay: 10 },
  { id: 'l31', d: 'M1000,560 L1080,560', delay: 7 },
  { id: 'l32', d: 'M960,480 L960,420', delay: 18 },
  { id: 'l33', d: 'M720,480 L660,480 L660,420', delay: 21 },
  { id: 'l34', d: 'M540,500 L620,500 L620,440', delay: 24 },
];

export default function CircuitBackground() {
  const [burstId, setBurstId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const maskCircleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let timeoutId: number;

    const trigger = () => {
      const n = nodes[Math.floor(Math.random() * nodes.length)];
      setBurstId(n.id);
      window.setTimeout(() => setBurstId(null), 1800);
    };

    const schedule = (initial: boolean = false) => {
      const delay = initial
        ? 3000 + Math.random() * 3000
        : 9000 + Math.random() * 6000;
      timeoutId = window.setTimeout(() => {
        trigger();
        schedule(false);
      }, delay);
    };

    schedule(true);

    return () => window.clearTimeout(timeoutId);
  }, []);

  // 커서 위치에 따라 mask 원 위치 업데이트 (리렌더 없음)
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const parent = svg.parentElement;
    if (!parent) return;

    const handleMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 1200;
      const y = ((e.clientY - rect.top) / rect.height) * 600;
      if (maskCircleRef.current) {
        maskCircleRef.current.setAttribute('cx', String(x));
        maskCircleRef.current.setAttribute('cy', String(y));
      }
    };

    const handleLeave = () => {
      if (maskCircleRef.current) {
        maskCircleRef.current.setAttribute('cx', '-9999');
        maskCircleRef.current.setAttribute('cy', '-9999');
      }
    };

    parent.addEventListener('mousemove', handleMove);
    parent.addEventListener('mouseleave', handleLeave);
    return () => {
      parent.removeEventListener('mousemove', handleMove);
      parent.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const burstNode = burstId ? nodes.find((n) => n.id === burstId) : null;

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="cursorGradient">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="60%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="cursorMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="600">
          <rect width="1200" height="600" fill="black" />
          <circle ref={maskCircleRef} cx="-9999" cy="-9999" r="180" fill="url(#cursorGradient)" />
        </mask>
      </defs>
      {/* 바탕 회로 라인 - 희미하게 존재만 */}
      {lines.map((l) => (
        <path
          key={`base-${l.id}`}
          d={l.d}
          stroke="rgba(249,115,22,0.09)"
          strokeWidth="0.7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {/* 커서 근처 밝은 레이어 - mask로 커서 주변만 드러남 */}
      <g mask="url(#cursorMask)">
        {lines.map((l) => (
          <path
            key={`hl-${l.id}`}
            d={l.d}
            stroke="rgba(249,115,22,0.55)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {nodes.map((n) => (
          <circle
            key={`hn-${n.id}`}
            cx={n.x}
            cy={n.y}
            r="2.5"
            fill="rgba(249,115,22,0.9)"
          />
        ))}
      </g>

      {/* 드문 빛 흐름 */}
      {lines.map((l) => (
        <path
          key={`flow-${l.id}`}
          d={l.d}
          stroke="var(--accent)"
          strokeWidth="1.1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="14 900"
          style={{
            animation: 'circuitFlow 22s linear infinite',
            animationDelay: `${l.delay}s`,
          }}
        />
      ))}

      {/* 노드 */}
      {nodes.map((n) => (
        <circle
          key={`node-${n.id}`}
          cx={n.x}
          cy={n.y}
          r="1.5"
          fill="rgba(249,115,22,0.3)"
        />
      ))}

      {/* 장애 발생 + 실시간 탐지 */}
      {burstNode && (
        <g key={burstNode.id}>
          <circle
            cx={burstNode.x}
            cy={burstNode.y}
            r="3"
            fill="var(--accent)"
            style={{ animation: 'circuitFlash 1s ease-out forwards' }}
          />
          <circle
            cx={burstNode.x}
            cy={burstNode.y}
            r="3"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            style={{ animation: 'circuitRing 1.5s ease-out forwards' }}
          />
        </g>
      )}
    </svg>
  );
}
