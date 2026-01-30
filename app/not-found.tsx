"use client";

import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { motion } from "motion/react";
import { WifiOff, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4 flex flex-col items-center relative z-10 text-center">

                {/* Glitchy 404 Text */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="relative"
                >
                    <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600 relative z-20">
                        404
                    </h1>
                    <div className="absolute inset-0 text-9xl font-bold text-mine blur-[2px] opacity-30 animate-pulse">
                        404
                    </div>
                </motion.div>

                {/* Icon Animation */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="my-8 relative"
                >
                    <div className="absolute inset-0 bg-mine/20 blur-xl rounded-full" />
                    <WifiOff size={64} className="text-mine relative z-10 animate-pulse" />
                </motion.div>

                {/* Message */}
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400 mb-4"
                >
                    Signal Lost
                </motion.h2>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-neutral-500 max-w-lg mx-auto mb-10 text-lg"
                >
                    The frequency you are looking for seems to be offline or out of range.
                    Let&apos;s re-establish connection at the base.
                </motion.p>

                {/* Button */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <Link href="/">
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-8 py-3"
                        >
                            <Home className="w-5 h-5 text-mine" />
                            <span>Return to Base</span>
                        </HoverBorderGradient>
                    </Link>
                </motion.div>

            </div>

            <BackgroundBeams />
        </div>
    );
}
