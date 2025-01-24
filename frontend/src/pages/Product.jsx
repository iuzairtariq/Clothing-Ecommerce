import RelatedProduct from '@/components/RelatedProduct'
import { Button } from '@/components/ui/button'
import { ShopContext } from '@/context/ShopContext'
import { StarIcon } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart, navigate } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.map(item => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })
  }

  const handleRelatedProductClick = (relatedProductId) => {
    navigate(`/product/${relatedProductId}`)
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [productId])

  return productData ? (
    <div className='py-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* Product Data */}
      <div className='flex gap-5 sm:gap-10 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col justify-between sm:justify-normal w-full sm:w-[20%]'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* Product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2 text-slate-600 dark:text-slate-400'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <StarIcon size={20} color='yellow' className='bg-red-700 rounded' />
            <StarIcon size={20} color='yellow' className='bg-red-700 rounded' />
            <StarIcon size={20} color='yellow' className='bg-red-700 rounded' />
            <StarIcon size={20} color='yellow' className='bg-red-700 rounded' />
            <StarIcon size={20} color='yellow' className='bg-red-700 rounded' />
            <p className='pl-2 text-slate-600 dark:text-slate-400'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium text-slate-600 dark:text-slate-400'>{currency}{productData.price}</p>
          <p className='mt-5 md:w-4/5 text-slate-600 dark:text-slate-400'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p className='text-slate-600 dark:text-slate-400'>Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (<Button onClick={() => setSize(item)} className={`${item === size ? 'outline outline-1 outline-slate-500' : ''}`} key={index}>{item}</Button>))
              }
            </div>
          </div>
          <Button onClick={() => addToCart(productData._id, size)}>ADD TO CART</Button>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className='py-20'>
        <div className="flex">
          <Button className='rounded-none'>Description</Button>
          <Button className='rounded-none '>Reviews</Button>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-slate-600 dark:text-slate-400'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae laborum debitis tempore, neque magni fugiat.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nisi nam beatae obcaecati possimus numquam.</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} onProductClick={handleRelatedProductClick} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product