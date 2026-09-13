"use client";

import { Suspense, lazy, useState } from "react";
import { Canvas } from "@react-three/fiber";

// Lazy load the scene to avoid SSR issues and improve initial load
const CommerceScene = lazy(() =>
  import("./CommerceScene").then((mod) => ({ default: mod.CommerceScene }))
);

/**
 * Three.js canvas wrapper for the hero. Lazy-loads the WebGL scene,
 * provides a static fallback for no-JS/SSR, respects prefers-reduced-motion.
 */

function StaticFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-64 w-64 opacity-40">
        {/* Static gradient orbs - visible while loading or as fallback */}
        <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-300/30 to-brand-500/20 blur-3xl" />
        <div className="absolute top-1/3 left-1/3 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-200/40 to-brand-400/30 blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 right-1/3 h-28 w-28 translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-br from-marigold-300/20 to-brand-300/30 blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>
    </div>
  );
}

function ThreeCanvas() {
  return (
    <div className="relative h-[420px] sm:h-[480px] overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        className="touch-none"
      >
        <Suspense fallback={null}>
          <CommerceScene />
        </Suspense>
      </Canvas>
      <StaticFallback />
    </div>
  );
}

export function ThreeHero() {
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState<boolean | null>(null);

  // Check prefers-reduced-motion on mount
  if (shouldRenderCanvas === null && typeof window !== "undefined") {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShouldRenderCanvas(!prefersReducedMotion);
  }

  if (shouldRenderCanvas === null || !shouldRenderCanvas) {
    return (
      <div className="relative h-[420px] sm:h-[480px] overflow-hidden">
        <StaticFallback />
      </div>
    );
  }

  return <ThreeCanvas />;
}
