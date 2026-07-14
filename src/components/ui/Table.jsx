export default function Table({ columns = [], data = [] }) {
  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead className="bg-neutral-50 dark:bg-neutral-200">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 text-left font-medium">
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr
                key={i}
                className="border-t border-neutral-200 hover:bg-neutral-50/50 dark:hover:bg-neutral-200/50"
              >
                {columns.map((column, i) => (
                  <td key={i} className="px-4 py-3">
                    {row[column.toLowerCase()] || '-'}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="py-6 text-center text-neutral-500">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
