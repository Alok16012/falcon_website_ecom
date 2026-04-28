import Image from 'next/image'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export const metadata = { title: 'Corporate Gifting — Falcon Plus Bags' }

export default function CorporateGiftingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D1A5C 0%, #1E3FA3 70%, #2B50C4 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-4 block">For Businesses</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Corporate Gifting</h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Elevate your corporate gifting with premium, customisable bags that leave a lasting impression.
          </p>
        </div>
      </section>

      {/* Why section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1E3FA3] mb-3 block">Why Falcon Plus</span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why Choose Falcon Plus for Corporate Gifts?</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Corporate gifting is more than a transaction — it&apos;s a statement about your brand. When you give a Falcon Plus bag,
                you&apos;re giving a premium product that your recipients will use every day, keeping your brand visible and appreciated.
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
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E3FA3] flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#EBF0FB]">
              <Image
                src="https://picsum.photos/seed/corporate-bags/700/450"
                alt="Corporate gifting"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular gifting options */}
      <section className="py-12 bg-[#EBF0FB]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Gifting Options</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'City Commuter Pro', category: 'Backpack', price: '₹2,499+', image: 'https://picsum.photos/seed/gift1/400/300', popular: true },
              { name: 'Executive Slim Pack', category: 'Backpack', price: '₹2,999+', image: 'https://picsum.photos/seed/gift2/400/300', popular: false },
              { name: 'Urban Weekend Duffel', category: 'Duffel Bag', price: '₹2,199+', image: 'https://picsum.photos/seed/gift3/400/300', popular: true },
              { name: 'TechGuard Laptop Pack', category: 'Backpack', price: '₹3,299+', image: 'https://picsum.photos/seed/gift4/400/300', popular: false },
              { name: 'FlexFit Gym Bag', category: 'Duffel Bag', price: '₹1,799+', image: 'https://picsum.photos/seed/gift5/400/300', popular: false },
              { name: 'AeroGlide Cabin 20"', category: 'Luggage', price: '₹5,999+', image: 'https://picsum.photos/seed/gift6/400/300', popular: true },
            ].map(({ name, category, price, image, popular }) => (
              <div key={name} className="bg-white rounded-xl border border-blue-100 overflow-hidden hover:shadow-md hover:border-[#1E3FA3]/30 transition-all">
                <div className="relative aspect-video bg-[#EBF0FB]">
                  <Image src={image} alt={name} fill className="object-cover" sizes="400px" unoptimized />
                  {popular && (
                    <span className="absolute top-2 left-2 bg-[#1E3FA3] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      POPULAR
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-0.5">{category}</p>
                  <h3 className="text-sm font-semibold mb-1">{name}</h3>
                  <p className="text-sm text-[#1E3FA3] font-bold">{price} <span className="text-xs text-gray-400 font-normal">(bulk pricing)</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid sm:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Get in Touch', desc: 'Fill in the enquiry form or call us with your requirements.' },
              { step: '02', title: 'Get a Quote', desc: 'Receive a custom quote within 24 hours including bulk pricing.' },
              { step: '03', title: 'Customise', desc: 'Choose your logo placement, packaging, and delivery options.' },
              { step: '04', title: 'Deliver', desc: 'We handle packaging and pan-India delivery on your schedule.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#1E3FA3] text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">
                  {step}
                </div>
                <h3 className="text-sm font-bold mb-1 text-[#1E3FA3]">{title}</h3>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-16 bg-[#EBF0FB]/30">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-2">Request a Quote</h2>
          <p className="text-gray-500 text-center text-sm mb-8">Tell us about your requirements and we&apos;ll get back within 24 hours.</p>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
