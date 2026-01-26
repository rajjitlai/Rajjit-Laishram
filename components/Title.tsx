import React from 'react'

const Title = ({ text, className }: { text: string, className?: string }) => {
    return (
        <div className={className}>
            <h2 className='text-3xl font-bold group-hover:text-mine transition-all'>{text}</h2>
            <div className='w-40 h-2 bg-hers'></div>
            <div className='w-40 h-2 bg-mine translate-x-2 hover:-translate-x-2 transition-all'></div>
        </div>
    )
}

export default Title