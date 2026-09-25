"use client";

import { createContext, useContext, useEffect, useId, useRef } from "react";
import "./fox.css";

/**
 * Foxy — the AppFox mascot. A hand-built, fully vector character (no
 * raster sprite), rigged into parts so each can move on its own: head,
 * ears, eyes, arms, tail, scarf and a per-pose prop. Everything animates
 * with CSS transforms on SVG groups, driven by a few data-attributes:
 *
 *   data-pose   idle | wave | point | hold | calendar | juggle | read |
 *               think | sleep | celebrate | dangle | fly | map
 *   data-expr   open | happy | closed | wide | smug
 *   data-react  heart | sparkle | zzz | question | bang | none
 *
 * `track` makes the eyes + head follow the cursor. Blinks and ear
 * twitches run on their own timers. prefers-reduced-motion freezes all
 * ambient motion (see fox.css) and stops the timers.
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

const C = {
  line: "#3b2420",
  fur: "#f2782f",
  furShade: "#dd6322",
  cream: "#fff3e2",
  sock: "#5a3325",
  blush: "#ff9e8f",
  scarf: "#7c3aed",
  scarfDark: "#5b21b6",
  kraft: "#e8b877",
  kraftDark: "#c98e4f",
  white: "#ffffff",
};
const SW = 3.6; // outline weight

/** Per-instance id prefix so clipPath ids never collide between foxes. */
const UidCtx = createContext("fx");

/** Group whose local origin sits at (x, y), so CSS rotate/scale pivots there. */
function Pivot({
  x,
  y,
  className,
  children,
}: {
  x: number;
  y: number;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={className}>
        <g transform={`translate(${-x} ${-y})`}>{children}</g>
      </g>
    </g>
  );
}

const EAR = "M46 72C39 52 39 30 45 12C61 17 78 29 88 45Z";
const EAR_INNER = "M53 63C50 49 50 35 53 25C62 30 70 38 76 47Z";
const MIRROR = "matrix(-1 0 0 1 200 0)";

function Ear({ side }: { side: "l" | "r" }) {
  const id = `${useContext(UidCtx)}-ear-${side}`;
  const body = (
    <>
      <defs>
        <clipPath id={id}>
          <path d={EAR} />
        </clipPath>
      </defs>
      <path d={EAR} fill={C.fur} />
      <g clipPath={`url(#${id})`}>
        <path d="M20 0H90V30C76 25 58 25 38 31L20 36Z" fill={C.line} />
      </g>
      <path d={EAR_INNER} fill={C.cream} />
      <path d={EAR} fill="none" stroke={C.line} strokeWidth={SW} strokeLinejoin="round" />
    </>
  );
  return side === "l" ? (
    <Pivot x={70} y={56} className="fx-ear fx-ear-l">
      {body}
    </Pivot>
  ) : (
    <Pivot x={130} y={56} className="fx-ear fx-ear-r">
      <g transform={MIRROR}>{body}</g>
    </Pivot>
  );
}

function Eye({ cx }: { cx: number }) {
  return (
    <Pivot x={cx} y={95} className="fx-eye">
      <g className="fx-eye-open">
        <ellipse cx={cx} cy={95} rx={8.6} ry={10.6} fill={C.line} />
        <circle cx={cx - 2.8} cy={90.6} r={3.3} fill={C.white} />
        <circle cx={cx + 3} cy={99} r={1.5} fill={C.white} />
      </g>
      <g className="fx-eye-wide">
        <ellipse cx={cx} cy={95} rx={10} ry={12.4} fill={C.line} />
        <circle cx={cx - 3.2} cy={90} r={4} fill={C.white} />
        <circle cx={cx + 3.4} cy={100} r={1.8} fill={C.white} />
      </g>
      <path
        className="fx-eye-happy"
        d={`M${cx - 9} 98Q${cx} 86 ${cx + 9} 98`}
        fill="none"
        stroke={C.line}
        strokeWidth={3.6}
        strokeLinecap="round"
      />
      <path
        className="fx-eye-closed"
        d={`M${cx - 9} 94Q${cx} 101 ${cx + 9} 94`}
        fill="none"
        stroke={C.line}
        strokeWidth={3.4}
        strokeLinecap="round"
      />
    </Pivot>
  );
}

function Arm({ side, front = false }: { side: "l" | "r"; front?: boolean }) {
  const x = side === "l" ? 79 : 121;
  return (
    <Pivot x={x} y={141} className={`fx-arm fx-arm-${side}${front ? " fx-arm-front" : " fx-arm-back"}`}>
      <rect x={x - 8} y={137} width={16} height={40} rx={8} fill={C.fur} stroke={C.line} strokeWidth={SW} />
      <path
        d={`M${x - 8} 165v4a8 8 0 0 0 16 0v-4Z`}
        fill={C.sock}
        stroke={C.line}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
    </Pivot>
  );
}

function HoldPaws() {
  return (
    <g className="fx-holdpaws">
      <circle cx={75} cy={172} r={7.5} fill={C.sock} stroke={C.line} strokeWidth={SW} />
      <circle cx={125} cy={172} r={7.5} fill={C.sock} stroke={C.line} strokeWidth={SW} />
    </g>
  );
}

function Props() {
  return (
    <g className="fx-props">
      {/* Parcel — Order Editing */}
      <g className="fx-prop fx-prop-hold">
        <rect x={73} y={150} width={54} height={42} rx={4} fill={C.kraft} stroke={C.line} strokeWidth={SW} />
        <rect x={95} y={150} width={10} height={42} fill={C.kraftDark} opacity={0.55} />
        <rect x={80} y={170} width={16} height={11} rx={1.5} fill={C.white} stroke={C.line} strokeWidth={2} />
        <path d="M83 174h10M83 177.5h7" stroke={C.line} strokeWidth={1.4} strokeLinecap="round" />
        <HoldPaws />
      </g>
      {/* Calendar with a renew arrow — Subscription */}
      <g className="fx-prop fx-prop-calendar">
        <rect x={74} y={148} width={52} height={46} rx={6} fill={C.white} stroke={C.line} strokeWidth={SW} />
        <path d="M74 160v-6a6 6 0 0 1 6-6h40a6 6 0 0 1 6 6v6Z" fill={C.scarf} stroke={C.line} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M86 143v9M114 143v9" stroke={C.line} strokeWidth={3} strokeLinecap="round" />
        <path d="M108 175a8 8 0 1 1-2.5-6.8" fill="none" stroke={C.scarf} strokeWidth={3} strokeLinecap="round" />
        <path d="M106.5 163.5l0.4 6.2-6 -0.6" fill="none" stroke={C.scarf} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        <HoldPaws />
      </g>
      {/* Open book — Blog / docs */}
      <g className="fx-prop fx-prop-read">
        <path d="M100 158C90 152 80 151 70 153V188C80 186 90 187 100 193Z" fill={C.white} stroke={C.line} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M100 158C110 152 120 151 130 153V188C120 186 110 187 100 193Z" fill={C.white} stroke={C.line} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M77 162c6-1 11-.5 16 2M77 169c6-1 11-.5 16 2M107 164c5-2.5 10-3 16-2M107 171c5-2.5 10-3 16-2" stroke="#b9b2c9" strokeWidth={2} strokeLinecap="round" fill="none" />
        <HoldPaws />
      </g>
      {/* Folded map — 404 */}
      <g className="fx-prop fx-prop-map">
        <path d="M70 152l20 5 20-5 20 5v36l-20-5-20 5-20-5Z" fill="#fdf6e3" stroke={C.line} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M90 157v36M110 152v36" stroke={C.line} strokeWidth={1.6} opacity={0.5} />
        <path d="M76 184c8-4 12-12 22-10s10 10 20 4" fill="none" stroke={C.scarf} strokeWidth={2.4} strokeDasharray="3 4" strokeLinecap="round" />
        <path d="M118 162l7 7M125 162l-7 7" stroke="#d1495b" strokeWidth={3} strokeLinecap="round" />
        <HoldPaws />
      </g>
      {/* Three bundle boxes — Product Bundles */}
      <g className="fx-prop fx-prop-juggle">
        <g className="fx-jbox fx-jbox-1">
          <rect x={52} y={18} width={24} height={20} rx={3} fill={C.scarf} stroke={C.line} strokeWidth={3} />
          <path d="M64 18v20" stroke="#c4b2f7" strokeWidth={3} />
        </g>
        <g className="fx-jbox fx-jbox-2">
          <rect x={88} y={0} width={24} height={20} rx={3} fill={C.kraft} stroke={C.line} strokeWidth={3} />
          <path d="M100 0v20" stroke={C.kraftDark} strokeWidth={3} />
        </g>
        <g className="fx-jbox fx-jbox-3">
          <rect x={124} y={18} width={24} height={20} rx={3} fill="#34c38f" stroke={C.line} strokeWidth={3} />
          <path d="M136 18v20" stroke="#bff0dc" strokeWidth={3} />
        </g>
      </g>
    </g>
  );
}

function Reactions() {
  return (
    <g className="fx-reacts" aria-hidden="true">
      <g className="fx-react fx-react-heart">
        <path d="M160 40c-7-6-15-12-15-19 0-5 4-8 8-8 3 0 5.5 2 7 4.5 1.5-2.5 4-4.5 7-4.5 4 0 8 3 8 8 0 7-8 13-15 19Z" fill="#ff5a6e" stroke={C.line} strokeWidth={2.6} strokeLinejoin="round" />
      </g>
      <g className="fx-react fx-react-sparkle" fill="#ffc83d" stroke={C.line} strokeWidth={2.2} strokeLinejoin="round">
        <path d="M158 6l3.5 9 9 3.5-9 3.5-3.5 9-3.5-9-9-3.5 9-3.5Z" />
        <path d="M180 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
        <path d="M40 18l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
      </g>
      <g className="fx-react fx-react-zzz" fill={C.scarf} fontFamily="ui-rounded, system-ui, sans-serif" fontWeight={800}>
        <text x={146} y={40} fontSize={18}>z</text>
        <text x={160} y={26} fontSize={14}>z</text>
        <text x={172} y={14} fontSize={11}>z</text>
      </g>
      <g className="fx-react fx-react-question">
        <circle cx={164} cy={22} r={16} fill={C.white} stroke={C.line} strokeWidth={2.6} />
        <text x={164} y={30} textAnchor="middle" fontSize={22} fontWeight={800} fill={C.scarf} fontFamily="ui-rounded, system-ui, sans-serif">?</text>
      </g>
      <g className="fx-react fx-react-bang">
        <circle cx={164} cy={22} r={16} fill="#ffc83d" stroke={C.line} strokeWidth={2.6} />
        <text x={164} y={30} textAnchor="middle" fontSize={22} fontWeight={800} fill={C.line} fontFamily="ui-rounded, system-ui, sans-serif">!</text>
      </g>
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
  /** rendered width in px (height follows the 200×224 art box) */
  size?: number | string;
  className?: string;
  /** face left instead of right */
  flip?: boolean;
  /** accessible name; omit for decorative foxes */
  label?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const uid = `fx${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

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
                timers.push(window.setTimeout(() => delete el.dataset.blink, 120));
              }, 160),
            );
          }
        }, 130),
      );
      timers.push(window.setTimeout(blink, 2400 + Math.random() * 3800));
    };
    const twitch = () => {
      if (!alive) return;
      const ear = Math.random() < 0.5 ? "l" : "r";
      el.dataset.twitch = ear;
      timers.push(window.setTimeout(() => delete el.dataset.twitch, 420));
      timers.push(window.setTimeout(twitch, 4500 + Math.random() * 7000));
    };
    timers.push(window.setTimeout(blink, 1200 + Math.random() * 2000));
    timers.push(window.setTimeout(twitch, 3000 + Math.random() * 4000));

    let frame = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.4;
      const dx = px - cx;
      const dy = py - cy;
      const lx = Math.max(-1, Math.min(1, dx / 420));
      const ly = Math.max(-1, Math.min(1, dy / 360));
      el.style.setProperty("--lx", lx.toFixed(3));
      el.style.setProperty("--ly", ly.toFixed(3));
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
      el.style.setProperty("--lx", (Math.random() * 1.6 - 0.8).toFixed(2));
      el.style.setProperty("--ly", (Math.random() * 0.8 - 0.3).toFixed(2));
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
  }, [track]);

  const w = typeof size === "number" ? `${size}px` : size;

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 224"
      className={`foxy ${className}`}
      data-pose={pose}
      data-expr={expr}
      data-react={react}
      data-flip={flip ? "1" : undefined}
      style={{ width: w, height: "auto" }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <UidCtx.Provider value={uid}>
      <ellipse className="fx-shadow" cx={100} cy={213} rx={50} ry={6.5} fill="#1b1826" opacity={0.14} />
      <g className="fx-flip">
        <g className="fx-rig">
          {/* Tail sits behind the body; pivots at its root */}
          <Pivot x={132} y={188} className="fx-tail">
            <defs>
              <clipPath id={`${uid}-tail`}>
                <path d="M132 198C170 206 198 182 194 144C192 122 177 108 164 114C175 136 165 168 134 174Z" />
              </clipPath>
            </defs>
            <path d="M132 198C170 206 198 182 194 144C192 122 177 108 164 114C175 136 165 168 134 174Z" fill={C.fur} />
            <g clipPath={`url(#${uid}-tail)`}>
              <circle cx={186} cy={116} r={26} fill={C.cream} />
            </g>
            <path d="M132 198C170 206 198 182 194 144C192 122 177 108 164 114C175 136 165 168 134 174Z" fill="none" stroke={C.line} strokeWidth={SW} strokeLinejoin="round" />
          </Pivot>

          <g className="fx-feet">
            <ellipse cx={82} cy={205} rx={15} ry={8.5} fill={C.sock} stroke={C.line} strokeWidth={SW} />
            <ellipse cx={118} cy={205} rx={15} ry={8.5} fill={C.sock} stroke={C.line} strokeWidth={SW} />
          </g>

          <g className="fx-breathe">
            <path d="M72 124C60 146 56 182 66 204H134C144 182 140 146 128 124Z" fill={C.fur} stroke={C.line} strokeWidth={SW} strokeLinejoin="round" />
            <path d="M85 141C77 159 79 189 87 202H113C121 189 123 159 115 141C107 135 93 135 85 141Z" fill={C.cream} />

            <Arm side="l" />
            <Arm side="r" />

            {/* Brand scarf */}
            <g className="fx-scarf">
              <path d="M70 121Q100 138 130 121L133 133Q100 151 67 133Z" fill={C.scarf} stroke={C.line} strokeWidth={SW} strokeLinejoin="round" />
              <path d="M89 139L113 139L101 158Z" fill={C.scarfDark} stroke={C.line} strokeWidth={SW} strokeLinejoin="round" />
            </g>

            <Props />
          </g>

          <Pivot x={100} y={126} className="fx-head">
            <Ear side="l" />
            <Ear side="r" />
            <path
              d="M100 34C132 34 158 52 160 82L173 92L158 97L166 108C150 126 126 134 100 134C74 134 50 126 34 108L42 97L27 92L40 82C42 52 68 34 100 34Z"
              fill={C.fur}
              stroke={C.line}
              strokeWidth={SW}
              strokeLinejoin="round"
            />
            <path d="M89 37C90 27 97 24 100 30C103 23 111 26 112 37" fill={C.fur} stroke={C.line} strokeWidth={SW} strokeLinejoin="round" strokeLinecap="round" />
            <path d="M84 40Q100 33 116 40L116 44Q100 38 84 44Z" fill={C.fur} />
            <path
              d="M51 101C56 88 76 84 90 95C95 99 98 102 100 103C102 102 105 99 110 95C124 84 144 88 149 101C147 118 128 131 100 132C72 131 53 118 51 101Z"
              fill={C.cream}
            />
            <g className="fx-face">
              <ellipse cx={65} cy={112} rx={8.5} ry={4.8} fill={C.blush} opacity={0.75} />
              <ellipse cx={135} cy={112} rx={8.5} ry={4.8} fill={C.blush} opacity={0.75} />
              <g className="fx-eyes">
                <Eye cx={79} />
                <Eye cx={121} />
              </g>
              <g className="fx-brows">
                <path d="M68 76q9-5 19-1" fill="none" stroke={C.line} strokeWidth={3} strokeLinecap="round" />
                <path d="M113 73q10-3 19 3" fill="none" stroke={C.line} strokeWidth={3} strokeLinecap="round" />
              </g>
              <path d="M94 108Q100 105 106 108Q104 113 100 114Q96 113 94 108Z" fill={C.line} stroke={C.line} strokeWidth={1.5} strokeLinejoin="round" />
              <path className="fx-mouth-closed" d="M92.5 117.5Q96.5 121.5 100 118Q103.5 121.5 107.5 117.5" fill="none" stroke={C.line} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
              <g className="fx-mouth-open">
                <path d="M93 117Q100 130 107 117Z" fill="#7a2a2a" stroke={C.line} strokeWidth={2.4} strokeLinejoin="round" />
                <path d="M96.5 122.5Q100 126.5 103.5 122.5Q100 120.5 96.5 122.5Z" fill="#ff8a8a" />
              </g>
              <g className="fx-glasses" fill="none" stroke={C.line} strokeWidth={3}>
                <circle cx={79} cy={95} r={14} fill="rgba(255,255,255,0.25)" />
                <circle cx={121} cy={95} r={14} fill="rgba(255,255,255,0.25)" />
                <path d="M93 94q7-4 14 0" />
              </g>
            </g>
          </Pivot>

          {/* Raised paws render in front of the head */}
          <g className="fx-front-arms">
            <Arm side="l" front />
            <Arm side="r" front />
          </g>
        </g>
      </g>
      <Reactions />
      </UidCtx.Provider>
    </svg>
  );
}
