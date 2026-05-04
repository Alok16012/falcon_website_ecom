'use client'

import { useRef, useState, DragEvent, ChangeEvent } from 'react'
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react'

interface Props {
  value: string
  onChange: (url: string) => void
  label?: string
  hint?: string
  required?: boolean
}

export default function ImageUpload({ value, onChange, label, hint, required }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)

  async function uploadFile(file: File) {
    setError('')
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      onChange(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
    e.target.value = ''
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadFile(file)
  }

  return (
    <div>
      {label && (
        <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
          {label} {required && <span className="text-red-500">*</span>}
          {hint && <span className="text-gray-400 font-normal ml-1">{hint}</span>}
        </label>
      )}

      {value ? (
        <div className="relative w-full">
          <div className="relative w-full h-44 rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="preview"
              className="w-full h-full object-cover"
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
            {uploading && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                <Loader2 size={20} className="animate-spin text-[#1E3FA3]" />
              </div>
            )}
          </div>
          {/* Always-visible buttons so mobile users can replace/remove */}
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex-1 bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-gray-200 active:bg-gray-300"
            >
              <Upload size={12} /> Replace
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-red-100 active:bg-red-200"
            >
              <X size={12} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`w-full h-36 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors
            ${dragging ? 'border-[#1E3FA3] bg-[#EBF0FB]' : 'border-gray-200 bg-gray-50 hover:border-[#1E3FA3] hover:bg-[#EBF0FB]/50'}`}
        >
          {uploading ? (
            <Loader2 size={22} className="animate-spin text-[#1E3FA3]" />
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-[#EBF0FB] flex items-center justify-center">
                <ImageIcon size={18} className="text-[#1E3FA3]" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-700">Click to upload or drag & drop</p>
                <p className="text-[11px] text-gray-400 mt-0.5">PNG, JPG, WEBP up to 5MB</p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Manual URL input */}
      <div className="mt-2">
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full border border-gray-200 px-3 py-2 rounded-lg text-xs text-gray-500 focus:outline-none focus:border-[#1E3FA3] placeholder-gray-300"
          placeholder="Or paste image URL..."
        />
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
