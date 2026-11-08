import type { GlobalConfig } from 'payload'
import { isInternal, isOwnerOrAdmin } from '../access'

export const RestaurantSettings: GlobalConfig = {
  slug: 'restaurant-settings',
  label: 'Restaurante',
  access: { read: isInternal, update: isOwnerOrAdmin },
  fields: [
    {
      name: 'reservationSlots',
      label: 'Franjas de reserva',
      type: 'array',
      fields: [{ name: 'time', type: 'text', required: true }],
    },
    {
      name: 'exceptionalClosures',
      label: 'Cierres excepcionales',
      type: 'array',
      fields: [
        { name: 'date', type: 'date', required: true },
        { name: 'reason', type: 'text' },
      ],
    },
  ],
}
