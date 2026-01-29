"use client";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { X, ExternalLink, Activity, Target, Zap, User } from "lucide-react"; // Icons for grid
import Link from "next/link";
import { useEffect } from "react";
import { Project } from "@/lib/getProjects";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    // Esc key close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset" };
    }, [isOpen]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl scrollbar-hide flex flex-col"
                    >
                        {/* Close Button - Sticky or absolute? Absolute is fine inside the relative container */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors z-20 backdrop-blur-sm border border-white/10"
                        >
                            <X size={20} />
                        </button>

                        {/* Image Header */}
                        <div className="relative w-full h-64 md:h-80 shrink-0">
                            <Image
                                src={project.url}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 right-8">
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-3xl md:text-5xl font-bold text-white mb-3"
                                >
                                    {project.title}
                                </motion.h2>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex gap-2 flex-wrap"
                                >
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs text-white font-medium tracking-wide">
                                            #{tag}
                                        </span>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 space-y-8">

                            {/* Summary + Links */}
                            <div className="flex flex-col md:flex-row gap-8 justify-between">
                                <div className="flex-1 space-y-4">
                                    <h3 className="text-xl font-bold text-mine flex items-center gap-2">
                                        <Activity size={20} />
                                        Project Overview
                                    </h3>
                                    <p className="text-neutral-300 leading-loose text-base md:text-lg">
                                        {project.summary}
                                    </p>
                                </div>
                                <div className="flex flex-row md:flex-col gap-3 shrink-0 md:w-48">
                                    {project.link && (
                                        <Link href={project.link} target="_blank" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-mine to-green-500 text-black font-bold rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-green-500/20 justify-center group">
                                            Live Demo <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Separator */}
                            <div className="h-px bg-zinc-800 w-full" />

                            {/* Grid Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DetailCard title="The Problem" icon={<Target size={18} className="text-red-400" />} content={project.problem} delay={0.3} />
                                <DetailCard title="The Solution" icon={<Zap size={18} className="text-yellow-400" />} content={project.solution} delay={0.4} />
                                <DetailCard title="My Role" icon={<User size={18} className="text-blue-400" />} content={project.role} delay={0.5} />
                                <DetailCard title="Impact" icon={<Activity size={18} className="text-hers" />} content={project.impact} delay={0.6} />
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const DetailCard = ({ title, icon, content, delay }: { title: string, icon: React.ReactNode, content: string, delay: number }) => {
    if (!content) return null;
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-zinc-800/20 p-6 rounded-2xl border border-zinc-800/50 hover:border-zinc-700/50 hover:bg-zinc-800/40 transition-all duration-300"
        >
            <h4 className="font-bold text-white mb-3 flex items-center gap-2 text-lg">
                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                    {icon}
                </div>
                {title}
            </h4>
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light">
                {content}
            </p>
        </motion.div>
    )
}
