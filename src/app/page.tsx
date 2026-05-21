import Image from 'next/image'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import ProductCard from '@/components/ProductCard'
import NewsletterForm from '@/components/NewsletterForm'
import { getFeaturedProducts, getProductsByCategory, categories } from '@/lib/products'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [featured, luggageProducts] = await Promise.all([
    getFeaturedProducts(8),
    getProductsByCategory('luggage'),
  ])

  return (
    <>
      <HeroSection />

      {/* Shop by Category */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
            <p className="text-gray-500 text-sm">Find the perfect bag for every occasion</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/5]"
                style={{ background: 'linear-gradient(135deg, #0D1A5C, #1E3FA3)' }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover opacity-50 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A5C]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-base mb-0.5">{cat.name}</h3>
                  <p className="text-white/70 text-xs mb-3">{cat.description}</p>
                  <span className="text-xs text-white border-b border-white/50 pb-0.5 group-hover:border-white transition-colors">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-14 bg-[#EBF0FB]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Featured Products</h2>
              <p className="text-gray-500 text-sm">Handpicked from our best sellers</p>
            </div>
            <Link href="/collection" className="text-sm font-semibold text-[#1E3FA3] border-b border-[#1E3FA3] pb-0.5 hover:text-[#162D80] hover:border-[#162D80] transition-colors hidden sm:block">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10 sm:hidden">
            <Link href="/collection" className="btn-outline inline-block rounded">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden col-span-2">
                <Image
                  src="/uploads/story/factory-floor.jpg"
                  alt="Falcon Plus factory floor"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/uploads/story/stitching-machine.jpg"
                  alt="Stitching craftsmanship"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/uploads/story/packaging.jpg"
                  alt="Falcon Plus packaging"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1E3FA3] mb-3 block">Our Story</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
                Every Stitch<br />Has A Story
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Since 1985, Falcon Plus has been crafting bags that carry not just your belongings — but your ambitions.
                Born in a Mumbai workshop, built for the world.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                From nature-inspired designs to smart urban packs, every bag we make is a testament to our belief
                that great design improves everyday life.
              </p>
              <Link href="/our-story" className="btn-primary inline-block rounded">
                Discover Our Journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-12 bg-[#EBF0FB]/40 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders ₹999+' },
              { icon: '⭐', title: 'Premium Quality', desc: 'Crafted to last' },
              { icon: '↩️', title: 'Easy Returns', desc: '7-day hassle-free' },
              { icon: '🌿', title: 'Cruelty-Free', desc: 'Ethical materials' },
              { icon: '🇮🇳', title: 'Made in India', desc: 'Designed locally' },
              { icon: '💧', title: 'Water Repellent', desc: 'All-weather ready' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{icon}</span>
                <h4 className="text-xs font-bold text-[#1E3FA3]">{title}</h4>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Backpacks */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Trending Backpacks</h2>
              <p className="text-gray-500 text-sm">Most loved by our customers</p>
            </div>
            <Link href="/backpacks" className="text-sm font-semibold text-[#1E3FA3] border-b border-[#1E3FA3] pb-0.5 hover:text-[#162D80] hover:border-[#162D80] transition-colors hidden sm:block">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {featured.filter((p: { category: string }) => p.category === 'backpacks').slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Luggage */}
      <section className="py-14 bg-[#EBF0FB]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Trending Luggage</h2>
              <p className="text-gray-500 text-sm">Premium hardside trolleys for every journey</p>
            </div>
            <Link href="/luggage" className="text-sm font-semibold text-[#1E3FA3] border-b border-[#1E3FA3] pb-0.5 hover:text-[#162D80] hover:border-[#162D80] transition-colors hidden sm:block">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {luggageProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/luggage" className="btn-outline inline-block rounded">
              View All Luggage
            </Link>
          </div>
        </div>
      </section>

      {/* Full-width CTA Banner */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D1A5C 0%, #1E3FA3 60%, #2B50C4 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-4 block">Limited Time</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            New Collection<br />Just Landed
          </h2>
          <p className="text-lg text-white/60 mb-8 max-w-lg mx-auto">
            Explore our latest designs — built for the modern traveller who refuses to compromise on style or function.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/collection" className="bg-white text-[#1E3FA3] px-8 py-3.5 text-sm font-bold hover:bg-[#EBF0FB] transition-colors rounded">
              Shop the Collection
            </Link>
            <Link href="/our-story" className="border border-white/40 text-white px-8 py-3.5 text-sm font-semibold hover:border-white transition-colors rounded">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              {/* Instagram gradient icon */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
                style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}>
                📸
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Follow us on Instagram</p>
                <p className="text-base font-bold text-gray-900">@falconplus_bags</p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/falconplus_bags?igsh=Z25uOXd6NnpuejIz&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-white px-6 py-2 rounded-full transition-opacity hover:opacity-90 self-start sm:self-auto"
              style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}
            >
              Follow
            </a>
          </div>

          {/* Grid — 3 cols mobile, 6 cols desktop */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
            {[
              { src: '/uploads/luggage/lg-blue-front.jpg',      alt: 'Sky Blue AeroGlide Cabin' },
              { src: '/uploads/corporate/duffle-city.jpg',       alt: 'Duffel in the city' },
              { src: '/uploads/luggage/lg-rosegold-front.jpg',  alt: 'Rose Gold Trolley' },
              { src: '/uploads/corporate/duffle-studio.jpg',     alt: 'Studio duffel shoot' },
              { src: '/uploads/luggage/lg-navy-front.jpg',      alt: 'Navy Trolley' },
              { src: '/uploads/story/factory-floor.jpg',         alt: 'Falcon Plus factory' },
            ].map(({ src, alt }, i) => (
              <a
                key={i}
                href="https://www.instagram.com/falconplus_bags?igsh=Z25uOXd6NnpuejIz&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg sm:rounded-xl overflow-hidden bg-gray-100"
              >
                {/* wrapper div gives the square dimensions */}
                <div className="relative w-full aspect-square">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 33vw, 16vw"
                    unoptimized
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="currentColor" viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-6">
            <a
              href="https://www.instagram.com/falconplus_bags?igsh=Z25uOXd6NnpuejIz&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              View all posts on Instagram →
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Strap In for Updates</h2>
          <p className="text-gray-500 text-sm mb-6">
            Subscribe now for the latest in bags, exclusive offers, style tips, and inspiring content.
          </p>
          <NewsletterForm />
          <p className="text-xs text-gray-400 mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  )
}
