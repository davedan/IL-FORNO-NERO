# Product Definition — Il Forno Nero V2

> Evolución externa aprobada por el Product Owner el 8 de noviembre de 2026 para análisis funcional y arquitectónico. Complementa la línea base V1 (`PDD.md`, commit `adb1f135809f1678ddee5f6d5f3b267f4548d24f`); no es una adopción canónica de BMSF.

## Problem

La primera versión reconstruyó la web y habilitó el CMS, reservas y pedidos, pero la navegación pública aún concentra demasiado contenido en la portada y el recorrido de pedido no tiene un carrito coherente. Galería, reseñas y preguntas frecuentes siguen sin un modelo editorial completo para el restaurante.

V2 debe organizar el recorrido público sin perder la identidad visual, completar el pedido de recogida y permitir a los dueños gestionar esos contenidos sin desarrollo.

## Target users

| Actor | Objetivo en V2 |
| --- | --- |
| Visitante | Consultar la carta, preparar un pedido, revisar su carrito, reservar y consumir contenidos del restaurante. |
| Dueño | Gestionar directamente galería, reseñas y preguntas frecuentes, además de las capacidades operativas de V1. |
| Empleado | Mantener sus permisos y operación de V1; no edita los nuevos contenidos editoriales de V2. |
| Administrador global | Conserva el acceso total ya definido en V1. |

Los visitantes siguen actuando como invitados, sin perfil ni historial de cliente.

## Desired outcomes

1. La carta y el carrito ofrecen un pedido de recogida completo, coherente y sin pedidos duplicados.
2. El visitante ve siempre el mismo pedido, cantidad y total desde carta, Click & Collect y carrito.
3. Los dueños actualizan galería, reseñas y FAQ desde el CMS y sus cambios se reflejan inmediatamente en la web pública.
4. La navegación mantiene la identidad de la web original, con Carta y Carrito como únicos destinos públicos nuevos.

## Product principles and constraints

- **V2-PP-0001 — Evolución, no sustitución.** V2 preserva las capacidades operativas y la identidad visual aprobadas en V1; solo modifica los puntos indicados expresamente.
- **V2-PP-0002 — Un pedido, una fuente visible.** Carta, Click & Collect y carrito comparten el mismo pedido durante una visita.
- **V2-PP-0003 — Sesión efímera.** El carrito se pierde al recargar o cerrar el navegador. No se crean cuentas ni se almacena un carrito para recuperarlo.
- **V2-PP-0004 — Gestión directa del dueño.** El dueño publica inmediatamente sus cambios en galería, reseñas y FAQ. El empleado no gestiona esas áreas.
- **V2-PP-0005 — Español en V2.** La web pública y los nuevos contenidos de V2 se entregan únicamente en español. Inglés, italiano, alemán y el selector de idioma se difieren.
- **V2-PP-0006 — Pago inequívocamente simulado.** El flujo no debe sugerir que se ha realizado un cargo real.

### Tipo y perfil BMSF

- **V2-DEC-0001 — Confirmada:** se conserva el tipo `public-website` y la ruta aprobada de V1, `website@1.0.0 → custom-web → astro-payload@0.1.0`.
- **V2-DEC-0002 — Restricción heredada:** no se introduce Docker, PostgreSQL, pago real, notificaciones automáticas ni infraestructura adicional mediante V2.

## In scope

| ID | Alcance |
| --- | --- |
| V2-PR-0001 | Carta como página pública propia alimentada por la carta existente del CMS. |
| V2-PR-0002 | Carrito como página pública propia, compartido durante la visita con Carta y Click & Collect. |
| V2-PR-0003 | Modificación de cantidades, eliminación de artículos, total coherente y bloqueo de artículos no disponibles. |
| V2-PR-0004 | Confirmación de pedido desde el carrito con nombre, email, teléfono, recogida en 30 o 45 minutos y pago simulado. |
| V2-PR-0005 | Protección contra la creación duplicada de pedidos por una única confirmación. |
| V2-PR-0006 | Galería editable por dueño: crear, consultar, modificar y eliminar imágenes con título y descripción. |
| V2-PR-0007 | Reseñas editables por dueño: CRUD, publicación inmediata y presentación pública como carrusel animado estilo Google. |
| V2-PR-0008 | FAQ editable por dueño: crear, consultar, modificar y eliminar preguntas y respuestas, con publicación inmediata. |
| V2-PR-0009 | Reserva mantenida en la portada y registrada en Reservas del CMS conforme a V1. |
| V2-PR-0010 | Navegación actualizada: Carta y Carrito son las únicas páginas nuevas; el resto conserva su ubicación o comportamiento vigente. |
| V2-PR-0011 | Toda la experiencia pública y el contenido nuevo de V2 en español. |

## Out of scope

- Cuentas, perfiles, historial o recuperación de carrito de clientes.
- Persistencia del carrito tras recargar o cerrar el navegador.
- Opciones configurables de producto, extras o personalizaciones con precio; V2 conserva exclusivamente texto libre por artículo sin cambio de precio.
- Integración real con Google Reviews; esta V2 solo prepara un contenido manual de presentación equivalente.
- Idiomas distintos de español y selector de idiomas.
- Nuevas subpáginas para Nosotros, Delivery o Noticias.
- Pago real, reembolsos, notificaciones automáticas, marketing, Docker, PostgreSQL y despliegue de producción.

## Capabilities

### V2-CAP-0001 — Navegación y páginas de pedido

- **Actores:** visitantes.
- **Comportamiento:** Carta pasa a una página propia y añade artículos al carrito de la visita. Carrito es otra página propia y concentra la modificación y confirmación del pedido. Click & Collect refleja el mismo estado durante la visita.
- **Aceptación:** Carta y Carrito son navegables como páginas separadas; los artículos, cantidades y total coinciden en los tres puntos de entrada.
- **Prioridad:** 1.

### V2-CAP-0002 — Carrito y pedido de recogida

- **Actores:** visitantes, usuarios internos.
- **Comportamiento:** el visitante añade productos disponibles, edita cantidades o elimina artículos. Puede escribir una observación libre por artículo sin cambiar el precio. Un producto que queda no disponible sigue visible en el carrito, queda desactivado y bloquea la confirmación. El carrito se pierde al refrescar o cerrar la visita.
- **Confirmación:** el carrito solicita nombre, email, teléfono y selección de recogida en 30 o 45 minutos; muestra el resumen y el total; ejecuta el pago simulado y crea una única orden `pagado` en el CMS. Tras éxito muestra el resumen y tiempo de recogida, sin cuenta ni historial.
- **Aceptación:** una confirmación no produce pedidos duplicados; un artículo no disponible impide crear el pedido; el pedido válido aparece en el CMS como `pagado` con su detalle de contacto y recogida.
- **Prioridad:** 1.

### V2-CAP-0003 — Galería administrable

- **Actores:** dueño, administrador global, visitante.
- **Datos mínimos:** imagen, título y descripción en español.
- **Reglas:** dueño y administrador global realizan CRUD; los cambios se publican de inmediato. Los empleados no pueden gestionar este contenido.
- **Aceptación:** una imagen creada, modificada o eliminada cambia la galería pública sin intervención de desarrollo.
- **Prioridad:** 2.

### V2-CAP-0004 — Reseñas administrables

- **Actores:** dueño, administrador global, visitante.
- **Datos mínimos:** nombre del autor, foto de perfil, texto y valoración de una a cinco estrellas.
- **Reglas:** dueño y administrador global realizan CRUD y publican de inmediato; los empleados no pueden gestionar este contenido. El visitante las ve en un carrusel animado, con controles accesibles. La futura integración con Google no forma parte de V2.
- **Aceptación:** una reseña creada, modificada o eliminada se refleja públicamente; el carrusel permite consultar todas las reseñas sin depender de la animación automática.
- **Prioridad:** 2.

### V2-CAP-0005 — FAQ administrable

- **Actores:** dueño, administrador global, visitante.
- **Datos mínimos:** pregunta y respuesta en español.
- **Reglas:** dueño y administrador global realizan CRUD y publican de inmediato; los empleados no pueden gestionar este contenido.
- **Aceptación:** una pregunta creada, modificada o eliminada se refleja en la sección FAQ de la portada.
- **Prioridad:** 2.

### V2-CAP-0006 — Reserva integrada en la portada

- **Actores:** visitante y usuarios internos.
- **Reglas:** el formulario de reserva permanece en la portada. Una solicitud válida se registra en Reservas del CMS con las reglas, estados, contacto y gestión interna definidos por V1.
- **Aceptación:** la reorganización de páginas no elimina ni desvía el flujo de reserva de V1.
- **Prioridad:** 2.

### V2-CAP-0007 — Idioma público

- **Actores:** visitantes, dueños y administrador global.
- **Reglas:** la experiencia V2 se ofrece en español; el CMS administra los nuevos campos en español. La retirada o ausencia del selector no debe producir enlaces a locales no disponibles.
- **Aceptación:** un visitante puede completar los recorridos V2 íntegramente en español sin encontrar controles de idioma no operativos.
- **Prioridad:** 2.

## Assumptions

| ID | Supuesto | Validación necesaria |
| --- | --- | --- |
| V2-ASM-0001 | El contenido inicial de galería, reseñas y FAQ será aportado o validado por un dueño. | Revisión editorial previa a la publicación. |
| V2-ASM-0002 | Perder el carrito al refrescar o cerrar es aceptable mientras no existan perfiles de cliente. | Confirmado por el Product Owner. |
| V2-ASM-0003 | El modelo manual de reseñas permite una futura integración con Google sin afirmar que esta existe hoy. | Revisión de alcance al iniciar esa evolución. |

## Dependencies

| ID | Dependencia | Estado |
| --- | --- | --- |
| V2-DEP-0001 | Línea base funcional y operativa de V1. | Confirmada. |
| V2-DEP-0002 | Ruta BMSF heredada de V1. | Confirmada como restricción de proyecto; su certificación y despliegue se gobiernan por separado. |
| V2-DEP-0003 | Definición arquitectónica de persistencia y exposición segura de nuevos contenidos CMS. | Pendiente de Arquitectura. |
| V2-DEP-0004 | Fotografías, textos y reseñas reales autorizadas por el negocio. | Pendiente de contenido. |

## Risks

| ID | Riesgo | Impacto | Mitigación / siguiente acción |
| --- | --- | --- | --- |
| V2-RSK-0001 | Contenido manual de reseñas puede incluir imágenes o datos no autorizados. | Alto | El dueño valida el contenido antes de publicarlo. |
| V2-RSK-0002 | Un producto puede dejar de estar disponible después de entrar al carrito. | Medio | Se mantiene visible y desactivado; el pedido no se confirma hasta resolverlo. |
| V2-RSK-0003 | La simplificación a español reduce el alcance internacional del original. | Medio | Localización y selector quedan registrados como evolución posterior. |
| V2-RSK-0004 | La pérdida del carrito puede causar abandono. | Medio | Es una decisión explícita de V2 hasta que haya perfiles de cliente. |

## Unresolved product decisions

No hay decisiones funcionales bloqueantes para preparar análisis funcional y arquitectónico.

- La validación legal de retención y uso de datos personales se mantiene como dependencia de lanzamiento heredada de V1 y el Product Owner ha decidido tratarla posteriormente.
- La integración real con Google Reviews, los perfiles de cliente y la localización se mantienen como evoluciones posteriores, no como decisiones pendientes de V2.

## Release and MVP boundaries

V2 se entrega como una ampliación completa y única: no se divide en fases funcionales. Incluye carta y carrito como páginas nuevas, pedido de recogida completo, contenidos CMS de galería/reseñas/FAQ, reserva conservada en portada y web pública en español.

Fuera de V2 permanecen todas las exclusiones anteriores y, adicionalmente, localización y reseñas conectadas a Google.

## Product Owner review

- **Estado:** `APPROVED_BY_PRODUCT_OWNER_FOR_ANALYSIS`.
- **Evidencia:** decisiones confirmadas por el Product Owner durante la sesión de definición de V2 el 8 de noviembre de 2026.
- **Publicación:** autorizada por el Product Owner para este repositorio y rama de trabajo.
- **Límite de aprobación:** esta aprobación habilita el análisis funcional y arquitectónico de V2; no es una aprobación canónica de BMSF ni habilita producción.

## Traceability

| Decisión / requisito V2 | Capacidades afectadas | Cambio respecto a V1 |
| --- | --- | --- |
| V2-PR-0001 a V2-PR-0005 | V2-CAP-0001, V2-CAP-0002 | Completa el pedido de recogida con carrito de vida efímera y evita duplicados. |
| V2-PR-0006 a V2-PR-0008 | V2-CAP-0003 a V2-CAP-0005 | Añade CRUD directo de dueño para contenidos de portada. |
| V2-PR-0009 | V2-CAP-0006 | Conserva reservas de V1 en la portada y el CMS. |
| V2-PR-0010 | V2-CAP-0001, V2-CAP-0006 | Añade solo Carta y Carrito como páginas nuevas. |
| V2-PR-0011 | V2-CAP-0007 | Sustituye la obligación V1 de preservar locales por español en V2; otros idiomas se difieren. |
| V1 PR-0008 / FR-0004 | V2-CAP-0002 | Sustituye las opciones configurables por un único texto libre sin impacto en precio en V2. |
