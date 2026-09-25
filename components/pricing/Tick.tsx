/**
 * Hand-drawn SVG tick (never a ✓ character) - draws on via `.draw-path`
 * when an ancestor gains `.is-visible` (Reveal or InView). Shared by the
 * pricing cards and the plan-difference table.
 */
export function Tick({
  delay = 0,
  className = "mt-1 h-4 w-4 shrink-0",
}: {
  /** draw-on delay in ms */
  delay?: number;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        className="draw-path"
        pathLength={400}
        d="M3 12h3v3h3v3h3v-3h3v-3h3v-3h3"
        stroke="var(--color-success)"
        strokeWidth={2.75}
        strokeLinecap="square"
        strokeLinejoin="miter"
        style={{ "--draw-delay": `${delay}ms` } as React.CSSProperties}
      />
    </svg>
  );
}
