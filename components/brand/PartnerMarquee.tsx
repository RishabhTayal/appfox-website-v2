import Image from "next/image";
import Link from "next/link";
import { subscriptionIntegrations } from "@/data/subscription-integrations";

/**
 * "Plays nicely with" - an endless row of real partner / integration
 * logos (only entries that ship a logo file in /public/images/integrations).
 * Pauses on hover/focus; static under reduced motion.
 */
const LOGOS = subscriptionIntegrations.filter((i) => i.logoSrc);

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {LOGOS.map((l) => (
        <li
          key={l.slug}
          className="flex h-14 items-center gap-3 rounded-2xl border border-paper-edge bg-paper-raised px-4 shadow-(--shadow-card)"
        >
          <Image src={l.logoSrc!} alt={hidden ? "" : `${l.name} logo`} width={28} height={28} className="h-7 w-7 rounded-md object-contain" />
          <span className="whitespace-nowrap text-sm font-medium text-ink-700">{l.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function PartnerMarquee() {
  return (
    <section aria-label="Integrations and partners" className="relative bg-paper pt-6">
      <div className="mx-auto max-w-7xl px-6 text-center sm:px-8 lg:px-10">
        <p className="eyebrow">Plays nicely with your stack</p>
      </div>
      <div className="marquee-pause relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-x-slow flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
      <p className="mt-5 text-center text-sm text-ink-500">
        <Link href="/subscription/integrations" className="font-medium text-ink-700 underline decoration-paper-edge underline-offset-4 transition-colors hover:text-ink-900 hover:decoration-ink-300">
          See all Subscription integrations →
        </Link>
      </p>
    </section>
  );
}
