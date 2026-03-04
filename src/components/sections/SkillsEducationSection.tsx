"use client";

import { motion } from "framer-motion";
import { GraduationCap, Zap, BrainCircuit } from "lucide-react";

export default function SkillsEducationSection() {
    const education = [
        {
            degree: "Bachelor of Technology in Computer Engineering",
            institution: "Dharmsinh Desai University",
            date: "Oct 2020 - May 2024",
            grade: "CGPA: 8.60",
            location: "Nadiad, Gujarat"
        },
        {
            degree: "Higher Secondary",
            institution: "Shree Gayatri Vidhyalay",
            date: "Jul 2019 - Mar 2020",
            grade: "Percentage: 84.92",
            location: "Surat, Gujarat"
        }
    ];

    const skills = [
        { category: "Languages", items: ["Python", "JavaScript", "TypeScript", "C# (Basic)"] },
        { category: "Backend", items: ["Django", "Flask", "FastAPI", "NodeJS", "ExpressJS", ".NET Web API"] },
        { category: "Frontend", items: ["ReactJS", "Next.js", "Angular", "HTML", "CSS"] },
        { category: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL"] },
        { category: "Tools/Other", items: ["Ansible", "WIX Toolset", "Git", "Postman", "OpenAI API"] },
    ];

    const marqueeTextSingle = [...skills.flatMap(s => s.items)];
    const marqueeTextSingleReverse = [...marqueeTextSingle].reverse();

    return (
        <section id="education" className="py-24 relative overflow-hidden bg-black/50 border-t border-white/5">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Education Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-12 flex items-center gap-4"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-purple-400" />
                            </div>
                            <h2 className="text-4xl font-bold tracking-tight">Education</h2>
                        </motion.div>

                        <div className="space-y-8">
                            {education.map((edu, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                                    className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-purple-500/30 transition-colors group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-2 h-full bg-purple-500/20 group-hover:bg-purple-500 transition-colors" />
                                    <h3 className="text-xl font-bold text-white mb-1 pl-4">{edu.degree}</h3>
                                    <div className="pl-4 text-gray-400">
                                        <p className="font-medium text-gray-300">{edu.institution}</p>
                                        <div className="flex justify-between items-center mt-3 text-sm">
                                            <span className="bg-white/10 px-2 py-1 rounded text-purple-300">{edu.date}</span>
                                            <span>{edu.grade}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Skills Column */}
                    <div id="skills">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-12 flex items-center gap-4"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                                <BrainCircuit className="w-6 h-6 text-green-400" />
                            </div>
                            <h2 className="text-4xl font-bold tracking-tight">Technical Skills</h2>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {skills.map((skillGroup, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className="bg-white/5 border border-white/10 p-5 rounded-2xl"
                                >
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-green-400 mb-3 flex items-center gap-2">
                                        <Zap className="w-4 h-4" /> {skillGroup.category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skillGroup.items.map((item, i) => (
                                            <span key={i} className="text-sm text-gray-300 bg-white/5 px-2 py-1 rounded border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Infinite Marquee Strips */}
            <div className="mt-24 py-12 border-y border-white/10 bg-[var(--color-accent)]/5 flex flex-col gap-6 overflow-hidden">
                {/* Row 1: Right to Left */}
                <div className="flex whitespace-nowrap relative">
                    <motion.div
                        className="flex whitespace-nowrap w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                    >
                        {[...marqueeTextSingle, ...marqueeTextSingle].map((tech, i) => (
                            <span key={`r1-${i}`} className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white/40 to-white/5 uppercase tracking-widest px-8 outline-text">
                                {tech}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Row 2: Left to Right */}
                <div className="flex whitespace-nowrap relative">
                    <motion.div
                        className="flex whitespace-nowrap w-max"
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                    >
                        {[...marqueeTextSingleReverse, ...marqueeTextSingleReverse].map((tech, i) => (
                            <span key={`r2-${i}`} className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[var(--color-accent)]/30 to-blue-500/5 uppercase tracking-widest px-8 outline-text">
                                {tech}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
