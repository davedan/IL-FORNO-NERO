import { getPayload } from 'payload'
import config from './payload.config'

const email = process.env.INITIAL_ADMIN_EMAIL
const password = process.env.INITIAL_ADMIN_PASSWORD

if (!email || !password || password.length < 12) {
  throw new Error('Set INITIAL_ADMIN_EMAIL and an INITIAL_ADMIN_PASSWORD of at least 12 characters before seeding.')
}

const menu = [
  { category: 'Pizzas', products: [
    ['margherita', 'Margherita', 'Tomate San Marzano, fior di latte, albahaca y aceite de oliva.', 12],
    ['nero', 'Nero', 'Crema de trufa negra, mozzarella, setas y pecorino.', 16.5],
    ['diavola', 'Diavola', 'Tomate, salami picante napolitano, fior di latte y guindilla.', 15],
  ] },
  { category: 'Antipasti', products: [
    ['burratina', 'Burratina', 'Burrata de Puglia, tomate confitado y pan de masa madre.', 10.5],
    ['focaccia-romero', 'Focaccia', 'Romero, sal marina y aceite de oliva virgen extra.', 6],
  ] },
] as const

const payload = await getPayload({ config })
const users = await payload.find({ collection: 'users', limit: 1, overrideAccess: true })
if (!users.docs.length) {
  await payload.create({ collection: 'users', overrideAccess: true, data: { email, password, name: 'Administrador inicial', role: 'global_admin', active: true, mustChangePassword: true } })
}

for (const [index, entry] of menu.entries()) {
  const found = await payload.find({ collection: 'categories', where: { name: { equals: entry.category } }, limit: 1, overrideAccess: true })
  const category = found.docs[0] ?? await payload.create({ collection: 'categories', overrideAccess: true, data: { name: entry.category, order: index, _status: 'published' } })
  for (const [slug, name, description, price] of entry.products) {
    const exists = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1, overrideAccess: true })
    if (!exists.docs.length) await payload.create({ collection: 'products', overrideAccess: true, data: { slug, name, description, price, category: category.id, available: true, _status: 'published' } })
  }
}

await payload.updateGlobal({ slug: 'restaurant-settings', overrideAccess: true, data: { reservationSlots: ['13:00', '13:30', '14:00', '14:30', '20:00', '20:30', '21:00', '21:30'].map((time) => ({ time })) } })
console.log('Seed completed. Sign in to the CMS with the initial administrator and change the temporary password.')
