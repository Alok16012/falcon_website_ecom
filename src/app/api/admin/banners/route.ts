import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'banners.json')

function readBanners() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
}

function writeBanners(data: unknown) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

export async function GET() {
  try {
    return NextResponse.json(readBanners())
  } catch {
    return NextResponse.json({ error: 'Failed to read banners' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    writeBanners(body)
    return NextResponse.json(body)
  } catch {
    return NextResponse.json({ error: 'Failed to update banners' }, { status: 500 })
  }
}
