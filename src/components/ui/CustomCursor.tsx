"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const ring = useRef({ x: 0, y: 0 });
    const hovering = useRef(false);
    const raf = useRef(0);
    const [isTouchDevice, setIsTouchDevice] = useState(true); // Default hidden until we know

    useEffect(() => {
        // Detect if this is a touch-only device — don't render cursor at all
        const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
        const isTouchOnly = "ontouchstart" in window && !hasFinePointer;

        if (isTouchOnly) {
            setIsTouchDevice(true);
            return;
        }

        setIsTouchDevice(false);

        const onMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            // Inner dot follows instantly via transform (no React re-render)
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px) scale(${hovering.current ? 2.2 : 1})`;
            }
        };

        const onOver = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            const isInteractive =
                t.tagName === "A" ||
                t.tagName === "BUTTON" ||
                t.tagName === "INPUT" ||
                t.tagName === "TEXTAREA" ||
                t.closest("a") ||
                t.closest("button") ||
                t.closest("[role='button']");
            hovering.current = !!isInteractive;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px) scale(${hovering.current ? 2.2 : 1})`;
            }
        };

        // Smooth ring follow with lerp — runs via RAF, not React
        const loop = () => {
            ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
            ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

            if (ringRef.current) {
                const s = hovering.current ? 1.5 : 1;
                const o = hovering.current ? 0 : 1;
                ringRef.current.style.transform = `translate(${ring.current.x - 14}px, ${ring.current.y - 14}px) scale(${s})`;
                ringRef.current.style.opacity = String(o);
            }

            raf.current = requestAnimationFrame(loop);
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseover", onOver, { passive: true });
        raf.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
            cancelAnimationFrame(raf.current);
        };
    }, []);

    // Don't render anything on touch devices
    if (isTouchDevice) return null;

    return (
        <>
            {/* Inner dot — follows mouse instantly */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    background: "var(--color-accent, #8b5cf6)",
                    willChange: "transform",
                    transition: "background 0.3s ease, scale 0.15s ease",
                }}
            />
            {/* Outer ring — follows with lerp delay */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none z-[9998] mix-blend-difference"
                style={{
                    border: "1px solid var(--color-accent, #8b5cf6)",
                    opacity: 0.5,
                    willChange: "transform, opacity",
                    transition: "border-color 0.3s ease",
                }}
            />
        </>
    );
}
