'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const messages = [
  'Free Shipping on Orders Above ₹999 — Shop Now',
  'Get 10% Off on Your First Order — Use Code: FALCON10',
  'New Collection Arriving Soon — Be the First to Know',
]

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-[#1E3FA3] text-white py-2.5 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + messages.length) % messages.length)}
          className="text-white/70 hover:text-white transition-colors flex-shrink-0"
          aria-label="Previous announcement"
        >
          <ChevronLeft size={14} />
        </button>

        <div className="overflow-hidden h-5 flex-1 max-w-lg text-center">
          <p key={current} className="text-xs tracking-wide font-medium animate-fadeIn">
            {messages[current]}
          </p>
        </div>

        <button
          onClick={() => setCurrent((prev) => (prev + 1) % messages.length)}
          className="text-white/70 hover:text-white transition-colors flex-shrink-0"
          aria-label="Next announcement"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}
