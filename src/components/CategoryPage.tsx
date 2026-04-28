'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProductCard from './ProductCard'
import type { Product } from '@/lib/products'
import { SlidersHorizontal, X } from 'lucide-react'

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating'

interface Props {
  title: string
  description: string
  products: Product[]
  breadcrumb: string
}

export default function CategoryPage({ title, description, products, breadcrumb }: Props) {
  const [sort, setSort] = useState<SortOption>('featured')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedBadges, setSelectedBadges] = useState<string[]>([])

  function toggleBadge(badge: string) {
    setSelectedBadges((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]
    )
  }

  const sorted = [...products]
    .filter((p) => selectedBadges.length === 0 || (p.badge && selectedBadges.includes(p.badge)))
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      return 0
    })

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-[#1E3FA3] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{breadcrumb}</span>
          </nav>
        </div>
      </div>

      {/* Category header */}
      <div className="bg-gray-50 py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-500 max-w-lg mx-auto">{description}</p>
        </div>
      </div>

      {/* Filters & Sort bar */}
      <div className="sticky top-16 z-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal size={15} />
              Filters
              {selectedBadges.length > 0 && (
                <span className="w-4 h-4 bg-[#1E3FA3] text-white text-[10px] rounded-full flex items-center justify-center">
                  {selectedBadges.length}
                </span>
              )}
            </button>

            {selectedBadges.map((badge) => (
              <button
                key={badge}
                onClick={() => toggleBadge(badge)}
                className="flex items-center gap-1 text-xs px-2.5 py-1 bg-[#1E3FA3] text-white rounded-full"
              >
                {badge} <X size={10} />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 hidden sm:block">{sorted.length} products</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="text-sm border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-gray-500 bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Filter panel */}
        {filterOpen && (
          <div className="border-t border-gray-100 px-4 sm:px-6 lg:px-8 py-3 bg-gray-50">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold text-gray-500 self-center mr-2">Filter by:</span>
              {['NEW', 'SALE', 'BESTSELLER'].map((badge) => (
                <button
                  key={badge}
                  onClick={() => toggleBadge(badge)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    selectedBadges.includes(badge)
                      ? 'bg-[#1E3FA3] text-white border-[#1E3FA3]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                  }`}
                >
                  {badge}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {sorted.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">No products found</p>
            <button
              onClick={() => setSelectedBadges([])}
              className="text-sm text-[#1E3FA3] underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
