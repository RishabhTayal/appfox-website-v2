/**
 * Small hand-drawn app marks for the three AppFox apps, used in the nav
 * menu, app windows and footer. Pure SVG, inherits nothing.
 */
const TILE: Record<string, string> = {
  "order-editing": "#7337e6",
  subscription: "#f2782f",
  "product-bundles": "#0f8a5f",
};

export function AppGlyph({ slug, size = 40, className = "" }: { slug: string; size?: number; className?: string }) {
  const bg = TILE[slug] ?? "#1a1714";
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-[28%] ${className}`}
      style={{
        width: size,
        height: size,
        background: bg,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.28), inset 0 -2px 0 rgba(0,0,0,.14), 0 4px 10px -4px rgba(26,23,20,.35)",
      }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58} fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {slug === "order-editing" ? (
          <>
            <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5Z" />
            <path d="M4 8.5 12 13l8-4.5M12 13v7" opacity={0.55} />
            <path d="m15.5 17.5 4-4 1.5 1.5-4 4H15.5Z" fill="#fff" />
          </>
        ) : slug === "subscription" ? (
          <>
            <path d="M19 12a7 7 0 0 1-12.2 4.7M5 12a7 7 0 0 1 12.2-4.7" />
            <path d="M17.5 3.5v4h-4M6.5 20.5v-4h4" />
          </>
        ) : slug === "product-bundles" ? (
          <>
            <rect x="3.5" y="11" width="8" height="8" rx="1.5" />
            <rect x="12.5" y="11" width="8" height="8" rx="1.5" />
            <rect x="8" y="3.5" width="8" height="7.5" rx="1.5" />
          </>
        ) : (
          <circle cx="12" cy="12" r="6" />
        )}
      </svg>
    </span>
  );
}
