// src/components/BestSeller.jsx
import { ShopContext } from '@/context/ShopContext'
import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
    const { displayProducts } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        if (Array.isArray(displayProducts)) {
            const isLoading = displayProducts.every(item => item === null)

            if (isLoading) {
                // Loading skeletons show karo (5 nulls tak limited)
                setBestSeller(displayProducts.slice(0, 5))
            } else {
                // Real products me se sirf bestSeller wale lo
                const bestProduct = displayProducts.filter((item) => item && item.bestseller)
                setBestSeller(bestProduct.slice(0, 5))
            }
        } else {
            setBestSeller([])
        }
    }, [displayProducts])

    return (
        <div className='pb-24'>
            <div className=' mb-10'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='text-center w-3/4 m-auto text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur distinctio, sint ullam provident laboriosam veritatis?
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSeller.map((item, index) => (
                    <ProductItem
                        key={index}
                        item={item}
                    />
                ))}
            </div>
        </div>
    )
}

export default BestSeller
