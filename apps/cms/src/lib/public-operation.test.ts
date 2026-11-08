import assert from 'node:assert/strict'
import test from 'node:test'
import type { Payload } from 'payload'
import { assertReservationAvailability, contactFrom, orderFrom, PublicOperationError, reservationFrom } from './public-operation'

test('accepts a valid guest reservation', () => {
  assert.deepEqual(reservationFrom({ name: ' Ada ', email: 'ADA@example.com', telephone: '600 000 000', date: '2026-11-10', time: '20:30', people: '2', notes: ' Ventana ' }), {
    name: 'Ada', email: 'ada@example.com', telephone: '600 000 000', date: '2026-11-10T12:00:00.000Z', time: '20:30', people: 2, notes: 'Ventana', status: 'solicitada',
  })
})

test('rejects invalid guest contact data and reservation capacity', () => {
  assert.throws(() => contactFrom({ name: '', email: 'not-an-email', telephone: '' }), PublicOperationError)
  assert.throws(() => reservationFrom({ name: 'Ada', email: 'ada@example.com', telephone: '600', date: '2026-11-10', time: '20:30', people: 21 }), PublicOperationError)
})

test('uses the published menu price instead of a browser-provided price', async () => {
  const payload = {
    find: async () => ({ docs: [{ name: 'Margherita', price: 12, available: true, _status: 'published' }] }),
  } as unknown as Payload
  const order = await orderFrom(payload, { name: 'Ada', email: 'ada@example.com', telephone: '600', pickupMinutes: '30', items: [{ productSlug: 'margherita', quantity: 2, unitPrice: 0, customizations: ['Sin albahaca'] }] })
  assert.equal(order.status, 'pagado')
  assert.equal(order.paymentMode, 'simulated')
  assert.deepEqual(order.items, [{ productName: 'Margherita', unitPrice: 12, quantity: 2, customizations: [{ value: 'Sin albahaca' }] }])
})

test('rejects closed dates and times outside owner-configured slots', async () => {
  const payload = { findGlobal: async () => ({ reservationSlots: [{ time: '20:30' }], exceptionalClosures: [{ date: '2026-11-11T12:00:00.000Z' }] }) } as unknown as Payload
  await assert.rejects(() => assertReservationAvailability(payload, '2026-11-11T12:00:00.000Z', '20:30'), PublicOperationError)
  await assert.rejects(() => assertReservationAvailability(payload, '2026-11-10T12:00:00.000Z', '21:00'), PublicOperationError)
})
