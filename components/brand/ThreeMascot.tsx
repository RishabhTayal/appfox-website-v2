"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader, ThreeEvent } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

/**
 * Animated mascot plane with mouse parallax and idle bob
 */
function MascotPlane({ mousePos, onClick }: { mousePos: { x: number; y: number }; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [wiggle, setWiggle] = useState(0);
  
  // Load the mascot texture
  const texture = useLoader(TextureLoader, "/images/brand/appfox-mascot.png");
  
  // Trigger wiggle on click
  const handleClick = () => {
    setWiggle(1);
    onClick();
    setTimeout(() => setWiggle(0), 400);
  };

  // Animate: idle bob + mouse parallax tilt + wiggle
  useFrame((state) => {
    if (!meshRef.current) return;

    // Idle bob (gentle float)
    const t = state.clock.getElapsedTime();
    const bobAmount = Math.sin(t * 0.7) * 0.08;
    
    // Mouse parallax tilt (subtle)
    const targetRotationX = mousePos.y * 0.15;
    const targetRotationY = mousePos.x * 0.15;
    
    // Wiggle effect (quick rotation on click)
    const wiggleRotation = wiggle > 0 ? Math.sin(wiggle * Math.PI * 4) * 0.3 : 0;
    
    // Smooth lerp for parallax
    meshRef.current.position.y = bobAmount;
    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.08;
    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.08;
    meshRef.current.rotation.z = wiggleRotation;
    
    // Decay wiggle
    if (wiggle > 0) {
      setWiggle((w) => Math.max(0, w - 0.05));
    }
  });

  return (
    <mesh ref={meshRef} onClick={handleClick}>
      <planeGeometry args={[2.5, 2.75]} />
      <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

/**
 * Three.js canvas wrapper with the interactive mascot
 */
export default function ThreeMascot() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Track pointer position relative to canvas for parallax (NDC coordinates)
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    // Convert to NDC: -1 to 1 range
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    setMousePos({ x, y });
  };

  const handleClick = () => {
    // Optional: could add sound or haptic feedback here
  };

  return (
    <div 
      ref={canvasRef}
      className="relative w-36 h-40 sm:w-40 sm:h-44 lg:w-48 lg:h-52 cursor-pointer"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1} />
        <MascotPlane mousePos={mousePos} onClick={handleClick} />
      </Canvas>
    </div>
  );
}
