'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Check, Shield, RotateCcw, Truck, ChevronDown } from 'lucide-react'
import AddToCartButton from '@/components/AddToCartButton'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/products'

interface Props {
  product: Product
  related: Product[]
}

export default function ProductDetail({ product, related }: Props) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? '')
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? '')
  const [activeImage, setActiveImage] = useState(0)
  const [openSection, setOpenSection] = useState<string | null>('description')

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100)
  const colorImgs = product.colorImages?.[selectedColor]
  const images = colorImgs && colorImgs.length > 0
    ? colorImgs
    : [product.image, product.hoverImage].filter(Boolean)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/${product.category}`} className="hover:text-black transition-colors capitalize">{product.category}</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Images */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="hidden sm:flex flex-col gap-3 w-20 flex-shrink-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square overflow-hidden rounded border-2 transition-colors ${
                    activeImage === idx ? 'border-[#1E3FA3]' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" unoptimized />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-50">
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                unoptimized
              />
              {product.badge && (
                <div className={`absolute top-4 left-4 px-2.5 py-1 text-xs font-bold tracking-wider rounded ${
                  product.badge === 'SALE' ? 'bg-red-600 text-white' :
                  product.badge === 'NEW' ? 'bg-[#1E3FA3] text-white' :
                  'bg-amber-500 text-white'
                }`}>
                  {product.badge}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-100">
              <span className="text-3xl font-bold text-[#1E3FA3]">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-lg text-gray-400 line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
              <span className="text-sm font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                Save {discount}%
              </span>
            </div>

            {/* Color selector */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-sm font-semibold">Colour:</span>
                <span className="text-sm text-gray-600">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => { setSelectedColor(color); setActiveImage(0) }}
                    className={`px-3 py-1.5 text-sm border rounded transition-colors ${
                      selectedColor === color
                        ? 'border-[#1E3FA3] bg-[#1E3FA3] text-white'
                        : 'border-gray-300 text-gray-700 hover:border-[#1E3FA3]'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-sm font-semibold">Size:</span>
                  <span className="text-sm text-gray-600">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm border rounded transition-colors ${
                        selectedSize === size
                          ? 'border-[#1E3FA3] bg-[#1E3FA3] text-white'
                          : 'border-gray-300 text-gray-700 hover:border-[#1E3FA3]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <div className="mb-6">
              <AddToCartButton
                product={product}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                className="w-full rounded py-4"
              />
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-gray-100">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Above ₹999' },
                { icon: RotateCcw, label: 'Easy Returns', sub: '7-Day Policy' },
                { icon: Shield, label: 'Warranty', sub: '1 Year Coverage' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1">
                  <Icon size={18} className="text-gray-600" />
                  <span className="text-xs font-medium">{label}</span>
                  <span className="text-[11px] text-gray-400">{sub}</span>
                </div>
              ))}
            </div>

            {/* Features quick list */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={14} className="text-green-600 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Accordion sections */}
            <div className="border-t border-gray-100">
              {[
                { key: 'description', title: 'Description', content: product.description },
                { key: 'features', title: 'Features & Specifications', content: product.features.join(' • ') },
                { key: 'shipping', title: 'Shipping & Returns', content: 'Free shipping on orders above ₹999. Standard delivery 3–5 business days. Easy 7-day returns on all products.' },
              ].map(({ key, title, content }) => (
                <div key={key} className="border-b border-gray-100">
                  <button
                    className="w-full flex items-center justify-between py-3.5 text-left"
                    onClick={() => setOpenSection(openSection === key ? null : key)}
                  >
                    <span className="text-sm font-semibold">{title}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform ${openSection === key ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openSection === key && (
                    <p className="text-sm text-gray-600 leading-relaxed pb-4">{content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
