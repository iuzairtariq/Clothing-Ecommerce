import React, { useState } from 'react'
import { Button } from './ui/button'
import axios from 'axios'
import { backendUrl } from '@/App'
import { toast } from 'react-toastify'
import Title from './Title'

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)

            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
            if (response.data.success) {
                setToken(response.data.token)
                toast.success("Logged in successfully")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='shadow-md rounded-lg px-8 py-6 max-w-md'>
                <Title text1={'ADMIN'} text2={'PANEL'} />
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-slate-600 dark:text-slate-400 mb-2'>Email Address</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 bg-accent' type="email" placeholder='your@email.com' required />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-slate-600 dark:text-slate-400 mb-2'>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 bg-accent' type="password" placeholder='your@email.com' required />
                    </div>
                    <Button type='submit' className='w-full'>
                        {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login
