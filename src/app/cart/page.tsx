'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Minus, X, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCartStore()

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading cart...</div>
      </div>
    )
  }
  const subtotal = totalPrice()
  const count = totalItems()
  const shipping = subtotal >= 999 ? 0 : 99
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="text-center py-20 px-4">
          <ShoppingBag size={64} className="text-gray-200 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Looks like you haven&apos;t added anything yet. Explore our collection to find your perfect bag.
          </p>
          <Link href="/collection" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Your Cart <span className="text-gray-400 font-normal text-lg">({count} {count === 1 ? 'item' : 'items'})</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {shipping === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700 font-medium flex items-center gap-2">
                🎉 You qualify for free shipping!
              </div>
            )}
            {shipping > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-700">
                Add <strong>₹{(999 - subtotal).toLocaleString('en-IN')}</strong> more to get free shipping!
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 sm:p-5">
                  <Link href={`/product/${item.slug}`} className="relative w-24 h-28 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                      unoptimized
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link href={`/product/${item.slug}`} className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors line-clamp-2">
                          {item.name}
                        </Link>
                        <div className="flex flex-wrap gap-x-3 mt-1">
                          {item.color && <span className="text-xs text-gray-500">Colour: {item.color}</span>}
                          {item.size && <span className="text-xs text-gray-500">Size: {item.size}</span>}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400">₹{item.price.toLocaleString('en-IN')} each</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <Link href="/collection" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1E3FA3] transition-colors">
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-bold mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({count} items)</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Promo code */}
              <div className="mb-5">
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:border-gray-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-[#1E3FA3] text-white py-3.5 text-sm font-semibold rounded hover:bg-[#162D80] transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </Link>

              <div className="mt-4 space-y-1.5">
                {['Secure checkout', 'Free returns', 'COD available'].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="text-green-500">✓</span> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Accepted payments */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400 mb-2">We accept</p>
              <div className="flex items-center justify-center gap-3 text-xs text-gray-500">
                {['Visa', 'Mastercard', 'UPI', 'NetBanking', 'COD'].map((m) => (
                  <span key={m} className="border border-gray-200 px-2 py-1 rounded text-[10px]">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
