import Title from '@/components/Title'
import Tooltip from '@/components/ToolTip'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import Spline from '@splinetool/react-spline'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SiHey } from 'react-icons/si'

import { getResume } from '@/lib/getResume'

const Hero = () => {
    const handleDownload = () => {
        const url = getResume();
        window.open(url, "_blank");
    };

    return (
        <div className='mt-6 md:mt-3 min-h-[60vh] flex flex-col-reverse gap-14 lg:gap-0 lg:flex-row items-center justify-center animate-move-up'>
            <div className='space-y-10 text-left items-center'>
                <h1 className='text-4xl lg:text-7xl font-bold font-playwrite items-center text-center'>
                    <span className='flex flex-row gap-5 font-playwrite text-center justify-center lg:justify-start'>
                        Hello!
                        <Tooltip text="ꯍꯦꯜꯂꯣ">
                            <SiHey className='rotate-12 hover:-rotate-12 transition-all cursor-pointer' />
                        </Tooltip>
                    </span>
                    <span className='underline underline-offset-8 decoration-mine'>{"I'm Rajjit Laishram."}</span>
                </h1>
                <p className='md:w-[32rem] text-lg text-gray-100 font-merriweather text-center'>
                    {"Based in Manipur, I'm a dedicated IoT Software Developer specializing in creating innovative IoT solutions and hardware integrations."}
                </p>
                <Link href="#contact" className='group font-merriweather flex lg:inline-block items-center justify-center'>
                    <Title text="Contact Me 📨" />
                </Link>
            </div>

            <div className='mt-24 lg:mt-1 mx-auto font-meitei flex flex-col justify-center items-center gap-4'>
                <Tooltip text="ꯔꯖ꯭ꯖꯤꯠ ꯂꯥꯏꯁ꯭ꯔꯝ">
                    <div className="w-auto h-72 space-y-3 rotate-[20deg] relative flex justify-center items-center mx-auto cursor-pointer">
                        <div className="relative w-64 h-60 flex justify-center items-center bg-gradient-to-t from-mine to-hers">
                            <div className="absolute w-[98%] h-[98%] transform bg-black"></div>
                            <Spline scene="https://prod.spline.design/wQlwz4R7AEtJucn4/scene.splinecode" className="absolute w-full h-full z-20" />
                            <Image src="/rajjitlaishram.png" alt="rajjit laishram" width="260" height="80" className='absolute z-30 transform -rotate-[20deg] -top-[100px]' unoptimized priority />
                            <div className='glow absolute top-[40%] right-1/2 z-10'></div>
                        </div>
                    </div>
                    <div className='w-full h-2 bg-hers'></div>
                    <div className='w-full h-2 bg-mine translate-x-2 transition-all cursor-pointer'></div>
                </Tooltip>
                <HoverBorderGradient
                    containerClassName=""
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 w-[max-content] py-4"
                    onClick={handleDownload}
                >
                    <span className='font-merriweather'>{"🛠️ Download my resume"}</span>
                </HoverBorderGradient>
            </div>
        </div >
    )
}

export default Hero