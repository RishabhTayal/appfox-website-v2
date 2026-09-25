import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, Pixelify_Sans, Silkscreen } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { CrispChat } from "@/components/site/CrispChat";
import { FoxPet } from "@/components/fox/FoxPet";
import { PixelFX } from "@/components/pixel/PixelFX";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

// Pixel display faces - accents only (labels, badges, headline accents).
const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  themeColor: "#f5f4ef",
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
      className={`${geist.variable} ${geistMono.variable} ${bricolage.variable} ${silkscreen.variable} ${pixelify.variable} h-full`}
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
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VXQLZNGNF1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VXQLZNGNF1');
          `}
        </Script>
        
        {children}
        <FoxPet />
        <PixelFX />
        <Analytics />
        <CrispChat />
      </body>
    </html>
  );
}
