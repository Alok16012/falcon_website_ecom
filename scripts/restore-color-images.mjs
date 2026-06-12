import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter(l => l.includes('='))
    .map(l => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]
    })
)

const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const NEO_BASE = 'https://lkrvsvhfwahpslxplezi.supabase.co/storage/v1/object/public/falcon-images'
const NEO_IMAGES = [
  '1778829346936-1j864udgtp', '1778829348330-n7sr3sjw11', '1778829349162-go67giucuo',
  '1778829349955-1cnjw0y52r', '1778829351243-kmw2afwxv7', '1778829352505-o17kxwk6nx',
  '1778829353472-vwprhbjx69', '1778829354713-f0ub6vwz05', '1778829356232-uxtz6pydty',
  '1778829356712-oxdmq9sa4p', '1778829357616-vll15eh27y', '1778829358403-wp18g6cx8h',
  '1778829359522-n3f9g7r4r3', '1778829360870-ndtwwtmydy', '1778829361370-v7rgt6wf8r',
  '1778829362418-pyeoehy69b',
].map(n => `${NEO_BASE}/${n}.jpeg`)

const dz = '/uploads/duffels/'
const lz = '/uploads/luggage/'

// slug -> colorImages map (first image of first colour becomes the default `image`)
const RESTORES = {
  'neo-duffel-trolley': {
    'Navy Blue': NEO_IMAGES.slice(0, 8),
    'Black': NEO_IMAGES.slice(8, 16),
  },
  'jakat-duffel-trolley': {
    'Blue': [1, 2, 3, 4, 5].map(n => `${dz}jakat-blue-${n}.jpg`),
    'Red': [1, 2, 3, 4].map(n => `${dz}jakat-red-${n}.jpg`),
    'Black': [1, 2, 3, 4, 5, 6].map(n => `${dz}jakat-black-${n}.jpg`),
  },
  'aeroglide-cabin': {
    'Sky Blue': ['front', 'side1', 'side2', 'spine', 'interior'].map(s => `${lz}lg-blue-${s}.jpg`),
    'Mint Green': ['front', 'side1', 'side2', 'spine', 'interior'].map(s => `${lz}lg-mint-${s}.jpg`),
    'Black': ['front', 'side1', 'side2', 'spine', 'interior'].map(s => `${lz}lg-black-${s}.jpg`),
    'Rose Gold': ['front', 'side1', 'side2', 'back', 'interior'].map(s => `${lz}lg-rosegold-${s}.jpg`),
    'Navy': ['front', 'side1', 'side2', 'back', 'interior'].map(s => `${lz}lg-navy-${s}.jpg`),
  },
  'tokyo-trolley': {
    'Red': [1, 2, 3].map(n => `${lz}tokyo-red-${n}.jpg`),
    'Maroon': [1, 2, 3].map(n => `${lz}tokyo-maroon-${n}.jpg`),
  },
}

for (const [slug, colorImages] of Object.entries(RESTORES)) {
  const { data: cur, error: readErr } = await db
    .from('products').select('id, color_images').eq('slug', slug).single()
  if (readErr || !cur) {
    console.error(`✗ ${slug}: not found (${readErr?.message})`)
    continue
  }

  const merged = { ...colorImages }
  if (cur.color_images?.__size_prices) merged.__size_prices = cur.color_images.__size_prices

  const firstColor = Object.keys(colorImages)[0]
  const defaultImage = colorImages[firstColor][0]

  const { error } = await db
    .from('products')
    .update({ color_images: merged, image: defaultImage })
    .eq('slug', slug)

  if (error) {
    console.error(`✗ ${slug}: ${error.message}`)
  } else {
    const summary = Object.entries(colorImages).map(([c, a]) => `${c}(${a.length})`).join(', ')
    console.log(`✓ ${slug}: ${summary}`)
  }
}
