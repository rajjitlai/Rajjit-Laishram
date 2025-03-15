import { socialLinks } from '@/lib/social'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const Navbar = ({ className }: { className?: string }) => {
    return (
        <nav className={cn('py-10 flex justify-between items-center font-merriweather animate-move-down', className)}>
            <h1 className='text-2xl font-bold underline underline-offset-8 decoration-mine rotate-6 hover:rotate-0 transition-all'>
                <Link href="/">
                    Rajjit Laishram 💫
                </Link>
            </h1>
            <div className='flex items-center gap-5 -rotate-6'>
                {socialLinks.map((social, index) => {
                    const Icon = social.Icon
                    return <Link href={social.link} target='_blank' key={index} aria-label={social.label} className='hover:rotate-6 transition-all'><Icon className='w-6 h-6 hover:scale-125' /></Link>
                })}
            </div>
        </nav>
    )
}

export default Navbar