import CategoryPage from '@/components/CategoryPage'
import { products } from '@/lib/products'

export const metadata = { title: 'All Collection — Falcon Plus Bags' }

export default function CollectionPage() {
  return (
    <CategoryPage
      title="Full Collection"
      description="Explore the complete Falcon Plus range — backpacks, duffel bags, and luggage, all in one place."
      products={products}
      breadcrumb="Collection"
    />
  )
}
