import CategoryPage from '@/components/CategoryPage'
import { getProductsByCategory } from '@/lib/products'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Backpacks — Falcon Plus Bags' }

export default async function BackpacksPage() {
  const products = await getProductsByCategory('backpacks')
  return (
    <CategoryPage
      title="Backpacks"
      description="Discover our premium collection of backpacks designed for modern lifestyles. From laptop compartments to travel-friendly features, find your perfect companion."
      products={products}
      breadcrumb="Backpacks"
    />
  )
}
