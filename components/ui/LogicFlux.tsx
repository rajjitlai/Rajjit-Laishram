"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useVelocity, useTransform, MotionValue } from "framer-motion";

export const LogicFlux = () => {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Transform velocity into animation speed (System Load)
    const fluxSpeed = useTransform(scrollVelocity, [-2000, 2000], [5, 0.5], { clamp: true });

    return (
        <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden opacity-30">
            {/* Base Logic Grid */}
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:100px_100px]"
                style={{
                    maskImage: "radial-gradient(circle at center, black, transparent 80%)"
                }}
            />

            {/* Pulsing Intersections */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <DataPacket key={i} speed={fluxSpeed} />
                ))}
            </div>

            {/* Global Scanline Flux */}
            <motion.div
                animate={{
                    y: ["0%", "100%"],
                    opacity: [0.05, 0.1, 0.05]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute inset-0 h-1 bg-gradient-to-r from-transparent via-mine/20 to-transparent"
            />
        </div>
    );
};

const DataPacket = ({ speed }: { speed: MotionValue<number> }) => {
    const [pos, setPos] = useState({ x: 0, y: 0, vertical: false });

    useEffect(() => {
        setPos({
            x: Math.floor(Math.random() * 20) * 100,
            y: Math.floor(Math.random() * 20) * 100,
            vertical: Math.random() > 0.5
        });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                x: pos.vertical ? pos.x : [pos.x, pos.x + 300],
                y: pos.vertical ? [pos.y, pos.y + 300] : pos.y,
                opacity: [0, 1, 0]
            }}
            style={{
                transitionDuration: `${speed.get()}s`
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
            }}
            className={`absolute ${pos.vertical ? "w-[1px] h-12" : "w-12 h-[1px]"} bg-gradient-to-r from-transparent via-mine to-transparent shadow-[0_0_10px_#38ff42]`}
        />
    );
};
