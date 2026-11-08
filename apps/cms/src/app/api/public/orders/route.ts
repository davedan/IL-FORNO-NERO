import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { orderFrom, PublicOperationError, publicHeaders } from '@/lib/public-operation'

export function OPTIONS() { return new NextResponse(null, { status: 204, headers: publicHeaders }) }

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })
    const data = await orderFrom(payload, await request.json())
    const existing = await payload.find({ collection: 'orders', where: { checkoutKey: { equals: data.checkoutKey } }, limit: 1, depth: 0, overrideAccess: true })
    if (existing.docs[0]) return NextResponse.json({ id: existing.docs[0].id, status: existing.docs[0].status }, { status: 200, headers: publicHeaders })
    try {
      const order = await payload.create({ collection: 'orders', data, overrideAccess: true })
      return NextResponse.json({ id: order.id, status: order.status }, { status: 201, headers: publicHeaders })
    } catch (error) {
      const replay = await payload.find({ collection: 'orders', where: { checkoutKey: { equals: data.checkoutKey } }, limit: 1, depth: 0, overrideAccess: true })
      if (replay.docs[0]) return NextResponse.json({ id: replay.docs[0].id, status: replay.docs[0].status }, { status: 200, headers: publicHeaders })
      throw error
    }
  } catch (error) {
    const message = error instanceof PublicOperationError ? error.message : 'No se ha podido registrar el pedido.'
    return NextResponse.json({ message }, { status: error instanceof PublicOperationError ? 400 : 500, headers: publicHeaders })
  }
}
