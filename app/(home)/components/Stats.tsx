"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Title from "@/components/Title";

const StatItem = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
    const [count, setCount] = useState(0)
    const [hasMounted, setHasMounted] = useState(false)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (isInView) {
            let start = 0
            const end = value
            const duration = 2000
            const increment = end / (duration / 16)

            const timer = setInterval(() => {
                start += increment
                if (start >= end) {
                    setCount(end)
                    clearInterval(timer)
                } else {
                    setCount(Math.floor(start))
                }
            }, 16)
            return () => clearInterval(timer)
        }
    }, [isInView, value])

    return (
        <motion.div
            ref={ref}
            whileHover={{ y: -10, scale: 1.02 }}
            className="relative group flex flex-col items-center justify-center p-8 bg-zinc-900/30 border border-zinc-800/50 rounded-[2rem] backdrop-blur-xl transition-all duration-500 hover:border-mine/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden"
        >
            {/* Animated Background Highlight */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mine/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-mine/5 blur-3xl rounded-full group-hover:bg-mine/10 transition-colors" />

            <h4 className="text-5xl md:text-6xl font-black text-white mb-3 font-outfit tracking-tighter transition-transform duration-500 group-hover:scale-110">
                {hasMounted ? count : value}{suffix}
            </h4>
            <div className="h-px w-8 bg-zinc-800 mb-4 group-hover:w-16 group-hover:bg-mine/50 transition-all duration-500" />
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-black group-hover:text-white transition-colors">
                {label}
            </p>
        </motion.div>
    )
}

export const Stats = () => {
    return (
        <div className="max-w-7xl mx-auto px-8 py-20 font-outfit" id="stats">
            <Title text="Metrics" className="flex flex-col items-center justify-center cursor-pointer mb-20" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                <StatItem value={200} label="Autonomous Drone Flights" suffix="+" />
                <StatItem value={10} label="IoT Projects" suffix="+" />
                <StatItem value={5} label="Years Experience" suffix="+" />
                <StatItem value={2} label="Team Lead" suffix="+" />
            </div>
        </div>
    )
}
