'use client'

export default function ContactForm() {
  return (
    <form className="bg-white rounded-xl border border-gray-200 p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">Your Name *</label>
          <input className="w-full border border-gray-300 px-3 py-2.5 text-sm rounded focus:outline-none focus:border-gray-500" placeholder="Name" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">Company *</label>
          <input className="w-full border border-gray-300 px-3 py-2.5 text-sm rounded focus:outline-none focus:border-gray-500" placeholder="Company" />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-gray-700 mb-1 block">Email *</label>
        <input type="email" className="w-full border border-gray-300 px-3 py-2.5 text-sm rounded focus:outline-none focus:border-gray-500" placeholder="your@company.com" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">Phone</label>
          <input type="tel" className="w-full border border-gray-300 px-3 py-2.5 text-sm rounded focus:outline-none focus:border-gray-500" placeholder="+91 98xxx xxxxx" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">Quantity Required *</label>
          <input type="number" min="20" className="w-full border border-gray-300 px-3 py-2.5 text-sm rounded focus:outline-none focus:border-gray-500" placeholder="Min. 20 units" />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-gray-700 mb-1 block">Requirements</label>
        <textarea
          className="w-full border border-gray-300 px-3 py-2.5 text-sm rounded focus:outline-none focus:border-gray-500 resize-none"
          rows={4}
          placeholder="Tell us about your product preferences, customisation needs, and delivery timeline..."
        />
      </div>
      <button type="submit" className="w-full bg-black text-white py-3 text-sm font-semibold rounded hover:bg-gray-800 transition-colors">
        Submit Enquiry
      </button>
    </form>
  )
}
