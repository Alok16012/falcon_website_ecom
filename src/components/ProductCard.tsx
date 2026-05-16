'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, Star } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import type { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [added, setAdded] = useState(false)
  const { addItem } = useCartStore()

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100)

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      image: product.image,
      color: product.colors[0],
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#EBF0FB] rounded-xl mb-3 aspect-[4/5]">
        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-2.5 left-2.5 z-10 px-2 py-0.5 text-[10px] font-bold tracking-wider rounded ${
            product.badge === 'SALE' ? 'bg-red-600 text-white' :
            product.badge === 'NEW' ? 'bg-[#1E3FA3] text-white' :
            product.badge === 'BESTSELLER' ? 'bg-amber-500 text-white' :
            'bg-[#1E3FA3] text-white'
          }`}>
            {product.badge}
          </div>
        )}

        {/* Discount */}
        {discount > 0 && (
          <div className="absolute top-2.5 right-2.5 z-10 bg-white border border-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-[#1E3FA3] rounded">
            -{discount}%
          </div>
        )}

        <Image
          src={hovered ? product.hoverImage : product.image}
          alt={product.name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
        />

        {/* Add to cart — always visible on mobile, hover-reveal on desktop */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:opacity-0 sm:translate-y-full sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 text-xs font-bold tracking-wide rounded flex items-center justify-center gap-2 transition-colors ${
              added ? 'bg-green-600 text-white' : 'bg-white text-[#1E3FA3] hover:bg-[#EBF0FB]'
            }`}
          >
            <ShoppingBag size={13} />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-1.5 group-hover:text-[#1E3FA3] transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />
            ))}
          </div>
          <span className="text-[11px] text-gray-400">{product.rating} ({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-[#1E3FA3]">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="text-xs text-gray-400 line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
        </div>

        {/* Colors */}
        <div className="flex flex-wrap items-center gap-1 mt-2">
          {product.colors.slice(0, 3).map((color) => (
            <span key={color} className="text-[10px] text-[#1E3FA3] bg-[#EBF0FB] px-1.5 py-0.5 rounded">
              {color}
            </span>
          ))}
          {product.colors.length > 3 && (
            <span className="text-[10px] text-gray-400">+{product.colors.length - 3}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
