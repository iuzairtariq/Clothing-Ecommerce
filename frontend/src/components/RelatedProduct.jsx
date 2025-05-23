import { ShopContext } from '@/context/ShopContext'
import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProduct = ({ category, subCategory, onProductClick }) => {
    const { products } = useContext(ShopContext)
    const [related, setRelated] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            let copyProducts = products.slice()

            copyProducts = copyProducts.filter((item) => category === item.category)
            copyProducts = copyProducts.filter((item) => subCategory === item.subCategory)
            // console.log(copyProducts.slice(0, 5));
            setRelated(copyProducts.slice(0, 5));
        }
    }, [products])

    return (
        <div className='pb-20'>
            <div className="text-center text-3xl pb-3">
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.map((item, index) => (
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} onClick={()=>onProductClick(item._id)} />))}
            </div>
        </div>
    )
}

export default RelatedProduct