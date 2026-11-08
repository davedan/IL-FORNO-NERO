import type { Access, CollectionConfig } from 'payload'

type InternalRole = 'global_admin' | 'owner' | 'employee'
type InternalUser = { id?: number | string; role?: InternalRole; active?: boolean } | null | undefined

const roleOf = (user: InternalUser) => user?.role
const isActive = (user: InternalUser) => user?.active !== false
export const isInternal: Access = ({ req }) => Boolean(roleOf(req.user as InternalUser)) && isActive(req.user as InternalUser)
export const isOwnerOrAdmin: Access = ({ req }) => isActive(req.user as InternalUser) && ['global_admin', 'owner'].includes(roleOf(req.user as InternalUser) ?? '')
export const isAdmin: Access = ({ req }) => isActive(req.user as InternalUser) && roleOf(req.user as InternalUser) === 'global_admin'
export const publicReadPublished: Access = ({ req }) => Boolean(roleOf(req.user as InternalUser)) && isActive(req.user as InternalUser) ? true : { _status: { equals: 'published' } }

export const manageUsers: Access = ({ req }) => {
  const user = req.user as InternalUser
  if (!isActive(user)) return false
  if (user?.role === 'global_admin') return true
  if (user?.role === 'owner') return { and: [{ role: { equals: 'employee' } }, { manager: { equals: user.id } }] }
  return { id: { equals: user?.id } }
}

export const createUsers: Access = ({ req }) => ['global_admin', 'owner'].includes(roleOf(req.user as InternalUser) ?? '') && isActive(req.user as InternalUser)
export const deleteUsers: Access = ({ req }) => {
  const user = req.user as InternalUser
  if (!isActive(user)) return false
  if (user?.role === 'global_admin') return true
  return user?.role === 'owner' ? { and: [{ role: { equals: 'employee' } }, { manager: { equals: user.id } }] } : false
}

export const internalAccess: Pick<CollectionConfig, 'access'>['access'] = {
  read: isInternal,
  create: isInternal,
  update: isInternal,
  delete: isOwnerOrAdmin,
}
