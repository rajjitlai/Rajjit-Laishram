"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BOOT_SEQUENCE = [
    "RAJ_OS_BIOS [VER_2.6.4]",
    "HARDWARE_CHECK: QUANTUM_PROCESSOR_L6 OK",
    "HARDWARE_CHECK: MEMORY_BANK_0_F OK",
    "--------------------------------------------------",
    "LOADING_KERNEL_SUBSYSTEMS...",
    "INIT: VIRTUAL_FILE_SYSTEM [ROOT]",
    "INIT: NEURAL_ENGINE_CORE [ACTIVE]",
    "INIT: HUD_OVERLAY_DRIVERS [LOADED]",
    "INIT: AUDIO_HAPTIC_ENGINE [SYNCED]",
    "--------------------------------------------------",
    "SCANNING_DEVICES...",
    "DEVICE_DETECTION: ESP32_IO_HUB [CONNECTED]",
    "DEVICE_DETECTION: DRONE_UHF_LINK [READY]",
    "--------------------------------------------------",
    "SECURITY_PROTOCOL: CIPHER_VALID_B22",
    "STATUS: ALL_SYSTEMS_NOMINAL",
    "AUTHENTICATED: RAJJIT_LAISHRAM",
    "UPLINK_COMPLETE. DEPLOYING_INTERFACE..."
];

export const Loader = ({ onFinished }: { onFinished: () => void }) => {
    const [lines, setLines] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentLine = 0;
        const lineInterval = setInterval(() => {
            if (currentLine < BOOT_SEQUENCE.length) {
                setLines(prev => [...prev, BOOT_SEQUENCE[currentLine] || ""]);
                currentLine++;
            } else {
                clearInterval(lineInterval);
            }
        }, 80);

        // Progress bar sync
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(onFinished, 600);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);

        return () => {
            clearInterval(lineInterval);
            clearInterval(progressInterval);
        };
    }, [onFinished]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center p-6 md:p-8 font-mono overflow-hidden"
        >
            <div className="w-full max-w-lg space-y-1.5 md:space-y-2 mb-12">
                {lines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-[9px] md:text-xs tracking-[0.1em] ${line && (line.includes("COMPLETE") || line.includes("OK") || line.includes("READY") || line.includes("AUTHENTICATED") || line.includes("ACTIVE"))
                            ? "text-mine font-black"
                            : "text-zinc-600 font-medium"
                            }`}
                    >
                        <span className="mr-3 opacity-30">[{i.toString().padStart(2, '0')}]</span>
                        {line}
                    </motion.div>
                ))}

                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    className="w-1.5 h-3 bg-mine inline-block relative top-0.5"
                />
            </div>

            {/* Progress Visualization */}
            <div className="w-full max-w-xs space-y-3">
                <div className="flex justify-between items-end">
                    <span className="text-zinc-700 text-[8px] tracking-[0.3em]">STORAGE_INDEXING</span>
                    <span className="text-mine font-black text-[10px]">{progress}%</span>
                </div>
                <div className="w-full h-[3px] bg-zinc-900 relative">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-mine shadow-[0_0_15px_#38ff42]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between text-[7px] text-zinc-800 tracking-tighter">
                    <span>BOOT_PRIORITY_H</span>
                    <span>KERNEL_LOAD_OPTIMIZED</span>
                </div>
            </div>

            {/* Global HUD Framing for Loader */}
            <div className="absolute inset-10 border border-white/5 pointer-events-none opacity-20" />
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-mine/20" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-hers/20" />

            <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        </motion.div>
    );
};
