import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toRow(body: any) {
  return {
    id: body.id,
    slug: body.slug,
    name: body.name,
    category: body.category,
    price: body.price,
    mrp: body.mrp,
    badge: body.badge ?? null,
    rating: body.rating,
    reviews: body.reviews,
    image: body.image ?? '',
    hover_image: body.hoverImage ?? '',
    description: body.description ?? '',
    colors: body.colors ?? [],
    sizes: body.sizes ?? [],
    features: body.features ?? [],
    in_stock: body.inStock ?? true,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProduct(row: any) {
  return { ...row, hoverImage: row.hover_image, inStock: row.in_stock }
}

export async function GET() {
  const { data, error } = await db().from('products').select('*')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json((data ?? []).map(toProduct))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const id = `prod-${Date.now()}`
    const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const row = toRow({ ...body, id, slug })
    const { error } = await db().from('products').insert(row)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(toProduct(row), { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
