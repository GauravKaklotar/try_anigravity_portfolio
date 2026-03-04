"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function ContactSection() {
    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-black border-t border-white/5">
            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                        Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-blue-500">Connect</span>
                    </h2>
                    <p className="text-gray-400 font-light max-w-2xl mx-auto">
                        Got a question or proposal, or just want to say hello? Go ahead.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-zinc-950 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl relative w-full overflow-hidden"
                >
                    {/* Decorative blur */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

                    <form name="contact" method="POST" data-netlify="true" className="space-y-6 relative z-10">
                        <input type="hidden" name="form-name" value="contact" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-gray-400" /> Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all resize-none"
                                placeholder="Tell me about your project..."
                                required
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-8 py-4 bg-gradient-to-r from-[var(--color-accent)] to-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-shadow"
                            type="submit"
                        >
                            Send Message <Send className="w-5 h-5 ml-2" />
                        </motion.button>
                    </form>

                    <div className="mt-8 flex justify-center py-4 border-t border-white/5">
                        <a href="mailto:gaurav.kaklotar03@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                <Mail className="w-4 h-4" />
                            </div>
                            gaurav.kaklotar03@gmail.com
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
