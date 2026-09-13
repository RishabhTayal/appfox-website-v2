"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

/**
 * Abstract commerce scene - floating geometric forms representing
 * products, orders, and commerce flow. Soft violet lighting, subtle
 * animation, parallax-ready camera.
 */

function ProductBox({ position, scale = 1, delay = 0 }: { position: [number, number, number]; scale?: number; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime + delay;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    meshRef.current.rotation.y = Math.cos(t * 0.15) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#8b5cf6"
          metalness={0.2}
          roughness={0.3}
          envMapIntensity={0.8}
        />
      </mesh>
    </Float>
  );
}

function OrderSphere({ position, scale = 1, delay = 0 }: { position: [number, number, number]; scale?: number; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime + delay;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <MeshTransmissionMaterial
        color="#ddd3fb"
        thickness={0.5}
        roughness={0.1}
        transmission={0.98}
        ior={1.5}
        chromaticAberration={0.02}
        backside
      />
    </mesh>
  );
}

function ConnectionLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const ref = useRef<THREE.Line>(null!);
  
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  useFrame((state) => {
    if (!ref.current) return;
    const material = ref.current.material as THREE.LineBasicMaterial;
    material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
  });

  return (
    // @ts-expect-error - Three.js line primitive type issue
    <line ref={ref} geometry={lineGeometry}>
      <lineBasicMaterial color="#c4b2f7" transparent opacity={0.15} />
    </line>
  );
}

export function CommerceScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Slow camera orbit for ambient motion
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.15;
    groupRef.current.rotation.x = Math.cos(t * 0.08) * 0.05;
  });

  return (
    <>
      <Environment preset="city" />
      
      {/* Ambient lighting - soft violet wash */}
      <ambientLight intensity={0.4} color="#ede7fe" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.3} color="#c4b2f7" />

      <group ref={groupRef}>
        {/* Central cluster - products and orders */}
        <ProductBox position={[-1.5, 0.5, 0]} scale={0.8} delay={0} />
        <ProductBox position={[1.2, -0.3, -0.5]} scale={0.6} delay={1.2} />
        <ProductBox position={[0.3, 1.2, 0.8]} scale={0.5} delay={2.4} />
        
        <OrderSphere position={[0, 0, 0]} scale={1} delay={0.5} />
        <OrderSphere position={[2, 0.8, 0.5]} scale={0.7} delay={1.8} />
        <OrderSphere position={[-1.8, -0.5, 0.8]} scale={0.6} delay={3.1} />

        {/* Connection lines - the commerce flow */}
        <ConnectionLine start={[-1.5, 0.5, 0]} end={[0, 0, 0]} />
        <ConnectionLine start={[0, 0, 0]} end={[1.2, -0.3, -0.5]} />
        <ConnectionLine start={[0, 0, 0]} end={[2, 0.8, 0.5]} />
        <ConnectionLine start={[-1.5, 0.5, 0]} end={[-1.8, -0.5, 0.8]} />
      </group>

      {/* Ground plane - subtle reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#f5f3fa"
          metalness={0.1}
          roughness={0.8}
          envMapIntensity={0.3}
        />
      </mesh>
    </>
  );
}
