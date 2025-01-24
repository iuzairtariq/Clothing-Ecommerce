import React from 'react'
import { Button } from './ui/button'

const Subscribtion = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault()
    }
    return (
        <div className='text-center pb-24'>
            <p className='text-2xl font-medium text-slate-600 dark:text-slate-400 mb-3'>Subscribe now & get 20% off</p>
            <p className='text-slate-600 dark:text-slate-400 mb-10'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit distinctio sed impedit doloremque? Necessitatibus, sed?
            </p>
            <form onSubmit={onSubmitHandler} className='block sm:inline-flex gap-2'>
                <div className='mb-3 sm:mb-0'>
                    <input type="email" placeholder='Enter your email' required className='border rounded-md p-1 pl-3 pr-20 sm:pr-28  dark:bg-accent text-slate-600 dark:text-slate-400' />
                </div>
                <div>
                    <Button type='submit'>SUBSCRIBE</Button>
                </div>
            </form>
        </div>
    )
}

export default Subscribtion