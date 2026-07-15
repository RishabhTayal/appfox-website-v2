import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Spline_Sans_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { CrispChat } from "@/components/site/CrispChat";
import "./globals.css";

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
    default: "AppFox - Shopify Apps for Order Editing, Upsells & Subscriptions",
  },
  description:
    "Shopify apps for the whole order journey: self-service order editing with one-click upsells, and subscriptions that start right on the product page. Install free in 5 minutes.",
  applicationName: site.name,
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
  themeColor: "#f5f3fa",
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
      className={`${hanken.variable} ${splineMono.variable} h-full`}
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
        <Analytics />
        <CrispChat />
      </body>
    </html>
  );
}
