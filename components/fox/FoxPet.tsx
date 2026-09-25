"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Foxy, type FoxExpr, type FoxPose, type FoxReact } from "./Foxy";

/**
 * The site-wide fox. Lives in the bottom-left corner (the Crisp chat
 * bubble owns bottom-right) on every page and behaves like a small pet:
 *
 * - idle life: breathing, blinks, ear twitches, tail swish (in <Foxy>),
 *   eyes + head follow the cursor, and a random gesture every 8–14 s
 * - hover: happy squint + "Boop me · drag me" hint
 * - click / Enter: boop — squash, a reaction (heart, sparkle, !), and a
 *   little easter egg if you keep booping
 * - drag: dangles by the scruff and leans with your hand; let go and it
 *   drops with gravity, lands with a squash, and hops back home
 * - scroll: a quick scroll launches it; it hovers down on a wagging tail
 *   and sometimes gives you a smug look after a big flight
 * - sections tagged `data-fox-pose` (and optional `data-fox-expr`,
 *   `data-fox-say`) change its pose as they cross the middle of the screen
 * - while a hero "cameo" fox (`data-fox-cameo`) is on screen it steps
 *   away, then hops back in when the cameo scrolls off
 * - phones: tucks into the edge while you scroll, pops back when you stop
 * - naps after 45 s without input; wakes with a start
 * - prefers-reduced-motion: no flight, drag, gestures or ambient motion —
 *   just a friendly still fox whose expression changes when booped
 */

type Look = { pose: FoxPose; expr: FoxExpr; react: FoxReact };

const GESTURES: (Look & { ms: number })[] = [
  { pose: "wave", expr: "happy", react: "none", ms: 2600 },
  { pose: "think", expr: "open", react: "question", ms: 2600 },
  { pose: "celebrate", expr: "happy", react: "sparkle", ms: 1800 },
  { pose: "idle", expr: "smug", react: "none", ms: 2200 },
  { pose: "idle", expr: "happy", react: "heart", ms: 1800 },
];
const BOOPS: FoxReact[] = ["heart", "sparkle", "bang", "heart", "sparkle", "heart"];
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

type Mode = "idle" | "press" | "drag" | "return" | "fly";

export function FoxPet() {
  const pathname = usePathname();
  const [look, setLook] = useState<Look>({ pose: "idle", expr: "open", react: "none" });
  const [flip, setFlip] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [hint, setHint] = useState(false);
  const [away, setAway] = useState(false);
  const [peek, setPeek] = useState(false);
  const [out, setOut] = useState(false);
  const [enter, setEnter] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);

  const s = useRef({
    mode: "idle" as Mode,
    base: { pose: "idle", expr: "open" } as { pose: FoxPose; expr: FoxExpr },
    temp: false,
    hovered: false,
    napping: false,
    reduced: false,
    small: false,
    out: false,
    x: 0,
    y: 0,
    start: { x: 0, y: 0, px: 0, py: 0 },
    last: { x: 0, t: 0 },
    pointer: -1,
    boops: [] as number[],
    boopIdx: 0,
    lastGesture: -1,
    said: new Set<string>(),
    timers: {} as Record<string, number>,
    frame: 0,
    body: { y: 0, vy: 0, t: 0, since: 0, speed: 0, top: 0, time: 0, landed: true },
    lastScroll: { y: 0, t: 0 },
    anim: null as Animation | null,
  });

  const timer = useCallback((name: string, fn: () => void, ms: number) => {
    clearTimeout(s.current.timers[name]);
    s.current.timers[name] = window.setTimeout(fn, ms);
  }, []);

  const rest = useCallback(() => {
    const st = s.current;
    st.temp = false;
    clearTimeout(st.timers.look);
    setLook({ pose: st.base.pose, expr: st.hovered ? "happy" : st.base.expr, react: "none" });
  }, []);

  const temporary = useCallback(
    (l: Look, ms: number) => {
      s.current.temp = true;
      setLook(l);
      timer("look", rest, ms);
    },
    [rest, timer],
  );

  const pop = useCallback(() => {
    const svg = artRef.current?.querySelector("svg");
    if (!svg || s.current.reduced) return;
    svg.classList.remove("fx-pop");
    void (svg as unknown as HTMLElement).getBoundingClientRect();
    svg.classList.add("fx-pop");
    timer("pop", () => svg.classList.remove("fx-pop"), 520);
  }, [timer]);

  const say = useCallback(
    (text: string, ms = 2800) => {
      // On phones Foxy stays tucked in the gutter; only talk when popped out.
      if (s.current.small && !s.current.out) return;
      setBubble(text);
      timer("bubble", () => setBubble(null), ms);
    },
    [timer],
  );

  const place = useCallback((x: number, y: number) => {
    const st = s.current;
    st.x = x;
    st.y = y;
    if (bodyRef.current) bodyRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, []);

  const squash = useCallback(() => {
    const art = artRef.current;
    if (!art || s.current.reduced) return Promise.resolve();
    const a = art.animate(
      [
        { transform: "scale(1, 1)" },
        { transform: "scale(1.12, 0.86)", offset: 0.3 },
        { transform: "scale(0.96, 1.05)", offset: 0.7 },
        { transform: "scale(1, 1)" },
      ],
      { duration: 280, easing: "ease-out" },
    );
    return a.finished.then(() => a.cancel()).catch(() => undefined);
  }, []);

  /* ── activity / nap ─────────────────────────────────────────── */
  const wake = useCallback(() => {
    const st = s.current;
    timer(
      "nap",
      () => {
        if (st.mode !== "idle" || st.reduced) return;
        st.napping = true;
        st.temp = true;
        setLook({ pose: "sleep", expr: "closed", react: "zzz" });
      },
      45000,
    );
    if (st.napping) {
      st.napping = false;
      temporary({ pose: st.base.pose, expr: "wide", react: "bang" }, 900);
    }
  }, [temporary, timer]);

  /* ── boop ───────────────────────────────────────────────────── */
  const boop = useCallback(() => {
    const st = s.current;
    if (st.small) {
      // tap the tucked fox to pop it out for a few seconds
      st.out = true;
      setOut(true);
      timer("out", () => {
        st.out = false;
        setOut(false);
        setBubble(null);
      }, 4500);
    }
    const now = performance.now();
    st.boops = st.boops.filter((t) => now - t < 4000).concat(now);
    st.napping = false;
    pop();
    const react = BOOPS[st.boopIdx++ % BOOPS.length];
    if (st.boops.length >= 6) {
      st.boops = [];
      temporary({ pose: "celebrate", expr: "happy", react: "sparkle" }, 2200);
      say("Hehe — okay, that tickles!");
      return;
    }
    temporary({ pose: st.base.pose === "sleep" ? "idle" : st.base.pose, expr: "happy", react }, 1300);
  }, [pop, say, temporary, timer]);

  /* ── drag, drop, hop home ───────────────────────────────────── */
  const hopHome = useCallback(async () => {
    const st = s.current;
    const body = bodyRef.current;
    if (!body) return;
    st.mode = "return";
    try {
      if (st.y < -2) {
        setLook({ pose: "dangle", expr: "wide", react: "none" });
        const dur = clamp(Math.sqrt((2 * -st.y) / 2200) * 1000, 140, 1000);
        const a = (st.anim = body.animate(
          [{ transform: `translate3d(${st.x}px, ${st.y}px, 0)` }, { transform: `translate3d(${st.x}px, 0, 0)` }],
          { duration: dur, easing: "cubic-bezier(.33,0,.67,.33)", fill: "forwards" },
        ));
        await a.finished;
        place(st.x, 0);
        a.cancel();
        setLook({ pose: "idle", expr: "happy", react: "none" });
        await squash();
      }
      if (Math.abs(st.x) > 2) {
        setFlip(st.x < 0);
        setLook({ pose: "idle", expr: "happy", react: "none" });
        const hops = Math.max(1, Math.ceil(Math.abs(st.x) / 72));
        const step = -st.x / hops;
        for (let i = 0; i < hops; i++) {
          if (st.mode !== "return") return;
          const from = st.x;
          const to = i === hops - 1 ? 0 : from + step;
          const a = (st.anim = body.animate(
            [
              { transform: `translate3d(${from}px, 0, 0)` },
              { transform: `translate3d(${(from + to) / 2}px, -22px, 0)`, easing: "ease-in" },
              { transform: `translate3d(${to}px, 0, 0)` },
            ],
            { duration: 300, easing: "ease-out", fill: "forwards" },
          ));
          await a.finished;
          place(to, 0);
          a.cancel();
        }
        await squash();
      }
    } catch {
      /* interrupted by a new grab */
    }
    if (st.mode !== "return") return;
    st.anim = null;
    place(0, 0);
    setFlip(false);
    st.mode = "idle";
    rest();
  }, [place, rest, squash]);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    const st = s.current;
    if (!e.isPrimary || e.button !== 0) return;
    wake();
    if (st.reduced) return; // click still boops via onClick
    st.anim?.cancel();
    st.anim = null;
    if (st.mode === "fly") stopFlight(false);
    st.mode = "press";
    st.pointer = e.pointerId;
    st.start = { x: e.clientX - st.x, y: e.clientY - st.y, px: e.clientX, py: e.clientY };
    st.last = { x: e.clientX, t: e.timeStamp };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const st = s.current;
    if (e.pointerId !== st.pointer) return;
    if (st.mode === "press" && Math.hypot(e.clientX - st.start.px, e.clientY - st.start.py) > 5) {
      st.mode = "drag";
      setHint(false);
      setBubble(null);
      st.temp = true;
      setLook({ pose: "dangle", expr: "wide", react: "none" });
    }
    if (st.mode !== "drag") return;
    const root = rootRef.current!.getBoundingClientRect();
    const hx = root.left - st.x;
    const hy = root.top - st.y;
    const x = clamp(e.clientX - st.start.x, 8 - hx, window.innerWidth - root.width - hx - 8);
    const y = clamp(e.clientY - st.start.y, 70 - hy, 0);
    place(x, y);
    const now = e.timeStamp;
    const v = (e.clientX - st.last.x) / Math.max(8, now - st.last.t);
    st.last = { x: e.clientX, t: now };
    if (artRef.current) artRef.current.style.rotate = `${clamp(-v * 14, -18, 18)}deg`;
    timer("lean", () => artRef.current && (artRef.current.style.rotate = "0deg"), 120);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const st = s.current;
    if (e.pointerId !== st.pointer) return;
    st.pointer = -1;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (artRef.current) artRef.current.style.rotate = "0deg";
    if (st.mode === "drag") {
      void hopHome();
    } else if (st.mode === "press") {
      st.mode = "idle";
      boop();
    }
  };

  /* ── scroll flight ──────────────────────────────────────────── */
  // Imperative rAF/animation code; React Compiler is not enabled for this app.
  const stopFlight = useCallback(
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    (land: boolean) => {
      const st = s.current;
      cancelAnimationFrame(st.frame);
      st.frame = 0;
      if (artRef.current) {
        artRef.current.style.translate = "";
        artRef.current.style.rotate = "0deg";
      }
      if (st.mode === "fly") st.mode = "idle";
      if (!land) return;
      const big = st.body.top < -120;
      void squash();
      if (big && Math.random() < 0.6) temporary({ pose: st.base.pose, expr: "smug", react: "none" }, 2400);
      else rest();
    },
    [rest, squash, temporary],
  );

  const stepRef = useRef<(t: number) => void>(() => {});
  const step = useCallback(
    (time: number) => {
      const st = s.current;
      st.frame = 0;
      if (st.mode !== "fly") return;
      const b = st.body;
      const dt = Math.min(1 / 30, b.time ? (time - b.time) / 1000 : 1 / 60);
      b.time = time;
      b.t += dt;
      b.since += dt;
      let sway = 0;
      if (b.since < 0.14) {
        b.landed = false;
        const ceiling = clamp(window.innerHeight - 320, 60, 280);
        const target = -Math.max(14, ceiling * (1 - Math.exp(-b.speed / 2)));
        b.vy += (60 * (target - b.y) - 11 * b.vy) * dt;
        b.y += b.vy * dt;
        b.top = Math.min(b.top, b.y);
      } else {
        // hover down on a wagging tail
        b.vy += (190 - b.vy) * 4 * dt;
        b.y += b.vy * dt;
        sway = Math.sin(b.t * 2.6);
        if (b.y >= 0) {
          b.y = 0;
          b.landed = true;
        }
      }
      if (artRef.current) {
        artRef.current.style.translate = `${(sway * 7).toFixed(2)}px ${b.y.toFixed(2)}px`;
        artRef.current.style.rotate = `${(sway * 7).toFixed(2)}deg`;
      }
      if (b.landed) stopFlight(true);
      else st.frame = requestAnimationFrame((t) => stepRef.current(t));
    },
    [stopFlight],
  );
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  /* ── lifecycle ──────────────────────────────────────────────── */
  useEffect(() => {
    const st = s.current;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sm = window.matchMedia("(max-width: 640px)");
    const sync = () => {
      st.reduced = rm.matches;
      st.small = sm.matches;
    };
    sync();
    rm.addEventListener("change", sync);
    sm.addEventListener("change", sync);

    const onScroll = () => {
      const y = window.scrollY;
      const now = performance.now();
      const last = st.lastScroll;
      const speed = last.t ? Math.abs(y - last.y) / clamp(now - last.t, 8, 100) : 0;
      st.lastScroll = { y, t: now };
      wake();
      if (st.small) {
        // phones: duck fully out of the way while scrolling, then tuck back in
        if (st.out) {
          st.out = false;
          setOut(false);
          setBubble(null);
        }
        setPeek(true);
        timer("peek", () => setPeek(false), 1300);
        return;
      }
      if (st.reduced || document.hidden) return;
      if (st.mode !== "idle" && st.mode !== "fly") return;
      if (st.mode === "idle") {
        if (speed < 0.9) return;
        st.mode = "fly";
        st.temp = true;
        clearTimeout(st.timers.look);
        setHint(false);
        setLook({ pose: "fly", expr: "happy", react: "none" });
        st.body = { y: 0, vy: 0, t: 0, since: 0, speed: 0, top: 0, time: 0, landed: false };
      }
      const b = st.body;
      b.speed += (Math.min(speed, 10) - b.speed) * 0.35;
      b.since = 0;
      if (!st.frame) st.frame = requestAnimationFrame(step);
    };
    const onActivity = () => wake();

    // random gestures
    const gesture = () => {
      if (st.mode === "idle" && !st.temp && !st.hovered && !st.napping && !st.reduced && !document.hidden) {
        let i = Math.floor(Math.random() * GESTURES.length);
        if (i === st.lastGesture) i = (i + 1) % GESTURES.length;
        st.lastGesture = i;
        const g = GESTURES[i];
        temporary({ pose: g.pose, expr: g.expr, react: g.react }, g.ms);
      }
      timer("gesture", gesture, 8000 + Math.random() * 6000);
    };
    timer("gesture", gesture, 6000);
    wake();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity);
    const timers = st.timers;
    return () => {
      rm.removeEventListener("change", sync);
      sm.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onActivity);
      window.removeEventListener("keydown", onActivity);
      Object.values(timers).forEach(clearTimeout);
      cancelAnimationFrame(st.frame);
    };
  }, [step, temporary, timer, wake]);

  // Contextual poses + cameo hand-off; re-scanned on every route change.
  useEffect(() => {
    const st = s.current;
    let poseIO: IntersectionObserver | null = null;
    let cameoIO: IntersectionObserver | null = null;
    const t = window.setTimeout(() => {
      const ratios = new Map<Element, number>();
      let current: Element | null = null;
      const choose = () => {
        let best: Element | null = null;
        let bestR = 0;
        ratios.forEach((r, el) => {
          if (r > bestR) {
            bestR = r;
            best = el;
          }
        });
        if (best === current) return;
        current = best;
        const el = best as HTMLElement | null;
        st.base = {
          pose: ((el?.dataset.foxPose as FoxPose) || "idle") as FoxPose,
          expr: ((el?.dataset.foxExpr as FoxExpr) || "open") as FoxExpr,
        };
        if (st.mode === "idle" && !st.temp) {
          rest();
          pop();
        }
        const line = el?.dataset.foxSay;
        if (line && !st.said.has(line)) {
          st.said.add(line);
          say(line);
        }
      };
      const poseEls = document.querySelectorAll("[data-fox-pose]");
      st.base = { pose: "idle", expr: "open" };
      if (poseEls.length) {
        poseIO = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => ratios.set(en.target, en.isIntersecting ? en.intersectionRatio : 0));
            choose();
          },
          { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
        );
        poseEls.forEach((el) => poseIO!.observe(el));
      } else if (st.mode === "idle" && !st.temp) rest();

      const cameos = document.querySelectorAll("[data-fox-cameo]");
      if (!cameos.length) {
        setAway(false);
        return;
      }
      const vis = new Map<Element, boolean>();
      cameoIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => vis.set(en.target, en.isIntersecting));
          const anyVisible = Array.from(vis.values()).some(Boolean);
          setAway((was) => {
            if (was && !anyVisible) {
              setEnter(true);
              window.setTimeout(() => setEnter(false), 900);
              if (!st.reduced && st.mode === "idle")
                window.setTimeout(() => temporary({ pose: "wave", expr: "happy", react: "none" }, 2200), 350);
            }
            return anyVisible;
          });
        },
        { threshold: 0.25 },
      );
      cameos.forEach((el) => cameoIO!.observe(el));
    }, 120);
    return () => {
      clearTimeout(t);
      poseIO?.disconnect();
      cameoIO?.disconnect();
    };
  }, [pathname, pop, rest, say, temporary]);

  return (
    <div
      ref={rootRef}
      className="fox-pet"
      data-away={away ? "1" : undefined}
      data-peek={peek && !away ? "1" : undefined}
      data-out={out && !peek && !away ? "1" : undefined}
      data-hint={hint && !bubble ? "1" : undefined}
      data-enter={enter ? "1" : undefined}
    >
      <div ref={bodyRef} className="fp-body">
        {bubble ? (
          <p className="fp-bubble" aria-hidden="true">
            {bubble}
          </p>
        ) : null}
        <span className="fp-hint" aria-hidden="true">
          Boop me · drag me
        </span>
        <button
          ref={handleRef}
          type="button"
          className="fp-handle"
          aria-label="Foxy, the AppFox mascot. Press to boop."
          tabIndex={away ? -1 : 0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerEnter={(e) => {
            if (e.pointerType === "touch") return;
            const st = s.current;
            st.hovered = true;
            setHint(true);
            if (st.mode === "idle" && !st.temp) setLook({ pose: st.base.pose, expr: "happy", react: "none" });
          }}
          onPointerLeave={() => {
            const st = s.current;
            st.hovered = false;
            setHint(false);
            if (st.mode === "idle" && !st.temp) rest();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              boop();
            }
          }}
          onClick={(e) => {
            // keyboard + reduced-motion path (pointer boops fire on pointerup)
            if (s.current.reduced && e.detail > 0) boop();
          }}
          onDragStart={(e) => e.preventDefault()}
        >
          <div ref={artRef} className="fp-art">
            <Foxy pose={look.pose} expr={look.expr} react={look.react} flip={flip} track size="100%" />
          </div>
        </button>
      </div>
    </div>
  );
}
