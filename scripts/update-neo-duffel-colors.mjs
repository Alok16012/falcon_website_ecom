import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://lkrvsvhfwahpslxplezi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrcnZzdmhmd2FocHNseHBsZXppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM0NTQ3OSwiZXhwIjoyMDkyOTIxNDc5fQ.VDZ-q0MSRGfy5awEIX091J4bZaK9sD5K4zvURHehbSw'
)

const BASE = 'https://lkrvsvhfwahpslxplezi.supabase.co/storage/v1/object/public/falcon-images'

// All 16 uploaded images — split into 2 color variants (8 each)
const ALL_IMAGES = [
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

// Split 16 images into 2 color groups of 8
const colorImages = {
  'Navy Blue': ALL_IMAGES.slice(0, 8),
  'Black':     ALL_IMAGES.slice(8, 16),
}

const { error } = await supabase
  .from('products')
  .update({
    colors: ['Navy Blue', 'Black'],
    color_images: colorImages,
    image: ALL_IMAGES[0],
    hover_image: ALL_IMAGES[1],
  })
  .eq('id', 'df-neo-001')

if (error) {
  console.error('❌ Update failed:', error.message)
} else {
  console.log('✓ Neo Duffel Trolley updated!')
  console.log('  Colors: Navy Blue (8 images), Black (8 images)')
  console.log('  Total images linked:', ALL_IMAGES.length)
}
