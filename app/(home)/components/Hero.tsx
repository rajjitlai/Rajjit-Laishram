"use client"

import Tooltip from '@/components/ToolTip'
import { DecryptedText } from '@/components/ui/DecryptedText'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SiHey, SiArduino, SiRaspberrypi, SiPython, SiReact, SiNextdotjs, SiTypescript, SiCplusplus } from 'react-icons/si'
import { FaEnvelope, FaFileDownload } from 'react-icons/fa'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { motion } from 'framer-motion'
import { getResume } from '@/lib/getResume'

const Hero = React.memo(function Hero() {
    const [hasMounted, setHasMounted] = React.useState(false);

    React.useEffect(() => {
        setHasMounted(true);
    }, []);

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
        <div className='mt-10 md:mt-20 min-h-[70vh] flex flex-col-reverse gap-10 lg:gap-0 lg:flex-row items-center justify-between animate-move-up'>
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
                        <DecryptedText text="I'm Rajjit" />
                        {", and I build machines that "}
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-mine to-hers contrast-125'>think.</span>
                    </h1>
                </div>

                <p className='max-w-xl text-lg text-zinc-400 font-outfit leading-relaxed'>
                    {"An IoT Developer based in Manipur, I specialize in bridging the gap between hardware and software through sophisticated autonomous systems."}
                </p>

                <div className="flex flex-col sm:flex-row gap-5 items-center w-full">
                    <MagneticButton className='w-full sm:w-auto'>
                        <Link href="#contact" className='w-full sm:w-auto block'>
                            <HoverBorderGradient
                                containerClassName="w-full sm:w-auto"
                                as="div"
                                className="dark:bg-white bg-black dark:text-black text-white flex items-center justify-center space-x-2 w-full py-4 px-8 font-bold"
                            >
                                <span className='font-outfit flex items-center gap-2 text-sm md:text-base'>Work with me <FaEnvelope /></span>
                            </HoverBorderGradient>
                        </Link>
                    </MagneticButton>
                    <button
                        onClick={handleDownload}
                        suppressHydrationWarning
                        className='font-outfit flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group px-4 py-2 text-sm md:text-base'
                    >
                        <FaFileDownload className="group-hover:-translate-y-1 transition-transform" />
                        Get Resume
                    </button>
                </div>
            </div>

            <div className='mt-12 lg:mt-1 mx-auto font-meitei flex flex-col justify-center items-center gap-4 relative scale-90 md:scale-100'>
                <Tooltip text="ꯔꯖ꯭ꯖꯤꯠ ꯂꯥꯏꯁ꯭ꯔꯝ">
                    <div className="w-auto h-64 md:h-72 relative flex justify-center items-center mx-auto cursor-pointer group">
                        {/* HUD Brackets */}
                        <div className="absolute -inset-4 pointer-events-none">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-mine/50 rounded-tl-lg group-hover:border-mine transition-colors duration-500" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-hers/50 rounded-tr-lg group-hover:border-hers transition-colors duration-500" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-hers/50 rounded-bl-lg group-hover:border-hers transition-colors duration-500" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-mine/50 rounded-br-lg group-hover:border-mine transition-colors duration-500" />
                        </div>

                        {/* Floating Icons Background */}
                        <div className="absolute inset-0 flex justify-center items-center pointer-events-none -z-10">
                            {floatingIcons.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`absolute ${item.color} text-3xl md:text-5xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000 will-change-transform transform-gpu`}
                                    initial={{ x: item.initialX, y: item.initialY, scale: 0.8 }}
                                    animate={{
                                        x: [item.initialX, item.initialX + 15, item.initialX - 15, item.initialX],
                                        y: [item.initialY - 20, item.initialY + 20, item.initialY - 20],
                                        scale: [0.8, 1.1, 0.8],
                                    }}
                                    style={{
                                        // Reduce orbit on mobile - Adjusted for hydration
                                        x: (hasMounted && window.innerWidth < 768) ? item.initialX * 0.6 : item.initialX,
                                        y: (hasMounted && window.innerWidth < 768) ? item.initialY * 0.6 : item.initialY,
                                    }}
                                    transition={{
                                        duration: hasMounted ? 4 + Math.random() * 2 : 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: item.delay
                                    }}
                                >
                                    <item.Icon className="drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                                </motion.div>
                            ))}
                        </div>

                        <div className="relative w-64 h-64 md:w-72 md:h-72 flex justify-center items-center p-2">
                            {/* Inner Circuit Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-mine/20 via-transparent to-hers/20 rounded-3xl animate-pulse" />
                            <div className="absolute inset-[2px] bg-black rounded-[22px] overflow-hidden">
                                {/* Scanline Effect - Optimized */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-[0.05] will-change-transform transform-gpu"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 2h4M2 0v4' stroke='%23fff' fill='none' fill-opacity='.1'/%3E%3C/svg%3E")`
                                    }}
                                />
                            </div>

                            {/* GPU Optimized Glow */}
                            <div className="absolute inset-4 bg-mine/20 blur-[40px] rounded-full animate-pulse will-change-transform" />

                            <motion.div
                                className="relative z-30 transform hover:scale-110 transition-transform duration-500 will-change-transform"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Image src="/rajjitlaishram.png" alt="rajjit laishram" width="280" height="280" className='object-contain' priority />
                            </motion.div>
                        </div>
                    </div>
                    {/* Progress bars transformed into tech stripes */}
                    <div className="flex flex-col gap-1 w-full max-w-[150px] md:max-w-[200px] mt-8 group-hover:scale-110 transition-transform will-change-transform">
                        <div className='w-full h-1 bg-gradient-to-r from-hers/50 via-hers to-hers/50 rounded-full shadow-[0_0_10px_rgba(0,253,190,0.5)]'></div>
                        <div className='w-3/4 h-1 bg-gradient-to-r from-mine/50 via-mine to-mine/50 rounded-full shadow-[0_0_10px_rgba(56,255,66,0.5)] translate-x-4'></div>
                    </div>
                </Tooltip>
            </div>
        </div>
    )
});

export default Hero;
