import React from 'react'
import { socialLinks } from '@/lib/social'
import Link from 'next/link'

const Footer = () => {
    return (
        <section className='border-t mt-10 py-2'>
            <div className='w-[90%] lg:w-[65%] flex items-center justify-between flex-row gap-10 mx-auto'>
                <ul className="list-none flex flex-row items-center gap-4">
                    {socialLinks.map((social, index) => {
                        const Icon = social.Icon
                        return <Link href={social.link} target='_blank' key={index} aria-label={social.label} className='hover:rotate-6 transition-all'><Icon className='w-6 h-6 hover:scale-125' /></Link>
                    })}
                </ul>
                <p className='text-[14px] text-white text-align-center'>&copy; 2023-2026 <br /> Rajjit Laishram</p>
            </div>
        </section>
    )
}

export default Footer