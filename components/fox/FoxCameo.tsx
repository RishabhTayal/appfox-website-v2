"use client";

import { useRef, useState } from "react";
import { Foxy, type FoxExpr, type FoxPose, type FoxReact } from "./Foxy";

const REACTS: FoxReact[] = ["heart", "sparkle", "bang", "heart"];

/**
 * A fox that lives inside an illustration (hero scenes, 404, footer).
 * Marked `data-fox-cameo` so the site-wide pet steps aside while this
 * one is on screen. Boopable: click/tap for a squash + reaction.
 */
export function FoxCameo({
  pose = "wave",
  expr = "open",
  react = "none",
  size = 180,
  flip = false,
  className = "",
  label = "Foxy, the AppFox mascot",
}: {
  pose?: FoxPose;
  expr?: FoxExpr;
  react?: FoxReact;
  size?: number | string;
  flip?: boolean;
  className?: string;
  label?: string;
}) {
  const [boop, setBoop] = useState<{ expr: FoxExpr; react: FoxReact } | null>(null);
  const idx = useRef(0);
  const wrap = useRef<HTMLButtonElement>(null);
  const t = useRef<number>(0);

  const onBoop = () => {
    const svg = wrap.current?.querySelector("svg");
    if (svg && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      svg.classList.remove("fx-pop");
      void svg.getBoundingClientRect();
      svg.classList.add("fx-pop");
    }
    setBoop({ expr: "happy", react: REACTS[idx.current++ % REACTS.length] });
    clearTimeout(t.current);
    t.current = window.setTimeout(() => setBoop(null), 1400);
  };

  return (
    <div data-fox-cameo className={`fox-cameo ${className}`}>
      <button
        ref={wrap}
        type="button"
        onClick={onBoop}
        aria-label={`${label}. Press to boop.`}
        className="block cursor-pointer rounded-3xl bg-transparent p-0 [-webkit-tap-highlight-color:transparent]"
        style={{ width: typeof size === "number" ? `${size}px` : size }}
      >
        <Foxy
          pose={pose}
          expr={boop?.expr ?? expr}
          react={boop?.react ?? react}
          flip={flip}
          track
          size="100%"
        />
      </button>
    </div>
  );
}
