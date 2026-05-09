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
    color_images: body.colorImages ?? null,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProduct(row: any) {
  return { ...row, hoverImage: row.hover_image, inStock: row.in_stock, colorImages: row.color_images }
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { data, error } = await db().from('products').select('*').eq('id', params.id).single()
  if (error) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(toProduct(data))
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const row = toRow({ ...body, id: params.id })
    const { error } = await db().from('products').update(row).eq('id', params.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(toProduct({ ...row, id: params.id }))
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await db().from('products').delete().eq('id', params.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
