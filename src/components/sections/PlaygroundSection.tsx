"use client";

import { motion } from "framer-motion";
import SnakeGame from "../ui/SnakeGame";

export default function PlaygroundSection() {
    return (
        <section id="playground" className="relative py-24 flex items-center justify-center overflow-hidden bg-black border-t border-white/5">
            {/* Background elements */}
            <div className="absolute top-10 right-10 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 flex flex-col items-center justify-center z-10 space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-6 flex flex-col items-center"
                >
                    <div className="inline-block px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-sm font-medium tracking-wide text-blue-400">
                        🎮 Interactive Playground
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                        Take a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-blue-500">Break</span>
                    </h2>
                    <p className="text-lg text-gray-400 font-light max-w-2xl text-center">
                        You've made it this far — reward yourself with a quick game of Snake! Swipe or use arrow keys to play.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full max-w-4xl pb-12"
                >
                    <SnakeGame />
                </motion.div>
            </div>
        </section>
    );
}
