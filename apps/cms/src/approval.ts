import type { CollectionBeforeChangeHook } from 'payload'

/** Employees can prepare content, but only an owner or global admin can publish it. */
export const requireOwnerApproval: CollectionBeforeChangeHook = ({ data, req }) => {
  if (req.user?.role === 'employee') data._status = 'draft'
  return data
}
