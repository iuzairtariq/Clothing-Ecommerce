import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className='block space-y-5 md:flex md:space-y-0 md:space-x-16 py-5 px-4 sm:px-8 md:px-12 lg:px-16'>
                <div className='flex-1 md:text-center'>
                    <h1 className='text-xl font-semibold text-slate-600 dark:text-slate-400'>CLOTHING</h1>
                    <p className='text-justify text-slate-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam non temporibus ducimus</p>
                </div>
                <div className='flex-1 md:text-center'>
                    <h2 className='text-xl font-medium text-slate-600 dark:text-slate-400'>COMPANY</h2>
                    <ul className='flex flex-col gap-1 text-slate-600'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className='flex-1 md:text-center'>
                    <h2 className='text-xl font-semibold text-slate-600 dark:text-slate-400'>GET IN TOUCH</h2>
                    <p className='text-slate-600'>www.clothing.com</p>
                    <p className='text-slate-600'>0317-2684802</p>
                </div>
            </div>
            <hr />
            <div>
                <p className='text-center text-slate-600 dark:text-slate-400 font-medium py-5'>Copyright 2025&copy; clothing.com - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer