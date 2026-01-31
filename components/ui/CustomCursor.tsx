"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState("");
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200 };
    const mainX = useSpring(cursorX, springConfig);
    const mainY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest('a, button, [role="button"], .cursor-pointer');
            const technicalLabel = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');

            setIsHovering(!!interactive);
            setCursorText(technicalLabel || (interactive ? "TARGET_LOCKED" : ""));
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999] hidden md:block">
            {/* Target Locking Brackets */}
            <motion.div
                className="absolute w-8 h-8 flex items-center justify-center"
                style={{
                    left: mainX,
                    top: mainY,
                    x: "-50%",
                    y: "-50%",
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    rotate: isHovering ? 90 : 0,
                }}
            >
                {/* 4 Corner Brackets */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-mine/60" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-mine/60" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-mine/60" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-mine/60" />
            </motion.div>

            {/* Direct Crosshair Brackets (Static inner) */}
            <motion.div
                className="absolute w-4 h-4"
                style={{
                    left: mainX,
                    top: mainY,
                    x: "-50%",
                    y: "-50%",
                }}
                animate={{
                    rotate: isHovering ? -45 : 0
                }}
            >
                <div className="absolute top-0 left-0 w-1 h-0.5 bg-mine shadow-[0_0_8px_#38ff42]" />
                <div className="absolute bottom-0 right-0 w-1 h-0.5 bg-mine shadow-[0_0_8px_#38ff42]" />
            </motion.div>

            {/* Subsystem Metadata Label */}
            <AnimatePresence mode="wait">
                {cursorText && (
                    <motion.div
                        key="cursor-label"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 35 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute flex flex-col gap-0.5"
                        style={{
                            left: mainX,
                            top: mainY,
                            y: "-50%",
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="h-px w-6 bg-mine/40" />
                            <span className="text-[8px] font-mono font-black text-white bg-mine/20 backdrop-blur-md px-1.5 py-0.5 tracking-[0.2em] uppercase border border-mine/30 rounded-sm">
                                {cursorText}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 pl-8">
                            <motion.div
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="w-1 h-1 bg-hers rounded-full shadow-[0_0_5px_#00fdea]"
                            />
                            <span className="text-[6px] font-mono text-hers/80 tracking-widest uppercase">Subsystem_Uplink...</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sharp Inner Point */}
            <motion.div
                className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_12px_#fff]"
                style={{
                    left: mainX,
                    top: mainY,
                    x: "-50%",
                    y: "-50%",
                }}
            />
        </div>
    );
};
