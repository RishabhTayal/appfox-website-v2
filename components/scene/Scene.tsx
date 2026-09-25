"use client";

import { useEffect, useRef } from "react";

/**
 * Fox country — AppFox's illustrated world. A flat-vector landscape
 * (banded sky, sun or moon, drifting clouds, three ranges of hills with
 * pines, and a paper-coloured foreground that melts into the page).
 * Generated from a seed so every variant is deterministic and SSR-safe.
 * Layers drift at different speeds as the section scrolls (parallax);
 * clouds and stars move on CSS loops. All motion stops under
 * prefers-reduced-motion. Purely decorative: aria-hidden.
 */

export type SceneVariant = "dusk" | "day" | "dawn" | "sunset" | "night" | "meadow";

type Palette = {
  sky: string[];
  sun: string;
  halo: string;
  sunPos: [number, number, number];
  cloud: string;
  cloudOpacity: number;
  far: string;
  mid: string;
  midTree: string;
  near: string;
  nearTree: string;
  stars?: boolean;
};

const PALETTES: Record<SceneVariant, Palette> = {
  dusk: {
    sky: ["#4d3bc4", "#5c49d4", "#6d5ae0", "#8370ea", "#9d8cf2"],
    sun: "#ffd27a",
    halo: "#ffe2a8",
    sunPos: [880, 505, 64],
    cloud: "#f9d3ef",
    cloudOpacity: 0.3,
    far: "#8a75e6",
    mid: "#6b52cf",
    midTree: "#523bb3",
    near: "#46309c",
    nearTree: "#35237d",
    stars: true,
  },
  day: {
    sky: ["#b9dcff", "#c7e3ff", "#d5eaff", "#e2f1ff", "#eef7ff"],
    sun: "#fff1a8",
    halo: "#fffbe0",
    sunPos: [1260, 250, 58],
    cloud: "#ffffff",
    cloudOpacity: 0.95,
    far: "#c4ddcf",
    mid: "#98c9a9",
    midTree: "#64a27e",
    near: "#78b893",
    nearTree: "#4f8f6a",
  },
  dawn: {
    sky: ["#ffd3c1", "#ffdccd", "#ffe5d8", "#ffede3", "#fff5ee"],
    sun: "#ffae80",
    halo: "#ffd2b8",
    sunPos: [1200, 520, 92],
    cloud: "#ffffff",
    cloudOpacity: 0.75,
    far: "#f2bcae",
    mid: "#e59c91",
    midTree: "#c9736f",
    near: "#d0807b",
    nearTree: "#a95b5b",
  },
  sunset: {
    sky: ["#ffc97f", "#ffd494", "#ffdea9", "#ffe8c2", "#fff2dc"],
    sun: "#ff9150",
    halo: "#ffc49a",
    sunPos: [1220, 500, 84],
    cloud: "#ffffff",
    cloudOpacity: 0.7,
    far: "#f0b27e",
    mid: "#db8c5e",
    midTree: "#b4663f",
    near: "#c4744b",
    nearTree: "#98512f",
  },
  night: {
    sky: ["#15123a", "#1b1747", "#221d55", "#2a2464", "#342d74"],
    sun: "#fff4d2",
    halo: "#fff4d2",
    sunPos: [1240, 200, 44],
    cloud: "#8f86d9",
    cloudOpacity: 0.18,
    far: "#2f2a6a",
    mid: "#25205a",
    midTree: "#1a1644",
    near: "#1e1a4c",
    nearTree: "#141137",
    stars: true,
  },
  meadow: {
    sky: ["#e6e0ff", "#ebe6ff", "#f0ecff", "#f4f1ff", "#f8f6ff"],
    sun: "#ffe0a0",
    halo: "#fff1d4",
    sunPos: [1260, 330, 60],
    cloud: "#ffffff",
    cloudOpacity: 0.9,
    far: "#d9cffb",
    mid: "#c2b4f4",
    midTree: "#9f8be4",
    near: "#b1a0f0",
    nearTree: "#8a73d9",
  },
};

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 1600;
const H = 800;
/** top of the land band in art coordinates (far hills peak ~480) */
const LAND_TOP = 440;

function hillY(x: number, base: number, amp: number, f: number, seed: number) {
  return (
    base -
    amp *
      (Math.sin(x * f + seed) * 0.6 +
        Math.sin(x * f * 2.3 + seed * 1.7) * 0.28 +
        Math.sin(x * f * 5.1 + seed * 0.3) * 0.12)
  );
}

function hillPath(base: number, amp: number, f: number, seed: number) {
  const pts: [number, number][] = [];
  for (let x = -80; x <= W + 80; x += 40) pts.push([x, hillY(x, base, amp, f, seed)]);
  let d = `M${pts[0][0]} ${H + 10}L${pts[0][0]} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += `Q${pts[i][0]} ${pts[i][1].toFixed(1)} ${mx} ${my.toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += `L${last[0]} ${last[1].toFixed(1)}L${last[0]} ${H + 10}Z`;
  return d;
}

function Pine({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})`}>
      <rect x={-2.5} y={-8} width={5} height={12} fill={fill} />
      <path d="M0 -62L16 -26H9L20 -6H-20L-9 -26H-16Z" fill={fill} />
    </g>
  );
}

function Round({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})`}>
      <rect x={-2.5} y={-14} width={5} height={18} fill={fill} />
      <circle cx={0} cy={-30} r={20} fill={fill} />
      <circle cx={-12} cy={-20} r={12} fill={fill} />
      <circle cx={13} cy={-19} r={11} fill={fill} />
    </g>
  );
}

function Cloud({ x, y, s, fill, opacity, i }: { x: number; y: number; s: number; fill: string; opacity: number; i: number }) {
  return (
    <g className={`sc-cloud sc-cloud-${i % 3}`} opacity={opacity}>
      <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})`} fill={fill}>
        <rect x={-70} y={-14} width={150} height={28} rx={14} />
        <circle cx={-28} cy={-18} r={26} />
        <circle cx={10} cy={-30} r={34} />
        <circle cx={46} cy={-14} r={22} />
      </g>
    </g>
  );
}

export function Scene({
  variant = "dusk",
  seed = 7,
  className = "",
  /** keep the paper foreground band that melts into the page */
  foreground = true,
}: {
  variant?: SceneVariant;
  seed?: number;
  className?: string;
  foreground?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const p = PALETTES[variant];
  const r = rng(seed);

  // Parallax: expose scroll progress of the scene as --sp (0 → ~1).
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const sp = Math.max(-1, Math.min(1.5, -rect.top / Math.max(1, rect.height)));
      el.style.setProperty("--sp", sp.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const bandH = 560 / p.sky.length;
  const stars = p.stars
    ? Array.from({ length: 46 }, () => [r() * W, r() * 420, 0.8 + r() * 1.8, r()] as const)
    : [];
  const clouds = Array.from({ length: 6 }, (_, i) => ({
    x: (i + 0.3 + r() * 0.5) * (W / 6),
    y: 110 + r() * 240,
    s: 0.6 + r() * 0.7,
  }));

  const farSeed = seed * 1.3;
  const midSeed = seed * 2.1;
  const nearSeed = seed * 3.7;
  const midTrees = Array.from({ length: 26 }, () => {
    const x = r() * W;
    return { x, y: hillY(x, 610, 34, 0.004, midSeed) + 6, s: 0.55 + r() * 0.5, round: r() < 0.25 };
  }).sort((a, b) => a.y - b.y);
  const nearTrees = Array.from({ length: 9 }, () => {
    const x = r() * W;
    return { x, y: hillY(x, 690, 24, 0.003, nearSeed) + 8, s: 0.9 + r() * 0.6, round: r() < 0.5 };
  }).sort((a, b) => a.y - b.y);

  return (
    <div ref={ref} aria-hidden="true" className={`scene scene-${variant} ${className}`}>
      {/* Sky: bands, sun/moon, stars, clouds - fills the whole section */}
      <svg className="sc-sky" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" focusable="false">
        <rect y={-2000} width={W} height={H + 2000} fill={p.sky[0]} />
        {p.sky.map((c, i) => (
          <rect key={c} y={i * bandH} width={W} height={bandH + 1} fill={c} />
        ))}
        <rect y={560} width={W} height={H - 560} fill={p.sky[p.sky.length - 1]} />
        <g className="sc-layer sc-l0">
          {stars.map(([x, y, rad, t], i) => (
            <circle key={i} className={`sc-star sc-star-${i % 3}`} cx={x} cy={y} r={rad} fill="#fff" opacity={0.5 + t * 0.5} />
          ))}
          <circle cx={p.sunPos[0]} cy={p.sunPos[1]} r={p.sunPos[2] * 1.9} fill={p.halo} opacity={0.22} />
          <circle cx={p.sunPos[0]} cy={p.sunPos[1]} r={p.sunPos[2] * 1.4} fill={p.halo} opacity={0.3} />
          <circle className="sc-sun" cx={p.sunPos[0]} cy={p.sunPos[1]} r={p.sunPos[2]} fill={p.sun} />
          {clouds.map((c, i) => (
            <Cloud key={i} i={i} {...c} fill={p.cloud} opacity={p.cloudOpacity} />
          ))}
        </g>
      </svg>
      {/* Land: hills + trees - fixed height band anchored to the bottom */}
      <svg className="sc-land" viewBox={`0 ${LAND_TOP} ${W} ${H - LAND_TOP}`} preserveAspectRatio="xMidYMax slice" focusable="false">
        <g className="sc-layer sc-l1">
          <path d={hillPath(540, 46, 0.0032, farSeed)} fill={p.far} />
        </g>
        <g className="sc-layer sc-l2">
          <path d={hillPath(610, 34, 0.004, midSeed)} fill={p.mid} />
          {midTrees.map((t, i) =>
            t.round ? <Round key={i} x={t.x} y={t.y} s={t.s * 0.8} fill={p.midTree} /> : <Pine key={i} x={t.x} y={t.y} s={t.s} fill={p.midTree} />,
          )}
        </g>
        <g className="sc-layer sc-l3">
          <path d={hillPath(690, 24, 0.003, nearSeed)} fill={p.near} />
          {nearTrees.map((t, i) =>
            t.round ? <Round key={i} x={t.x} y={t.y} s={t.s} fill={p.nearTree} /> : <Pine key={i} x={t.x} y={t.y} s={t.s * 1.2} fill={p.nearTree} />,
          )}
        </g>
        {foreground ? <path d={hillPath(772, 10, 0.006, seed * 5.3)} fill="var(--color-paper)" /> : null}
      </svg>
    </div>
  );
}
