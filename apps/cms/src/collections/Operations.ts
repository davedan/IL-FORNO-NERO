import type { CollectionConfig } from 'payload'
import { isInternal, isOwnerOrAdmin, publicReadPublished } from '../access'
import { requireOwnerApproval } from '../approval'

export const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  admin: { useAsTitle: 'title' },
  access: { read: publicReadPublished, create: isInternal, update: isInternal, delete: isOwnerOrAdmin },
  versions: { drafts: true },
  hooks: { beforeChange: [requireOwnerApproval] },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'body', type: 'textarea', localized: true },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'ctaUrl', type: 'text' },
    { name: 'imageUrl', type: 'text', admin: { description: 'URL pública de la imagen de campaña.' } },
    { name: 'page', label: 'Página de aparición', type: 'select', required: true, defaultValue: '/', options: [{ label: 'Principal', value: '/' }, { label: 'Carta', value: '/carta' }, { label: 'Carrito', value: '/carrito' }, { label: 'Delivery', value: '/delivery' }, { label: 'Noticias', value: '/noticias' }] },
    { name: 'active', type: 'checkbox', defaultValue: false, required: true },
    { name: 'startsAt', type: 'date' }, { name: 'endsAt', type: 'date' },
    { name: 'weekdays', type: 'select', hasMany: true, options: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
    { name: 'startsAtTime', type: 'text' }, { name: 'endsAtTime', type: 'text' },
  ],
}

const contactFields = [
  { name: 'name', type: 'text' as const, required: true },
  { name: 'email', type: 'email' as const, required: true },
  { name: 'telephone', type: 'text' as const, required: true },
]

export const Reservations: CollectionConfig = {
  slug: 'reservations', admin: { useAsTitle: 'name' },
  access: { read: isInternal, create: isInternal, update: isInternal, delete: isOwnerOrAdmin },
  fields: [...contactFields, { name: 'date', type: 'date', required: true }, { name: 'time', type: 'text', required: true }, { name: 'people', type: 'number', required: true, min: 1 }, { name: 'notes', type: 'textarea' }, { name: 'status', type: 'select', required: true, defaultValue: 'solicitada', options: ['solicitada', 'confirmada', 'cancelada', 'completada'] }],
}

export const Orders: CollectionConfig = {
  slug: 'orders', admin: { useAsTitle: 'name' },
  access: { read: isInternal, create: isInternal, update: isInternal, delete: isOwnerOrAdmin },
  fields: [...contactFields, { name: 'pickupMinutes', type: 'select', required: true, options: ['30', '45'] }, { name: 'checkoutKey', type: 'text', required: true, unique: true, admin: { readOnly: true } }, { name: 'status', type: 'select', required: true, defaultValue: 'pagado', options: ['pagado', 'en preparación', 'listo para recoger', 'recogido', 'cancelado'] }, { name: 'paymentMode', type: 'select', required: true, defaultValue: 'simulated', options: ['simulated'] }, { name: 'items', type: 'array', required: true, fields: [{ name: 'productName', type: 'text', required: true }, { name: 'unitPrice', type: 'number', required: true, min: 0 }, { name: 'quantity', type: 'number', required: true, min: 1 }, { name: 'customizations', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] }] }],
}
