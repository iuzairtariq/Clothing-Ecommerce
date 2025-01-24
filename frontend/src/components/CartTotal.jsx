import { ShopContext } from '@/context/ShopContext'
import React, { useContext } from 'react'
import Title from './Title'

const CartTotal = () => {
    const { currency, deliveryFee, getCartAmount } = useContext(ShopContext)
    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>
            <div className='flex flex-col gap-2 mt-3 text-sm'>
                <div className='flex justify-between'>
                    <p className='text-slate-600 dark:text-slate-400'>Subtotal</p>
                    <p className='text-slate-600 dark:text-slate-400'>{currency} {getCartAmount()}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p className='text-slate-600 dark:text-slate-400'>Shipping Fee</p>
                    <p className='text-slate-600 dark:text-slate-400'>{currency} {deliveryFee}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b className='text-slate-600 dark:text-slate-400'>Total</b>
                    <b className='text-slate-600 dark:text-slate-400'>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}.00</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal