"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

/**
 * Animated mascot plane with mouse parallax and idle bob
 */
function MascotPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Load the mascot texture
  const texture = useLoader(TextureLoader, "/images/brand/appfox-mascot.png");
  
  // Track mouse position for parallax
  const handleMouseMove = (event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePos({ x, y });
  };

  // Set up mouse listener
  useState(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  });

  // Animate: idle bob + mouse parallax tilt
  useFrame((state) => {
    if (!meshRef.current) return;

    // Idle bob (gentle float)
    const t = state.clock.getElapsedTime();
    const bobAmount = Math.sin(t * 0.7) * 0.08;
    
    // Mouse parallax tilt (subtle)
    const targetRotationX = mousePos.y * 0.1;
    const targetRotationY = mousePos.x * 0.1;
    
    // Smooth lerp
    meshRef.current.position.y = bobAmount;
    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.5, 2.75]} />
      <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

/**
 * Three.js canvas wrapper with the interactive mascot
 */
export default function ThreeMascot() {
  return (
    <div className="relative w-44 h-48 sm:w-52 sm:h-56 lg:w-60 lg:h-64">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1} />
        <MascotPlane />
      </Canvas>
    </div>
  );
}
