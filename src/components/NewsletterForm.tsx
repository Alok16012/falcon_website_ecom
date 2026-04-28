'use client'

export default function NewsletterForm() {
  return (
    <form className="flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 border border-gray-300 px-4 py-3 text-sm rounded focus:outline-none focus:border-[#1E3FA3] transition-colors"
      />
      <button
        type="submit"
        className="bg-[#1E3FA3] text-white px-6 py-3 text-sm font-bold rounded hover:bg-[#162D80] transition-colors flex-shrink-0"
      >
        Subscribe
      </button>
    </form>
  )
}
