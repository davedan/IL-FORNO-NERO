export type MenuItem = { slug: string; name: string; description: string; price: number; available: boolean; vegetarian?: boolean; house?: boolean }
export type MenuCategory = { name: string; note?: string; items: MenuItem[] }

export const fallbackCategoryImages: Record<string, string> = {
  Entrantes: 'https://images.hostinger.com/1c3e9407-d0ba-4059-a58c-4bb92661df5b.png',
  'Pizzas Clásicas': 'https://images.hostinger.com/161cae1b-fb49-46dc-9743-508f76b01f69.png',
  'Pizzas Especiales': 'https://images.hostinger.com/7531b623-2fe3-42e0-a495-1d596c21232b.png',
  Postres: 'https://images.hostinger.com/5267ed01-5467-474b-b569-159afc6742c6.png',
  Bebidas: 'https://images.hostinger.com/b2a4aa15-82c8-42b2-ae66-6d9a90a61abf.png',
}

export const sortMenuGroups = <T extends { name: string; order?: number | null }>(groups: T[]) => [...groups].sort((left, right) => (left.order ?? 0) - (right.order ?? 0) || left.name.localeCompare(right.name, 'es'))

const item = (slug: string, name: string, price: number, description: string, vegetarian = false, house = false): MenuItem => ({ slug, name, price, description, vegetarian, house, available: true })

// Reference catalogue migrated from the approved Horizons baseline. Payload replaces it once the CMS is populated.
export const fallbackMenu: MenuCategory[] = [
  { name: 'Entrantes', items: [
    item('focaccia-romero', 'Focaccia Romero', 6.5, 'Masa fermentada 72h, aceite de oliva virgen extra, sal, romero', true),
    item('focaccia-parmesano', 'Focaccia Parmesano', 7.5, 'Con parmesano reggiano', true),
    item('burratina-entrante', 'Burratina', 9.5, 'Aceite de oliva virgen extra, pimienta negra', true),
    item('bruschetta-pomodoro', 'Bruschetta Pomodoro', 7, 'Pan de masa madre, tomate fresco, ajo, albahaca', true),
    item('ensalada-caprese', 'Ensalada Caprese', 9, 'Tomate ecológico, mozzarella fior di latte, albahaca', true),
    item('antipasto-italiano', 'Antipasto Italiano', 14, 'Selección de embutidos y quesos italianos'),
  ] },
  { name: 'Pizzas Clásicas', note: 'Masa madre, fermentación 72h', items: [
    item('marinara', 'Marinara', 9, 'Tomate, ajo laminado, orégano, aceite de oliva virgen extra (sin queso)', true),
    item('margherita', 'Margherita', 10.5, 'Tomate, mozzarella fior di latte, albahaca, parmesano', true),
    item('napoletana', 'Napoletana', 11.5, 'Tomate, mozzarella, tomate fresco, ajo', true),
    item('diavola', 'Diavola', 12, 'Tomate, mozzarella, salami picante italiano'),
    item('prosciutto-funghi', 'Prosciutto e Funghi', 13, 'Tomate, mozzarella, jamón cocido, champiñones'),
  ] },
  { name: 'Pizzas Especiales', items: [
    item('burratina-pizza', 'Burratina', 15, 'Tomate, mozzarella, burrata 120g, albahaca', true),
    item('tartufo', 'Tartufo', 16.5, 'Base blanca, mozzarella, crema de trufa, parmesano', true),
    item('nero', 'Nero', 14.5, 'Burrata, rúcula, jamón crudo italiano, aceite de oliva virgen extra', false, true),
    item('tre-formaggi', 'Tre Formaggi', 12.5, 'Mozzarella, gorgonzola, parmesano, nueces', true),
  ] },
  { name: 'Postres', items: [
    item('tiramisu-casero', 'Tiramisú Casero', 6.5, 'Receta de la nonna Marchetti', true),
    item('affogato', 'Affogato', 6, 'Helado, café expreso', true),
    item('panna-cotta', 'Panna Cotta', 6, 'Con frutos rojos', true),
  ] },
  { name: 'Bebidas', items: [
    item('agua-mineral', 'Agua mineral', 2.5, '', true),
    item('refrescos', 'Refrescos', 3, '', true),
    item('limonada-casera', 'Limonada casera', 3.5, 'Limón fresco, menta', true),
    item('copa-vino', 'Copa de vino', 4.5, 'Chianti / Vermentino', true),
    item('cerveza-peroni', 'Cerveza Peroni', 4.5, 'Cerveza italiana', true),
  ] },
]
