"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const AtmosphericPulse = React.memo(function AtmosphericPulse() {
    const [pulses, setPulses] = useState<{ id: number; x: number; y: number }[]>([]);
    const lastMousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            lastMousePos.current = { x: e.clientX, y: e.clientY };
        };

        const createPulse = () => {
            setPulses(prev => [...prev, { id: Date.now(), x: lastMousePos.current.x, y: lastMousePos.current.y }]);
            // Cleanup old pulses
            setTimeout(() => {
                setPulses(prev => prev.slice(1));
            }, 4000);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        const interval = setInterval(createPulse, 9000); // Pulse every 9 seconds

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearInterval(interval);
        };
    }, []);

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
                            scale: [0, 3.5],
                            opacity: [0, 0.25, 0]
                        }}
                        transition={{
                            duration: 3.5,
                            ease: "easeOut"
                        }}
                        className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 border border-mine/30 rounded-full will-change-transform transform-gpu pointer-events-none"
                    />
                ))}
            </AnimatePresence>
        </div>
    );
});


