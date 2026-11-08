import type { Payload } from 'payload'

type Contact = { name?: unknown; email?: unknown; telephone?: unknown }

export class PublicOperationError extends Error {}

const publicOrigin = process.env.PUBLIC_SITE_URL || 'http://localhost:4321'
export const publicHeaders = { 'Access-Control-Allow-Origin': publicOrigin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', Vary: 'Origin' }

export const contactFrom = (input: Contact) => {
  const name = String(input.name ?? '').trim()
  const email = String(input.email ?? '').trim().toLowerCase()
  const telephone = String(input.telephone ?? '').trim()
  if (!name || name.length > 120) throw new PublicOperationError('Introduce un nombre válido.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new PublicOperationError('Introduce un email válido.')
  if (!telephone || telephone.length > 40) throw new PublicOperationError('Introduce un teléfono válido.')
  return { name, email, telephone }
}

export const reservationFrom = (input: Record<string, unknown>) => {
  const contact = contactFrom(input)
  const date = String(input.date ?? '')
  const time = String(input.time ?? '')
  const people = Number(input.people)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00`))) throw new PublicOperationError('Selecciona una fecha válida.')
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new PublicOperationError('Selecciona una hora válida.')
  if (!Number.isInteger(people) || people < 1 || people > 20) throw new PublicOperationError('Indica entre 1 y 20 personas.')
  const notes = String(input.notes ?? '').trim()
  if (notes.length > 1000) throw new PublicOperationError('Las observaciones son demasiado largas.')
  // Store a date-only reservation at noon UTC so it cannot move to the prior local day.
  return { ...contact, date: `${date}T12:00:00.000Z`, time, people, notes, status: 'solicitada' }
}

export const assertReservationAvailability = async (payload: Payload, date: string, time: string) => {
  const settings = await payload.findGlobal({ slug: 'restaurant-settings', overrideAccess: true })
  const selectedDate = date.slice(0, 10)
  const closures = settings.exceptionalClosures ?? []
  if (closures.some((closure) => String(closure.date).slice(0, 10) === selectedDate)) throw new PublicOperationError('El restaurante está cerrado en esa fecha.')
  const slots = (settings.reservationSlots ?? []).map((slot) => slot.time)
  if (slots.length && !slots.includes(time)) throw new PublicOperationError('Esa franja ya no está disponible.')
}

type RequestedItem = { productSlug?: unknown; quantity?: unknown; customizations?: unknown }

export const orderFrom = async (payload: Payload, input: Record<string, unknown>) => {
  const contact = contactFrom(input)
  const pickupMinutes = String(input.pickupMinutes ?? '')
  if (pickupMinutes !== '30' && pickupMinutes !== '45') throw new PublicOperationError('Selecciona recogida en 30 o 45 minutos.')
  const requested = Array.isArray(input.items) ? input.items as RequestedItem[] : []
  if (!requested.length || requested.length > 30) throw new PublicOperationError('Añade al menos un producto al pedido.')
  const items = await Promise.all(requested.map(async (item) => {
    const slug = String(item.productSlug ?? '')
    const quantity = Number(item.quantity)
    if (!/^[a-z0-9-]{2,80}$/.test(slug) || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) throw new PublicOperationError('El pedido contiene una cantidad no válida.')
    const result = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1, depth: 0, overrideAccess: true })
    const product = result.docs[0]
    if (!product) throw new PublicOperationError('Uno de los productos ya no está disponible.')
    if (!product.available || product._status !== 'published') throw new PublicOperationError(`${product.name} no está disponible.`)
    const customizations = Array.isArray(item.customizations) ? item.customizations.map((value) => ({ value: String(value).trim() })).filter(({ value }) => value) : []
    return { productName: String(product.name), unitPrice: Number(product.price), quantity, customizations }
  }))
  return { ...contact, pickupMinutes, paymentMode: 'simulated', status: 'pagado', items }
}
