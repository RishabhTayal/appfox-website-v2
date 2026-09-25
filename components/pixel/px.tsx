/**
 * Tiny pixel-art toolkit. Artwork is written as rows of characters
 * (one char = one pixel, "." = transparent) and rendered as crisp SVG
 * paths - one path per colour, horizontal runs merged - so sprites stay
 * razor sharp at any size (`shape-rendering: crispEdges`) and cost only
 * a handful of DOM nodes.
 */

export type Bitmap = readonly string[];
export type PxPalette = Record<string, string>;

/** Mirror a bitmap left-right. */
export function flipX(rows: Bitmap): string[] {
  return rows.map((r) => [...r].reverse().join(""));
}

/** Build a symmetric bitmap from its left half. */
export function sym(half: Bitmap): string[] {
  return half.map((r) => r + [...r].reverse().join(""));
}

/** Shift each row sideways (used for swishy tail / wave frames). */
export function shear(rows: Bitmap, shiftFor: (row: number) => number): string[] {
  const w = Math.max(...rows.map((r) => r.length)) + 4;
  return rows.map((r, i) => {
    const s = shiftFor(i);
    const padded = ".".repeat(Math.max(0, s)) + r;
    return (s < 0 ? padded.slice(-s) : padded).padEnd(w, ".");
  });
}

const cache = new WeakMap<Bitmap, Record<string, string>>();

/** Path data per colour key for a bitmap at unit scale. */
export function runs(rows: Bitmap): Record<string, string> {
  const hit = cache.get(rows);
  if (hit) return hit;
  const out: Record<string, string> = {};
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === "." || ch === " ") {
        x++;
        continue;
      }
      let len = 1;
      while (row[x + len] === ch) len++;
      out[ch] = (out[ch] ?? "") + `M${x} ${y}h${len}v1h-${len}z`;
      x += len;
    }
  });
  cache.set(rows, out);
  return out;
}

/** Render a bitmap at (x, y) with an optional cell size. */
export function Px({
  rows,
  pal,
  x = 0,
  y = 0,
  cell = 1,
  className,
  opacity,
}: {
  rows: Bitmap;
  pal: PxPalette;
  x?: number;
  y?: number;
  cell?: number;
  className?: string;
  opacity?: number;
}) {
  const r = runs(rows);
  const t = cell === 1 ? `translate(${x} ${y})` : `translate(${x} ${y}) scale(${cell})`;
  return (
    <g transform={t} className={className} opacity={opacity}>
      {Object.entries(r).map(([k, d]) => (pal[k] ? <path key={k} d={d} fill={pal[k]} /> : null))}
    </g>
  );
}

/** Pixel disc (sun / moon) as rows. */
export function disc(radius: number, ch = "X"): string[] {
  const n = radius * 2;
  const rows: string[] = [];
  for (let y = 0; y < n; y++) {
    let row = "";
    for (let x = 0; x < n; x++) {
      const dx = x + 0.5 - radius;
      const dy = y + 0.5 - radius;
      row += dx * dx + dy * dy <= radius * radius ? ch : ".";
    }
    rows.push(row);
  }
  return rows;
}
