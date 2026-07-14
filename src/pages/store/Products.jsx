import InputSearch from '../../components/store/products/InputSearch'
import FilterSection from '../../components/store/products/FilterSection'
import StoreProductCards from '../../components/store/products/StoreProductCards'
import ActiveFilters from '../../components/store/products/ActiveFilters'

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
