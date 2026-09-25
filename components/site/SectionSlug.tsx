/**
 * Section eyebrow: a small fox-orange diamond + mono uppercase label
 * (`THE HOUSE RULES`), with an optional right-aligned caption. The
 * number is kept for screen order but rendered quietly.
 */
export function SectionSlug({
  no,
  label,
  caption,
  onNight = false,
}: {
  no: string;
  label: string;
  caption?: string;
  onNight?: boolean;
}) {
  return (
    <div className={`section-slug${onNight ? " on-night" : ""}`}>
      <span className="slug-label">
        <span className="opacity-60">{no}</span> {label}
      </span>
      {caption ? <span className="slug-caption">{caption}</span> : null}
    </div>
  );
}
