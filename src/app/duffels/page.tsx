import CategoryPage from '@/components/CategoryPage'
import { getProductsByCategory } from '@/lib/products'

export const metadata = { title: 'Duffel Bags — Falcon Plus Bags' }

export default function DuffelsPage() {
  const products = getProductsByCategory('duffels')
  return (
    <CategoryPage
      title="Duffel Bags"
      description="From gym sessions to weekend getaways, our duffel bags are engineered for versatility. Spacious, durable, and stylish — for wherever life takes you."
      products={products}
      breadcrumb="Duffels"
    />
  )
}
