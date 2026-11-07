# Product Definition — Il Forno Nero

> External authoring candidate. This document is a draft for Product Owner review; it is not a BMSF-approved artifact.

## Problem

Il Forno Nero dispone de una web pública funcional creada con una tecnología anterior, pero la carta y las campañas no pueden ser gestionadas de forma segura por el negocio. Las reservas y los pedidos no siguen un flujo operativo completo ni ofrecen al equipo una única vista de trabajo.

El producto debe reconstruir la experiencia existente sobre la ruta BMSF seleccionada, conservar la identidad visual reconocible y aportar un CMS interno para que el negocio gestione contenidos, reservas, pedidos y campañas sin depender de desarrollo.

## Target users

| Actor | Objetivo |
| --- | --- |
| Visitante | Consultar la oferta, reservar mesa o realizar un pedido para recoger. |
| Empleado | Mantener borradores de carta y campañas; consultar y operar reservas y pedidos. |
| Dueño | Gestionar el negocio, aprobar cambios editoriales, administrar empleados y operar reservas y pedidos. |
| Administrador global | Administrar todos los usuarios y todos los datos de la solución. |

Los clientes no tendrán cuenta en el MVP: actuarán como invitados.

## Desired outcomes

El MVP se considera exitoso si se cumplen estos resultados:

1. Los dueños actualizan carta y campañas sin intervención técnica.
2. Un visitante completa una reserva o pedido de recogida de principio a fin.
3. El equipo consulta y actualiza las reservas y pedidos sin errores operativos.
4. La migración conserva la identidad visual del original: paleta, tipografías, imágenes, estructura de portada y estilo de navegación.

No se establece una meta de ventas o conversión hasta disponer de una línea base de tráfico y operación.

## Product principles and constraints

- **PR-0001 — Migración fiel y útil.** Las secciones y la identidad visual existentes deben conservarse; las secciones nuevas o ampliadas pueden evolucionar para soportar sus funciones sin romper el lenguaje visual.
- **PR-0002 — Autonomía del negocio.** La carta y las campañas deben gestionarse desde el CMS por usuarios internos autorizados.
- **PR-0003 — Separación de públicos.** El CMS es exclusivo para usuarios internos; clientes finales usan únicamente la web pública.
- **PR-0004 — Menor fricción.** Las reservas y pedidos se realizan como invitado, sin cuenta de cliente.
- **PR-0005 — Datos mínimos.** El email del visitante se almacena para la operación de la reserva o pedido; no se usa para marketing en el MVP.
- **PR-0006 — Publicación controlada.** Los cambios editoriales de empleados requieren aprobación de un dueño antes de hacerse públicos.

### Decisión de tipo y perfil BMSF

- **DEC-0001 — CONFIRMADA:** tipo de proyecto `public-website`.
- **DEC-0002 — CONFIRMADA:** ruta `website@1.0.0 → custom-web → astro-payload@0.1.0`.
- El perfil declara CMS y renderizado público disponibles. El despliegue permanece sin verificar y su adaptador de ejecución no está disponible; no autoriza por sí solo hosting ni producción.

## In scope

| ID | Alcance |
| --- | --- |
| PR-0001 | Reconstrucción de la web actual sobre la ruta aprobada, preservando contenido y diseño existentes donde no entren en conflicto con nuevas funciones. |
| PR-0002 | CMS interno con gestión de usuarios, permisos, carta, campañas, reservas y pedidos. |
| PR-0003 | CRUD de categorías y productos de carta, alimentando la web pública. |
| PR-0004 | Flujo de revisión y publicación de cambios de carta y campañas. |
| PR-0005 | Solicitud de reserva con seguimiento operativo interno. |
| PR-0006 | Pedido de recogida con pago simulado y preparación para una franja seleccionada. |
| PR-0007 | Campaña flash configurable mostrada en la primera visita mientras esté vigente. |
| PR-0008 | Personalizaciones configurables por producto, sin impacto en precio en el MVP. |

## Out of scope

- Cobro real, pasarela de pago, reembolsos y conciliación.
- Envío automático de emails, mensajes de WhatsApp o llamadas.
- Cuentas, perfiles, historial o fidelización de clientes.
- Marketing y comunicaciones a visitantes.
- Personalizaciones de producto que alteren el precio.
- Historial avanzado, comentarios o auditoría detallada de aprobaciones editoriales.
- Nuevos campos de producto distintos de los definidos en este PDD.
- Confirmación automática de capacidad de reservas.

## Capabilities

### CAP-0001 — Migración de la experiencia pública

- **Actores:** visitantes.
- **Objetivo:** ofrecer la web existente con la misma identidad y los contenidos administrables conectados al CMS.
- **Reglas:** se mantienen paleta, tipografías, imágenes, portada y navegación. Pedidos, campañas, carta dinámica y reservas pueden introducir secciones o interacciones nuevas con la misma identidad visual.
- **Aceptación:** las páginas y contenidos existentes siguen disponibles; la comparación visual se realiza en escritorio y móvil, y en los idiomas actualmente soportados.
- **Prioridad:** 1.

### CAP-0002 — Acceso interno y permisos

- **Actores:** administrador global, dueños y empleados.
- **Reglas de autorización:**
  - El administrador global puede acceder a todo y crear, modificar o desactivar dueños y empleados.
  - Un dueño puede gestionar operaciones, contenido y empleados; no puede crear ni modificar cuentas de dueño o administrador global.
  - Un empleado puede crear o modificar borradores de carta y campañas, y consultar y actualizar reservas y pedidos.
  - Todos los usuarios internos pueden consultar todas las reservas y pedidos del negocio.
- **Aceptación:** un usuario no puede ejecutar una acción fuera de su rol.
- **Prioridad:** 1.

### CAP-0003 — Carta administrable

- **Actores:** empleados y dueños.
- **Objetivo:** permitir que el negocio gestione la carta que consume la web pública.
- **Datos por producto:** nombre, descripción, precio, categoría, imagen, ingredientes, alérgenos, etiquetas alimentarias —incluidos vegetariano y sin gluten—, disponibilidad temporal y personalizaciones sin cambio de precio.
- **Reglas:** empleados preparan cambios pendientes; un dueño aprueba o rechaza cada cambio sin comentarios ni historial avanzado. Los dueños pueden gestionar contenido publicado directamente.
- **Aceptación:** al aprobar un cambio, la web pública muestra la nueva información; al rechazarlo, mantiene la versión publicada.
- **Prioridad:** 2.

### CAP-0004 — Campañas flash administrables

- **Actores:** empleados, dueños y visitantes.
- **Objetivo:** comunicar una oferta flash, menú del día u otra campaña temporal en la primera entrada de un visitante.
- **Datos:** texto, imagen, llamada a la acción, fecha de inicio y fecha de fin.
- **Reglas:** una campaña solo se muestra mientras esté vigente. Los cambios hechos por empleados requieren aprobación de un dueño antes de publicarse.
- **Aceptación:** una campaña aprobada y activa se muestra una vez en la primera visita; una campaña inactiva o pendiente no se muestra.
- **Prioridad:** 4.

### CAP-0005 — Reservas operativas

- **Actores:** visitantes y usuarios internos.
- **Flujo principal:** el visitante selecciona fecha, hora disponible, número de personas y datos de contacto; la reserva se registra como solicitada. El equipo consulta y actualiza su estado.
- **Estados permitidos:** solicitada, confirmada, cancelada y completada.
- **Reglas:** los dueños configuran franjas reservables y cierres excepcionales desde el CMS. La confirmación es manual; no se promete disponibilidad automática.
- **Aceptación:** cualquier usuario interno puede consultar todas las solicitudes y actualizar su estado; la web no muestra franjas cerradas.
- **Prioridad:** 3.

### CAP-0006 — Pedido de recogida

- **Actores:** visitantes y usuarios internos.
- **Flujo principal:** el visitante selecciona productos, cantidades y las personalizaciones configuradas para cada producto, sin cambio de precio; aporta datos de contacto y elige recogida en 30 o 45 minutos. Completa un pago simulado y el pedido se guarda como pagado.
- **Estados permitidos:** pagado, en preparación, listo para recoger, recogido y cancelado.
- **Reglas:** los pedidos se hacen desde la web pública; el CMS no se expone al visitante. Todas las personas internas pueden consultar y actualizar los pedidos.
- **Aceptación:** el pedido creado aparece para el equipo como pagado, con su hora de recogida y personalizaciones.
- **Prioridad:** 3.

### CAP-0007 — Contacto y uso de datos

- **Actores:** visitantes y usuarios internos.
- **Reglas:** se guarda el email con la reserva o pedido para permitir contacto manual del equipo. No hay envíos automáticos ni uso promocional en el MVP.
- **Aceptación:** el email es visible únicamente para usuarios internos autorizados al consultar la operación correspondiente.
- **Prioridad:** 3.

## Assumptions

| ID | Supuesto | Validación necesaria |
| --- | --- | --- |
| ASM-0001 | El negocio puede aportar textos, precios, imágenes, alérgenos y datos comerciales reales antes de publicar. | Revisión de contenido por el dueño. |
| ASM-0002 | La confirmación manual de reservas es suficiente para evitar sobreventa de mesas en el MVP. | Piloto operativo con el negocio. |
| ASM-0003 | El pago simulado permite validar la experiencia de pedido sin operar transacciones reales. | Pruebas de extremo a extremo. |
| ASM-0004 | Los usuarios internos comparten la visibilidad de pedidos y reservas dentro del mismo negocio. | Validación de privacidad y operación por el Product Owner. |

## Dependencies

| ID | Dependencia | Estado |
| --- | --- | --- |
| DEP-0001 | Ruta BMSF `website@1.0.0 → custom-web → astro-payload@0.1.0`. | Confirmada para definición, desarrollo y QA. |
| DEP-0002 | Decisión de Arquitectura sobre hosting, despliegue y operación de producción. | Abierta. |
| DEP-0003 | Selección e integración de pasarela de pago para una fase posterior. | Diferida. |
| DEP-0004 | Contenido comercial, imágenes, precios, condiciones y datos legales reales del negocio. | Pendiente de aportar y validar. |

## Risks

| ID | Riesgo | Impacto | Mitigación / siguiente acción |
| --- | --- | --- | --- |
| RSK-0001 | El pago simulado puede confundirse con un cobro real. | Alto | La experiencia debe comunicar claramente que el flujo no realiza transacciones reales. |
| RSK-0002 | Sin notificaciones automáticas, el equipo puede no reaccionar a tiempo a reservas o pedidos. | Alto | Validar el proceso manual durante el piloto y priorizar notificaciones en la siguiente fase. |
| RSK-0003 | Datos o promociones de ejemplo pueden publicarse como si fueran reales. | Alto | Revisión y aprobación de contenido comercial antes de producción. |
| RSK-0004 | La fidelidad visual puede entrar en conflicto con usabilidad de nuevas funciones. | Medio | Validación visual y de experiencia sobre los nuevos recorridos. |
| RSK-0005 | La visibilidad compartida de datos operativos puede exceder necesidades reales. | Medio | Revisar permisos y privacidad antes del lanzamiento. |

## Unresolved product decisions

| ID | Decisión | Owner | Impacto | Severidad |
| --- | --- | --- | --- | --- |
| OPD-0001 | Hosting, despliegue, dominios, operación y recuperación de producción. | Software Architect | Publicación y operación segura. | Alta |
| OPD-0002 | Pasarela, pago real, cancelaciones y reembolsos. | Software Architect con Product Owner | Cobro real. | Alta |
| OPD-0003 | Política de privacidad, retención y eliminación de datos de reservas y pedidos. | Product Owner | Cumplimiento y protección de datos. | Alta |
| OPD-0004 | Capacidad operativa y reglas de disponibilidad de mesas más allá de la confirmación manual. | Product Owner | Experiencia de reserva. | Media |

## Release and MVP boundaries

### MVP

El MVP incluye la migración visual y funcional de la web, CMS interno con permisos, carta y campañas aprobables, reservas con confirmación manual, pedidos de recogida con pago simulado, y visibilidad y actualización operativa por el equipo.

### Deuda de producto posterior al MVP

1. Cuentas y perfiles de cliente.
2. Pago real y su operación asociada.
3. Notificaciones automáticas por email.
4. Comunicación por WhatsApp y llamadas.
5. Marketing y comunicaciones a clientes con el consentimiento correspondiente.
6. Personalizaciones de producto que cambien el precio.
7. Campos adicionales de carta y auditoría editorial avanzada.

## Product Owner review

- **Estado:** ACCEPTED_BY_PRODUCT_OWNER — revisado y aceptado por el Product Owner el 7 de noviembre de 2026.
- **Aprobación BMSF:** este documento externo no sustituye la aprobación canónica BMSF; su adopción y los handoffs posteriores conservan las decisiones abiertas registradas.
- **Publicación:** autorizada por el Product Owner en la rama principal.

## Traceability

| Decisión / requisito | Capacidades afectadas |
| --- | --- |
| DEC-0001 y DEC-0002 | CAP-0001 a CAP-0007 |
| PR-0001 | CAP-0001 |
| PR-0002 a PR-0004 | CAP-0002 a CAP-0004 |
| PR-0005 | CAP-0005 |
| PR-0006 | CAP-0006 |
| PR-0007 | CAP-0004 |
| PR-0008 | CAP-0003 y CAP-0006 |
