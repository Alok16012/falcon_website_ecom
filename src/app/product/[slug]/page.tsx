import Link from 'next/link'
import { getProductBySlug, getRelatedProducts } from '@/lib/products'
import ProductDetail from '@/components/ProductDetail'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
          <p className="text-gray-500 mb-6">The product you are looking for does not exist.</p>
          <Link href="/collection" className="btn-primary inline-block">Browse All Products</Link>
        </div>
      </div>
    )
  }

  const related = await getRelatedProducts(product, 4)
  return <ProductDetail product={product} related={related} />
}
