const COLORS = {
  paper: "var(--color-paper)",
  sunken: "var(--color-paper-sunken)",
  night: "var(--color-night)",
  raised: "var(--color-paper-raised)",
} as const;

/**
 * Receipt-tear seam between two sections. Place as the first child of the
 * NEW section, with `from` set to the PREVIOUS section's background - the
 * punched holes let the new section show through.
 */
export function Perforation({ from = "paper" }: { from?: keyof typeof COLORS }) {
  return (
    <div
      aria-hidden="true"
      className="perforation"
      style={{ "--perf-color": COLORS[from] } as React.CSSProperties}
    />
  );
}
