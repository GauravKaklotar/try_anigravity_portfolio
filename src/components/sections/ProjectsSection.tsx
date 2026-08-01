"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Code2, ExternalLink, Github } from "lucide-react";
import { useRef } from "react";

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Spring-based rotation for smooth 3D tilt
    const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
                rotateX,
                rotateY,
                transformPerspective: 800,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] bg-zinc-900 border border-white/10 will-change-transform"
        >
            {/* Core Image container */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.image})` }}
            />
            {/* Default dark overlay */}
            <div className="absolute inset-0 bg-black/50 transition-colors duration-500 group-hover:bg-black/80" />

            {/* Animated gradient border on hover */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    boxShadow: "inset 0 0 0 1px rgba(139,92,246,0.3), 0 0 30px rgba(139,92,246,0.1)",
                }}
            />

            {/* Hover Content */}
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{project.title}</h3>
                        <span className="text-sm font-medium text-[var(--color-accent)]">{project.date}</span>
                    </div>
                    <div className="flex gap-3">
                        <motion.a
                            href={project.github}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/30 transition-colors backdrop-blur-md"
                        >
                            <Github className="w-5 h-5 text-white" />
                        </motion.a>
                        <motion.a
                            href={project.link}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full bg-[var(--color-accent)]/80 hover:bg-[var(--color-accent)] transition-colors backdrop-blur-md"
                        >
                            <ExternalLink className="w-5 h-5 text-white" />
                        </motion.a>
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
            <div className="absolute inset-x-6 sm:inset-x-8 bottom-6 sm:bottom-8 flex items-center justify-between group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">{project.title}</h3>
                <span className="text-white/60 text-sm font-medium">{project.date}</span>
            </div>
        </motion.div>
    );
}

const PROJECTS = [
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

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-20 md:py-24 relative overflow-hidden">
            {/* Background glow for projects */}
            <div className="absolute top-[30%] right-[0%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12 md:mb-16 flex items-center gap-4"
                >
                    <motion.div
                        className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <Code2 className="w-6 h-6 text-blue-400" />
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Featured Projects</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
