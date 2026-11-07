import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';

export const LANGS = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
];

const dict = {
  es: {
    nav: { home: 'Inicio', menu: 'Menú', about: 'Nosotros', gallery: 'Galería', reserve: 'Reservas', delivery: 'Delivery', blog: 'Noticias', faq: 'FAQ', contact: 'Contacto', promos: 'Promos', reviews: 'Reseñas' },
    hero: { kicker: 'Pizzería Napoletana · Chueca, Madrid', title1: 'El fuego que', title2: 'nunca se apaga', sub: 'Masa madre con 72 horas de fermentación, horno de leña a 480°C y la tradición de la familia Marchetti, de Nápoles a Madrid.', cta1: 'Ver Menú', cta2: 'Reservar mesa', open: 'Abierto de martes a domingo · 13:00–16:00 y 20:00–00:00' },
    marquee: ['Masa madre 72h', 'Horno de leña', 'Fior di latte', 'Vera Pizza Napoletana', 'Chueca · Madrid', 'Sin gluten disponible'],
    menu: { kicker: 'La carta', title: 'Menú', sub: 'Producto italiano, fermentación lenta y fuego vivo. Precios en euros, IVA incluido.', gluten: 'Masa sin gluten disponible en todas las pizzas (+2,00 €)', vegNote: 'Opciones vegetarianas marcadas en verde', veg: 'Vegetariana', house: 'Especialidad de la casa' },
    about: { kicker: 'Nuestra historia', title: 'La familia Marchetti', p1: 'En 1978, Salvatore Marchetti encendió su primer horno en el barrio de la Sanità, en Nápoles. Cuarenta años después, sus hijos Gennaro y Lucia cruzaron el Mediterráneo con la misma masa madre viva en una maleta.', p2: 'Il Forno Nero abrió en Calle de la Reina en 2019: un comedor oscuro y cálido, mesas de madera, velas y un horno de leña que llega a 480°C. Cada pizza fermenta 72 horas, se estira a mano y se hornea en 90 segundos.', p3: 'Compramos el tomate en Campania, la mozzarella fior di latte llega dos veces por semana y la harina se muele en molino de piedra. Nada más, nada menos.', stats: [['1978', 'Primer horno en Nápoles'], ['72h', 'De fermentación'], ['480°C', 'Horno de leña'], ['2019', 'Llegamos a Madrid']] },
    gallery: { kicker: 'Galería', title: 'Fuego, masa y mesa', caps: ['Margherita', 'Nero, nuestra especialidad', 'Diavola', 'Amasado a mano', 'Chianti y pizza', 'El comedor'] },
    reserve: { kicker: 'Reservas', title: 'Reserva tu mesa', sub: 'Rellena el formulario y enviaremos tu solicitud por WhatsApp. Te confirmamos en pocos minutos.', name: 'Nombre', date: 'Fecha', time: 'Hora', people: 'Nº de personas', notes: 'Comentarios (opcional)', notesPh: 'Alergias, celebración, terraza...', submit: 'Enviar por WhatsApp', msgIntro: 'Hola, quiero reservar mesa en Il Forno Nero', person: 'persona', persons: 'personas', error: 'Completa nombre, fecha, hora y número de personas.', closed: 'Los lunes permanecemos cerrados.' },
    contact: { kicker: 'Dónde estamos', title: 'Ubicación y contacto', address: 'Dirección', phone: 'Teléfono', whatsapp: 'WhatsApp', email: 'Email', hours: 'Horario', hoursVal: 'Martes a domingo · 13:00–16:00 y 20:00–00:00\nLunes cerrado', formTitle: 'Escríbenos', fname: 'Nombre', femail: 'Email', fmsg: 'Mensaje', fsend: 'Enviar mensaje', sent: 'Gracias, hemos recibido tu mensaje. Te responderemos muy pronto.', ferror: 'Rellena todos los campos con un email válido.' },
    delivery: { kicker: 'A domicilio', title: 'Delivery y recogida', sub: 'Sin carrito, sin apps: llámanos o escríbenos por WhatsApp y preparamos tu pedido al momento.', p1: 'Repartimos en Chueca, Justicia, Malasaña y Salesas dentro de un radio de 2 km. Pedido mínimo 15 € y entrega media de 30–40 minutos.', p2: 'También puedes recoger en el local: te avisamos por WhatsApp cuando tu pizza sale del horno, y te llevas un 10 % de descuento en recogida.', steps: [['01', 'Elige tu pizza', 'Consulta la carta y decide qué te apetece.'], ['02', 'Llama o escribe', 'Al 910 456 782 o por WhatsApp al 611 234 567.'], ['03', 'Confirmamos', 'Te damos hora exacta de entrega o recogida.'], ['04', 'A la mesa', 'Caja térmica y masa que sigue crujiente en casa.']], call: 'Llamar ahora', wa: 'Pedir por WhatsApp', waMsg: 'Hola, me gustaría hacer un pedido a domicilio en Il Forno Nero', zone: 'Zona de reparto', zoneVal: 'Chueca · Justicia · Malasaña · Salesas', min: 'Pedido mínimo', minVal: '15 € · Entrega 30–40 min' },
    blog: { kicker: 'Noticias', title: 'Del horno al blog', read: 'Leer más', posts: [
      { t: 'Cena a cuatro manos con el forno di Sanità', d: '12 marzo 2025', tag: 'Eventos', x: 'Gennaro recibe a su maestro napolitano para una noche única: seis pizzas a cuatro manos y vinos del Vesubio.' },
      { t: 'Pizza de temporada: alcachofa y limón de Amalfi', d: '28 febrero 2025', tag: 'Temporada', x: 'Durante marzo servimos una blanca con alcachofa de Tudela, ralladura de limón de Amalfi y stracciatella.' },
      { t: 'Cómo cuidamos nuestra masa madre desde 1978', d: '5 febrero 2025', tag: 'Obrador', x: 'Un mismo fermento vivo lleva 47 años trabajando. Te contamos cómo se alimenta cada mañana.' }] },
    promos: { kicker: 'Promociones', title: 'Motivos para volver', items: [
      ['Martes de Focaccia', '2x1 en todas nuestras focaccias, todos los martes de 20:00 a 00:00.'],
      ['Menú del mediodía', 'Pizza clásica + bebida + postre por 16,50 € de martes a viernes al mediodía.'],
      ['Recogida en local', '10 % de descuento en todos los pedidos que recojas en Calle de la Reina, 14.']] },
    faq: { kicker: 'Preguntas frecuentes', title: 'Todo lo que sueles preguntarnos', items: [
      ['¿Tenéis opción sin gluten?', 'Sí. Todas nuestras pizzas pueden prepararse con masa sin gluten por 2,00 € adicionales. Trabajamos con superficie y utensilios separados, aunque nuestra cocina no está libre de trazas.'],
      ['¿Dónde consulto los alérgenos?', 'Disponemos de la carta completa de alérgenos en el local y podemos enviártela por WhatsApp antes de tu visita. Avísanos al reservar y adaptamos lo que haga falta.'],
      ['¿Hace falta reservar?', 'Recomendamos reservar, especialmente de jueves a domingo. Puedes hacerlo desde el formulario de esta web y te confirmamos por WhatsApp.'],
      ['¿Hay parking cerca?', 'Sí, el aparcamiento público de Plaza del Rey y el de Calle Barbieri están a menos de cinco minutos andando. La zona es SER, por lo que recomendamos el metro Chueca (L5) o Gran Vía.'],
      ['¿Tenéis opciones vegetarianas?', 'Bastantes: Marinara, Margherita, Tre Formaggi, Tartufo, Burratina y toda la sección de entrantes marcada en verde.'],
      ['¿Se puede ir con niños o grupos?', 'Por supuesto. Tenemos tronas y admitimos grupos de hasta 14 personas reservando con 48 horas de antelación.']] },
    reviews: { kicker: 'Reseñas', title: 'Lo que dicen en la mesa', items: [
      ['La Nero es la mejor pizza que he comido fuera de Italia. El cornicione está a otro nivel y el servicio es cercano sin agobiar.', 'Marta Sanz', 'Vecina de Chueca'],
      ['Sono napoletano e qui mi sento a casa: impasto leggero, cottura perfetta e una carta di vini piccola ma azzeccata.', 'Antonio Esposito', 'Cliente habitual'],
      ['Pedimos la masa sin gluten para mi hija y fue impecable. Nos explicaron todos los alérgenos con muchísima paciencia.', 'Javier Ortega', 'Cena familiar']] },
    footer: { tag: 'Pizzería napoletana en el corazón de Madrid.', nav: 'Navegación', find: 'Encuéntranos', rights: 'Todos los derechos reservados.', legal: 'Diseñado y horneado en Madrid.' },
    common: { call: 'Llamar', whatsapp: 'WhatsApp', book: 'Reservar', backHome: 'Volver al inicio', monday: 'Lunes cerrado' },
  },
  en: {
    nav: { home: 'Home', menu: 'Menu', about: 'About', gallery: 'Gallery', reserve: 'Bookings', delivery: 'Delivery', blog: 'News', faq: 'FAQ', contact: 'Contact', promos: 'Offers', reviews: 'Reviews' },
    hero: { kicker: 'Neapolitan Pizzeria · Chueca, Madrid', title1: 'The fire that', title2: 'never goes out', sub: 'Sourdough with 72 hours of fermentation, a wood oven at 480°C and the Marchetti family tradition, from Naples to Madrid.', cta1: 'View Menu', cta2: 'Book a table', open: 'Open Tuesday to Sunday · 1–4 pm and 8 pm–midnight' },
    marquee: ['72h sourdough', 'Wood-fired oven', 'Fior di latte', 'Vera Pizza Napoletana', 'Chueca · Madrid', 'Gluten-free available'],
    menu: { kicker: 'The carte', title: 'Menu', sub: 'Italian produce, slow fermentation and live fire. Prices in euros, VAT included.', gluten: 'Gluten-free dough available on every pizza (+€2.00)', vegNote: 'Vegetarian options marked in green', veg: 'Vegetarian', house: 'House speciality' },
    about: { kicker: 'Our story', title: 'The Marchetti family', p1: 'In 1978 Salvatore Marchetti lit his first oven in the Sanità district of Naples. Forty years later his children Gennaro and Lucia crossed the Mediterranean with the same living starter in a suitcase.', p2: 'Il Forno Nero opened on Calle de la Reina in 2019: a dark, warm dining room, wooden tables, candles and a wood oven that reaches 480°C. Every pizza ferments for 72 hours, is stretched by hand and baked in 90 seconds.', p3: 'Our tomatoes come from Campania, fior di latte arrives twice a week and the flour is stone-milled. Nothing more, nothing less.', stats: [['1978', 'First oven in Naples'], ['72h', 'Of fermentation'], ['480°C', 'Wood-fired oven'], ['2019', 'We arrived in Madrid']] },
    gallery: { kicker: 'Gallery', title: 'Fire, dough and table', caps: ['Margherita', 'Nero, our speciality', 'Diavola', 'Hand-kneaded', 'Chianti and pizza', 'The dining room'] },
    reserve: { kicker: 'Bookings', title: 'Book your table', sub: 'Fill in the form and we will send your request via WhatsApp. We confirm within minutes.', name: 'Name', date: 'Date', time: 'Time', people: 'Guests', notes: 'Notes (optional)', notesPh: 'Allergies, celebration, terrace...', submit: 'Send via WhatsApp', msgIntro: 'Hello, I would like to book a table at Il Forno Nero', person: 'guest', persons: 'guests', error: 'Please fill in name, date, time and number of guests.', closed: 'We are closed on Mondays.' },
    contact: { kicker: 'Where we are', title: 'Location & contact', address: 'Address', phone: 'Phone', whatsapp: 'WhatsApp', email: 'Email', hours: 'Opening hours', hoursVal: 'Tuesday to Sunday · 1–4 pm and 8 pm–midnight\nClosed on Mondays', formTitle: 'Write to us', fname: 'Name', femail: 'Email', fmsg: 'Message', fsend: 'Send message', sent: 'Thank you, we have received your message and will reply very soon.', ferror: 'Please complete every field with a valid email.' },
    delivery: { kicker: 'At home', title: 'Delivery & takeaway', sub: 'No cart, no apps: call us or send a WhatsApp and we start your order right away.', p1: 'We deliver in Chueca, Justicia, Malasaña and Salesas within a 2 km radius. Minimum order €15 and average delivery of 30–40 minutes.', p2: 'You can also collect at the restaurant: we message you when your pizza leaves the oven, and takeaway orders get 10% off.', steps: [['01', 'Choose your pizza', 'Browse the menu and decide what you fancy.'], ['02', 'Call or message', 'On 910 456 782 or WhatsApp 611 234 567.'], ['03', 'We confirm', 'You get an exact delivery or pick-up time.'], ['04', 'To the table', 'Thermal box and a crust that stays crisp at home.']], call: 'Call now', wa: 'Order on WhatsApp', waMsg: 'Hello, I would like to place a delivery order at Il Forno Nero', zone: 'Delivery area', zoneVal: 'Chueca · Justicia · Malasaña · Salesas', min: 'Minimum order', minVal: '€15 · Delivery 30–40 min' },
    blog: { kicker: 'News', title: 'From the oven to the blog', read: 'Read more', posts: [
      { t: 'Four-hands dinner with the forno di Sanità', d: '12 March 2025', tag: 'Events', x: 'Gennaro welcomes his Neapolitan master for one night: six four-hands pizzas and wines from Vesuvius.' },
      { t: 'Seasonal pizza: artichoke and Amalfi lemon', d: '28 February 2025', tag: 'Season', x: 'All through March we serve a white pizza with Tudela artichoke, Amalfi lemon zest and stracciatella.' },
      { t: 'How we have cared for our starter since 1978', d: '5 February 2025', tag: 'Bakery', x: 'The same living ferment has been working for 47 years. Here is how it is fed every morning.' }] },
    promos: { kicker: 'Offers', title: 'Reasons to come back', items: [
      ['Focaccia Tuesdays', '2 for 1 on every focaccia, every Tuesday from 8 pm to midnight.'],
      ['Lunch menu', 'Classic pizza + drink + dessert for €16.50, Tuesday to Friday at lunchtime.'],
      ['Takeaway', '10% off every order you collect at Calle de la Reina, 14.']] },
    faq: { kicker: 'FAQ', title: 'What you usually ask us', items: [
      ['Do you have gluten-free options?', 'Yes. Every pizza can be made with gluten-free dough for an extra €2.00. We use a separate surface and tools, though our kitchen is not free of traces.'],
      ['Where can I check allergens?', 'The full allergen chart is available in the restaurant and we can send it by WhatsApp before your visit. Tell us when booking and we will adapt whatever is needed.'],
      ['Do I need to book?', 'We recommend it, especially Thursday to Sunday. Use the form on this site and we confirm by WhatsApp.'],
      ['Is there parking nearby?', 'Yes, the public car parks at Plaza del Rey and Calle Barbieri are under five minutes away. The area is regulated, so Chueca (L5) or Gran Vía metro is easiest.'],
      ['Are there vegetarian options?', 'Plenty: Marinara, Margherita, Tre Formaggi, Tartufo, Burratina and the whole starter section marked in green.'],
      ['Can I come with children or a group?', 'Of course. We have high chairs and welcome groups of up to 14 with 48 hours notice.']] },
    reviews: { kicker: 'Reviews', title: 'What they say at the table', items: [
      ['The Nero is the best pizza I have eaten outside Italy. The cornicione is on another level and the service is warm without hovering.', 'Marta Sanz', 'Chueca local'],
      ['I am Neapolitan and here I feel at home: light dough, perfect bake and a small but very well chosen wine list.', 'Antonio Esposito', 'Regular guest'],
      ['We ordered gluten-free dough for my daughter and it was flawless. They explained every allergen with great patience.', 'Javier Ortega', 'Family dinner']] },
    footer: { tag: 'Neapolitan pizzeria in the heart of Madrid.', nav: 'Navigation', find: 'Find us', rights: 'All rights reserved.', legal: 'Designed and baked in Madrid.' },
    common: { call: 'Call', whatsapp: 'WhatsApp', book: 'Book', backHome: 'Back home', monday: 'Closed Mondays' },
  },
  it: {
    nav: { home: 'Home', menu: 'Menù', about: 'Chi siamo', gallery: 'Galleria', reserve: 'Prenota', delivery: 'Delivery', blog: 'Notizie', faq: 'FAQ', contact: 'Contatti', promos: 'Promozioni', reviews: 'Recensioni' },
    hero: { kicker: 'Pizzeria Napoletana · Chueca, Madrid', title1: 'Il fuoco che', title2: 'non si spegne mai', sub: 'Lievito madre con 72 ore di lievitazione, forno a legna a 480°C e la tradizione della famiglia Marchetti, da Napoli a Madrid.', cta1: 'Vedi il menù', cta2: 'Prenota un tavolo', open: 'Aperto da martedì a domenica · 13:00–16:00 e 20:00–00:00' },
    marquee: ['Lievito madre 72h', 'Forno a legna', 'Fior di latte', 'Vera Pizza Napoletana', 'Chueca · Madrid', 'Senza glutine disponibile'],
    menu: { kicker: 'La carta', title: 'Menù', sub: 'Prodotti italiani, lievitazione lenta e fuoco vivo. Prezzi in euro, IVA inclusa.', gluten: 'Impasto senza glutine disponibile su tutte le pizze (+2,00 €)', vegNote: 'Opzioni vegetariane indicate in verde', veg: 'Vegetariana', house: 'Specialità della casa' },
    about: { kicker: 'La nostra storia', title: 'La famiglia Marchetti', p1: 'Nel 1978 Salvatore Marchetti accese il suo primo forno nel rione Sanità, a Napoli. Quarant\u2019anni dopo i figli Gennaro e Lucia attraversarono il Mediterraneo con lo stesso lievito madre vivo in valigia.', p2: 'Il Forno Nero ha aperto in Calle de la Reina nel 2019: una sala scura e calda, tavoli di legno, candele e un forno a legna che arriva a 480°C. Ogni pizza lievita 72 ore, si stende a mano e cuoce in 90 secondi.', p3: 'Il pomodoro arriva dalla Campania, il fior di latte due volte a settimana e la farina è macinata a pietra. Niente di più, niente di meno.', stats: [['1978', 'Primo forno a Napoli'], ['72h', 'Di lievitazione'], ['480°C', 'Forno a legna'], ['2019', 'Arriviamo a Madrid']] },
    gallery: { kicker: 'Galleria', title: 'Fuoco, impasto e tavola', caps: ['Margherita', 'Nero, la nostra specialità', 'Diavola', 'Impasto a mano', 'Chianti e pizza', 'La sala'] },
    reserve: { kicker: 'Prenotazioni', title: 'Prenota il tuo tavolo', sub: 'Compila il modulo e invieremo la richiesta via WhatsApp. Confermiamo in pochi minuti.', name: 'Nome', date: 'Data', time: 'Ora', people: 'Persone', notes: 'Note (facoltativo)', notesPh: 'Allergie, ricorrenze, dehors...', submit: 'Invia su WhatsApp', msgIntro: 'Ciao, vorrei prenotare un tavolo da Il Forno Nero', person: 'persona', persons: 'persone', error: 'Inserisci nome, data, ora e numero di persone.', closed: 'Il lunedì siamo chiusi.' },
    contact: { kicker: 'Dove siamo', title: 'Dove siamo e contatti', address: 'Indirizzo', phone: 'Telefono', whatsapp: 'WhatsApp', email: 'Email', hours: 'Orari', hoursVal: 'Da martedì a domenica · 13:00–16:00 e 20:00–00:00\nLunedì chiuso', formTitle: 'Scrivici', fname: 'Nome', femail: 'Email', fmsg: 'Messaggio', fsend: 'Invia messaggio', sent: 'Grazie, abbiamo ricevuto il tuo messaggio. Ti risponderemo presto.', ferror: 'Compila tutti i campi con un\u2019email valida.' },
    delivery: { kicker: 'A domicilio', title: 'Delivery e asporto', sub: 'Nessun carrello, nessuna app: chiamaci o scrivici su WhatsApp e prepariamo subito il tuo ordine.', p1: 'Consegniamo a Chueca, Justicia, Malasaña e Salesas entro 2 km. Ordine minimo 15 € e consegna media in 30–40 minuti.', p2: 'Puoi anche ritirare in pizzeria: ti avvisiamo su WhatsApp quando la pizza esce dal forno e sull\u2019asporto hai il 10% di sconto.', steps: [['01', 'Scegli la pizza', 'Guarda la carta e decidi cosa ti va.'], ['02', 'Chiama o scrivi', 'Al 910 456 782 o su WhatsApp al 611 234 567.'], ['03', 'Confermiamo', 'Ti diamo l\u2019orario esatto di consegna o ritiro.'], ['04', 'A tavola', 'Box termico e cornicione ancora croccante a casa.']], call: 'Chiama ora', wa: 'Ordina su WhatsApp', waMsg: 'Ciao, vorrei fare un ordine a domicilio da Il Forno Nero', zone: 'Zona di consegna', zoneVal: 'Chueca · Justicia · Malasaña · Salesas', min: 'Ordine minimo', minVal: '15 € · Consegna 30–40 min' },
    blog: { kicker: 'Notizie', title: 'Dal forno al blog', read: 'Leggi di più', posts: [
      { t: 'Cena a quattro mani con il forno di Sanità', d: '12 marzo 2025', tag: 'Eventi', x: 'Gennaro accoglie il suo maestro napoletano per una sera: sei pizze a quattro mani e vini del Vesuvio.' },
      { t: 'Pizza di stagione: carciofo e limone di Amalfi', d: '28 febbraio 2025', tag: 'Stagione', x: 'Per tutto marzo serviamo una bianca con carciofo, scorza di limone di Amalfi e stracciatella.' },
      { t: 'Come curiamo il nostro lievito madre dal 1978', d: '5 febbraio 2025', tag: 'Laboratorio', x: 'Lo stesso fermento vivo lavora da 47 anni. Ti raccontiamo come lo rinfreschiamo ogni mattina.' }] },
    promos: { kicker: 'Promozioni', title: 'Motivi per tornare', items: [
      ['Martedì della focaccia', '2x1 su tutte le focacce, ogni martedì dalle 20:00 alle 00:00.'],
      ['Menù di pranzo', 'Pizza classica + bevanda + dolce a 16,50 €, da martedì a venerdì a pranzo.'],
      ['Ritiro in pizzeria', '10% di sconto su ogni ordine ritirato in Calle de la Reina, 14.']] },
    faq: { kicker: 'Domande frequenti', title: 'Quello che ci chiedete sempre', items: [
      ['Avete opzioni senza glutine?', 'Sì. Tutte le pizze possono essere preparate con impasto senza glutine con 2,00 € in più. Usiamo piano e utensili separati, ma la cucina non è priva di tracce.'],
      ['Dove trovo gli allergeni?', 'La carta completa degli allergeni è in pizzeria e possiamo inviarla su WhatsApp prima della visita. Avvisaci alla prenotazione.'],
      ['È necessario prenotare?', 'Lo consigliamo, soprattutto dal giovedì alla domenica. Usa il modulo del sito: confermiamo su WhatsApp.'],
      ['C\u2019è parcheggio vicino?', 'Sì, i parcheggi pubblici di Plaza del Rey e Calle Barbieri sono a meno di cinque minuti. La zona è a pagamento: meglio la metro Chueca (L5) o Gran Vía.'],
      ['Ci sono piatti vegetariani?', 'Molti: Marinara, Margherita, Tre Formaggi, Tartufo, Burratina e tutti gli antipasti segnati in verde.'],
      ['Posso venire con bambini o in gruppo?', 'Certo. Abbiamo seggioloni e accogliamo gruppi fino a 14 persone con 48 ore di preavviso.']] },
    reviews: { kicker: 'Recensioni', title: 'Cosa si dice a tavola', items: [
      ['La Nero è la migliore pizza che abbia mangiato fuori dall\u2019Italia. Il cornicione è di un altro livello e il servizio è caloroso.', 'Marta Sanz', 'Abitante di Chueca'],
      ['Sono napoletano e qui mi sento a casa: impasto leggero, cottura perfetta e una carta dei vini piccola ma azzeccata.', 'Antonio Esposito', 'Cliente abituale'],
      ['Abbiamo ordinato l\u2019impasto senza glutine per mia figlia: impeccabile. Ci hanno spiegato tutti gli allergeni con pazienza.', 'Javier Ortega', 'Cena in famiglia']] },
    footer: { tag: 'Pizzeria napoletana nel cuore di Madrid.', nav: 'Navigazione', find: 'Dove trovarci', rights: 'Tutti i diritti riservati.', legal: 'Progettato e infornato a Madrid.' },
    common: { call: 'Chiama', whatsapp: 'WhatsApp', book: 'Prenota', backHome: 'Torna alla home', monday: 'Lunedì chiuso' },
  },
  de: {
    nav: { home: 'Start', menu: 'Speisekarte', about: 'Über uns', gallery: 'Galerie', reserve: 'Reservieren', delivery: 'Lieferung', blog: 'News', faq: 'FAQ', contact: 'Kontakt', promos: 'Angebote', reviews: 'Bewertungen' },
    hero: { kicker: 'Neapolitanische Pizzeria · Chueca, Madrid', title1: 'Das Feuer, das', title2: 'niemals erlischt', sub: 'Sauerteig mit 72 Stunden Gärung, Holzofen bei 480°C und die Tradition der Familie Marchetti, von Neapel nach Madrid.', cta1: 'Zur Speisekarte', cta2: 'Tisch reservieren', open: 'Dienstag bis Sonntag · 13:00–16:00 und 20:00–00:00' },
    marquee: ['72 Std. Sauerteig', 'Holzofen', 'Fior di latte', 'Vera Pizza Napoletana', 'Chueca · Madrid', 'Glutenfrei möglich'],
    menu: { kicker: 'Die Karte', title: 'Speisekarte', sub: 'Italienische Produkte, langsame Gärung und offenes Feuer. Preise in Euro, inkl. MwSt.', gluten: 'Glutenfreier Teig für alle Pizzen verfügbar (+2,00 €)', vegNote: 'Vegetarische Gerichte in Grün markiert', veg: 'Vegetarisch', house: 'Spezialität des Hauses' },
    about: { kicker: 'Unsere Geschichte', title: 'Die Familie Marchetti', p1: '1978 entzündete Salvatore Marchetti seinen ersten Ofen im Viertel Sanità in Neapel. Vierzig Jahre später überquerten seine Kinder Gennaro und Lucia das Mittelmeer mit demselben lebenden Sauerteig im Koffer.', p2: 'Il Forno Nero eröffnete 2019 in der Calle de la Reina: ein dunkler, warmer Gastraum, Holztische, Kerzen und ein Holzofen mit 480°C. Jede Pizza gärt 72 Stunden, wird von Hand geformt und in 90 Sekunden gebacken.', p3: 'Die Tomaten kommen aus Kampanien, der Fior di Latte zweimal pro Woche und das Mehl wird steingemahlen. Nicht mehr, nicht weniger.', stats: [['1978', 'Erster Ofen in Neapel'], ['72 Std.', 'Gärzeit'], ['480°C', 'Holzofen'], ['2019', 'Ankunft in Madrid']] },
    gallery: { kicker: 'Galerie', title: 'Feuer, Teig und Tisch', caps: ['Margherita', 'Nero, unsere Spezialität', 'Diavola', 'Von Hand geknetet', 'Chianti und Pizza', 'Der Gastraum'] },
    reserve: { kicker: 'Reservierung', title: 'Reservieren Sie Ihren Tisch', sub: 'Formular ausfüllen – wir senden die Anfrage per WhatsApp und bestätigen innerhalb weniger Minuten.', name: 'Name', date: 'Datum', time: 'Uhrzeit', people: 'Personen', notes: 'Anmerkungen (optional)', notesPh: 'Allergien, Anlass, Terrasse...', submit: 'Per WhatsApp senden', msgIntro: 'Hallo, ich möchte einen Tisch bei Il Forno Nero reservieren', person: 'Person', persons: 'Personen', error: 'Bitte Name, Datum, Uhrzeit und Personenzahl angeben.', closed: 'Montags haben wir geschlossen.' },
    contact: { kicker: 'Wo wir sind', title: 'Anfahrt & Kontakt', address: 'Adresse', phone: 'Telefon', whatsapp: 'WhatsApp', email: 'E-Mail', hours: 'Öffnungszeiten', hoursVal: 'Dienstag bis Sonntag · 13:00–16:00 und 20:00–00:00\nMontag geschlossen', formTitle: 'Schreiben Sie uns', fname: 'Name', femail: 'E-Mail', fmsg: 'Nachricht', fsend: 'Nachricht senden', sent: 'Danke, wir haben Ihre Nachricht erhalten und melden uns sehr bald.', ferror: 'Bitte alle Felder mit gültiger E-Mail ausfüllen.' },
    delivery: { kicker: 'Nach Hause', title: 'Lieferung & Abholung', sub: 'Kein Warenkorb, keine Apps: Rufen Sie an oder schreiben Sie per WhatsApp – wir starten sofort.', p1: 'Wir liefern in Chueca, Justicia, Malasaña und Salesas im Umkreis von 2 km. Mindestbestellwert 15 €, Lieferzeit im Schnitt 30–40 Minuten.', p2: 'Sie können auch abholen: Wir schreiben Ihnen, sobald die Pizza aus dem Ofen kommt – auf Abholung gibt es 10 % Rabatt.', steps: [['01', 'Pizza wählen', 'Karte ansehen und entscheiden.'], ['02', 'Anrufen oder schreiben', 'Unter 910 456 782 oder WhatsApp 611 234 567.'], ['03', 'Wir bestätigen', 'Sie erhalten eine genaue Liefer- oder Abholzeit.'], ['04', 'Zu Tisch', 'Thermobox und ein Rand, der zu Hause knusprig bleibt.']], call: 'Jetzt anrufen', wa: 'Per WhatsApp bestellen', waMsg: 'Hallo, ich möchte gerne eine Lieferung bei Il Forno Nero bestellen', zone: 'Liefergebiet', zoneVal: 'Chueca · Justicia · Malasaña · Salesas', min: 'Mindestbestellwert', minVal: '15 € · Lieferung 30–40 Min.' },
    blog: { kicker: 'News', title: 'Vom Ofen ins Blog', read: 'Weiterlesen', posts: [
      { t: 'Vier-Hände-Dinner mit dem forno di Sanità', d: '12. März 2025', tag: 'Events', x: 'Gennaro empfängt seinen neapolitanischen Meister für einen Abend: sechs Pizzen zu vier Händen und Weine vom Vesuv.' },
      { t: 'Saisonpizza: Artischocke und Amalfi-Zitrone', d: '28. Februar 2025', tag: 'Saison', x: 'Den ganzen März servieren wir eine weiße Pizza mit Artischocke, Amalfi-Zitronenzeste und Stracciatella.' },
      { t: 'Wie wir unseren Sauerteig seit 1978 pflegen', d: '5. Februar 2025', tag: 'Backstube', x: 'Derselbe lebende Sauerteig arbeitet seit 47 Jahren. Wir zeigen, wie er jeden Morgen gefüttert wird.' }] },
    promos: { kicker: 'Angebote', title: 'Gründe wiederzukommen', items: [
      ['Focaccia-Dienstag', '2 für 1 auf alle Focaccias, jeden Dienstag von 20:00 bis 00:00.'],
      ['Mittagsmenü', 'Klassische Pizza + Getränk + Dessert für 16,50 €, Dienstag bis Freitag mittags.'],
      ['Abholung', '10 % Rabatt auf jede Bestellung, die Sie in der Calle de la Reina 14 abholen.']] },
    faq: { kicker: 'Häufige Fragen', title: 'Was Sie uns oft fragen', items: [
      ['Gibt es glutenfreie Optionen?', 'Ja. Alle Pizzen sind mit glutenfreiem Teig für 2,00 € Aufpreis möglich. Wir arbeiten mit getrennter Fläche und Werkzeugen, die Küche ist jedoch nicht spurenfrei.'],
      ['Wo finde ich die Allergene?', 'Die vollständige Allergenkarte liegt im Lokal aus und wir senden sie gern vorab per WhatsApp. Sagen Sie bei der Reservierung Bescheid.'],
      ['Muss ich reservieren?', 'Wir empfehlen es, besonders Donnerstag bis Sonntag. Nutzen Sie das Formular auf dieser Seite – wir bestätigen per WhatsApp.'],
      ['Gibt es Parkplätze in der Nähe?', 'Ja, die Parkhäuser Plaza del Rey und Calle Barbieri sind keine fünf Minuten entfernt. Die Zone ist gebührenpflichtig – Metro Chueca (L5) oder Gran Vía ist bequemer.'],
      ['Gibt es vegetarische Gerichte?', 'Viele: Marinara, Margherita, Tre Formaggi, Tartufo, Burratina und alle grün markierten Vorspeisen.'],
      ['Kann ich mit Kindern oder in einer Gruppe kommen?', 'Selbstverständlich. Wir haben Hochstühle und nehmen Gruppen bis 14 Personen mit 48 Stunden Vorlauf an.']] },
    reviews: { kicker: 'Bewertungen', title: 'Was am Tisch gesagt wird', items: [
      ['Die Nero ist die beste Pizza, die ich außerhalb Italiens gegessen habe. Der Rand ist auf einem anderen Niveau und der Service herzlich.', 'Marta Sanz', 'Nachbarin aus Chueca'],
      ['Ich bin Neapolitaner und fühle mich hier zu Hause: leichter Teig, perfekter Backgrad und eine kleine, sehr gute Weinkarte.', 'Antonio Esposito', 'Stammgast'],
      ['Wir haben glutenfreien Teig für meine Tochter bestellt – makellos. Alle Allergene wurden sehr geduldig erklärt.', 'Javier Ortega', 'Familienessen']] },
    footer: { tag: 'Neapolitanische Pizzeria im Herzen von Madrid.', nav: 'Navigation', find: 'Finden Sie uns', rights: 'Alle Rechte vorbehalten.', legal: 'Entworfen und gebacken in Madrid.' },
    common: { call: 'Anrufen', whatsapp: 'WhatsApp', book: 'Reservieren', backHome: 'Zur Startseite', monday: 'Montags geschlossen' },
  },
};

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('es');
  const t = useMemo(() => dict[lang], [lang]);
  const tr = useCallback((obj) => (obj && typeof obj === 'object' ? obj[lang] ?? obj.es : obj), [lang]);
  const value = useMemo(() => ({ lang, setLang, t, tr }), [lang, t, tr]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export const INFO = {
  name: 'Il Forno Nero',
  address: 'Calle de la Reina, 14 · 28004 Madrid (Chueca)',
  phone: '+34 910 456 782',
  phoneHref: 'tel:+34910456782',
  whatsapp: '+34 611 234 567',
  waNumber: '34611234567',
  email: 'hola@ilfornonero.es',
};
