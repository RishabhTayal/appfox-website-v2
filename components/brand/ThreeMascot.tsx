"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

type Reaction = "spin" | "hop" | "wiggle";

/**
 * Animated mascot plane with strong parallax, hover, click reactions, idle life, and drag
 */
function MascotPlane({ 
  mousePos, 
  isHovered, 
  isDragging, 
  dragOffset,
  onReaction 
}: { 
  mousePos: { x: number; y: number }; 
  isHovered: boolean;
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  onReaction: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [reaction, setReaction] = useState<{ type: Reaction; progress: number } | null>(null);
  const [idleBlink, setIdleBlink] = useState(0);
  const lastBlinkRef = useRef(0);
  
  // Load the mascot texture
  const texture = useLoader(TextureLoader, "/images/brand/appfox-mascot.png");
  
  // Trigger click reaction (cycle through reactions)
  const reactions: Reaction[] = ["spin", "hop", "wiggle"];
  const reactionIndexRef = useRef(0);
  
  const handleClick = () => {
    const reactionType = reactions[reactionIndexRef.current];
    reactionIndexRef.current = (reactionIndexRef.current + 1) % reactions.length;
    setReaction({ type: reactionType, progress: 0 });
    onReaction();
  };

  // Animate: idle bob + mouse parallax + hover + reactions + idle blink + drag
  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();

    // Idle bob (gentle float)
    const bobAmount = Math.sin(t * 0.7) * 0.08;
    
    // Idle blink/scale every 4-6 seconds
    if (t - lastBlinkRef.current > 4.5 && !reaction && !isHovered) {
      lastBlinkRef.current = t;
      setIdleBlink(1);
    }
    if (idleBlink > 0) {
      setIdleBlink((b) => Math.max(0, b - 0.08));
    }
    const blinkScale = 1 - (Math.sin(idleBlink * Math.PI) * 0.12);
    
    // Mouse parallax tilt (STRONGER - 0.3 rad range, faster lerp)
    const targetRotationX = mousePos.y * 0.3;
    const targetRotationY = mousePos.x * 0.3;
    
    // Position lean toward cursor (slight 3D translate)
    const targetPosX = mousePos.x * 0.15;
    const targetPosZ = mousePos.y * 0.1;
    
    // Drag offset (springs back)
    const dragPosX = isDragging ? dragOffset.x * 0.4 : 0;
    const dragPosY = isDragging ? dragOffset.y * 0.4 : 0;
    
    // Hover scale up
    const hoverScale = isHovered ? 1.08 : 1.0;
    
    // Click reaction animations (springy easing)
    let reactionRotX = 0, reactionRotY = 0, reactionRotZ = 0;
    let reactionPosY = 0, reactionScale = 1;
    
    if (reaction) {
      const p = reaction.progress;
      const spring = Math.sin(p * Math.PI); // Springy easing
      
      if (reaction.type === "spin") {
        // Full 360° spin
        reactionRotY = p * Math.PI * 2;
      } else if (reaction.type === "hop") {
        // Hop up and down
        reactionPosY = spring * 0.5;
        reactionScale = 1 + spring * 0.15;
      } else if (reaction.type === "wiggle") {
        // Happy wiggle left-right
        reactionRotZ = Math.sin(p * Math.PI * 6) * 0.4;
        reactionRotX = Math.sin(p * Math.PI * 3) * 0.2;
      }
      
      // Progress reaction
      setReaction((r) => {
        if (!r) return null;
        const newProgress = r.progress + 0.025;
        return newProgress >= 1 ? null : { ...r, progress: newProgress };
      });
    }
    
    // Apply all transformations with smooth lerp
    meshRef.current.position.x += (targetPosX + dragPosX - meshRef.current.position.x) * 0.12;
    meshRef.current.position.y = bobAmount + reactionPosY + dragPosY;
    meshRef.current.position.z += (targetPosZ - meshRef.current.position.z) * 0.12;
    
    meshRef.current.rotation.x += (targetRotationX + reactionRotX - meshRef.current.rotation.x) * 0.15;
    meshRef.current.rotation.y += (targetRotationY + reactionRotY - meshRef.current.rotation.y) * 0.15;
    meshRef.current.rotation.z += (reactionRotZ - meshRef.current.rotation.z) * 0.15;
    
    const targetScale = hoverScale * blinkScale * reactionScale;
    meshRef.current.scale.setScalar(
      meshRef.current.scale.x + (targetScale - meshRef.current.scale.x) * 0.15
    );
  });

  return (
    <mesh ref={meshRef} onClick={handleClick}>
      <planeGeometry args={[2.5, 2.75]} />
      <meshBasicMaterial 
        map={texture} 
        transparent 
        side={THREE.DoubleSide}
        // Slight brightness boost on hover via opacity
        opacity={isHovered ? 1.0 : 0.95}
      />
    </mesh>
  );
}

/**
 * Three.js canvas wrapper with the interactive mascot
 */
export default function ThreeMascot() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Track pointer position relative to canvas for parallax (NDC coordinates)
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    // Convert to NDC: -1 to 1 range
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    setMousePos({ x, y });
    
    // Handle drag
    if (isDragging) {
      const dx = event.clientX - dragStart.x;
      const dy = event.clientY - dragStart.y;
      setDragOffset({ 
        x: dx / rect.width, 
        y: -dy / rect.height 
      });
    }
  };
  
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
    setDragOffset({ x: 0, y: 0 });
  };
  
  const handlePointerUp = () => {
    setIsDragging(false);
    // Spring back to center
    setDragOffset({ x: 0, y: 0 });
  };

  const handleReaction = () => {
    // Could add haptic feedback or sound here
  };

  return (
    <div 
      ref={canvasRef}
      className="relative w-36 h-40 sm:w-40 sm:h-44 lg:w-48 lg:h-52 cursor-pointer select-none touch-none"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        setMousePos({ x: 0, y: 0 });
        setIsHovered(false);
        setIsDragging(false);
        setDragOffset({ x: 0, y: 0 });
      }}
      onPointerEnter={() => setIsHovered(true)}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1} />
        <MascotPlane 
          mousePos={mousePos} 
          isHovered={isHovered}
          isDragging={isDragging}
          dragOffset={dragOffset}
          onReaction={handleReaction}
        />
      </Canvas>
    </div>
  );
}
