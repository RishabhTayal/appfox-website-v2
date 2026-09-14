import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { apps } from "@/data/apps";
import { BrandHero } from "@/components/brand/BrandHero";
import { AppShowcase } from "@/components/brand/AppShowcase";
import { WhyAppfox } from "@/components/brand/WhyAppfox";
import { BrandFaq } from "@/components/brand/BrandFaq";
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
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <BrandHero />
        <AppShowcase />
        <WhyAppfox />
        <BrandReading />
        <BrandFaq />
        <CtaBand
          headline="Your store. With more possibility."
          body="Give customers more freedom, bring them back for the next order, and make every basket count. Start with one AppFox app."
          primaryLabel="Find your AppFox app"
          primaryHref="/apps"
        />
      </main>
      <Footer />
    </>
  );
}
