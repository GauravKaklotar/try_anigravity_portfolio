"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const cardVariants = {
    hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            delay: i * 0.15,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function ExperienceSection() {
    const experiences = [
        {
            company: "Tata Consultancy Services",
            role: "System Engineer",
            duration: "Feb 2025 – Present",
            location: "Mumbai, Maharashtra",
            points: [
                "Developed a Bank Management System using HTML, CSS, JSP, and Servlet, optimizing financial operations and user experience.",
                "Implemented secure transaction processing and efficient account management, ensuring system reliability."
            ]
        },
        {
            company: "SSV Infotech",
            role: "Software Developer",
            duration: "Aug 2024 – Jan 2025",
            location: "Surat, Gujarat",
            points: [
                "Developed and maintained scalable backend systems using Django and Flask, significantly reducing data processing time by 50%.",
                "Designed dynamic and responsive user interfaces using React and Next.js, enhancing user engagement and experience.",
                "Integrated OpenAI APIs into applications to deliver AI-powered solutions, increasing automation and innovation.",
                "Optimized database interactions with PostgreSQL and MySQL, improving query efficiency and scalability by 30%."
            ]
        },
        {
            company: "Confidosoft Solutions Pvt. Ltd.",
            role: "Software Developer Intern",
            duration: "Dec 2023 – Jun 2024",
            location: "Vadodara, Gujarat",
            points: [
                "Designed and implemented dynamic front-end interfaces using Angular, enhancing user experience and application responsiveness.",
                "Developed and maintained scalable back-end systems with .NET Web APIs, reducing bug occurrence by 40% and improving system reliability.",
                "Automated workflows using Ansible, streamlining processes and reducing manual deployment time by 50%.",
                "Created efficient MSI and Bundle Installers for Windows applications using WIX, ensuring seamless software deployment."
            ]
        }
    ];

    return (
        <section id="experience" className="py-20 md:py-24 relative">
            <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12 md:mb-16 flex items-center gap-4"
                >
                    <motion.div
                        className="w-12 h-12 rounded-2xl bg-[var(--color-accent)]/20 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <Briefcase className="w-6 h-6 text-[var(--color-accent)]" />
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Experience</h2>
                </motion.div>

                <div className="relative border-l-2 border-white/10 ml-4 sm:ml-6 md:ml-0 space-y-10 md:space-y-12 pb-12">
                    {/* Animated timeline line glow */}
                    <motion.div
                        className="absolute top-0 left-[-1px] w-[2px] bg-gradient-to-b from-[var(--color-accent)] to-transparent"
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{ boxShadow: "0 0 12px var(--color-accent)" }}
                    />

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            className="relative pl-6 sm:pl-8 md:pl-12"
                        >
                            {/* Timeline Node — pulsing glow */}
                            <motion.div
                                className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-black border-2 border-[var(--color-accent)]"
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 300 }}
                                style={{ boxShadow: "0 0 15px var(--color-accent)" }}
                            />

                            <motion.div
                                className="bg-white/[0.03] border border-white/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 group"
                                whileHover={{
                                    backgroundColor: "rgba(255,255,255,0.06)",
                                    borderColor: "rgba(139,92,246,0.2)",
                                    boxShadow: "0 0 40px rgba(139,92,246,0.08)",
                                }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors duration-300">
                                            {exp.role}
                                        </h3>
                                        <p className="text-base sm:text-lg text-gray-300 font-medium">{exp.company}</p>
                                    </div>
                                    <div className="md:text-right">
                                        <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-semibold mb-1">
                                            {exp.duration}
                                        </span>
                                        <p className="text-sm text-gray-500">{exp.location}</p>
                                    </div>
                                </div>

                                <ul className="space-y-3 mt-5 sm:mt-6">
                                    {exp.points.map((point, i) => (
                                        <motion.li
                                            key={i}
                                            className="text-gray-400 flex items-start gap-3 text-sm sm:text-base"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.15 + i * 0.06 + 0.3, duration: 0.4 }}
                                        >
                                            <span className="text-[var(--color-accent)] mt-1.5 opacity-70">▹</span>
                                            <span className="leading-relaxed">{point}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
