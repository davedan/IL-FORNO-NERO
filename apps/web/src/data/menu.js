export const menu = [
  {
    id: 'entrantes',
    title: { es: 'Entrantes', en: 'Starters', it: 'Antipasti', de: 'Vorspeisen' },
    items: [
      { name: 'Focaccia Romero', price: '6,50', veg: true, d: {
        es: 'Masa fermentada 72h, aceite de oliva virgen extra, sal, romero',
        en: '72h fermented dough, extra virgin olive oil, salt, rosemary',
        it: 'Impasto a 72h di lievitazione, olio extravergine, sale, rosmarino',
        de: '72 Std. fermentierter Teig, natives Olivenöl extra, Salz, Rosmarin' } },
      { name: 'Focaccia Parmesano', price: '7,50', veg: true, d: {
        es: 'Con parmesano reggiano', en: 'With Parmigiano Reggiano',
        it: 'Con parmigiano reggiano', de: 'Mit Parmigiano Reggiano' } },
      { name: 'Burratina', price: '9,50', veg: true, d: {
        es: 'Aceite de oliva virgen extra, pimienta negra',
        en: 'Extra virgin olive oil, black pepper',
        it: 'Olio extravergine di oliva, pepe nero',
        de: 'Natives Olivenöl extra, schwarzer Pfeffer' } },
      { name: 'Bruschetta Pomodoro', price: '7,00', veg: true, d: {
        es: 'Pan de masa madre, tomate fresco, ajo, albahaca',
        en: 'Sourdough bread, fresh tomato, garlic, basil',
        it: 'Pane a lievito madre, pomodoro fresco, aglio, basilico',
        de: 'Sauerteigbrot, frische Tomate, Knoblauch, Basilikum' } },
      { name: 'Ensalada Caprese', price: '9,00', veg: true, d: {
        es: 'Tomate ecológico, mozzarella fior di latte, albahaca',
        en: 'Organic tomato, fior di latte mozzarella, basil',
        it: 'Pomodoro biologico, mozzarella fior di latte, basilico',
        de: 'Bio-Tomate, Fior di Latte Mozzarella, Basilikum' } },
      { name: 'Antipasto Italiano', price: '14,00', d: {
        es: 'Selección de embutidos y quesos italianos',
        en: 'Selection of Italian cured meats and cheeses',
        it: 'Selezione di salumi e formaggi italiani',
        de: 'Auswahl italienischer Wurstwaren und Käse' } },
    ],
  },
  {
    id: 'clasicas',
    title: { es: 'Pizzas Clásicas', en: 'Classic Pizzas', it: 'Pizze Classiche', de: 'Klassische Pizzen' },
    note: {
      es: 'Masa madre, fermentación 72h', en: 'Sourdough, 72h fermentation',
      it: 'Lievito madre, lievitazione 72h', de: 'Sauerteig, 72 Std. Gärung' },
    items: [
      { name: 'Marinara', price: '9,00', veg: true, d: {
        es: 'Tomate, ajo laminado, orégano, aceite de oliva virgen extra (sin queso)',
        en: 'Tomato, sliced garlic, oregano, extra virgin olive oil (no cheese)',
        it: 'Pomodoro, aglio a lamelle, origano, olio extravergine (senza formaggio)',
        de: 'Tomate, Knoblauchscheiben, Oregano, natives Olivenöl (ohne Käse)' } },
      { name: 'Margherita', price: '10,50', veg: true, d: {
        es: 'Tomate, mozzarella fior di latte, albahaca, parmesano',
        en: 'Tomato, fior di latte mozzarella, basil, Parmesan',
        it: 'Pomodoro, mozzarella fior di latte, basilico, parmigiano',
        de: 'Tomate, Fior di Latte Mozzarella, Basilikum, Parmesan' } },
      { name: 'Napoletana', price: '11,50', veg: true, d: {
        es: 'Tomate, mozzarella, tomate fresco, ajo',
        en: 'Tomato, mozzarella, fresh tomato, garlic',
        it: 'Pomodoro, mozzarella, pomodoro fresco, aglio',
        de: 'Tomate, Mozzarella, frische Tomate, Knoblauch' } },
      { name: 'Diavola', price: '12,00', d: {
        es: 'Tomate, mozzarella, salami picante italiano',
        en: 'Tomato, mozzarella, spicy Italian salami',
        it: 'Pomodoro, mozzarella, salame piccante italiano',
        de: 'Tomate, Mozzarella, scharfe italienische Salami' } },
      { name: 'Prosciutto e Funghi', price: '13,00', d: {
        es: 'Tomate, mozzarella, jamón cocido, champiñones',
        en: 'Tomato, mozzarella, cooked ham, mushrooms',
        it: 'Pomodoro, mozzarella, prosciutto cotto, funghi',
        de: 'Tomate, Mozzarella, Kochschinken, Champignons' } },
    ],
  },
  {
    id: 'especiales',
    title: { es: 'Pizzas Especiales', en: 'Signature Pizzas', it: 'Pizze Speciali', de: 'Spezial-Pizzen' },
    items: [
      { name: 'Burratina', price: '15,00', veg: true, d: {
        es: 'Tomate, mozzarella, burrata 120g, albahaca',
        en: 'Tomato, mozzarella, 120g burrata, basil',
        it: 'Pomodoro, mozzarella, burrata 120g, basilico',
        de: 'Tomate, Mozzarella, 120 g Burrata, Basilikum' } },
      { name: 'Tartufo', price: '16,50', veg: true, d: {
        es: 'Base blanca, mozzarella, crema de trufa, parmesano',
        en: 'White base, mozzarella, truffle cream, Parmesan',
        it: 'Base bianca, mozzarella, crema di tartufo, parmigiano',
        de: 'Weiße Basis, Mozzarella, Trüffelcreme, Parmesan' } },
      { name: 'Nero', price: '14,50', house: true, d: {
        es: 'Burrata, rúcula, jamón crudo italiano, aceite de oliva virgen extra',
        en: 'Burrata, rocket, Italian prosciutto crudo, extra virgin olive oil',
        it: 'Burrata, rucola, prosciutto crudo italiano, olio extravergine',
        de: 'Burrata, Rucola, italienischer Rohschinken, natives Olivenöl' } },
      { name: 'Tre Formaggi', price: '12,50', veg: true, d: {
        es: 'Mozzarella, gorgonzola, parmesano, nueces',
        en: 'Mozzarella, gorgonzola, Parmesan, walnuts',
        it: 'Mozzarella, gorgonzola, parmigiano, noci',
        de: 'Mozzarella, Gorgonzola, Parmesan, Walnüsse' } },
    ],
  },
  {
    id: 'postres',
    title: { es: 'Postres', en: 'Desserts', it: 'Dolci', de: 'Desserts' },
    items: [
      { name: 'Tiramisú Casero', price: '6,50', veg: true, d: {
        es: 'Receta de la nonna Marchetti', en: 'Nonna Marchetti\u2019s recipe',
        it: 'Ricetta di nonna Marchetti', de: 'Rezept von Nonna Marchetti' } },
      { name: 'Affogato', price: '6,00', veg: true, d: {
        es: 'Helado, café expreso', en: 'Ice cream, espresso',
        it: 'Gelato, caffè espresso', de: 'Eis, Espresso' } },
      { name: 'Panna Cotta', price: '6,00', veg: true, d: {
        es: 'Con frutos rojos', en: 'With red berries',
        it: 'Con frutti di bosco', de: 'Mit roten Beeren' } },
    ],
  },
  {
    id: 'bebidas',
    title: { es: 'Bebidas', en: 'Drinks', it: 'Bevande', de: 'Getränke' },
    items: [
      { name: 'Agua mineral', price: '2,50', veg: true, d: { es: '', en: '', it: '', de: '' } },
      { name: 'Refrescos', price: '3,00', veg: true, d: { es: '', en: '', it: '', de: '' } },
      { name: 'Limonada casera', price: '3,50', veg: true, d: {
        es: 'Limón fresco, menta', en: 'Fresh lemon, mint', it: 'Limone fresco, menta', de: 'Frische Zitrone, Minze' } },
      { name: 'Copa de vino', price: '4,50', veg: true, d: {
        es: 'Chianti / Vermentino', en: 'Chianti / Vermentino', it: 'Chianti / Vermentino', de: 'Chianti / Vermentino' } },
      { name: 'Cerveza Peroni', price: '4,50', veg: true, d: {
        es: 'Cerveza italiana', en: 'Italian beer', it: 'Birra italiana', de: 'Italienisches Bier' } },
    ],
  },
];
