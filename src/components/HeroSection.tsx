'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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

const gradients = [
  'linear-gradient(135deg, #0D1A5C 0%, #1E3FA3 50%, #162D80 100%)',
  'linear-gradient(135deg, #162D80 0%, #2B50C4 55%, #1E3FA3 100%)',
  'linear-gradient(135deg, #0A1545 0%, #1E3FA3 60%, #2B50C4 100%)',
]

const fallbackSlides: Banner[] = [
  { id: '1', headline: 'Every Stitch Has A Story', subheadline: 'Premium bags and luggage designed for every adventure', cta: 'Shop Now', ctaHref: '/collection', accent: 'New Collection 2025', image: '', active: true },
  { id: '2', headline: 'Built for the Journey', subheadline: 'Explore our range of backpacks — from daily commutes to mountain trails', cta: 'Shop Backpacks', ctaHref: '/backpacks', accent: 'Backpack Collection', image: '', active: true },
  { id: '3', headline: 'Travel in Style', subheadline: 'AeroGlide luggage — lightweight, stylish, built to last', cta: 'Shop Luggage', ctaHref: '/luggage', accent: 'AeroGlide Series', image: '', active: true },
]

export default function HeroSection() {
  const [slides, setSlides] = useState<Banner[]>(fallbackSlides)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetch('/api/admin/banners')
      .then(r => r.json())
      .then((data: Banner[]) => {
        const active = data.filter(b => b.active)
        if (active.length > 0) setSlides(active)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [slides.length])

  const slide = slides[current] ?? slides[0]

  return (
    <div className="relative overflow-hidden">
      {/* Gradient backgrounds */}
      {slides.map((_, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: gradients[idx % gradients.length] }}
        />
      ))}

      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute top-10 right-1/4 w-2 h-2 rounded-full bg-white/30" />
        <div className="absolute bottom-16 left-1/4 w-3 h-3 rounded-full bg-white/20" />
        <div className="absolute top-1/3 right-16 w-1.5 h-1.5 rounded-full bg-white/40" />
      </div>

      <div className="relative min-h-[520px] sm:min-h-[620px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="flex items-center justify-between gap-10">
            {/* Text content */}
            <div className="flex-1 max-w-2xl">
              <span key={`accent-${current}`} className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-5 animate-fadeIn">
                <span className="w-8 h-px bg-white/40" />
                {slide.accent}
              </span>
              <h1 key={`h1-${current}`} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 animate-fadeIn">
                {slide.headline}
              </h1>
              <p key={`sub-${current}`} className="text-lg text-white/70 mb-8 leading-relaxed animate-fadeIn">
                {slide.subheadline}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  href={slide.ctaHref}
                  key={`cta-${current}`}
                  className="inline-flex items-center gap-2 bg-white text-[#1E3FA3] px-7 py-3.5 text-sm font-bold tracking-wide hover:bg-[#EBF0FB] transition-colors rounded animate-fadeIn"
                >
                  {slide.cta}
                </Link>
                <Link href="/collection" className="text-sm text-white/70 hover:text-white transition-colors border-b border-white/30 hover:border-white pb-0.5">
                  View All →
                </Link>
              </div>
            </div>

            {/* Banner image — only shown if set */}
            {slide.image && (
              <div key={`img-${current}`} className="hidden lg:flex flex-shrink-0 items-center justify-center animate-fadeIn">
                <div className="relative w-72 h-72 xl:w-80 xl:h-80">
                  <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl scale-110" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image}
                    alt={slide.headline}
                    className="relative w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            )}

            {/* Watermark — shown when no image */}
            {!slide.image && (
              <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block opacity-5 select-none pointer-events-none">
                <div className="text-[120px] font-black italic text-white leading-none tracking-tighter">F+</div>
              </div>
            )}
          </div>
        </div>

        {/* Nav arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={() => setCurrent(prev => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-colors text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrent(prev => (prev + 1) % slides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-colors text-white"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`rounded-full transition-all duration-300 ${idx === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
