import React from 'react'

const Title = ({ text1, text2 }) => {
    return (
        <div className='flex gap-2 items-center justify-center mb-3'>
            <p className='text-slate-600 text-2xl sm:text-3xl'>{text1} <span className='text-slate-400 font-medium'>{text2}</span></p>
            <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-600'></p>
        </div>
    )
}

export default Title