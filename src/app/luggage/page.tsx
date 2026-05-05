import CategoryPage from '@/components/CategoryPage'
import { getProductsByCategory } from '@/lib/products'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Luggage — Falcon Plus Bags' }

export default async function LuggagePage() {
  const products = await getProductsByCategory('luggage')
  return (
    <CategoryPage
      title="Luggage"
      description="Travel light, travel right. Our AeroGlide series combines lightweight polycarbonate shells with 360° spinner wheels for a seamless journey every time."
      products={products}
      breadcrumb="Luggage"
    />
  )
}
