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

export async function GET() {
  try {
    const products = readProducts()
    return NextResponse.json(products)
  } catch {
    return NextResponse.json({ error: 'Failed to read products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const products = readProducts()
    const newProduct = {
      ...body,
      id: `prod-${Date.now()}`,
      slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }
    products.push(newProduct)
    writeProducts(products)
    return NextResponse.json(newProduct, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
