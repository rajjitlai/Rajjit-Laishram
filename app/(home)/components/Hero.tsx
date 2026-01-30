"use client"

import Tooltip from '@/components/ToolTip'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SiHey, SiArduino, SiRaspberrypi, SiPython, SiReact, SiNextdotjs, SiTypescript, SiCplusplus } from 'react-icons/si'
import { FaEnvelope, FaFileDownload } from 'react-icons/fa'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { motion } from 'framer-motion'
import { getResume } from '@/lib/getResume'

const Hero = () => {
    const handleDownload = () => {
        const url = getResume();
        window.open(url, "_blank");
    };

    const floatingIcons = [
        { Icon: SiArduino, color: "text-[#00979D]", initialX: -160, initialY: -100, delay: 0 },
        { Icon: SiRaspberrypi, color: "text-[#C51A4A]", initialX: 160, initialY: -80, delay: 0.5 },
        { Icon: SiPython, color: "text-[#3776AB]", initialX: -140, initialY: 80, delay: 1 },
        { Icon: SiReact, color: "text-[#61DAFB]", initialX: 180, initialY: 100, delay: 1.5 },
        { Icon: SiNextdotjs, color: "text-white", initialX: 0, initialY: -160, delay: 2 },
        { Icon: SiTypescript, color: "text-[#3178C6]", initialX: -180, initialY: 0, delay: 2.5 },
        { Icon: SiCplusplus, color: "text-[#00599C]", initialX: 150, initialY: 20, delay: 3 },
    ];

    return (
        <div className='mt-10 md:mt-20 min-h-[70vh] flex flex-col-reverse gap-14 lg:gap-0 lg:flex-row items-center justify-between animate-move-up'>
            <div className='flex-1 space-y-8 text-left lg:pr-10'>
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className='flex items-center gap-3 text-mine font-mono text-sm tracking-[0.2em] uppercase'
                    >
                        <span className="h-px w-8 bg-mine"></span>
                        IoT & Autonomous Systems
                        <Tooltip text="ꯍꯦꯜꯂꯣ" autoShow>
                            <SiHey className='animate-wave cursor-pointer text-xl text-mine' />
                        </Tooltip>
                    </motion.div>
                    <h1 className='text-4xl lg:text-6xl font-black font-outfit leading-tight'>
                        {"I'm Rajjit, and I build machines that "}
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-mine to-hers contrast-125'>think.</span>
                    </h1>
                </div>

                <p className='max-w-xl text-lg text-zinc-400 font-outfit leading-relaxed'>
                    {"An IoT Developer based in Manipur, I specialize in bridging the gap between hardware and software through sophisticated autonomous systems."}
                </p>

                <div className="flex flex-col sm:flex-row gap-5 items-center">
                    <MagneticButton className='w-full sm:w-auto'>
                        <Link href="#contact" className='w-full sm:w-auto block'>
                            <HoverBorderGradient
                                containerClassName="w-full sm:w-auto"
                                as="button"
                                className="dark:bg-white bg-black dark:text-black text-white flex items-center justify-center space-x-2 w-full py-4 px-8 font-bold"
                            >
                                <span className='font-outfit flex items-center gap-2'>Work with me <FaEnvelope /></span>
                            </HoverBorderGradient>
                        </Link>
                    </MagneticButton>
                    <button
                        onClick={handleDownload}
                        className='font-outfit flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group px-4 py-2'
                    >
                        <FaFileDownload className="group-hover:-translate-y-1 transition-transform" />
                        Get Resume
                    </button>
                </div>
            </div>

            <div className='mt-24 lg:mt-1 mx-auto font-meitei flex flex-col justify-center items-center gap-4 relative'>
                <Tooltip text="ꯔꯖ꯭ꯖꯤꯠ ꯂꯥꯏꯁ꯭ꯔꯝ">
                    <div className="w-auto h-72 space-y-3 rotate-[20deg] relative flex justify-center items-center mx-auto cursor-pointer">
                        {/* Floating Icons centered behind the profile image */}
                        <div className="absolute inset-0 flex justify-center items-center pointer-events-none -z-10">
                            {floatingIcons.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`absolute ${item.color} text-4xl md:text-5xl opacity-40`}
                                    initial={{ x: item.initialX, y: item.initialY, scale: 0.8 }}
                                    animate={{
                                        x: [item.initialX, item.initialX + 15, item.initialX - 15, item.initialX],
                                        y: [item.initialY - 20, item.initialY + 20, item.initialY - 20],
                                        scale: [0.8, 1.1, 0.8],
                                        opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{
                                        duration: 4 + Math.random() * 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: item.delay
                                    }}
                                >
                                    <item.Icon className="drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] -rotate-[20deg]" />
                                </motion.div>
                            ))}
                        </div>

                        <div className="relative w-64 h-60 flex justify-center items-center bg-gradient-to-t from-mine to-hers">
                            <div className="absolute w-[98%] h-[98%] transform bg-black"></div>
                            <div className="absolute z-30 -top-[70px] animate-float">
                                <Image src="/rajjitlaishram.png" alt="rajjit laishram" width="260" height="80" className='transform -rotate-[20deg]' priority unoptimized />
                            </div>
                            <div className='glow absolute top-[40%] right-1/2 z-10'></div>
                        </div>
                    </div>
                    <div className='w-full h-3 bg-hers z-50'></div>
                    <div className='w-full h-3 bg-mine translate-x-2 transition-all cursor-pointer z-50'></div>
                </Tooltip>
            </div>
        </div >
    )
}

export default Hero;