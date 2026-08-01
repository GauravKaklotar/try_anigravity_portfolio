"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
    { name: "Playground", href: "#playground" },
];

const linkVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.4 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    }),
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    // Scroll detection + scroll spy
    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 50);

        // Scroll spy: find which section is in view
        const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
        let current = "";
        for (const id of sections) {
            const el = document.getElementById(id);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= 200) {
                    current = id;
                }
            }
        }
        setActiveSection(current);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // Disable body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; }
    }, [mobileMenuOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                    <div
                        className={`flex items-center justify-between rounded-full px-5 sm:px-6 py-3 transition-all duration-500 ${scrolled || mobileMenuOpen
                            ? "bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-lg shadow-black/20"
                            : "bg-transparent"
                            }`}
                    >
                        {/* Logo */}
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-xl font-bold tracking-tighter"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            GK<span className="text-[var(--color-accent)]">.</span>
                        </motion.a>

                        {/* Desktop Nav Links — staggered entrance */}
                        <div className="hidden md:flex items-center gap-8">
                            {NAV_LINKS.map((link, i) => {
                                const isActive = activeSection === link.href.replace("#", "");
                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        custom={i}
                                        variants={linkVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className={`text-sm font-medium transition-colors relative ${isActive
                                            ? "text-white"
                                            : "text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        {link.name}
                                        {/* Active indicator dot */}
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-active-dot"
                                                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-accent)]"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                style={{ boxShadow: "0 0 8px var(--color-accent)" }}
                                            />
                                        )}
                                    </motion.a>
                                );
                            })}
                        </div>

                        {/* Mobile Menu Toggle Button */}
                        <button
                            className="md:hidden text-white focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center pointer-events-auto"
                    >
                        <div className="flex flex-col items-center space-y-8">
                            {NAV_LINKS.map((link, i) => {
                                const isActive = activeSection === link.href.replace("#", "");
                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`text-3xl font-bold transition-colors ${isActive
                                            ? "text-[var(--color-accent)]"
                                            : "text-gray-300 hover:text-[var(--color-accent)]"
                                            }`}
                                    >
                                        {link.name}
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
