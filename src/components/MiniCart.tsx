'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'

export default function MiniCart() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore()
  const total = totalPrice()

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={closeCart} />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl animate-slideInRight">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#1E3FA3]" />
            <h2 className="text-base font-semibold tracking-wide">
              Your Cart <span className="text-gray-400 font-normal text-sm">({items.length})</span>
            </h2>
          </div>
          <button onClick={closeCart} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-[#EBF0FB] mb-4" />
              <p className="text-gray-500 mb-6 text-sm">Your cart is empty</p>
              <button onClick={closeCart} className="btn-primary rounded">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-0 divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4">
                  <div className="relative w-20 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium leading-snug mb-1 truncate">{item.name}</h3>
                    {item.color && <p className="text-xs text-gray-400 mb-1">Colour: {item.color}</p>}
                    {item.size && <p className="text-xs text-gray-400 mb-1">Size: {item.size}</p>}
                    <p className="text-sm font-bold text-[#1E3FA3] mb-3">₹{item.price.toLocaleString('en-IN')}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors">
                          <Minus size={11} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors">
                          <Plus size={11} />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-6 py-5 space-y-3 bg-gray-50">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold text-[#1E3FA3]">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-green-600 font-medium">
              {total >= 999 ? '✓ Free shipping applied!' : `Add ₹${(999 - total).toLocaleString('en-IN')} more for free shipping`}
            </p>
            <Link
              href="/cart"
              onClick={closeCart}
              className="btn-primary block text-center rounded"
            >
              View Cart & Checkout
            </Link>
            <button onClick={closeCart} className="w-full text-center text-sm text-gray-400 hover:text-gray-700 transition-colors py-1">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
