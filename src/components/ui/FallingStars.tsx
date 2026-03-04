"use client";

import { useEffect, useRef, useCallback, useState } from "react";

type Star = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    life: number;
    maxLife: number;
    hue: number;
    trail: { x: number; y: number }[];
};

export default function FallingStars() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const animFrameRef = useRef<number>(0);
    const isActiveRef = useRef(false);
    const lastTriggerRef = useRef(0);
    const [visible, setVisible] = useState(false);

    // Spawn a batch of falling stars
    const triggerStars = useCallback(() => {
        const now = Date.now();
        // Throttle: ignore clicks within 800ms of the last trigger
        if (now - lastTriggerRef.current < 800) return;
        lastTriggerRef.current = now;

        const canvas = canvasRef.current;
        if (!canvas) return;

        setVisible(true);

        const w = canvas.width;
        const count = 8 + Math.floor(Math.random() * 6); // 8-13 stars

        for (let i = 0; i < count; i++) {
            const maxLife = 1.5 + Math.random() * 1.5; // 1.5–3 seconds
            starsRef.current.push({
                x: Math.random() * w,
                y: -10 - Math.random() * 80,
                vx: (Math.random() - 0.5) * 60,
                vy: 180 + Math.random() * 220,
                size: 1.5 + Math.random() * 2.5,
                opacity: 0.7 + Math.random() * 0.3,
                life: 0,
                maxLife,
                hue: 250 + Math.random() * 40, // violet-ish range
                trail: [],
            });
        }

        if (!isActiveRef.current) {
            isActiveRef.current = true;
            startAnimation();
        }
    }, []);

    const startAnimation = useCallback(() => {
        let lastTime = performance.now();

        const loop = (time: number) => {
            const delta = (time - lastTime) / 1000;
            lastTime = time;

            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Resize canvas to fill viewport
            if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const stars = starsRef.current;

            for (let i = stars.length - 1; i >= 0; i--) {
                const s = stars[i];
                s.life += delta;

                if (s.life >= s.maxLife) {
                    stars.splice(i, 1);
                    continue;
                }

                // Store trail positions
                s.trail.push({ x: s.x, y: s.y });
                if (s.trail.length > 8) s.trail.shift();

                s.x += s.vx * delta;
                s.y += s.vy * delta;
                s.vy += 50 * delta; // slight gravity acceleration

                const progress = s.life / s.maxLife;
                const fadeOpacity = progress < 0.1
                    ? s.opacity * (progress / 0.1) // fade in
                    : s.opacity * (1 - Math.pow((progress - 0.1) / 0.9, 2)); // fade out

                // Draw trail
                if (s.trail.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(s.trail[0].x, s.trail[0].y);
                    for (let t = 1; t < s.trail.length; t++) {
                        ctx.lineTo(s.trail[t].x, s.trail[t].y);
                    }
                    ctx.strokeStyle = `hsla(${s.hue}, 80%, 75%, ${fadeOpacity * 0.3})`;
                    ctx.lineWidth = s.size * 0.6;
                    ctx.lineCap = "round";
                    ctx.stroke();
                }

                // Draw star head
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${s.hue}, 90%, 80%, ${fadeOpacity})`;
                ctx.fill();

                // Glow
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
                gradient.addColorStop(0, `hsla(${s.hue}, 90%, 85%, ${fadeOpacity * 0.4})`);
                gradient.addColorStop(1, `hsla(${s.hue}, 90%, 85%, 0)`);
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            if (stars.length > 0) {
                animFrameRef.current = requestAnimationFrame(loop);
            } else {
                isActiveRef.current = false;
                setVisible(false);
            }
        };

        animFrameRef.current = requestAnimationFrame(loop);
    }, []);

    // Expose trigger via a custom event
    useEffect(() => {
        const handler = () => triggerStars();
        window.addEventListener("orb-click", handler);
        return () => {
            window.removeEventListener("orb-click", handler);
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, [triggerStars]);

    // Initial canvas sizing
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-30 pointer-events-none"
            style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.3s ease",
            }}
        />
    );
}
