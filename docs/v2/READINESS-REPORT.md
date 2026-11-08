# V2 Requirements Readiness Report — Il Forno Nero

> Preflight externo de producto y análisis funcional. No sustituye la adopción canónica BMSF, la revisión de Arquitectura ni las validaciones de QA.

## Result

**Estado: READY_FOR_ARCHITECTURE_REVIEW.** El alcance V2 aprobado por el Product Owner contiene actores, permisos, flujos, excepciones y criterios de aceptación para Carta, Carrito, pedido de recogida, galería, reseñas, FAQ, reserva y español.

## Coverage

- `PDD.md` conserva la línea base V1; V2 se publica como evolución independiente y trazable.
- `FUNCTIONAL-DISCOVERY.md` cubre cada capacidad V2 con flujos positivos, validación, permisos y excepciones.
- `DECISIONS.md` registra explícitamente los cambios que sustituyen partes de V1: personalización de texto libre y alcance solo en español.
- No se ha introducido una decisión tecnológica nueva: se conservan tipo, ruta y restricciones heredadas.

## Findings

| ID | Severidad | Hallazgo | Disposición |
| --- | --- | --- | --- |
| V2-FIND-0001 | HIGH | La V2 solo ha sido aprobada por el Product Owner como artefacto externo; no existe adopción canónica BMSF verificada. | Abierto para el flujo BMSF aplicable; no se afirma como aprobado por BMSF. |
| V2-FIND-0002 | HIGH | Retención y uso legal de datos personales sigue pendiente desde V1. | Diferido por Product Owner; requisito antes de producción. |
| V2-FIND-0003 | MEDIUM | Se difiere localización y el selector de idiomas, reduciendo el alcance público frente al original. | Decisión V2 confirmada y trazada. |
| V2-FIND-0004 | MEDIUM | Las reseñas se cargan manualmente hasta una futura integración con Google. | Decisión V2 confirmada y trazada. |
| V2-FIND-0005 | LOW | El carrito se pierde al recargar o cerrar. | Decisión V2 confirmada y trazada. |

## Handoff

Business Analysis debe convertir este paquete en los artefactos funcionales gobernados que correspondan y verificar la compatibilidad contra la línea base aprobada. Arquitectura debe evaluar únicamente el impacto de V2 sobre el contrato existente, sin introducir componentes no solicitados.
