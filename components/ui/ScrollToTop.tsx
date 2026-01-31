"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight === 0) return;

            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(Math.round(progress));

            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.5, x: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-6 md:bottom-32 md:right-8 z-[10000] pointer-events-auto cursor-pointer group"
                >
                    <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                        {/* Outer Glow */}
                        <div className="absolute inset-0 bg-mine/5 rounded-full blur-xl group-hover:bg-mine/10 transition-colors" />

                        {/* Circular Progress Path */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                className="stroke-zinc-800/50 fill-none"
                                strokeWidth="2"
                            />
                            <motion.circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                className="stroke-mine fill-none"
                                strokeWidth="2"
                                strokeDasharray="100"
                                initial={{ strokeDashoffset: 100 }}
                                animate={{ strokeDashoffset: 100 - scrollProgress }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        </svg>

                        {/* Central Button */}
                        <div className="relative w-10 h-10 md:w-12 md:h-12 bg-zinc-950 rounded-full border border-white/5 flex flex-col items-center justify-center shadow-2xl group-hover:border-mine/30 transition-colors">
                            <ArrowUp size={16} className="text-white group-hover:translate-y-[-2px] transition-transform" />
                            <span className="text-[7px] font-mono text-zinc-500 font-black mt-0.5">
                                {scrollProgress}%
                            </span>
                        </div>

                        {/* Technical Decals */}
                        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-mine rounded-full animate-pulse shadow-[0_0_8px_#38ff42]" />
                        <div className="absolute top-1/2 -right-3 -translate-y-1/2 flex flex-col gap-0.5">
                            <div className="w-1 h-px bg-mine/30" />
                            <div className="w-2 h-px bg-mine/50" />
                            <div className="w-1 h-px bg-mine/30" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
