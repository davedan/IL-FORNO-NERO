import type { Access, CollectionConfig } from 'payload'

type InternalRole = 'global_admin' | 'owner' | 'employee'
type InternalUser = { role?: InternalRole } | null | undefined

const roleOf = (user: InternalUser) => user?.role
export const isInternal: Access = ({ req }) => Boolean(roleOf(req.user as InternalUser))
export const isOwnerOrAdmin: Access = ({ req }) => ['global_admin', 'owner'].includes(roleOf(req.user as InternalUser) ?? '')
export const isAdmin: Access = ({ req }) => roleOf(req.user as InternalUser) === 'global_admin'
export const publicReadPublished: Access = ({ req }) => req.user ? true : { _status: { equals: 'published' } }
export const publicCreate: Access = () => true

export const internalAccess: Pick<CollectionConfig, 'access'>['access'] = {
  read: isInternal,
  create: isInternal,
  update: isInternal,
  delete: isOwnerOrAdmin,
}
