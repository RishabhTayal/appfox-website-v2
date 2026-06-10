/**
 * Hand-drawn success tick - never a ✓ character. Draws on when an
 * ancestor `InView` adds `.is-visible` (CSS `.draw-path`).
 */
export function DrawTick({
  className = "h-4 w-4 text-success",
  delay = 0,
}: {
  className?: string;
  /** draw-on delay in ms (stagger within a list/table) */
  delay?: number;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M4 12.5l5 5L20 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={400}
        className="draw-path"
        style={{ "--draw-delay": `${delay}ms` } as React.CSSProperties}
      />
    </svg>
  );
}
