"use client"

import Title from '@/components/Title'
import React, { useEffect, useState } from 'react'
import { FaGitSquare, FaDocker, FaRaspberryPi } from 'react-icons/fa'
import {
    SiAppwrite, SiC, SiCplusplus, SiDjango, SiFastapi, SiMongodb,
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
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const SkillCard = ({ text, Icon, index, totalInSection, color }: { text: string; Icon: IconType; index: number; totalInSection: number; color: string }) => {
        const isGlowing = (currentIndex % totalInSection) === index;
        const glowColor = color === 'mine'
            ? 'rgba(56, 255, 66, 0.6)' // green
            : 'rgba(0, 253, 234, 0.6)'; // cyan

        const borderColor = color === 'mine' ? 'border-mine' : 'border-hers';
        const textColor = color === 'mine' ? 'text-mine' : 'text-hers';

        const hoverBorder = color === 'mine' ? 'hover:border-mine' : 'hover:border-hers';
        const hoverText = color === 'mine' ? 'group-hover:text-mine' : 'group-hover:text-hers';
        const hoverShadow = color === 'mine' ? 'hover:shadow-[0_0_15px_rgba(56,255,66,0.5)]' : 'hover:shadow-[0_0_15px_rgba(0,253,234,0.5)]';

        return (
            <div className={`flex flex-col items-center gap-2 p-3 bg-black border transition-all duration-300 cursor-pointer group hover:scale-110 ${hoverShadow} ${isGlowing
                ? `${borderColor} scale-105`
                : `border-gray-800 ${hoverBorder}`
                }`}
                style={{
                    boxShadow: isGlowing ? `0 0 15px ${glowColor}` : undefined
                }}>
                <Icon className={`w-5 h-5 transition-colors duration-300 ${isGlowing ? textColor : `text-gray-400 ${hoverText}`
                    }`} />
                <p className='text-xs text-gray-300 text-center transition-colors duration-300 group-hover:text-white'>{text}</p>
            </div>
        );
    };

    const SkillsGrid = ({ items, color }: { items: { text: string; Icon: IconType }[]; color: string }) => {
        return (
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3'>
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
        { text: "PostgreSQL", Icon: SiPostgresql },
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

    return (
        <div className='max-w-7xl mx-auto px-8 font-merriweather relative' id='skills'>
            <Title text='Skills' className='flex flex-col items-center justify-center cursor-pointer relative z-10' />

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16'>
                <div>
                    <h3 className='text-2xl font-bold text-center text-mine mb-4'>IoT & Embedded</h3>
                    <SkillsGrid items={iotSkills} color='mine' />
                </div>
                <div>
                    <h3 className='text-2xl font-bold text-center text-hers mb-4'>Full-Stack Development</h3>
                    <SkillsGrid items={fullStackSkills} color='hers' />
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12'>
                <div>
                    <h3 className='text-2xl font-bold text-center text-hers mb-4'>AI & Engineering</h3>
                    <SkillsGrid items={aiSkills} color='hers' />
                </div>
                <div>
                    <h3 className='text-2xl font-bold text-center text-mine mb-4'>DevOps & Tools</h3>
                    <SkillsGrid items={devOpsSkills} color='mine' />
                </div>
            </div>
        </div>
    )
}

export default Skills