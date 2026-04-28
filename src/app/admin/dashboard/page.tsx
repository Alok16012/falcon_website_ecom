'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Package, Image as ImageIcon, TrendingUp, Tag, Plus, ArrowRight } from 'lucide-react'

interface Product {
  id: string
  name: string
  category: string
  price: number
  mrp: number
  badge: string | null
  inStock: boolean
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/products')
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const totalProducts = products.length
  const backpacks = products.filter((p) => p.category === 'backpacks').length
  const duffels = products.filter((p) => p.category === 'duffels').length
  const luggage = products.filter((p) => p.category === 'luggage').length
  const onSale = products.filter((p) => p.badge === 'SALE').length
  const avgDiscount = products.length
    ? Math.round(products.reduce((s, p) => s + ((p.mrp - p.price) / p.mrp) * 100, 0) / products.length)
    : 0

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-0.5">Welcome back! Here&apos;s an overview of your store.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Products', value: loading ? '...' : totalProducts, icon: Package, color: 'bg-[#1E3FA3]', sub: 'across all categories' },
          { label: 'On Sale', value: loading ? '...' : onSale, icon: Tag, color: 'bg-red-500', sub: 'products with SALE badge' },
          { label: 'Avg Discount', value: loading ? '...' : `${avgDiscount}%`, icon: TrendingUp, color: 'bg-green-600', sub: 'off MRP across all' },
          { label: 'Hero Banners', value: '3', icon: ImageIcon, color: 'bg-purple-600', sub: 'active slides' },
        ].map(({ label, value, icon: Icon, color, sub }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center`}>
                <Icon size={17} className="text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs font-semibold text-gray-700 mt-0.5">{label}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Products by Category</h2>
          <div className="space-y-3">
            {[
              { label: 'Backpacks', count: backpacks, total: totalProducts, color: 'bg-[#1E3FA3]' },
              { label: 'Duffel Bags', count: duffels, total: totalProducts, color: 'bg-purple-500' },
              { label: 'Luggage', count: luggage, total: totalProducts, color: 'bg-green-500' },
            ].map(({ label, count, total, color }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">{label}</span>
                  <span className="text-gray-400">{count} products</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color} rounded-full transition-all duration-500`}
                    style={{ width: total ? `${(count / total) * 100}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2.5">
            {[
              { label: 'Add New Product', href: '/admin/products/new', icon: Plus, color: 'text-[#1E3FA3] bg-[#EBF0FB]' },
              { label: 'Manage All Products', href: '/admin/products', icon: Package, color: 'text-purple-600 bg-purple-50' },
              { label: 'Edit Hero Banners', href: '/admin/banners', icon: ImageIcon, color: 'text-green-600 bg-green-50' },
              { label: 'View Store', href: '/', icon: ArrowRight, color: 'text-gray-600 bg-gray-100' },
            ].map(({ label, href, icon: Icon, color }) => (
              <Link
                key={label}
                href={href}
                target={href === '/' ? '_blank' : undefined}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon size={15} />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{label}</span>
                <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-gray-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent products table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-900">All Products</h2>
          <Link href="/admin/products" className="text-xs font-semibold text-[#1E3FA3] hover:underline">
            Manage →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Product</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Category</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">MRP</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Badge</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400 text-sm">Loading...</td></tr>
              ) : products.slice(0, 6).map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900 text-xs">{p.name}</p>
                  </td>
                  <td className="px-3 py-3 hidden md:table-cell">
                    <span className="text-xs capitalize text-gray-500">{p.category}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-xs font-bold text-[#1E3FA3]">₹{p.price.toLocaleString('en-IN')}</span>
                  </td>
                  <td className="px-3 py-3 hidden sm:table-cell">
                    <span className="text-xs text-gray-400 line-through">₹{p.mrp.toLocaleString('en-IN')}</span>
                  </td>
                  <td className="px-3 py-3 hidden lg:table-cell">
                    {p.badge ? (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        p.badge === 'SALE' ? 'bg-red-100 text-red-600' :
                        p.badge === 'NEW' ? 'bg-blue-100 text-[#1E3FA3]' :
                        'bg-amber-100 text-amber-700'
                      }`}>{p.badge}</span>
                    ) : <span className="text-gray-300 text-xs">—</span>}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/admin/products/${p.id}`} className="text-xs font-semibold text-[#1E3FA3] hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
