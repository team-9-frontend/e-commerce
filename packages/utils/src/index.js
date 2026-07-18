import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export * from 'date-fns'
export * from 'next-themes'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function filterData(items = [], filters = []) {
  if (!items?.length) return []

  const filterRules = filters.filter((f) => !f.sort)
  const sortRule = filters.find((f) => f.sort)

  const result = items.filter((item) => {
    return filterRules.every((filterObj) => {
      const entries = Object.entries(filterObj)
      if (entries.length === 0) return true

      const [query, config] = entries[0]

      if (!query || query === 'undefined' || query === 'null') {
        return true
      }

      const { fields = [], exact = false, range = false } = config
      if (fields.length === 0) return true

      if (range) {
        const parts = query.split(',')

        if (
          parts.every((val) => !val || val.trim() === '' || val === 'null' || val === 'undefined')
        ) {
          return true
        }

        const [rawMin, rawMax] = parts

        const parseBound = (val, fallback) => {
          if (!val || val.trim() === '' || val === 'null' || val === 'undefined') return fallback
          const num = Number(val)
          return isNaN(num) ? fallback : num
        }

        return fields.some((field) => {
          const itemValue = typeof field === 'function' ? field(item) : item[field]
          if (itemValue === undefined || itemValue === null) return false

          const isDate =
            itemValue instanceof Date || (!isNaN(Date.parse(itemValue)) && isNaN(Number(itemValue)))

          if (isDate) {
            const valDate = new Date(itemValue).getTime()

            const minDate = parseBound(rawMin, -Infinity)
            const maxDate = parseBound(rawMax, Infinity)

            return valDate >= minDate && valDate <= maxDate
          }

          const valNum = Number(itemValue)

          const minNum = parseBound(rawMin, -Infinity)
          const maxNum = parseBound(rawMax, Infinity)

          return valNum >= minNum && valNum <= maxNum
        })
      }

      if (exact) {
        return fields.some((field) => {
          const itemValue = typeof field === 'function' ? field(item) : item[field]
          return String(itemValue) === query
        })
      }

      const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
      if (terms.length === 0) return true

      return terms.every((term) =>
        fields.some((field) => {
          const itemValue = typeof field === 'function' ? field(item) : item[field]
          return String(itemValue ?? '')
            .toLowerCase()
            .includes(term)
        }),
      )
    })
  })

  if (sortRule) {
    const [query, config] = Object.entries(sortRule).find(([key]) => key !== 'sort') || []

    if (query && query !== 'undefined' && query !== 'null' && config?.mapping) {
      const activeSort = config.mapping[query.toLowerCase()]

      if (activeSort) {
        result.sort((a, b) => {
          let valA = a[activeSort.field]
          let valB = b[activeSort.field]

          const isDate = valA instanceof Date || (!isNaN(Date.parse(valA)) && isNaN(Number(valA)))

          if (isDate) {
            valA = new Date(valA).getTime()
            valB = new Date(valB).getTime()
          } else {
            valA = Number(valA) || 0
            valB = Number(valB) || 0
          }

          if (valA < valB) return -1 * activeSort.direction
          if (valA > valB) return 1 * activeSort.direction
          return 0
        })
      }
    }
  }

  return result
}
