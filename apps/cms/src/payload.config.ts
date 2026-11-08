import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Categories, Products } from './collections/Menu'
import { Campaigns, Orders, Reservations } from './collections/Operations'
import { RestaurantSettings } from './globals/RestaurantSettings'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const secret = process.env.PAYLOAD_SECRET

if (!secret) throw new Error('PAYLOAD_SECRET is required. Copy .env.example to .env and set a long random value.')

export default buildConfig({
  admin: { user: Users.slug, importMap: { baseDir: path.resolve(dirname) } },
  collections: [Users, Categories, Products, Campaigns, Reservations, Orders],
  globals: [RestaurantSettings],
  editor: lexicalEditor(),
  secret,
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URL || 'file:./data/il-forno-nero.db' }, transactionOptions: {}, wal: true }),
  localization: { locales: [{ code: 'es', label: 'Español' }, { code: 'en', label: 'English' }, { code: 'it', label: 'Italiano' }, { code: 'de', label: 'Deutsch' }], defaultLocale: 'es', fallback: true },
  cors: [process.env.PUBLIC_SITE_URL || 'http://localhost:4321'],
  csrf: [process.env.PUBLIC_SITE_URL || 'http://localhost:4321'],
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
