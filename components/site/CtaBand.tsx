import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand({
  headline,
  body,
  primaryLabel = "Install free on Shopify",
  primaryHref = site.installUrl,
  secondaryLabel,
  secondaryHref,
}: {
  headline: string;
  body: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  from?: "paper" | "sunken" | "raised";
}) {
  return (
    <section className="grain grain-soft bg-paper py-20 sm:pb-24">
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 sm:px-8 lg:grid-cols-[2fr_1fr] lg:gap-16">
        <div>
          <p className="text-sm text-ink-500">Your next chapter starts here</p>
          <h2 className="mt-4 max-w-3xl">{headline}</h2>
          <p className="mt-6 max-w-xl text-lg text-ink-500">{body}</p>
        </div>
        <div className="flex flex-col items-start gap-6 lg:items-end">
          {primaryHref.startsWith("/") ? (
            <Link href={primaryHref} className="btn-primary">
              {primaryLabel}
              <span aria-hidden="true">↗</span>
            </Link>
          ) : (
            <a href={primaryHref} className="btn-primary">
              {primaryLabel}
              <span aria-hidden="true">↗</span>
            </a>
          )}
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="text-sm text-ink-500 hover:text-ink-900"
            >
              {secondaryLabel} ↗
            </Link>
          )}
          <p className="text-xs text-ink-500">
            Free plan available. Start at your own pace.
          </p>
        </div>
      </div>
    </section>
  );
}
