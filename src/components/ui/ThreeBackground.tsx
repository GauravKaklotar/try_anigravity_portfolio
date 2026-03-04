"use client";

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
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        </group>
    );
}

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none h-screen w-screen overflow-hidden opacity-60 mix-blend-screen">
            <Canvas camera={{ position: [0, 0, 10] }}>
                <AnimatedStars />
                <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.5} color="#8b5cf6" />
                <Sparkles count={50} scale={10} size={1} speed={0.2} opacity={0.3} color="#3b82f6" />

                {/* Ambient Floating Shapes */}
                <Float speed={1.5} rotationIntensity={2} floatIntensity={2} position={[-6, 4, -8]}>
                    <mesh>
                        <icosahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial color="#8b5cf6" wireframe opacity={0.3} transparent />
                    </mesh>
                </Float>

                <Float speed={2} rotationIntensity={1.5} floatIntensity={2} position={[7, -2, -12]}>
                    <mesh>
                        <torusKnotGeometry args={[0.8, 0.2, 100, 16]} />
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
