import CategoryPage from '@/components/CategoryPage'
import { getProductsByCategory } from '@/lib/products'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Duffel Bags — Falcon Plus Bags' }

export default async function DuffelsPage() {
  const products = await getProductsByCategory('duffels')
  return (
    <CategoryPage
      title="Duffel Bags"
      description="From gym sessions to weekend getaways, our duffel bags are engineered for versatility. Spacious, durable, and stylish — for wherever life takes you."
      products={products}
      breadcrumb="Duffels"
    />
  )
}
