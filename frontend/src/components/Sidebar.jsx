import { BoxIcon, CirclePlusIcon, ListCheckIcon } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='sticky top-14 h-screen w-[15%] border-r-2 text-slate-600 dark:text-slate-400'>
            <div className='flex flex-col gap-4 pt-8 pl-[15%] text-[15px]'>
                <NavLink to='/admin/add' className='flex items-center gap-3 border border-gray-500 border-r-0 px-3 py-2 rounded-l'>
                    <CirclePlusIcon />
                    <p className='hidden md:block'>Add Items</p>
                </NavLink>
                <NavLink to='/admin/list' className='flex items-center gap-3 border border-gray-500 border-r-0 px-3 py-2 rounded-l'>
                    <ListCheckIcon />
                    <p className='hidden md:block'>List Items</p>
                </NavLink>
                <NavLink to='/admin/orders' className='flex items-center gap-3 border border-gray-500 border-r-0 px-3 py-2 rounded-l'>
                    <BoxIcon />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar