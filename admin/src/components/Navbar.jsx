import React from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './ModeToggle'

const Navbar = ({ setToken }) => {
    return (
        <div className='text-slate-600 dark:text-slate-400 flex h-14 justify-between items-center sticky top-0 z-10 rounded-lg border bg-background shadow-md px-4 sm:px-8 md:px-12 lg:px-16'>
            <div>
                <h1 className='text-2xl font-bold'>Clothing</h1>
            </div>
            <div className='space-x-3'>
                <ModeToggle />
                <Button onClick={() => setToken('')}>Logout</Button>
            </div>
        </div>
    )
}

export default Navbar