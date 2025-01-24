import { ShopContext } from '@/context/ShopContext'
import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller))
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])

    return (
        <div className='pb-24'>
            <div className=' mb-10'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='text-center w-3/4 m-auto text-xs sm:text-sm md:text-base text-slate-600'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur distinctio, sint ullam provident laboriosam veritatis?
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSeller.map((item, index) => (<ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />))}
            </div>
        </div>
    )
}

export default BestSeller