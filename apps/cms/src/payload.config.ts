import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Categories, Products } from './collections/Menu'
import { Campaigns, Orders, Reservations } from './collections/Operations'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: { user: Users.slug, importMap: { baseDir: path.resolve(dirname) } },
  collections: [Users, Categories, Products, Campaigns, Reservations, Orders],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'set-PAYLOAD_SECRET-before-production',
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URL || 'file:./data/il-forno-nero.db' }, transactionOptions: {}, wal: true }),
  localization: { locales: [{ code: 'es', label: 'Español' }, { code: 'en', label: 'English' }, { code: 'it', label: 'Italiano' }, { code: 'de', label: 'Deutsch' }], defaultLocale: 'es', fallback: true },
  cors: [process.env.PUBLIC_SITE_URL || 'http://localhost:4321'],
  csrf: [process.env.PUBLIC_SITE_URL || 'http://localhost:4321'],
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
