/**
 * Numbered receipt-line section opener: a hairline rule carrying a mono
 * slug (`NO. 03 — HOW IT WORKS`) and an optional right-aligned caption.
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
        NO. {no} — {label}
      </span>
      {caption ? <span className="slug-caption">{caption}</span> : null}
    </div>
  );
}
