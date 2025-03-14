"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react"; 

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

const tooltipVariants = {
    initial: { opacity: 0, y: 10, scale: 0.6 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 260, damping: 10 }
    },
    exit: { opacity: 0, y: 10, scale: 0.6 },
};

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {children}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        className="absolute bottom-full mb-2 flex flex-col items-center justify-center bg-white text-black px-3 py-1 shadow-lg text-lg w-[200px]"
                        variants={tooltipVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {text}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;
