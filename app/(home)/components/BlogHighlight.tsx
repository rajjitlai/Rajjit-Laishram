"use client";

import React from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { FaExternalLinkAlt, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";

export function BlogHighlight() {
    return (
        <div className="py-20 font-outfit" id="blog">
            <div className="max-w-5xl mx-auto p-12 rounded-[2rem] bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 relative overflow-hidden group shadow-2xl">
                {/* Background Glows */}
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-hers/20 blur-[120px] -z-10 group-hover:bg-hers/30 transition-colors duration-1000" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-mine/20 blur-[120px] -z-10 group-hover:bg-mine/30 transition-colors duration-1000" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8 text-center lg:text-left">
                        <div className="space-y-4">
                            <p className="text-mine font-mono text-sm tracking-[0.3em] uppercase">Deep Dives & Insights</p>
                            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                Tech Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-mine to-hers">Snippets</span>
                            </h2>
                        </div>

                        <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                            I regularly share technical deep-dives into <span className="text-white font-semibold">IoT integrations</span>,
                            <span className="text-white font-semibold"> Next.js optimizations</span>, and <span className="text-white font-semibold">hardware debugging</span>.
                        </p>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                            <div className="flex items-center gap-3 px-5 py-2.5 bg-zinc-800/30 rounded-xl border border-zinc-700/50 text-sm text-zinc-300 backdrop-blur-sm">
                                <div className="w-2 h-2 rounded-full bg-hers shadow-[0_0_8px_rgba(0,253,190,0.8)]" />
                                10+ Deep Dives
                            </div>
                            <div className="flex items-center gap-3 px-5 py-2.5 bg-zinc-800/30 rounded-xl border border-zinc-700/50 text-sm text-zinc-300 backdrop-blur-sm">
                                <div className="w-2 h-2 rounded-full bg-mine shadow-[0_0_8px_rgba(56,255,66,0.8)]" />
                                Curated Snippets
                            </div>
                        </div>

                        <div className="pt-6">
                            <a
                                href="https://rjsblog.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full sm:w-auto"
                            >
                                <HoverBorderGradient
                                    as="div"
                                    className="bg-white text-black flex items-center justify-center gap-3 py-4 px-10 text-lg font-black group transition-transform active:scale-95"
                                >
                                    Explore Blog <FaExternalLinkAlt className="text-sm group-hover:translate-x-1 transition-transform" />
                                </HoverBorderGradient>
                            </a>
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-1 justify-center relative">
                        {/* Visual representation of a digital blog interface */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            className="w-72 h-96 bg-zinc-950/80 rounded-3xl border border-zinc-800 shadow-2xl relative p-6 backdrop-blur-md"
                        >
                            {/* Interface Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-mine/10 to-transparent pointer-events-none rounded-3xl" />

                            <div className="w-full h-32 bg-zinc-800/50 rounded-2xl mb-6 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                            </div>

                            <div className="space-y-3">
                                <div className="w-full h-3 bg-zinc-800 rounded-full" />
                                <div className="w-2/3 h-3 bg-zinc-800 rounded-full" />
                                <div className="pt-4 space-y-2">
                                    <div className="w-full h-1.5 bg-zinc-900 rounded-full" />
                                    <div className="w-full h-1.5 bg-zinc-900 rounded-full" />
                                    <div className="w-4/5 h-1.5 bg-zinc-900 rounded-full" />
                                </div>
                            </div>

                            {/* Floating Holographic Element */}
                            <motion.div
                                animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -right-12 top-1/2 w-40 h-48 bg-zinc-900/90 p-5 rounded-2xl border border-hers/40 shadow-[0_0_30px_rgba(0,253,190,0.15)] flex flex-col justify-between"
                            >
                                <div className="w-10 h-10 bg-hers/10 rounded-xl flex items-center justify-center">
                                    <FaCode className="text-hers text-xl" />
                                </div>
                                <div className="space-y-2">
                                    <div className="w-full h-2 bg-zinc-800 rounded-full" />
                                    <div className="w-full h-2 bg-zinc-800 rounded-full" />
                                </div>
                                <div className="w-full h-8 bg-hers/20 rounded-lg border border-hers/30" />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
