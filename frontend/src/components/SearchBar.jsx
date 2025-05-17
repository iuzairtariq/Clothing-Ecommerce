import { ShopContext } from '@/context/ShopContext'
import { CrossIcon, SearchIcon } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch, navigate } = useContext(ShopContext)
    const location = useLocation()
    const [visible, setVisible] = useState(false)

    const handleSearchClick = () => {
        if (!location.pathname.includes('/collection')) {
            navigate('/collection')
        }
        setShowSearch(true)
    };

    useEffect(() => {
        if (location.pathname.includes('/collection')) {
            setVisible(true)
        }
        else {
            setVisible(false)
        }

    }, [location])

    return showSearch && visible ? (
        <div className='flex items-center justify-center border bg-gray-100 dark:bg-gray-900 text-center rounded-full'>
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-2 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
                <SearchIcon />
            </div>
            <CrossIcon onClick={() => setShowSearch(false)} className='cursor-pointer rotate-45' />
        </div>
    ) : null
}

export default SearchBar