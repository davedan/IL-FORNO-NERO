import assert from 'node:assert/strict'
import test from 'node:test'
import { enforceUserManagement } from './Users'

const run = (data: Record<string, unknown>, originalDoc: Record<string, unknown>, user: Record<string, unknown>) => enforceUserManagement({ data, operation: 'update', originalDoc, req: { user } } as never)

test('allows an owner to change only their own password', () => {
  const data = { password: 'Nueva-clave-segura-2026', mustChangePassword: false }
  assert.equal(run(data, { id: 'owner-1', role: 'owner' }, { id: 'owner-1', role: 'owner' }), data)
})

test('keeps owner management limited to employee accounts', () => {
  assert.throws(() => run({ password: 'Nueva-clave-segura-2026' }, { id: 'owner-2', role: 'owner' }, { id: 'owner-1', role: 'owner' }), /Owners can only manage employee accounts/)
})
