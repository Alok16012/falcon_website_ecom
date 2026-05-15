import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const supabase = createClient(
  'https://lkrvsvhfwahpslxplezi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrcnZzdmhmd2FocHNseHBsZXppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM0NTQ3OSwiZXhwIjoyMDkyOTIxNDc5fQ.VDZ-q0MSRGfy5awEIX091J4bZaK9sD5K4zvURHehbSw'
)

const BASE = 'https://lkrvsvhfwahpslxplezi.supabase.co/storage/v1/object/public/falcon-images'
const FOLDER = '/Users/alokkumar/Downloads/Neo duffel trolly'

async function uploadImages() {
  const files = readdirSync(FOLDER).filter(f => /\.(jpg|jpeg|png)$/i.test(f))
  const urls = []

  for (const file of files) {
    const buf = readFileSync(join(FOLDER, file))
    const timestamp = Date.now()
    const random = Math.random().toString(36).slice(2, 12)
    const filename = `${timestamp}-${random}.jpeg`

    const { error } = await supabase.storage
      .from('falcon-images')
      .upload(filename, buf, { contentType: 'image/jpeg', upsert: false })

    if (error) {
      console.error(`❌ Upload failed for ${file}:`, error.message)
    } else {
      const url = `${BASE}/${filename}`
      urls.push(url)
      console.log(`✓ Uploaded: ${file} → ${filename}`)
    }
  }

  return urls
}

async function insertProduct(imageUrls) {
  const [mainImage, hoverImage] = imageUrls

  const colors = ['Navy Blue', 'Black', 'Grey']

  const product = {
    id: 'df-neo-001',
    slug: 'neo-duffel-trolley',
    name: 'Neo Duffel Trolley',
    category: 'duffels',
    price: 2999,
    mrp: 4999,
    badge: 'NEW',
    rating: 4.5,
    reviews: 0,
    image: mainImage,
    hover_image: hoverImage,
    description: 'The Neo Duffel Trolley blends the versatility of a duffel bag with the convenience of a trolley. Perfect for weekend getaways, gym sessions, or short business trips. Available in 20", 22", and 24" sizes to suit every need.',
    colors,
    sizes: ['20"', '22"', '24"'],
    features: [
      'Telescopic trolley handle',
      'Smooth spinner wheels',
      'Spacious main compartment',
      'Detachable shoulder strap',
      'Front zippered pocket',
      'Water-resistant fabric',
      'Durable YKK zippers',
      'Lightweight construction',
    ],
    in_stock: true,
  }

  const { error } = await supabase.from('products').upsert(product)
  if (error) {
    console.error('❌ Product insert failed:', error.message)
  } else {
    console.log('✓ Neo Duffel Trolley added to Supabase!')
    console.log('  Main image:', mainImage)
    console.log('  Hover image:', hoverImage)
    console.log('  All uploaded URLs:')
    imageUrls.forEach((u, i) => console.log(`  [${i}] ${u}`))
  }
}

// Images already uploaded in previous run — use those URLs directly
const UPLOADED_URLS = [
  `${BASE}/1778829346936-1j864udgtp.jpeg`,
  `${BASE}/1778829348330-n7sr3sjw11.jpeg`,
  `${BASE}/1778829349162-go67giucuo.jpeg`,
  `${BASE}/1778829349955-1cnjw0y52r.jpeg`,
  `${BASE}/1778829351243-kmw2afwxv7.jpeg`,
  `${BASE}/1778829352505-o17kxwk6nx.jpeg`,
  `${BASE}/1778829353472-vwprhbjx69.jpeg`,
  `${BASE}/1778829354713-f0ub6vwz05.jpeg`,
  `${BASE}/1778829356232-uxtz6pydty.jpeg`,
  `${BASE}/1778829356712-oxdmq9sa4p.jpeg`,
  `${BASE}/1778829357616-vll15eh27y.jpeg`,
  `${BASE}/1778829358403-wp18g6cx8h.jpeg`,
  `${BASE}/1778829359522-n3f9g7r4r3.jpeg`,
  `${BASE}/1778829360870-ndtwwtmydy.jpeg`,
  `${BASE}/1778829361370-v7rgt6wf8r.jpeg`,
  `${BASE}/1778829362418-pyeoehy69b.jpeg`,
]

await insertProduct(UPLOADED_URLS)
