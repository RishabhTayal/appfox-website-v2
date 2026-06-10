import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { PainSection } from "@/components/home/PainSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { EditTypes } from "@/components/home/EditTypes";
import { ControlRoom } from "@/components/home/ControlRoom";
import { UpsellStory } from "@/components/home/UpsellStory";
import { TheMath } from "@/components/home/TheMath";
import { Integrations } from "@/components/home/Integrations";
import { PricingSection } from "@/components/home/PricingSection";
import { FurtherReading } from "@/components/home/FurtherReading";
import { FaqSection, homeFaqs } from "@/components/home/FaqSection";

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${site.url}/#app`,
  name: site.appName,
  url: `${site.url}/`,
  description: site.shortDescription,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Shopify App",
  operatingSystem: "Web",
  author: { "@id": `${site.url}/#organization` },
  // aggregateRating deliberately omitted until the App Store listing has
  // verifiable public reviews - see the note in lib/site.ts.
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: String(site.pricing.free.price),
    highPrice: String(site.pricing.pro.price),
    offerCount: 3,
    offers: [
      { "@type": "Offer", name: site.pricing.free.name, price: String(site.pricing.free.price), priceCurrency: "USD" },
      { "@type": "Offer", name: site.pricing.growth.name, price: String(site.pricing.growth.price), priceCurrency: "USD" },
      { "@type": "Offer", name: site.pricing.pro.name, price: String(site.pricing.pro.price), priceCurrency: "USD" },
    ],
  },
  featureList: [
    "Self-service order editing portal (tokenized link, no login)",
    "Shipping address changes with validation and autocomplete",
    "Variant swaps, quantity updates, add/remove items, cancellations",
    "Eligibility engine: edit windows, fulfillment cutoffs, per-action rules",
    "Approval queue or auto-apply, per edit type, with audit timeline",
    "Automatic payments and partial refunds on price differences",
    "In-place editing via Shopify's native Order Editing API",
    "Post-purchase upsells inside the edit flow, one-click add",
    "Shopify Flow, Gorgias, and Slack integrations",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/#faq`,
  mainEntity: homeFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <PainSection />
        <HowItWorks />
        <EditTypes />
        <ControlRoom />
        <UpsellStory />
        <TheMath />
        <Integrations />
        <PricingSection />
        <FurtherReading />
        <FaqSection />
        <CtaBand
          headline={"Your next \u201ccan I change my order?\u201d email could be your last"}
          body="Install AppFox, set your rules, and let ~80% of common edits handle themselves - while the edit flow quietly grows your average order. Setup takes about 5 minutes, and the free plan doesn’t expire."
          secondaryLabel="Compare plans"
          secondaryHref="/pricing"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
