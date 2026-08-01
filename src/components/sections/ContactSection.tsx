"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
    const [status, setStatus] = useState<FormStatus>("idle");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const res = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData as any).toString(),
            });

            if (res.ok) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="py-20 md:py-24 relative overflow-hidden bg-black border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-12 md:mb-16 space-y-4"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
                        Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-blue-500">Connect</span>
                    </h2>
                    <p className="text-gray-400 font-light max-w-2xl mx-auto text-sm sm:text-base">
                        Got a question or proposal, or just want to say hello? Go ahead.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-zinc-950 border border-white/10 p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-2xl relative w-full overflow-hidden"
                >
                    {/* Decorative blur */}
                    <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="relative z-10 flex flex-col items-center justify-center py-12 sm:py-16 space-y-4"
                            >
                                <motion.div
                                    className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                                >
                                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                                </motion.div>
                                <motion.h3
                                    className="text-2xl font-bold text-white"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Message Sent!
                                </motion.h3>
                                <motion.p
                                    className="text-gray-400 text-center max-w-md text-sm sm:text-base"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                                </motion.p>
                                <motion.button
                                    onClick={() => setStatus("idle")}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-4 px-6 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-full transition-colors"
                                >
                                    Send another message
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <form
                                    name="contact"
                                    method="POST"
                                    data-netlify="true"
                                    onSubmit={handleSubmit}
                                    className="space-y-5 sm:space-y-6 relative z-10"
                                >
                                    <input type="hidden" name="form-name" value="contact" />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                                        <motion.div
                                            className="space-y-2"
                                            initial={{ opacity: 0, y: 15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2, duration: 0.5 }}
                                        >
                                            <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Your Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all duration-300 focus:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </motion.div>
                                        <motion.div
                                            className="space-y-2"
                                            initial={{ opacity: 0, y: 15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                        >
                                            <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all duration-300 focus:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        className="space-y-2"
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                    >
                                        <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1 flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4 text-gray-400" /> Your Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all duration-300 resize-none focus:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                                            placeholder="Tell me about your project..."
                                            required
                                        />
                                    </motion.div>

                                    {/* Error message */}
                                    <AnimatePresence>
                                        {status === "error" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -8, height: 0 }}
                                                animate={{ opacity: 1, y: 0, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                                            >
                                                <AlertCircle className="w-4 h-4 shrink-0" />
                                                Something went wrong. Please try again or email me directly.
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <motion.button
                                        whileHover={{
                                            scale: status === "submitting" ? 1 : 1.02,
                                            boxShadow: status === "submitting" ? "none" : "0 0 40px rgba(139,92,246,0.3)",
                                        }}
                                        whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                                        className="w-full px-8 py-4 bg-gradient-to-r from-[var(--color-accent)] to-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-shadow disabled:opacity-60"
                                        type="submit"
                                        disabled={status === "submitting"}
                                    >
                                        {status === "submitting" ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message <Send className="w-5 h-5 ml-2" />
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="mt-6 sm:mt-8 flex justify-center py-4 border-t border-white/5">
                        <motion.a
                            href="mailto:gaurav.kaklotar03@gmail.com"
                            className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                            whileHover={{ scale: 1.03 }}
                        >
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                <Mail className="w-4 h-4" />
                            </div>
                            gaurav.kaklotar03@gmail.com
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
