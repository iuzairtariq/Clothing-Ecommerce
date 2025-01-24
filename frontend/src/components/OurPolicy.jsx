import React from 'react'
import Title from './Title';
import { HeadsetIcon, Repeat2Icon, ShieldCheckIcon } from 'lucide-react';

const OurPolicy = () => {
    return (
        <div className='pb-24'>
            <div className='mb-10'>
                <Title text1={'Our'} text2={'Policies'} />
                <p className='text-center w-3/4 m-auto text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur distinctio, sint ullam provident laboriosam veritatis?
                </p>
            </div>
            <div className='flex flex-col sm:flex-row justify-around gap-16 sm:gap-8 text-center text-xs sm:text-sm md:text-base text-slate-500'>
                <div>
                    <Repeat2Icon size={80} className='m-auto mb-5' />
                    <p className='font-semibold'>Easy Exchange</p>
                    <p className='text-slate-400'>We offer hassle free exchange policy</p>
                </div>
                <div>
                    <ShieldCheckIcon size={80} className='m-auto mb-5' />
                    <p className='font-semibold'>7 Days Return</p>
                    <p className='text-slate-400'>We offer hassle free exchange policy</p>
                </div>
                <div>
                    <HeadsetIcon size={80} className='m-auto mb-5' />
                    <p className='font-semibold'>Best Customer Support</p>
                    <p className='text-slate-400'>We offer hassle free exchange policy</p>
                </div>
            </div>
        </div>
    )
}

export default OurPolicy