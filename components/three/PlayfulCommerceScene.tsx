"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Text3D, Environment, Center, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * Playful fox-themed commerce scene with personality!
 * Floating parcels, bouncy orders, whimsical receipt paper,
 * and fox-orange accents. Scroll-reactive and delightful.
 */

// Bouncy parcel box with personality
function ParcelBox({ position, color = "#FF6B35", delay = 0 }: { position: [number, number, number]; color?: string; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime + delay;
    // Bouncy rotation
    meshRef.current.rotation.x = Math.sin(t * 0.8) * 0.2 + Math.sin(t * 1.3) * 0.1;
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.rotation.z = Math.cos(t * 0.6) * 0.15;
    // Bobbing motion
    meshRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} castShadow>
        <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color={color}
            roughness={0.4}
            metalness={0.1}
          />
        </RoundedBox>
        {/* Cute tape stripe */}
        <mesh position={[0, 0, 0.41]}>
          <boxGeometry args={[0.85, 0.15, 0.02]} />
          <meshStandardMaterial color="#FDD835" roughness={0.6} />
        </mesh>
      </mesh>
    </Float>
  );
}

// Playful receipt paper that curls and waves
function ReceiptPaper({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime + delay;
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    meshRef.current.rotation.z = Math.cos(t * 0.4) * 0.2;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.9) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} castShadow>
        <planeGeometry args={[0.6, 1.2]} />
        <meshStandardMaterial
          color="#f5f3fa"
          roughness={0.8}
          side={THREE.DoubleSide}
        />
        {/* Perforated edge line */}
        <mesh position={[0, 0.61, 0.01]}>
          <boxGeometry args={[0.6, 0.02, 0.01]} />
          <meshStandardMaterial color="#c4b2f7" />
        </mesh>
      </mesh>
    </Float>
  );
}

// Glowing order number badge
function OrderBadge({ position, number = "1042", delay = 0 }: { position: [number, number, number]; number?: string; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;
    const t = state.clock.elapsedTime + delay;
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.position.y = position[1] + Math.sin(t * 1.4) * 0.25;
    // Pulsing glow
    const glowMaterial = glowRef.current.material as THREE.MeshStandardMaterial;
    glowMaterial.emissiveIntensity = 0.3 + Math.sin(t * 2) * 0.2;
  });

  return (
    <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.7}>
      <group ref={meshRef} position={position}>
        {/* Badge circle */}
        <mesh castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.08, 32]} />
          <meshStandardMaterial
            color="#8b5cf6"
            roughness={0.3}
            metalness={0.2}
            emissive="#8b5cf6"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Glow halo */}
        <mesh ref={glowRef} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
          <meshStandardMaterial
            color="#c4b2f7"
            transparent
            opacity={0.4}
            emissive="#c4b2f7"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Sparkle particles for magic moments
function Sparkles() {
  const count = 50;
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.05;
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = 0.4 + Math.sin(t * 2) * 0.2;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        color="#FFD700"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// Mouse-reactive group
function MouseReactiveGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    // Subtle mouse parallax
    const x = (state.mouse.x * viewport.width) / 20;
    const y = (state.mouse.y * viewport.height) / 20;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.05, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.05, 0.05);
  });

  return <group ref={groupRef}>{children}</group>;
}

export function PlayfulCommerceScene() {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!sceneRef.current) return;
    // Gentle breathing motion
    const t = state.clock.elapsedTime;
    sceneRef.current.position.y = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <>
      <Environment preset="sunset" />
      
      {/* Warm playful lighting */}
      <ambientLight intensity={0.5} color="#FFF8E7" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1}
        color="#FFE4B5"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-4, 4, -3]} intensity={0.5} color="#FF6B35" />
      <pointLight position={[4, 2, 3]} intensity={0.4} color="#8b5cf6" />

      <MouseReactiveGroup>
        <group ref={sceneRef}>
          {/* Playful parcels in fox orange */}
          <ParcelBox position={[-2, 0, 0]} color="#FF6B35" delay={0} />
          <ParcelBox position={[1.8, 0.5, -0.5]} color="#FF8C42" delay={1} />
          <ParcelBox position={[0.2, 1.5, 0.8]} color="#FFA566" delay={2} />
          
          {/* Receipt papers floating around */}
          <ReceiptPaper position={[-1, -0.5, 1]} delay={0.5} />
          <ReceiptPaper position={[2.2, -0.8, 0.3]} delay={1.5} />
          
          {/* Order number badges */}
          <OrderBadge position={[0, 0, 0]} number="1042" delay={0.3} />
          <OrderBadge position={[-2.5, 1, 0.5]} number="1041" delay={1.8} />
          
          {/* Sparkles for magic */}
          <Sparkles />
        </group>
      </MouseReactiveGroup>

      {/* Soft ground with subtle fox-orange glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#f5f3fa"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
      
      {/* Warm glow sphere for ambiance */}
      <mesh position={[0, -2, -5]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial
          color="#FFE4B5"
          emissive="#FF6B35"
          emissiveIntensity={0.2}
          transparent
          opacity={0.1}
        />
      </mesh>
    </>
  );
}
