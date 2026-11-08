import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { publicHeaders } from '@/lib/public-operation'

export function OPTIONS() { return new NextResponse(null, { status: 204, headers: publicHeaders }) }

export async function GET() {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'restaurant-settings', overrideAccess: true })
  return NextResponse.json({
    slots: (settings.reservationSlots ?? []).map((slot) => slot.time),
    closures: (settings.exceptionalClosures ?? []).map((closure) => String(closure.date).slice(0, 10)),
  }, { headers: { ...publicHeaders, 'Access-Control-Allow-Methods': 'GET, OPTIONS' } })
}
