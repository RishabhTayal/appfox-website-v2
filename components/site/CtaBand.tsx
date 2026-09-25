import Link from "next/link";
import { site } from "@/lib/site";
import { Scene } from "@/components/scene/Scene";
import { FoxCameo } from "@/components/fox/FoxCameo";
import type { FoxPose } from "@/components/fox/Foxy";

/**
 * Closing call-to-action: a dusk fox-country scene with the headline on
 * the sky, the bright white install pill, and Foxy standing on the near
 * hill. The paper foreground melts straight into the footer below.
 */
export function CtaBand({
  headline,
  body,
  primaryLabel = "Install free on Shopify",
  primaryHref = site.installUrl,
  secondaryLabel,
  secondaryHref,
  foxPose = "wave",
}: {
  headline: string;
  body: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** kept for API compatibility with the old perforated band */
  from?: "paper" | "sunken" | "raised";
  foxPose?: FoxPose;
}) {
  return (
    <section className="on-night relative isolate overflow-hidden bg-night">
      <Scene variant="dusk" seed={41} sunAt={[1190, 560, 64]} />
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-72 pt-24 text-center sm:px-8 sm:pb-80 sm:pt-32 lg:px-10">
        <p className="eyebrow !text-white/70">Ready when you are</p>
        <h2 className="mx-auto mt-5 max-w-3xl !text-white">{headline}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{body}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={primaryHref} className="btn-marigold">
            {primaryLabel}
          </a>
          {secondaryLabel && secondaryHref ? (
            secondaryHref.startsWith("/") ? (
              <Link href={secondaryHref} className="btn-secondary on-night">
                {secondaryLabel}
              </Link>
            ) : (
              <a href={secondaryHref} className="btn-secondary on-night">
                {secondaryLabel}
              </a>
            )
          ) : null}
        </div>
        <p className="till mt-6 text-xs text-white/70">Free plan available · {site.supportEmail}</p>
      </div>
      <div className="absolute bottom-[7%] left-1/2 z-10 -translate-x-1/2 sm:left-auto sm:right-[12%] sm:translate-x-0">
        <FoxCameo pose={foxPose} expr="happy" size={150} />
      </div>
    </section>
  );
}
