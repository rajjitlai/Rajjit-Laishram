import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { SiGithub, SiInstagram, SiLinkedin, SiX } from 'react-icons/si'

const Navbar = ({ className }: { className?: string }) => {
    const socials = [
        {
            link: "https://www.linkedin.com/in/rajjit-laishram-a03a02255/",
            labe: "LinkedIn",
            Icon: SiLinkedin
        },
        {
            link: "https://github.com/rajjitlai/",
            label: "GitHub",
            Icon: SiGithub
        },
        {
            link: "https://instagram.com/rajjitlaishram",
            label: "Instagram",
            Icon: SiInstagram
        },
        {
            link: "https://x.com/rajjitlai",
            label: "X",
            Icon: SiX
        }
    ]

    return (
        <nav className={cn('py-10 flex justify-between items-center font-merriweather', className)}>
            <h1 className='text-2xl font-bold underline underline-offset-8 decoration-mine rotate-6 hover:rotate-0 transition-all'>
                <Link href="/">
                    Rajjit Laishram 💫
                </Link>
            </h1>
            <div className='flex items-center gap-5 -rotate-6'>
                {socials.map((social, index) => {
                    const Icon = social.Icon
                    return <Link href={social.link} target='_blank' key={index} aria-label={social.label} className='hover:rotate-6 transition-all'><Icon className='w-6 h-6 hover:scale-125' /></Link>
                })}
            </div>
        </nav>
    )
}

export default Navbar