import CategoryPage from '@/components/CategoryPage'
import { getFeaturedProducts } from '@/lib/products'

export const metadata = { title: 'All Collection — Falcon Plus Bags' }

export default function CollectionPage() {
  const products = getFeaturedProducts(100)
  return (
    <CategoryPage
      title="Full Collection"
      description="Explore the complete Falcon Plus range — backpacks, duffel bags, and luggage, all in one place."
      products={products}
      breadcrumb="Collection"
    />
  )
}
