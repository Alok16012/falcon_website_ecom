import Image from 'next/image'
import Link from 'next/link'

export const metadata = { title: 'Our Story — Falcon Plus Bags' }

const milestones = [
  {
    year: '1985',
    title: 'Leading with Vision and Purpose',
    desc: 'Founded by Jon Doe in a small Mumbai workshop, Falcon Plus began with nature-inspired designs and handcrafted backpacks. The mission was simple: create bags that are as functional as they are beautiful.',
    image: 'https://picsum.photos/seed/story1985/600/400',
  },
  {
    year: '2000',
    title: 'The Torch Passed',
    desc: 'A new generation brought ergonomic design principles and expanded manufacturing capabilities. The sports and outdoor collection launched, marking our entry into performance bags.',
    image: 'https://picsum.photos/seed/story2000/600/400',
  },
  {
    year: '2010',
    title: 'Digital Age Expansion',
    desc: 'We embraced e-commerce, reaching customers across India and beyond. Tech-friendly designs and sustainable practices became core to our identity.',
    image: 'https://picsum.photos/seed/story2010/600/400',
  },
  {
    year: '2015',
    title: 'Modernity and Tradition',
    desc: 'Smart features, RFID protection, USB charging ports — we integrated technology seamlessly into our urban lifestyle collection without compromising the craftsmanship our customers love.',
    image: 'https://picsum.photos/seed/story2015/600/400',
  },
  {
    year: '2023',
    title: 'Core Values Remain Intact',
    desc: 'Global recognition, sustainability awards, and a community of over 500,000 happy customers. Yet our commitment to quality, innovation, and customer care has never wavered.',
    image: 'https://picsum.photos/seed/story2023/600/400',
  },
]

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D1A5C 0%, #1E3FA3 60%, #2B50C4 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-white blur-2xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-4 block">Since 1985</span>
          <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight mb-6">
            Every Stitch<br />Has A Story
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            From a humble Mumbai workshop to India&apos;s most trusted bag brand — this is our journey.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At Falcon Plus, we believe that a great bag isn&apos;t just an accessory — it&apos;s a companion.
            It carries your laptop to the boardroom, your gear up the mountain, and your memories across continents.
          </p>
          <p className="text-gray-500 leading-relaxed">
            Every bag we make starts with a question: <em className="text-[#1E3FA3] not-italic font-medium">&quot;How can we make life better for the person carrying this?&quot;</em>
            That question has guided us for four decades.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 bg-[#EBF0FB]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Our Journey Through Time</h2>
          <div className="space-y-16">
            {milestones.map((m, idx) => (
              <div key={m.year} className={`grid md:grid-cols-2 gap-8 items-center`}>
                <div className={`${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-[#EBF0FB]">
                    <Image src={m.image} alt={m.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" unoptimized />
                  </div>
                </div>
                <div className={`${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                  <span className="text-5xl font-black text-[#1E3FA3]/15 block mb-2">{m.year}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{m.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">What We Stand For</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Purpose-Driven Design', desc: 'Every feature has a reason. We design from function first, then add the beauty.' },
              { icon: '🌿', title: 'Sustainability', desc: 'Cruelty-free materials, ethical sourcing, and responsible manufacturing — always.' },
              { icon: '🇮🇳', title: 'Proudly Indian', desc: 'Designed and made in India. Supporting local artisans and communities.' },
              { icon: '🔬', title: 'Relentless Innovation', desc: 'From the first stitch to the final zipper test, we never stop improving.' },
              { icon: '🤝', title: 'Customer First', desc: '500,000+ happy customers. Their trust is our greatest achievement.' },
              { icon: '⭐', title: 'Quality Obsession', desc: 'Every bag passes 50+ quality checks before reaching your hands.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-6 rounded-xl border border-blue-100 hover:border-[#1E3FA3]/30 hover:bg-[#EBF0FB]/30 transition-all">
                <span className="text-3xl block mb-3">{icon}</span>
                <h3 className="text-base font-bold mb-2 text-[#1E3FA3]">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-white text-center" style={{ background: 'linear-gradient(135deg, #0D1A5C 0%, #1E3FA3 100%)' }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Be Part of the Story</h2>
          <p className="text-blue-200/70 mb-8">Join half a million adventurers who trust Falcon Plus for every journey.</p>
          <Link href="/collection" className="bg-white text-[#1E3FA3] px-8 py-3.5 text-sm font-bold hover:bg-[#EBF0FB] transition-colors rounded inline-block">
            Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  )
}
