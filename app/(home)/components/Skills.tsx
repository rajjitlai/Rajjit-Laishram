import Title from '@/components/Title'
import { HoverEffect } from '@/components/ui/card-hover-effect'
import React from 'react'
import { FaGitSquare } from 'react-icons/fa'
import { FaAws, FaRaspberryPi } from 'react-icons/fa'
import { SiAppwrite, SiC, SiCplusplus, SiCss3, SiExpress, SiFigma, SiHtml5, SiJavascript, SiMongodb, SiNextdotjs, SiNodedotjs, SiOpencv, SiPython, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si'
import { TbBrandCSharp, TbBrandReactNative, TbCloudComputing, TbNetwork } from 'react-icons/tb'

function Skills() {
    const skills = [
        {
            text: "IoT Development",
            Icon: TbNetwork,
        },
        {
            text: "Raspberry Pi",
            Icon: FaRaspberryPi,
        },
        {
            text: "Cloud Platforms",
            Icon: TbCloudComputing,
        },
        {
            text: "AWS IoT",
            Icon: FaAws,
        },
        {
            text: "Next",
            Icon: SiNextdotjs,
        },
        {
            text: "React",
            Icon: SiReact,
        },
        {
            text: "Tailwind",
            Icon: SiTailwindcss,
        },
        {
            text: "JavaScript",
            Icon: SiJavascript,
        },        
        {
            text: "Python",
            Icon: SiPython,
        },
        {
            text: "MQTT",
            Icon: TbNetwork,
        },
        {
            text: "Node.js",
            Icon: SiNodedotjs,
        },
        {
            text: "C++",
            Icon: SiCplusplus,
        },
        {
            text: "Embedded Systems",
            Icon: FaRaspberryPi,
        },
        {
            text: "Sensor Integration",
            Icon: TbNetwork,
        },
        {
            text: "Git",
            Icon: FaGitSquare,
        },
        {
            text: "TypeScript",
            Icon: SiTypescript,
        },
        {
            text: "MongoDB",
            Icon: SiMongodb,
        },
        {
            text: "Express",
            Icon: SiExpress
        },
        {
            text: "HTML",
            Icon: SiHtml5,
        },
        {
            text: "CSS",
            Icon: SiCss3,
        },
    ]

    return (
        <div className='max-w-5xl mx-auto px-8 font-merriweather' id='skills'>
            <Title text='Skills 💻' className='flex flex-col items-center justify-center cursor-pointer' />
            <HoverEffect items={skills} />
        </div>
    )
}

export default Skills