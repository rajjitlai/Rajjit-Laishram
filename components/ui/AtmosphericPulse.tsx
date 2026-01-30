"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const AtmosphericPulse = () => {
    const [pulses, setPulses] = useState<{ id: number; x: number; y: number }[]>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        const createPulse = () => {
            setPulses(prev => [...prev, { id: Date.now(), x: mousePos.x, y: mousePos.y }]);
            // Cleanup old pulses
            setTimeout(() => {
                setPulses(prev => prev.slice(1));
            }, 4000);
        };

        window.addEventListener("mousemove", handleMouseMove);
        const interval = setInterval(createPulse, 8000); // Pulse every 8 seconds

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearInterval(interval);
        };
    }, [mousePos]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
            <AnimatePresence>
                {pulses.map((pulse) => (
                    <motion.div
                        key={pulse.id}
                        initial={{
                            left: pulse.x,
                            top: pulse.y,
                            scale: 0,
                            opacity: 0
                        }}
                        animate={{
                            scale: [0, 10],
                            opacity: [0, 0.1, 0]
                        }}
                        transition={{
                            duration: 4,
                            ease: "easeOut"
                        }}
                        className="absolute w-40 h-40 -translate-x-1/2 -translate-y-1/2 border-[2px] border-mine/20 rounded-full"
                        style={{
                            boxShadow: "0 0 50px rgba(56, 255, 66, 0.1)"
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
