"use client";

import { useEffect, useRef } from "react";
import { Px, flipX, shear, sym, type Bitmap } from "@/components/pixel/px";
import "./fox.css";

/**
 * Foxy - the AppFox mascot, drawn as a pixel-art sprite on a 40x45 grid.
 * Every part is its own bitmap layer (tail, body, arms, head, ears, eyes,
 * scarf, props, reactions) so poses are composed, and motion is done the
 * way sprites move: whole-pixel jumps and frame swaps on `steps()` timing.
 *
 *   data-pose   idle | wave | point | hold | calendar | juggle | read |
 *               think | sleep | celebrate | dangle | fly | map
 *   data-expr   open | happy | closed | wide | smug
 *   data-react  heart | sparkle | zzz | question | bang | none
 *
 * `track` makes the eyes (and at the extremes, the head) follow the
 * cursor one pixel at a time. Blinks and ear twitches run on timers.
 * prefers-reduced-motion freezes all of it (see fox.css).
 */

export type FoxPose =
  | "idle"
  | "wave"
  | "point"
  | "hold"
  | "calendar"
  | "juggle"
  | "read"
  | "think"
  | "sleep"
  | "celebrate"
  | "dangle"
  | "fly"
  | "map";

export type FoxExpr = "open" | "happy" | "closed" | "wide" | "smug";
export type FoxReact = "heart" | "sparkle" | "zzz" | "question" | "bang" | "none";

const PAL = {
  K: "#2b1b17", // outline
  O: "#f2782f", // fur
  D: "#cf5f22", // fur shade
  C: "#fff1dc", // cream
  W: "#ffffff",
  E: "#4a2a20", // socks, paws, ear tips
  P: "#7c3aed", // scarf
  Q: "#5b21b6", // scarf shade
  B: "#ff9c8f", // blush
  R: "#ff5f78", // mouth / heart
  Y: "#ffd23f", // sparkle
  T: "#e8b877", // kraft
  S: "#c98e4f", // kraft shade
  L: "#fff6e0", // tape
  G: "#bdb5d0", // grey
  M: "#f7e7c6", // map
  N: "#dcc394", // map fold
  V: "#2f9e62", // green
  U: "#3b82f6", // blue
  Z: "#8b5cf6", // violet light
};

/* ── bitmaps ─────────────────────────────────────────────────────── */

const EAR_L: Bitmap = ["KK.....", "KEK....", "KEEK...", "KECOK..", "KOCCOK.", "KOCCOOK", ".KOOOOO"];
const EAR_R = flipX(EAR_L);

const HEAD = sym([
  ".....KKKKKK",
  "...KKOOOOOO",
  "..KOOOOOOOO",
  ".KOOOOOOOOO",
  ".KOOOOOOOOO",
  ".KOOOOOOOOO",
  ".KOOOOOOOOO",
  ".KOOOOOOOOO",
  ".KOOOOOOOOC",
  ".KCOOOOOOCC",
  "KCCCOOOOCCC",
  "KCCCCCCCCCC",
  ".KCCCCCCCCC",
  "KCCCCCCCCCC",
  ".KKCCCCCCCC",
  "...KKKCCCCC",
  "......KKKKK",
]);

const BODY = sym([
  "..KOOOO",
  ".KOOOOO",
  ".KOOOOC",
  "KOOOOCC",
  "KDOOCCC",
  "KDOOCCC",
  "KDOOCCC",
  "KDOOCCC",
  "KDOOOCC",
  "KDDOOOO",
  ".KEEEK.",
  ".KEEEK.",
  "..KKK..",
]);

const SCARF = [".KPPPPPPPPPPPPK.", "KPPPPPPPPPPPPPPK", ".KQQQQQQQQQQQQK."];
const SCARF_END = ["KPK", "KPK", "KQK", ".K."];

const TAIL_BASE: Bitmap = [
  "........KKK.",
  ".......KCCCK",
  "......KOCCCK",
  ".....KOOOCK.",
  "...KKOOOOK..",
  ".KKOOOOODK..",
  "KOOOOOODK...",
  "KDOOODDK....",
  ".KKKKKK.....",
];
const tailFrame = (k: number) => shear(TAIL_BASE, (row) => Math.round(k * (1 - row / 8)));
const TAIL = [tailFrame(0), tailFrame(1), tailFrame(2)];

const ARM_IDLE_L: Bitmap = [".KK", "KOK", "KOK", "KOK", "KEK", ".K."];
const ARM_IDLE_R = flipX(ARM_IDLE_L);

const ARM_UP_R: Bitmap = ["..KK.", ".KEEK", ".KEEK", ".KOK.", "KOOK.", "KOK..", "KOK..", "KOK..", "KOK.."];
const ARM_UP_R2 = shear(ARM_UP_R, (row) => (row < 4 ? 1 : 0));
const ARM_UP_L = flipX(ARM_UP_R);
const ARM_UP_L2 = flipX(ARM_UP_R2);

const ARM_POINT_R: Bitmap = ["KKKKKKK.", "OOOOOOEK", "KKKKKKEK", "......K."];
const ARM_POINT_L = flipX(ARM_POINT_R);

const ARM_THINK_R: Bitmap = [".KKK..", "KEEEK.", ".KKOK.", "...KOK", "...KOK", "....KK"];

const ARM_BENT_L: Bitmap = [".KK..", "KOK..", "KOOK.", ".KOOK", "..KK."];
const ARM_BENT_R = flipX(ARM_BENT_L);
const PAW: Bitmap = [".KK.", "KEEK", ".KK."];

const BOX: Bitmap = [
  "KKKKKKKKKK",
  "KTTTLLTTTK",
  "KTTTLLTTTK",
  "KTTTTTTTTK",
  "KTTTTTTTTK",
  "KTTTTTTTTK",
  "KSSSSSSSSK",
  "KKKKKKKKKK",
];
const CALENDAR: Bitmap = [
  "KKKKKKKKKK",
  "KPPPPPPPPK",
  "KWWWWWWWWK",
  "KWGWGWGWWK",
  "KWWWWWWWWK",
  "KWGWGWOOWK",
  "KWWWWWOOWK",
  "KWGWGWWWWK",
  "KKKKKKKKKK",
];
const BOOK: Bitmap = [
  "KKKKKKKKKKKK",
  "KWWWWKKWWWWK",
  "KWGGWKKWGGWK",
  "KWWWWKKWWWWK",
  "KWGGWKKWGGWK",
  "KPPPPPPPPPPK",
  ".KKKKKKKKKK.",
];
const MAP: Bitmap = [
  "KKKKKKKKKKKK",
  "KMMMNMMMNMMK",
  "KMVVNMRMNMUK",
  "KMVRNRMMNUUK",
  "KMMMNMMRNMMK",
  "KKKKKKKKKKKK",
];
const MINI = (c: string): Bitmap => ["KKKK", `K${c}${c}K`, `K${c}${c}K`, "KKKK"];
const JUGGLE_SPOTS: [number, number][] = [
  [9, 4],
  [18, 0],
  [27, 4],
];
const JUGGLE_COLORS = ["P", "O", "V"];

const GLASSES: Bitmap = [
  "KKKK......KKKK",
  "K..KKKKKKKK..K",
  "K..K......K..K",
  "K..K......K..K",
  "KKKK......KKKK",
];

// eyes: left-eye bitmaps; the right eye is mirrored. Origin = top-left.
const EYES: Record<FoxExpr, { rows: Bitmap; dx: number; dy: number }> = {
  open: { rows: ["KW", "KK", "KK"], dx: 0, dy: 0 },
  wide: { rows: [".KK.", "KKWK", "KKKK", ".KK."], dx: -1, dy: -1 },
  happy: { rows: [".KK.", "K..K"], dx: -1, dy: 0 },
  closed: { rows: ["K..K", ".KK."], dx: -1, dy: 1 },
  smug: { rows: ["KKKK", ".KW."], dx: -1, dy: 1 },
};
const BLINK = { rows: ["....", "KKKK"], dx: -1, dy: 1 };

const MOUTH_SMILE: Bitmap = ["K..K", ".KK."];
const MOUTH_OPEN: Bitmap = ["KRRK", ".KK."];
const MOUTH_SMUG: Bitmap = ["...K", ".KK."];

const HEART: Bitmap = [".KK.KK.", "KRRKRRK", "KRWRRRK", "KRRRRRK", ".KRRRK.", "..KRK..", "...K..."];
const SPARK: Bitmap = ["..K..", ".KYK.", "KYWYK", ".KYK.", "..K.."];
const Z_BIG: Bitmap = ["KKKKK", "KZZZK", "KKZK.", ".KZKK", "KZZZK", "KKKKK"];
const Z_SMALL: Bitmap = ["KKKK", "KZZK", "KZZK", "KKKK"];
const BUBBLE = (glyph: "?" | "!"): Bitmap => {
  const q = glyph === "?";
  const c = q ? "Z" : "O";
  return [
    ".KKKKKKK.",
    "KWWWWWWWK",
    q ? `KWW${c}${c}${c}WWK` : `KWWW${c}WWWK`,
    q ? `KW${c}WWW${c}WK` : `KWWW${c}WWWK`,
    q ? `KWWWW${c}WWK` : `KWWW${c}WWWK`,
    q ? `KWWW${c}WWWK` : `KWWW${c}WWWK`,
    "KWWWWWWWK",
    `KWWW${c}WWWK`,
    "KWWWWWWWK",
    ".KKKKKKK.",
    ".KK......",
    "K........",
  ];
};
const Q_BUBBLE = BUBBLE("?");
const BANG_BUBBLE = BUBBLE("!");

/* ── layout (grid coordinates) ───────────────────────────────────── */
const HEAD_X = 9;
const HEAD_Y = 14;
const EYE_L: [number, number] = [14, 21];
const EYE_R_X = 24;

const HOLD_PROP: Partial<Record<FoxPose, { rows: Bitmap; x: number; y: number; w: number }>> = {
  hold: { rows: BOX, x: 15, y: 32, w: 10 },
  calendar: { rows: CALENDAR, x: 15, y: 31, w: 10 },
  read: { rows: BOOK, x: 14, y: 33, w: 12 },
  map: { rows: MAP, x: 14, y: 33, w: 12 },
};

function Eye({ expr }: { expr: FoxExpr }) {
  const e = EYES[expr];
  return (
    <>
      <Px rows={e.rows} pal={PAL} x={EYE_L[0] + e.dx} y={EYE_L[1] + e.dy} />
      <Px rows={flipX(e.rows)} pal={PAL} x={EYE_R_X + 2 - (e.rows[0].length + e.dx)} y={EYE_L[1] + e.dy} />
    </>
  );
}

const BLINK_R = flipX(BLINK.rows);

function Arms({ pose, front }: { pose: FoxPose; front: boolean }) {
  const raised = pose === "celebrate" || pose === "juggle" || pose === "dangle";
  const prop = HOLD_PROP[pose];
  if (front) {
    if (pose === "wave")
      return (
        <g className="fx-arm fx-arm-wave">
          <Px rows={ARM_UP_R} pal={PAL} x={29} y={23} className="fx-f2a" />
          <Px rows={ARM_UP_R2} pal={PAL} x={29} y={23} className="fx-f2b" />
        </g>
      );
    if (raised)
      return (
        <g className="fx-arm fx-arm-raised">
          <g className="fx-f2a">
            <Px rows={ARM_UP_L} pal={PAL} x={6} y={23} />
            <Px rows={ARM_UP_R} pal={PAL} x={29} y={23} />
          </g>
          <g className="fx-f2b">
            <Px rows={ARM_UP_L2} pal={PAL} x={2} y={23} />
            <Px rows={ARM_UP_R2} pal={PAL} x={29} y={23} />
          </g>
        </g>
      );
    if (pose === "think") return <Px rows={ARM_THINK_R} pal={PAL} x={22} y={28} className="fx-arm" />;
    if (prop)
      return (
        <g className="fx-arm fx-arm-hold">
          <Px rows={prop.rows} pal={PAL} x={prop.x} y={prop.y} className="fx-prop" />
          <Px rows={PAW} pal={PAL} x={prop.x - 2} y={prop.y + 2} />
          <Px rows={PAW} pal={PAL} x={prop.x + prop.w - 2} y={prop.y + 2} />
        </g>
      );
    return null;
  }
  // back arms (drawn over the body, under the head)
  if (prop)
    return (
      <>
        <Px rows={ARM_BENT_L} pal={PAL} x={11} y={32} />
        <Px rows={ARM_BENT_R} pal={PAL} x={24} y={32} />
      </>
    );
  if (raised) return null;
  return (
    <>
      {pose === "fly" ? (
        <Px rows={ARM_POINT_L} pal={PAL} x={6} y={32} />
      ) : (
        <Px rows={ARM_IDLE_L} pal={PAL} x={11} y={32} className="fx-arm fx-arm-l" />
      )}
      {pose === "point" || pose === "fly" ? (
        <Px rows={ARM_POINT_R} pal={PAL} x={26} y={32} className="fx-arm fx-arm-point" />
      ) : pose === "wave" || pose === "think" ? null : (
        <Px rows={ARM_IDLE_R} pal={PAL} x={26} y={32} className="fx-arm fx-arm-r" />
      )}
    </>
  );
}

function Reaction({ react }: { react: FoxReact }) {
  if (react === "none") return null;
  return (
    <g className={`fx-react fx-react-${react}`}>
      {react === "heart" && <Px rows={HEART} pal={PAL} x={31} y={3} />}
      {react === "sparkle" && (
        <>
          <Px rows={SPARK} pal={PAL} x={32} y={2} className="fx-spark-a" />
          <Px rows={SPARK} pal={PAL} x={5} y={6} className="fx-spark-b" />
        </>
      )}
      {react === "zzz" && (
        <>
          <Px rows={Z_SMALL} pal={PAL} x={29} y={8} className="fx-z1" />
          <Px rows={Z_BIG} pal={PAL} x={33} y={1} className="fx-z2" />
        </>
      )}
      {react === "question" && <Px rows={Q_BUBBLE} pal={PAL} x={30} y={0} />}
      {react === "bang" && <Px rows={BANG_BUBBLE} pal={PAL} x={30} y={0} />}
    </g>
  );
}

export function Foxy({
  pose = "idle",
  expr = "open",
  react = "none",
  track = false,
  size = 160,
  className = "",
  flip = false,
  label,
}: {
  pose?: FoxPose;
  expr?: FoxExpr;
  react?: FoxReact;
  /** eyes + head follow the pointer */
  track?: boolean;
  /** rendered width in px (height follows the 40x45 sprite grid) */
  size?: number | string;
  className?: string;
  /** face left instead of right */
  flip?: boolean;
  /** accessible name; omit for decorative foxes */
  label?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);

  // Ambient life: blinks, ear twitches, and (optionally) cursor tracking.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    const timers: number[] = [];
    let alive = true;

    const blink = () => {
      if (!alive) return;
      el.dataset.blink = "1";
      timers.push(
        window.setTimeout(() => {
          delete el.dataset.blink;
          if (Math.random() < 0.22) {
            timers.push(
              window.setTimeout(() => {
                el.dataset.blink = "1";
                timers.push(window.setTimeout(() => delete el.dataset.blink, 110));
              }, 150),
            );
          }
        }, 120),
      );
      timers.push(window.setTimeout(blink, 2400 + Math.random() * 3800));
    };
    const twitch = () => {
      if (!alive) return;
      el.dataset.twitch = Math.random() < 0.5 ? "l" : "r";
      timers.push(window.setTimeout(() => delete el.dataset.twitch, 260));
      timers.push(window.setTimeout(twitch, 4500 + Math.random() * 7000));
    };
    timers.push(window.setTimeout(blink, 1200 + Math.random() * 2000));
    timers.push(window.setTimeout(twitch, 3000 + Math.random() * 4000));

    // Eyes move in whole sprite pixels: -1, 0 or +1.
    const setLook = (lx: number, ly: number) => {
      const ex = Math.abs(lx) > 0.28 ? Math.sign(lx) : 0;
      const ey = ly > 0.4 ? 1 : ly < -0.5 ? -1 : 0;
      const hx = Math.abs(lx) > 0.75 ? Math.sign(lx) : 0;
      el.style.setProperty("--ex", String(ex));
      el.style.setProperty("--ey", String(ey));
      el.style.setProperty("--hx", String(hx));
    };
    let frame = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const dx = px - (r.left + r.width / 2);
      const dy = py - (r.top + r.height * 0.4);
      setLook(Math.max(-1, Math.min(1, dx / 420)) * (flip ? -1 : 1), Math.max(-1, Math.min(1, dy / 360)));
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    // Touch / no cursor: glance around on a slow timer instead.
    const fine = window.matchMedia("(pointer: fine)").matches;
    const wander = () => {
      if (!alive) return;
      setLook(Math.random() * 1.6 - 0.8, Math.random() * 1.1 - 0.5);
      timers.push(window.setTimeout(wander, 2200 + Math.random() * 2600));
    };
    if (track) {
      if (fine) window.addEventListener("pointermove", onMove, { passive: true });
      else timers.push(window.setTimeout(wander, 1500));
    }
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [track, flip]);

  const w = typeof size === "number" ? `${size}px` : size;
  const mouth = expr === "happy" || expr === "wide" ? MOUTH_OPEN : expr === "smug" ? MOUTH_SMUG : MOUTH_SMILE;
  const eyeExpr: FoxExpr = pose === "sleep" ? "closed" : expr;

  return (
    <svg
      ref={ref}
      viewBox="0 0 40 45"
      className={`foxy ${className}`}
      data-pose={pose}
      data-expr={eyeExpr}
      data-react={react}
      data-flip={flip ? "1" : undefined}
      style={{ width: w, height: "auto" }}
      shapeRendering="crispEdges"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <g className="fx-shadow" fill="#1b1826" opacity={0.16}>
        <rect x={13} y={42} width={14} height={1} />
        <rect x={15} y={43} width={10} height={1} />
      </g>
      <g transform={flip ? "translate(40 0) scale(-1 1)" : undefined}>
        <g className="fx-rig">
          {pose === "juggle" && (
            <g className="fx-juggle">
              {[0, 1, 2].map((f) => (
                <g key={f} className={`fx-f3 fx-f3-${f}`}>
                  {JUGGLE_SPOTS.map(([x, y], i) => (
                    <Px key={i} rows={MINI(JUGGLE_COLORS[(i + f) % 3])} pal={PAL} x={x + 1} y={y + (i === 1 ? 0 : f === 1 ? -1 : 0)} />
                  ))}
                </g>
              ))}
            </g>
          )}
          <g className="fx-tail">
            {TAIL.map((t, i) => (
              <Px key={i} rows={t} pal={PAL} x={25} y={32} className={`fx-t fx-t${i}`} />
            ))}
          </g>
          <g className="fx-body">
            <g className="fx-feet">
              <Px rows={BODY.slice(10)} pal={PAL} x={13} y={39} />
            </g>
            <Px rows={BODY.slice(0, 10)} pal={PAL} x={13} y={29} />
            <Arms pose={pose} front={false} />
            <Px rows={SCARF} pal={PAL} x={12} y={30} />
            <Px rows={SCARF_END} pal={PAL} x={22} y={33} className="fx-scarf-end" />
          </g>
          <g className="fx-head">
            <g className="fx-ear fx-ear-l">
              <Px rows={EAR_L} pal={PAL} x={HEAD_X} y={HEAD_Y - 5} />
            </g>
            <g className="fx-ear fx-ear-r">
              <Px rows={EAR_R} pal={PAL} x={HEAD_X + 15} y={HEAD_Y - 5} />
            </g>
            <Px rows={HEAD} pal={PAL} x={HEAD_X} y={HEAD_Y} />
            <g className="fx-face">
              <g fill={PAL.B}>
                <rect x={11} y={25} width={2} height={1} />
                <rect x={27} y={25} width={2} height={1} />
              </g>
              <g className="fx-eyes">
                <g className="fx-eyes-main">
                  <Eye expr={eyeExpr} />
                </g>
                {eyeExpr === "open" || eyeExpr === "wide" || eyeExpr === "smug" ? (
                  <g className="fx-eyes-blink">
                    <Px rows={BLINK.rows} pal={PAL} x={EYE_L[0] + BLINK.dx} y={EYE_L[1] + BLINK.dy} />
                    <Px rows={BLINK_R} pal={PAL} x={EYE_R_X - 1} y={EYE_L[1] + BLINK.dy} />
                  </g>
                ) : null}
              </g>
              <rect x={19} y={24} width={2} height={1} fill={PAL.K} />
              <Px rows={mouth} pal={PAL} x={18} y={25} />
              {pose === "read" && <Px rows={GLASSES} pal={PAL} x={13} y={20} />}
            </g>
          </g>
          <Arms pose={pose} front />
        </g>
      </g>
      <Reaction react={react} />
    </svg>
  );
}
