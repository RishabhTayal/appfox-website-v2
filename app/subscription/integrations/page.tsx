import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { pageMetadata } from "@/lib/seo";
import { getApp } from "@/data/apps";
import { SubscriptionIntegrations } from "@/components/subscription/SubscriptionIntegrations";
import { SceneHeader } from "@/components/scene/SceneHeader";

const subscriptionApp = getApp("subscription")!;

export const metadata: Metadata = pageMetadata({
  title: "AppFox Subscription Integrations - Works with Klaviyo, Flow & More",
  description:
    "AppFox Subscription integrates with Klaviyo, LoyaltyLion, Shopify Flow, PageFly, and more. Connect subscriptions to your marketing, loyalty, and automation stack.",
  path: "/subscription/integrations",
});

export default function SubscriptionIntegrationsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <SceneHeader variant="dawn" seed={71} pose="celebrate" expr="happy">
          <div className="mx-auto max-w-7xl px-6 pt-32 sm:px-8 sm:pt-40 lg:px-10">
            <p className="enter-fade-rise eyebrow">AppFox Subscription · Integrations</p>
            <h1 className="enter-rise mt-5 max-w-3xl">Subscription integrations &amp; partners</h1>
            <p className="enter-fade-rise mt-6 max-w-2xl text-xl leading-[1.55] text-ink-700" style={{ animationDelay: "120ms" }}>
              Connect AppFox Subscription to the marketing, loyalty, bundling, and automation
              tools you already run.
            </p>
            <div className="enter-fade-rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "200ms" }}>
              <a href={subscriptionApp.installUrl} className="btn-primary">Install free on Shopify</a>
              <Link href="/subscription" className="btn-secondary">About AppFox Subscription</Link>
            </div>
          </div>
        </SceneHeader>
        <SubscriptionIntegrations />
        <CtaBand
          headline="Ready to connect your subscription stack?"
          body="Install AppFox Subscription free and start integrating with the tools that power your business - from Klaviyo campaigns to Shopify Flow automations."
          primaryHref={subscriptionApp.installUrl}
          secondaryLabel="View pricing"
          secondaryHref="/pricing/subscription"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
