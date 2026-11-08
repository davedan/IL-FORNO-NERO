import type { CollectionConfig } from 'payload'
import { isInternal, isOwnerOrAdmin, publicReadPublished } from '../access'
import { requireOwnerApproval } from '../approval'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: { useAsTitle: 'name' },
  access: { read: publicReadPublished, create: isInternal, update: isInternal, delete: isOwnerOrAdmin },
  versions: { drafts: true },
  hooks: { beforeChange: [requireOwnerApproval] },
  fields: [{ name: 'name', type: 'text', required: true, localized: true }, { name: 'order', type: 'number', defaultValue: 0 }],
}

export const Products: CollectionConfig = {
  slug: 'products',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'category', 'price', 'available', '_status'] },
  access: { read: publicReadPublished, create: isInternal, update: isInternal, delete: isOwnerOrAdmin },
  versions: { drafts: true },
  hooks: { beforeChange: [requireOwnerApproval] },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'Identificador estable usado por la web pública.' } },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'price', type: 'number', required: true, min: 0 },
    { name: 'imageUrl', type: 'text', admin: { description: 'URL pública de la imagen del plato.' } },
    { name: 'category', type: 'relationship', relationTo: 'categories', required: true },
    { name: 'ingredients', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] },
    { name: 'allergens', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] },
    { name: 'dietaryLabels', type: 'select', hasMany: true, options: ['vegetarian', 'vegan', 'gluten_free'] },
    { name: 'available', type: 'checkbox', defaultValue: true, required: true },
    { name: 'customizations', type: 'array', fields: [{ name: 'label', type: 'text', required: true, localized: true }, { name: 'options', type: 'array', fields: [{ name: 'value', type: 'text', required: true, localized: true }] }] },
  ],
}
