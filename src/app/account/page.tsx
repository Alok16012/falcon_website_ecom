'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { User, Mail, Phone, Lock, Eye, EyeOff, LogOut, Package, MapPin, Heart, ChevronRight, Edit2, Check, X, Trash2, Home, Briefcase } from 'lucide-react'

interface UserData {
  name: string
  email: string
  phone: string
}

interface Address {
  id: string
  type: 'Home' | 'Work' | 'Other'
  name: string
  phone: string
  line1: string
  line2: string
  city: string
  state: string
  pincode: string
}

type AuthTab = 'signin' | 'register'
type AccountTab = 'orders' | 'profile' | 'addresses' | 'wishlist'

const defaultAddrForm: Omit<Address, 'id'> = {
  type: 'Home',
  name: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  pincode: '',
}

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

function AddressForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Omit<Address, 'id'>
  onSave: (addr: Omit<Address, 'id'>) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit number'
    if (!form.line1.trim()) e.line1 = 'Address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.state.trim()) e.state = 'State is required'
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter valid 6-digit pincode'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Address type */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2">Address Type</label>
        <div className="flex gap-2">
          {(['Home', 'Work', 'Other'] as Address['type'][]).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => set('type', t)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors ${
                form.type === t ? 'bg-[#1E3FA3] text-white border-[#1E3FA3]' : 'border-gray-300 text-gray-600 hover:border-[#1E3FA3]'
              }`}
            >
              {t === 'Home' ? <Home size={12} /> : t === 'Work' ? <Briefcase size={12} /> : <MapPin size={12} />}
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="Recipient name"
            className={`w-full px-3 py-2.5 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] transition-colors ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => set('phone', e.target.value)}
            placeholder="10-digit number"
            className={`w-full px-3 py-2.5 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] transition-colors ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Address Line 1</label>
        <input
          type="text"
          value={form.line1}
          onChange={e => set('line1', e.target.value)}
          placeholder="House/Flat no., Building name, Street"
          className={`w-full px-3 py-2.5 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] transition-colors ${errors.line1 ? 'border-red-400' : 'border-gray-300'}`}
        />
        {errors.line1 && <p className="text-red-500 text-xs mt-1">{errors.line1}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Address Line 2 <span className="text-gray-400 font-normal">(optional)</span></label>
        <input
          type="text"
          value={form.line2}
          onChange={e => set('line2', e.target.value)}
          placeholder="Area, Colony, Locality"
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#1E3FA3] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">City</label>
          <input
            type="text"
            value={form.city}
            onChange={e => set('city', e.target.value)}
            placeholder="City"
            className={`w-full px-3 py-2.5 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] transition-colors ${errors.city ? 'border-red-400' : 'border-gray-300'}`}
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">State</label>
          <input
            type="text"
            value={form.state}
            onChange={e => set('state', e.target.value)}
            placeholder="State"
            className={`w-full px-3 py-2.5 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] transition-colors ${errors.state ? 'border-red-400' : 'border-gray-300'}`}
          />
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Pincode</label>
          <input
            type="text"
            value={form.pincode}
            onChange={e => set('pincode', e.target.value)}
            placeholder="6-digit"
            maxLength={6}
            className={`w-full px-3 py-2.5 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] transition-colors ${errors.pincode ? 'border-red-400' : 'border-gray-300'}`}
          />
          {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 text-sm font-medium border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-2.5 text-sm font-bold bg-[#1E3FA3] text-white rounded-lg hover:bg-[#162D80] transition-colors"
        >
          Save Address
        </button>
      </div>
    </form>
  )
}

interface Order {
  id: string; date: string; total: number; status: string; payment: string
  items: { name: string; image: string; quantity: number; price: number; color?: string }[]
  address: { name: string; line1: string; city: string; state: string; pincode: string } | null
}

function payLabel(p: string) {
  const m: Record<string, string> = { cod: 'Cash on Delivery', upi: 'UPI', card: 'Credit/Debit Card', wallet: 'Wallet' }
  return m[p] ?? p
}

function AccountDashboard({ user, onLogout }: { user: UserData; onLogout: () => void }) {
  const [tab, setTab] = useState<AccountTab>('orders')
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<UserData>(user)
  const [saved, setSaved] = useState(false)

  // Orders state
  const [orders, setOrders] = useState<Order[]>([])

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('fp_addresses')
    if (stored) {
      try { setAddresses(JSON.parse(stored)) } catch { /* ignore */ }
    }
    const ords = localStorage.getItem('fp_orders')
    if (ords) {
      try { setOrders(JSON.parse(ords)) } catch { /* ignore */ }
    }
  }, [])

  const saveProfile = () => {
    localStorage.setItem('fp_user', JSON.stringify(form))
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 2000)
  }

  const saveAddress = (addrForm: Omit<Address, 'id'>) => {
    let updated: Address[]
    if (editId) {
      updated = addresses.map(a => a.id === editId ? { ...addrForm, id: editId } : a)
    } else {
      updated = [...addresses, { ...addrForm, id: Date.now().toString() }]
    }
    setAddresses(updated)
    localStorage.setItem('fp_addresses', JSON.stringify(updated))
    setShowAddForm(false)
    setEditId(null)
  }

  const deleteAddress = (id: string) => {
    const updated = addresses.filter(a => a.id !== id)
    setAddresses(updated)
    localStorage.setItem('fp_addresses', JSON.stringify(updated))
  }

  const startEdit = (addr: Address) => {
    setEditId(addr.id)
    setShowAddForm(true)
  }

  const cancelForm = () => {
    setShowAddForm(false)
    setEditId(null)
  }

  const editingAddr = editId ? addresses.find(a => a.id === editId) : null

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
                  {orders.length === 0 ? (
                    <div className="text-center py-14">
                      <Package size={48} className="text-gray-200 mx-auto mb-4" />
                      <h3 className="text-gray-700 font-semibold mb-1">No orders yet</h3>
                      <p className="text-gray-400 text-sm mb-6">Your order history will appear here once you place your first order.</p>
                      <Link href="/collection" className="inline-block bg-[#1E3FA3] text-white px-6 py-2.5 text-sm font-semibold rounded-lg hover:bg-[#162D80] transition-colors">
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map(order => (
                        <div key={order.id} className="border border-gray-200 rounded-xl overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                            <div>
                              <span className="text-xs text-gray-500">Order # </span>
                              <span className="text-xs font-bold text-gray-900">{order.id}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-400">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                              <span className="inline-block bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{order.status}</span>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="space-y-2 mb-3">
                              {order.items.slice(0, 2).map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                  <div className="w-10 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-800 line-clamp-1">{item.name}</p>
                                    {item.color && <p className="text-[10px] text-gray-400">{item.color} × {item.quantity}</p>}
                                  </div>
                                  <p className="text-xs font-semibold text-gray-700">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                </div>
                              ))}
                              {order.items.length > 2 && (
                                <p className="text-xs text-gray-400 pl-13">+{order.items.length - 2} more item{order.items.length - 2 > 1 ? 's' : ''}</p>
                              )}
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                              <div className="text-xs text-gray-500">
                                <span>Total: </span><span className="font-bold text-gray-900">₹{order.total.toLocaleString('en-IN')}</span>
                                <span className="ml-2 text-gray-400">· {payLabel(order.payment)}</span>
                              </div>
                              <Link href={`/order-success?id=${order.id}`} className="text-xs text-[#1E3FA3] hover:underline font-medium">
                                View Details →
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                    {!showAddForm && (
                      <button
                        onClick={() => { setShowAddForm(true); setEditId(null) }}
                        className="text-sm text-[#1E3FA3] border border-[#1E3FA3] px-3 py-1.5 rounded-lg hover:bg-[#EBF0FB] transition-colors font-medium"
                      >
                        + Add Address
                      </button>
                    )}
                  </div>

                  {showAddForm ? (
                    <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-gray-900">{editId ? 'Edit Address' : 'New Address'}</h3>
                        <button onClick={cancelForm} className="text-gray-400 hover:text-gray-600">
                          <X size={18} />
                        </button>
                      </div>
                      <AddressForm
                        initial={editingAddr ? { ...editingAddr } : defaultAddrForm}
                        onSave={saveAddress}
                        onCancel={cancelForm}
                      />
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="text-center py-14">
                      <MapPin size={48} className="text-gray-200 mx-auto mb-4" />
                      <h3 className="text-gray-700 font-semibold mb-1">No addresses saved</h3>
                      <p className="text-gray-400 text-sm mb-5">Add a delivery address to speed up checkout.</p>
                      <button
                        onClick={() => setShowAddForm(true)}
                        className="inline-block bg-[#1E3FA3] text-white px-6 py-2.5 text-sm font-semibold rounded-lg hover:bg-[#162D80] transition-colors"
                      >
                        Add Your First Address
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {addresses.map(addr => (
                        <div key={addr.id} className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded ${
                                  addr.type === 'Home' ? 'bg-blue-50 text-blue-700' :
                                  addr.type === 'Work' ? 'bg-amber-50 text-amber-700' :
                                  'bg-gray-100 text-gray-600'
                                }`}>
                                  {addr.type === 'Home' ? <Home size={10} /> : addr.type === 'Work' ? <Briefcase size={10} /> : <MapPin size={10} />}
                                  {addr.type}
                                </span>
                                <span className="text-sm font-semibold text-gray-900">{addr.name}</span>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}, {addr.city}, {addr.state} – {addr.pincode}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">{addr.phone}</p>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button
                                onClick={() => startEdit(addr)}
                                className="p-2 text-gray-400 hover:text-[#1E3FA3] hover:bg-[#EBF0FB] rounded-lg transition-colors"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => deleteAddress(addr.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
