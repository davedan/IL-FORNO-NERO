import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { isOwnerOrAdmin, publicReadPublished } from '../access'

const publishImmediately: CollectionBeforeChangeHook = ({ data }) => {
  data._status = 'published'
  return data
}

const ownerManaged = (slug: string, useAsTitle: string, fields: CollectionConfig['fields']): CollectionConfig => ({
  slug,
  admin: { useAsTitle },
  access: { read: publicReadPublished, create: isOwnerOrAdmin, update: isOwnerOrAdmin, delete: isOwnerOrAdmin },
  versions: { drafts: true },
  hooks: { beforeChange: [publishImmediately] },
  fields,
})

export const GalleryItems = ownerManaged('gallery-items', 'title', [
  { name: 'title', type: 'text', required: true },
  { name: 'description', type: 'textarea', required: true },
  { name: 'imageUrl', type: 'text', required: true },
])

export const Reviews = ownerManaged('reviews', 'author', [
  { name: 'author', type: 'text', required: true },
  { name: 'profileImageUrl', type: 'text', required: true },
  { name: 'body', type: 'textarea', required: true },
  { name: 'rating', type: 'number', required: true, min: 1, max: 5 },
])

export const Faqs = ownerManaged('faqs', 'question', [
  { name: 'question', type: 'text', required: true },
  { name: 'answer', type: 'textarea', required: true },
])
