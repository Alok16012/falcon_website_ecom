import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toBanner(row: any) {
  return {
    id: String(row.id),
    accent: row.accent ?? '',
    headline: row.headline ?? '',
    subheadline: row.subheadline ?? '',
    cta: row.cta ?? '',
    ctaHref: row.cta_href ?? '',
    image: row.image ?? '',
    active: Boolean(row.active),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toRow(banner: any, index: number) {
  return {
    id: parseInt(banner.id) || (index + 1),
    accent: banner.accent ?? '',
    headline: banner.headline ?? '',
    subheadline: banner.subheadline ?? '',
    cta: banner.cta ?? '',
    cta_href: banner.ctaHref ?? '',
    image: banner.image ?? '',
    active: Boolean(banner.active),
    sort_order: index + 1,
  }
}

export async function GET() {
  const { data, error } = await db().from('banners').select('*').order('sort_order')
  if (error) return NextResponse.json([], { status: 200 })
  return NextResponse.json((data ?? []).map(toBanner))
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const rows = body.map(toRow)
    // Delete all and reinsert to handle order + deletions
    await db().from('banners').delete().neq('id', 0)
    const { error } = await db().from('banners').insert(rows)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(body)
  } catch {
    return NextResponse.json({ error: 'Failed to update banners' }, { status: 500 })
  }
}
