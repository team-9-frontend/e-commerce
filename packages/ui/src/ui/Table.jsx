import { cn } from '@repo/utils'

import { Skeleton } from './Skeleton'

export function Table({
  isLoading,
  loadingRows = 20,
  columns = [],
  data = [],
  noDataMsg = 'No data found',
}) {
  return (
    <div className="card scrollbar-thin overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead className="bg-neutral-50 dark:bg-neutral-200">
          <tr>
            {columns.map((column, i) => (
              <th key={i} className="px-4 py-3 text-left font-medium capitalize">
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {!isLoading && !data?.length > 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-6 text-center text-neutral-500">
                {noDataMsg}
              </td>
            </tr>
          ) : (
            Array.from({ length: isLoading ? loadingRows || 10 : data.length }).map((_, i) => {
              const row = data?.[i]

              return (
                <tr
                  key={i}
                  onClick={row?.onClick}
                  className={cn(
                    'border-t border-neutral-200 text-nowrap hover:bg-neutral-50/50 dark:hover:bg-neutral-200/50',
                    row?.onClick && 'cursor-pointer',
                  )}
                >
                  {columns.map((column, i) => (
                    <td key={i} className="px-4 py-3">
                      {!isLoading ? (row[column.toLowerCase()] ?? '-') : <Skeleton />}
                    </td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
