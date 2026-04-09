import { useEffect, useRef } from 'react';

const SPACING = 20;
const MAX_LINES = 5;
const SPEED = 200; // px/s
const LIFETIME = 28; // seconds
const FADE_DURATION = 1; // seconds

type Dir = 'up' | 'down' | 'left' | 'right';

const dirDelta: Record<Dir, [number, number]> = {
  right: [1, 0],
  left: [-1, 0],
  down: [0, 1],
  up: [0, -1],
};
const opposite: Record<Dir, Dir> = {
  right: 'left',
  left: 'right',
  up: 'down',
  down: 'up',
};

/** Head가 방향을 바꾼 그리드 노드 — Tail이 같은 지점에 도달하면 소비 */
interface TurnRecord {
  col: number;
  row: number;
  dir: Dir;
}

interface LineParticle {
  // ── Head (앞 끝) ──────────────────────────────────────
  hCol: number;
  hRow: number;
  hDir: Dir;
  hProg: number; // 0‥1
  // ── Tail (뒤 끝, Head보다 1칸 뒤) ────────────────────
  tCol: number;
  tRow: number;
  tDir: Dir;
  tProg: number;
  tailDelay: number; // 남은 지연(셀 단위) — 이 값이 0이 되면 Tail 움직임 시작
  // ── 대기 중인 방향 전환 기록 ─────────────────────────
  turns: TurnRecord[];
  age: number;
}

export default function DotPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let lastTime = performance.now();
    const startTime = performance.now();
    const lines: LineParticle[] = [];
    let spawnCooldown = 0.5;
    let dpr = 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      // CSS 픽셀 좌표계로 고정 → lineWidth:1 = 정확히 1 CSS px
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnLine = (cols: number, rows: number): LineParticle => {
      const col = Math.floor(cols / 2);
      const row = Math.floor(rows / 2);
      const allDirs: Dir[] = ['up', 'down', 'left', 'right'];
      const dir = allDirs[Math.floor(Math.random() * allDirs.length)];
      return {
        hCol: col,
        hRow: row,
        hDir: dir,
        hProg: 0,
        tCol: col,
        tRow: row,
        tDir: dir,
        tProg: 0,
        tailDelay: 2, // 2칸 지연으로 선 길이 = 2셀
        turns: [],
        age: 0,
      };
    };

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const t = (now - startTime) / 1000;

      const W = canvas.offsetWidth; // CSS 픽셀
      const H = canvas.offsetHeight; // CSS 픽셀
      if (!W || !H) {
        animFrameId = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;

      // ── Wave dot pattern ────────────────────────────────────
      const maxRadius = 3.2;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * SPACING;
          const y = row * SPACING;
          const wave1 = Math.sin(col * 0.38 + row * 0.55 - t * 2.5) * 0.5 + 0.5;
          const wave2 = Math.sin(col * 0.22 - row * 0.3 + t * 1.8 + 1.2) * 0.5 + 0.5;
          const waveValue = wave1 * 0.6 + wave2 * 0.4;
          const edgeX = Math.min(col / (cols * 0.18), (cols - 1 - col) / (cols * 0.18), 1);
          const edgeY = Math.min(row / (rows * 0.18), (rows - 1 - row) / (rows * 0.18), 1);
          const edgeFade = Math.min(edgeX, edgeY);
          const radius = waveValue * maxRadius * edgeFade;
          if (radius < 0.15) continue;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(249,115,22,${0.1 * edgeFade})`;
          ctx.fill();
        }
      }

      // ── Spawn ───────────────────────────────────────────────
      spawnCooldown -= dt;
      if (spawnCooldown <= 0 && lines.length < MAX_LINES) {
        lines.push(spawnLine(cols, rows));
        spawnCooldown = 1.5 + Math.random() * 1.0;
      }

      // ── Update & draw lines ─────────────────────────────────
      const steps = (SPEED * dt) / SPACING; // 이번 프레임 이동량(셀 단위)

      for (let i = lines.length - 1; i >= 0; i--) {
        const p = lines[i];
        p.age += dt;

        if (p.age >= LIFETIME) {
          lines.splice(i, 1);
          continue;
        }

        // ── Head 이동 ──────────────────────────────────────────
        p.hProg += steps;
        let headDied = false;

        while (p.hProg >= 1) {
          p.hProg -= 1;
          const [dc, dr] = dirDelta[p.hDir];
          p.hCol += dc;
          p.hRow += dr;

          if (p.hCol < 0 || p.hCol >= cols || p.hRow < 0 || p.hRow >= rows) {
            headDied = true;
            break;
          }

          // U턴 금지, 40% 확률로 방향 전환
          const allDirs: Dir[] = ['up', 'down', 'left', 'right'];
          const choices = allDirs.filter((d) => d !== opposite[p.hDir]);
          let newDir = p.hDir;
          if (Math.random() < 0.4) {
            newDir = choices[Math.floor(Math.random() * choices.length)];
          }
          if (newDir !== p.hDir) {
            p.turns.push({ col: p.hCol, row: p.hRow, dir: newDir });
          }
          p.hDir = newDir;
        }

        if (headDied) {
          lines.splice(i, 1);
          continue;
        }

        // ── Tail 이동 (Head보다 1칸 뒤) ───────────────────────
        // tailDelay가 0이 되는 순간부터 실제 이동 시작
        const oldDelay = p.tailDelay;
        p.tailDelay = Math.max(0, p.tailDelay - steps);
        const tailSteps = steps - (oldDelay - p.tailDelay); // = max(0, steps - oldDelay)

        p.tProg += tailSteps;

        while (p.tProg >= 1) {
          p.tProg -= 1;
          const [dc, dr] = dirDelta[p.tDir];
          p.tCol += dc;
          p.tRow += dr;

          // 해당 노드에 예약된 방향 전환이 있으면 적용
          if (p.turns.length > 0 && p.turns[0].col === p.tCol && p.turns[0].row === p.tRow) {
            p.tDir = p.turns.shift()!.dir;
          }
        }

        // ── Opacity ────────────────────────────────────────────
        let opacity = 1;
        if (p.age < FADE_DURATION) opacity = p.age / FADE_DURATION;
        else if (p.age > LIFETIME - FADE_DURATION) opacity = (LIFETIME - p.age) / FADE_DURATION;
        opacity = Math.max(0, Math.min(1, opacity));

        // ── 픽셀 좌표 계산 ─────────────────────────────────────
        const [hdc, hdr] = dirDelta[p.hDir];
        const hx = (p.hCol + hdc * p.hProg) * SPACING;
        const hy = (p.hRow + hdr * p.hProg) * SPACING;

        const [tdc, tdr] = dirDelta[p.tDir];
        const tx = (p.tCol + tdc * p.tProg) * SPACING;
        const ty = (p.tRow + tdr * p.tProg) * SPACING;

        ctx.save();
        ctx.lineWidth = 0.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // 경유점 배열: tail → 코너들 → head
        const waypoints: [number, number][] = [[tx, ty]];
        for (const turn of p.turns) {
          waypoints.push([turn.col * SPACING, turn.row * SPACING]);
        }
        waypoints.push([hx, hy]);

        // 전체 경로 길이 계산
        let totalDist = 0;
        for (let k = 0; k < waypoints.length - 1; k++) {
          totalDist += Math.hypot(
            waypoints[k + 1][0] - waypoints[k][0],
            waypoints[k + 1][1] - waypoints[k][1],
          );
        }

        // 각 구간마다 거리 비율에 맞는 그라디언트로 그리기
        let distSoFar = 0;
        for (let k = 0; k < waypoints.length - 1; k++) {
          const [x1, y1] = waypoints[k];
          const [x2, y2] = waypoints[k + 1];
          const segDist = Math.hypot(x2 - x1, y2 - y1);
          if (segDist < 0.5) {
            distSoFar += segDist;
            continue;
          }

          const opA = totalDist > 0 ? (distSoFar / totalDist) * 0.8 : 0;
          const opB = totalDist > 0 ? ((distSoFar + segDist) / totalDist) * 0.8 : 0.8;

          const grad = ctx.createLinearGradient(x1, y1, x2, y2);
          grad.addColorStop(0, `rgba(255,255,255,${opA * opacity})`);
          grad.addColorStop(1, `rgba(255,255,255,${opB * opacity})`);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = grad;
          ctx.stroke();

          distSoFar += segDist;
        }

        ctx.restore();
      }

      animFrameId = requestAnimationFrame(tick);
    };

    resize();
    animFrameId = requestAnimationFrame(tick);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement || canvas);

    return () => {
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
