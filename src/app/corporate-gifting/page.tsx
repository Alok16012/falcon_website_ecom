import Image from 'next/image'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export const metadata = { title: 'Corporate Gifting — Falcon Plus Bags' }

const whoCards = [
  {
    icon: '🤝',
    title: 'Gift Your Customers',
    desc: 'Build lasting relationships through thoughtful gifts that show appreciation for their loyalty and strengthen your brand image.',
  },
  {
    icon: '👥',
    title: 'Gift Your Employees',
    desc: 'Rewarding employees with personalised gifts boosts morale and fosters a positive workplace culture, enhancing productivity.',
  },
  {
    icon: '🏆',
    title: 'Gift Your Channel Partners',
    desc: 'Strengthening ties with channel partners through gifts emphasises collaboration and mutual success in achieving business goals.',
  },
]

const whyCards = [
  {
    icon: '📈',
    title: 'Increase Employee Efficiency',
    desc: 'Thoughtful gifts boost morale, leading to increased motivation and productivity in the workplace.',
  },
  {
    icon: '💛',
    title: 'Build Customer Loyalty',
    desc: 'Gifting nurtures lasting relationships, encouraging repeat business and fostering brand loyalty among customers.',
  },
  {
    icon: '📣',
    title: 'Increase Brand Awareness',
    desc: 'Branded gifts serve as constant reminders of your brand, increasing visibility and recognition in the market.',
  },
]

const whenCards = [
  {
    icon: '🎤',
    title: 'Conferences',
    desc: 'Leave a lasting impression on participants and strengthen networking with premium branded gifts.',
    image: '/uploads/corporate/trolley-podium.jpg',
    featured: true,
  },
  {
    icon: '📣',
    title: 'Marketing Events',
    desc: 'Drive brand visibility with memorable takeaways your audience will use long after the event.',
    image: '/uploads/corporate/duffle-city.jpg',
  },
  {
    icon: '🏛️',
    title: 'Exhibitions',
    desc: "Enhance your booth's appeal and engage visitors with gifts that make your brand unforgettable.",
    image: '/uploads/corporate/duffle-studio.jpg',
  },
  {
    icon: '🏆',
    title: 'Employee Rewards',
    desc: 'Recognise milestones, celebrate achievements and build a culture of appreciation.',
    image: '/uploads/corporate/trolley-white.jpg',
  },
  {
    icon: '🎁',
    title: 'Festive Gifting',
    desc: 'Delight clients and partners during Diwali, New Year and every special occasion.',
    image: '/uploads/corporate/duffle-open.jpg',
  },
]

const customOptions = [
  { icon: '🖨️', title: 'Logo Printing', desc: 'High-quality logo printing on any product' },
  { icon: '🪡', title: 'Embroidery', desc: 'Premium embroidered branding for a luxe finish' },
  { icon: '📦', title: 'Premium Packaging', desc: 'Custom gift boxes and packaging solutions' },
  { icon: '✉️', title: 'Personalized Note', desc: 'Add a personal touch with custom messages' },
]

const productCategories = [
  { name: 'Trolley Bags', icon: '🧳', href: '/luggage' },
  { name: 'Laptop Bags', icon: '💼', href: '/backpacks' },
  { name: 'Duffle Bags', icon: '👜', href: '/duffels' },
  { name: 'Backpacks', icon: '🎒', href: '/backpacks' },
  { name: 'Water Bottles', icon: '💧', href: '/collection' },
  { name: 'Travel Accessories', icon: '✈️', href: '/collection' },
  { name: 'Corporate Gift Sets', icon: '🎁', href: '/collection' },
]

export default function CorporateGiftingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D1A5C 0%, #1E3FA3 60%, #2B50C4 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-amber-400 mb-4">Premium</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">
                Corporate<br />Gifting
              </h1>
              <p className="text-lg font-semibold text-amber-400 mb-3">Fully Customizable Joining Kits</p>
              <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
                Thoughtful gifts. Lasting impressions.<br />
                Premium gifting solutions that reflect your brand, values and appreciation.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Premium Quality', 'Custom Branding', 'Bulk Order Support', 'Timely Delivery'].map(f => (
                  <span key={f} className="flex items-center gap-1.5 text-xs font-semibold text-white bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />{f}
                  </span>
                ))}
              </div>
              <a href="#enquire" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0D1A5C] font-bold px-7 py-3.5 rounded transition-colors text-sm">
                Enquire Now →
              </a>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-white/10">
                <Image
                  src="/uploads/corporate/trolley-podium.jpg"
                  alt="Corporate gifting kits"
                  fill className="object-cover opacity-90"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0D1A5C]/40 to-transparent" />
                {/* Stat chips */}
                <div className="absolute bottom-4 left-4 bg-white rounded-xl px-4 py-2.5 shadow-lg">
                  <p className="text-xs text-gray-500">Minimum Order</p>
                  <p className="text-lg font-extrabold text-[#1E3FA3]">20 Units</p>
                </div>
                <div className="absolute top-4 right-4 bg-amber-400 rounded-xl px-4 py-2.5 shadow-lg">
                  <p className="text-xs text-[#0D1A5C] font-medium">Bulk Discount</p>
                  <p className="text-lg font-extrabold text-[#0D1A5C]">Up to 30% Off</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO CAN WE GIFT ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1E3FA3] mb-2 block">Reach Everyone</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Who Can We Gift?</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {whoCards.map(({ icon, title, desc }) => (
              <div key={title} className="text-center p-8 rounded-2xl border border-blue-100 hover:border-[#1E3FA3]/30 hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-2xl bg-[#EBF0FB] flex items-center justify-center mx-auto mb-4 text-2xl">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SHOULD WE GIFT ── */}
      <section className="py-16 bg-[#EBF0FB]/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1E3FA3] mb-2 block">The Impact</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Should We Gift?</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {whyCards.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-bold text-[#1E3FA3] mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHEN CAN WE GIFT ── */}
      <section className="py-16 bg-[#F8F9FE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1E3FA3] mb-2 block">Every Occasion</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">When Can We Gift?</h2>
            <p className="text-gray-500 text-sm mt-2">From boardrooms to celebrations — every moment is a gifting opportunity</p>
          </div>

          {/* Featured card + 4 small cards */}
          <div className="grid lg:grid-cols-5 gap-4">
            {/* Featured large card */}
            {whenCards.filter(c => c.featured).map(({ icon, title, desc, image }) => (
              <div key={title} className="lg:col-span-2 relative rounded-3xl overflow-hidden group cursor-default" style={{ minHeight: 380 }}>
                <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:1024px) 100vw, 40vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A5C]/90 via-[#0D1A5C]/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <span className="text-3xl mb-3">{icon}</span>
                  <span className="inline-block bg-amber-400 text-[#0D1A5C] text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full w-fit mb-3">Featured</span>
                  <h3 className="text-white text-2xl font-extrabold mb-2">{title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}

            {/* 4 smaller cards */}
            <div className="lg:col-span-3 grid grid-cols-2 gap-4">
              {whenCards.filter(c => !c.featured).map(({ icon, title, desc, image }) => (
                <div key={title} className="relative rounded-2xl overflow-hidden group cursor-default" style={{ minHeight: 180 }}>
                  <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A5C]/85 via-[#0D1A5C]/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <span className="text-xl mb-1">{icon}</span>
                    <h3 className="text-white text-sm font-bold leading-tight mb-1">{title}</h3>
                    <p className="text-white/70 text-[11px] leading-relaxed hidden sm:block">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FULLY CUSTOMIZABLE ── */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #0D1A5C 0%, #1E3FA3 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400 mb-2 block">Tailored for You</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Fully Customizable</h2>
            <p className="text-white/60 mt-2 text-sm">Just the Way You Want</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {customOptions.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-colors">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-bold text-white mb-1.5 text-sm">{title}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-4 text-center">
            {[
              { val: '20+', label: 'Minimum Order Units' },
              { val: '30%', label: 'Maximum Bulk Discount' },
              { val: '48h', label: 'Quote Turnaround' },
            ].map(({ val, label }) => (
              <div key={label} className="bg-white/10 rounded-xl py-5 px-4">
                <p className="text-3xl font-extrabold text-amber-400">{val}</p>
                <p className="text-white/70 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT CATEGORIES ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1E3FA3] mb-2 block">What We Offer</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Product Categories</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {productCategories.map(({ name, icon, href }) => (
              <Link
                key={name}
                href={href}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-blue-100 hover:border-[#1E3FA3] hover:bg-[#EBF0FB]/50 transition-all text-center group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{icon}</span>
                <span className="text-xs font-semibold text-gray-700 leading-tight">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 bg-[#EBF0FB]/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1E3FA3] mb-2 block">Simple Process</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">How It Works</h2>
          </div>
          <div className="grid sm:grid-cols-4 gap-6 relative">
            <div className="hidden sm:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-blue-100 z-0" />
            {[
              { step: '01', title: 'Get in Touch', desc: 'Fill the enquiry form or call us with your requirements.' },
              { step: '02', title: 'Get a Quote', desc: 'Receive a custom quote within 24 hours with bulk pricing.' },
              { step: '03', title: 'Customise', desc: 'Choose logo placement, packaging and delivery options.' },
              { step: '04', title: 'Deliver', desc: 'We handle packaging and pan-India delivery on schedule.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative z-10 text-center">
                <div className="w-12 h-12 rounded-full bg-[#1E3FA3] text-white text-sm font-bold flex items-center justify-center mx-auto mb-3 shadow-md">{step}</div>
                <h3 className="text-sm font-bold mb-1 text-[#1E3FA3]">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY FALCON PLUS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1E3FA3] mb-3 block">Why Choose Us</span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-5">Why Choose Falcon Plus for Corporate Gifts?</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Corporate gifting is more than a transaction — it&apos;s a statement about your brand. When you give a Falcon Plus bag, you&apos;re giving a premium product your recipients will use every day, keeping your brand visible and appreciated.
              </p>
              <ul className="space-y-3">
                {[
                  'Minimum order of just 20 units',
                  'Custom logo embroidery or printing',
                  'Dedicated account manager',
                  'Bulk pricing up to 30% off',
                  'Pan-India delivery',
                  'Custom packaging and gift notes',
                ].map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-[#EBF0FB] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#1E3FA3] text-xs font-bold">✓</span>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EBF0FB]">
              <Image
                src="/uploads/corporate/trolley-white.jpg"
                alt="Falcon Plus corporate gifting"
                fill className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA + CONTACT ── */}
      <section id="enquire" className="py-16" style={{ background: 'linear-gradient(135deg, #0D1A5C 0%, #1E3FA3 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400 mb-3 block">Let&apos;s Connect</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Let&apos;s Create Something<br />Meaningful Together
              </h2>
              <p className="text-white/60 text-sm mb-8">
                Connect with us for bulk orders, customization & corporate enquiries.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '📞', label: '+91 12345 67890' },
                  { icon: '✉️', label: 'corporate@falconplus.in' },
                  { icon: '🌐', label: 'www.falconplus.in' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-3 text-white/80 text-sm">
                    <span className="text-lg">{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold text-gray-900 mb-1">Request a Quote</h3>
              <p className="text-xs text-gray-400 mb-5">Tell us your requirements — we&apos;ll respond within 24 hours.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
