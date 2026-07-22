import { useEffect, useState } from 'react'

import { BiX } from 'react-icons/bi'
import { LuFilter } from 'react-icons/lu'
import { useSearchParams } from 'react-router-dom'

import { cn } from '@repo/utils'
import { useDebounce } from '@repo/utils/hooks'

import Select from './Select'

export default function FilterSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const urlMinPrice = searchParams.get('minPrice')
  const urlMaxPrice = searchParams.get('maxPrice')
  const [minPrice, setMinPrice] = useState(urlMinPrice || '')
  const [maxPrice, setMaxPrice] = useState(urlMaxPrice || '')
  const debouncedMinPrice = useDebounce(minPrice, 500)
  const debouncedMaxPrice = useDebounce(maxPrice, 500)

  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Fashion', value: 'fashion' },
    { label: 'Phones', value: 'phones' },
    { label: 'Beauty', value: 'beauty' },
    { label: 'Sports', value: 'sports' },
  ]
  const sortOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Newest', value: 'createdAt' },
    { label: 'Price: Low to High', value: 'price' },
    { label: 'Price: High to Low', value: '-price' },
    { label: 'Top Rated', value: '-ratingsAverage' },
  ]

  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      const currentMin = params.get('minPrice') || ''
      const currentMax = params.get('maxPrice') || ''
      if (currentMin !== debouncedMinPrice) {
        if (debouncedMinPrice) {
          params.set('minPrice', debouncedMinPrice)
        } else {
          params.delete('minPrice')
        }
        params.delete('page')
        return params
      }
      if (currentMax !== debouncedMaxPrice) {
        if (debouncedMaxPrice) {
          params.set('maxPrice', debouncedMaxPrice)
        } else {
          params.delete('maxPrice')
        }
        params.delete('page')
        return params
      }
      return prev
    })
  }, [debouncedMinPrice, debouncedMaxPrice, setSearchParams])

  useEffect(() => {
    const urlMin = urlMinPrice || ''
    if (urlMin === '') {
      setMinPrice('')
    }
  }, [urlMinPrice])

  useEffect(() => {
    const urlMax = urlMaxPrice || ''
    if (urlMax === '') {
      setMaxPrice('')
    }
  }, [urlMaxPrice])

  const handleCategoryChange = (categoryValue) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      if (categoryValue === 'all') {
        params.delete('category')
      } else {
        params.set('category', categoryValue)
      }
      params.delete('page')
      return params
    })
  }

  const handleSortChange = (value) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      if (!value || value === 'default') {
        params.delete('sort')
      } else {
        params.set('sort', value)
      }
      params.delete('page')
      return params
    })
  }

  const handleClearAll = () => {
    setSearchParams({})
    setMinPrice('')
    setMaxPrice('')
  }

  return (
    <>
      <button
        className="mb-4 flex cursor-pointer items-center justify-center rounded-lg border border-neutral-200/70 bg-neutral-50 px-3.5 py-2.5 shadow-md transition duration-200 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <LuFilter className="h-5 w-5" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-50/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={cn(
          'fixed inset-y-0 inset-s-0 z-20 h-screen w-64 shrink-0 space-y-6 bg-neutral-100 p-6 shadow-2xl transition-transform duration-300 ease-in-out md:relative md:h-auto md:w-60 md:translate-x-0 md:rounded-xl md:border md:border-neutral-200 md:bg-transparent md:shadow-none',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        <button
          className="absolute inset-e-4 top-4 cursor-pointer md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <BiX className="h-6 w-6" />
        </button>

        {/* Categories */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold tracking-wide">Category</h3>
          <ul className="space-y-3">
            {categories.map((category) => {
              const isChecked = (searchParams.get('category') || 'all') === category.value
              return (
                <li key={category.value}>
                  <label className="flex cursor-pointer items-center gap-3 text-neutral-700 transition duration-300 select-none hover:text-neutral-950">
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      onChange={() => handleCategoryChange(category.value)}
                      checked={isChecked}
                      className="peer hidden"
                    />
                    <div
                      className={cn(
                        'flex h-5 w-5 items-center justify-center rounded-full border transition duration-150',
                        isChecked ? 'border-accent-500' : 'border-neutral-500',
                      )}
                    >
                      <div
                        className={cn(
                          'bg-accent-500 h-2.5 w-2.5 rounded-full transition-transform duration-150',
                          isChecked ? 'scale-100' : 'scale-0',
                        )}
                      />
                    </div>
                    <span className="text-sm font-medium">{category.label}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Price Range Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold tracking-wide">Price Range</h3>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full rounded-lg border border-neutral-700/70 bg-neutral-100 px-3 py-2 text-sm text-neutral-950 placeholder-neutral-500 transition duration-200 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full rounded-lg border border-neutral-700/70 bg-neutral-100 px-3 py-2 text-sm text-neutral-950 placeholder-neutral-500 transition duration-200 focus:outline-none"
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold tracking-wide">Sort By</h3>
          <Select
            options={sortOptions}
            value={searchParams.get('sort') || 'default'}
            onChange={handleSortChange}
          />
        </div>

        {/* Clear Filters */}
        <div className="pt-2">
          <button
            onClick={handleClearAll}
            className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-blue-600/50 py-2.5 text-center text-sm font-semibold text-blue-400 transition duration-200 hover:border-blue-500 hover:bg-blue-600/10 hover:text-blue-300"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  )
}
