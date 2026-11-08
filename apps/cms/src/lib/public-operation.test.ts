import assert from 'node:assert/strict'
import test from 'node:test'
import { contactFrom, PublicOperationError, reservationFrom } from './public-operation'

test('accepts a valid guest reservation', () => {
  assert.deepEqual(reservationFrom({ name: ' Ada ', email: 'ADA@example.com', telephone: '600 000 000', date: '2026-11-10', time: '20:30', people: '2', notes: ' Ventana ' }), {
    name: 'Ada', email: 'ada@example.com', telephone: '600 000 000', date: '2026-11-10T12:00:00.000Z', time: '20:30', people: 2, notes: 'Ventana', status: 'solicitada',
  })
})

test('rejects invalid guest contact data and reservation capacity', () => {
  assert.throws(() => contactFrom({ name: '', email: 'not-an-email', telephone: '' }), PublicOperationError)
  assert.throws(() => reservationFrom({ name: 'Ada', email: 'ada@example.com', telephone: '600', date: '2026-11-10', time: '20:30', people: 21 }), PublicOperationError)
})
