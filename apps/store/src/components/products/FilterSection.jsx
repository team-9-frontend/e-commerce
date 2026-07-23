import { useState } from 'react'
import { BiX } from 'react-icons/bi'
import { LuFilter } from 'react-icons/lu'
import { FormField } from '@repo/ui'
import { cn } from '@repo/utils'

import Select from './Select'

export default function FilterSection({
  register,
  setValue,
  sort,
  errors = {},
}) {
  const [isOpen, setIsOpen] = useState(false)

  const categories = ['', 'electronics', 'fashion', 'phones', 'beauty', 'sports']
  const sortOptions = [
    { label: 'Default', value: '' },
    { label: 'Newest', value: 'createdAt' },
    { label: 'Price: Low to High', value: 'price' },
    { label: 'Price: High to Low', value: '-price' },
    { label: 'Top Rated', value: '-ratingsAverage' },
  ]

  return (
    <>
      <button
        type="button"
        className="flex cursor-pointer items-center justify-center rounded-lg border border-neutral-200/70 bg-neutral-50 px-3.5 py-2.5 shadow-md transition duration-200 md:hidden"
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
          type="button"
          className="absolute inset-e-4 top-4 cursor-pointer md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <BiX className="h-6 w-6" />
        </button>

        {/* Categories */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold tracking-wide">Category</h3>
          {categories.map((category) => (
            <FormField
              key={category}
              type="radio"
              name="category"
              label={category || 'all'}
              value={category}
              register={register}
              className="flex-row-reverse justify-end gap-4 [[type='radio']]:cursor-pointer"
            />
          ))}
        </div>

        {/* Price Range Section */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold tracking-wide capitalize">price range</h3>
          <div className="flex gap-2">
            <FormField
              type="number"
              min={0}
              name="minPrice"
              placeholder="Min"
              register={register}
              rules={{
                pattern: { value: /^[0-9]+$/, message: 'Invalid value' },
                validate: (value, formValues) => {
                  if (!value || !formValues.maxPrice) return true
                  return (
                    Number(value) <= Number(formValues.maxPrice) || 'Min cannot be bigger than Max'
                  )
                },
              }}
              className="flex-1"
            />
            <FormField
              type="number"
              min={0}
              name="maxPrice"
              placeholder="Max"
              register={register}
              rules={{
                pattern: { value: /^[0-9]+$/, message: 'Invalid value' },
                validate: (value, formValues) => {
                  if (!value || !formValues.minPrice) return true
                  return (
                    Number(value) >= Number(formValues.minPrice) || 'Max cannot be smaller than Min'
                  )
                },
              }}
              className="flex-1"
            />
          </div>
          {(errors.minPrice || errors.maxPrice) && (
            <span className="text-sm font-medium text-red-600 dark:text-red-400">
              {errors.minPrice?.message || errors.maxPrice?.message}
            </span>
          )}
        </div>

        {/* Sort By */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold tracking-wide capitalize">sort by</h3>
          <Select
            options={sortOptions}
            value={sort || ''}
            onChange={(val) => setValue('sort', val)}
          />
        </div>

        {/* Clear Filters */}
        <div className="pt-2">
          <button
            onClick={() => {
              setValue('search', '')
              setValue('category', '')
              setValue('minPrice', '')
              setValue('maxPrice', '')
              setValue('sort', '')
            }}
            className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-blue-600/50 py-2.5 text-center text-sm font-semibold text-blue-400 transition duration-200 hover:border-blue-500 hover:bg-blue-600/10 hover:text-blue-300"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  )
}
