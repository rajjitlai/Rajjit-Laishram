"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LuLock, LuShieldAlert } from 'react-icons/lu'

export function ConfidentialMedia() {
    const [activeTab, setActiveTab] = useState<'images' | 'feed'>('images');

    return (
        <div className="border border-zinc-800/80 rounded-2xl overflow-hidden bg-zinc-950/40 relative z-10 text-xs font-mono">
            {/* Tab Headers */}
            <div className="flex border-b border-zinc-800 bg-zinc-950/60 p-1">
                <button
                    onClick={() => setActiveTab('images')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                        activeTab === 'images'
                            ? 'bg-zinc-900 text-hers shadow-[0_0_15px_rgba(236,72,153,0.15)] border border-hers/20'
                            : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    [ IMAGES ]
                </button>
                <button
                    onClick={() => setActiveTab('feed')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                        activeTab === 'feed'
                            ? 'bg-zinc-900 text-hers shadow-[0_0_15px_rgba(236,72,153,0.15)] border border-hers/20'
                            : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    [ LIVE_FEED ]
                </button>
            </div>

            {/* Content Area */}
            <div className="p-3">
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-900 select-none group">
                    {/* Glowing colored blobs in the background */}
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-hers/25 filter blur-2xl pointer-events-none"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-blue-500/15 filter blur-3xl pointer-events-none"></div>

                    {/* Highly detailed translucent mock dashboard */}
                    <div className="absolute inset-0 opacity-70 transition-all duration-500 group-hover:opacity-40 pointer-events-none p-4 flex flex-col justify-between">
                        {/* Header bar */}
                        <div className="flex justify-between items-center border-b border-zinc-800/80 pb-2">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-hers animate-pulse"></span>
                                <span className="text-[10px] text-zinc-300 font-bold tracking-wider">WAREHOUSE_SEC_04</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[8px] text-zinc-400 font-bold">868.1 MHz</span>
                                <span className="px-2 py-0.5 bg-zinc-900/50 border border-zinc-850 rounded text-[8px] text-emerald-400 font-bold">NODE_OK</span>
                            </div>
                        </div>

                        {/* Mid Section: Gauges, Graphs and Maps */}
                        <div className="grid grid-cols-3 gap-3 my-2 flex-1 items-stretch">
                            {/* SVG Graph 1 */}
                            <div className="bg-zinc-900/40 border border-zinc-850 rounded-lg p-2 flex flex-col justify-between">
                                <div className="flex justify-between items-center text-[7px] text-zinc-400">
                                    <span>HUMIDITY INDEX</span>
                                    <span className="text-hers font-bold">64.2%</span>
                                </div>
                                <div className="h-10 w-full flex items-end">
                                    <svg className="w-full h-full text-hers/30" viewBox="0 0 100 30" preserveAspectRatio="none">
                                        <path d="M0,30 L10,25 L20,28 L30,15 L40,22 L50,10 L60,18 L70,8 L80,14 L90,5 L100,12 L100,30 Z" fill="currentColor" />
                                        <path d="M0,30 L10,25 L20,28 L30,15 L40,22 L50,10 L60,18 L70,8 L80,14 L90,5 L100,12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </div>
                            </div>

                            {/* Circular gauge */}
                            <div className="bg-zinc-900/40 border border-zinc-850 rounded-lg p-2 flex flex-col items-center justify-center relative">
                                <svg className="w-10 h-10 transform -rotate-90 text-zinc-800" viewBox="0 0 36 36">
                                    <path className="stroke-current" strokeWidth="2.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path className="stroke-hers/50" strokeWidth="2.5" strokeDasharray="72, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                <div className="absolute text-[8px] text-zinc-300 font-black">24.5°</div>
                                <span className="text-[7px] text-zinc-400 mt-1 font-bold">TEMP SYS</span>
                            </div>

                            {/* Tech Coordinates list */}
                            <div className="bg-zinc-900/40 border border-zinc-850 rounded-lg p-2 flex flex-col justify-between text-[7px] text-zinc-400 leading-normal font-bold">
                                <div className="flex justify-between"><span>RSSI:</span> <span className="text-zinc-300">-108 dBm</span></div>
                                <div className="flex justify-between"><span>SNR:</span> <span className="text-zinc-300">+6.5 dB</span></div>
                                <div className="flex justify-between"><span>GW:</span> <span className="text-hers">L-GW01</span></div>
                                <div className="flex justify-between"><span>SF:</span> <span className="text-zinc-300">SF7 / BW125</span></div>
                            </div>
                        </div>

                        {/* Footer terminal timeline */}
                        <div className="h-8 bg-zinc-900/40 border border-zinc-850 rounded-lg flex items-center justify-between px-2 text-[8px] text-zinc-400 font-bold">
                            <span>ADDR: 26:0B:4F:A1</span>
                            <span className="text-blue-400">TX_POWER: +14dBm</span>
                            <span className="text-hers animate-pulse">HOP_ON</span>
                        </div>
                    </div>

                    {/* Translucent Cyberpunk Scanline */}
                    <div className="absolute inset-x-0 h-[2px] bg-hers/30 shadow-[0_0_10px_rgba(236,72,153,0.4)] top-0 animate-[scan_3s_infinite_linear] pointer-events-none z-10"></div>

                    {/* Main Confidential Overlay - highly transparent and thin blur */}
                    <div className="absolute inset-0 bg-zinc-950/45 backdrop-blur-[1.5px] flex flex-col items-center justify-center p-6 text-center transition-all duration-500 group-hover:bg-zinc-950/65 group-hover:backdrop-blur-[3px]">
                        {/* Lock / Security Icon Container */}
                        <motion.div 
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="w-12 h-12 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-hers mb-3 shadow-[0_0_15px_rgba(236,72,153,0.15)] group-hover:text-red-400 group-hover:border-red-500/30 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.25)] transition-all duration-300"
                        >
                            <LuLock className="w-5 h-5 group-hover:hidden" />
                            <LuShieldAlert className="w-5 h-5 hidden group-hover:block animate-pulse" />
                        </motion.div>

                        <span className="text-[10px] tracking-[0.3em] font-black text-hers uppercase mb-1.5 transition-colors duration-300 group-hover:text-red-400">
                            SYSTEM CLASSIFIED
                        </span>
                        
                        <h5 className="text-sm font-black text-white tracking-wider mb-2 font-mono">
                            CONFIDENTIAL INFRASTRUCTURE
                        </h5>
                        
                        <p className="text-zinc-300 text-[10px] max-w-[260px] leading-relaxed transition-colors duration-300 group-hover:text-zinc-500">
                            Telemetry & dashboard visualizations restricted under Non-Disclosure Agreement (NDA).
                        </p>
                    </div>

                    {/* Interactive Hover Status Bar */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-zinc-900/95 border border-zinc-800 px-3 py-1 rounded-full text-[9px] text-zinc-400 font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                        SECURE LOG // STATUS: ACCESS_DENIED
                    </div>
                </div>
            </div>

            {/* Custom Scanline CSS */}
            <style jsx global>{`
                @keyframes scan {
                    0% { top: 0%; }
                    50% { top: 100%; }
                    100% { top: 0%; }
                }
            `}</style>
        </div>
    )
}
