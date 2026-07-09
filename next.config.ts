import type { NextConfig } from "next";
import {
  BUNDLES_SITE_URL,
  legacyBundleSlugs,
} from "./data/legacyBundleRedirects";

const nextConfig: NextConfig = {
  // Stray lockfiles in $HOME and ~/Desktop/code make Next infer the wrong
  // workspace root (and watch far too many files); pin it to this repo.
  turbopack: {
    root: __dirname,
  },
  experimental: {
    // Restoring the Turbopack cache from .next spawns a flood of node
    // workers on this machine and hangs dev startup - keep it off.
    turbopackFileSystemCacheForDev: false,
  },
  // The old Product Bundles blog lived at getappfox.com/blog/<slug>; this site
  // (Order Editing & Upsell) now owns that path, so those URLs would 404 and
  // bleed their Google ranking. Send each one to the dedicated Bundles site
  // with a permanent 308 (equivalent content on another host = clean, ranking-
  // preserving migration). Per-slug sources — never a /blog/:slug* catch-all —
  // so this site's own posts are untouched. See data/legacyBundleRedirects.ts.
  async redirects() {
    return legacyBundleSlugs.map((slug) => ({
      source: `/blog/${slug}`,
      destination: `${BUNDLES_SITE_URL}/blog/${slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
