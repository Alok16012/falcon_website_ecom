import { createClient } from '@supabase/supabase-js'
import localProducts from '../../data/products.json'

export interface SizePrice {
  price: number
  mrp: number
}

export interface Product {
  id: string
  slug: string
  name: string
  category: 'backpacks' | 'duffels' | 'luggage'
  price: number
  mrp: number
  badge?: 'NEW' | 'SALE' | 'BESTSELLER' | null
  rating: number
  reviews: number
  image: string
  hoverImage: string
  description: string
  colors: string[]
  sizes?: string[]
  features: string[]
  inStock: boolean
  colorImages?: Record<string, string[]>
  /** Per-size pricing — stored inside color_images JSONB as __size_prices key */
  sizePrices?: Record<string, SizePrice>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const localColorImages: Record<string, Record<string, string[]>> = Object.fromEntries(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (localProducts as any[])
    .filter(p => p.colorImages)
    .map(p => [p.id, p.colorImages])
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProduct(row: any): Product {
  // Merge: local colorImages as base, Supabase color_images overrides/extends
  // (Supabase color_images also carries __size_prices key — extract and separate)
  const localCI: Record<string, unknown> = localColorImages[row.id] ?? {}
  const supabaseCI: Record<string, unknown> = row.color_images ?? {}
  const rawColorImages: Record<string, unknown> = { ...localCI, ...supabaseCI }
  const sizePrices = rawColorImages.__size_prices as Record<string, SizePrice> | undefined
  const colorImages: Record<string, string[]> = Object.fromEntries(
    Object.entries(rawColorImages).filter(([k]) => k !== '__size_prices')
  ) as Record<string, string[]>

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    mrp: Number(row.mrp),
    badge: row.badge ?? null,
    rating: Number(row.rating),
    reviews: Number(row.reviews),
    image: row.image ?? '',
    hoverImage: row.hover_image ?? '',
    description: row.description ?? '',
    colors: row.colors ?? [],
    sizes: row.sizes ?? [],
    features: row.features ?? [],
    inStock: Boolean(row.in_stock),
    colorImages: Object.keys(colorImages).length ? colorImages : undefined,
    sizePrices: sizePrices ?? undefined,
  }
}

function client() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        // force Next.js NOT to cache Supabase fetch responses
        fetch: (url: RequestInfo | URL, options: RequestInit = {}) =>
          fetch(url, { ...options, cache: 'no-store' }),
      },
    }
  )
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data } = await client().from('products').select('*').eq('category', category)
  return (data ?? []).map(toProduct)
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const { data } = await client().from('products').select('*').eq('slug', slug).single()
  return data ? toProduct(data) : undefined
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const { data } = await client().from('products').select('*').limit(limit)
  return (data ?? []).map(toProduct)
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const { data } = await client()
    .from('products')
    .select('*')
    .eq('category', product.category)
    .neq('id', product.id)
    .limit(limit)
  return (data ?? []).map(toProduct)
}

export const categories = [
  {
    name: 'Duffel Bags',
    slug: 'duffels',
    description: 'Gym, travel, and everything in between',
    image: '/uploads/corporate/duffle-city.jpg',
    count: 4,
  },
  {
    name: 'Luggage',
    slug: 'luggage',
    description: 'Sleek trolleys for every journey',
    image: '/uploads/luggage/lg-blue-combo.jpg',
    count: 4,
  },
  {
    name: 'Corporate Gifting',
    slug: 'corporate-gifting',
    description: 'Bespoke gifting solutions for your team',
    image: '/uploads/corporate/trolley-podium.jpg',
    count: 0,
  },
  {
    name: 'Backpacks',
    slug: 'backpacks',
    description: 'From daily commuters to weekend explorers',
    image: '',
    count: 0,
    comingSoon: true,
  },
]
