import { useEffect, useState } from 'react'

import { LuSearch } from 'react-icons/lu'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@repo/utils/hooks'

export default function InputSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      const currentSearch = params.get('search') ?? ''
      if (currentSearch === debouncedSearch) {
        return prev
      }

      if (debouncedSearch.trim()) {
        params.set('search', debouncedSearch)
      } else {
        params.delete('search')
      }
      params.delete('page')
      return params
    })
  }, [debouncedSearch, setSearchParams])

  return (
    <div className="relative w-full">
      <LuSearch className="absolute inset-s-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
      <input
        type="text"
        placeholder="Search products..."
        className="focus:border-accent-500 focus:ring-accent-500/10 w-full rounded-xl border border-neutral-200 bg-neutral-100 py-3 ps-11 pe-4 text-sm text-neutral-950 placeholder-neutral-400 transition duration-200 outline-none focus:ring-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}
