"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SECTIONS } from "@/lib/constants";
import { useActiveSection } from "@/lib/hooks/useActiveSection";

export const HUDIndex = () => {
    const activeSection = useActiveSection();

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[999] hidden lg:flex flex-col gap-6 items-end group/hud pointer-events-none">
            {SECTIONS.map((section, idx) => {
                const isActive = activeSection === section.id;
                return (
                    <div
                        key={section.id}
                        className="flex items-center gap-4 pointer-events-auto cursor-pointer"
                        onClick={() => scrollTo(section.id)}
                    >
                        {/* Label */}
                        <AnimatePresence>
                            {isActive && (
                                <motion.span
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="text-[10px] font-mono font-black text-mine/60 tracking-[0.3em] uppercase"
                                >
                                    {section.label}
                                </motion.span>
                            )}
                        </AnimatePresence>

                        {/* Indicator Box */}
                        <div className="relative">
                            <motion.div
                                animate={{
                                    borderColor: isActive ? "#38ff42" : "rgba(255,255,255,0.1)",
                                    scale: isActive ? 1.2 : 1
                                }}
                                className="w-4 h-4 border border-zinc-800 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-colors duration-500"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-dot"
                                        className="w-1.5 h-1.5 bg-mine shadow-[0_0_10px_#38ff42]"
                                    />
                                )}
                            </motion.div>

                            {/* Connector Line */}
                            {idx < SECTIONS.length - 1 && (
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-6 bg-zinc-800/50" />
                            )}
                        </div>
                    </div>
                );
            })}

            {/* Background HUD Frame Decal */}
            <div className="absolute -inset-4 border-r border-white/5 pointer-events-none -z-10" />
        </div>
    );
};
