import Button from './Button'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <span className="px-4">
        {currentPage} / {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  )
}
