"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BOOT_SEQUENCE = [
    "RJ-SYSTEM_OS [Version 2.0.10]",
    "(C) 2026 RAJJIT LAISHRAM. ALL RIGHTS RESERVED.",
    "--------------------------------------------------",
    "BIOS DATE: 01/30/26 // MEMORY TEST: 65536KB OK",
    "LOADING_KERNEL... [DONE]",
    "INITIALIZING_NETWORK_PROTOCOL... [DONE]",
    "ESTABLISHING_IOT_HANDSHAKE... [DONE]",
    "FETCHING_TECHNICAL_ARSENAL... [DONE]",
    "--------------------------------------------------",
    "SYSTEM_STATUS: NOMINAL",
    "ACCESS_GRANTED. INITIALIZING_INTERFACE..."
];

export const Loader = ({ onFinished }: { onFinished: () => void }) => {
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        let currentLine = 0;
        const interval = setInterval(() => {
            if (currentLine < BOOT_SEQUENCE.length) {
                const nextLine = BOOT_SEQUENCE[currentLine];
                if (nextLine) {
                    setLines(prev => [...prev, nextLine]);
                }
                currentLine++;
            } else {
                clearInterval(interval);
                const timer = setTimeout(onFinished, 500);
                return () => clearTimeout(timer);
            }
        }, 120);

        return () => clearInterval(interval);
    }, [onFinished]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center p-8 font-mono"
        >
            <div className="w-full max-w-lg space-y-2">
                {lines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-xs md:text-sm tracking-wider ${line && (line.includes("DONE") || line.includes("GRANTED"))
                            ? "text-mine"
                            : "text-zinc-500"
                            }`}
                    >
                        <span className="mr-4 text-zinc-700">[{i.toString().padStart(2, '0')}]</span>
                        {line}
                    </motion.div>
                ))}
                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-mine inline-block ml-2"
                />
            </div>

            {/* Subliminal Scanline for Loader */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        </motion.div>
    );
};
