import Image from "next/image";

/** Keep the official AppFox mark alongside the site's shared typography. */
export function Wordmark({
  className = "text-2xl",
  onNight = false,
}: {
  className?: string;
  onNight?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-semibold tracking-tight ${onNight ? "text-cream-on-night" : "text-ink-900"} ${className}`}
    >
      <Image
        src="/images/brand/appfox-icon.png"
        width={32}
        height={32}
        alt=""
        className="h-8 w-8 rounded-lg"
      />
      AppFox
    </span>
  );
}
