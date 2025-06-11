// src/components/Collection.jsx
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '@/context/ShopContext'
import Title from '@/components/Title'
import ProductItem from '@/components/ProductItem'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlayIcon } from 'lucide-react'

const Collection = () => {
  const { displayProducts } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState("relavent")

  // Toggle category
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  // Toggle subCategory
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  // ① Apply Filter on displayProducts
  const applyFilter = () => {
    // Agar displayProducts me sirf nulls hain, to usi set karo
    const allNull = Array.isArray(displayProducts) && displayProducts.every(item => item === null)
    if (allNull) {
      // Abhi data load ho raha hai, seedha placeholders rakho:
      setFilterProducts(displayProducts)
      return
    }

    // Jab real data hai, to filtering karo:
    let copy = [...displayProducts]  // shallow copy

    // Example: agar search functionality needed ho to:
    // if (search) copy = copy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

    // Category filter
    if (category.length > 0) {
      copy = copy.filter(item => item && category.includes(item.category))
    }
    // SubCategory filter
    if (subCategory.length > 0) {
      copy = copy.filter(item => item && subCategory.includes(item.subCategory))
    }

    // Ab copy me filtered real items honge (no nulls)
    setFilterProducts(copy)
  }

  // ② Sort function also on filterProducts
  const sortProducts = () => {
    // Agar filterProducts me nulls hain (loading stage), skip sort:
    const hasOnlyNulls = filterProducts.every(item => item === null)
    if (hasOnlyNulls) return

    let copyFP = [...filterProducts]
    switch (sortType) {
      case 'low-high':
        copyFP.sort((a, b) => a.price - b.price)
        setFilterProducts(copyFP)
        break;
      case 'high-low':
        copyFP.sort((a, b) => b.price - a.price)
        setFilterProducts(copyFP)
        break;
      default:
        applyFilter()
        break;
    }
  }

  // ③ Whenever displayProducts, category, subCategory change → applyFilter
  useEffect(() => {
    applyFilter()
  }, [displayProducts, category, subCategory])

  // ④ Whenever sortType changes → sortProducts
  useEffect(() => {
    sortProducts()
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-4 py-8'>
      {/* Sidebar Filters */}
      <div className='min-w-52'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='text-slate-600 dark:text-slate-400 text-xl flex gap-1 items-center font-medium mb-3 sm:mt-2 cursor-pointer sm:cursor-default'
        >
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

      {/* Products Section */}
      <div className='flex-1'>
        {/* Header with Title & Sort */}
        <div className='flex justify-between mb-4'>
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

        {/* Grid of Products / Skeletons */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <ProductItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection
