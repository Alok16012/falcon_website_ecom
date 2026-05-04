import fs from 'fs'
import path from 'path'

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

function loadProducts(): Product[] {
  const dataPath = path.join(process.cwd(), 'data', 'products.json')
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
}

export function getProductsByCategory(category: string): Product[] {
  return loadProducts().filter((p) => p.category === category)
}

export function getProductBySlug(slug: string): Product | undefined {
  return loadProducts().find((p) => p.slug === slug)
}

export function getFeaturedProducts(limit = 8): Product[] {
  return loadProducts().slice(0, limit)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return loadProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit)
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
