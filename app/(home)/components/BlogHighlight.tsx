"use client";

import React from "react";
import Title from "@/components/Title";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { FaExternalLinkAlt, FaBookOpen, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";

export function BlogHighlight() {
    return (
        <div className="py-20 font-merriweather" id="blog">
            <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 relative overflow-hidden group">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-hers/10 blur-[100px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-mine/10 blur-[100px] -z-10 animate-pulse" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <Title text="Tech Insights & Snippets" className="text-3xl md:text-4xl" />
                        <p className="text-neutral-400 text-lg leading-relaxed">
                            I regularly share technical deep-dives into <strong>IoT integrations</strong>,
                            <strong> Next.js optimizations</strong>, and <strong>hardware debugging</strong>
                            &nbsp; over at my primary blog.
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700 text-sm text-neutral-300">
                                <FaBookOpen className="text-hers" /> 10+ Articles
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700 text-sm text-neutral-300">
                                <FaCode className="text-mine" /> Curated Snippets
                            </div>
                        </div>

                        <div className="pt-4">
                            <a
                                href="https://rjsblog.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block"
                            >
                                <HoverBorderGradient
                                    as="div"
                                    className="bg-black text-white flex items-center gap-3 py-3 px-8 text-lg font-bold group"
                                >
                                    Visit rjsblog.in <FaExternalLinkAlt className="text-sm group-hover:translate-x-1 transition-transform" />
                                </HoverBorderGradient>
                            </a>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-1 justify-center relative">
                        {/* Visual representation of a blog card/interface */}
                        <motion.div
                            initial={{ rotate: -5, y: 20 }}
                            whileInView={{ rotate: -2, y: 0 }}
                            className="w-64 h-80 bg-zinc-800 rounded-2xl border border-zinc-700 p-6 shadow-2xl relative"
                        >
                            <div className="w-full h-32 bg-zinc-700 rounded-xl mb-4 animate-pulse" />
                            <div className="w-3/4 h-4 bg-zinc-600 rounded mb-2" />
                            <div className="w-1/2 h-4 bg-zinc-600 rounded mb-6" />
                            <div className="space-y-2">
                                <div className="w-full h-2 bg-zinc-700 rounded" />
                                <div className="w-full h-2 bg-zinc-700 rounded" />
                                <div className="w-2/3 h-2 bg-zinc-700 rounded" />
                            </div>

                            <motion.div
                                initial={{ x: 20, y: 20 }}
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -right-6 w-32 h-40 bg-zinc-900 p-4 rounded-xl border border-hers/50 shadow-hers/20 shadow-xl"
                            >
                                <div className="w-10 h-10 bg-hers/20 rounded-lg flex items-center justify-center mb-3">
                                    <FaCode className="text-hers" />
                                </div>
                                <div className="w-full h-2 bg-zinc-700 rounded mb-2" />
                                <div className="w-full h-2 bg-zinc-700 rounded" />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
