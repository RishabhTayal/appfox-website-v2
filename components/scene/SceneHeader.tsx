import { Scene, type SceneVariant } from "./Scene";
import { FoxCameo } from "@/components/fox/FoxCameo";
import type { FoxExpr, FoxPose, FoxReact } from "@/components/fox/Foxy";

/**
 * Page header set in fox country: the page's own copy sits on the sky,
 * the hills roll in underneath, and Foxy stands on the near hill in a
 * pose that fits the page (holding a parcel on Order Editing, a renewal
 * calendar on Subscription, juggling boxes on Bundles, reading on the
 * blog...). Each product family gets its own time of day.
 */
export function SceneHeader({
  variant = "meadow",
  seed = 11,
  pose = "point",
  expr = "open",
  react = "none",
  foxSize = 150,
  foxSide = "right",
  hills = "md",
  children,
  className = "",
}: {
  variant?: SceneVariant;
  seed?: number;
  pose?: FoxPose;
  expr?: FoxExpr;
  react?: FoxReact;
  foxSize?: number;
  /** how much room to leave for the hills under the content */
  hills?: "sm" | "md" | "lg";
  /** which side of the hill Foxy stands on */
  foxSide?: "left" | "right";
  children: React.ReactNode;
  className?: string;
}) {
  const spacer = hills === "sm" ? "h-[clamp(120px,17vw,250px)]" : hills === "lg" ? "h-[clamp(150px,21vw,300px)]" : "h-[clamp(135px,19vw,280px)]";
  return (
    <section className={`relative isolate overflow-hidden bg-paper ${className}`} data-fox-pose={pose} data-fox-expr={expr}>
      <Scene variant={variant} seed={seed} />
      <div className="relative z-10">{children}</div>
      <div aria-hidden="true" className={spacer} />
      <div className={`absolute bottom-[clamp(18px,3vw,44px)] z-10 ${foxSide === "left" ? "left-[5%] sm:left-[6%]" : "right-[5%] sm:right-[8%]"}`}>
        <FoxCameo pose={pose} expr={expr} react={react} size={foxSize} className="w-24 sm:w-auto [&>button]:!w-24 sm:[&>button]:!w-auto" />
      </div>
    </section>
  );
}
