import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

export * from 'react-hook-form'

export function useSearchParamsForm({ debounceMs = 300, ...options } = {}) {
  const [searchParams, setSearchParams] = useSearchParams()

  const paramsToObject = (params) => {
    const obj = {}
    params.forEach((value, key) => {
      obj[key] = value
    })
    return obj
  }

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
        () => {
          const next = new URLSearchParams({})
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

    const subscription = watch((value, { name, type }) => {
      if (!name) return
      const isDebouncedField = name === 'search'

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
  }, [watch, updateParams, debounceMs])

  const currentParams = useMemo(() => paramsToObject(searchParams), [searchParams, paramsToObject])

  return {
    ...form,
    urlValues: currentParams,
  }
}
