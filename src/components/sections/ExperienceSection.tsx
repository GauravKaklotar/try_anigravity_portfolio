"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

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
        <section id="experience" className="py-24 relative">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 flex items-center gap-4"
                >
                    <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent)]/20 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-[var(--color-accent)]" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Experience</h2>
                </motion.div>

                <div className="relative border-l border-white/10 ml-6 md:ml-0 space-y-12 pb-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline Node */}
                            <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-black border-2 border-[var(--color-accent)] shadow-[0_0_15px_var(--color-accent)]" />

                            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">
                                            {exp.role}
                                        </h3>
                                        <p className="text-lg text-gray-300 font-medium">{exp.company}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-semibold mb-1">
                                            {exp.duration}
                                        </span>
                                        <p className="text-sm text-gray-500">{exp.location}</p>
                                    </div>
                                </div>

                                <ul className="space-y-3 mt-6">
                                    {exp.points.map((point, i) => (
                                        <li key={i} className="text-gray-400 flex items-start gap-3">
                                            <span className="text-[var(--color-accent)] mt-1.5 opacity-70">▹</span>
                                            <span className="leading-relaxed">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
