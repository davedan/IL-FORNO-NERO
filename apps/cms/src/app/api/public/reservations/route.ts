import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { assertReservationAvailability, PublicOperationError, publicHeaders, reservationFrom } from '@/lib/public-operation'

export function OPTIONS() { return new NextResponse(null, { status: 204, headers: publicHeaders }) }

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })
    const data = reservationFrom(await request.json())
    await assertReservationAvailability(payload, data.date, data.time)
    const reservation = await payload.create({ collection: 'reservations', data, overrideAccess: true })
    return NextResponse.json({ id: reservation.id, status: reservation.status }, { status: 201, headers: publicHeaders })
  } catch (error) {
    const message = error instanceof PublicOperationError ? error.message : 'No se ha podido registrar la reserva.'
    return NextResponse.json({ message }, { status: error instanceof PublicOperationError ? 400 : 500, headers: publicHeaders })
  }
}
