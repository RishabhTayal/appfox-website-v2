"use client";

import { useEffect, useId, useRef } from "react";
import { Px } from "@/components/pixel/px";

/**
 * Fox country - AppFox's world, in pixel art. Everything sits on a
 * 10-unit pixel grid over a smooth gradient sky: a pixel sun/moon
 * with a dithered halo, twinkling pixel stars, blocky clouds that drift
 * in whole-pixel steps, three stepped hill ranges with rim light and
 * pixel pines, and a foreground that pixel-dissolves into the page.
 * Seeded, so every variant is deterministic and SSR-safe. Parallax via
 * --sp; all motion stops under prefers-reduced-motion. aria-hidden.
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
/** top of the land band in art coordinates */
const LAND_TOP = 440;
/** pixel size in art units */
const G = 10;

const q = (v: number, step = G) => Math.round(v / step) * step;

function mix(a: string, b: string, t: number) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (sh: number) => Math.round(((pa >> sh) & 255) * (1 - t) + ((pb >> sh) & 255) * t);
  return `#${((1 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).slice(1)}`;
}

function hillY(x: number, base: number, amp: number, f: number, seed: number) {
  return (
    base -
    amp *
      (Math.sin(x * f + seed) * 0.6 +
        Math.sin(x * f * 2.3 + seed * 1.7) * 0.28 +
        Math.sin(x * f * 5.1 + seed * 0.3) * 0.12)
  );
}

/** Stepped hill: columns 2 pixels wide, heights snapped to the grid. */
function stepTop(x: number, base: number, amp: number, f: number, seed: number) {
  const col = Math.floor(x / (2 * G)) * 2 * G;
  return q(hillY(col + G, base, amp, f, seed));
}
function stepPath(base: number, amp: number, f: number, seed: number, dy = 0) {
  let d = `M${-2 * G} ${H + 10}`;
  for (let x = -2 * G; x <= W + 2 * G; x += 2 * G) {
    const y = stepTop(x, base, amp, f, seed) + dy;
    d += `V${y}H${x + 2 * G}`;
  }
  return d + `V${H + 10}Z`;
}

const PINE = ["...X...", "..HXX..", ".HXXXX.", "..HXX..", ".HXXXX.", "HXXXXXX", "...T...", "...T..."];
const PINE_TALL = [
  "....X....",
  "...HXX...",
  "..HXXXX..",
  "...HXX...",
  "..HXXXX..",
  ".HXXXXXX.",
  "..HXXXX..",
  ".HXXXXXX.",
  "HXXXXXXXX",
  "....T....",
  "....T....",
];
const ROUND = ["..XXX..", ".HXXXX.", "HHXXXXX", "HXXXXXX", ".XXXXX.", "...T...", "...T..."];
const CLOUDS = [
  ["....XXXX........", "..XXXXXXXX.XXX..", ".XXXXXXXXXXXXXX.", "XXXXXXXXXXXXXXXX", ".SSSSSSSSSSSSSS."],
  ["...XXXX....", ".XXXXXXXXX.", "XXXXXXXXXXX", ".SSSSSSSSS."],
  ["......XXX.....", "..XXX.XXXXX...", ".XXXXXXXXXXXX.", "XXXXXXXXXXXXXX", "..SSSSSSSSSS.."],
];
const TWINKLE = [".X.", "XWX", ".X."];

function orb(radius: number, moon: boolean) {
  const n = radius + 2;
  const rows: string[] = [];
  for (let y = 0; y < n * 2; y++) {
    let row = "";
    for (let x = 0; x < n * 2; x++) {
      const dx = x + 0.5 - n;
      const dy = y + 0.5 - n;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d <= radius) {
        const shade = dx + dy > radius * 0.75;
        const crater = moon && ((x === n - 2 && y === n - 2) || (x === n + 1 && y === n + 1) || (x === n + 2 && y === n - 3) || (x === n - 3 && y === n + 2));
        row += crater ? "C" : shade ? "S" : dx + dy < -radius * 0.9 ? "L" : "X";
      } else if (d <= radius + 1.6 && (x + y) % 2 === 0) row += "H";
      else row += ".";
    }
    rows.push(row);
  }
  return rows;
}

export function Scene({
  variant = "dusk",
  seed = 7,
  className = "",
  /** keep the paper foreground band that dissolves into the page */
  foreground = true,
  /** override the sun/moon position [x, y, radius] in viewBox units */
  sunAt,
}: {
  variant?: SceneVariant;
  seed?: number;
  className?: string;
  foreground?: boolean;
  sunAt?: [number, number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const uid = `sc${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const p = sunAt ? { ...PALETTES[variant], sunPos: sunAt } : PALETTES[variant];
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
      el.style.setProperty("--sp", (Math.round(sp * 40) / 40).toFixed(3));
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

  const bandH = 110;
  const stars = p.stars
    ? Array.from({ length: 16 }, (_, i) =>
        i % 4 === 0
          ? ([q(r() * W), q(r() * 60), r()] as const)
          : ([q(W * 0.6 + r() * W * 0.4), q(r() * 380), r()] as const),
      )
    : [];
  const clouds = Array.from({ length: 5 }, (_, i) => ({
    x: q((i + 0.2 + r() * 0.5) * (W / 5)),
    y: q(90 + r() * 250),
    k: Math.floor(r() * CLOUDS.length),
  }));

  const farSeed = seed * 1.3;
  const midSeed = seed * 2.1;
  const nearSeed = seed * 3.7;
  const farRim = mix(p.far, "#ffffff", 0.22);
  const midRim = mix(p.mid, "#ffffff", 0.18);
  const nearRim = mix(p.near, "#ffffff", 0.16);
  const midTreePal = { X: p.midTree, H: mix(p.midTree, "#ffffff", 0.18), T: mix(p.midTree, "#000000", 0.25) };
  const nearTreePal = { X: p.nearTree, H: mix(p.nearTree, "#ffffff", 0.16), T: mix(p.nearTree, "#000000", 0.25) };
  const midTrees = Array.from({ length: 22 }, () => {
    const x = q(r() * W);
    return { x, y: stepTop(x, 612, 44, 0.004, midSeed), round: r() < 0.25 };
  }).sort((a, b) => a.y - b.y);
  const nearTrees = Array.from({ length: 8 }, () => {
    const x = q(r() * W);
    return { x, y: stepTop(x, 692, 30, 0.003, nearSeed), round: r() < 0.35 };
  }).sort((a, b) => a.y - b.y);
  const tufts = Array.from({ length: 34 }, () => {
    const x = q(r() * W);
    return { x, y: stepTop(x, 692, 30, 0.003, nearSeed) + q(20 + r() * 70), w: r() < 0.5 ? G : 2 * G };
  });
  const sunR = Math.max(4, Math.round(p.sunPos[2] / G));
  const sun = orb(sunR, variant === "night");
  const sunPal = {
    X: p.sun,
    S: mix(p.sun, variant === "night" ? "#9a93c9" : "#ff6a3d", 0.18),
    L: mix(p.sun, "#ffffff", 0.45),
    C: mix(p.sun, "#8e86c8", 0.3),
    H: p.halo,
  };
  const last = p.sky[p.sky.length - 1];

  return (
    <div ref={ref} aria-hidden="true" className={`scene scene-${variant} ${className}`}>
      {/* Sky: dithered bands, sun/moon, stars, clouds - fills the whole section */}
      <svg className="sc-sky" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" shapeRendering="crispEdges" focusable="false">
        <defs>
          {/* Smooth sky: the pixel art lives in the sun, clouds, hills and trees */}
          <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2={p.sky.length * bandH} gradientUnits="userSpaceOnUse">
            {p.sky.map((c, i) => (
              <stop key={i} offset={i / Math.max(1, p.sky.length - 1)} stopColor={c} />
            ))}
          </linearGradient>
        </defs>
        <rect y={-2000} width={W} height={2000} fill={p.sky[0]} />
        <rect y={0} width={W} height={p.sky.length * bandH} fill={`url(#${uid}-sky)`} />
        <rect y={p.sky.length * bandH} width={W} height={H} fill={last} />
        <g className="sc-layer sc-l0">
          {stars.map(([x, y, t], i) =>
            t > 0.82 ? (
              <Px key={i} rows={TWINKLE} pal={{ X: "#ffffff", W: "#fff7cf" }} x={x} y={y} cell={G / 2} className={`sc-star sc-star-${i % 3}`} />
            ) : (
              <rect key={i} className={`sc-star sc-star-${i % 3}`} x={x} y={y} width={t > 0.5 ? G : G / 2} height={t > 0.5 ? G : G / 2} fill="#fff" opacity={0.35 + t * 0.35} />
            ),
          )}
          <g className="sc-sun">
            <Px rows={sun} pal={sunPal} x={q(p.sunPos[0]) - (sunR + 2) * G} y={q(p.sunPos[1]) - (sunR + 2) * G} cell={G} />
          </g>
          {clouds.map((c, i) => (
            <g key={i} className={`sc-cloud sc-cloud-${i % 3}`} opacity={p.cloudOpacity}>
              <Px rows={CLOUDS[c.k]} pal={{ X: p.cloud, S: mix(p.cloud, p.sky[2], 0.35) }} x={c.x} y={c.y} cell={G} />
            </g>
          ))}
        </g>
      </svg>
      {/* Land: stepped hills + pixel trees - fixed height band anchored to the bottom */}
      <svg className="sc-land" viewBox={`0 ${LAND_TOP} ${W} ${H - LAND_TOP}`} preserveAspectRatio="xMidYMax slice" shapeRendering="crispEdges" focusable="false">
        <defs>
          <pattern id={`${uid}-p50`} width={2 * G} height={2 * G} patternUnits="userSpaceOnUse">
            <rect width={G} height={G} fill="var(--color-paper)" />
            <rect x={G} y={G} width={G} height={G} fill="var(--color-paper)" />
          </pattern>
          <pattern id={`${uid}-p25`} width={2 * G} height={2 * G} patternUnits="userSpaceOnUse">
            <rect width={G} height={G} fill="var(--color-paper)" />
          </pattern>
          <pattern id={`${uid}-m50`} width={2 * G} height={2 * G} patternUnits="userSpaceOnUse">
            <rect width={G} height={G} fill={p.mid} />
            <rect x={G} y={G} width={G} height={G} fill={p.mid} />
          </pattern>
        </defs>
        <g className="sc-layer sc-l1">
          <path d={stepPath(540, 56, 0.0032, farSeed)} fill={farRim} />
          <path d={stepPath(540, 56, 0.0032, farSeed, G)} fill={p.far} />
        </g>
        <g className="sc-layer sc-l2">
          <path d={stepPath(612, 44, 0.004, midSeed)} fill={midRim} />
          <path d={stepPath(612, 44, 0.004, midSeed, G)} fill={p.mid} />
          {midTrees.map((t, i) =>
            <Px key={i} rows={t.round ? ROUND : PINE} pal={midTreePal} x={t.x - 3 * G} y={t.y - ((t.round ? ROUND : PINE).length - 1) * G} cell={G} />,
          )}
        </g>
        <g className="sc-layer sc-l3">
          <path d={stepPath(692, 30, 0.003, nearSeed)} fill={nearRim} />
          <path d={stepPath(692, 30, 0.003, nearSeed, G)} fill={p.near} />
          {tufts.map((t, i) => (
            <rect key={i} x={t.x} y={t.y} width={t.w} height={G} fill={p.nearTree} opacity={0.55} />
          ))}
          {nearTrees.map((t, i) =>
            <Px key={i} rows={t.round ? ROUND : PINE_TALL} pal={nearTreePal} x={t.x - 4 * G} y={t.y - ((t.round ? ROUND : PINE_TALL).length - 1) * G} cell={G} />,
          )}
        </g>
        {foreground ? (
          <g>
            <path d={stepPath(776, 12, 0.006, seed * 5.3)} fill="var(--color-paper)" />
          </g>
        ) : null}
      </svg>
    </div>
  );
}
