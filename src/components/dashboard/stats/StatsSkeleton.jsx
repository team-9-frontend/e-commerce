export default function StatsSkeleton() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <article
            key={index}
            className="card flex animate-pulse justify-between gap-3 rounded-2xl bg-white p-6 pb-10 dark:bg-neutral-100"
          >
            <div className="flex-1">
              <div className="mb-3 h-4 w-24 rounded-md bg-neutral-200" />
              <div className="mb-2 h-8 w-16 rounded-md bg-neutral-200" />
              <div className="h-3.5 w-32 rounded-md bg-neutral-200" />
            </div>
            <div className="size-10 shrink-0 rounded-lg bg-neutral-200 sm:size-14 sm:rounded-2xl" />
          </article>
        ))}
      </section>

      <div className="grid gap-2 lg:grid-cols-2">
        <div className="flex animate-pulse flex-col gap-3 rounded-3xl bg-white p-6 dark:bg-neutral-100">
          <div className="mb-2 h-4 w-24 rounded-md bg-neutral-200" />
          <div className="mb-4 h-7 w-48 rounded-md bg-neutral-200" />
          <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-2xl bg-neutral-50/50 p-4"
              >
                <div className="h-4 w-20 rounded-md bg-neutral-200" />
                <div className="h-7 w-8 rounded-md bg-neutral-200" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex animate-pulse flex-col gap-3 rounded-3xl bg-white p-6 shadow-lg dark:bg-neutral-100">
          <div className="mb-2 h-4 w-24 rounded-md bg-neutral-200" />
          <div className="mb-4 h-7 w-32 rounded-md bg-neutral-200" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 rounded-2xl bg-neutral-50/50 p-4"
              >
                <div className="size-10 shrink-0 rounded-xl bg-neutral-200" />
                <div className="flex-1 space-y-1">
                  <div className="h-5 w-36 rounded-md bg-neutral-200" />
                  <div className="h-3.5 w-48 rounded-md bg-neutral-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex animate-pulse flex-col gap-3 rounded-3xl bg-white p-6 shadow-lg dark:bg-neutral-100">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="mb-2 h-4 w-24 rounded-md bg-neutral-200" />
            <div className="mb-4 h-7 w-48 rounded-md bg-neutral-200" />
          </div>
          <div className="h-5 w-16 shrink-0 rounded-xl bg-neutral-200 px-2.5 py-1" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col justify-between gap-3 rounded-2xl bg-neutral-50/50 p-3 sm:flex-row sm:items-center"
            >
              <div className="flex-1 space-y-1.5">
                <div className="h-5 w-28 rounded-md bg-neutral-200" />
                <div className="h-4 w-40 rounded-md bg-neutral-200" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-16 rounded-xl bg-neutral-200" />
                <div className="h-6 w-12 rounded-md bg-neutral-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
