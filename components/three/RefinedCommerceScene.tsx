"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * Refined commerce scene - elegant fox-themed 3D with premium materials.
 * Slower motion, better lighting, intentional composition. No chaos.
 */

// Elegant parcel with premium materials
function ParcelBox({ position, scale = 0.7, delay = 0 }: { position: [number, number, number]; scale?: number; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * 0.3 + delay; // Slower
    // Gentle rotation - no violent bouncing
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.08;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.z = Math.cos(t * 0.4) * 0.05;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={4}>
          <meshStandardMaterial
            color="#FF8C42"
            roughness={0.35}
            metalness={0.05}
            envMapIntensity={0.6}
          />
        </RoundedBox>
        {/* Subtle tape detail */}
        <mesh position={[0, 0, 0.51]}>
          <boxGeometry args={[1.05, 0.12, 0.02]} />
          <meshStandardMaterial 
            color="#F5E6D3" 
            roughness={0.7}
            transparent
            opacity={0.9}
          />
        </mesh>
      </mesh>
    </Float>
  );
}

// Refined receipt paper with better materials
function ReceiptPaper({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * 0.25 + delay;
    // Gentle sway
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.06;
    meshRef.current.rotation.z = Math.cos(t * 0.25) * 0.12;
  });

  return (
    <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.25}>
      <mesh ref={meshRef} position={position} castShadow>
        <planeGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color="#f8f6f3"
          roughness={0.85}
          metalness={0.02}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

// Refined order badge - subtle glow
function OrderBadge({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * 0.25 + delay;
    meshRef.current.rotation.y = t * 0.3;
    // Subtle breathing glow
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = 0.15 + Math.sin(t * 1.5) * 0.08;
  });

  return (
    <Float speed={0.7} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef} position={position} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.06, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          roughness={0.25}
          metalness={0.15}
          emissive="#8b5cf6"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

// Subtle mouse reactivity - not aggressive
function MouseReactiveGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    // Very subtle parallax
    const x = (state.mouse.x * viewport.width) / 40;
    const y = (state.mouse.y * viewport.height) / 40;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.02, 0.03);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.02, 0.03);
  });

  return <group ref={groupRef}>{children}</group>;
}

export function RefinedCommerceScene() {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!sceneRef.current) return;
    // Very gentle breathing
    const t = state.clock.elapsedTime * 0.2;
    sceneRef.current.position.y = Math.sin(t) * 0.05;
  });

  return (
    <>
      <Environment preset="city" />
      
      {/* Refined lighting - warm but not aggressive */}
      <ambientLight intensity={0.6} color="#FFF9F0" />
      <directionalLight
        position={[6, 9, 5]}
        intensity={0.9}
        color="#FFFBF5"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, 5, -4]} intensity={0.3} color="#FF9966" />
      <pointLight position={[5, 3, 4]} intensity={0.25} color="#c4b2f7" />

      <MouseReactiveGroup>
        <group ref={sceneRef}>
          {/* Intentional composition - not chaotic */}
          <ParcelBox position={[-1.8, 0, 0]} scale={0.75} delay={0} />
          <ParcelBox position={[1.5, 0.4, -0.3]} scale={0.6} delay={1.2} />
          <ParcelBox position={[0.1, 1.3, 0.5]} scale={0.5} delay={2.5} />
          
          <ReceiptPaper position={[-0.8, -0.4, 0.8]} delay={0.6} />
          <ReceiptPaper position={[2, -0.7, 0.2]} delay={1.8} />
          
          <OrderBadge position={[0, 0, 0]} delay={0.4} />
          <OrderBadge position={[-2.3, 0.9, 0.4]} delay={2} />
        </group>
      </MouseReactiveGroup>

      {/* Premium ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#f5f3fa"
          roughness={0.95}
          metalness={0.02}
        />
      </mesh>
      
      {/* Subtle ambient glow */}
      <mesh position={[0, -1.8, -6]}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshStandardMaterial
          color="#FFF8F0"
          emissive="#FFE4C8"
          emissiveIntensity={0.08}
          transparent
          opacity={0.06}
        />
      </mesh>
    </>
  );
}
