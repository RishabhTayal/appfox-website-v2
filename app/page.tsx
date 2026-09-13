import { PremiumNavbar } from "@/components/site/PremiumNavbar";
import { Footer } from "@/components/site/Footer";
import { PremiumCtaBand } from "@/components/site/PremiumCtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { apps } from "@/data/apps";
import { PremiumHero } from "@/components/brand/PremiumHero";
import { PremiumShowcase } from "@/components/brand/PremiumShowcase";
import { PremiumWhyAppfox } from "@/components/brand/PremiumWhyAppfox";
import { BrandReading } from "@/components/brand/BrandReading";

const appListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${site.url}/#apps`,
  name: "AppFox apps for Shopify",
  itemListElement: apps.map((app, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: app.name,
    url: `${site.url}${app.href}`,
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={appListJsonLd} />
      <PremiumNavbar />
      <main className="flex-1">
        <PremiumHero />
        <PremiumShowcase />
        <PremiumWhyAppfox />
        <BrandReading />
        <PremiumCtaBand
          headline="Three apps. One quieter inbox."
          body="Order Editing lets customers fix and grow their own orders; Product Bundles boosts average order value; Subscription brings them back on a schedule. All three start free and set up in about five minutes."
          primaryLabel="Get Order Editing"
          primaryHref={site.installUrl}
          secondaryLabel="See all apps"
          secondaryHref="/apps"
        />
      </main>
      <Footer />
    </>
  );
}
