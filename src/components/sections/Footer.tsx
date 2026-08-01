"use client";

import { motion } from "framer-motion";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 border-t border-white/10 bg-black text-center text-sm text-gray-500 relative z-10">
            <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center justify-between gap-4 md:flex-row">
                <p>© {currentYear} Gaurav Kaklotar. All rights reserved.</p>
                <div className="flex gap-6">
                    <motion.a
                        href="#"
                        whileHover={{ y: -2, color: "#ffffff" }}
                        className="transition-colors"
                    >
                        GitHub
                    </motion.a>
                    <motion.a
                        href="#"
                        whileHover={{ y: -2, color: "#ffffff" }}
                        className="transition-colors"
                    >
                        LinkedIn
                    </motion.a>
                    <motion.a
                        href="#"
                        whileHover={{ y: -2, color: "#ffffff" }}
                        className="transition-colors"
                    >
                        Twitter
                    </motion.a>
                </div>
            </div>
        </footer>
    );
}
