'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { User, Mail, Phone, Lock, Eye, EyeOff, LogOut, Package, MapPin, Heart, ChevronRight, Edit2, Check } from 'lucide-react'

interface UserData {
  name: string
  email: string
  phone: string
}

type AuthTab = 'signin' | 'register'
type AccountTab = 'orders' | 'profile' | 'addresses' | 'wishlist'

function AuthForm({ onLogin }: { onLogin: (user: UserData) => void }) {
  const [tab, setTab] = useState<AuthTab>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (tab === 'register' && !form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (tab === 'register' && form.phone && !/^\d{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit number'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => {
      const user: UserData = { name: form.name || form.email.split('@')[0], email: form.email, phone: form.phone }
      localStorage.setItem('fp_user', JSON.stringify(user))
      setLoading(false)
      onLogin(user)
    }, 800)
  }

  const set = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n })
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#EBF0FB] rounded-full mb-4">
            <User size={26} className="text-[#1E3FA3]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to manage your orders and profile</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {(['signin', 'register'] as AuthTab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setErrors({}) }}
                className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                  tab === t ? 'text-[#1E3FA3] border-b-2 border-[#1E3FA3] bg-[#EBF0FB]/30' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {tab === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    placeholder="Your full name"
                    className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] transition-colors ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] transition-colors ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {tab === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number <span className="text-gray-400 font-normal">(optional)</span></label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    placeholder="10-digit mobile number"
                    className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] transition-colors ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder={tab === 'signin' ? 'Your password' : 'Min. 6 characters'}
                  className={`w-full pl-9 pr-10 py-2.5 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] transition-colors ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E3FA3] text-white py-3 text-sm font-bold rounded-lg hover:bg-[#162D80] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Please wait...' : tab === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          By continuing, you agree to Falcon Plus&apos;s{' '}
          <span className="text-[#1E3FA3] cursor-pointer hover:underline">Terms of Service</span>{' '}
          and{' '}
          <span className="text-[#1E3FA3] cursor-pointer hover:underline">Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}

function AccountDashboard({ user, onLogout }: { user: UserData; onLogout: () => void }) {
  const [tab, setTab] = useState<AccountTab>('orders')
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<UserData>(user)
  const [saved, setSaved] = useState(false)

  const saveProfile = () => {
    localStorage.setItem('fp_user', JSON.stringify(form))
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs: { id: AccountTab; label: string; icon: React.ReactNode }[] = [
    { id: 'orders', label: 'My Orders', icon: <Package size={16} /> },
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={16} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={16} /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#1E3FA3] flex items-center justify-center text-white text-xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{user.name}</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
              {user.phone && <p className="text-xs text-gray-400">{user.phone}</p>}
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 border border-gray-200 hover:border-red-200 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium border-b border-gray-100 last:border-0 transition-colors ${
                    tab === t.id ? 'bg-[#EBF0FB] text-[#1E3FA3]' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {t.icon}
                    {t.label}
                  </span>
                  <ChevronRight size={14} className="text-gray-400" />
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">

              {/* Orders */}
              {tab === 'orders' && (
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-5">My Orders</h2>
                  <div className="text-center py-14">
                    <Package size={48} className="text-gray-200 mx-auto mb-4" />
                    <h3 className="text-gray-700 font-semibold mb-1">No orders yet</h3>
                    <p className="text-gray-400 text-sm mb-6">Your order history will appear here once you place your first order.</p>
                    <Link href="/collection" className="inline-block bg-[#1E3FA3] text-white px-6 py-2.5 text-sm font-semibold rounded-lg hover:bg-[#162D80] transition-colors">
                      Start Shopping
                    </Link>
                  </div>
                </div>
              )}

              {/* Profile */}
              {tab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-bold text-gray-900">Profile Details</h2>
                    {!editing ? (
                      <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-sm text-[#1E3FA3] hover:underline">
                        <Edit2 size={14} /> Edit
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button onClick={() => { setEditing(false); setForm(user) }} className="text-sm text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">Cancel</button>
                        <button onClick={saveProfile} className="flex items-center gap-1.5 text-sm bg-[#1E3FA3] text-white px-3 py-1.5 rounded-lg hover:bg-[#162D80]">
                          <Check size={14} /> Save
                        </button>
                      </div>
                    )}
                  </div>
                  {saved && (
                    <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2.5 rounded-lg mb-4 flex items-center gap-2">
                      <Check size={14} /> Profile updated successfully
                    </div>
                  )}
                  <div className="space-y-4">
                    {[
                      { label: 'Full Name', field: 'name' as keyof UserData, icon: <User size={15} className="text-gray-400" />, type: 'text' },
                      { label: 'Email Address', field: 'email' as keyof UserData, icon: <Mail size={15} className="text-gray-400" />, type: 'email' },
                      { label: 'Phone Number', field: 'phone' as keyof UserData, icon: <Phone size={15} className="text-gray-400" />, type: 'tel' },
                    ].map(({ label, field, icon, type }) => (
                      <div key={field}>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                        {editing ? (
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>
                            <input
                              type={type}
                              value={form[field]}
                              onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#1E3FA3] transition-colors"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200">
                            {icon}
                            <span>{form[field] || <span className="text-gray-400 italic">Not provided</span>}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Addresses */}
              {tab === 'addresses' && (
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-bold text-gray-900">Saved Addresses</h2>
                    <button className="text-sm text-[#1E3FA3] border border-[#1E3FA3] px-3 py-1.5 rounded-lg hover:bg-[#EBF0FB] transition-colors">
                      + Add Address
                    </button>
                  </div>
                  <div className="text-center py-14">
                    <MapPin size={48} className="text-gray-200 mx-auto mb-4" />
                    <h3 className="text-gray-700 font-semibold mb-1">No addresses saved</h3>
                    <p className="text-gray-400 text-sm">Add a delivery address to speed up checkout.</p>
                  </div>
                </div>
              )}

              {/* Wishlist */}
              {tab === 'wishlist' && (
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-5">My Wishlist</h2>
                  <div className="text-center py-14">
                    <Heart size={48} className="text-gray-200 mx-auto mb-4" />
                    <h3 className="text-gray-700 font-semibold mb-1">Your wishlist is empty</h3>
                    <p className="text-gray-400 text-sm mb-6">Save products you love and find them here later.</p>
                    <Link href="/collection" className="inline-block bg-[#1E3FA3] text-white px-6 py-2.5 text-sm font-semibold rounded-lg hover:bg-[#162D80] transition-colors">
                      Browse Collection
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AccountPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('fp_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { /* ignore */ }
    }
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-sm">Loading...</div>
      </div>
    )
  }

  const handleLogout = () => {
    localStorage.removeItem('fp_user')
    setUser(null)
  }

  if (!user) return <AuthForm onLogin={setUser} />
  return <AccountDashboard user={user} onLogout={handleLogout} />
}
