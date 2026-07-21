import { useRef } from 'react'

import {
  LuArrowRight,
  LuCpu,
  LuCreditCard,
  LuDumbbell,
  LuHand,
  LuHouse,
  LuMail,
  LuShoppingBag,
  LuSmartphone,
  LuSparkles,
} from 'react-icons/lu'
import { Link } from 'react-router-dom'

import ProductCard from '@/components/oldproducts/ProductCard'

import { useGetProducts, useGetWishlist } from '@repo/api'
import { Button, Error, FormField } from '@repo/ui'
import { useForm } from '@repo/utils/forms'

const EMPTY_ARRAY = []

export default function Home() {
  const categoriesRef = useRef(null)

  const { register, handleSubmit, reset } = useForm()

  const { data: wishlistData, isLoading: isLoadingWishlist } = useGetWishlist()
  const wishlist = wishlistData?.wishlist || EMPTY_ARRAY

  const { data, isLoading, isError, error } = useGetProducts({
    limit: 500,
  })
  const products = data?.products || EMPTY_ARRAY

  const featuredProducts = products.filter((product) => product.featured).slice(0, 4)

  const categoryCounts = products.reduce((acc, product) => {
    const cat = product.category
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {})

  const categories = [
    {
      label: 'electronics',
      count: categoryCounts['electronics'] || 0,
      icon: <LuCpu />,
    },
    {
      label: 'phones',
      count: categoryCounts['phones'] || 0,
      icon: <LuSmartphone />,
    },
    {
      label: 'fashion',
      count: categoryCounts['fashion'] || 0,
      icon: <LuShoppingBag />,
    },
    {
      label: 'home',
      count: categoryCounts['home'] || 0,
      icon: <LuHouse />,
    },
    {
      label: 'beauty',
      count: categoryCounts['beauty'] || 0,
      icon: <LuHand />,
    },
    {
      label: 'sports',
      count: categoryCounts['sports'] || 0,
      icon: <LuDumbbell />,
    },
  ]

  return (
    <>
      <div className="from-accent-700 to-accent-500 bg-linear-to-br">
        <div className="container flex flex-col py-40 text-neutral-50 selection:bg-neutral-50/15 dark:text-neutral-950 dark:selection:bg-neutral-950/15">
          <span className="mb-2 flex items-center gap-2 text-sm font-medium sm:text-lg">
            <LuSparkles className="text-[1.5em]" /> Premium Shopping Experience
          </span>
          <h1 className="font-fancy mb-4 text-4xl font-bold sm:text-6xl lg:text-8xl">
            Shop the future,
            <br /> delivered today
          </h1>
          <p className="mb-8 max-w-80 font-medium text-neutral-50/85 sm:max-w-120 sm:text-lg dark:text-neutral-950/85">
            Discover premium products at unbeatable prices. Fast delivery, easy returns, and
            exceptional quality.
          </p>
          <div className="flex gap-2">
            <Link to="/products" className="text-inherit">
              <Button
                variant="custom"
                className="text-accent-500 bg-neutral-50 hover:bg-neutral-50/85 max-sm:text-sm dark:bg-neutral-950 dark:hover:bg-neutral-950/85"
              >
                Shop Now
              </Button>
            </Link>
            <Button
              variant="custom"
              className="text-neutral-50 hover:bg-neutral-50/15 max-sm:text-sm dark:text-neutral-950 dark:hover:bg-neutral-950/15"
              onClick={() => categoriesRef.current?.scrollIntoView()}
            >
              View Categories
            </Button>
          </div>
        </div>
      </div>

      <div ref={categoriesRef} className="container flex flex-col items-center py-12 text-center">
        <h2 className="mb-2 text-3xl font-medium sm:text-4xl">Shop by Category</h2>
        <p className="text-md mb-8 max-w-80 text-neutral-500 sm:max-w-120">
          Browse our wide range of categories
        </p>
        <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-3">
          {categories.map((category, i) => {
            return (
              <Link
                key={i}
                to={`/products?category=${category.label}`}
                className="card group hover:bg-accent-500/15 hover:border-accent-500/50 flex flex-col items-center gap-4 p-8 text-inherit"
              >
                <span className="flex-center group-hover:bg-accent-500/25 group-hover:text-accent-600 dark:group-hover:text-accent-400 aspect-square w-fit rounded-xl bg-neutral-200 p-3 text-2xl">
                  {category.icon}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-medium capitalize">{category.label}</span>
                  <span className="text-sm text-neutral-600">{category.count} products</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="container flex flex-col gap-8 py-12">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-medium sm:text-4xl">Featured Products</h2>

            <p className="text-md max-w-80 text-neutral-500 sm:max-w-120">
              Handpicked just for you
            </p>
          </div>

          <Link to="/products" className="text-inherit">
            <Button variant="ghost">
              View All <LuArrowRight />
            </Button>
          </Link>
        </div>

        {isError ? (
          <Error message={error?.message} />
        ) : !featuredProducts?.length && !isLoading ? (
          <Error message="No products found" />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: isLoading ? 6 : featuredProducts?.length }).map((_, i) => {
              const product = featuredProducts?.[i]

              return (
                <ProductCard
                  key={i}
                  isLoading={isLoading || isLoadingWishlist}
                  product={product}
                  wishlist={wishlist}
                />
              )
            })}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-neutral-100">
        <div className="container flex flex-col items-center py-12 text-center">
          <h2 className="mb-8 text-3xl font-medium sm:text-4xl">How It Works</h2>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-4">
              <span className="flex-center bg-accent-500/25 text-accent-600 dark:text-accent-400 aspect-square w-fit rounded-xl p-3 text-2xl">
                <LuShoppingBag />
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-medium capitalize">Browse Products</span>
                <span className="text-sm text-neutral-600">
                  Explore our wide range of premium products
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <span className="flex-center bg-accent-500/25 text-accent-600 dark:text-accent-400 aspect-square w-fit rounded-xl p-3 text-2xl">
                <LuCreditCard />
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-medium capitalize">Add to Cart</span>
                <span className="text-sm text-neutral-600">
                  Select your favorites and add them to your cart
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <span className="flex-center bg-accent-500/25 text-accent-600 dark:text-accent-400 aspect-square w-fit rounded-xl p-3 text-2xl">
                <LuShoppingBag />
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-medium capitalize">Order &amp; Receive</span>
                <span className="text-sm text-neutral-600">
                  Place your order and get it delivered to your doorstep
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="from-accent-700 to-accent-500 flex flex-col items-center rounded-xl bg-linear-to-br py-12 text-center text-neutral-50 selection:bg-neutral-50/15 dark:text-neutral-950 dark:selection:bg-neutral-950/15">
          <LuMail className="mb-4 text-4xl" />
          <h1 className="mb-2 text-3xl font-medium sm:text-4xl">Stay Updated</h1>
          <p className="text-md mb-8 max-w-80 text-neutral-50/85 sm:max-w-120 dark:text-neutral-950/85">
            Subscribe to our newsletter and get exclusive deals and new arrivals first.
          </p>
          <form onSubmit={handleSubmit(() => reset())} className="flex items-start gap-2">
            <FormField
              name="email"
              register={register}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              placeholder="Enter your email"
              className="border-neutral-50/25 bg-neutral-50/15 text-neutral-50 placeholder:text-neutral-50/50 focus:border-neutral-50/85 max-sm:text-sm dark:border-neutral-950/25 dark:bg-neutral-950/15 dark:text-neutral-950 dark:placeholder:text-neutral-950/50 dark:focus:border-neutral-950/85"
            />
            <Button
              type="submit"
              variant="custom"
              className="text-accent-500 bg-neutral-50 hover:bg-neutral-50/85 max-sm:text-sm dark:bg-neutral-950 dark:hover:bg-neutral-950/85"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
