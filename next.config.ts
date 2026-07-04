import type { NextConfig } from "next";

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
};

export default nextConfig;
