'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit2, Trash2, AlertCircle } from 'lucide-react'

interface Product {
  id: string
  name: string
  category: string
  price: number
  mrp: number
  badge: string | null
  inStock: boolean
  image: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('all')
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    fetch('/api/admin/products').then(r => r.json()).then(d => {
      setProducts(d)
      setFiltered(d)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    let list = products
    if (cat !== 'all') list = list.filter(p => p.category === cat)
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    setFiltered(list)
  }, [search, cat, products])

  async function handleDelete(id: string) {
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setProducts(prev => prev.filter(p => p.id !== id))
      showToast('Product deleted successfully')
    }
    setDeleteId(null)
  }

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const discount = (p: Product) => Math.round(((p.mrp - p.price) / p.mrp) * 100)

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white text-sm px-4 py-3 rounded-lg shadow-lg animate-fadeIn">
          ✓ {toast}
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={22} className="text-red-600" />
            </div>
            <h3 className="text-base font-bold text-center mb-1">Delete Product?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-0.5">{filtered.length} products found</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-[#1E3FA3] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-[#162D80] transition-colors"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3]"
          />
        </div>
        <select
          value={cat}
          onChange={e => setCat(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1E3FA3] bg-white"
        >
          <option value="all">All Categories</option>
          <option value="backpacks">Backpacks</option>
          <option value="duffels">Duffels</option>
          <option value="luggage">Luggage</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wide">Product</th>
                <th className="text-left px-3 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wide hidden md:table-cell">Category</th>
                <th className="text-left px-3 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wide">Price</th>
                <th className="text-left px-3 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wide hidden sm:table-cell">Discount</th>
                <th className="text-left px-3 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wide hidden lg:table-cell">Badge</th>
                <th className="text-left px-3 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wide hidden lg:table-cell">Stock</th>
                <th className="text-right px-5 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7} className="px-5 py-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">
                    No products found
                  </td>
                </tr>
              ) : filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#EBF0FB] flex-shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-xs leading-snug">{p.name}</p>
                        <p className="text-[11px] text-gray-400">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 hidden md:table-cell">
                    <span className="capitalize text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{p.category}</span>
                  </td>
                  <td className="px-3 py-4">
                    <p className="text-xs font-bold text-[#1E3FA3]">₹{p.price.toLocaleString('en-IN')}</p>
                    <p className="text-[11px] text-gray-400 line-through">₹{p.mrp.toLocaleString('en-IN')}</p>
                  </td>
                  <td className="px-3 py-4 hidden sm:table-cell">
                    <span className="text-xs font-semibold text-green-600">{discount(p)}% off</span>
                  </td>
                  <td className="px-3 py-4 hidden lg:table-cell">
                    {p.badge ? (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        p.badge === 'SALE' ? 'bg-red-100 text-red-600' :
                        p.badge === 'NEW' ? 'bg-blue-100 text-[#1E3FA3]' :
                        'bg-amber-100 text-amber-700'
                      }`}>{p.badge}</span>
                    ) : <span className="text-gray-300 text-xs">—</span>}
                  </td>
                  <td className="px-3 py-4 hidden lg:table-cell">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="p-1.5 hover:bg-[#EBF0FB] rounded-lg transition-colors text-[#1E3FA3]"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-gray-400 hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
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
