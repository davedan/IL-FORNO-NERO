# Decision Register — Il Forno Nero V2

> Registro externo de decisiones confirmadas por el Product Owner durante la definición de V2 el 8 de noviembre de 2026.

| ID | Decisión | Estado | Evidencia / motivo | Trazabilidad |
| --- | --- | --- | --- | --- |
| V2-DEC-0001 | Carta y Carrito serán las únicas páginas públicas nuevas. | CONFIRMADA | Organizar el recorrido sin convertir el resto de secciones. | V2-CAP-0001, V2-CAP-0006 |
| V2-DEC-0002 | Galería permanece en la portada y es CRUD de dueño, con título y descripción. | CONFIRMADA | El negocio debe actualizarla sin desarrollo. | V2-CAP-0003 |
| V2-DEC-0003 | Reseñas son CRUD de dueño, publicación inmediata y carrusel animado estilo Google con autor, foto, texto y estrellas. | CONFIRMADA | Preparar la presentación para una integración posterior sin integrarla ahora. | V2-CAP-0004 |
| V2-DEC-0004 | FAQ permanece en portada y es CRUD de dueño con publicación inmediata. | CONFIRMADA | Gestión autónoma del contenido. | V2-CAP-0005 |
| V2-DEC-0005 | Administrador global conserva acceso total; empleados no gestionan galería, reseñas ni FAQ. | CONFIRMADA | Permisos simplificados solicitados por el Product Owner. | V2-CAP-0003 a V2-CAP-0005 |
| V2-DEC-0006 | Carrito compartido solo durante la visita; se pierde al recargar o cerrar. | CONFIRMADA | No hay perfiles de cliente en V2. | V2-CAP-0001, V2-CAP-0002 |
| V2-DEC-0007 | El pedido se confirma exclusivamente desde el carrito con nombre, email, teléfono y recogida en 30 o 45 minutos. | CONFIRMADA | Un único paso de checkout con pago simulado. | V2-CAP-0002 |
| V2-DEC-0008 | Un artículo que se vuelve no disponible permanece visible y desactivado y bloquea la confirmación. | CONFIRMADA | Evitar pedidos que el restaurante no puede preparar. | V2-CAP-0002 |
| V2-DEC-0009 | La confirmación debe impedir pedidos duplicados. | CONFIRMADA | Una pulsación solo puede producir una orden. | V2-CAP-0002 |
| V2-DEC-0010 | Reserva continúa en la portada y se registra en el CMS conforme a V1. | CONFIRMADA | No añade una página de reserva. | V2-CAP-0006 |
| V2-DEC-0011 | V2 se entrega solo en español; locales y selector se difieren. | CONFIRMADA, SUPERSEDE V1 FR-0001 para V2 | El selector no existe actualmente y se abordará más adelante. | V2-CAP-0007 |
| V2-DEC-0012 | Personalización de artículo: solo texto libre sin cambio de precio. | CONFIRMADA, SUPERSEDE V1 PR-0008 / FR-0004 para V2 | Se prioriza el pedido y el CMS. | V2-CAP-0002 |

## Deferred product debt

1. Perfiles e historial de clientes y recuperación de carrito.
2. Localización, selector de idioma e idiomas distintos de español.
3. Integración real con Google Reviews.
4. Opciones de producto configurables y personalizaciones que modifiquen precio.
5. Pago real, notificaciones y marketing de las líneas base anteriores.
