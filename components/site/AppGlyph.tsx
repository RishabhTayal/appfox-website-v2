import { Px, type Bitmap } from "@/components/pixel/px";

/**
 * Pixel-art app marks for the three AppFox apps (nav menu, app windows,
 * cards, footer). 12x12 bitmaps on a notched-corner tile with a pixel
 * bevel. Pure SVG, decorative.
 */
const TILE: Record<string, string> = {
  "order-editing": "#7337e6",
  subscription: "#f2782f",
  "product-bundles": "#0f8a5f",
};

const ICONS: Record<string, Bitmap> = {
  "order-editing": [
    "....WWWW....",
    "..WWSSSSWW..",
    "WWSSSSSSSSWW",
    "WWWWSSSSWWWW",
    "W..WWWWWW..W",
    "W....WW....W",
    "W....WW..W.W",
    "W....WW.WW.W",
    "W....WWWW..W",
    "WW...WWW..WW",
    "..WW.WW.WW..",
    "....WWWW....",
  ],
  subscription: [
    "....WWWW....",
    "..WW....WW.W",
    ".W........WW",
    "W........WWW",
    "W...........",
    "W...........",
    "...........W",
    "...........W",
    "WWW........W",
    "WW........W.",
    "W.WW....WW..",
    "....WWWW....",
  ],
  "product-bundles": [
    "....WWWW....",
    "....WSSW....",
    "....WSSW....",
    "....WWWW....",
    "............",
    ".WWWW..WWWW.",
    ".WSSW..WSSW.",
    ".WSSW..WSSW.",
    ".WWWW..WWWW.",
    "............",
    "WWWWWWWWWWWW",
    "............",
  ],
};

export function AppGlyph({ slug, size = 40, className = "" }: { slug: string; size?: number; className?: string }) {
  const bg = TILE[slug] ?? "#1a1714";
  const icon = ICONS[slug];
  return (
    <span
      aria-hidden="true"
      className={`px-tile inline-flex shrink-0 items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        background: bg,
        boxShadow: "inset -3px -3px 0 rgba(0,0,0,.22), inset 3px 3px 0 rgba(255,255,255,.22)",
      }}
    >
      {icon ? (
        <svg viewBox="0 0 12 12" width={Math.round(size * 0.55)} height={Math.round(size * 0.55)} shapeRendering="crispEdges">
          <Px rows={icon} pal={{ W: "#fff", S: "rgba(255,255,255,0.45)" }} />
        </svg>
      ) : null}
    </span>
  );
}
