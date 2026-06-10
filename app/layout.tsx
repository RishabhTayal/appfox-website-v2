import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AppFox – Order Edit & Upsell | Post-Purchase App for Shopify",
  description:
    "Let customers edit their orders after purchase and serve smart post-purchase upsells. Reduce support tickets, increase AOV, and delight customers on Shopify.",
  openGraph: {
    title: "AppFox – Order Edit & Upsell",
    description:
      "Let customers edit orders after purchase and boost revenue with smart upsells. Built for Shopify merchants.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
