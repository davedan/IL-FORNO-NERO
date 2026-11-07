import type { CollectionConfig } from 'payload'
import { isAdmin, isInternal } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email' },
  auth: { verify: false },
  access: { read: isInternal, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'select', required: true, defaultValue: 'employee', options: ['global_admin', 'owner', 'employee'] },
    { name: 'active', type: 'checkbox', defaultValue: true, required: true },
    { name: 'mustChangePassword', type: 'checkbox', defaultValue: true, required: true },
  ],
}
