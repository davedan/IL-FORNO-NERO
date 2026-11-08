import { getPayload } from 'payload'
import config from './payload.config'
import { fallbackMenu } from '../../site/src/lib/menu'

const email = process.env.INITIAL_ADMIN_EMAIL
const password = process.env.INITIAL_ADMIN_PASSWORD

if (!email || !password || password.length < 12) {
  throw new Error('Set INITIAL_ADMIN_EMAIL and an INITIAL_ADMIN_PASSWORD of at least 12 characters before seeding.')
}

const payload = await getPayload({ config })
const users = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1, overrideAccess: true })
if (!users.docs.length) {
  await payload.create({ collection: 'users', overrideAccess: true, data: { email, password, name: 'Administrador inicial', role: 'global_admin', active: true, mustChangePassword: true } })
}

for (const [index, entry] of fallbackMenu.entries()) {
  const found = await payload.find({ collection: 'categories', where: { name: { equals: entry.name } }, limit: 1, overrideAccess: true })
  const category = found.docs[0] ?? await payload.create({ collection: 'categories', overrideAccess: true, data: { name: entry.name, order: index, _status: 'published' } })
  for (const product of entry.items) {
    const exists = await payload.find({ collection: 'products', where: { slug: { equals: product.slug } }, limit: 1, overrideAccess: true })
    const data = { slug: product.slug, name: product.name, description: product.description, price: product.price, category: category.id, available: product.available, dietaryLabels: product.vegetarian ? ['vegetarian'] : [], _status: 'published' as const }
    if (exists.docs[0]) await payload.update({ collection: 'products', id: exists.docs[0].id, overrideAccess: true, data })
    else await payload.create({ collection: 'products', overrideAccess: true, data })
  }
}

await payload.updateGlobal({ slug: 'restaurant-settings', overrideAccess: true, data: { reservationSlots: ['13:00', '13:30', '14:00', '14:30', '20:00', '20:30', '21:00', '21:30'].map((time) => ({ time })) } })
console.log('Seed completed. Sign in to the CMS with the initial administrator and change the temporary password.')
