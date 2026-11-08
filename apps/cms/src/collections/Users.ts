import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { createUsers, deleteUsers, manageUsers } from '../access'

const enforceUserManagement: CollectionBeforeChangeHook = ({ data, operation, originalDoc, req }) => {
  const user = req.user
  if (!user || user.role === 'global_admin') return data
  if (user.role === 'owner') {
    if ((operation === 'create' && data.role !== 'employee') || (operation === 'update' && originalDoc?.role !== 'employee')) throw new Error('Owners can only manage employee accounts.')
    data.role = 'employee'
    data.manager = user.id
    return data
  }
  if (originalDoc?.id !== user.id || Object.keys(data).some((key) => !['password', 'mustChangePassword'].includes(key))) throw new Error('Employees can only change their own password.')
  return data
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email' },
  auth: { verify: false },
  access: { read: manageUsers, create: createUsers, update: manageUsers, delete: deleteUsers },
  hooks: { beforeChange: [enforceUserManagement] },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'select', required: true, defaultValue: 'employee', options: ['global_admin', 'owner', 'employee'] },
    { name: 'manager', type: 'relationship', relationTo: 'users', admin: { condition: (_, siblingData) => siblingData.role === 'employee' } },
    { name: 'active', type: 'checkbox', defaultValue: true, required: true },
    { name: 'mustChangePassword', type: 'checkbox', defaultValue: true, required: true },
  ],
}
