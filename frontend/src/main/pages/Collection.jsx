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
import { PlayIcon, SearchX, Package } from 'lucide-react'

const Collection = () => {
  const { displayProducts, isLoading } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState("relavent")

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    const allNull = Array.isArray(displayProducts) && displayProducts.every(item => item === null)
    if (allNull) {
      setFilterProducts(displayProducts)
      return
    }

    let copy = [...displayProducts]

    if (category.length > 0) {
      copy = copy.filter(item => item && category.includes(item.category))
    }
    if (subCategory.length > 0) {
      copy = copy.filter(item => item && subCategory.includes(item.subCategory))
    }

    setFilterProducts(copy)
  }

  const sortProducts = () => {
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

  const clearAllFilters = () => {
    setCategory([])
    setSubCategory([])
    setSortType("relavent")
  }

  const hasRealProducts = filterProducts.some(item => item !== null)
  const isShowingSkeletons = filterProducts.every(item => item === null) && isLoading

  useEffect(() => {
    applyFilter()
  }, [displayProducts, category, subCategory])

  useEffect(() => {
    sortProducts()
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-4 py-8'>
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
              <input className='w-4' type="checkbox" value='Men' onChange={toggleCategory} checked={category.includes('Men')} />Men
            </p>
            <p className='flex gap-2'>
              <input className='w-4' type="checkbox" value='Women' onChange={toggleCategory} checked={category.includes('Women')} />Women
            </p>
            <p className='flex gap-2'>
              <input className='w-4' type="checkbox" value='Kids' onChange={toggleCategory} checked={category.includes('Kids')} />Kids
            </p>
          </div>
          <div className='border p-3'>
            <p className='text-sm font-medium'>TYPE</p>
            <p className='flex gap-2'>
              <input className='w-4' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} checked={subCategory.includes('Topwear')} />Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-4' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} checked={subCategory.includes('Bottomwear')} />Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-4' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} checked={subCategory.includes('Winterwear')} />Winterwear
            </p>
          </div>

          {(category.length > 0 || subCategory.length > 0 || sortType !== "relavent") && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="w-full"
            >
              Clear All Filters
            </Button>
          )}
        </div>
      </div>

      <div className='flex-1'>
        <div className='flex justify-between mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuRadioGroup value={sortType} onValueChange={setSortType}>
                <DropdownMenuRadioItem value="relavent">Sort by: Relevant</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="low-high">Sort by: Low to High</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="high-low">Sort by: High to Low</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {isShowingSkeletons && filterProducts.map((item, index) => (
            <ProductItem key={`skeleton-${index}`} item={item} />
          ))}

          {!isShowingSkeletons && hasRealProducts && filterProducts.map((item, index) => (
            item && <ProductItem key={item._id || index} item={item} />
          ))}
        </div>

        {!isLoading && !hasRealProducts && !isShowingSkeletons && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center">
              <div className="mb-4">
                {category.length > 0 || subCategory.length > 0 ? (
                  <SearchX className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                ) : (
                  <Package className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                )}
              </div>

              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {category.length > 0 || subCategory.length > 0
                  ? "No products match your filters"
                  : "No products found"
                }
              </h3>

              <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md">
                {category.length > 0 || subCategory.length > 0
                  ? "Try adjusting your filters or search criteria to find what you're looking for."
                  : "It looks like there are no products available at the moment. Please check back later."
                }
              </p>

              {(category.length > 0 || subCategory.length > 0 || sortType !== "relavent") && (
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  className="inline-flex items-center gap-2"
                >
                  <SearchX className="h-4 w-4" />
                  Clear All Filters
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection