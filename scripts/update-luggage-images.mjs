import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const supabase = createClient(
  'https://lkrvsvhfwahpslxplezi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrcnZzdmhmd2FocHNseHBsZXppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM0NTQ3OSwiZXhwIjoyMDkyOTIxNDc5fQ.VDZ-q0MSRGfy5awEIX091J4bZaK9sD5K4zvURHehbSw'
)

const products = JSON.parse(readFileSync(join(__dirname, '../data/products.json'), 'utf-8'))
const luggage = products.filter(p => p.category === 'luggage')

async function run() {
  for (const p of luggage) {
    const { error } = await supabase
      .from('products')
      .update({
        image: p.image,
        hover_image: p.hoverImage,
        colors: p.colors,
      })
      .eq('id', p.id)

    if (error) {
      console.error(`Error updating ${p.id}:`, error.message)
    } else {
      console.log(`✓ Updated ${p.id} (${p.name})`)
    }
  }
  console.log('Done!')
}

run()
