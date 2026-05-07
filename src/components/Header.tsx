'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import AnnouncementBar from './AnnouncementBar'

const navItems = [
  {
    label: 'Duffels',
    href: '/duffels',
    dropdown: [
      { label: 'Urban Weekend Duffel', href: '/duffels' },
      { label: 'FlexFit Gym Bag', href: '/duffels' },
      { label: 'Voyager Travel XL', href: '/duffels' },
      { label: 'FoldAway Duffel', href: '/duffels' },
    ],
  },
  {
    label: 'Backpacks',
    href: '/backpacks',
    dropdown: [
      { label: 'City Commuter Pro', href: '/backpacks' },
      { label: 'TechGuard Laptop Pack', href: '/backpacks' },
      { label: 'Explorer Weekend 45L', href: '/backpacks' },
      { label: 'HikePro Adventure 55L', href: '/backpacks' },
    ],
  },
  {
    label: 'Luggage',
    href: '/luggage',
    dropdown: [
      { label: 'Cabin 20"', href: '/luggage' },
      { label: 'Medium 24"', href: '/luggage' },
      { label: 'Large 28"', href: '/luggage' },
      { label: 'Combo Set', href: '/luggage' },
    ],
  },
  { label: 'Collection', href: '/collection' },
  { label: 'Corporate Gifting', href: '/corporate-gifting' },
  { label: 'Our Story', href: '/our-story' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const { toggleCart, totalItems } = useCartStore()
  const count = totalItems()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-30 bg-white transition-shadow duration-200 ${
          scrolled ? 'shadow-md' : 'border-b border-gray-200'
        }`}
      >
        {/* Search overlay */}
        {searchOpen && (
          <div className="absolute inset-0 bg-white z-10 flex items-center px-6">
            <Search size={18} className="text-gray-400 mr-3 flex-shrink-0" />
            <input
              autoFocus
              type="text"
              placeholder="Search for bags, backpacks, luggage..."
              className="flex-1 text-sm outline-none"
            />
            <button onClick={() => setSearchOpen(false)} className="p-2 ml-2">
              <X size={20} />
            </button>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 -ml-2 text-gray-700"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo — FALCON® Plus wordmark */}
            <Link href="/" className="flex items-center gap-0 flex-shrink-0">
              <div className="flex items-baseline gap-0">
                <span
                  className="text-[22px] font-black tracking-tight italic leading-none"
                  style={{ color: '#1E3FA3', fontStyle: 'italic', letterSpacing: '-0.02em' }}
                >
                  FALCON
                </span>
                <sup
                  className="text-[10px] font-bold"
                  style={{ color: '#1E3FA3', marginLeft: '1px', verticalAlign: 'super', fontSize: '9px' }}
                >
                  ®
                </sup>
                <span
                  className="text-[13px] font-bold italic ml-1"
                  style={{ color: '#162D80' }}
                >
                  Plus
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-0.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1E3FA3] transition-colors"
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown size={13} className="mt-0.5 text-gray-400" />}
                  </Link>

                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-lg rounded-lg py-2 min-w-[190px] z-50">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#EBF0FB] hover:text-[#1E3FA3] transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-[#EBF0FB] rounded-full transition-colors text-gray-700"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                href="/account"
                className="p-2 hover:bg-[#EBF0FB] rounded-full transition-colors text-gray-700 hidden sm:flex"
                aria-label="Account"
              >
                <User size={20} />
              </Link>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-[#EBF0FB] rounded-full transition-colors relative text-gray-700"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#1E3FA3] text-white text-[10px] rounded-full flex items-center justify-center font-semibold">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between px-4 py-3.5 text-sm font-medium border-b border-gray-100 text-gray-700 hover:text-[#1E3FA3] hover:bg-[#EBF0FB] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
                {item.dropdown && <ChevronDown size={16} className="text-gray-400" />}
              </Link>
            ))}
            <Link
              href="/account"
              className="flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-gray-700 hover:text-[#1E3FA3] hover:bg-[#EBF0FB] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <User size={16} />
              My Account
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
