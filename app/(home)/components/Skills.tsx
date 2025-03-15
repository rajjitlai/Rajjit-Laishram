import Title from '@/components/Title'
import { HoverEffect } from '@/components/ui/card-hover-effect'
import React from 'react'
import { FaGitSquare } from 'react-icons/fa'
import { SiAppwrite, SiC, SiCplusplus, SiCss3, SiDotnet, SiExpress, SiFigma, SiHtml5, SiJavascript, SiMongodb, SiNextdotjs, SiNodedotjs, SiOpencv, SiPhp, SiPython, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si'
import { TbBrandCSharp, TbBrandReactNative } from 'react-icons/tb'

function Skills() {
    const skills = [
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
            text: "MongoDB",
            Icon: SiMongodb,
        },
        {
            text: "Git",
            Icon: FaGitSquare,
        },
        {
            text: "Figma",
            Icon: SiFigma,
        },
        {
            text: "C++",
            Icon: SiCplusplus,
        },
        {
            text: "TypeScript",
            Icon: SiTypescript,
        },
        {
            text: "Node.js",
            Icon: SiNodedotjs,
        },
        {
            text: "HTML",
            Icon: SiHtml5,
        },
        {
            text: "CSS",
            Icon: SiCss3,
        },
        {
            text: "C",
            Icon: SiC,
        },
        {
            text: "Appwrite",
            Icon: SiAppwrite,
        },
        {
            text: "Native",
            Icon: TbBrandReactNative,
        },
        {
            text: "PHP",
            Icon: SiPhp,
        },
        {
            text: "C#",
            Icon: TbBrandCSharp,
        },
        {
            text: ".NET",
            Icon: SiDotnet,
        },
        {
            text: "Express",
            Icon: SiExpress
        },
        {
            text: "OpenCV",
            Icon: SiOpencv,
        }
    ]

    return (
        <div className='max-w-5xl mx-auto px-8 font-merriweather'>
            <Title text='Skills 💻' className='flex flex-col items-center justify-center cursor-pointer' />
            <HoverEffect items={skills} />
        </div>
    )
}

export default Skills