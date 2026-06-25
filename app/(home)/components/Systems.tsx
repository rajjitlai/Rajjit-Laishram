"use client"
import React, { useState } from 'react'
import Title from '@/components/Title'
import { motion } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Link from 'next/link'
import { ImageCarousel } from './ImageCarousel'
import { VideoDemo } from './VideoDemo'
import { nawaImages } from '@/lib/systemworks'
import { ConfidentialMedia } from './ConfidentialMedia'

export function Systems() {
    const [activeTab, setActiveTab] = useState<'carousel' | 'video'>('carousel');

    return (
        <div className="py-20 p-5 sm:p-0 font-outfit mt-10" id="systems">
            <Title
                text="Systems & Field Work"
                className="flex flex-col items-center justify-center cursor-pointer mb-12"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {/* SYS_01 */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="relative bg-zinc-900/30 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-8 flex flex-col hover:border-mine/50 transition-all duration-500 overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-10 font-mono text-6xl font-black text-mine pointer-events-none transition-transform group-hover:scale-110">01</div>
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="w-12 h-px bg-mine/50"></div>
                        <h3 className='text-[10px] uppercase tracking-[0.5em] font-black text-mine'>SYS_01</h3>
                    </div>
                    <h4 className="text-2xl font-black text-white mb-2">AUTONOMOUS DRONE SYSTEM</h4>
                    <p className="text-zinc-500 text-sm font-mono mb-6">NIDAR Disaster Management Competition · NAWA · 2025</p>
                    
                    <p className="text-zinc-300 font-semibold mb-4">Complete autonomous drone software stack built from scratch.</p>
                    
                    <ul className="space-y-3 mb-6">
                        {[
                            "Custom Electron desktop GCS (React + Tailwind CSS)",
                            "YOLO + Hailo AI survivor detection (~80% accuracy)",
                            "Switchable RTSP/MJPEG video streaming at runtime",
                            "Multi-drone coordination — scout + delivery",
                            "MAVLink + DroneKit + multi-GPS cross-validation",
                            "215+ real-world flight tests · NIDAR Finalist"
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-zinc-400 text-sm">
                                <span className="text-mine mt-0.5">→</span >
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Media Tabs Section */}
                    <div className="mb-6 border border-zinc-800/80 rounded-2xl overflow-hidden bg-zinc-950/40 relative z-10">
                        {/* Tab Headers */}
                        <div className="flex border-b border-zinc-800 bg-zinc-950/60 p-1">
                            <button
                                onClick={() => setActiveTab('carousel')}
                                className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                                    activeTab === 'carousel'
                                        ? 'bg-zinc-900 text-mine shadow-[0_0_15px_rgba(56,255,66,0.15)] border border-mine/20'
                                        : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                [ IMAGES ]
                            </button>
                            <button
                                onClick={() => setActiveTab('video')}
                                className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                                    activeTab === 'video'
                                        ? 'bg-zinc-900 text-mine shadow-[0_0_15px_rgba(56,255,66,0.15)] border border-mine/20'
                                        : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                [ VIDEO_FEED ]
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="p-3">
                            {activeTab === 'carousel' ? (
                                <ImageCarousel images={nawaImages} />
                            ) : (
                                <VideoDemo />
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-auto relative z-10">
                        <Link href="https://instagram.com/nawa.drone.wing" target="_blank" className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50 hover:border-mine/50 hover:text-mine text-zinc-400 transition-colors text-sm font-mono">
                            <span>[ View Field Documentation ]</span>
                            <FaExternalLinkAlt className="w-3 h-3" />
                        </Link>
                        <Link href="https://nawagcs-sample.rjsblog.in/" target="_blank" className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50 hover:border-mine/50 hover:text-mine text-zinc-400 transition-colors text-sm font-mono">
                            <span>[ Launch Simulated GCS ]</span>
                            <FaExternalLinkAlt className="w-3 h-3" />
                        </Link>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50 text-zinc-600 text-sm font-mono cursor-not-allowed">
                            <span>[ Read Case Study - Coming Soon ]</span>
                        </div>
                    </div>
                </motion.div>

                {/* SYS_02 */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="relative bg-zinc-900/30 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-8 flex flex-col hover:border-hers/50 transition-all duration-500 overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-10 font-mono text-6xl font-black text-hers pointer-events-none transition-transform group-hover:scale-110">02</div>
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="w-12 h-px bg-hers/50"></div>
                        <h3 className='text-[10px] uppercase tracking-[0.5em] font-black text-hers'>SYS_02</h3>
                    </div>
                    <h4 className="text-2xl font-black text-white mb-2">IOT MONITORING INFRASTRUCTURE</h4>
                    <p className="text-zinc-500 text-sm font-mono mb-6">Nibiaa · 2025 – Present</p>
                    
                    <p className="text-zinc-300 font-semibold mb-4">Enterprise IoT platform with hybrid indoor/outdoor coverage.</p>
                    
                    <ul className="space-y-3 mb-6">
                        {[
                            "Hybrid LoRaWAN + Satellite asset tracking prototype",
                            "AI-powered geofencing and restricted zone alerting",
                            "Offline AI inference via Ollama + MCP — zero cloud dependency",
                            "Client-facing mobile application for device monitoring",
                            "Peer-to-peer mesh communication layer",
                            "Demo delivered to enterprise equipment rental client"
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-zinc-400 text-sm">
                                <span className="text-hers mt-0.5">→</span >
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Media Tabs Section (Confidential Overlay) */}
                    <div className="mb-6">
                        <ConfidentialMedia />
                    </div>

                    <div className="flex flex-col gap-3 mt-auto relative z-10">
                        <Link href="https://nibiaa.com" target="_blank" className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50 hover:border-hers/50 hover:text-hers text-zinc-400 transition-colors text-sm font-mono">
                            <span>[ View Company ]</span>
                            <FaExternalLinkAlt className="w-3 h-3" />
                        </Link>
                        <Link href="https://iot-dashboards.rjsblog.in/" target="_blank" className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50 hover:border-hers/50 hover:text-hers text-zinc-400 transition-colors text-sm font-mono">
                            <span>[ Launch Simulated Monitoring System ]</span>
                            <FaExternalLinkAlt className="w-3 h-3" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
