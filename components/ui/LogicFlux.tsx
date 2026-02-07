"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export const LogicFlux = React.memo(function LogicFlux() {
    const [hasMounted, setHasMounted] = React.useState(false);

    React.useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden opacity-30 will-change-transform">
            {/* Base Logic Grid */}
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:100px_100px]"
                style={{
                    maskImage: "radial-gradient(circle at center, black, transparent 80%)"
                }}
            />

            {/* Pulsing Intersections - Fixed count and simpler motion */}
            <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                    <DataPacket key={i} />
                ))}
            </div>

            {/* Global Scanline Flux */}
            <motion.div
                animate={{
                    y: ["0%", "100%"],
                    opacity: [0.05, 0.1, 0.05]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-mine/20 to-transparent transform-gpu"
            />
        </div>
    );
});


const DataPacket = () => {
    const [config] = useState(() => ({
        x: Math.floor(Math.random() * 20) * 100,
        y: Math.floor(Math.random() * 20) * 100,
        vertical: Math.random() > 0.5,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 2
    }));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                x: config.vertical ? config.x : [config.x, config.x + 300],
                y: config.vertical ? [config.y, config.y + 300] : config.y,
                opacity: [0, 1, 0]
            }}
            transition={{
                duration: config.duration,
                repeat: Infinity,
                ease: "linear",
                delay: config.delay
            }}
            className={`absolute ${config.vertical ? "w-[0.5px] h-12" : "w-12 h-[0.5px]"} bg-gradient-to-r from-transparent via-mine to-transparent shadow-[0_0_8px_#38ff42] will-change-transform`}
        />
    );
};

