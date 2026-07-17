import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export * from 'date-fns'
export * from 'next-themes'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function filterData(items = [], filters = []) {
  if (!items?.length) return []

  return items.filter((item) => {
    return filters.every((filterObj) => {
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

        const isInactive = parts.every((val) => !val || val === 'null' || val === 'undefined')
        if (isInactive) return true

        const [rawMin, rawMax] = parts

        return fields.some((field) => {
          const itemValue = typeof field === 'function' ? field(item) : item[field]
          if (itemValue === undefined || itemValue === null) return false

          const isDate =
            itemValue instanceof Date || (!isNaN(Date.parse(itemValue)) && isNaN(Number(itemValue)))

          if (isDate) {
            const valDate = new Date(itemValue).getTime()

            const minDate = isValid(rawMin) ? new Date(rawMin).getTime() : -Infinity
            const maxDate = isValid(rawMax) ? new Date(rawMax).getTime() : Infinity

            return valDate >= minDate && valDate <= maxDate
          }

          const valNum = Number(itemValue)

          const minNum = isValid(rawMin) ? Number(rawMin) : -Infinity
          const maxNum = isValid(rawMax) ? Number(rawMax) : Infinity

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
}
