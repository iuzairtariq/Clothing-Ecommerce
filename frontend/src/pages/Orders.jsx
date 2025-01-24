import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { ShopContext } from '@/context/ShopContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)

  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      // console.log(response.data);
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        // console.log(allOrdersItem);
        setOrderData(allOrdersItem.reverse())
        toast.info('Track order updated')
      }

    } catch (error) {
      console.error(error);
      toast.error('Failed to load track order!')
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='py-16'>
      <div className='text-2xl pb-3'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div key={index} className='py-4 border-t border-b text-slate-600 dark:text-slate-400 flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-1 text-base text-slate-600'>
                  <p>{currency} {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p>Date: <span>{new Date(item.date).toDateString()}</span></p>
                <p>Payment: <span>{item.paymentMethod}</span></p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-400'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <Button onClick={loadOrderData}>Track Order</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders