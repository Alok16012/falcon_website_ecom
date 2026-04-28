import ProductForm from '@/components/admin/ProductForm'

async function getProduct(id: string) {
  try {
    const fs = await import('fs')
    const path = await import('path')
    const dataPath = path.join(process.cwd(), 'data', 'products.json')
    const products = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    return products.find((p: { id: string }) => p.id === id) ?? null
  } catch {
    return null
  }
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Product not found.</p>
      </div>
    )
  }

  return <ProductForm mode="edit" initial={product} />
}
