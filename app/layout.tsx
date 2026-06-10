import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk, Spline_Sans_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const splineMono = Spline_Sans_Mono({
  variable: "--font-spline-mono",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    template: "%s | AppFox",
    default: "Shopify Order Editing App - Self-Service + Upsells | AppFox",
  },
  description:
    "Give every Shopify order a self-service edit link - address fixes, size swaps, cancellations - plus one-click upsells in the flow. Install free in 5 minutes.",
  applicationName: site.appName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "AppFox",
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f1",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: `${site.url}/`,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/icon.svg`,
      },
      email: site.supportEmail,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: site.supportEmail,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // the inline head script adds .js before hydration - expected mismatch
      suppressHydrationWarning
      className={`${fraunces.variable} ${hanken.variable} ${splineMono.variable} h-full`}
    >
      <head>
        {/* Gate hidden pre-animation states behind html.js so content is
            always visible to crawlers and no-JS users (LCP/SEO guardrail) */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <JsonLd data={organizationJsonLd} />
        {children}
      </body>
    </html>
  );
}
