'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Package, MapPin, CreditCard, ShoppingBag } from 'lucide-react'
import { Suspense } from 'react'

interface OrderItem {
  name: string; image: string; quantity: number; price: number; color?: string
}
interface Order {
  id: string; date: string; items: OrderItem[]; total: number
  address: { name: string; line1: string; line2?: string; city: string; state: string; pincode: string; phone: string } | null
  payment: string; status: string
}

function payLabel(p: string) {
  const m: Record<string, string> = { cod: 'Cash on Delivery', upi: 'UPI', card: 'Credit/Debit Card', wallet: 'Wallet' }
  return m[p] ?? p
}

function SuccessContent() {
  const params = useSearchParams()
  const orderId = params.get('id') ?? ''
  const [order, setOrder] = useState<Order | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const orders: Order[] = JSON.parse(localStorage.getItem('fp_orders') || '[]')
    const found = orders.find(o => o.id === orderId)
    if (found) setOrder(found)
  }, [orderId])

  if (!mounted) return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-gray-400 text-sm">Loading...</div></div>

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">

        {/* Success banner */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-4">
            <CheckCircle size={44} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Order Placed!</h1>
          <p className="text-gray-500 text-sm mb-4">Thank you for shopping with Falcon Plus</p>
          <div className="inline-block bg-[#EBF0FB] px-4 py-2 rounded-lg">
            <span className="text-xs text-gray-500">Order ID: </span>
            <span className="text-sm font-bold text-[#1E3FA3]">#{orderId}</span>
          </div>
        </div>

        {order && (
          <>
            {/* Items */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <Package size={16} className="text-[#1E3FA3]" />
                <h2 className="text-sm font-bold text-gray-900">Items Ordered ({order.items.length})</h2>
              </div>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="w-10 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 line-clamp-1">{item.name}</p>
                      {item.color && <p className="text-[10px] text-gray-400">{item.color}</p>}
                    </div>
                    <div className="text-right text-xs">
                      <p className="text-gray-400">×{item.quantity}</p>
                      <p className="font-semibold text-gray-800">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-4 pt-3 flex justify-between font-bold text-sm">
                <span>Total Paid</span>
                <span className="text-[#1E3FA3]">₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Delivery + Payment */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-[#1E3FA3]" />
                  <span className="text-xs font-bold text-gray-900">Deliver To</span>
                </div>
                {order.address ? (
                  <div className="text-xs text-gray-500 leading-relaxed">
                    <p className="font-semibold text-gray-700">{order.address.name}</p>
                    <p>{order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ''}</p>
                    <p>{order.address.city}, {order.address.state} – {order.address.pincode}</p>
                    <p className="mt-1 text-gray-400">{order.address.phone}</p>
                  </div>
                ) : <p className="text-xs text-gray-400">—</p>}
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard size={14} className="text-[#1E3FA3]" />
                  <span className="text-xs font-bold text-gray-900">Payment</span>
                </div>
                <p className="text-xs font-semibold text-gray-700">{payLabel(order.payment)}</p>
                <div className="mt-2">
                  <span className="inline-block bg-green-50 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Expected delivery */}
        <div className="bg-[#EBF0FB] rounded-2xl p-5 text-center mb-6">
          <Package size={24} className="text-[#1E3FA3] mx-auto mb-2" />
          <p className="text-sm font-semibold text-[#1E3FA3]">Expected Delivery</p>
          <p className="text-xs text-gray-600 mt-1">3–5 business days</p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/account" className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#1E3FA3] text-[#1E3FA3] text-sm font-semibold rounded-xl hover:bg-[#EBF0FB] transition-colors">
            <Package size={15} /> View My Orders
          </Link>
          <Link href="/collection" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1E3FA3] text-white text-sm font-semibold rounded-xl hover:bg-[#162D80] transition-colors">
            <ShoppingBag size={15} /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
      <SuccessContent />
    </Suspense>
  )
}
