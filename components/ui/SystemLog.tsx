"use client";
import React, { useState, useEffect } from "react";

export const SystemLog = () => {
    const [events, setEvents] = useState<string[]>([]);

    useEffect(() => {
        const initialLogs = [
            "SYSTEM_READY :: KERNEL_LOADED",
            "UPLINK_ESTABLISHED :: PORT_8080",
            "SCANNING_ENVIRONMENT... OK"
        ];
        setEvents(initialLogs);

        const handleInteraction = (e: MouseEvent | Event) => {
            const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            let msg = "";

            if (e instanceof MouseEvent && e.type === "click") {
                msg = `EVENT: INTERACTION_CLICK AT [${e.clientX}, ${e.clientY}]`;
            } else if (e.type === "scroll") {
                const scrollPos = window.scrollY;
                msg = `EVENT: VIEWPORT_OFFSET_MODIFIED [${scrollPos}px]`;
            }

            if (msg) {
                setEvents(prev => [...prev.slice(-4), `[${time}] ${msg}`]);
            }
        };

        window.addEventListener("click", handleInteraction);
        window.addEventListener("scroll", handleInteraction);

        return () => {
            window.removeEventListener("click", handleInteraction);
            window.removeEventListener("scroll", handleInteraction);
        };
    }, []);

    return (
        <div className="hidden md:flex w-full bg-black/80 border-t border-white/5 py-1 px-4 items-center gap-6 overflow-hidden select-none pointer-events-none">
            <div className="flex items-center gap-2 whitespace-nowrap">
                <div className="w-1.5 h-1.5 rounded-full bg-mine animate-pulse" />
                <span className="text-[9px] font-mono text-mine/60 uppercase tracking-widest font-bold">Live_Activity_Log:</span>
            </div>

            <div className="flex gap-8 whitespace-nowrap animate-marquee">
                {events.map((log, i) => (
                    <span key={i} className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider">
                        {log}
                    </span>
                ))}
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(10%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </div>
    );
};
