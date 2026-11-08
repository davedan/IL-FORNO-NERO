# ADR-0002 — V2 public cart and owner-managed content

> External project ADR proposal. Status: `PROPOSED_PENDING_OWNER_ARCHITECTURE_APPROVAL` on 8 November 2026.

## Context

V2 introduces Carta and Carrito as public routes, a visit-only cart, duplicate-safe simulated checkout and CMS-managed gallery, reviews and FAQ. The existing V1 route is Astro + Payload + SQLite3 and forbids Docker and PostgreSQL.

## Decision proposal

Extend the existing Astro public frontend and Payload CMS/API rather than introduce a new service. Keep cart state in browser memory for the current visit. Validate checkout and duplicate prevention on the Payload server boundary using a persisted idempotency key. Add direct-publish public-content collections owned by global administrators and owners; employees cannot manage those collections.

## Consequences

- No new service, vendor, infrastructure or datastore is needed.
- A browser refresh deliberately loses the cart.
- Checkout idempotency becomes an explicit server-side verification obligation.
- Public content is managed manually; Google remains deferred.
- This ADR has no effect until the Owner approves `V2-ARCHITECTURE-CONTRACT.md`.
