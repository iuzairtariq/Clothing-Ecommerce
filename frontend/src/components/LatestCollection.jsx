import { ShopContext } from '@/context/ShopContext'
import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
    const { products } = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        setLatestProducts(products.slice(0, 10))
    }, [products])

    return (
        <div className='pb-24'>
            <div className='mb-10'>
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='text-center w-3/4 m-auto text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quidem?
                </p>
            </div>

            {/* Rendering Products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    latestProducts.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default LatestCollection