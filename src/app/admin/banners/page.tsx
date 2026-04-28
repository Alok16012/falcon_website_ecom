'use client'

import { useEffect, useState } from 'react'
import { Save, GripVertical, Eye, EyeOff, Plus, Trash2 } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

interface Banner {
  id: string
  accent: string
  headline: string
  subheadline: string
  cta: string
  ctaHref: string
  image: string
  active: boolean
}

export default function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [preview, setPreview] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/admin/banners').then(r => r.json()).then(d => {
      setBanners(d)
      setLoading(false)
    })
  }, [])

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  function updateBanner(id: string, key: keyof Banner, value: string | boolean) {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, [key]: value } : b))
  }

  function addBanner() {
    const newBanner: Banner = {
      id: `banner-${Date.now()}`,
      accent: 'New Arrival',
      headline: 'New Headline Here',
      subheadline: 'Add your subtitle text here',
      cta: 'Shop Now',
      ctaHref: '/collection',
      image: '',
      active: true,
    }
    setBanners(prev => [...prev, newBanner])
  }

  function deleteBanner(id: string) {
    setBanners(prev => prev.filter(b => b.id !== id))
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/banners', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(banners),
      })
      if (res.ok) {
        showToast('Banners saved successfully!')
      } else {
        showToast('Failed to save.', 'error')
      }
    } catch {
      showToast('Something went wrong.', 'error')
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-6 h-6 border-2 border-[#1E3FA3] border-t-transparent rounded-full" />
      </div>
    )
  }

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
        <div>
          <h1 className="text-xl font-bold text-gray-900">Hero Banners</h1>
          <p className="text-gray-500 text-sm mt-0.5">Edit the slides that appear on your homepage hero section</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={addBanner}
            className="flex items-center gap-2 border border-[#1E3FA3] text-[#1E3FA3] px-3 py-2.5 rounded-lg text-sm font-bold hover:bg-[#EBF0FB] transition-colors"
          >
            <Plus size={15} />
            Add Slide
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#1E3FA3] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-[#162D80] transition-colors disabled:opacity-60"
          >
            <Save size={15} />
            {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

      {/* Active count info */}
      <div className="bg-[#EBF0FB] border border-blue-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-3 text-sm">
        <span className="text-[#1E3FA3] text-xl">ℹ</span>
        <p className="text-[#1E3FA3]">
          <span className="font-bold">{banners.filter(b => b.active).length} of {banners.length}</span> slides are active. Upload an image to show it on the right side of the banner. Click <strong>Save All</strong> when done.
        </p>
      </div>

      {/* Banners list */}
      <div className="space-y-4">
        {banners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`bg-white rounded-xl border-2 transition-all ${banner.active ? 'border-[#1E3FA3]/20' : 'border-gray-100 opacity-60'}`}
          >
            {/* Banner header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <GripVertical size={16} className="text-gray-300 cursor-grab" />
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${banner.active ? 'bg-[#1E3FA3]' : 'bg-gray-300'}`}>
                  {idx + 1}
                </div>
                <span className="text-sm font-semibold text-gray-700 truncate max-w-[200px]">
                  {banner.headline || 'Untitled Slide'}
                </span>
                {banner.active ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">ACTIVE</span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">HIDDEN</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreview(preview === idx ? null : idx)}
                  className="text-xs text-gray-400 hover:text-[#1E3FA3] flex items-center gap-1 px-2 py-1 rounded transition-colors"
                >
                  <Eye size={13} />
                  {preview === idx ? 'Close' : 'Preview'}
                </button>
                <button
                  onClick={() => updateBanner(banner.id, 'active', !banner.active)}
                  className={`p-1.5 rounded-lg transition-colors ${banner.active ? 'hover:bg-amber-50 text-amber-500' : 'hover:bg-green-50 text-gray-400 hover:text-green-600'}`}
                  title={banner.active ? 'Hide slide' : 'Show slide'}
                >
                  {banner.active ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button
                  onClick={() => deleteBanner(banner.id)}
                  className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-gray-300 hover:text-red-500"
                  title="Delete slide"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {/* Fields */}
            <div className="p-5">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Text fields */}
                <div className="lg:col-span-2">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Accent Tag</label>
                      <input
                        value={banner.accent}
                        onChange={e => updateBanner(banner.id, 'accent', e.target.value)}
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3]"
                        placeholder="New Collection 2025"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Headline *</label>
                      <input
                        value={banner.headline}
                        onChange={e => updateBanner(banner.id, 'headline', e.target.value)}
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3]"
                        placeholder="Main headline text"
                      />
                    </div>
                    <div className="sm:col-span-2 lg:col-span-3">
                      <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Subheadline</label>
                      <input
                        value={banner.subheadline}
                        onChange={e => updateBanner(banner.id, 'subheadline', e.target.value)}
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3]"
                        placeholder="Supporting text below the headline"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Button Text</label>
                      <input
                        value={banner.cta}
                        onChange={e => updateBanner(banner.id, 'cta', e.target.value)}
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3]"
                        placeholder="Shop Now"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Button Link</label>
                      <input
                        value={banner.ctaHref}
                        onChange={e => updateBanner(banner.id, 'ctaHref', e.target.value)}
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3]"
                        placeholder="/collection"
                      />
                    </div>
                  </div>
                </div>

                {/* Image upload */}
                <div>
                  <ImageUpload
                    label="Banner Image"
                    hint="(shown on right side of slide)"
                    value={banner.image}
                    onChange={url => updateBanner(banner.id, 'image', url)}
                  />
                </div>
              </div>

              {/* Live preview */}
              {preview === idx && (
                <div
                  className="mt-5 rounded-xl overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #0D1A5C 0%, #1E3FA3 60%, #2B50C4 100%)' }}
                >
                  <div className="flex items-center px-8 py-10 gap-8">
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-3 block">
                        ——— {banner.accent || 'Accent Tag'}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                        {banner.headline || 'Your Headline Here'}
                      </h2>
                      <p className="text-white/70 text-sm mb-5 max-w-lg">
                        {banner.subheadline || 'Your supporting text goes here.'}
                      </p>
                      <span className="inline-block bg-white text-[#1E3FA3] px-5 py-2 text-xs font-bold rounded">
                        {banner.cta || 'Shop Now'}
                      </span>
                    </div>
                    {banner.image && (
                      <div className="hidden sm:block w-36 h-36 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={banner.image} alt="banner" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {banners.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-400 mb-4">No banners yet</p>
          <button onClick={addBanner} className="btn-primary rounded-lg text-sm inline-flex items-center gap-2">
            <Plus size={14} /> Add First Slide
          </button>
        </div>
      )}

      {/* Save sticky bar */}
      {banners.length > 0 && (
        <div className="sticky bottom-4 mt-6">
          <div className="bg-gray-900 text-white rounded-xl px-5 py-3 flex items-center justify-between shadow-xl">
            <p className="text-sm text-gray-300">
              <span className="text-white font-semibold">{banners.filter(b => b.active).length}</span> active slides
            </p>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-white text-[#1E3FA3] px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#EBF0FB] transition-colors disabled:opacity-60"
            >
              <Save size={14} />
              {saving ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
