import { socialLinks } from '@/lib/social'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

import { TbSparkles } from "react-icons/tb";

const Navbar = ({ className }: { className?: string }) => {
    return (
        <nav className={cn('py-10 flex justify-between items-center font-outfit animate-move-down', className)}>
            <div className='group'>
                <Link href="/" className="text-xl sm:text-2xl font-black inline-flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap">
                    Rajjit Laishram <TbSparkles className='w-5 h-5 text-mine animate-pulse' />
                </Link>
                <div className="h-0.5 w-0 group-hover:w-full bg-mine transition-all duration-300" />
            </div>
            <div className='flex items-center gap-6'>
                {socialLinks.map((social, index) => {
                    const Icon = social.Icon
                    return (
                        <Link
                            href={social.link}
                            target='_blank'
                            key={index}
                            aria-label={social.label}
                            className='text-zinc-400 hover:text-white hover:scale-110 transition-all duration-300'
                        >
                            <Icon className='w-5 h-5' />
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}

export default Navbar