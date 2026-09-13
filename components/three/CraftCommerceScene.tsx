"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * Craft-quality commerce scene - intentional orders/subscriptions metaphor.
 * Premium materials, elegant composition, slow refined motion.
 * NO sparkles, NO toy plastic, NO chaos.
 */

// Premium order parcel - refined materials
function OrderParcel({ position, scale = 0.65, delay = 0 }: { position: [number, number, number]; scale?: number; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * 0.25 + delay;
    // Very gentle rotation - elegant not chaotic
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.06;
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.z = Math.cos(t * 0.3) * 0.04;
  });

  return (
    <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.25}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <RoundedBox args={[1, 1, 1]} radius={0.12} smoothness={6}>
          <meshStandardMaterial
            color="#E8925C"
            roughness={0.3}
            metalness={0.08}
            envMapIntensity={0.8}
          />
        </RoundedBox>
        {/* Subtle tape detail - refined */}
        <mesh position={[0, 0, 0.51]}>
          <boxGeometry args={[1.06, 0.1, 0.01]} />
          <meshStandardMaterial 
            color="#F0E6D8" 
            roughness={0.65}
            transparent
            opacity={0.95}
          />
        </mesh>
      </mesh>
    </Float>
  );
}

// Subscription cylinder - recurring orders metaphor
function SubscriptionCylinder({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * 0.2 + delay;
    meshRef.current.rotation.y = t * 0.25;
    // Subtle pulsing emissive for "active subscription"
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = 0.12 + Math.sin(t * 1.2) * 0.06;
  });

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef} position={position} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.08, 32]} />
        <meshStandardMaterial
          color="#7c3aed"
          roughness={0.22}
          metalness={0.18}
          emissive="#7c3aed"
          emissiveIntensity={0.12}
        />
      </mesh>
    </Float>
  );
}

// Receipt paper - order documentation
function ReceiptPaper({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * 0.2 + delay;
    // Very gentle sway - paper floating
    meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.05;
    meshRef.current.rotation.z = Math.cos(t * 0.2) * 0.1;
  });

  return (
    <Float speed={0.5} rotationIntensity={0.12} floatIntensity={0.2}>
      <mesh ref={meshRef} position={position} castShadow>
        <planeGeometry args={[0.45, 0.9]} />
        <meshStandardMaterial
          color="#f8f7f5"
          roughness={0.88}
          metalness={0.01}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

// Subtle mouse reactivity - premium feel
function MouseReactiveGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    // Very subtle parallax - refined not aggressive
    const x = (state.mouse.x * viewport.width) / 50;
    const y = (state.mouse.y * viewport.height) / 50;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.015, 0.025);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.015, 0.025);
  });

  return <group ref={groupRef}>{children}</group>;
}

export function CraftCommerceScene() {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!sceneRef.current) return;
    // Very gentle breathing - barely perceptible
    const t = state.clock.elapsedTime * 0.15;
    sceneRef.current.position.y = Math.sin(t) * 0.04;
  });

  return (
    <>
      <Environment preset="apartment" />
      
      {/* Premium lighting - warm and refined */}
      <ambientLight intensity={0.7} color="#FFFAF5" />
      <directionalLight
        position={[7, 10, 6]}
        intensity={1}
        color="#FFFCF8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-6, 6, -5]} intensity={0.25} color="#FFA876" />
      <pointLight position={[6, 4, 5]} intensity={0.2} color="#9d7ff5" />

      <MouseReactiveGroup>
        <group ref={sceneRef}>
          {/* Intentional composition - orders, subscriptions, documentation */}
          {/* Front cluster */}
          <OrderParcel position={[-1.6, 0, 0.3]} scale={0.7} delay={0} />
          <OrderParcel position={[1.4, 0.35, -0.2]} scale={0.6} delay={1.5} />
          
          {/* Mid layer */}
          <SubscriptionCylinder position={[0, 0, 0]} delay={0.5} />
          <SubscriptionCylinder position={[-2.1, 0.8, 0.5]} delay={2.2} />
          
          {/* Back layer - receipts */}
          <ReceiptPaper position={[-0.7, -0.35, 0.9]} delay={0.8} />
          <ReceiptPaper position={[1.8, -0.6, 0.4]} delay={2} />
          
          {/* Accent parcels */}
          <OrderParcel position={[0.1, 1.2, 0.6]} scale={0.5} delay={3} />
        </group>
      </MouseReactiveGroup>

      {/* Premium ground plane - refined */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#f5f3fa"
          roughness={0.96}
          metalness={0.01}
        />
      </mesh>
      
      {/* Very subtle ambient glow - barely visible */}
      <mesh position={[0, -1.6, -7]}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshStandardMaterial
          color="#FFF9F3"
          emissive="#FFECD8"
          emissiveIntensity={0.05}
          transparent
          opacity={0.04}
        />
      </mesh>
    </>
  );
}
