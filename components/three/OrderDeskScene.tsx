"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, Text } from "@react-three/drei";
import * as THREE from "three";

/**
 * Premium "Order Desk" scene - distinctive AppFox commerce metaphor.
 * Styled package, readable receipt, subscription ring, intentional composition.
 * Craft-quality materials, subtle depth of field effect via composition.
 */

// Premium package - hero object with tape detail
function StyledPackage({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * 0.18;
    meshRef.current.rotation.y = t;
    meshRef.current.rotation.x = Math.sin(t * 0.6) * 0.04;
  });

  return (
    <Float speed={0.5} rotationIntensity={0.08} floatIntensity={0.15}>
      <group ref={meshRef} position={position}>
        {/* Main parcel box - premium orange */}
        <mesh castShadow>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial
            color="#E8925C"
            roughness={0.28}
            metalness={0.06}
            envMapIntensity={1.2}
          />
        </mesh>
        
        {/* Horizontal tape stripe */}
        <mesh position={[0, 0, 0.61]}>
          <boxGeometry args={[1.26, 0.16, 0.02]} />
          <meshStandardMaterial 
            color="#F5E6D3"
            roughness={0.6}
          />
        </mesh>
        
        {/* Vertical tape stripe */}
        <mesh position={[0, 0, 0.61]}>
          <boxGeometry args={[0.16, 1.26, 0.02]} />
          <meshStandardMaterial 
            color="#F5E6D3"
            roughness={0.6}
          />
        </mesh>

        {/* Subtle label accent */}
        <mesh position={[0.35, 0.35, 0.605]}>
          <planeGeometry args={[0.4, 0.25]} />
          <meshStandardMaterial 
            color="#FFFFFF"
            roughness={0.85}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Receipt paper - readable lines, elegant paper texture
function ReceiptPaper({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * 0.12;
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.06;
    meshRef.current.rotation.z = Math.cos(t * 0.3) * 0.08;
  });

  return (
    <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.12}>
      <group ref={meshRef} position={position}>
        {/* Paper base */}
        <mesh castShadow>
          <planeGeometry args={[0.65, 1.3]} />
          <meshStandardMaterial
            color="#FCFBF9"
            roughness={0.92}
            metalness={0.01}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Receipt lines - subtle embossed */}
        {[0.4, 0.25, 0.1, -0.05, -0.2, -0.35].map((y, i) => (
          <mesh key={i} position={[0, y, 0.002]}>
            <planeGeometry args={[0.5, 0.02]} />
            <meshStandardMaterial
              color="#D8D5D0"
              roughness={0.95}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
        
        {/* Header section - darker */}
        <mesh position={[0, 0.55, 0.002]}>
          <planeGeometry args={[0.55, 0.15]} />
          <meshStandardMaterial
            color="#7c3aed"
            roughness={0.9}
            transparent
            opacity={0.12}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Subscription ring - soft loop metaphor for recurring
function SubscriptionRing({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = t * 0.8;
    meshRef.current.rotation.x = Math.PI * 0.5 + Math.sin(t * 0.5) * 0.1;
    // Subtle pulsing emissive
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = 0.18 + Math.sin(t * 1.5) * 0.08;
  });

  return (
    <Float speed={0.45} rotationIntensity={0.08} floatIntensity={0.18}>
      <mesh ref={meshRef} position={position} castShadow>
        <torusGeometry args={[0.45, 0.08, 24, 48]} />
        <meshStandardMaterial
          color="#7c3aed"
          roughness={0.18}
          metalness={0.25}
          emissive="#7c3aed"
          emissiveIntensity={0.18}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

// Subtle mouse reactivity
function MouseReactiveGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    const x = (state.mouse.x * viewport.width) / 60;
    const y = (state.mouse.y * viewport.height) / 60;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.012, 0.02);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.012, 0.02);
  });

  return <group ref={groupRef}>{children}</group>;
}

export function OrderDeskScene() {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!sceneRef.current) return;
    const t = state.clock.elapsedTime * 0.12;
    sceneRef.current.position.y = Math.sin(t) * 0.03;
  });

  return (
    <>
      <Environment preset="apartment" />
      
      {/* Premium studio lighting - warm and intentional */}
      <ambientLight intensity={0.75} color="#FFFCF8" />
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.2}
        color="#FFFDF9"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      
      {/* Soft fill lights */}
      <pointLight position={[-5, 3, -3]} intensity={0.35} color="#FFB380" />
      <pointLight position={[5, 2, 4]} intensity={0.25} color="#A78BFA" />
      
      {/* Subtle rim light */}
      <pointLight position={[0, -2, -6]} intensity={0.15} color="#FFF4E6" />

      <MouseReactiveGroup>
        <group ref={sceneRef}>
          {/* Hero package - front and center */}
          <StyledPackage position={[0, 0.2, 0.5]} />
          
          {/* Receipt paper - left side */}
          <ReceiptPaper position={[-1.3, 0.1, 0]} />
          
          {/* Subscription ring - right side, behind */}
          <SubscriptionRing position={[1.4, 0.3, -0.3]} />
        </group>
      </MouseReactiveGroup>

      {/* Premium ground plane - soft shadow receiver */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial
          color="#F8F6F3"
          roughness={0.98}
          metalness={0.01}
        />
      </mesh>
      
      {/* Soft ambient glow - barely visible warmth */}
      <mesh position={[0, -1, -8]}>
        <sphereGeometry args={[6, 32, 32]} />
        <meshStandardMaterial
          color="#FFF9F0"
          emissive="#FFECDA"
          emissiveIntensity={0.04}
          transparent
          opacity={0.03}
        />
      </mesh>
    </>
  );
}
