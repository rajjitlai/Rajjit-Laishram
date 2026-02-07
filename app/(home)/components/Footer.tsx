import React from 'react'
import { socialLinks } from '@/lib/social'
import Link from 'next/link'

const Footer = () => {
    return (
        <section className='mt-20 border-t border-zinc-800 bg-black/50 backdrop-blur-md pt-16 pb-12 font-outfit'>
            <div className='max-w-7xl mx-auto px-8'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-16'>
                    {/* Brand Section */}
                    <div className='space-y-6'>
                        <h2 className='text-3xl font-black text-white flex items-center gap-2'>
                            Rajjit <span className='text-mine'>.</span>
                        </h2>
                        <p className='text-zinc-400 leading-relaxed max-w-xs'>
                            Building the future of smart living through code. Expert in IoT integrations and modern autonomous systems.
                        </p>
                        <div className='flex items-center gap-4'>
                            {socialLinks.map((social, index) => {
                                const Icon = social.Icon
                                return (
                                    <Link
                                        href={social.link}
                                        target='_blank'
                                        key={index}
                                        aria-label={social.label}
                                        className='w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-mine hover:text-mine transition-all duration-300'
                                    >
                                        <Icon className='w-5 h-5' />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className='space-y-6'>
                        <h3 className='text-sm uppercase tracking-[0.2em] font-bold text-zinc-500'>Navigation</h3>
                        <ul className='space-y-4'>
                            {[
                                { name: 'Arsenal', id: 'skills' },
                                { name: 'Missions', id: 'projects' },
                                { name: 'Chronicles', id: 'exp' },
                                { name: 'Uplink', id: 'contact' }
                            ].map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={`#${item.id}`}
                                        className='text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group'
                                    >
                                        <span className='h-px w-0 bg-mine group-hover:w-4 transition-all duration-300'></span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA Section */}
                    <div className='space-y-6 flex flex-col items-start'>
                        <h3 className='text-sm uppercase tracking-[0.2em] font-bold text-zinc-500'>Let&apos;s talk</h3>
                        <p className='text-zinc-400'>Have an interesting project?</p>
                        <Link href="#contact" className="w-full">
                            <button
                                suppressHydrationWarning
                                className="bg-white text-black font-bold py-4 px-8 rounded-xl w-full hover:bg-mine transition-colors flex items-center justify-center gap-2 group"
                            >
                                Start a Conversation
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </Link>
                    </div>
                </div>

                <div className='pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6'>
                    <p className='text-zinc-500 text-sm'>
                        &copy; {new Date().getFullYear()} Rajjit Laishram. All rights reserved.
                    </p>
                    <div className='flex items-center gap-8'>
                        <p className='text-zinc-500 text-sm flex items-center gap-2'>
                            <span className='h-1.5 w-1.5 rounded-full bg-mine animate-pulse'></span>
                            Available for new opportunities
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer