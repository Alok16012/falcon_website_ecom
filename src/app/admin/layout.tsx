'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Package, Image as ImageIcon, LogOut, Menu, X, ChevronRight, ShoppingBag,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Banners', href: '/admin/banners', icon: ImageIcon },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    if (pathname === '/admin/login' || pathname === '/admin') {
      setAuthed(true)
      return
    }
    const ok = sessionStorage.getItem('falcon_admin') === 'true'
    if (!ok) {
      router.replace('/admin/login')
    } else {
      setAuthed(true)
    }
  }, [pathname, router])

  if (pathname === '/admin/login') return <>{children}</>
  if (!authed) return null

  function logout() {
    sessionStorage.removeItem('falcon_admin')
    router.replace('/admin/login')
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ background: '#0D1A5C' }}>

        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <Link href="/admin/dashboard" className="flex items-baseline gap-1">
            <span className="text-xl font-black italic text-white" style={{ letterSpacing: '-0.02em' }}>FALCON</span>
            <sup className="text-[8px] text-white/60" style={{ verticalAlign: 'super' }}>®</sup>
            <span className="text-[11px] font-bold italic text-blue-300 ml-0.5">Plus</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Admin badge */}
        <div className="px-5 py-3 border-b border-white/10">
          <span className="text-[10px] font-bold tracking-widest uppercase text-blue-300/60">Admin Panel</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-[#1E3FA3] text-white shadow-sm'
                    : 'text-blue-200/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={17} />
                {label}
                {active && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            )
          })}

          <div className="pt-4 border-t border-white/10 mt-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-200/50 hover:bg-white/10 hover:text-white transition-all"
            >
              <ShoppingBag size={17} />
              View Store
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-300/70 hover:bg-red-500/10 hover:text-red-300 transition-all"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-sm font-semibold text-gray-800">
              {navItems.find(n => pathname.startsWith(n.href))?.label ?? 'Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1E3FA3] flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-gray-700">Admin</p>
              <p className="text-[10px] text-gray-400">falcon@admin</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
