import { useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0]?.url
  )

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <img
          src={selectedImage}
          alt={product.name}
          className="h-[420px] w-full object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {product.images.map((image) => {
          const isSelected = selectedImage === image.url

          return (
            <button
              key={image.public_id}
              onClick={() => setSelectedImage(image.url)}
              className={`overflow-hidden rounded-2xl border-2 transition ${
                isSelected
                  ? 'border-blue-500'
                  : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <img
                src={image.url}
                alt={product.name}
                className="h-20 w-full object-cover"
              />
            </button>
          )
        })}
      </div>


      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
        >
          {product.images.map((image) => (
            <SwiperSlide key={image.public_id}>
              <img
                src={image.url}
                alt={product.name}
                className="h-[300px] w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}