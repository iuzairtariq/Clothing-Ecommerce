import ProductItem from '@/components/ProductItem'
import Title from '@/components/Title'
import { ShopContext } from '@/context/ShopContext'
import React, { useContext, useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlayIcon } from 'lucide-react'


const Collection = () => {
  const { products, search } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = React.useState("relavent")

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value)) // filter karke wo item le ao jo e.target.value ke barabar nhi hain
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let copyProducts = products.slice()

    if (search) {
      copyProducts = copyProducts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      copyProducts = copyProducts.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      copyProducts = copyProducts.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterProducts(copyProducts)
  }

  const sortProducts = () => {
    let copyFP = filterProducts.slice()

    switch (sortType) {
      case 'low-high':
        setFilterProducts(copyFP.sort((a, b) => (a.price - b.price)))
        break;
      case 'high-low':
        setFilterProducts(copyFP.sort((a, b) => (b.price - a.price)))
        break;
      default:
        applyFilter()
        break;
    }
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, products])

  useEffect(() => {
    sortProducts()
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-4 py-8'>

      <div className='min-w-52 '>
        <p onClick={() => setShowFilter(!showFilter)}
          className='text-slate-600 dark:text-slate-400 text-xl flex gap-1 items-center font-medium mb-3 sm:mt-2 cursor-pointer sm:cursor-default'>
          FILTERS
          <PlayIcon size={15} className={`sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>
        <div className={`space-y-3 text-slate-600 dark:text-slate-400 ${showFilter ? '' : 'hidden'} sm:block`}>
          <div className='border p-3'>
            <p className='text-sm font-medium'>CATEGORIES</p>
            <p className='flex gap-2'>
              <input className='w-4' type="checkbox" value='Men' onChange={toggleCategory} />Men
            </p>
            <p className='flex gap-2'>
              <input className='w-4' type="checkbox" value='Women' onChange={toggleCategory} />Women
            </p>
            <p className='flex gap-2'>
              <input className='w-4' type="checkbox" value='Kids' onChange={toggleCategory} />Kids
            </p>
          </div>
          <div className='border p-3'>
            <p className='text-sm font-medium'>TYPE</p>
            <p className='flex gap-2'>
              <input className='w-4' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-4' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-4' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />Winterwear
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className='flex justify-between'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuRadioGroup value={sortType} onValueChange={setSortType}>
                <DropdownMenuRadioItem value="relavent">Sort by: Relavent</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="low-high">Sort by: Low to High</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="high-low">Sort by: High to Low</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>



        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (<ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection