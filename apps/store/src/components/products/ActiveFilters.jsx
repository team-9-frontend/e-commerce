import { BiX } from 'react-icons/bi'
import { useSearchParams } from 'react-router-dom'

import { Badge } from '@repo/ui'

export default function ActiveFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const labels = {
    createdAt: 'Newest',
    price: 'Price: Low to High',
    '-price': 'Price: High to Low',
    '-ratingsAverage': 'Top Rated',
    minPrice: 'Min Price: ',
    maxPrice: 'Max Price: ',
  }

  const filterEntries = Array.from(searchParams.entries()).filter(([key, value]) => {
    if (key === 'page' || key === 'limit' || key === 'search') return false
    if (key === 'category' && value === 'all') return false
    if (key === 'sort' && value === 'default') return false
    return !!value
  })

  const removeFilter = (key) => {
    const params = new URLSearchParams(searchParams)
    params.delete(key)
    params.delete('page')
    setSearchParams(params, { replace: true })
  }

  const clearAllFilters = () => {
    setSearchParams({}, { replace: true })
  }

  if (filterEntries.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filterEntries.map(([key, value]) => {
        const displayLabel = labels[value] || (labels[key] ? `${labels[key]}${value}` : value)
        return (
          <Badge key={key} color="accent" className="flex items-center gap-1.5 px-2.5 py-1">
            <span>{displayLabel}</span>
            <button
              onClick={() => removeFilter(key)}
              className="text-accent-700 hover:text-accent-900 dark:text-accent-400 dark:hover:text-accent-200 flex cursor-pointer items-center justify-center"
            >
              <BiX className="h-4 w-4" />
            </button>
          </Badge>
        )
      })}

      <button
        onClick={clearAllFilters}
        className="cursor-pointer px-2 py-1 text-xs font-bold text-red-500 transition-colors hover:text-red-600"
      >
        Clear all
      </button>
    </div>
  )
}
