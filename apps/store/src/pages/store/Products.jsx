import ActiveFilters from '@/components/products/ActiveFilters'
import FilterSection from '@/components/products/FilterSection'
import InputSearch from '@/components/products/InputSearch'
import StoreProductCards from '@/components/products/StoreProductCards'

export default function Products() {
  return (
    <section className="space-y-6 py-6 md:py-10">
      <div className="w-full space-y-4">
        <InputSearch />
        <ActiveFilters />
      </div>

      <div className="flex flex-col items-start gap-6 md:flex-row">
        <FilterSection />
        <StoreProductCards />
      </div>
    </section>
  )
}
