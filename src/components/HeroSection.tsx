'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

const fallbackSlides: Banner[] = [
  {
    id: '1',
    headline: 'Every Stitch Has A Story',
    subheadline: 'Premium bags and luggage designed for every adventure',
    cta: 'Shop Now',
    ctaHref: '/collection',
    accent: 'New Collection 2025',
    image: '/hero-model.jpg',
    active: true,
  },
  {
    id: '2',
    headline: 'Built for the Journey',
    subheadline: 'Explore our range of backpacks — from daily commutes to mountain trails',
    cta: 'Shop Backpacks',
    ctaHref: '/backpacks',
    accent: 'Backpack Collection',
    image: '/hero-model.jpg',
    active: true,
  },
  {
    id: '3',
    headline: 'Travel in Style',
    subheadline: 'AeroGlide luggage — lightweight, durable, built to last',
    cta: 'Shop Luggage',
    ctaHref: '/luggage',
    accent: 'AeroGlide Series',
    image: '/hero-model.jpg',
    active: true,
  },
]

export default function HeroSection() {
  const [slides, setSlides] = useState<Banner[]>(fallbackSlides)
  const [current, setCurrent] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    fetch('/api/admin/banners')
      .then(r => r.json())
      .then((data: Banner[]) => {
        const active = data.filter(b => b.active)
        if (active.length > 0) {
          setSlides(active.map(b => ({ ...b, image: b.image || '/hero-model.jpg' })))
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
      setAnimKey(k => k + 1)
    }, 5500)
    return () => clearInterval(timer)
  }, [slides.length])

  function goTo(idx: number) {
    setCurrent(idx)
    setAnimKey(k => k + 1)
  }

  const slide = slides[current] ?? slides[0]

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'clamp(420px, 70vw, 700px)' }}>

      {/* ── Background images (full-bleed, crossfade) ── */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: idx === current ? 1 : 0 }}
        >
          <Image
            src={s.image || '/hero-model.jpg'}
            alt={s.headline}
            fill
            priority={idx === 0}
            className="object-cover object-right sm:object-center"
            sizes="100vw"
            unoptimized
          />
        </div>
      ))}

      {/* ── Gradient overlay ── */}
      {/* Mobile: dark overlay across entire image for readability */}
      <div className="absolute inset-0 bg-[#0D1A5C]/55 sm:bg-transparent" />
      {/* Desktop: left-to-right fade so model is visible on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D1A5C]/90 via-[#0D1A5C]/50 to-transparent hidden sm:block" />
      {/* Bottom fade always */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0D1A5C]/50 to-transparent" />

      {/* ── Text content ── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="max-w-lg">

            {/* Accent label */}
            <span
              key={`accent-${animKey}`}
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] uppercase text-white/60 mb-4 animate-fadeIn"
            >
              <span className="w-6 h-px bg-white/40" />
              {slide.accent}
            </span>

            {/* Headline */}
            <h1
              key={`h1-${animKey}`}
              className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-4 animate-fadeIn"
            >
              {slide.headline}
            </h1>

            {/* Sub */}
            <p
              key={`sub-${animKey}`}
              className="text-sm sm:text-base text-white/70 mb-7 leading-relaxed max-w-sm animate-fadeIn"
            >
              {slide.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                key={`cta-${animKey}`}
                href={slide.ctaHref}
                className="inline-flex items-center gap-2 bg-white text-[#1E3FA3] px-6 py-3 text-sm font-bold tracking-wide hover:bg-[#EBF0FB] transition-colors rounded-lg animate-fadeIn"
              >
                {slide.cta}
              </Link>
              <Link
                href="/collection"
                className="text-sm text-white/70 hover:text-white transition-colors border-b border-white/30 hover:border-white pb-0.5"
              >
                View All →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Prev / Next arrows ── */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => goTo((current - 1 + slides.length) % slides.length)}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-white/15 hover:bg-white/30 border border-white/20 rounded-full flex items-center justify-center transition-colors text-white backdrop-blur-sm"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => goTo((current + 1) % slides.length)}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-white/15 hover:bg-white/30 border border-white/20 rounded-full flex items-center justify-center transition-colors text-white backdrop-blur-sm"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* ── Slide dots ── */}
      {slides.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${
                idx === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
