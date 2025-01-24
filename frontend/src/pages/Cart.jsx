// import { assets } from '@/assets/frontend_assets/assets'
import CartTotal from '@/components/CartTotal'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { ShopContext } from '@/context/ShopContext'
import { Trash2Icon } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {

    if (products.length > 0) {
      const itemData = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            itemData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(itemData)
    }
    // console.log(itemData);
  }, [cartItems, products])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id)

            return (
              <div key={index} className='py-4 border-t border-b text-slate-600 dark:text-slate-400 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-sm sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-accent'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-16 px-1 sm:px-2 py-1 outline-none bg-accent' type="number" min={1} defaultValue={item.quantity} />
                <Trash2Icon onClick={() => updateQuantity(item._id, item.size, 0)} size={25} className='cursor-pointer text-slate-600 dark:text-slate-400' />
              </div>
            )

          })
        }
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='text-end mt-5'>
            <Link to='/placeorder'>
              <Button>PROCEED TO CHECKOUT</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart