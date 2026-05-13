import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://lkrvsvhfwahpslxplezi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrcnZzdmhmd2FocHNseHBsZXppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM0NTQ3OSwiZXhwIjoyMDkyOTIxNDc5fQ.VDZ-q0MSRGfy5awEIX091J4bZaK9sD5K4zvURHehbSw'
)

const BASE = 'https://lkrvsvhfwahpslxplezi.supabase.co/storage/v1/object/public/falcon-images'

// Unique images grouped by size — assign best quality to products
// PNG (1MB) = green lifestyle trolley  |  1.4MB/1.96MB = large duffel shots
// 423KB/301KB = clean product shots   |  165KB/121KB = compact shots
const updates = [
  {
    id: 'lg-001',
    image:       `${BASE}/1777960096611-9xgbnmhk6v7.png`,   // green lifestyle (1MB PNG)
    hover_image: `${BASE}/1777959659709-s82ygqsqzq9.jpeg`,  // clean product (301KB)
  },
  {
    id: 'lg-002',
    image:       `${BASE}/1777960852534-my8d72zl1y.jpeg`,   // large lifestyle (1.96MB)
    hover_image: `${BASE}/1777960930173-ll84xb5rnkn.jpeg`,  // medium shot (423KB)
  },
  {
    id: 'lg-003',
    image:       `${BASE}/1777951941624-1vxidlaposa.jpeg`,   // large lifestyle (1.4MB)
    hover_image: `${BASE}/1777960107234-dmzm15xcrx.png`,    // green lifestyle (1MB PNG)
  },
  {
    id: 'lg-004',
    image:       `${BASE}/1777960083146-kxrr5md204.jpeg`,   // large (1.4MB)
    hover_image: `${BASE}/1777959782986-z6ghtdu6f38.jpg`,   // compact (165KB)
  },
]

for (const { id, image, hover_image } of updates) {
  const { error } = await supabase
    .from('products')
    .update({ image, hover_image })
    .eq('id', id)
  if (error) console.error(`❌ ${id}:`, error.message)
  else console.log(`✓ ${id} updated`)
}
