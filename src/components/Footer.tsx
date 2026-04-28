'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react'

const shopLinks = [
  { label: 'Backpacks', href: '/backpacks' },
  { label: 'Duffel Bags', href: '/duffels' },
  { label: 'Luggage', href: '/luggage' },
  { label: 'Collection', href: '/collection' },
  { label: 'Corporate Gifting', href: '/corporate-gifting' },
]

const helpLinks = [
  { label: 'Track My Order', href: '/track-order' },
  { label: 'Warranty & Support', href: '/warranty' },
  { label: 'Return Policy', href: '/return-policy' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact Us', href: '/contact' },
]

const companyLinks = [
  { label: 'Our Story', href: '/our-story' },
  { label: "Founder's Letter", href: '/founders-letter' },
  { label: "The Commuter's Blog", href: '/blog' },
  { label: 'Affiliate Program', href: '/affiliate' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0D1A5C' }} className="text-white">
      {/* Brand values */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { icon: '🚚', label: 'Free Shipping', sub: 'Above ₹999' },
              { icon: '⭐', label: 'Premium Finish', sub: 'Quality Crafted' },
              { icon: '↩️', label: 'Easy Returns', sub: '7-Day Policy' },
              { icon: '🌿', label: 'Cruelty-Free', sub: 'Ethical Materials' },
              { icon: '🇮🇳', label: 'Made in India', sub: 'Proudly Local' },
              { icon: '💧', label: 'Water Repellent', sub: 'All Weather' },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <span className="text-2xl">{icon}</span>
                <span className="text-xs font-semibold text-white">{label}</span>
                <span className="text-xs text-blue-200/60">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-baseline gap-0 mb-5">
              <span className="text-[22px] font-black italic leading-none text-white" style={{ letterSpacing: '-0.02em' }}>FALCON</span>
              <sup className="text-[9px] font-bold text-white/80" style={{ verticalAlign: 'super', marginLeft: '1px' }}>®</sup>
              <span className="text-[13px] font-bold italic ml-1 text-blue-200">Plus</span>
            </Link>
            <p className="text-blue-200/70 text-sm leading-relaxed mb-6 max-w-xs">
              Premium bags and luggage designed for every adventure. Every stitch has a story.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="text-blue-200/50 hover:text-white transition-colors">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-blue-200/80">Shop</h3>
            <ul className="space-y-2.5">
              {shopLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-blue-200/60 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-blue-200/80">Help</h3>
            <ul className="space-y-2.5">
              {helpLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-blue-200/60 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-blue-200/80">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-blue-200/60 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-1">Strap In for Updates</h3>
              <p className="text-xs text-blue-200/60">Latest drops, exclusive offers, and style tips — straight to your inbox.</p>
            </div>
            <form className="flex gap-2 w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 sm:w-64 bg-white/10 border border-white/20 text-white placeholder-blue-200/40 px-4 py-2 text-sm rounded focus:outline-none focus:border-white/40"
              />
              <button type="submit" className="bg-white text-[#1E3FA3] px-5 py-2 text-sm font-bold rounded hover:bg-blue-50 transition-colors flex-shrink-0">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-blue-200/40">© 2025 Falcon Plus Bags. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Returns', 'Warranty'].map((t) => (
              <Link key={t} href="#" className="text-xs text-blue-200/40 hover:text-white transition-colors">{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
