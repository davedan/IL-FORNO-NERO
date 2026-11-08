export type CartItem = { slug: string; name: string; price: number; quantity: number; note: string; available: boolean }

type CartState = { items: Map<string, CartItem>; checkoutKey: string | null }

declare global { interface Window { __ilFornoCart?: CartState } }

const state = () => window.__ilFornoCart ??= { items: new Map(), checkoutKey: null }

export const cartItems = () => [...state().items.values()]
export const cartTotal = () => cartItems().reduce((total, item) => total + item.price * item.quantity, 0)
export const formatEuro = (value: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)

export const addToCart = (item: Omit<CartItem, 'quantity' | 'available'>) => {
  const cart = state()
  const current = cart.items.get(item.slug)
  cart.items.set(item.slug, current ? { ...current, quantity: current.quantity + 1, note: item.note } : { ...item, quantity: 1, available: true })
  cart.checkoutKey = null
}

export const changeQuantity = (slug: string, quantity: number) => {
  const item = state().items.get(slug)
  if (!item) return
  if (quantity < 1) state().items.delete(slug)
  else state().items.set(slug, { ...item, quantity: Math.min(quantity, 20) })
  state().checkoutKey = null
}

export const removeFromCart = (slug: string) => { state().items.delete(slug); state().checkoutKey = null }

export const setAvailability = (availableSlugs: Set<string>) => {
  const cart = state()
  for (const [slug, item] of cart.items) cart.items.set(slug, { ...item, available: availableSlugs.has(slug) })
}

export const checkoutKey = () => {
  const cart = state()
  if (!cart.checkoutKey) cart.checkoutKey = crypto.randomUUID().replaceAll('-', '')
  return cart.checkoutKey
}

export const clearCart = () => { window.__ilFornoCart = { items: new Map(), checkoutKey: null } }
