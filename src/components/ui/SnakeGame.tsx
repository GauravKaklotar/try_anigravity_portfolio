"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

type Point = { x: number; y: number };

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const SWIPE_THRESHOLD = 30; // min px for a swipe to register

export default function SnakeGame() {
    const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Point>({ x: 15, y: 10 });
    const [direction, setDirection] = useState<Point>({ x: 1, y: 0 });
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const gameAreaRef = useRef<HTMLDivElement>(null);

    const generateFood = useCallback((currentSnake: Point[]) => {
        let newFood: Point;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
            // eslint-disable-next-line no-loop-func
            if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
                break;
            }
        }
        return newFood;
    }, []);

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setDirection({ x: 1, y: 0 });
        setFood({ x: 15, y: 10 });
        setIsGameOver(false);
        setScore(0);
        setIsPlaying(true);
    };

    const startGame = () => {
        if (isGameOver) {
            resetGame();
        } else {
            setIsPlaying(true);
        }
        gameAreaRef.current?.focus();
    };

    // ── Keyboard controls ─────────────────────────────────────
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isPlaying) return;
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
                e.preventDefault();
            }

            setDirection(prev => {
                const newDirection = { ...prev };
                switch (e.key) {
                    case "ArrowUp":
                    case "w":
                    case "W":
                        if (prev.y !== 1) { newDirection.x = 0; newDirection.y = -1; }
                        break;
                    case "ArrowDown":
                    case "s":
                    case "S":
                        if (prev.y !== -1) { newDirection.x = 0; newDirection.y = 1; }
                        break;
                    case "ArrowLeft":
                    case "a":
                    case "A":
                        if (prev.x !== 1) { newDirection.x = -1; newDirection.y = 0; }
                        break;
                    case "ArrowRight":
                    case "d":
                    case "D":
                        if (prev.x !== -1) { newDirection.x = 1; newDirection.y = 0; }
                        break;
                }
                return newDirection;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isPlaying]);

    // ── Touch / swipe controls for mobile ────────────────────
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const el = gameAreaRef.current;
        if (!el) return;

        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!isPlaying || !touchStartRef.current) return;
            const touch = e.changedTouches[0];
            const dx = touch.clientX - touchStartRef.current.x;
            const dy = touch.clientY - touchStartRef.current.y;
            touchStartRef.current = null;

            // Ignore taps (very short swipe distance)
            if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) return;

            // Determine primary swipe axis
            if (Math.abs(dx) > Math.abs(dy)) {
                // Horizontal swipe
                setDirection(prev => {
                    if (dx > 0 && prev.x !== -1) return { x: 1, y: 0 };
                    if (dx < 0 && prev.x !== 1) return { x: -1, y: 0 };
                    return prev;
                });
            } else {
                // Vertical swipe
                setDirection(prev => {
                    if (dy > 0 && prev.y !== -1) return { x: 0, y: 1 };
                    if (dy < 0 && prev.y !== 1) return { x: 0, y: -1 };
                    return prev;
                });
            }
        };

        el.addEventListener("touchstart", handleTouchStart, { passive: true });
        el.addEventListener("touchend", handleTouchEnd, { passive: true });
        return () => {
            el.removeEventListener("touchstart", handleTouchStart);
            el.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isPlaying]);

    useEffect(() => {
        if (!isPlaying || isGameOver) return;

        const moveSnake = () => {
            setSnake((prevSnake: Point[]) => {
                const head = prevSnake[0];
                const newHead = {
                    x: head.x + direction.x,
                    y: head.y + direction.y
                };

                // Check wall collision
                if (
                    newHead.x < 0 ||
                    newHead.x >= GRID_SIZE ||
                    newHead.y < 0 ||
                    newHead.y >= GRID_SIZE
                ) {
                    setIsGameOver(true);
                    setIsPlaying(false);
                    if (score > 0 && score >= highScore) {
                        triggerConfetti();
                    }
                    return prevSnake;
                }

                // Check self collision
                if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                    setIsGameOver(true);
                    setIsPlaying(false);
                    if (score > 0 && score >= highScore) {
                        triggerConfetti();
                    }
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                // Check food collection
                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore((s: number) => {
                        const newScore = s + 10;
                        setHighScore((h: number) => Math.max(h, newScore));
                        return newScore;
                    });
                    setFood(generateFood(newSnake));
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        };

        // Increase speed slightly as score goes up
        const currentSpeed = Math.max(50, INITIAL_SPEED - Math.floor(score / 30) * 10);
        const gameLoop = setInterval(moveSnake, currentSpeed);

        return () => clearInterval(gameLoop);
    }, [isPlaying, isGameOver, direction, food, generateFood, score]);

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <div
            ref={gameAreaRef}
            className="w-full mx-auto aspect-square md:aspect-video bg-black/60 border-2 border-orange-500/50 rounded-3xl relative overflow-hidden backdrop-blur-xl focus:outline-none flex flex-col items-center justify-center p-4 md:p-8 shadow-[0_0_50px_rgba(249,115,22,0.15)]"
            tabIndex={0}
        >
            {/* Top Bar */}
            <div className="w-full flex justify-between items-center mb-4 px-2">
                <div className="flex items-center gap-2 text-[var(--color-accent)] font-bold text-lg">
                    <Trophy className="w-5 h-5" />
                    <span>{score}</span>
                </div>
                <div className="text-gray-400 text-sm font-medium bg-black/30 px-3 py-1 rounded-full">
                    Best: {highScore}
                </div>
            </div>

            {/* Game Grid */}
            <div
                className="w-full max-w-[600px] aspect-square bg-[#0a0a0a] rounded-xl relative border border-orange-500/30 shadow-inner overflow-hidden mx-auto"
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                    gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
                }}
            >
                {/* Food */}
                <div
                    className="bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                    style={{
                        gridColumnStart: food.x + 1,
                        gridRowStart: food.y + 1,
                        transform: "scale(0.8)"
                    }}
                />

                {/* Snake */}
                {snake.map((segment, idx) => (
                    <div
                        key={`${segment.x}-${segment.y}-${idx}`}
                        className={`${idx === 0 ? "bg-[var(--color-accent)] rounded-md" : "bg-[var(--color-accent)]/80 rounded-sm"} shadow-[0_0_10px_rgba(139,92,246,0.5)]`}
                        style={{
                            gridColumnStart: segment.x + 1,
                            gridRowStart: segment.y + 1,
                            transform: idx === 0 ? "scale(0.95)" : "scale(0.85)"
                        }}
                    />
                ))}

                {/* Overlays */}
                <AnimatePresence>
                    {!isPlaying && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-10"
                        >
                            {isGameOver ? (
                                <div className="text-center space-y-4">
                                    {(score > 0 && score >= highScore) ? (
                                        <motion.div
                                            initial={{ scale: 0.5, y: 20 }}
                                            animate={{ scale: 1, y: 0 }}
                                            className="space-y-2"
                                        >
                                            <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                                                🎉 NEW HIGH SCORE! 🎉
                                            </h3>
                                            <p className="text-gray-300 font-medium">Incredible! You scored {score}</p>
                                        </motion.div>
                                    ) : (
                                        <>
                                            <h3 className="text-3xl font-bold text-red-400 drop-shadow-lg">Game Over!</h3>
                                            <p className="text-gray-300 font-medium">Score: {score}</p>
                                        </>
                                    )}
                                    <button
                                        onClick={startGame}
                                        className="mt-4 px-6 py-3 bg-gradient-to-r from-[var(--color-accent)] to-purple-600 hover:from-purple-500 hover:to-[var(--color-accent)] text-white rounded-full font-semibold flex items-center gap-2 transition-all shadow-lg mx-auto"
                                    >
                                        <RotateCcw className="w-4 h-4" /> Play Again
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <button
                                        onClick={startGame}
                                        className="px-8 py-4 bg-white hover:bg-gray-200 text-black rounded-full font-bold flex items-center gap-2 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105"
                                    >
                                        <Play className="w-5 h-5 fill-black" /> Play Snake
                                    </button>
                                </div>
                            )}
                            <p className="text-white/40 text-sm mt-8 tracking-widest uppercase font-semibold">Swipe or Arrow Keys</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
