/** AppFox wordmark — Fraunces with the marigold full-stop after the x. */
export function Wordmark({
  className = "text-2xl",
  onNight = false,
}: {
  className?: string;
  onNight?: boolean;
}) {
  return (
    <span
      className={`font-display font-[560] tracking-tight ${
        onNight ? "text-cream-on-night" : "text-ink-900"
      } ${className}`}
      style={{ fontVariationSettings: '"SOFT" 60, "WONK" 0' }}
    >
      AppFox
      <span aria-hidden="true" className="inline-block w-[0.18em] h-[0.18em] rounded-full bg-marigold-500 ml-[0.08em]" />
    </span>
  );
}
