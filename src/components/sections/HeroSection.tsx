"use client";

import { motion } from "framer-motion";
import { Download, ChevronRight, ChevronDown } from "lucide-react";
import Abstract3DShape from "../ui/Abstract3DShape";

// Stagger children animation container
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function HeroSection() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center z-10 pointer-events-none">
                {/* ── Left: Text Content ── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    <motion.div variants={itemVariants} className="inline-block">
                        <motion.span
                            className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium tracking-wide inline-flex items-center gap-2"
                            animate={{ boxShadow: ["0 0 0px rgba(139,92,246,0)", "0 0 20px rgba(139,92,246,0.15)", "0 0 0px rgba(139,92,246,0)"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                            </span>
                            Available for new opportunities
                        </motion.span>
                    </motion.div>

                    <div className="space-y-4">
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-tight"
                        >
                            Hi, I&apos;m{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-blue-500">
                                Gaurav Kaklotar
                            </span>
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-lg font-light"
                        >
                            System Engineer & Full Stack Developer building scalable architectures and dynamic visual experiences.
                        </motion.p>
                    </div>

                    <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4 pointer-events-auto">
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-black font-semibold rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors"
                        >
                            View Work <ChevronRight className="w-5 h-5" />
                        </motion.a>

                        <motion.a
                            href="#" // Provide link to resume pdf here if available
                            whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full flex items-center gap-2 hover:bg-white/5 transition-colors backdrop-blur-md"
                        >
                            Resume <Download className="w-5 h-5" />
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* ── Right: 3D Orb ── */}
                {/* 
                  FIX: Changed from scale animation (0.8→1) to opacity-only fade.
                  Scale animation was causing the orb to appear small/offset on initial load
                  because it affected the layout dimensions of the Canvas container.
                */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    className="relative h-[350px] sm:h-[400px] md:h-[550px] lg:h-[600px] flex items-center justify-center pointer-events-auto"
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

                    <div
                        className="w-full h-full max-w-lg relative z-10 drop-shadow-2xl"
                        style={{ willChange: "transform" }}
                    >
                        <Abstract3DShape />
                    </div>
                </motion.div>
            </div>

            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
                style={{ animation: "scroll-bounce 2s ease infinite" }}
            >
                <span className="text-white/30 text-xs tracking-[0.2em] uppercase font-medium">Scroll</span>
                <ChevronDown className="w-4 h-4 text-white/30" />
            </motion.div>
        </section>
    );
}
