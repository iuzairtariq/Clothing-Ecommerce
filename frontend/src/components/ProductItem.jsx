// src/components/ProductItem.jsx
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '@/context/ShopContext'
import { Skeleton } from '@/components/ui/skeleton'

const ProductItem = ({ item }) => {
  if (!item || !item._id) {
    return (
      <div className="space-y-2">
        <Skeleton className="aspect-square w-full" />
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[50%]" />
      </div>
    )
  }

  const { _id, image, name, price } = item
  const { /* currency, agar zaroorat ho */ } = useContext(ShopContext)

  return (
    <Link className='text-slate-600 dark:text-slate-400 cursor-pointer' to={`/product/${_id}`}>
      <div className="overflow-hidden">
        <img
          className='hover:scale-110 transition ease-in-out w-full aspect-square object-cover rounded-md'
          src={image[0]}
          alt={name}
        />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-bold'>{price}</p>
    </Link>
  )
}

export default ProductItem
