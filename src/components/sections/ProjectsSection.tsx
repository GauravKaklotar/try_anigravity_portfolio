"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, Github } from "lucide-react";

export default function ProjectsSection() {
    const projects = [
        {
            title: "Uncia",
            tech: ["FastAPI", "Django", "React", "Next.js"],
            date: "Aug 2024",
            description: "Reduced research time by 60% with real-time product lifecycle updates through optimized FastAPI endpoints and web scraping.",
            link: "#",
            github: "#",
            image: "https://picsum.photos/seed/uncia/800/600"
        },
        {
            title: "LeaveManager",
            tech: ["MERN Stack", "JWT", "React", "NodeJS"],
            date: "Dec 2022",
            description: "A leave management system reducing processing time by 40% with JWT-secured authentication and intuitive dashboards.",
            link: "#",
            github: "#",
            image: "https://picsum.photos/seed/leave/800/600"
        },
        {
            title: "TaskFlow Pro",
            tech: ["Next.js", "Tailwind", "PostgreSQL", "Prisma"],
            date: "2023",
            description: "Modern project management tool with real-time collaboration, kanban boards, and AI-powered task prioritization.",
            link: "#",
            github: "#",
            image: "https://picsum.photos/seed/taskflow/800/600"
        },
        {
            title: "FinDash",
            tech: ["React", "TypeScript", "Chart.js", "Firebase"],
            date: "2024",
            description: "Financial dashboard for tracking expenses, investments, and generating predictive budget reports.",
            link: "#",
            github: "#",
            image: "https://picsum.photos/seed/findash/800/600"
        }
    ];

    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            {/* Background glow for projects */}
            <div className="absolute top-[30%] right-[0%] w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 flex items-center gap-4"
                >
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                        <Code2 className="w-6 h-6 text-blue-400" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Projects</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-zinc-900 border border-white/10"
                        >
                            {/* Core Image container */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${project.image})` }}
                            />
                            {/* Default dark overlay */}
                            <div className="absolute inset-0 bg-black/50 transition-colors duration-500 group-hover:bg-black/80" />

                            {/* Hover Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-1">{project.title}</h3>
                                        <span className="text-sm font-medium text-[var(--color-accent)]">{project.date}</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <a href={project.github} className="p-2 rounded-full bg-white/10 hover:bg-white/30 transition-colors backdrop-blur-md">
                                            <Github className="w-5 h-5 text-white" />
                                        </a>
                                        <a href={project.link} className="p-2 rounded-full bg-[var(--color-accent)]/80 hover:bg-[var(--color-accent)] transition-colors backdrop-blur-md">
                                            <ExternalLink className="w-5 h-5 text-white" />
                                        </a>
                                    </div>
                                </div>

                                <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-gray-200 backdrop-blur-md">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Always visible title (fades out on hover) */}
                            <div className="absolute inset-x-8 bottom-8 flex items-center justify-between group-hover:opacity-0 transition-opacity duration-300">
                                <h3 className="text-2xl font-bold text-white drop-shadow-lg">{project.title}</h3>
                                <span className="text-white/60 text-sm font-medium">{project.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
