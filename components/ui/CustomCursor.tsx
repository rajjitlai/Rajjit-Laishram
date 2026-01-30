"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
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
            if (target.closest('a, button, [role="button"], .cursor-pointer')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999]">
            {/* Direct Crosshair Brackets */}
            <motion.div
                className="absolute w-6 h-6"
                style={{
                    x: mainX,
                    y: mainY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    rotate: isHovering ? 45 : 0
                }}
            >
                <div className="absolute top-0 left-0 w-1.5 h-0.5 bg-mine shadow-[0_0_8px_#38ff42]" />
                <div className="absolute top-0 left-0 w-0.5 h-1.5 bg-mine shadow-[0_0_8px_#38ff42]" />
                <div className="absolute bottom-0 right-0 w-1.5 h-0.5 bg-mine shadow-[0_0_8px_#38ff42]" />
                <div className="absolute bottom-0 right-0 w-0.5 h-1.5 bg-mine shadow-[0_0_8px_#38ff42]" />
            </motion.div>

            {/* Sharp Inner Point */}
            <motion.div
                className="absolute w-2 h-2 bg-mine rounded-full shadow-[0_0_15px_#38ff42]"
                style={{
                    x: mainX,
                    y: mainY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 0.5 : 1
                }}
            />
        </div>
    );
};
