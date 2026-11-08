import assert from 'node:assert/strict'
import test from 'node:test'
import { sortMenuGroups } from './menu'

test('sorts menu groups by CMS order and then name', () => {
  assert.deepEqual(sortMenuGroups([{ name: 'Postres', order: 3 }, { name: 'Bebidas', order: 3 }, { name: 'Pizzas', order: 2 }]).map(({ name }) => name), ['Pizzas', 'Bebidas', 'Postres'])
})
