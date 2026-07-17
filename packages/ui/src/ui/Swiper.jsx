import { useEffect, useState } from 'react'

import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

import { cn } from '@repo/utils'

import 'swiper/css'
import 'swiper/css/pagination'

import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react'

import { Skeleton } from './Skeleton'

export function Swiper({ children, className, isLoading, images, showImages, isCard }) {
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [activeIndex, setactiveIndex] = useState(0)
  const shouldLoop = images?.length > 1

  const [prevEl, setPrevEl] = useState(null)
  const [nextEl, setNextEl] = useState(null)

  useEffect(() => {
    if (!swiperInstance || activeIndex === undefined) return

    const currentRealIndex = swiperInstance.realIndex
    if (currentRealIndex !== activeIndex) {
      if (shouldLoop) {
        swiperInstance.slideToLoop(activeIndex)
      } else {
        swiperInstance.slideTo(activeIndex)
      }
    }
  }, [activeIndex, swiperInstance, shouldLoop])

  return (
    <div className="flex flex-col gap-4">
      <div className={cn('group relative', isCard && 'card')}>
        <SwiperReact
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setactiveIndex(swiper.realIndex)}
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={shouldLoop ? { delay: 3000, disableOnInteraction: false } : false}
          loop={shouldLoop}
          pagination={{ clickable: true }}
          navigation={{ prevEl, nextEl }}
          style={{
            '--swiper-pagination-color': 'var(--color-accent-500)',
          }}
        >
          {!isLoading ? (
            images.map((image, i) => (
              <SwiperSlide key={i}>
                <img
                  src={image.url}
                  alt={`${image.public_id} ${i + 1}`}
                  className={cn(
                    'aspect-video w-full bg-neutral-50 object-cover transition-all hover:scale-105 sm:aspect-square dark:bg-neutral-200',
                    className,
                  )}
                />
              </SwiperSlide>
            ))
          ) : (
            <Skeleton className="aspect-video w-full sm:aspect-square" />
          )}
        </SwiperReact>

        {shouldLoop && (
          <>
            <button
              ref={(node) => setPrevEl(node)}
              className="text-accent-600 dark:text-accent-400 absolute top-1/2 left-4 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-neutral-50/85 p-2 opacity-50 shadow transition-all hover:bg-neutral-50/85 hover:opacity-100 active:-translate-x-1/3"
            >
              <LuChevronLeft />
            </button>

            <button
              ref={(node) => setNextEl(node)}
              className="text-accent-600 dark:text-accent-400 absolute top-1/2 right-4 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-neutral-50/85 p-2 opacity-50 shadow transition-all hover:bg-neutral-50/85 hover:opacity-100 active:translate-x-1/3"
            >
              <LuChevronRight />
            </button>
          </>
        )}

        {children}
      </div>
      {showImages && (
        <div className="flex w-full gap-4">
          {Array.from({ length: isLoading ? 4 : images.length }).map((_, i) => {
            const image = images?.[i]
            const isSelected = activeIndex === i

            return !isLoading ? (
              <button
                key={i}
                onClick={() => setactiveIndex(i)}
                className={cn(
                  'card aspect-square max-w-1/4 flex-1 cursor-pointer border-2 transition-all',
                  isSelected ? 'border-accent-500 card border-2' : '',
                )}
              >
                <img
                  src={image.url}
                  alt={image.public_id}
                  className="size-full object-cover transition-all hover:scale-105"
                />
              </button>
            ) : (
              <Skeleton key={i} className="aspect-square" parentClassName="card max-w-1/4 flex-1" />
            )
          })}
        </div>
      )}
    </div>
  )
}
