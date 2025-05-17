import { assets } from '@/main/frontend_assets/assets'
import Subscribtion from '@/components/Subscribtion'
import Title from '@/components/Title'
import React from 'react'

const About = () => {
    return (
        <div>
            <div className='text-2xl pt-8'>
                <Title text1={'ABOUT'} text2={'US'} />
            </div>
            <div className='my-10 flex flex-col md:flex-row justify-center gap-16'>
                <img className='w-full md:max-w-[450px] rounded-xl' src={assets.about_img} alt="" />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-slate-600 dark:text-slate-400'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis nam vitae pariatur exercitationem illo perspiciatis?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati consectetur asperiores cum aperiam magnam impedit?</p>
                    <b>Our Mission</b>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, dignissimos minima magni ab nobis eos ut dolor adipisci architecto.</p>
                </div>
            </div>
            <div className='text-xl py-4'>
                <Title text1={'WHY'} text2={'CHOOSE US'} />
            </div>
            <div className='flex flex-col md:flex-row text-sm mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Quality Assurance:</b>
                    <p className='text-slate-600 dark:text-slate-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officia optio ipsum veniam provident voluptates!</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Convenience:</b>
                    <p className='text-slate-600 dark:text-slate-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officia optio ipsum veniam provident voluptates!</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Exceptional Customer Service:</b>
                    <p className='text-slate-600 dark:text-slate-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officia optio ipsum veniam provident voluptates!</p>
                </div>
            </div>
            <Subscribtion />
        </div>
    )
}

export default About