import { LuChevronFirst, LuChevronLast, LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { useSearchParams } from 'react-router-dom'
import { cn } from '@/utils'
import Button from './Button'

export default function Pagination({ className, totalPages = 1 }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1')

  const safeTotalPages = Math.max(totalPages, 1)

  const updatePage = (newPage) => {
    setSearchParams((prev) => {
      newPage <= 1 ? prev.delete('page') : prev.set('page', String(newPage))
      newPage >= safeTotalPages && prev.set('page', String(safeTotalPages))
      return prev
    })
  }

  return (
    <div className={cn('flex-center gap-2', className)}>
      <Button
        variant="ghost"
        size="md-square"
        disabled={currentPage <= 1}
        onClick={() => updatePage(1)}
      >
        <LuChevronFirst />
      </Button>

      <Button
        variant="ghost"
        size="md-square"
        disabled={currentPage <= 1}
        onClick={() => updatePage(currentPage - 1)}
      >
        <LuChevronLeft />
      </Button>

      <span className="flex-center gap-4 font-medium tracking-widest">
        <span>{currentPage}</span>
        <span>/</span>
        <span>{safeTotalPages}</span>
      </span>

      <Button
        variant="ghost"
        size="md-square"
        disabled={currentPage >= safeTotalPages}
        onClick={() => updatePage(currentPage + 1)}
      >
        <LuChevronRight />
      </Button>

      <Button
        variant="ghost"
        size="md-square"
        disabled={currentPage >= safeTotalPages}
        onClick={() => updatePage(safeTotalPages)}
      >
        <LuChevronLast />
      </Button>
    </div>
  )
}
