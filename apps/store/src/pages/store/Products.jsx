import ActiveFilters from '@/components/products/ActiveFilters'
import FilterSection from '@/components/products/FilterSection'
import StoreProductCards from '@/components/products/StoreProductCards'
import { useSearchParamsForm } from '@repo/utils/forms'
import { LuSearch } from 'react-icons/lu'
import { FormField } from '@repo/ui'
import { useEffect } from 'react'

export default function Products() {
  const form = useSearchParamsForm({
    mode: 'onTouched',
    debounceMs: 500,
    unDebouncedFields: ['category', 'sort'],
    defaultValues: {
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sort: '',
    },
  })

  const {
    register,
    handleSubmit,
    updateParams,
    setValue,
    trigger,
    urlValues,
    formState: { errors },
  } = form

  const { minPrice, maxPrice, sort } = urlValues

  useEffect(() => {
    if (minPrice || maxPrice) {
      trigger(['minPrice', 'maxPrice'])
    }
  }, [minPrice, maxPrice, trigger])

  return (
    <form
      onSubmit={handleSubmit(updateParams)}
      className="space-y-6 py-6 md:py-10"
    >
      <div className="w-full space-y-4">
        <FormField
          name="search"
          icon={<LuSearch />}
          placeholder="Search products..."
          register={register}
          className="w-full"
        />
        <ActiveFilters urlValues={urlValues} setValue={setValue} />
      </div>

      <div className="flex flex-col items-start gap-6 md:flex-row">
        <FilterSection
          register={register}
          setValue={setValue}
          sort={sort}
          errors={errors}
        />
        <StoreProductCards />
      </div>
    </form>
  )
}
