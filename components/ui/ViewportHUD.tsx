"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ViewportHUD = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [scrollPos, setScrollPos] = useState(0);
    const [currentTime, setCurrentTime] = useState("");
    const [ping, setPing] = useState(24);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollPos(Math.round(progress));
        };
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);
        const timeInterval = setInterval(updateTime, 1000);
        const pingInterval = setInterval(() => {
            setPing(Math.floor(Math.random() * (28 - 22 + 1)) + 22);
        }, 2000);

        updateTime();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            clearInterval(timeInterval);
            clearInterval(pingInterval);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[999] font-mono text-[10px] text-mine/40 uppercase tracking-widest hidden md:block">
            {/* Top Left: Protocol Status */}
            <div className="absolute top-8 left-8 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-mine animate-pulse" />
                    <span>System: Online</span>
                </div>
                <span>Protocol: RJ-2026-X</span>
            </div>

            {/* Top Right: Time & Coordinates */}
            <div className="absolute top-8 right-8 flex flex-col items-end gap-1 text-right">
                <span>{currentTime}</span>
                <span>X: {mousePos.x} {"//"} Y: {mousePos.y}</span>
            </div>

            {/* Bottom Left: Vertical Meitei Sidebar Decal */}
            <div className="absolute bottom-32 left-8 flex flex-col gap-4 py-8 border-l border-white/5">
                <span className="[writing-mode:vertical-rl] text-hers/30 text-xs">ꯔꯖ꯭ꯖꯤꯠ ꯂꯥꯏꯁ꯭ꯔꯝ</span>
                <span className="[writing-mode:vertical-rl] text-mine/30 text-xs">ꯏꯟꯇꯔꯐꯦꯁ</span>
            </div>

            {/* Bottom Right: Scroll Progress & System Stats */}
            <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1 text-right">
                <div className="flex items-center gap-2">
                    <div className="w-24 h-[1px] bg-zinc-800 relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-mine"
                            style={{ width: `${scrollPos}%` }}
                        />
                    </div>
                    <span>{scrollPos}%</span>
                </div>
                <span>CORE_STATUS: NOMINAL {"//"} PING: {ping}MS</span>
            </div>

            {/* Corner Brackets (Global) */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/10" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/10" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/10" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/10" />
        </div>
    );
};
