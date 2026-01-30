"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const StatItem = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

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
        <div ref={ref} className="flex flex-col items-center justify-center p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-sm group hover:border-mine/50 transition-colors">
            <h4 className="text-4xl md:text-5xl font-bold text-white mb-2 font-outfit">
                {count}{suffix}
            </h4>
            <p className="text-zinc-500 text-sm uppercase tracking-widest font-medium group-hover:text-mine transition-colors">
                {label}
            </p>
        </div>
    )
}

export const Stats = () => {
    return (
        <div className="max-w-7xl mx-auto px-8 py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatItem value={200} label="Drone Flights" suffix="+" />
                <StatItem value={10} label="IoT Projects" suffix="+" />
                <StatItem value={5} label="Years Experience" suffix="+" />
                <StatItem value={2} label="Team Lead" suffix="+" />
            </div>
        </div>
    )
}
