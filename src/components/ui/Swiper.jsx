import { useEffect, useState } from 'react'

import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react'

import { cn } from '@/utils'

export default function Swiper({ children, className, images, id, showImages, isCard }) {
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [activeIndex, setactiveIndex] = useState(0)
  const shouldLoop = images?.length > 1
  const prevClass = `prev-${id}`
  const nextClass = `next-${id}`

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
          navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
          style={{
            '--swiper-pagination-color': 'var(--color-accent-500)',
          }}
        >
          {images.map((image, i) => (
            <SwiperSlide key={i}>
              <img
                src={image.url}
                alt={`${image.public_id} ${i + 1}`}
                className={cn(
                  'aspect-video w-full bg-neutral-50 object-cover sm:aspect-square dark:bg-neutral-200',
                  className,
                )}
              />
            </SwiperSlide>
          ))}
        </SwiperReact>

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

        {children}
      </div>
      {showImages && (
        <div className="flex gap-4">
          {images.map((image, i) => {
            const isSelected = activeIndex === i

            return (
              <button
                key={image.public_id}
                onClick={() => setactiveIndex(i)}
                className={cn(
                  'card aspect-square w-1/4 cursor-pointer border-2 transition-all',
                  isSelected ? 'border-accent-500 card border-2' : '',
                )}
              >
                <img src={image.url} alt={image.public_id} className="size-full object-cover" />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
