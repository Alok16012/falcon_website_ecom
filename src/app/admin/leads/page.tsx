'use client'

import { useEffect, useState, useCallback } from 'react'

interface Lead {
  id: string
  created_at: string
  name: string
  email: string
  phone: string
  company: string | null
  quantity: string | null
  message: string | null
  status: 'new' | 'contacted' | 'closed'
}

const STATUS_CYCLE: Record<string, 'new' | 'contacted' | 'closed'> = {
  new: 'contacted',
  contacted: 'closed',
  closed: 'new',
}

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  contacted: 'bg-amber-100 text-amber-700 border-amber-200',
  closed: 'bg-green-100 text-green-700 border-green-200',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/corporate-leads')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setLeads(data)
    } catch {
      // silently fail — empty state will show
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  async function cycleStatus(lead: Lead) {
    const nextStatus = STATUS_CYCLE[lead.status]
    setUpdatingId(lead.id)
    try {
      const res = await fetch(`/api/admin/corporate-leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      })
      if (!res.ok) throw new Error('Failed to update')
      setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: nextStatus } : l))
    } catch {
      alert('Failed to update status. Please try again.')
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Corporate Leads</h1>
          <p className="text-gray-500 text-sm mt-0.5">All corporate gifting enquiries. Click a status badge to cycle it.</p>
        </div>
        <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
          {loading ? '...' : `${leads.length} lead${leads.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-sm">Loading leads...</p>
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
          <div className="text-4xl mb-4">📬</div>
          <h2 className="text-gray-700 font-semibold mb-1">No leads yet</h2>
          <p className="text-gray-400 text-sm">Corporate enquiry submissions will appear here.</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Company</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Qty</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden xl:table-cell">Message</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{formatDate(lead.created_at)}</td>
                      <td className="px-4 py-3 font-medium text-gray-900 text-xs whitespace-nowrap">{lead.name}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{lead.email}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{lead.phone}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 hidden lg:table-cell">{lead.company || <span className="text-gray-300">—</span>}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 hidden lg:table-cell whitespace-nowrap">{lead.quantity || <span className="text-gray-300">—</span>}</td>
                      <td className="px-4 py-3 hidden xl:table-cell max-w-xs">
                        <p className="text-xs text-gray-500 truncate">{lead.message || <span className="text-gray-300">—</span>}</p>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => cycleStatus(lead)}
                          disabled={updatingId === lead.id}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border capitalize transition-opacity ${STATUS_STYLES[lead.status]} ${updatingId === lead.id ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-75 cursor-pointer'}`}
                        >
                          {updatingId === lead.id ? '...' : lead.status}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{lead.name}</p>
                    <p className="text-xs text-gray-400">{formatDate(lead.created_at)}</p>
                  </div>
                  <button
                    onClick={() => cycleStatus(lead)}
                    disabled={updatingId === lead.id}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border capitalize transition-opacity ${STATUS_STYLES[lead.status]} ${updatingId === lead.id ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-75 cursor-pointer'}`}
                  >
                    {updatingId === lead.id ? '...' : lead.status}
                  </button>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>{lead.email}</p>
                  <p>{lead.phone}</p>
                  {lead.company && <p className="text-gray-500">{lead.company}</p>}
                  {lead.quantity && <p className="text-gray-500">Qty: {lead.quantity}</p>}
                  {lead.message && <p className="text-gray-400 mt-2 text-[11px] leading-relaxed">{lead.message}</p>}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
