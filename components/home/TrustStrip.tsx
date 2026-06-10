import { DigitRoll } from "@/components/ui/DigitRoll";
import { InView } from "@/components/ui/InView";

/**
 * §5.3 Trust Strip - sunken band directly under the hero. Four mono stat
 * chips separated by hairlines; the star fills marigold left→right on
 * reveal and the numbers roll in via DigitRoll. Below `md` the row becomes
 * a horizontal marquee (paused on hover/focus, stopped under
 * reduced-motion). Light section - no perforation on either side.
 */

const STAR_PATH =
  "M12 2.6l2.86 5.8 6.4.93-4.63 4.51 1.09 6.37L12 17.2l-5.72 3.01 1.09-6.37L2.74 9.33l6.4-.93L12 2.6z";

/**
 * Five-point star that fills marigold left→right: a star-clipped
 * full-height stroke drawn via `.draw-path`, over a static outline
 * (no-JS and reduced-motion users see it already filled).
 */
function Star({ clipId }: { clipId: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <path d={STAR_PATH} />
        </clipPath>
      </defs>
      <path
        d="M0 12h24"
        fill="none"
        stroke="var(--color-marigold-500)"
        strokeWidth={24}
        clipPath={`url(#${clipId})`}
        pathLength={400}
        className="draw-path"
        style={{ "--draw-delay": "200ms" } as React.CSSProperties}
      />
      <path
        d={STAR_PATH}
        fill="none"
        stroke="var(--color-marigold-700)"
        strokeWidth={1.25}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The four stat chips. `withDividers` adds a per-cell hairline for the marquee loop. */
function StatItems({ starId, withDividers = false }: { starId: string; withDividers?: boolean }) {
  const cell = `till flex items-center justify-center gap-2 whitespace-nowrap px-4 py-1 text-[0.875rem] text-ink-700${
    withDividers ? " border-r border-paper-edge" : ""
  }`;
  return (
    <>
      <div className={cell}>
        <Star clipId={starId} />
        <span>
          <DigitRoll value="4.9/5" /> on Shopify
        </span>
      </div>
      <div className={cell}>
        <span>
          <DigitRoll value="~80%" /> of common edits self-served
        </span>
      </div>
      <div className={cell}>
        <span>
          <DigitRoll value="5" />
          -minute setup
        </span>
      </div>
      <div className={cell}>
        <span>All Shopify plans</span>
      </div>
    </>
  );
}

export function TrustStrip() {
  return (
    <section aria-label="AppFox at a glance" className="border-y border-paper-edge bg-paper-sunken">
      <InView>
        {/* lg+: one row, hairline-separated (4 nowrap columns need the room) */}
        <div className="mx-auto hidden max-w-7xl grid-cols-4 divide-x divide-paper-edge px-4 py-5 sm:px-6 lg:grid lg:px-8">
          <StatItems starId="ts-star-d" />
        </div>

        {/* Below lg: horizontal marquee, content duplicated for a seamless loop */}
        <div className="marquee-pause overflow-hidden py-4 lg:hidden">
          <div className="marquee-x flex w-max items-center">
            <div className="flex items-center">
              <StatItems starId="ts-star-m1" withDividers />
            </div>
            <div className="flex items-center" aria-hidden="true">
              <StatItems starId="ts-star-m2" withDividers />
            </div>
          </div>
        </div>
      </InView>
    </section>
  );
}
