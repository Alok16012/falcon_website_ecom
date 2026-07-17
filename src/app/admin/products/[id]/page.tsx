import ProductForm from '@/components/admin/ProductForm'
import { createClient } from '@supabase/supabase-js'

// Never serve a stale product into the edit form — saving a stale form
// would overwrite newer data. Disable Next's data cache for this page.
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Always read from Supabase so edits are consistent with what's saved
async function getProduct(id: string) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        global: {
          fetch: (input: RequestInfo | URL, init?: RequestInit) =>
            fetch(input, { ...init, cache: 'no-store' }),
        },
      }
    )
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return null

    // color_images carries both the per-colour image map and a __size_prices key.
    // Split them back apart so the form receives colorImages + sizePrices separately.
    const rawColorImages: Record<string, unknown> = data.color_images ?? {}
    // Runtime values are numbers; ProductForm coerces them to strings via String().
    const sizePrices = (rawColorImages.__size_prices ?? undefined) as
      | Record<string, { price: string; mrp: string }>
      | undefined
    const colorImages = Object.fromEntries(
      Object.entries(rawColorImages).filter(([k]) => k !== '__size_prices')
    ) as Record<string, string[]>

    // Normalise DB row → form shape
    return {
      id: data.id,
      slug: data.slug,
      name: data.name,
      category: data.category,
      price: data.price,
      mrp: data.mrp,
      badge: data.badge ?? '',
      rating: data.rating,
      reviews: data.reviews,
      image: data.image ?? '',
      hoverImage: data.hover_image ?? '',
      description: data.description ?? '',
      colors: Array.isArray(data.colors) ? data.colors : [],
      sizes: Array.isArray(data.sizes) ? data.sizes : [],
      features: Array.isArray(data.features) ? data.features : [],
      inStock: data.in_stock ?? true,
      colorImages,
      sizePrices,
    }
  } catch {
    return null
  }
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-700 font-semibold mb-1">Product not found</p>
          <p className="text-gray-400 text-sm">ID: {params.id}</p>
        </div>
      </div>
    )
  }

  return <ProductForm mode="edit" initial={product} />
}
