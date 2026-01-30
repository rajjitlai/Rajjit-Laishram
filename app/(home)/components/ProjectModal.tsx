"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink, Activity, Target, Zap, User } from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/getProjects";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

import { createPortal } from "react-dom";

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    const [isSchematic, setIsSchematic] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Reset schematic when modal closes
    useEffect(() => {
        if (!isOpen) setIsSchematic(false);
    }, [isOpen]);

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

    if (!project || !mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] isolate">
                    {/* 1. Forensic Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
                    />

                    {/* 2. Control Layer (Non-Scrolling) */}
                    <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                        {/* 3. Compact Mission Terminal (Fixed Height Interface) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-4xl max-h-[85vh] bg-zinc-950 border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col overflow-hidden pointer-events-auto outline-none"
                        >
                            {/* LOCKED_HEADER: Fixed Navigation Controls */}
                            <div className="shrink-0 p-6 md:px-10 border-b border-white/5 bg-zinc-900/40 backdrop-blur-md flex items-center justify-between z-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-3 h-3 rounded-full bg-mine shadow-[0_0_10px_#38ff42]" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black font-mono text-white/40 tracking-[0.2em] leading-none uppercase">MISSION_FILE_{project.id.slice(0, 8)}</span>
                                        <span className="text-[8px] font-mono text-mine/60 tracking-widest mt-1 uppercase">ESTABLISHING_SECURE_UPLINK...</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setIsSchematic(!isSchematic)}
                                        className={cn(
                                            "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all",
                                            isSchematic ? "bg-mine text-black border-mine" : "bg-black/40 text-zinc-500 border-zinc-800 hover:text-white"
                                        )}
                                    >
                                        {isSchematic ? "SIM_OFF" : "SCHEMATIC"}
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="p-2.5 bg-zinc-900/80 hover:bg-zinc-800 rounded-xl text-white border border-zinc-800 transition-all group"
                                    >
                                        <X size={18} className="group-hover:rotate-90 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            {/* SCROLLABLE_BODY: Internal Data Stream */}
                            <div className="flex-1 overflow-y-auto scrollbar-hide">
                                <div className="flex flex-col">
                                    {/* 1. HERO_SECTION: Compact Split View */}
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        {/* Visual Node */}
                                        <div className="relative aspect-video md:aspect-auto min-h-[300px] bg-zinc-900 overflow-hidden border-r border-white/5">
                                            <motion.div
                                                animate={{
                                                    filter: isSchematic ? "invert(1) hue-rotate(180deg) brightness(0.6) contrast(1.5) saturate(0)" : "none"
                                                }}
                                                className="absolute inset-0"
                                            >
                                                <Image src={project.url} alt={project.title} fill className="object-cover object-top opacity-70" priority />
                                                {isSchematic && <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />}
                                            </motion.div>
                                            <div className="absolute top-4 left-4 font-mono text-[8px] text-white/20">CAM_01 // VISUAL_ARRAY</div>
                                        </div>

                                        {/* Meta Node */}
                                        <div className="p-8 md:p-10 flex flex-col justify-center gap-6 bg-black/20">
                                            <div className="space-y-2">
                                                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                                                    {project.title}
                                                </h2>
                                                <div className="flex gap-2">
                                                    {project.tags.slice(0, 3).map((tag, i) => (
                                                        <span key={i} className="text-[10px] font-mono font-black text-mine/60 uppercase">#{tag}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="text-zinc-500 text-sm leading-relaxed font-outfit">
                                                {project.summary}
                                            </p>

                                            {project.link && (
                                                <Link href={project.link} target="_blank">
                                                    <button className="flex items-center gap-3 px-6 py-3 bg-white text-black font-black text-[11px] uppercase tracking-widest rounded-xl hover:bg-mine transition-all group shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                                                        UPLINK_DEPLOY <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    {/* 2. DATA_GRID: Analysis Nodes */}
                                    <div className="p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-950/50">
                                        <CompactDetail title="Mission Objective" icon={<Target size={16} />} content={project.problem} />
                                        <CompactDetail title="System Protocol" icon={<Zap size={16} />} content={project.solution} />
                                        <CompactDetail title="Involvement" icon={<User size={16} />} content={project.role} />
                                        <CompactDetail title="Impact Analysis" icon={<Activity size={16} />} content={project.impact} />
                                    </div>
                                </div>
                            </div>

                            {/* LOCKED_FOOTER: Live Telemetry Status */}
                            <div className="shrink-0 p-6 px-10 border-t border-white/5 bg-zinc-900/40 backdrop-blur-md flex items-center justify-between text-[9px] font-mono z-50">
                                <div className="flex items-center gap-6 text-zinc-600">
                                    <div className="flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-mine animate-pulse" />
                                        <span>STATUS: NOMINAL</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-zinc-800" />
                                        <span>PROTO: {project.id.slice(0, 6)}</span>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className="w-1 h-3 bg-mine/10 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

const CompactDetail = ({ title, icon, content }: { title: string, icon: React.ReactNode, content: string }) => {
    if (!content) return null;
    return (
        <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-mine/20 transition-all flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-zinc-900 rounded-xl border border-zinc-800 group-hover:border-mine/50 group-hover:shadow-[0_0_20px_rgba(56,255,66,0.1)] transition-all">
                    <div className="text-mine/60 group-hover:text-mine transition-colors">
                        {icon}
                    </div>
                </div>
                <div>
                    <h4 className="font-black text-white/40 group-hover:text-white text-[10px] uppercase tracking-widest transition-colors leading-none">{title}</h4>
                    <div className="h-[1px] w-4 bg-zinc-800 group-hover:bg-mine/50 group-hover:w-full transition-all duration-500 mt-1"></div>
                </div>
            </div>
            <p className="text-zinc-500 leading-relaxed font-outfit text-xs">
                {content}
            </p>
        </div>
    );
};
