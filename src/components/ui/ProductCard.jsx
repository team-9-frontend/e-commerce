import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { cn } from '@/utils'

import Skeleton from './Skeleton'

export default function ProductCard({ isLoading, product }) {
  const shouldLoop = product?.images?.length > 1

  const prevClass = `prev-${product?._id}`
  const nextClass = `next-${product?._id}`

  return (
    <div className="card overflow-hidden">
      {!isLoading ? (
        <div className="group relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={shouldLoop ? { delay: 3000, disableOnInteraction: false } : false}
            loop={shouldLoop}
            pagination={{ clickable: true }}
            navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
            style={{
              '--swiper-pagination-color': 'var(--color-accent-500)',
            }}
          >
            {product?.images.map((image, i) => (
              <SwiperSlide key={i}>
                <img
                  src={image.url}
                  alt={`${product.name} ${i + 1}`}
                  className="aspect-video w-full bg-neutral-50 object-cover sm:aspect-square dark:bg-neutral-200"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {shouldLoop && (
            <>
              <button
                className={cn(
                  'text-accent-600 dark:text-accent-400 absolute top-1/2 left-4 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-neutral-50/85 p-2 text-xl opacity-50 shadow transition-all hover:bg-neutral-50/85 hover:opacity-100 active:-translate-x-1/3',
                  prevClass,
                )}
              >
                <LuChevronLeft />
              </button>

              <button
                className={cn(
                  'text-accent-600 dark:text-accent-400 absolute top-1/2 right-4 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-neutral-50/85 p-2 text-xl opacity-50 shadow transition-all hover:bg-neutral-50/85 hover:opacity-100 active:translate-x-1/3',
                  nextClass,
                )}
              >
                <LuChevronRight />
              </button>
            </>
          )}
        </div>
      ) : (
        <Skeleton className="aspect-video w-full sm:aspect-square" />
      )}

      <div className="flex flex-col gap-2 p-4">
        <h2 className="font-bold sm:text-lg">{product?.name}</h2>
        <p></p>
      </div>
    </div>
  )
}
