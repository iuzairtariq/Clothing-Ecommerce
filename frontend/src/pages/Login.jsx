import { Button } from '@/components/ui/button'
import { ShopContext } from '@/context/ShopContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, backendUrl, navigate } = useContext(ShopContext)
  const [isLoading, setIsLoading] = useState(false) // Step 1: Add isLoading state

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true) // Step 2: Set isLoading to true when submission starts
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
      }
      else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setIsLoading(false) // Step 2: Reset isLoading to false after the process
    }
  }

  useEffect(() => {
    if (token)
      navigate('/')
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto py-16 gap-4 text-slate-500'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='font-serif text-3xl text-slate-600 dark:text-slate-400'>{currentState}</p>
        <hr className='border-none h-[1.8px] w-8 bg-slate-700' />
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type='text' className='w-full px-3 py-2 border border-gray-800 bg-accent' placeholder='Name' required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' className='w-full px-3 py-2 border border-gray-800 bg-accent' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' className='w-full px-3 py-2 border border-gray-800 bg-accent' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Login' ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p> : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <Button className='rounded-none' disabled={isLoading}>
        {isLoading ? 'Loading...' : (currentState === 'Login' ? 'Sign In' : 'Sign Up')}
      </Button>
    </form>
  )
}

export default Login
