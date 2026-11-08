# V2 Functional Requirements Readiness Report — Il Forno Nero

> External Business Analysis preflight. Inputs are the Product Owner-approved V2 PDD and decision register at project commit `d366f01317b2c639d63e443c888c24e4c5d6db3f`.

## Result

**Status: APPROVED_FOR_ARCHITECTURE_REVIEW.** The V2 package covers every V2 PDD capability with functional requirements, business rules, use cases, permission checks, negative paths and traceability. The Product Owner approved it on 8 November 2026 as the external V2 functional baseline for Architecture review.

## Coverage

- Carta, Carrito, Click & Collect and one-order checkout cover normal, unavailable-item, reset and replay paths.
- Gallery, reviews and FAQ define CRUD, immediate publication and owner/global-administrator versus employee authorization.
- Reservations explicitly remain a V1 regression boundary on the home page.
- Spanish-only scope, no account/cart recovery and no Google integration are explicit exclusions rather than implementation assumptions.

## Findings

| ID | Severity | Finding | Disposition |
| --- | --- | --- | --- |
| V2-BA-FIND-0001 | HIGH | This is an external package, not a canonical BMSF-approved FR artifact. | Product Owner approval and governed BMSF adoption remain required. |
| V2-BA-FIND-0002 | HIGH | Contact-data legal validation remains unresolved from V1. | Release gate; Product Owner deferred it. |
| V2-BA-FIND-0003 | MEDIUM | Duplicate prevention needs a server-verifiable implementation, not a UI-only promise. | Handed to Architecture and QA. |
| V2-BA-FIND-0004 | MEDIUM | Review carousel must be keyboard-operable and not depend on animation. | Handed to Architecture and QA. |

## Recommended handoff

1. Architecture produces a project-specific V2 Architecture Contract against this approved package.
2. Product Owner approves that exact V2 Architecture Contract before V2 development begins.
