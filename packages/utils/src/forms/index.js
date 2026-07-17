import { useCallback, useEffect, useMemo } from 'react'

import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

export * from 'react-hook-form'

const paramsToObject = (params) => {
  const obj = {}
  params.forEach((value, key) => {
    obj[key] = value
  })
  return obj
}

export function useSearchParamsForm({ debounceMs = 300, unDebouncedFields = [], ...options } = {}) {
  const [searchParams, setSearchParams] = useSearchParams()

  const form = useForm({
    ...options,
    values: {
      ...options?.defaultValues,
      ...paramsToObject(searchParams),
    },
  })

  const updateParams = useCallback(
    (data) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          Object.entries(data).forEach(([key, value]) => {
            if (value === '' || value === null || value === undefined) {
              next.delete(key)
            } else {
              next.set(key, String(value))
            }
          })
          next.delete('page')
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  const { watch } = form

  useEffect(() => {
    let debounceTimer

    const subscription = watch((value, { name }) => {
      if (!name) return
      const isDebouncedField = !unDebouncedFields.includes(name)

      if (isDebouncedField) {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
          updateParams(value)
        }, debounceMs)
      } else {
        clearTimeout(debounceTimer)
        updateParams(value)
      }
    })

    return () => {
      subscription.unsubscribe()
      clearTimeout(debounceTimer)
    }
  }, [watch, updateParams, debounceMs, unDebouncedFields.join(',')])

  const currentParams = useMemo(() => paramsToObject(searchParams), [searchParams])

  return {
    ...form,
    updateParams,
    urlValues: currentParams,
  }
}
