'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  MapPin, Plus, Check, ChevronDown, ChevronUp,
  CreditCard, Smartphone, Wallet, Truck,
  ShoppingBag, ArrowLeft, Lock, User, Mail, Phone, Eye, EyeOff, Home, Briefcase
} from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'

/* ─── Types ─────────────────────────────────────── */
interface UserData { name: string; email: string; phone: string }
interface Address {
  id: string; type: 'Home' | 'Work' | 'Other'
  name: string; phone: string
  line1: string; line2: string
  city: string; state: string; pincode: string
}

type PayMethod = 'cod' | 'upi' | 'card' | 'wallet'

/* ─── Mini auth form used inline ─────────────────── */
function InlineAuth({ onLogin }: { onLogin: (u: UserData) => void }) {
  const [tab, setTab] = useState<'signin' | 'register'>('signin')
  const [open, setOpen] = useState(true)
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  // keep show alias for toggle button UI
  const show = open

  const set = (f: string, v: string) => {
    setForm(p => ({ ...p, [f]: v }))
    setErrors(p => { const n = { ...p }; delete n[f]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (tab === 'register' && !form.name.trim()) e.name = 'Name required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.password || form.password.length < 6) e.password = 'Min. 6 characters'
    return e
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      const user: UserData = { name: form.name || form.email.split('@')[0], email: form.email, phone: form.phone }
      localStorage.setItem('fp_user', JSON.stringify(user))
      setLoading(false)
      onLogin(user)
    }, 700)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#1E3FA3] text-white flex items-center justify-center text-xs font-bold">1</div>
          <span className="font-semibold text-gray-900">Account</span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-[#1E3FA3] text-sm font-medium flex items-center gap-1">
          {open ? 'Hide' : 'Sign In / Register'} {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {open && (
        <div className="p-5">
          {/* Tabs */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-5">
            {(['signin', 'register'] as const).map(t => (
              <button key={t} onClick={() => { setTab(t); setErrors({}) }}
                className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${tab === t ? 'bg-[#1E3FA3] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                {t === 'signin' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-3">
            {tab === 'register' && (
              <div>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full Name"
                    className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] ${errors.name ? 'border-red-400' : 'border-gray-300'}`} />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            )}
            <div>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="Email Address"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] ${errors.email ? 'border-red-400' : 'border-gray-300'}`} />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            {tab === 'register' && (
              <div>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="Phone (optional)"
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#1E3FA3]" />
                </div>
              </div>
            )}
            <div>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPwd ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)} placeholder="Password"
                  className={`w-full pl-9 pr-9 py-2.5 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] ${errors.password ? 'border-red-400' : 'border-gray-300'}`} />
                <button type="button" onClick={() => setShowPwd(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-[#1E3FA3] text-white text-sm font-bold rounded-lg hover:bg-[#162D80] transition-colors disabled:opacity-60">
              {loading ? 'Please wait...' : tab === 'signin' ? 'Continue with Sign In' : 'Create Account & Continue'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

/* ─── Address mini-form ──────────────────────────── */
function AddressFormInline({ onSave, onCancel }: { onSave: (a: Omit<Address, 'id'>) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Omit<Address, 'id'>>({ type: 'Home', name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (f: keyof typeof form, v: string) => {
    setForm(p => ({ ...p, [f]: v }))
    setErrors(p => { const n = { ...p }; delete n[f]; return n })
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const er: Record<string, string> = {}
    if (!form.name.trim()) er.name = 'Required'
    if (!form.phone || !/^\d{10}$/.test(form.phone)) er.phone = 'Valid 10-digit number'
    if (!form.line1.trim()) er.line1 = 'Required'
    if (!form.city.trim()) er.city = 'Required'
    if (!form.state.trim()) er.state = 'Required'
    if (!form.pincode || !/^\d{6}$/.test(form.pincode)) er.pincode = '6-digit pincode'
    if (Object.keys(er).length) { setErrors(er); return }
    onSave(form)
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
      {/* Type */}
      <div className="flex gap-2">
        {(['Home', 'Work', 'Other'] as Address['type'][]).map(t => (
          <button key={t} type="button" onClick={() => set('type', t)}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium border rounded-lg ${form.type === t ? 'bg-[#1E3FA3] text-white border-[#1E3FA3]' : 'border-gray-300 text-gray-600'}`}>
            {t === 'Home' ? <Home size={11} /> : t === 'Work' ? <Briefcase size={11} /> : <MapPin size={11} />} {t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full Name *"
            className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] ${errors.name ? 'border-red-400' : 'border-gray-300'}`} />
          {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
        </div>
        <div>
          <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="Phone *"
            className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] ${errors.phone ? 'border-red-400' : 'border-gray-300'}`} />
          {errors.phone && <p className="text-red-500 text-xs mt-0.5">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <input type="text" value={form.line1} onChange={e => set('line1', e.target.value)} placeholder="Address Line 1 *"
          className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] ${errors.line1 ? 'border-red-400' : 'border-gray-300'}`} />
        {errors.line1 && <p className="text-red-500 text-xs mt-0.5">{errors.line1}</p>}
      </div>
      <input type="text" value={form.line2} onChange={e => set('line2', e.target.value)} placeholder="Address Line 2 (optional)"
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#1E3FA3]" />
      <div className="grid grid-cols-3 gap-3">
        <div>
          <input type="text" value={form.city} onChange={e => set('city', e.target.value)} placeholder="City *"
            className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] ${errors.city ? 'border-red-400' : 'border-gray-300'}`} />
          {errors.city && <p className="text-red-500 text-xs mt-0.5">{errors.city}</p>}
        </div>
        <div>
          <input type="text" value={form.state} onChange={e => set('state', e.target.value)} placeholder="State *"
            className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] ${errors.state ? 'border-red-400' : 'border-gray-300'}`} />
          {errors.state && <p className="text-red-500 text-xs mt-0.5">{errors.state}</p>}
        </div>
        <div>
          <input type="text" value={form.pincode} onChange={e => set('pincode', e.target.value)} placeholder="Pincode *" maxLength={6}
            className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:border-[#1E3FA3] ${errors.pincode ? 'border-red-400' : 'border-gray-300'}`} />
          {errors.pincode && <p className="text-red-500 text-xs mt-0.5">{errors.pincode}</p>}
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <button type="button" onClick={onCancel} className="flex-1 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
        <button type="submit" className="flex-1 py-2 text-sm bg-[#1E3FA3] text-white font-semibold rounded-lg hover:bg-[#162D80] transition-colors">Save Address</button>
      </div>
    </form>
  )
}

/* ─── Main Checkout Page ─────────────────────────── */
export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, totalItems, clearCart } = useCartStore()

  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddr, setSelectedAddr] = useState<string | null>(null)
  const [showAddrForm, setShowAddrForm] = useState(false)
  const [payMethod, setPayMethod] = useState<PayMethod>('cod')
  const [placing, setPlacing] = useState(false)
  const [upiId, setUpiId] = useState('')
  const [cardNo, setCardNo] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExp, setCardExp] = useState('')
  const [cardCvv, setCardCvv] = useState('')

  useEffect(() => {
    setMounted(true)
    const u = localStorage.getItem('fp_user')
    if (u) { try { setUser(JSON.parse(u)) } catch { /* ignore */ } }
    const a = localStorage.getItem('fp_addresses')
    if (a) { try { const arr = JSON.parse(a); setAddresses(arr); if (arr.length) setSelectedAddr(arr[0].id) } catch { /* ignore */ } }
  }, [])

  const handleLogin = (u: UserData) => {
    setUser(u)
    const a = localStorage.getItem('fp_addresses')
    if (a) { try { const arr = JSON.parse(a); setAddresses(arr); if (arr.length) setSelectedAddr(arr[0].id) } catch { /* ignore */ } }
  }

  const saveNewAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = { ...addr, id: Date.now().toString() }
    const updated = [...addresses, newAddr]
    setAddresses(updated)
    localStorage.setItem('fp_addresses', JSON.stringify(updated))
    setSelectedAddr(newAddr.id)
    setShowAddrForm(false)
  }

  const subtotal = mounted ? totalPrice() : 0
  const count = mounted ? totalItems() : 0
  const shipping = subtotal >= 999 ? 0 : 99
  const total = subtotal + shipping

  const placeOrder = () => {
    if (!user) { alert('Please sign in to continue'); return }
    if (!selectedAddr) { alert('Please select a delivery address'); return }
    if (payMethod === 'upi' && !upiId.trim()) { alert('Please enter your UPI ID'); return }
    if (payMethod === 'card' && (!cardNo || !cardName || !cardExp || !cardCvv)) { alert('Please fill in all card details'); return }

    setPlacing(true)
    setTimeout(() => {
      const orderId = 'FP' + Date.now().toString().slice(-8)
      const addr = addresses.find(a => a.id === selectedAddr)
      const order = {
        id: orderId,
        date: new Date().toISOString(),
        items: mounted ? items : [],
        total,
        address: addr,
        payment: payMethod,
        status: 'Confirmed',
      }
      // Save order to localStorage
      const prev = JSON.parse(localStorage.getItem('fp_orders') || '[]')
      localStorage.setItem('fp_orders', JSON.stringify([order, ...prev]))
      clearCart()
      router.push(`/order-success?id=${orderId}`)
    }, 1500)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-sm">Loading...</div>
      </div>
    )
  }

  if (count === 0 && !placing) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-white px-4">
        <ShoppingBag size={56} className="text-gray-200" />
        <h2 className="text-xl font-bold text-gray-800">Your cart is empty</h2>
        <Link href="/collection" className="bg-[#1E3FA3] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#162D80] transition-colors">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/cart" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft size={16} /> Back to Cart
          </Link>
          <div className="flex-1 text-center">
            <span className="text-base font-bold text-gray-900">Checkout</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Lock size={12} /> Secure
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── Left column ─────────────────────── */}
          <div className="lg:col-span-3 space-y-4">

            {/* Step 1: Account */}
            {!user ? (
              <InlineAuth onLogin={handleLogin} />
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center">
                    <Check size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button onClick={() => { localStorage.removeItem('fp_user'); setUser(null) }}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors">
                  Change
                </button>
              </div>
            )}

            {/* Step 2: Delivery Address */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#1E3FA3] text-white flex items-center justify-center text-xs font-bold">2</div>
                  <span className="font-semibold text-gray-900">Delivery Address</span>
                </div>
                {!showAddrForm && (
                  <button onClick={() => setShowAddrForm(true)}
                    className="flex items-center gap-1.5 text-xs text-[#1E3FA3] border border-[#1E3FA3] px-2.5 py-1.5 rounded-lg hover:bg-[#EBF0FB] transition-colors font-medium">
                    <Plus size={12} /> Add New
                  </button>
                )}
              </div>

              <div className="p-5">
                {addresses.length === 0 && !showAddrForm && (
                  <div className="text-center py-6">
                    <MapPin size={36} className="text-gray-200 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-3">No saved addresses</p>
                    <button onClick={() => setShowAddrForm(true)}
                      className="text-sm font-semibold text-[#1E3FA3] hover:underline">
                      + Add a delivery address
                    </button>
                  </div>
                )}

                {addresses.length > 0 && (
                  <div className="space-y-3">
                    {addresses.map(addr => (
                      <label key={addr.id} className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${selectedAddr === addr.id ? 'border-[#1E3FA3] bg-[#EBF0FB]/30' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="addr" value={addr.id} checked={selectedAddr === addr.id}
                          onChange={() => setSelectedAddr(addr.id)} className="mt-1 accent-[#1E3FA3]" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${addr.type === 'Home' ? 'bg-blue-100 text-blue-700' : addr.type === 'Work' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                              {addr.type === 'Home' ? <Home size={9} /> : addr.type === 'Work' ? <Briefcase size={9} /> : <MapPin size={9} />} {addr.type}
                            </span>
                            <span className="text-sm font-semibold text-gray-900">{addr.name}</span>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}, {addr.city}, {addr.state} – {addr.pincode}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{addr.phone}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                {showAddrForm && (
                  <AddressFormInline onSave={saveNewAddress} onCancel={() => setShowAddrForm(false)} />
                )}
              </div>
            </div>

            {/* Step 3: Payment */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#1E3FA3] text-white flex items-center justify-center text-xs font-bold">3</div>
                <span className="font-semibold text-gray-900">Payment Method</span>
              </div>

              <div className="p-5 space-y-3">
                {[
                  { id: 'cod' as PayMethod, icon: <Truck size={18} className="text-green-600" />, label: 'Cash on Delivery', sub: 'Pay when your order arrives' },
                  { id: 'upi' as PayMethod, icon: <Smartphone size={18} className="text-purple-600" />, label: 'UPI', sub: 'GPay, PhonePe, Paytm, BHIM' },
                  { id: 'card' as PayMethod, icon: <CreditCard size={18} className="text-blue-600" />, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay' },
                  { id: 'wallet' as PayMethod, icon: <Wallet size={18} className="text-orange-500" />, label: 'Wallet', sub: 'Paytm, Amazon Pay, Mobikwik' },
                ].map(opt => (
                  <div key={opt.id}>
                    <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${payMethod === opt.id ? 'border-[#1E3FA3] bg-[#EBF0FB]/30' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="pay" value={opt.id} checked={payMethod === opt.id}
                        onChange={() => setPayMethod(opt.id)} className="accent-[#1E3FA3]" />
                      <span className="flex-shrink-0">{opt.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
                        <p className="text-xs text-gray-400">{opt.sub}</p>
                      </div>
                    </label>

                    {/* UPI detail */}
                    {opt.id === 'upi' && payMethod === 'upi' && (
                      <div className="mx-4 mt-2 mb-1">
                        <input type="text" value={upiId} onChange={e => setUpiId(e.target.value)}
                          placeholder="Enter UPI ID (e.g. name@upi)"
                          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#1E3FA3]" />
                      </div>
                    )}

                    {/* Card detail */}
                    {opt.id === 'card' && payMethod === 'card' && (
                      <div className="mx-4 mt-2 mb-1 space-y-2">
                        <input type="text" value={cardNo} onChange={e => setCardNo(e.target.value.replace(/\D/g, '').slice(0, 16))}
                          placeholder="Card Number"
                          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#1E3FA3]" />
                        <input type="text" value={cardName} onChange={e => setCardName(e.target.value)}
                          placeholder="Name on Card"
                          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#1E3FA3]" />
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" value={cardExp} onChange={e => setCardExp(e.target.value)}
                            placeholder="MM / YY"
                            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#1E3FA3]" />
                          <input type="password" value={cardCvv} onChange={e => setCardCvv(e.target.value.slice(0, 4))}
                            placeholder="CVV"
                            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#1E3FA3]" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column: Order Summary ──────── */}
          <div className="lg:col-span-2 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="text-base font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 max-h-56 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-14 h-16 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" unoptimized />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1E3FA3] text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 line-clamp-2">{item.name}</p>
                      {item.color && <p className="text-[10px] text-gray-400 mt-0.5">{item.color}</p>}
                      <p className="text-xs font-bold text-[#1E3FA3] mt-1">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({count} items)</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-amber-600">Add ₹{(999 - subtotal).toLocaleString('en-IN')} more for free shipping</p>
                )}
                <div className="flex justify-between font-bold text-base border-t border-gray-100 pt-2 mt-2">
                  <span>Total</span>
                  <span className="text-[#1E3FA3]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Place Order */}
            <button
              onClick={placeOrder}
              disabled={placing || !user || !selectedAddr}
              className="w-full py-4 bg-[#1E3FA3] text-white font-bold text-sm rounded-xl hover:bg-[#162D80] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {placing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>
                  <Lock size={15} />
                  Place Order · ₹{total.toLocaleString('en-IN')}
                </>
              )}
            </button>

            {!user && <p className="text-xs text-center text-amber-600">Please sign in first to place order</p>}
            {user && !selectedAddr && <p className="text-xs text-center text-amber-600">Please select a delivery address</p>}

            <div className="space-y-1.5 px-1">
              {['100% Secure Checkout', 'Free 7-Day Returns', 'COD Available'].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="text-green-500">✓</span> {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
