export default function StatsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <article key={i} className="card animate-pulse p-4">
            <div className="h-4 w-1/2 rounded bg-neutral-200" />
            <div className="mt-2 h-6 w-1/3 rounded bg-neutral-200" />
          </article>
        ))}
      </section>

      <div className="card animate-pulse p-4">
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 rounded bg-neutral-200" />
          ))}
        </div>
      </div>
    </div>
  )
}
