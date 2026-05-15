import Image from 'next/image'
import Link from 'next/link'

export const metadata = { title: 'Our Story — Falcon Plus Bags' }

const promises = [
  { icon: '🛡️', label: 'Quality You Can Trust' },
  { icon: '👷', label: 'Skilled Workforce' },
  { icon: '⚙️', label: 'Advanced Manufacturing' },
  { icon: '🤝', label: 'Honest Practices' },
  { icon: '🚚', label: 'Timely Deliveries' },
  { icon: '❤️', label: 'Built with Passion' },
]

const todayStats = [
  { icon: '🏭', title: 'Larger Facility', desc: 'State-of-the-art infrastructure' },
  { icon: '⚙️', title: 'Advanced Machinery', desc: 'Modern machines for precision & quality' },
  { icon: '👥', title: 'Skilled Workforce', desc: 'Experienced team with passion & expertise' },
  { icon: '✅', title: 'Quality Assured', desc: 'Strict quality checks at every step' },
]

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D1A5C 0%, #1E3FA3 60%, #1a3494 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-8 left-8 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-48 h-48 rounded-full bg-orange-400 blur-2xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block border border-white/20 rounded-full px-4 py-1 text-xs font-bold tracking-[0.2em] uppercase text-white/60 mb-6">
            Since 2004
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-4">
            Every Stitch
            <span className="block text-orange-400 italic font-extrabold">Has a Story</span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            From a small beginning in 2004 to a fully equipped manufacturing facility today — our journey is built on passion, hard work, and a promise to deliver the best.
          </p>
          <p className="mt-4 text-sm font-bold tracking-widest text-white/40 uppercase">Built Here. Trusted Everywhere.</p>
        </div>
      </section>

      {/* ── JOURNEY TIMELINE ── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-[#0D1A5C] mb-4 uppercase tracking-wide">Our Journey</h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto mb-12 rounded-full" />

          {/* Desktop: horizontal connector */}
          <div className="hidden md:flex items-center justify-center mb-10 px-16">
            <div className="w-6 h-6 rounded-full bg-[#1E3FA3] border-4 border-white shadow-md flex-shrink-0" />
            <div className="flex-1 h-1 bg-gradient-to-r from-[#1E3FA3] to-orange-400" />
            <div className="w-6 h-6 rounded-full bg-orange-500 border-4 border-white shadow-md flex-shrink-0" />
            <div className="flex-1 h-1 bg-gradient-to-r from-orange-400 to-[#0D1A5C]" />
            <div className="w-6 h-6 rounded-full bg-[#0D1A5C] border-4 border-white shadow-md flex-shrink-0" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 2004 – Our Beginning */}
            <div className="group overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-white flex flex-col">
              <div className="bg-[#0D1A5C] text-white px-6 py-5 text-center">
                <span className="text-3xl font-black text-orange-400">2004</span>
                <p className="text-xs font-bold uppercase tracking-widest text-white/60 mt-1">Our Beginning</p>
              </div>
              <div className="relative h-52 overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src="/uploads/story/building.jpg"
                  alt="Falcon Plus building - our beginning"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-5 flex-1">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Started in 2004 as <strong className="text-[#1E3FA3]">Sunshine Marketing</strong> with a small dream and big hopes. A small step towards quality and trust.
                </p>
              </div>
            </div>

            {/* THEN */}
            <div className="group overflow-hidden rounded-2xl shadow-sm border border-orange-100 bg-white flex flex-col">
              <div className="bg-orange-500 text-white px-6 py-5 text-center">
                <span className="text-3xl font-black">THEN</span>
                <p className="text-xs font-bold uppercase tracking-widest text-white/70 mt-1">Growing Every Day</p>
              </div>
              <div className="relative h-52 overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src="/uploads/story/stitching-machine.jpg"
                  alt="Worker at stitching machine"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-5 flex-1">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Every day we grew with <strong className="text-orange-500">dedication</strong>, skilled hands, and a commitment to doing things the right way.
                </p>
              </div>
            </div>

            {/* TODAY */}
            <div className="group overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-white flex flex-col">
              <div className="bg-[#0D1A5C] text-white px-6 py-5 text-center">
                <span className="text-3xl font-black text-orange-400">TODAY</span>
                <p className="text-xs font-bold uppercase tracking-widest text-white/60 mt-1">Our New Chapter</p>
              </div>
              <div className="relative h-52 overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src="/uploads/story/factory-floor.jpg"
                  alt="Modern factory floor today"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-5 flex-1">
                <p className="text-sm text-gray-600 leading-relaxed">
                  A <strong className="text-[#1E3FA3]">fully equipped manufacturing facility</strong> — modern machinery, a skilled team, and an unshakeable commitment to quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BUILT BIGGER. BUILT BETTER. ── */}
      <section className="py-16 sm:py-20" style={{ background: 'linear-gradient(135deg, #0D1A5C 0%, #1E3FA3 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">Built Bigger.</h2>
              <h2 className="text-3xl sm:text-4xl font-black text-orange-400 mb-6">Built Better.</h2>
              <p className="text-white/70 leading-relaxed mb-8">
                Today our facility stands as proof of what consistent hard work builds — modern infrastructure, precision machinery, and a team that takes pride in every single bag.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {todayStats.map((s) => (
                  <div key={s.title} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <h4 className="text-white font-bold text-sm">{s.title}</h4>
                    <p className="text-white/60 text-xs mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative rounded-xl overflow-hidden aspect-square col-span-2">
                <Image
                  src="/uploads/story/packaging.jpg"
                  alt="Packaging and dispatch team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-video">
                <Image
                  src="/uploads/story/factory-floor.jpg"
                  alt="Factory sewing floor"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-video">
                <Image
                  src="/uploads/story/stitching-machine.jpg"
                  alt="Heavy stitching machine"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST QUOTE ── */}
      <section className="py-12 bg-orange-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-lg sm:text-xl font-bold uppercase tracking-wide">
            From our hands to your journeys —
          </p>
          <p className="text-2xl sm:text-3xl font-black mt-1">
            We stitch more than bags. We stitch <span className="underline decoration-wavy decoration-white/50">trust.</span>
          </p>
        </div>
      </section>

      {/* ── OUR PROMISE ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-[#0D1A5C] mb-2 uppercase tracking-wide">Our Promise</h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto mb-10 rounded-full" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {promises.map((p) => (
              <div key={p.label} className="flex flex-col items-center text-center p-4 rounded-xl border border-blue-100 hover:border-[#1E3FA3]/30 hover:bg-[#EBF0FB]/30 transition-all group">
                <div className="w-12 h-12 rounded-full bg-[#EBF0FB] flex items-center justify-center text-2xl mb-3 group-hover:bg-[#1E3FA3]/10 transition-colors">
                  {p.icon}
                </div>
                <p className="text-xs font-bold text-[#0D1A5C] leading-tight">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACTORY GALLERY ── */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: '/uploads/story/factory-floor.jpg', alt: 'Sewing floor' },
              { src: '/uploads/story/packaging.jpg', alt: 'Dispatch area' },
              { src: '/uploads/story/building.jpg', alt: 'Our facility' },
              { src: '/uploads/story/stitching-machine.jpg', alt: 'Stitching machine' },
            ].map((img) => (
              <div key={img.src} className="relative aspect-video rounded-xl overflow-hidden bg-gray-200">
                <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6 font-medium tracking-wide">#EveryStitchHasAStory</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 text-white text-center" style={{ background: 'linear-gradient(135deg, #0D1A5C 0%, #1E3FA3 100%)' }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-3">Be Part of the Story</h2>
          <p className="text-blue-200/70 mb-8 text-sm">Every bag you carry holds a piece of our journey. Let&apos;s write the next chapter together.</p>
          <Link
            href="/collection"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-colors rounded"
          >
            Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  )
}
