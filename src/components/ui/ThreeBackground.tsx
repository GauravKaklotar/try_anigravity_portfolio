"use client";

import React, { memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles, Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedStars() {
    const starsRef = useRef<THREE.Points>(null);

    useFrame((state, delta) => {
        if (starsRef.current) {
            starsRef.current.rotation.y -= delta * 0.05;
            starsRef.current.rotation.x -= delta * 0.02;
        }
    });

    return (
        <group ref={starsRef}>
            {/* Reduced from 3000 → 1500 stars — still looks dense, half the GPU cost */}
            <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
        </group>
    );
}

function ThreeBackgroundInner() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none h-screen w-screen overflow-hidden opacity-60 mix-blend-screen">
            <Canvas
                camera={{ position: [0, 0, 10] }}
                dpr={[1, 1.5]}
                gl={{ powerPreference: "high-performance", antialias: false }}
            >
                <AnimatedStars />
                {/* Reduced sparkle counts for performance */}
                <Sparkles count={60} scale={12} size={2} speed={0.4} opacity={0.5} color="#8b5cf6" />
                <Sparkles count={30} scale={10} size={1} speed={0.2} opacity={0.3} color="#3b82f6" />

                {/* Ambient Floating Shapes */}
                <Float speed={1.5} rotationIntensity={2} floatIntensity={2} position={[-6, 4, -8]}>
                    <mesh>
                        <icosahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial color="#8b5cf6" wireframe opacity={0.3} transparent />
                    </mesh>
                </Float>

                <Float speed={2} rotationIntensity={1.5} floatIntensity={2} position={[7, -2, -12]}>
                    <mesh>
                        <torusKnotGeometry args={[0.8, 0.2, 64, 12]} />
                        <MeshDistortMaterial color="#3b82f6" opacity={0.4} transparent distort={0.4} speed={2} />
                    </mesh>
                </Float>

                <Float speed={1} rotationIntensity={3} floatIntensity={1.5} position={[-5, -5, -10]}>
                    <mesh>
                        <coneGeometry args={[1, 2, 4]} />
                        <meshStandardMaterial color="#8b5cf6" wireframe opacity={0.2} transparent />
                    </mesh>
                </Float>
            </Canvas>
        </div>
    );
}

// Memo prevents re-renders from parent state changes
const ThreeBackground = memo(ThreeBackgroundInner);
ThreeBackground.displayName = "ThreeBackground";

export default ThreeBackground;
