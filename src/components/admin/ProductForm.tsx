'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Save, ArrowLeft, Eye } from 'lucide-react'
import ImageUpload from './ImageUpload'

interface ProductData {
  id?: string
  name: string
  category: string
  price: number | string
  mrp: number | string
  badge: string
  rating: number | string
  reviews: number | string
  image: string
  hoverImage: string
  description: string
  colors: string
  sizes: string
  features: string
  inStock: boolean
  slug?: string
}

interface Props {
  initial?: Partial<ProductData> & { id?: string; slug?: string }
  mode: 'new' | 'edit'
}

const defaultData: ProductData = {
  name: '', category: 'backpacks', price: '', mrp: '', badge: '',
  rating: 4.5, reviews: 0, image: '', hoverImage: '',
  description: '', colors: '', sizes: '', features: '', inStock: true,
}

export default function ProductForm({ initial, mode }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<ProductData>({
    ...defaultData,
    ...initial,
    colors: Array.isArray(initial?.colors) ? (initial.colors as string[]).join(', ') : (initial?.colors ?? ''),
    sizes: Array.isArray(initial?.sizes) ? (initial.sizes as string[]).join(', ') : (initial?.sizes ?? ''),
    features: Array.isArray(initial?.features) ? (initial.features as string[]).join('\n') : (initial?.features ?? ''),
  })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  function set(key: keyof ProductData, val: string | boolean | number) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        mrp: Number(form.mrp),
        rating: Number(form.rating),
        reviews: Number(form.reviews),
        colors: form.colors.split(',').map(s => s.trim()).filter(Boolean),
        sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean),
        features: form.features.split('\n').map(s => s.trim()).filter(Boolean),
        badge: form.badge || null,
        hoverImage: form.hoverImage || form.image,
        slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      }

      const url = mode === 'edit' ? `/api/admin/products/${initial?.id}` : '/api/admin/products'
      const method = mode === 'edit' ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        showToast(mode === 'edit' ? 'Product updated!' : 'Product created!')
        setTimeout(() => router.push('/admin/products'), 1000)
      } else {
        showToast('Failed to save. Try again.', 'error')
      }
    } catch {
      showToast('Something went wrong.', 'error')
    }
    setSaving(false)
  }

  const discount = form.price && form.mrp
    ? Math.round(((Number(form.mrp) - Number(form.price)) / Number(form.mrp)) * 100)
    : 0

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 text-white text-sm px-4 py-3 rounded-lg shadow-lg animate-fadeIn ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.type === 'success' ? '✓' : '✗'} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{mode === 'new' ? 'Add New Product' : 'Edit Product'}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{mode === 'edit' ? `ID: ${initial?.id}` : 'Fill in the product details below'}</p>
          </div>
        </div>
        {mode === 'edit' && initial?.slug && (
          <Link
            href={`/product/${initial.slug}`}
            target="_blank"
            className="flex items-center gap-2 text-sm text-[#1E3FA3] border border-[#1E3FA3]/30 px-3 py-2 rounded-lg hover:bg-[#EBF0FB] transition-colors"
          >
            <Eye size={14} /> Preview
          </Link>
        )}
      </div>

      <form onSubmit={handleSave}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main fields */}
          <div className="lg:col-span-2 space-y-5">
            {/* Basic Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Product Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    className="w-full border border-gray-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3] focus:ring-2 focus:ring-[#1E3FA3]/10"
                    placeholder="e.g. City Commuter Pro 35L"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3] focus:ring-2 focus:ring-[#1E3FA3]/10 resize-none"
                    placeholder="Describe the product..."
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                    Features <span className="text-gray-400 font-normal">(one per line)</span>
                  </label>
                  <textarea
                    value={form.features}
                    onChange={e => set('features', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3] focus:ring-2 focus:ring-[#1E3FA3]/10 resize-none font-mono"
                    placeholder={"Fits 15.6\" Laptop\nWater Repellent\nUSB Charging Port"}
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Pricing</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Sale Price (₹) *</label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={e => set('price', e.target.value)}
                    className="w-full border border-gray-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3] focus:ring-2 focus:ring-[#1E3FA3]/10"
                    placeholder="2499"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">MRP (₹) *</label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.mrp}
                    onChange={e => set('mrp', e.target.value)}
                    className="w-full border border-gray-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3] focus:ring-2 focus:ring-[#1E3FA3]/10"
                    placeholder="3999"
                  />
                </div>
              </div>
              {discount > 0 && (
                <p className="text-xs text-green-600 font-semibold mt-2 bg-green-50 px-3 py-1.5 rounded-lg">
                  ✓ Customer saves {discount}% ({form.mrp && form.price ? `₹${(Number(form.mrp) - Number(form.price)).toLocaleString('en-IN')}` : ''})
                </p>
              )}
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Images</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <ImageUpload
                  label="Main Image"
                  required
                  value={form.image}
                  onChange={url => set('image', url)}
                />
                <ImageUpload
                  label="Hover Image"
                  hint="(shows on card hover)"
                  value={form.hoverImage}
                  onChange={url => set('hoverImage', url)}
                />
              </div>
            </div>

            {/* Variants */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Variants</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                    Colors <span className="text-gray-400 font-normal">(comma separated)</span>
                  </label>
                  <input
                    value={form.colors}
                    onChange={e => set('colors', e.target.value)}
                    className="w-full border border-gray-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3]"
                    placeholder="Black, Navy, Grey"
                  />
                  {form.colors && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {form.colors.split(',').filter(Boolean).map(c => (
                        <span key={c} className="text-[10px] bg-[#EBF0FB] text-[#1E3FA3] px-2 py-0.5 rounded">{c.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                    Sizes <span className="text-gray-400 font-normal">(comma separated)</span>
                  </label>
                  <input
                    value={form.sizes}
                    onChange={e => set('sizes', e.target.value)}
                    className="w-full border border-gray-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3]"
                    placeholder="20&quot;, 24&quot;, 28&quot; (leave blank if N/A)"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div className="space-y-5">
            {/* Publish */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Publish</h2>
              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Category *</label>
                  <select
                    value={form.category}
                    onChange={e => set('category', e.target.value)}
                    className="w-full border border-gray-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3] bg-white"
                  >
                    <option value="backpacks">Backpacks</option>
                    <option value="duffels">Duffels</option>
                    <option value="luggage">Luggage</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Badge</label>
                  <select
                    value={form.badge}
                    onChange={e => set('badge', e.target.value)}
                    className="w-full border border-gray-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3] bg-white"
                  >
                    <option value="">No Badge</option>
                    <option value="NEW">NEW</option>
                    <option value="SALE">SALE</option>
                    <option value="BESTSELLER">BESTSELLER</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-1">
                  <label className="text-xs font-semibold text-gray-600">In Stock</label>
                  <button
                    type="button"
                    onClick={() => set('inStock', !form.inStock)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.inStock ? 'bg-[#1E3FA3]' : 'bg-gray-300'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${form.inStock ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#1E3FA3] text-white py-3 rounded-lg text-sm font-bold hover:bg-[#162D80] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <Save size={15} />
                {saving ? 'Saving...' : mode === 'new' ? 'Create Product' : 'Save Changes'}
              </button>

              <Link href="/admin/products" className="block text-center text-sm text-gray-400 hover:text-gray-600 mt-3">
                Cancel
              </Link>
            </div>

            {/* Rating */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Rating & Reviews</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Rating (0–5)</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={form.rating}
                    onChange={e => set('rating', e.target.value)}
                    className="w-full border border-gray-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Review Count</label>
                  <input
                    type="number"
                    min="0"
                    value={form.reviews}
                    onChange={e => set('reviews', e.target.value)}
                    className="w-full border border-gray-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
