import React from 'react'
import { cn } from '@/lib/utils'

import { DecryptedText } from './ui/DecryptedText'

const Title = ({ text, className }: { text: string, className?: string }) => {
    return (
        <div className={cn("group flex flex-col items-center", className)}>
            <h2 className='text-3xl md:text-5xl font-black font-outfit text-white transition-all duration-500'>
                <DecryptedText text={text} />
            </h2>
            <div className='relative mt-4'>
                <div className='w-24 h-[3px] bg-gradient-to-r from-mine to-hers rounded-full group-hover:w-48 transition-all duration-700 ease-out'></div>
                <div className='absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-mine opacity-0 group-hover:opacity-100 transition-opacity blur-[2px] shadow-[0_0_10px_#38ff42]'></div>
            </div>
        </div>
    )
}

export default Title