import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'products.json')

function readProducts() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
}

function writeProducts(data: unknown) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const products = readProducts()
  const product = products.find((p: { id: string }) => p.id === params.id)
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(product)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const products = readProducts()
    const idx = products.findIndex((p: { id: string }) => p.id === params.id)
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    products[idx] = { ...products[idx], ...body, id: params.id }
    writeProducts(products)
    return NextResponse.json(products[idx])
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const products = readProducts()
    const filtered = products.filter((p: { id: string }) => p.id !== params.id)
    if (filtered.length === products.length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    writeProducts(filtered)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
