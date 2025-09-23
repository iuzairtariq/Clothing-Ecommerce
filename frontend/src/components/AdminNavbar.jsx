import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ModeToggle } from './ModeToggle';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '@/App';

const AdminNavbar = ({ setAdminToken }) => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('admintoken');
            const response = await axios.post(
                backendUrl + '/api/user/admin/logout',
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                setAdminToken('');
                localStorage.removeItem('admintoken');
                toast.success(response.data.message);
                navigate('/admin'); // login page pe bhejo
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Logout failed. Try again.');
        }
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className={`text-slate-600 dark:text-slate-400 flex h-14 justify-between items-center
         sticky top-0 z-10 rounded-b-xl transition-shadow duration-500 bg-background px-4 sm:px-8 md:px-12 lg:px-16 ${scrolled ? 'shadow-md dark:shadow-lg' : ''}`}>
            <div>
                <h1 className='text-2xl font-bold'>Clothing</h1>
            </div>
            <div className='space-x-3 flex items-center'>
                <ModeToggle />
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    );
};

export default AdminNavbar;
