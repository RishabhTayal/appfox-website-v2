"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const COLS = 14;
const ROWS = 9;
// deterministic scatter so SSR/CSR agree
const DELAYS = Array.from({ length: COLS * ROWS }, (_, i) => ((i * 37 + (i % COLS) * 11) % 97) / 97);

/**
 * Site-wide pixel flourishes:
 * - a pixel-dissolve wipe when you move between pages (not on first load)
 * - a tiny 8-bit burst of squares when a button is pressed
 * Both are purely decorative and disabled under prefers-reduced-motion.
 */
export function PixelFX() {
  const pathname = usePathname();
  const [initialPath] = useState(pathname);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const COLORS = ["#f2782f", "#7c3aed", "#ffd23f", "#2f9e62"];
    const onClick = (e: MouseEvent) => {
      if (reduced.matches || e.detail === 0) return;
      const t = (e.target as Element | null)?.closest(".btn-primary, .btn-secondary, .btn-marigold");
      if (!t) return;
      const layer = document.createElement("span");
      layer.className = "px-burst";
      layer.setAttribute("aria-hidden", "true");
      layer.style.left = `${e.clientX}px`;
      layer.style.top = `${e.clientY}px`;
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + 0.3;
        const sq = document.createElement("i");
        sq.style.setProperty("--dx", `${Math.round(Math.cos(a) * 26 / 3) * 3}px`);
        sq.style.setProperty("--dy", `${Math.round(Math.sin(a) * 26 / 3) * 3}px`);
        sq.style.background = COLORS[i % COLORS.length];
        layer.appendChild(sq);
      }
      document.body.appendChild(layer);
      window.setTimeout(() => layer.remove(), 520);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (pathname === initialPath) return null;
  return (
    <div key={pathname} className="px-wipe" aria-hidden="true">
      {DELAYS.map((d, i) => (
        <i key={i} style={{ animationDelay: `${Math.round(d * 260)}ms` }} />
      ))}
    </div>
  );
}
