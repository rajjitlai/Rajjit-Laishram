"use client"

import Title from '@/components/Title'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGitSquare, FaDocker, FaRaspberryPi } from 'react-icons/fa'
import {
    SiAppwrite, SiCplusplus, SiFastapi,
    SiNextdotjs, SiNodedotjs, SiOpencv, SiPostgresql,
    SiPytorch, SiTailwindcss, SiTensorflow, SiTypescript
} from 'react-icons/si'
import { TbBrandReactNative, TbBrain, TbCloudComputing, TbCpu, TbNetwork } from 'react-icons/tb'
import { BiChip } from 'react-icons/bi'
import { IconType } from 'react-icons'

function Skills() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => prev + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const SkillCard = ({ text, Icon, index, totalInSection, color }: { text: string; Icon: IconType; index: number; totalInSection: number; color: string }) => {
        const isGlowing = (currentIndex % totalInSection) === index;
        const glowColor = color === 'mine'
            ? 'rgba(56, 255, 66, 0.4)' // green
            : 'rgba(0, 253, 234, 0.4)'; // cyan

        const borderColor = color === 'mine' ? 'border-mine/30' : 'border-hers/30';
        const textColor = color === 'mine' ? 'text-mine' : 'text-hers';

        return (
            <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className={`relative flex flex-col items-center gap-3 p-5 bg-zinc-950 border transition-all duration-700 cursor-pointer group rounded-xl overflow-hidden ${isGlowing
                    ? `${borderColor} shadow-[0_0_30px_${glowColor}] border-opacity-100`
                    : `border-white/5 hover:border-white/20`
                    }`}
            >
                {/* Corner Brackets */}
                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-white/10 group-hover:border-mine/50 transition-colors" />
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white/10 group-hover:border-mine/50 transition-colors" />

                <div className={`p-2 rounded-lg transition-all duration-500 ${isGlowing ? 'bg-mine/5' : 'bg-transparent group-hover:bg-white/5'}`}>
                    <Icon className={`w-8 h-8 transition-all duration-500 ${isGlowing ? textColor : `text-zinc-600 group-hover:text-white`
                        }`} />
                </div>
                <p className='text-[9px] uppercase tracking-[0.2em] font-black text-zinc-600 transition-colors duration-500 group-hover:text-white'>
                    {text}
                </p>

                {/* Active Scanner Line */}
                {isGlowing && (
                    <motion.div
                        initial={{ left: "-100%" }}
                        animate={{ left: "200%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
                    />
                )}
            </motion.div>
        );
    };

    const SkillsGrid = ({ items, color }: { items: { text: string; Icon: IconType }[]; color: string }) => {
        return (
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4 gap-4'>
                {items.map((item, idx) => (
                    <SkillCard
                        key={idx}
                        text={item.text}
                        Icon={item.Icon}
                        index={idx}
                        totalInSection={items.length}
                        color={color}
                    />
                ))}
            </div>
        );
    };

    const iotSkills = [
        { text: "C/C++", Icon: SiCplusplus },
        { text: "Raspberry Pi", Icon: FaRaspberryPi },
        { text: "ESP32", Icon: BiChip },
        { text: "MQTT & CoAP", Icon: TbNetwork },
        { text: "Embedded Linux", Icon: TbCpu },
        { text: "Edge Computing", Icon: TbCpu },
    ];

    const fullStackSkills = [
        { text: "Next.js", Icon: SiNextdotjs },
        { text: "React Native", Icon: TbBrandReactNative },
        { text: "TypeScript", Icon: SiTypescript },
        { text: "Tailwind CSS", Icon: SiTailwindcss },
        { text: "Node.js", Icon: SiNodedotjs },
        { text: "FastAPI", Icon: SiFastapi },
        { text: "Postgres", Icon: SiPostgresql },
        { text: "Appwrite", Icon: SiAppwrite },
    ];

    const aiSkills = [
        { text: "TensorFlow", Icon: SiTensorflow },
        { text: "PyTorch", Icon: SiPytorch },
        { text: "OpenCV", Icon: SiOpencv },
        { text: "YOLO", Icon: TbBrain },
    ];

    const devOpsSkills = [
        { text: "Docker", Icon: FaDocker },
        { text: "AWS IoT", Icon: TbCloudComputing },
        { text: "Git", Icon: FaGitSquare },
    ];

    const circuitNodes = [
        "M 0 50 L 100 50 M 50 0 L 50 100",
        "M 10 10 L 90 90 M 90 10 L 10 90",
        "M 0 0 Q 50 100 100 0",
        "M 0 100 Q 50 0 100 100"
    ];

    return (
        <div className='max-w-7xl mx-auto px-8 font-outfit relative mt-32' id='skills'>
            {/* Background Logic Grid */}
            <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
                <svg className="w-full h-full">
                    <defs>
                        <pattern id="logic-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d={circuitNodes[currentIndex % 4]} fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-800" />
                            <circle cx="50" cy="50" r="1" className="text-zinc-700" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#logic-grid)" />
                </svg>
            </div>

            <Title text='Arsenal' className='flex flex-col items-center justify-center cursor-pointer relative z-10' />

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 mt-24 relative'>
                {/* Connection Line */}
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent -translate-x-1/2" />

                <div className="space-y-8 relative">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-px bg-mine/50"></div>
                        <h3 className='text-[10px] uppercase tracking-[0.5em] font-black text-mine'>NODE_01 // EMBEDDED_SYSTEMS</h3>
                    </div>
                    <SkillsGrid items={iotSkills} color='mine' />
                </div>

                <div className="space-y-8 relative">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-px bg-hers/50"></div>
                        <h3 className='text-[10px] uppercase tracking-[0.5em] font-black text-hers'>NODE_02 // FULL_STACK_ENGINEERING</h3>
                    </div>
                    <SkillsGrid items={fullStackSkills} color='hers' />
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16'>
                <div className="space-y-8 relative">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-px bg-hers/50"></div>
                        <h3 className='text-[10px] uppercase tracking-[0.5em] font-black text-hers'>NODE_03 // NEURAL_NETWORKS</h3>
                    </div>
                    <SkillsGrid items={aiSkills} color='hers' />
                </div>
                <div className="space-y-8 relative">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-px bg-mine/50"></div>
                        <h3 className='text-[10px] uppercase tracking-[0.5em] font-black text-mine'>NODE_04 // DEPLOYMENT_PROTOCOLS</h3>
                    </div>
                    <SkillsGrid items={devOpsSkills} color='mine' />
                </div>
            </div>
        </div>
    );
}

export default Skills;