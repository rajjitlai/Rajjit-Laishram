"use client";
import React, { useEffect, useState } from "react";


import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { SECTIONS } from "@/lib/constants";

import { Terminal as TerminalIcon, Volume2, VolumeX, Plane } from "lucide-react";
import { audioSystem } from "@/lib/audio";

export const ViewportHUD = React.memo(function ViewportHUD() {
    const activeSection = useActiveSection();
    const [currentTime, setCurrentTime] = useState("");
    const [ping, setPing] = useState(24);
    const [telemetry, setTelemetry] = useState({ pwr: 98, cpu: 12, mem: 45 });
    const [isMuted, setIsMuted] = useState(true);
    const [uavMode, setUavMode] = useState("PATROL");

    // Optimization: Use refs for high-frequency DOM updates to skip React re-renders
    const posXRef = React.useRef<HTMLSpanElement>(null);
    const posYRef = React.useRef<HTMLSpanElement>(null);
    const scrollBarRef = React.useRef<HTMLDivElement>(null);
    const scrollTextRef = React.useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const handleCommand = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            if (detail?.mode) setUavMode(detail.mode.toUpperCase());
        };
        window.addEventListener("UAV_COMMAND", handleCommand);
        return () => window.removeEventListener("UAV_COMMAND", handleCommand);
    }, []);

    const toggleTerminal = () => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '`' }));
    };

    const toggleMute = () => {
        const newState = !isMuted;
        setIsMuted(newState);
        audioSystem.setMute(newState);
        if (!newState) audioSystem.playClick();
    };

    useEffect(() => {
        let rafMouseMove: number;
        let rafScroll: number;

        const handleMouseMove = (e: MouseEvent) => {
            cancelAnimationFrame(rafMouseMove);
            rafMouseMove = requestAnimationFrame(() => {
                if (posXRef.current) posXRef.current.textContent = e.clientX.toString().padStart(4, '0');
                if (posYRef.current) posYRef.current.textContent = e.clientY.toString().padStart(4, '0');
            });
        };

        const handleScroll = () => {
            cancelAnimationFrame(rafScroll);
            rafScroll = requestAnimationFrame(() => {
                const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (window.scrollY / totalHeight) * 100;
                const roundedProgress = Math.round(progress);

                if (scrollBarRef.current) scrollBarRef.current.style.width = `${progress}%`;
                if (scrollTextRef.current) scrollTextRef.current.textContent = `${roundedProgress}%`;
            });
        };

        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [role="button"], .cursor-pointer')) {
                audioSystem.playDataScan();
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mouseover", handleMouseOver);

        const timeInterval = setInterval(updateTime, 1000);
        const pingInterval = setInterval(() => {
            setPing(Math.floor(Math.random() * (28 - 22 + 1)) + 22);
            setTelemetry({
                pwr: Math.floor(Math.random() * (99 - 95 + 1)) + 95,
                cpu: Math.floor(Math.random() * (18 - 8 + 1)) + 8,
                mem: Math.floor(Math.random() * (48 - 42 + 1)) + 42,
            });
        }, 2000);

        updateTime();
        // Initial call for scroll position
        handleScroll();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mouseover", handleMouseOver);
            clearInterval(timeInterval);
            clearInterval(pingInterval);
        };
    }, []);

    const activeProtocol = SECTIONS.find(s => s.id === activeSection)?.protocol || "SYSTEM_STANDBY";

    return (
        <div className="fixed inset-0 pointer-events-none z-[999] font-mono text-[10px] text-mine/40 uppercase tracking-widest will-change-transform">
            {/* Top Left: Protocol Status (Always Visible) */}
            <div className="absolute top-6 md:top-8 left-6 md:left-8 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-mine animate-pulse" />
                    <span className="text-white/60">System: Online</span>
                </div>
                {/* Protocol ID - Hidden on very small screens to avoid overlap */}
                <div className="hidden sm:flex flex-col gap-0.5 mt-1">
                    <span className="text-[8px] opacity-50">Current_Protocol:</span>
                    <span className="text-mine font-black">{activeProtocol}</span>
                </div>

                {/* Manual CLI Trigger (Always Visible) */}
                <button
                    onClick={toggleTerminal}
                    className="flex items-center gap-2 mt-4 px-3 py-1.5 bg-mine/10 border border-mine/20 rounded-md hover:bg-mine/20 transition-all pointer-events-auto group"
                >
                    <TerminalIcon size={12} className="text-mine group-hover:scale-110 transition-transform" />
                    <span className="text-[8px] font-black text-mine uppercase">CLI_ROOT</span>
                </button>

                <button
                    onClick={() => window.dispatchEvent(new CustomEvent("UAV_SIM_LAUNCH"))}
                    className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 transition-all pointer-events-auto group"
                >
                    <Plane size={12} className="text-white/40 group-hover:text-mine transition-colors" />
                    <span className="text-[8px] font-black text-white/40 group-hover:text-white uppercase transition-colors">DRONE_SIM</span>
                </button>
            </div>

            {/* Top Right: Time & Coordinates (Desktop Only) */}
            <div className="hidden md:flex absolute top-8 right-8 flex flex-col items-end gap-1 text-right">
                <span className="text-white/60">{currentTime}</span>
                <div className="flex gap-4 mt-2">
                    <div className="flex flex-col">
                        <span className="text-[7px] opacity-40">POS_X</span>
                        <span ref={posXRef} className="text-white/40">0000</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[7px] opacity-40">POS_Y</span>
                        <span ref={posYRef} className="text-white/40">0000</span>
                    </div>
                </div>
            </div>

            {/* Bottom Left: Sidebar & Audio (Always Visible) */}
            <div className="absolute bottom-24 md:bottom-32 left-6 md:left-8 flex flex-col gap-4 py-8 border-l border-white/5">
                <span className="[writing-mode:vertical-rl] text-hers/30 text-[10px] md:text-xs">ꯔꯖ꯭ꯖꯤꯠ ꯂꯥꯏꯁ꯭ꯔꯝ</span>
                <span className="hidden sm:block [writing-mode:vertical-rl] text-mine/30 text-xs font-black">INTERFACE_V2.6</span>

                {/* Audio Toggle (Essential) */}
                <button
                    onClick={toggleMute}
                    className="flex items-center justify-center w-8 h-8 md:w-6 md:h-6 mt-4 bg-mine/5 border border-mine/10 rounded-lg md:rounded hover:bg-mine/10 transition-all pointer-events-auto text-mine shadow-[0_0_15px_rgba(56,255,66,0.1)]"
                    title={isMuted ? "Unmute Audio" : "Mute Audio"}
                >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
            </div>

            {/* Bottom Right: Scroll & Stats (Desktop Only) */}
            <div className="hidden md:flex absolute bottom-8 right-8 flex flex-col items-end gap-1 text-right">
                <div className="flex gap-6 mb-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[7px] opacity-40">UAV_SYNC</span>
                        <span className="text-mine">{uavMode}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[7px] opacity-40">PWR</span>
                        <span className="text-mine">{telemetry.pwr}%</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[7px] opacity-40">CPU</span>
                        <span className="text-mine">{telemetry.cpu}%</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[7px] opacity-40">MEM</span>
                        <span className="text-mine">{telemetry.mem}%</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-32 h-[2px] bg-zinc-900 relative overflow-hidden">
                        <div
                            ref={scrollBarRef}
                            className="absolute inset-0 bg-mine/50"
                            style={{ width: `0%` }}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(56,255,66,0.5),transparent)] w-1/2 animate-shimmer" />
                    </div>
                    <span ref={scrollTextRef} className="text-white/60">0%</span>
                </div>
                <span className="text-[8px] mt-1">SIGNAL_STRENGTH: NOMINAL {"//"} PING: {ping}MS</span>
            </div>

            {/* Corner Brackets (Always Visible, scale down for mobile) */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/5 md:border-white/10" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/5 md:border-white/10" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/5 md:border-white/10" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/5 md:border-white/10" />
        </div>
    );
});

