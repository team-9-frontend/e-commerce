import { useState } from 'react'

import { LuChevronLeft, LuChevronRight, LuStar } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useDeleteProduct } from '@/api'
import { cn } from '@/utils'

import Badge from './Badge'
import Button from './Button'
import ConfirmDialog from './ConfirmDialog'
import Skeleton from './Skeleton'

export default function ProductCard({ edits, isLoading, product }) {
  const { mutate: deleteProduct, isPending } = useDeleteProduct()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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

          {product?.featured && (
            <Badge color="amber" className="flex-center absolute top-0 z-10 mt-6 ml-6 gap-2">
              <LuStar />
              Featured
            </Badge>
          )}
          <Badge color="emerald" className="absolute right-0 bottom-0 z-10 mr-6 mb-6">
            {product?.stock ? `${product.stock} In Stock` : 'Out of Stock'}
          </Badge>
        </div>
      ) : (
        <Skeleton className="aspect-video w-full sm:aspect-square" />
      )}

      <div className="flex flex-col gap-4 p-4">
        <div>
          <h2 className="text-lg font-medium sm:text-xl">
            {!isLoading ? product.name : <Skeleton width="75%" />}
          </h2>
          <p className="mb-2 line-clamp-1 text-sm font-medium text-neutral-500">
            {!isLoading ? (
              [product.category, product.subcategory, product.brand].join(' • ') || 'no tags'
            ) : (
              <Skeleton width="50%" />
            )}
          </p>
          <p className="line-clamp-1 text-sm text-neutral-500">
            {!isLoading ? product.shortDescription || 'no description' : <Skeleton width="60%" />}
          </p>
        </div>
        <p className="text-4xl font-bold">
          {!isLoading ? (
            <>
              ${product.price}
              <span className="ml-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {`-$${product.discountPrice} off`}
              </span>
            </>
          ) : (
            <Skeleton width="30%" />
          )}
        </p>
        {!isLoading ? (
          <div className="flex gap-2">
            {product.tags.map((tag) => (
              <div className="card rounded-md border-neutral-300 bg-neutral-200 px-2 py-1">
                {tag}
              </div>
            ))}
          </div>
        ) : (
          <Skeleton width="75%" height={26} />
        )}

        {!isLoading & edits ? (
          <div className="flex items-center gap-2 border-t border-neutral-200 pt-4">
            <Link to={`/products/view/${product._id}`}>
              <Button
                variant="outline"
                size="sm"
                className="hover:border-teal-500/50 hover:bg-teal-500/15 hover:text-teal-600 dark:hover:bg-teal-500/15 dark:hover:text-teal-400"
              >
                view
              </Button>
            </Link>

            <Link to={`/products/edit/${product._id}`}>
              <Button
                variant="outline"
                size="sm"
                className="hover:border-purple-500/50 hover:bg-purple-500/15 hover:text-purple-600 dark:hover:bg-purple-500/15 dark:hover:text-purple-400"
              >
                edit
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              className="hover:border-amber-500/50 hover:bg-amber-500/15 hover:text-amber-600 dark:hover:bg-amber-500/15 dark:hover:text-amber-400"
            >
              quick edit
            </Button>

            <Button
              onClick={() => {
                setIsDialogOpen(true)
              }}
              variant="outlineDanger"
              size="sm"
              className="ml-auto"
            >
              delete
              <ConfirmDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                onConfirm={() => {
                  deleteProduct(product._id)
                }}
                title="Confirm Deletion"
                message="Are you sure?"
              ></ConfirmDialog>
            </Button>
          </div>
        ) : (
          edits && (
            <div className="border-t border-neutral-200 pt-4">
              <Skeleton width="100%" height={26} />
            </div>
          )
        )}
      </div>
    </div>
  )
}
