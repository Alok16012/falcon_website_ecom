'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock } from 'lucide-react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise((r) => setTimeout(r, 500))
    if (password === 'falcon@admin') {
      sessionStorage.setItem('falcon_admin', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('Incorrect password. Try: falcon@admin')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0D1A5C 0%, #1E3FA3 100%)' }}>
      <div className="w-full max-w-sm mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-4 border border-white/20">
            <span className="text-2xl font-black italic text-white">F+</span>
          </div>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-2xl font-black italic text-white" style={{ letterSpacing: '-0.02em' }}>FALCON</span>
            <sup className="text-[10px] text-white/70" style={{ verticalAlign: 'super' }}>®</sup>
            <span className="text-sm font-bold italic text-blue-200 ml-1">Plus</span>
          </div>
          <p className="text-blue-200/60 text-sm mt-1">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-gray-400 text-sm mb-6">Sign in to manage your store</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-9 pr-10 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1E3FA3] focus:ring-2 focus:ring-[#1E3FA3]/10 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E3FA3] text-white py-3 rounded-lg text-sm font-bold hover:bg-[#162D80] transition-colors disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            Default password: <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">falcon@admin</code>
          </p>
        </div>
      </div>
    </div>
  )
}
