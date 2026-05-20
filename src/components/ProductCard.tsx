'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, Star, Heart } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import type { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [added, setAdded] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
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

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setWishlisted((w) => !w)
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden bg-[#F4F7FE] aspect-[4/5]">
        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full shadow-sm ${
            product.badge === 'SALE' ? 'bg-red-500 text-white' :
            product.badge === 'NEW' ? 'bg-[#1E3FA3] text-white' :
            product.badge === 'BESTSELLER' ? 'bg-amber-500 text-white' :
            'bg-[#1E3FA3] text-white'
          }`}>
            {product.badge}
          </div>
        )}

        {/* Discount pill — stacked below badge if badge present */}
        {discount > 0 && (
          <div className={`absolute ${product.badge ? 'top-10' : 'top-3'} left-3 z-10 bg-green-50 border border-green-200 px-2 py-0.5 text-[10px] font-bold text-green-700 rounded-full`}>
            -{discount}%
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-sm hover:scale-110 transition-transform"
          aria-label="Wishlist"
        >
          <Heart
            size={13}
            className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>

        <Image
          src={hovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
        />

        {/* Add to cart overlay */}
        <div className="absolute inset-x-0 bottom-0 px-3 pb-3 sm:opacity-0 sm:translate-y-2 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 text-[11px] font-bold tracking-wide rounded-xl flex items-center justify-center gap-2 shadow transition-colors ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-white/95 backdrop-blur-sm text-[#1E3FA3] hover:bg-[#1E3FA3] hover:text-white'
            }`}
          >
            <ShoppingBag size={13} />
            {added ? 'Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3 className="text-[13px] font-semibold text-gray-800 leading-snug mb-1.5 group-hover:text-[#1E3FA3] transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-gray-200 text-gray-200'
                }
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400 font-medium">
            {product.rating} <span className="text-gray-300">·</span> {product.reviews} reviews
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-bold text-[#1E3FA3]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-gray-400 line-through">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
          </div>
          {discount > 0 && (
            <span className="text-[10px] font-bold text-green-600 hidden sm:block">
              Save ₹{(product.mrp - product.price).toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Colors */}
        <div className="flex flex-wrap items-center gap-1 mt-2.5 pt-2.5 border-t border-gray-100">
          {product.colors.slice(0, 3).map((color) => (
            <span
              key={color}
              className="text-[10px] text-gray-600 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full"
            >
              {color}
            </span>
          ))}
          {product.colors.length > 3 && (
            <span className="text-[10px] text-gray-400 font-medium">+{product.colors.length - 3} more</span>
          )}
        </div>
      </div>
    </Link>
  )
}
