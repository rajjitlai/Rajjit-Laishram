"use client";
import React, { useState, JSX } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            const direction = current - (scrollYProgress.getPrevious() ?? 0);

            if (scrollYProgress.get() < 0.05) {
                setVisible(false);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.95 }}
                animate={{
                    y: visible ? 0 : -50,
                    opacity: visible ? 1 : 0,
                    scale: visible ? 1 : 0.95
                }}
                transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1]
                }}
                className={cn(
                    "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-white/5 bg-black/60 backdrop-blur-xl rounded-2xl z-[5000] px-4 sm:px-6 py-3 items-center justify-center gap-1 shadow-[0_0_40px_rgba(0,0,0,0.5)]",
                    className
                )}
            >
                {/* Decorative End Bracket */}
                <div className="absolute -left-1 top-2 bottom-2 w-px bg-mine/30" />

                <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto scrollbar-hide max-w-[85vw] sm:max-w-none px-2">
                    {navItems.map((navItem, idx) => (
                        <Link
                            key={`link=${idx}`}
                            href={navItem.link}
                            className="group relative flex items-center gap-2"
                        >
                            <span className="hidden sm:block text-[10px] font-mono text-zinc-600 group-hover:text-mine transition-colors">
                                0{idx + 1}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-widest text-zinc-300 group-hover:text-white transition-colors">
                                {navItem.name}
                            </span>

                            {/* Hover Indicator */}
                            <motion.div
                                className="absolute -bottom-1 left-0 right-0 h-[1px] bg-mine origin-left scale-x-0 group-hover:scale-x-100 transition-transform"
                            />
                        </Link>
                    ))}
                </div>

                {/* System Status Node */}
                <div className="hidden md:flex ml-6 pl-6 border-l border-white/10 items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] font-mono text-zinc-600 uppercase leading-none">Status</span>
                        <span className="text-[8px] font-mono text-mine uppercase font-bold leading-none">Online</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-mine animate-pulse shadow-[0_0_8px_#38ff42]" />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
