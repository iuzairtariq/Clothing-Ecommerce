import React, { useContext } from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { ModeToggle } from './ModeToggle'
import { Link, NavLink } from 'react-router-dom'
import { MenuIcon, SearchIcon, ShoppingCartIcon, User2Icon } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShopContext } from '@/context/ShopContext'


const Navbar = () => {
    const { showSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    const handleSearchClick = () => {
        if (location.pathname !== '/collection') {
            navigate('/collection')
        }
        setShowSearch(true)
    }

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <Menubar>
            <div>
                <NavLink to='/'>
                    <h1 className='text-2xl font-bold text-slate-600 dark:text-slate-400' >CLOTHING</h1>
                </NavLink>
            </div>

            <div className='hidden sm:flex space-x-3 lg:space-x-5'>

                <NavLink to='/about' className='flex flex-col items-center font-bold'>
                    <h1 className=' text-slate-600 dark:text-slate-400'>About</h1>
                    <hr className='w-2/4 border-none h-[1.5px] bg-red-600 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center font-bold'>
                    <h1 className=' text-slate-600 dark:text-slate-400'>Collection</h1>
                    <hr className='w-2/4 border-none h-[1.5px] bg-red-600 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center font-bold'>
                    <h1 className=' text-slate-600 dark:text-slate-400'>Contact</h1>
                    <hr className='w-2/4 border-none h-[1.5px] bg-red-600 hidden' />
                </NavLink>

            </div>

            <div className='flex items-center space-x-2 md:space-x-4'>
                <SearchIcon className='cursor-pointer text-[#475569] dark:text-[#94A3B8]' onClick={handleSearchClick} />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild><User2Icon onClick={() => token ? null : navigate('/login')} className='cursor-pointer text-[#475569] dark:text-[#94A3B8]' /></DropdownMenuTrigger>
                    {/* Dropdown Menu */}
                    {token &&
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigate('/orders')}>Orders</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>}
                </DropdownMenu>
                <Link to='/cart' className='relative'> 
                    <ShoppingCartIcon className='text-[#475569] dark:text-[#94A3B8]' />
                    <p className='absolute right-[-5px] top-[-5px] w-4 leading-4 text-center bg-slate-700 text-white aspect-square rounded-full text-[8px] font-semibold'>{getCartCount()}</p>
                </Link>
                <div className='hidden sm:flex'>
                    <ModeToggle />
                </div>
                <div className='flex sm:hidden'>
                    <Sheet>
                        <SheetTrigger><MenuIcon /></SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>
                                    <NavLink to='/'>
                                        <div className='flex justify-between items-center mt-6 mb-3'>
                                            CLOTHING
                                            <ModeToggle />
                                        </div>
                                    </NavLink>
                                </SheetTitle>
                                <SheetDescription>
                                    <NavLink to='/about' className='flex flex-col items-center font-semibold'>
                                        <h1>About</h1>
                                        <hr className='w-6 border-none h-[1.5px] bg-red-600 hidden' />
                                    </NavLink>
                                </SheetDescription>
                                <SheetDescription>
                                    <NavLink to='/collection' className='flex flex-col items-center font-semibold'>
                                        <h1>Collection</h1>
                                        <hr className='w-6 border-none h-[1.5px] bg-red-600 hidden' />
                                    </NavLink>
                                </SheetDescription>
                                <SheetDescription>
                                    <NavLink to='/contact' className='flex flex-col items-center font-semibold'>
                                        <h1>Contact</h1>
                                        <hr className='w-6 border-none h-[1.5px] bg-red-600 hidden' />
                                    </NavLink>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

        </Menubar>

    )
}

export default Navbar