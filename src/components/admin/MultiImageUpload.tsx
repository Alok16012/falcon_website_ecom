'use client'

import { useRef, useState, DragEvent, ChangeEvent } from 'react'
import { Plus, X, Star, Loader2 } from 'lucide-react'

interface Props {
  values: string[]
  onChange: (urls: string[]) => void
}

/** Multi-image manager: upload several images (angles), remove any, first image = cover/swatch. */
export default function MultiImageUpload({ values, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(0)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [urlDraft, setUrlDraft] = useState('')

  async function uploadFiles(files: File[]) {
    if (files.length === 0) return
    setError('')
    setUploading(files.length)
    const uploaded: string[] = []
    for (const file of files) {
      try {
        const fd = new FormData()
        fd.append('file', file)
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Upload failed')
        uploaded.push(data.url)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed')
      }
      setUploading(n => n - 1)
    }
    if (uploaded.length > 0) onChange([...values, ...uploaded])
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    uploadFiles(Array.from(e.target.files ?? []))
    e.target.value = ''
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    uploadFiles(Array.from(e.dataTransfer.files ?? []))
  }

  function removeAt(idx: number) {
    onChange(values.filter((_, i) => i !== idx))
  }

  function makeCover(idx: number) {
    onChange([values[idx], ...values.filter((_, i) => i !== idx)])
  }

  function addUrl() {
    const url = urlDraft.trim()
    if (!url) return
    onChange([...values, url])
    setUrlDraft('')
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {values.map((url, idx) => (
          <div key={`${url}-${idx}`} className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={`image ${idx + 1}`} className="w-full h-full object-cover" />
            {idx === 0 ? (
              <span className="absolute bottom-0 inset-x-0 bg-[#1E3FA3] text-white text-[8px] font-bold text-center py-0.5 tracking-wide">
                COVER
              </span>
            ) : (
              <button
                type="button"
                onClick={() => makeCover(idx)}
                title="Make cover image"
                className="absolute bottom-1 left-1 w-5 h-5 rounded-full bg-white/90 text-gray-500 hover:text-amber-500 items-center justify-center hidden group-hover:flex shadow"
              >
                <Star size={11} />
              </button>
            )}
            <button
              type="button"
              onClick={() => removeAt(idx)}
              title="Remove image"
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white/90 text-gray-500 hover:text-red-500 flex items-center justify-center shadow"
            >
              <X size={11} />
            </button>
          </div>
        ))}

        {/* Add tile */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`w-20 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors
            ${dragging ? 'border-[#1E3FA3] bg-[#EBF0FB]' : 'border-gray-300 bg-gray-50 hover:border-[#1E3FA3] hover:bg-[#EBF0FB]/50'}`}
        >
          {uploading > 0 ? (
            <Loader2 size={16} className="animate-spin text-[#1E3FA3]" />
          ) : (
            <>
              <Plus size={16} className="text-[#1E3FA3]" />
              <span className="text-[9px] font-semibold text-gray-500">Add</span>
            </>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Manual URL add */}
      <div className="flex gap-2 mt-2">
        <input
          value={urlDraft}
          onChange={e => setUrlDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addUrl() } }}
          className="flex-1 border border-gray-200 px-3 py-1.5 rounded-lg text-xs text-gray-500 focus:outline-none focus:border-[#1E3FA3] placeholder-gray-300"
          placeholder="Or paste image URL..."
        />
        <button
          type="button"
          onClick={addUrl}
          className="text-xs font-semibold text-[#1E3FA3] border border-[#1E3FA3]/30 px-3 py-1.5 rounded-lg hover:bg-[#EBF0FB]"
        >
          Add
        </button>
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
