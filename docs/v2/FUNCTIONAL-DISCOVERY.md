# Functional Discovery — Il Forno Nero V2

> Propuesta externa de análisis funcional basada en `docs/v2/PDD.md`. No sustituye la validación formal de Business Analysis ni la aprobación de Arquitectura.

## Requisitos funcionales

### V2-FR-0001 — Navegar entre Carta, Carrito y Click & Collect

**Fuente:** V2-PR-0001, V2-PR-0002, V2-CAP-0001.  
**Actores:** visitante.  
**Precondición:** visita pública activa.  
**Requisito:** la Carta será una página pública propia y el Carrito otra; ambos compartirán el mismo estado del pedido con el resumen de Click & Collect durante la visita actual.

**Aceptación**

- Dado que el visitante añade o modifica un artículo, cuando abre Carta, Carrito o Click & Collect, entonces ve las mismas cantidades y total.
- Dado que refresca la página o reinicia el navegador, cuando vuelve a la web, entonces el carrito está vacío.
- Dado que usa la navegación pública, cuando selecciona Carta o Carrito, entonces llega a su página correspondiente.

### V2-FR-0002 — Gestionar el carrito

**Fuente:** V2-PR-0003, V2-PR-0004, V2-CAP-0002.  
**Actores:** visitante.  
**Requisito:** el visitante podrá añadir productos disponibles, editar cantidades, eliminarlos y escribir una observación libre por artículo sin alterar el precio.

**Aceptación**

- Dado un producto disponible, cuando el visitante lo añade, entonces aparece en el carrito y actualiza el total.
- Dado un artículo en el carrito, cuando cambia su cantidad o lo elimina, entonces el resumen y total se actualizan.
- Dado un producto que pasa a no disponible, cuando el visitante abre el carrito, entonces permanece visible y desactivado y no permite confirmar el pedido.
- Dado un artículo personalizado, cuando el visitante escribe una observación, entonces se conserva en el pedido sin modificar el precio.

### V2-FR-0003 — Confirmar un pedido de recogida único

**Fuente:** V2-PR-0004, V2-PR-0005, V2-CAP-0002.  
**Actores:** visitante, usuarios internos.  
**Precondiciones:** carrito no vacío y sin artículos no disponibles.  
**Requisito:** el carrito solicitará nombre, email, teléfono y recogida en 30 o 45 minutos; al confirmar un pago simulado creará una sola orden `pagado` en el CMS.

**Aceptación**

- Dado que falta un dato obligatorio o la elección de recogida, cuando el visitante confirma, entonces recibe un error de campo y no se crea pedido.
- Dado un pedido válido, cuando completa el pago simulado, entonces se registra una única orden `pagado` en CMS y se presenta una confirmación con resumen y tiempo de recogida.
- Dado que el visitante activa la confirmación repetidamente, cuando se procesa la primera confirmación, entonces no se crea una segunda orden por esa misma acción.
- Dado un fallo recuperable antes de crear el pedido, cuando el visitante vuelve a intentar confirmar, entonces no se duplica una orden ya creada.

### V2-FR-0004 — Administrar galería

**Fuente:** V2-PR-0006, V2-CAP-0003.  
**Actores:** dueño, administrador global, visitante.  
**Requisito:** dueño y administrador global podrán crear, consultar, modificar y eliminar imágenes de galería con título y descripción en español. Los cambios se publican directamente.

**Aceptación**

- Dado un dueño o administrador global, cuando crea, modifica o elimina una imagen, entonces la galería pública refleja el cambio.
- Dado un empleado, cuando intenta administrar la galería, entonces se le deniega la acción.
- Dado un visitante, cuando consulta la portada, entonces ve solo contenido de galería publicado.

### V2-FR-0005 — Administrar y consultar reseñas

**Fuente:** V2-PR-0007, V2-CAP-0004.  
**Actores:** dueño, administrador global, visitante.  
**Requisito:** dueño y administrador global podrán hacer CRUD de reseñas con autor, foto, texto y una valoración de una a cinco estrellas. La portada las mostrará en un carrusel animado y operable.

**Aceptación**

- Dado un dueño o administrador global, cuando crea, modifica o elimina una reseña, entonces el carrusel público refleja el cambio.
- Dado una reseña, cuando se guarda, entonces contiene autor, foto de perfil, texto y una valoración válida entre una y cinco estrellas.
- Dado un visitante con teclado o que prefiere no depender del movimiento, cuando usa el carrusel, entonces puede consultar las reseñas mediante controles.
- Dado un empleado, cuando intenta administrar reseñas, entonces se le deniega la acción.

### V2-FR-0006 — Administrar FAQ

**Fuente:** V2-PR-0008, V2-CAP-0005.  
**Actores:** dueño, administrador global, visitante.  
**Requisito:** dueño y administrador global podrán hacer CRUD de preguntas y respuestas de la FAQ en español; los cambios se publican directamente en la portada.

**Aceptación**

- Dado un dueño o administrador global, cuando crea, modifica o elimina una FAQ, entonces la sección pública refleja el cambio.
- Dado un empleado, cuando intenta administrar una FAQ, entonces se le deniega la acción.

### V2-FR-0007 — Conservar la reserva en portada

**Fuente:** V2-PR-0009, V2-CAP-0006.  
**Actores:** visitante, usuarios internos.  
**Requisito:** la reserva permanece en la portada y, cuando es válida, crea una solicitud en el área de Reservas del CMS según estados, horarios, cierres y permisos de V1.

**Aceptación**

- Dado una solicitud válida, cuando el visitante la envía, entonces se registra como `solicitada` y puede ser consultada por el equipo interno.
- Dado un visitante, cuando usa la nueva navegación, entonces puede seguir encontrando y enviando la reserva desde la portada.

### V2-FR-0008 — Operar V2 en español

**Fuente:** V2-PR-0011, V2-CAP-0007.  
**Actores:** visitante, dueño, administrador global.  
**Requisito:** las páginas, recorridos y contenidos nuevos de V2 se presentan y gestionan en español, sin controles a locales no disponibles.

**Aceptación**

- Dado un visitante, cuando recorre Carta, Carrito, contenidos de portada o reserva, entonces encuentra la experiencia en español.
- Dado que la web no ofrece otro locale en V2, cuando usa la navegación pública, entonces no encuentra un selector inoperativo ni enlaces a locales inexistentes.

## Excepciones y límites

- Una integración real con Google Reviews no existe en V2; las reseñas son contenido manual del dueño o administrador global.
- El carrito no es recuperable y no genera un perfil de cliente.
- No hay cobro real, cancelación pública de pedidos o reserva, ni notificaciones automáticas.
- La validación legal de datos personales sigue siendo una condición de lanzamiento heredada de V1, no una función V2.
