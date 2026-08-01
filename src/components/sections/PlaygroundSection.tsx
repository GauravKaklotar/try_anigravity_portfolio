"use client";

import { motion } from "framer-motion";
import SnakeGame from "../ui/SnakeGame";

export default function PlaygroundSection() {
    return (
        <section id="playground" className="relative py-20 md:py-24 flex items-center justify-center overflow-hidden bg-black border-t border-white/5">
            {/* Background elements */}
            <div className="absolute top-10 right-10 w-72 md:w-96 h-72 md:h-96 bg-[var(--color-accent)]/10 rounded-full blur-[120px] md:blur-[150px] pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-72 md:w-96 h-72 md:h-96 bg-blue-500/10 rounded-full blur-[120px] md:blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center justify-center z-10 space-y-8 sm:space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center space-y-4 sm:space-y-6 flex flex-col items-center"
                >
                    <motion.div
                        className="inline-block px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-xs sm:text-sm font-medium tracking-wide text-blue-400"
                        whileHover={{ scale: 1.05 }}
                    >
                        🎮 Interactive Playground
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
                        Take a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-blue-500">Break</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-400 font-light max-w-2xl text-center">
                        You&apos;ve made it this far — reward yourself with a quick game of Snake! Swipe or use arrow keys to play.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-4xl pb-8 sm:pb-12"
                >
                    <SnakeGame />
                </motion.div>
            </div>
        </section>
    );
}
