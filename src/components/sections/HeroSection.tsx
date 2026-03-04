"use client";

import { motion } from "framer-motion";
import { Download, ChevronRight } from "lucide-react";
import Abstract3DShape from "../ui/Abstract3DShape";

export default function HeroSection() {
    return (
        <section id="hero" className="relative md:min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-block"
                    >
                        <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium tracking-wide">
                            👋 Available for new opportunities
                        </span>
                    </motion.div>

                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                            Hi, I'm{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-blue-500">
                                Gaurav Kaklotar
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-lg font-light">
                            System Engineer & Full Stack Developer building scalable architectures and dynamic visual experiences.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4 pointer-events-auto">
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-black font-semibold rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors"
                        >
                            View Work <ChevronRight className="w-5 h-5" />
                        </motion.a>

                        <motion.a
                            href="#" // Provide link to resume pdf here if available
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full flex items-center gap-2 hover:bg-white/5 transition-colors backdrop-blur-md"
                        >
                            Resume <Download className="w-5 h-5" />
                        </motion.a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, type: "spring" }}
                    className="relative h-[400px] md:h-[600px] flex items-center justify-center pointer-events-auto"
                >
                    {/* Animated pulsing ring behind character */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/20 to-blue-500/20 rounded-full blur-3xl"
                    />

                    <motion.div
                        className="w-full h-full max-w-lg relative z-10 drop-shadow-2xl"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Abstract3DShape />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
