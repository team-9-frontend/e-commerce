import { BiX } from 'react-icons/bi'

import { Badge } from '@repo/ui'

export default function ActiveFilters({ urlValues = {}, setValue }) {
  const labels = {
    createdAt: 'Newest',
    price: 'Price: Low to High',
    '-price': 'Price: High to Low',
    '-ratingsAverage': 'Top Rated',
    minPrice: 'Min Price: ',
    maxPrice: 'Max Price: ',
    search: 'Search: ',
  }

  const filterEntries = Object.entries(urlValues).filter(([key, value]) => {
    if (key === 'page' || key === 'limit') return false
    if (key === 'category' && (value === '' || value === 'all')) return false
    if (key === 'sort' && (value === '' || value === 'default')) return false
    return !!value
  })

  if (filterEntries.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filterEntries.map(([key, value]) => {
        const displayLabel = labels[value] || (labels[key] ? `${labels[key]}${value}` : value)
        return (
          <Badge key={key} className="flex items-center gap-1">
            <span>{displayLabel}</span>
            <button
              onClick={() => {
                setValue(key, '')
              }}
            >
              <BiX className="h-4 w-4" />
            </button>
          </Badge>
        )
      })}

      <button
        onClick={() => {
          setValue('search', '')
          setValue('category', '')
          setValue('minPrice', '')
          setValue('maxPrice', '')
          setValue('sort', '')
        }}
        className="cursor-pointer px-2 py-1 text-xs font-bold text-red-500 transition-colors hover:text-red-600"
      >
        Clear all
      </button>
    </div>
  )
}
