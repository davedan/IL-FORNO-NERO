export type MenuItem = { slug: string; name: string; description: string; price: number; available: boolean; vegetarian?: boolean }
export type MenuCategory = { name: string; items: MenuItem[] }

export const fallbackMenu: MenuCategory[] = [
  { name: 'Pizzas', items: [{ slug: 'margherita', name: 'Margherita', description: 'Tomate San Marzano, fior di latte, albahaca y aceite de oliva.', price: 12, available: true, vegetarian: true }, { slug: 'nero', name: 'Nero', description: 'Crema de trufa negra, mozzarella, setas y pecorino.', price: 16.5, available: true, vegetarian: true }, { slug: 'diavola', name: 'Diavola', description: 'Tomate, salami picante napolitano, fior di latte y guindilla.', price: 15, available: true }] },
  { name: 'Antipasti', items: [{ slug: 'burratina', name: 'Burratina', description: 'Burrata de Puglia, tomate confitado y pan de masa madre.', price: 10.5, available: true, vegetarian: true }, { slug: 'focaccia-romero', name: 'Focaccia', description: 'Romero, sal marina y aceite de oliva virgen extra.', price: 6, available: true, vegetarian: true }] },
]
