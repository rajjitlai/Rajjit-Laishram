import { socialLinks } from '@/lib/social'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

import { TbSparkles } from "react-icons/tb";

const Navbar = ({ className }: { className?: string }) => {
    return (
        <nav className={cn('py-10 flex justify-between items-center font-merriweather animate-move-down', className)}>
            <div className='text-2xl font-bold animate-tilt'>
                <Link href="/" className="inline-flex items-center gap-2 link-underline whitespace-nowrap">
                    Rajjit Laishram <TbSparkles className='w-6 h-6 text-yellow-400 animate-spin-slow' />
                </Link>
            </div>
            <div className='flex items-center gap-5 animate-tilt-reverse'>
                {socialLinks.map((social, index) => {
                    const Icon = social.Icon
                    return <Link href={social.link} target='_blank' key={index} aria-label={social.label} className='transition-all'><Icon className='w-6 h-6 hover:scale-125' /></Link>
                })}
            </div>
        </nav>
    )
}

export default Navbar