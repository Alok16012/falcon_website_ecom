import { createClient } from '@supabase/supabase-js'

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
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProduct(row: any): Product {
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
  }
}

function client() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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
    name: 'Backpacks',
    slug: 'backpacks',
    description: 'From daily commuters to weekend explorers',
    image: 'https://picsum.photos/seed/cat-backpack/800/600',
    count: 6,
  },
  {
    name: 'Duffel Bags',
    slug: 'duffels',
    description: 'Gym, travel, and everything in between',
    image: 'https://picsum.photos/seed/cat-duffel/800/600',
    count: 4,
  },
  {
    name: 'Luggage',
    slug: 'luggage',
    description: 'Sleek trolleys for every journey',
    image: 'https://picsum.photos/seed/cat-luggage/800/600',
    count: 4,
  },
  {
    name: 'Corporate Gifting',
    slug: 'corporate-gifting',
    description: 'Bespoke gifting solutions for your team',
    image: 'https://picsum.photos/seed/cat-corporate/800/600',
    count: 0,
  },
]
