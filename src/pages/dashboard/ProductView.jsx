import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductById } from '@/api/hooks/useProducts'
import ProductGallery from "@/pages/store/product-details/ProductGallery";
import ProductInfo from "@/pages/store/product-details/ProductInfo";
import ProductReviews from "@/pages/store/product-details/ProductReviews";
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import {
  LuEye,
  LuArrowLeft,
} from "react-icons/lu";
export default function AdminProductView() {
  const { id } = useParams()
const {
  data,
  isLoading,
  isError,
} = useGetProductById(id)
const navigate = useNavigate()
if (isLoading) return <LoadingSpinner />

if (isError) return <h1>Product not found</h1>

const product = data.product

return (
  
  <>

  <div className="rounded-3xl bg-gradient-to-r from-slate-950 to-slate-800 p-8 text-white">
    <button onClick={()=>{navigate('/dashboard/products')}} className="mb-5 flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white">
      <LuArrowLeft size={18} />
      <span>Back</span>
    </button>

    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
        <LuEye size={24} />
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {product.name}
        </h1>

        <p className="mt-1 text-sm text-white/60">
          Product details overview
        </p>
      </div>
    </div>
  </div>

  
  <div className="mt-6 grid gap-6 lg:grid-cols-2">
  
    <div className="space-y-6">
      <ProductGallery product={product} />
    </div>

    <div className="space-y-6">
      <ProductInfo product={product} />
    </div>
  </div>

  
</>
)
}