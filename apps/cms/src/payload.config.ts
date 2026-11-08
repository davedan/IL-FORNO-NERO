import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mkdirSync } from 'fs'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Categories, Products } from './collections/Menu'
import { Campaigns, Orders, Reservations } from './collections/Operations'
import { Faqs, GalleryItems, Reviews } from './collections/Content'
import { RestaurantSettings } from './globals/RestaurantSettings'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const secret = process.env.PAYLOAD_SECRET
const databaseUrl = process.env.DATABASE_URL || 'file:./data/il-forno-nero.db'
const siteUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:4321'
const cmsUrl = process.env.CMS_URL || 'http://localhost:3001'

if (databaseUrl === 'file:./data/il-forno-nero.db') mkdirSync(path.resolve(process.cwd(), 'data'), { recursive: true })

if (!secret) throw new Error('PAYLOAD_SECRET is required. Copy .env.example to .env and set a long random value.')

export default buildConfig({
  admin: { user: Users.slug, importMap: { baseDir: path.resolve(dirname) } },
  collections: [Users, Categories, Products, Campaigns, Reservations, Orders, GalleryItems, Reviews, Faqs],
  globals: [RestaurantSettings],
  editor: lexicalEditor(),
  secret,
  serverURL: cmsUrl,
  db: sqliteAdapter({ client: { url: databaseUrl }, transactionOptions: {}, wal: true }),
  localization: { locales: [{ code: 'es', label: 'Español' }, { code: 'en', label: 'English' }, { code: 'it', label: 'Italiano' }, { code: 'de', label: 'Deutsch' }], defaultLocale: 'es', fallback: true },
  cors: [siteUrl, cmsUrl],
  csrf: [siteUrl, cmsUrl],
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
