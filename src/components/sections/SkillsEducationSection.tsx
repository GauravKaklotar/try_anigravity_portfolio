"use client";

import { motion, Variants } from "framer-motion";
import { GraduationCap, Zap, BrainCircuit } from "lucide-react";

const skillBadgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: i * 0.03,
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    }),
};

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

    // Running counter for staggered skill badge animations
    let badgeCounter = 0;

    return (
        <section id="education" className="py-20 md:py-24 relative overflow-hidden bg-black/50 border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* Education Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                            className="mb-10 md:mb-12 flex items-center gap-4"
                        >
                            <motion.div
                                className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center"
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <GraduationCap className="w-6 h-6 text-purple-400" />
                            </motion.div>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Education</h2>
                        </motion.div>

                        <div className="space-y-6 sm:space-y-8">
                            {education.map((edu, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
                                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] as const }}
                                    className="bg-white/[0.03] border border-white/10 p-5 sm:p-6 rounded-2xl hover:border-purple-500/30 transition-all duration-500 group relative overflow-hidden"
                                    whileHover={{ boxShadow: "0 0 30px rgba(168,85,247,0.08)" }}
                                >
                                    <motion.div
                                        className="absolute top-0 left-0 w-1.5 h-full bg-purple-500/20 group-hover:bg-purple-500 transition-colors duration-500"
                                        initial={{ height: 0 }}
                                        whileInView={{ height: "100%" }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.15 + 0.3, duration: 0.5 }}
                                    />
                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 pl-4">{edu.degree}</h3>
                                    <div className="pl-4 text-gray-400">
                                        <p className="font-medium text-gray-300">{edu.institution}</p>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2 text-sm">
                                            <span className="bg-white/10 px-2 py-1 rounded text-purple-300 w-fit">{edu.date}</span>
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
                            initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                            className="mb-10 md:mb-12 flex items-center gap-4"
                        >
                            <motion.div
                                className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <BrainCircuit className="w-6 h-6 text-green-400" />
                            </motion.div>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Technical Skills</h2>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {skills.map((skillGroup, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.92, y: 15 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
                                    className="bg-white/[0.03] border border-white/10 p-4 sm:p-5 rounded-2xl group hover:border-green-500/20 transition-all duration-500"
                                    whileHover={{ boxShadow: "0 0 25px rgba(16,185,129,0.06)" }}
                                >
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-green-400 mb-3 flex items-center gap-2">
                                        <Zap className="w-4 h-4" /> {skillGroup.category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skillGroup.items.map((item, i) => {
                                            const globalIdx = badgeCounter++;
                                            return (
                                                <motion.span
                                                    key={i}
                                                    custom={globalIdx}
                                                    variants={skillBadgeVariants}
                                                    initial="hidden"
                                                    whileInView="visible"
                                                    viewport={{ once: true }}
                                                    whileHover={{
                                                        scale: 1.08,
                                                        backgroundColor: "rgba(255,255,255,0.1)",
                                                        borderColor: "rgba(255,255,255,0.15)",
                                                    }}
                                                    className="text-sm text-gray-300 bg-white/5 px-2.5 py-1 rounded border border-white/5 transition-colors cursor-default"
                                                >
                                                    {item}
                                                </motion.span>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Infinite Marquee Strips — with edge fade masks */}
            <div className="mt-20 md:mt-24 py-10 md:py-12 border-y border-white/10 bg-[var(--color-accent)]/5 flex flex-col gap-4 md:gap-6 overflow-hidden">
                {/* Row 1: Right to Left */}
                <div className="flex whitespace-nowrap relative marquee-fade-mask">
                    <motion.div
                        className="flex whitespace-nowrap w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                    >
                        {[...marqueeTextSingle, ...marqueeTextSingle].map((tech, i) => (
                            <span key={`r1-${i}`} className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white/40 to-white/5 uppercase tracking-widest px-4 sm:px-6 md:px-8 outline-text">
                                {tech}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Row 2: Left to Right */}
                <div className="flex whitespace-nowrap relative marquee-fade-mask">
                    <motion.div
                        className="flex whitespace-nowrap w-max"
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                    >
                        {[...marqueeTextSingleReverse, ...marqueeTextSingleReverse].map((tech, i) => (
                            <span key={`r2-${i}`} className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[var(--color-accent)]/30 to-blue-500/5 uppercase tracking-widest px-4 sm:px-6 md:px-8 outline-text">
                                {tech}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
