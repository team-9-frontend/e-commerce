export default function StatsSkeleton() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <article
            key={index}
            className="card flex justify-between gap-3 rounded-2xl bg-white p-6 pb-10 dark:bg-neutral-100 animate-pulse"
          >
            <div className="flex-1">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-24 mb-3" />
              <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded-md w-16 mb-2" />
              <div className="h-3.5 bg-neutral-200 dark:bg-neutral-800 rounded-md w-32" />
            </div>
            <div className="bg-neutral-200 dark:bg-neutral-800 size-10 sm:size-14 shrink-0 rounded-lg sm:rounded-2xl" />
          </article>
        ))}
      </section>

      <div className="grid gap-2 lg:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 dark:bg-neutral-100 animate-pulse">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-24 mb-2" />
          <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded-md w-48 mb-4" />
          <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-2xl p-4 bg-neutral-50/50 dark:bg-neutral-900/50"
              >
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-20" />
                <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded-md w-8" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-lg dark:bg-neutral-100 animate-pulse">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-24 mb-2" />
          <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded-md w-32 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-neutral-50/50 dark:bg-neutral-900/50 flex items-center justify-between gap-3 rounded-2xl p-4"
              >
                <div className="size-10 rounded-xl bg-neutral-200 dark:bg-neutral-800 shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded-md w-36" />
                  <div className="h-3.5 bg-neutral-200 dark:bg-neutral-800 rounded-md w-48" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-lg dark:bg-neutral-100 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-24 mb-2" />
            <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded-md w-48 mb-4" />
          </div>
          <div className="bg-neutral-200 dark:bg-neutral-800 rounded-xl px-2.5 py-1 h-5 w-16 shrink-0" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-neutral-50/50 dark:bg-neutral-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl p-3"
            >
              <div className="flex-1 space-y-1.5">
                <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded-md w-28" />
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-40" />
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-neutral-200 dark:bg-neutral-800 rounded-xl h-6 w-16" />
                <div className="bg-neutral-200 dark:bg-neutral-800 rounded-md h-6 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
