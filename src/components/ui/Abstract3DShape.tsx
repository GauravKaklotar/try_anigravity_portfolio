"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

// ── Random popup content pools ──────────────────────────────
const CLICK_MESSAGES = [
    { emoji: "🚀", text: "Let's build!" },
    { emoji: "✨", text: "Nice click!" },
    { emoji: "💻", text: "Code is art" },
    { emoji: "🔥", text: "You're on fire" },
    { emoji: "🎯", text: "Bullseye!" },
    { emoji: "⚡", text: "Electrifying!" },
    { emoji: "🪐", text: "Out of this world" },
    { emoji: "💡", text: "Great ideas ahead" },
    { emoji: "🏆", text: "Winner vibes" },
    { emoji: "🧠", text: "Big brain energy" },
    { emoji: "🎨", text: "Pixel perfect" },
    { emoji: "👏", text: "Impressive, right?" },
    { emoji: "🤝", text: "Let's connect!" },
    { emoji: "💼", text: "Hire-worthy?" },
    { emoji: "🌟", text: "Star developer" },
    { emoji: "😎", text: "Cool, huh?" },
];

// Spread angles for 2 popups — opposite sides so they never overlap
const DUAL_ANGLES = [
    [(-Math.PI * 3) / 4, Math.PI / 4],     // top-left & bottom-right
    [-Math.PI / 4, (Math.PI * 3) / 4],       // top-right & bottom-left
    [-Math.PI / 2, Math.PI / 2],             // top & bottom
    [Math.PI, 0],                             // left & right
];

type FloatingPopup = {
    id: number;
    emoji: string;
    text: string;
    x: number;
    y: number;
    dx: number;
    dy: number;
};

// ── 3D Sphere Inner Component ───────────────────────────────
function LiquidSphere({ onSphereClick }: { onSphereClick: () => void }) {
    const mainSphereRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);

    const [hovered, setHover] = useState(false);
    const [clickEffect, setClickEffect] = useState(0);

    useFrame((state, delta) => {
        if (mainSphereRef.current) {
            if (hovered) {
                // Smoothly follow pointer — targets are bounded [-0.4, 0.4]
                const targetRotX = state.pointer.y * 0.4;
                const targetRotY = state.pointer.x * 0.4;
                mainSphereRef.current.rotation.x = THREE.MathUtils.damp(mainSphereRef.current.rotation.x, targetRotX, 3, delta);
                mainSphereRef.current.rotation.y = THREE.MathUtils.damp(mainSphereRef.current.rotation.y, targetRotY, 3, delta);
            } else {
                // Idle: increment rotation directly — never references absolute time
                mainSphereRef.current.rotation.x += Math.cos(mainSphereRef.current.rotation.y) * delta * 0.03;
                mainSphereRef.current.rotation.y += delta * 0.08;
            }

            const baseScale = hovered ? 1.08 : 1;
            const currentScale = mainSphereRef.current.scale.x;
            const targetScale = baseScale + (clickEffect > 0 ? clickEffect * 0.18 : 0);
            mainSphereRef.current.scale.setScalar(THREE.MathUtils.damp(currentScale, targetScale, 8, delta));
        }

        if (clickEffect > 0) {
            setClickEffect(Math.max(0, clickEffect - delta * 1.2));
        }

        if (materialRef.current) {
            const targetDistort = clickEffect > 0.1 ? 0.65 : hovered ? 0.38 : 0.22;
            const targetSpeed = clickEffect > 0.1 ? 6 : hovered ? 2.5 : 1.2;

            materialRef.current.distort = THREE.MathUtils.damp(materialRef.current.distort, targetDistort, 5, delta);
            materialRef.current.speed = THREE.MathUtils.damp(materialRef.current.speed, targetSpeed, 5, delta);
        }
    });

    const handleClick = useCallback(
        (e: any) => {
            e.stopPropagation();
            setClickEffect(1);
            onSphereClick();
        },
        [onSphereClick]
    );

    const color = clickEffect > 0.5 ? "#e879f9" : clickEffect > 0.1 ? "#c084fc" : hovered ? "#8b5cf6" : "#6366f1";
    const emissiveColor = clickEffect > 0.3 ? "#7c3aed" : "#312e81";
    const emissiveIntensity = clickEffect > 0.3 ? 0.5 : hovered ? 0.15 : 0.05;

    return (
        <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8}>
            <mesh
                ref={mainSphereRef}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                onClick={handleClick}
            >
                <icosahedronGeometry args={[1.6, 128]} />
                <MeshDistortMaterial
                    ref={materialRef}
                    color={color}
                    emissive={emissiveColor}
                    emissiveIntensity={emissiveIntensity}
                    envMapIntensity={1.5}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    metalness={0.95}
                    roughness={0.05}
                    distort={0.25}
                    speed={1.2}
                />
            </mesh>
        </Float>
    );
}

// ── Main Exported Component ─────────────────────────────────
export default function Abstract3DShape() {
    const [popups, setPopups] = useState<FloatingPopup[]>([]);
    const idCounter = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-remove popups after animation finishes
    useEffect(() => {
        if (popups.length === 0) return;
        const timer = setTimeout(() => {
            setPopups((prev) => prev.slice(1));
        }, 2000);
        return () => clearTimeout(timer);
    }, [popups]);

    const handleSphereClick = useCallback(() => {
        // Dispatch custom event for falling stars background
        window.dispatchEvent(new CustomEvent("orb-click"));

        const containerRect = containerRef.current?.getBoundingClientRect();
        const cx = containerRect ? containerRect.width / 2 : 200;
        const cy = containerRect ? containerRect.height / 2 : 200;

        // Pick whether to spawn 1 or 2 popups
        const count = Math.random() > 0.4 ? 2 : 1;

        const newPopups: FloatingPopup[] = [];

        if (count === 1) {
            // Single popup — random angle
            const msg = CLICK_MESSAGES[Math.floor(Math.random() * CLICK_MESSAGES.length)];
            const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI; // bias upward
            const radius = 70 + Math.random() * 30;
            newPopups.push({
                id: idCounter.current++,
                emoji: msg.emoji,
                text: msg.text,
                x: cx + Math.cos(angle) * radius,
                y: cy + Math.sin(angle) * radius,
                dx: Math.cos(angle) * 100,
                dy: Math.sin(angle) * 100 - 40,
            });
        } else {
            // Two popups — use opposing angles so they never overlap
            const anglePair = DUAL_ANGLES[Math.floor(Math.random() * DUAL_ANGLES.length)];
            for (let i = 0; i < 2; i++) {
                const msg = CLICK_MESSAGES[Math.floor(Math.random() * CLICK_MESSAGES.length)];
                const angle = anglePair[i] + (Math.random() - 0.5) * 0.3; // slight randomness
                const radius = 60 + Math.random() * 30;
                newPopups.push({
                    id: idCounter.current++,
                    emoji: msg.emoji,
                    text: msg.text,
                    x: cx + Math.cos(angle) * radius,
                    y: cy + Math.sin(angle) * radius,
                    dx: Math.cos(angle) * 110,
                    dy: Math.sin(angle) * 110 - 30,
                });
            }
        }

        setPopups((prev) => [...prev, ...newPopups]);
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full min-h-[500px] cursor-pointer relative group select-none">
            {/* Hover hint */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 px-5 py-2 bg-white/5 backdrop-blur-lg rounded-full text-white/50 text-xs tracking-widest uppercase opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none border border-white/10">
                ✦ Click the orb ✦
            </div>

            {/* Floating emoji/text popups — NO overflow hidden, positioned absolutely */}
            <AnimatePresence>
                {popups.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, scale: 0.3, x: p.x - 60, y: p.y - 16 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0.3, 1.05, 1, 0.85],
                            x: (p.x - 60) + p.dx,
                            y: (p.y - 16) + p.dy,
                        }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 1.8, ease: "easeOut" }}
                        className="absolute z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(139,92,246,0.25)] pointer-events-none"
                        style={{ left: 0, top: 0 }}
                    >
                        <span className="text-xl">{p.emoji}</span>
                        <span className="text-white text-sm font-medium whitespace-nowrap">{p.text}</span>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* 3D Canvas */}
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffffff" />
                <directionalLight position={[-5, 5, -5]} intensity={0.6} color="#818cf8" />
                <pointLight position={[0, 3, 4]} intensity={0.5} color="#c084fc" />

                <LiquidSphere onSphereClick={handleSphereClick} />

                <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={15} blur={2.5} far={6} color="#000000" />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
