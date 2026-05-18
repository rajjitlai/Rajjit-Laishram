"use client";
import React, { useEffect, useRef } from "react";

export const CustomCursor = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const labelRef = useRef<HTMLDivElement | null>(null);
    const isFirstMove = useRef(true);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Instantly write coordinates to compositor CSS Custom Variables
        const handleMouseMove = (e: MouseEvent) => {
            if (isFirstMove.current) {
                // Instantly snap cursor to first cursor coord to prevent entrance rubber-banding
                container.style.setProperty("--cursor-x", `${e.clientX}px`);
                container.style.setProperty("--cursor-y", `${e.clientY}px`);
                container.classList.remove("hidden-offscreen");
                isFirstMove.current = false;
            } else {
                container.style.setProperty("--cursor-x", `${e.clientX}px`);
                container.style.setProperty("--cursor-y", `${e.clientY}px`);
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest('a, button, [role="button"], .cursor-pointer');
            const technicalLabel = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');

            if (interactive) {
                container.classList.add("hovering");
                if (labelRef.current) {
                    labelRef.current.innerText = technicalLabel || "TARGET_LOCK";
                }
            } else {
                container.classList.remove("hovering");
            }
        };

        // Initialize state hidden offscreen until first movement
        container.classList.add("hidden-offscreen");

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-[99999] hidden md:block select-none transform-gpu"
        >
            {/* 1. Outer Ring - Smooth, 100% native compositor trailing layout */}
            <div
                className="absolute w-5 h-5 rounded-full border border-mine/50 flex items-center justify-center will-change-transform transform-gpu"
                style={{
                    transform: "translate3d(var(--cursor-x, -100px), var(--cursor-y, -100px), 0) translate(-50%, -50%)",
                    transition: "transform 0.08s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.2s ease, width 0.2s ease, height 0.2s ease, box-shadow 0.2s ease"
                }}
            >
                {/* 4 Micro Telemetry Ticks inside outer ring */}
                <div className="absolute top-0 w-0.5 h-0.5 bg-mine/30 rounded-full" />
                <div className="absolute bottom-0 w-0.5 h-0.5 bg-mine/30 rounded-full" />
                <div className="absolute left-0 w-0.5 h-0.5 bg-mine/30 rounded-full" />
                <div className="absolute right-0 w-0.5 h-0.5 bg-mine/30 rounded-full" />
            </div>

            {/* 2. Inner Dot - Snaps instantly (no CSS transition) for perfect zero-lag aim precision */}
            <div
                className="absolute w-1.5 h-1.5 bg-mine rounded-full shadow-[0_0_8px_#38ff42] will-change-transform transform-gpu"
                style={{
                    transform: "translate3d(var(--cursor-x, -100px), var(--cursor-y, -100px), 0) translate(-50%, -50%)",
                    transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease, opacity 0.2s ease"
                }}
            />

            {/* 3. Micro Label tag underneath outer ring */}
            <div
                ref={labelRef}
                className="absolute text-[7px] font-mono font-black tracking-[0.2em] text-hers bg-black/80 backdrop-blur-md border border-hers/20 px-1.5 py-0.5 rounded-sm opacity-0 scale-90 will-change-transform transform-gpu uppercase"
                style={{
                    transform: "translate3d(var(--cursor-x, -100px), var(--cursor-y, -100px), 0) translate(-50%, 15px)",
                    transition: "transform 0.08s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease, scale 0.2s ease, color 0.2s ease, border-color 0.2s ease"
                }}
            >
                TARGET_LOCK
            </div>

            {/* Premium HUD Toggles when hovering over interactive components */}
            <style jsx global>{`
                .hidden-offscreen {
                    display: none !important;
                }
                
                /* 1. Outer Ring Hover States */
                .hovering > div:nth-child(1) {
                    border-color: #00fdea !important;
                    width: 30px !important;
                    height: 30px !important;
                    box-shadow: 0 0 10px rgba(0, 253, 234, 0.25) !important;
                }
                
                /* Micro crosshair ticks change colors */
                .hovering > div:nth-child(1) > div {
                    background-color: rgba(0, 253, 234, 0.4) !important;
                }

                /* 2. Inner Dot Hover States */
                .hovering > div:nth-child(2) {
                    width: 0px !important;
                    height: 0px !important;
                    opacity: 0 !important;
                }

                /* 3. Dynamic Tag Hover States */
                .hovering > div:nth-child(3) {
                    opacity: 1 !important;
                    scale: 1 !important;
                    transform: translate3d(var(--cursor-x, -100px), var(--cursor-y, -100px), 0) translate(-50%, 20px) !important;
                }
            `}</style>
        </div>
    );
};
