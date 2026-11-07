# Il Forno Nero

Web pública de Il Forno Nero, una pizzería napolitana en Madrid. El proyecto parte de una versión creada con Horizons y será la base de una evolución funcional gobernada por BMSF.

## Estado del proyecto

- **Tipo de proyecto:** Web Pública.
- **Baseline:** versión inicial importada el 7 de noviembre de 2026.
- **Objetivo inmediato:** conservar la funcionalidad actual y definir, antes de implementar, las capacidades adicionales y sus criterios de aceptación.
- **Estado de requisitos:** descubrimiento en curso.

La clasificación como Web Pública prioriza contenido, accesibilidad, SEO, rendimiento, responsive y localización. No implica autenticación, tenancy ni dependencias de BMBOS.

## Funcionalidad actual

- Página principal con historia de marca, carta, galería, promociones, reseñas, preguntas frecuentes y contacto.
- Páginas independientes para `delivery`/recogida y noticias.
- Contenido en español, inglés, italiano y alemán.
- Carta con precios, opciones vegetarianas y aviso de masa sin gluten.
- Formularios de reserva y contacto enviados a la API interna.
- Entrega y recogida iniciadas por teléfono o WhatsApp.

> Los datos comerciales, promociones, reseñas, posts y datos de contacto importados deben validarse con el negocio antes de publicar en producción.

## Arquitectura actual

```text
apps/
├── web/  React + Vite + Tailwind CSS
└── api/  Express; reenvía formularios a un webhook
```

La web llama a `/hcgi/api/contact`. La API reenvía la solicitud a un webhook externo; aunque parte del copy menciona WhatsApp, el envío del formulario no abre WhatsApp directamente.

## Desarrollo local

Requiere una versión reciente de Node.js y Bun.

```bash
bun install
bun run dev
```

La web se sirve en el puerto `3000` y la API en el `3001` por defecto.

Para compilar la web:

```bash
bun run build
```

Para ejecutar los linters:

```bash
bun run lint
```

## Configuración de la API

Crear `apps/api/.env` con las credenciales del webhook:

```dotenv
WEBHOOK_URL=
N8N_BASIC_AUTH_USER=
N8N_CONTACT_WEBHOOK_SECRET=
BM_TENANT_ID=
BM_BUSINESS_ID=
CORS_ORIGIN=
```

No subir secretos ni ficheros `.env` al repositorio.

## Próximas decisiones de producto

1. Validar los datos y contenidos reales del negocio.
2. Acordar las nuevas funcionalidades, su valor esperado y el alcance de la primera entrega.
3. Resolver el flujo definitivo de reservas: webhook, WhatsApp o una combinación verificable.
4. Seleccionar un Target Profile BMSF versionado cuando exista una definición canónica verificable para Web Pública.

## Gobernanza BMSF

Este repositorio será la fuente de verdad de los artefactos del proyecto. Las decisiones de producto y los cambios de alcance se documentarán de forma trazable antes de pasar a requisitos funcionales, arquitectura, implementación y QA.

La selección confirmada es **Web Pública**. El Target Profile técnico queda abierto: no se asumirá stack, CMS, alojamiento ni proceso de despliegue hasta que se valide.
