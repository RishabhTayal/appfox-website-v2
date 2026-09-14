"use client";

import { Suspense, lazy, useRef, useState, useEffect } from "react";
import Image from "next/image";

// Lazy load Three.js to avoid blocking LCP
const ThreeMascot = lazy(() => import("./ThreeMascot"));

/**
 * Interactive AppFox mascot with Three.js treatment.
 * Falls back to static Image when:
 * - prefers-reduced-motion is enabled
 * - WebGL not supported
 * - Hydration in progress
 */
export function MascotScene() {
  const [shouldUseThree, setShouldUseThree] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check for WebGL support
    const canvas = document.createElement("canvas");
    const hasWebGL =
      !!canvas.getContext("webgl") || !!canvas.getContext("webgl2");

    setShouldUseThree(!prefersReducedMotion && hasWebGL);
  }, []);

  // Static fallback for SSR and accessibility
  const StaticMascot = () => (
    <div className="relative">
      <Image
        src="/images/brand/appfox-mascot.png"
        alt="AppFox mascot"
        width={604}
        height={662}
        className="w-44 h-auto sm:w-52 lg:w-60 object-contain"
        style={{
          filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12))",
        }}
        priority
      />
    </div>
  );

  // Show static version during SSR and if Three.js shouldn't load
  if (!isHydrated || !shouldUseThree) {
    return <StaticMascot />;
  }

  return (
    <Suspense fallback={<StaticMascot />}>
      <ThreeMascot />
    </Suspense>
  );
}
