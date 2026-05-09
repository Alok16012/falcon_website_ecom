import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const supabase = createClient(
  'https://lkrvsvhfwahpslxplezi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrcnZzdmhmd2FocHNseHBsZXppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM0NTQ3OSwiZXhwIjoyMDkyOTIxNDc5fQ.VDZ-q0MSRGfy5awEIX091J4bZaK9sD5K4zvURHehbSw'
)

async function seed() {
  // Seed products
  const products = JSON.parse(readFileSync(join(__dirname, '../data/products.json'), 'utf-8'))
  const productRows = products.map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    price: p.price,
    mrp: p.mrp,
    badge: p.badge ?? null,
    rating: p.rating,
    reviews: p.reviews,
    image: p.image ?? '',
    hover_image: p.hoverImage ?? '',
    description: p.description ?? '',
    colors: p.colors ?? [],
    sizes: p.sizes ?? [],
    features: p.features ?? [],
    in_stock: p.inStock ?? true,
  }))
  const { error: pe } = await supabase.from('products').upsert(productRows)
  if (pe) { console.error('Products error:', pe.message); process.exit(1) }
  console.log(`✓ Seeded ${products.length} products`)

  // Seed banners
  const banners = JSON.parse(readFileSync(join(__dirname, '../data/banners.json'), 'utf-8'))
  const { error: be } = await supabase.from('banners').upsert({ id: 1, data: banners })
  if (be) { console.error('Banners error:', be.message); process.exit(1) }
  console.log(`✓ Seeded ${banners.length} banners`)
}

seed()
