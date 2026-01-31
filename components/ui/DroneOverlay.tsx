"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Plane } from "lucide-react";

type UAVMode = "patrol" | "return" | "scan" | "stealth";

const Drone = ({ id, delay, mode }: { id: string; delay: number; mode: UAVMode }) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const controls = useAnimation();

    useEffect(() => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }, []);

    const startPatrol = useCallback(async () => {
        if (!dimensions.width) return;

        await controls.start({
            x: [
                Math.random() * dimensions.width,
                Math.random() * dimensions.width,
                Math.random() * dimensions.width
            ],
            y: [
                Math.random() * dimensions.height,
                Math.random() * dimensions.height,
                Math.random() * dimensions.height
            ],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 10, -10, 0],
            transition: {
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
            }
        });
    }, [dimensions, controls]);

    const startReturn = useCallback(async () => {
        await controls.start({
            x: 20,
            y: 20,
            opacity: 0.8,
            scale: 0.5,
            transition: { duration: 2, ease: "anticipate" }
        });
    }, [controls]);

    const startScan = useCallback(async () => {
        if (!dimensions.width) return;
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;

        await controls.start({
            x: [centerX - 100, centerX + 100, centerX + 100, centerX - 100, centerX - 100],
            y: [centerY - 100, centerY - 100, centerY + 100, centerY + 100, centerY - 100],
            rotate: [0, 90, 180, 270, 360],
            opacity: 1,
            transition: { duration: 5, repeat: Infinity, ease: "linear" }
        });
    }, [dimensions, controls]);

    useEffect(() => {
        if (dimensions.width === 0) return;

        if (mode === "patrol") startPatrol();
        else if (mode === "return") startReturn();
        else if (mode === "scan") startScan();
        else if (mode === "stealth") {
            controls.start({ opacity: 0, transition: { duration: 1 } });
        }
    }, [mode, dimensions, startPatrol, startReturn, startScan, controls]);

    if (dimensions.width === 0) return null;

    return (
        <motion.div
            className="fixed pointer-events-none z-[50] text-mine/50"
            initial={{
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
                opacity: 0
            }}
            animate={controls}
        >
            <div className="relative">
                <Plane className="w-8 h-8 md:w-12 md:h-12" />

                <motion.div
                    className="absolute inset-0 bg-mine/30 rounded-full"
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-mine/60 bg-black/40 px-1 border border-mine/20 whitespace-nowrap">
                    {id}
                </span>
            </div>
        </motion.div>
    );
};

export const DroneOverlay = () => {
    const [mode, setMode] = useState<UAVMode>("patrol");

    useEffect(() => {
        const handleCommand = (e: any) => {
            if (e.detail?.mode) setMode(e.detail.mode);
        };
        window.addEventListener("UAV_COMMAND", handleCommand);
        return () => window.removeEventListener("UAV_COMMAND", handleCommand);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[50]">
            <Drone id="UAV_ALPHA" delay={0} mode={mode} />
            <Drone id="UAV_BRAVO" delay={5} mode={mode} />
            <Drone id="UAV_CHARLIE" delay={10} mode={mode} />
        </div>
    );
};

export const triggerUAVCommand = (mode: UAVMode) => {
    window.dispatchEvent(new CustomEvent("UAV_COMMAND", { detail: { mode } }));
};
