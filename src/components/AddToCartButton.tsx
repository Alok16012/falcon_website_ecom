'use client'

import { useState } from 'react'
import { ShoppingBag, Check } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import type { Product } from '@/lib/products'

interface Props {
  product: Product
  selectedColor: string
  selectedSize?: string
  className?: string
}

export default function AddToCartButton({ product, selectedColor, selectedSize, className }: Props) {
  const [state, setState] = useState<'idle' | 'adding' | 'added'>('idle')
  const { addItem } = useCartStore()

  function handleAdd() {
    setState('adding')
    addItem({
      id: `${product.id}-${selectedColor}-${selectedSize ?? ''}`,
      slug: product.slug,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
    })
    setState('added')
    setTimeout(() => setState('idle'), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      disabled={state === 'adding'}
      className={`flex items-center justify-center gap-2.5 py-4 text-sm font-bold tracking-wide transition-colors ${
        state === 'added'
          ? 'bg-green-600 text-white'
          : 'bg-[#1E3FA3] text-white hover:bg-[#162D80]'
      } ${className ?? 'w-full'}`}
    >
      {state === 'added' ? (
        <><Check size={18} /> Added to Cart!</>
      ) : (
        <><ShoppingBag size={18} /> Add to Cart</>
      )}
    </button>
  )
}
