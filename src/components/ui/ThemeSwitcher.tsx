"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Theme color palette ─────────────────────────────────────
const THEMES = [
    { name: "Violet", hex: "#8b5cf6", hover: "#a78bfa", label: "Classic Violet" },
    { name: "Emerald", hex: "#10b981", hover: "#34d399", label: "Fresh Emerald" },
    { name: "Rose", hex: "#f43f5e", hover: "#fb7185", label: "Bold Rose" },
    { name: "Amber", hex: "#f59e0b", hover: "#fbbf24", label: "Warm Amber" },
    { name: "Cyan", hex: "#06b6d4", hover: "#22d3ee", label: "Cool Cyan" },
];

const PROGRESS_DURATION = 3500; // ms

const LOADING_MESSAGES = [
    "Mixing the perfect palette...",
    "Painting the pixels...",
    "Tuning the vibes...",
    "Crafting your aesthetic...",
    "Almost there, hold tight...",
];

export default function ThemeSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"pick" | "loading" | "done">("pick");
    const [toast, setToast] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    const [loadingMsg, setLoadingMsg] = useState("");
    const progressRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);

    // Restore saved theme on mount
    useEffect(() => {
        const saved = localStorage.getItem("theme-accent");
        if (saved) {
            const idx = THEMES.findIndex((t) => t.hex === saved);
            if (idx >= 0) {
                setActiveIdx(idx);
                applyThemeInstant(THEMES[idx]);
            }
        }
    }, []);

    const applyThemeInstant = (theme: typeof THEMES[0]) => {
        document.documentElement.style.setProperty("--color-accent", theme.hex);
        document.documentElement.style.setProperty("--color-accent-hover", theme.hover);
    };

    const handleColorSelect = useCallback((idx: number) => {
        if (phase !== "pick" || idx === activeIdx) return;

        setSelectedIdx(idx);
        setPhase("loading");
        setProgress(0);
        setLoadingMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
        startTimeRef.current = performance.now();

        const animate = (now: number) => {
            const elapsed = now - startTimeRef.current;
            const p = Math.min(elapsed / PROGRESS_DURATION, 1);
            setProgress(p);

            if (p < 1) {
                progressRef.current = requestAnimationFrame(animate);
            } else {
                finishApply(idx);
            }
        };

        progressRef.current = requestAnimationFrame(animate);
    }, [phase, activeIdx]);

    const finishApply = (idx: number) => {
        setPhase("done");

        // Shake the page
        document.body.classList.add("theme-shake");

        setTimeout(() => {
            document.body.classList.remove("theme-shake");

            const theme = THEMES[idx];
            applyThemeInstant(theme);
            localStorage.setItem("theme-accent", theme.hex);
            setActiveIdx(idx);

            // Reset and close
            setSelectedIdx(null);
            setProgress(0);
            setPhase("pick");
            setIsOpen(false);

            // Show success toast
            setToast(true);
            setTimeout(() => setToast(false), 2500);
        }, 600);
    };

    const handleClose = () => {
        if (phase === "loading") {
            cancelAnimationFrame(progressRef.current);
        }
        setSelectedIdx(null);
        setProgress(0);
        setPhase("pick");
        setIsOpen(false);
    };

    return (
        <>
            {/* ── Floating trigger button ── */}
            <motion.button
                onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
                className="fixed bottom-6 right-6 z-[100] w-12 h-12 rounded-full flex items-center justify-center text-lg select-none"
                style={{
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: `0 0 20px ${THEMES[activeIdx].hex}22`,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ rotate: isOpen ? 45 : 0 }}
                title="Change theme color"
            >
                <span
                    className="inline-block"
                    style={{
                        filter: `drop-shadow(0 0 6px ${THEMES[activeIdx].hex})`,
                        transition: "filter 0.3s ease",
                    }}
                >
                    ✦
                </span>
            </motion.button>

            {/* ── Tooltip hint ── */}
            <AnimatePresence>
                {!isOpen && !toast && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: 2, duration: 0.5 }}
                        className="fixed bottom-8 right-20 z-[99] px-3 py-1.5 rounded-full text-xs text-white/50 whitespace-nowrap pointer-events-none"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        ✨ Wanna try a new vibe?
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Centered modal ── */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[150]"
                            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
                            onClick={phase === "pick" ? handleClose : undefined}
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85, y: 30 }}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            className="fixed inset-0 z-[151] flex items-center justify-center pointer-events-none"
                        >
                            <div
                                className="pointer-events-auto w-[90vw] max-w-md rounded-3xl p-8 relative overflow-hidden"
                                style={{
                                    background: "rgba(12, 12, 12, 0.9)",
                                    backdropFilter: "blur(32px)",
                                    WebkitBackdropFilter: "blur(32px)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.1)",
                                }}
                            >
                                {/* Decorative glow */}
                                <div
                                    className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-30"
                                    style={{ background: THEMES[selectedIdx ?? activeIdx].hex }}
                                />

                                {/* Close button */}
                                {phase === "pick" && (
                                    <button
                                        onClick={handleClose}
                                        className="absolute top-4 right-5 text-white/30 hover:text-white/80 text-xl transition-colors"
                                    >
                                        ✕
                                    </button>
                                )}

                                {/* ── Phase: Pick ── */}
                                <AnimatePresence mode="wait">
                                    {phase === "pick" && (
                                        <motion.div
                                            key="pick"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="space-y-8"
                                        >
                                            <div className="text-center space-y-2">
                                                <h3 className="text-xl font-bold text-white tracking-tight">
                                                    Choose your <span style={{ color: THEMES[activeIdx].hex }}>vibe</span>
                                                </h3>
                                                <p className="text-sm text-white/40">
                                                    Pick an accent color that speaks to you
                                                </p>
                                            </div>

                                            <div className="flex justify-center gap-5">
                                                {THEMES.map((theme, i) => {
                                                    const isActive = i === activeIdx;
                                                    return (
                                                        <button
                                                            key={theme.name}
                                                            onClick={() => handleColorSelect(i)}
                                                            className="flex flex-col items-center gap-3 group transition-transform"
                                                        >
                                                            <div
                                                                className="w-14 h-14 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                                                                style={{
                                                                    background: `radial-gradient(circle at 35% 35%, ${theme.hover}, ${theme.hex})`,
                                                                    boxShadow: isActive
                                                                        ? `0 0 20px ${theme.hex}66, inset 0 0 10px rgba(255,255,255,0.15)`
                                                                        : `0 0 10px ${theme.hex}33`,
                                                                    border: isActive ? "2px solid rgba(255,255,255,0.5)" : "2px solid rgba(255,255,255,0.08)",
                                                                }}
                                                            />
                                                            <span
                                                                className="text-xs font-medium transition-colors"
                                                                style={{ color: isActive ? theme.hex : "rgba(255,255,255,0.35)" }}
                                                            >
                                                                {theme.name}
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <p className="text-center text-[11px] text-white/20 tracking-wide">
                                                Currently using <span style={{ color: THEMES[activeIdx].hex }}>{THEMES[activeIdx].name}</span>
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* ── Phase: Loading ── */}
                                    {(phase === "loading" || phase === "done") && selectedIdx !== null && (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="space-y-8 py-4"
                                        >
                                            {/* Selected color highlight */}
                                            <div className="flex flex-col items-center gap-4">
                                                <motion.div
                                                    initial={{ scale: 0.5 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                    className="w-20 h-20 rounded-full"
                                                    style={{
                                                        background: `radial-gradient(circle at 35% 35%, ${THEMES[selectedIdx].hover}, ${THEMES[selectedIdx].hex})`,
                                                        boxShadow: `0 0 40px ${THEMES[selectedIdx].hex}55, 0 0 80px ${THEMES[selectedIdx].hex}22`,
                                                    }}
                                                />
                                                <h3 className="text-lg font-bold text-white">
                                                    {THEMES[selectedIdx].label}
                                                </h3>
                                            </div>

                                            {/* Progress bar */}
                                            <div className="space-y-3">
                                                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                                                    <motion.div
                                                        className="h-full rounded-full"
                                                        style={{
                                                            width: `${progress * 100}%`,
                                                            background: `linear-gradient(90deg, ${THEMES[selectedIdx].hex}, ${THEMES[selectedIdx].hover})`,
                                                            boxShadow: `0 0 12px ${THEMES[selectedIdx].hex}88`,
                                                        }}
                                                    />
                                                </div>
                                                <p className="text-center text-sm text-white/40 italic">
                                                    {phase === "done" ? "✨ Applying..." : loadingMsg}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ── Success toast ── */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-full text-sm font-medium text-white flex items-center gap-2"
                        style={{
                            background: "rgba(10, 10, 10, 0.85)",
                            backdropFilter: "blur(16px)",
                            border: `1px solid ${THEMES[activeIdx].hex}44`,
                            boxShadow: `0 0 30px ${THEMES[activeIdx].hex}33`,
                        }}
                    >
                        <span style={{ color: THEMES[activeIdx].hex }}>✦</span>
                        Theme Applied!
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
