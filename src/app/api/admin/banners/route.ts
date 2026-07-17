import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

// Never serve stale banner data — Next.js would otherwise cache the GET
// response (and supabase's underlying fetch) so saves never showed up.
export const dynamic = 'force-dynamic'
export const revalidate = 0

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      global: {
        fetch: (input: RequestInfo | URL, init?: RequestInit) =>
          fetch(input, { ...init, cache: 'no-store' }),
      },
    }
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
  // Reassign sequential ids on every save — reusing client ids caused
  // duplicate-key failures after a delete + add in the same session.
  return {
    id: String(index + 1),
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
  if (error) return NextResponse.json([])
  return NextResponse.json((data ?? []).map(toBanner))
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const rows = body.map(toRow)

    // Delete all existing rows then re-insert (handles deletions + reordering)
    const client = db()
    const { error: delError } = await client.from('banners').delete().not('id', 'is', null)
    if (delError) return NextResponse.json({ error: delError.message }, { status: 500 })
    const { error } = await client.from('banners').insert(rows)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Bust the homepage cache so the new banner shows immediately
    revalidatePath('/', 'page')

    return NextResponse.json(body)
  } catch {
    return NextResponse.json({ error: 'Failed to update banners' }, { status: 500 })
  }
}
