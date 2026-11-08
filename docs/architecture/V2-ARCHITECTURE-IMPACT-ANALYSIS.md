# V2 Architecture Impact Analysis — Il Forno Nero

> External Software Architect analysis, published 8 November 2026. Status: `READY_FOR_OWNER_REVIEW`; it is not a versioned, Owner-approved Architecture Contract and does not authorize V2 Development.

## Result

**Architecture revalidation: PASS, with governance gate pending.** V2 is compatible with the existing public-website route. It does not require a new framework, database, provider, local adapter, Docker runtime or infrastructure component.

**Development readiness for V2: BLOCKED.** The existing Architecture Contract is bound to V1 PDD/FR artifacts. V2 has an externally Owner-approved PDD and functional-discovery package, but no Business Analyst-validated functional baseline and no project-specific, versioned Architecture Contract approved by the Owner for V2. This is the hard gate required by BMSF DR-0002; it is not a target or implementation blocker.

## Inputs and evidence

| Input | Pinned evidence |
| --- | --- |
| Project repository | `davedan/IL-FORNO-NERO`, branch `bmsf/wu-0001-astro-payload-foundation`, commit `f5033f58df6f2a3a79c7c4b5b5d9ad1f8b3132a7` |
| V2 product input | `docs/v2/PDD.md`, Product Owner-approved for analysis in the same commit |
| V2 functional input | `docs/v2/FUNCTIONAL-DISCOVERY.md`, external proposal in the same commit |
| V1 architecture baseline | `docs/architecture/ARCHITECTURE-CONTRACT.md` and `ADR-0001-certified-astro-payload-route.md` |
| Target configuration | `public-website → website@1.0.0 → custom-web → astro-payload@0.1.0` |
| Canonical configuration evidence | BMSF `main`, manifest blob `ec092ad437832c8d6f294d07b1300c7c536731f2`; immutable binding commit `b0a8319431396e8d6c9fc852d5335411a0a5f7f1`, manifest SHA-256 `d31e7018c7025594c75f77764d091315bf9adb1905a83317eaeeb7da47ee23b0` |
| Route certification | `ASTRO-PAYLOAD-CUSTOM-WEBSITE-v0.1.0.md`, Owner certification PR #38 and activation PR #51 |

## Target capability result

| Capability | Status | V2 impact |
| --- | --- | --- |
| Astro public rendering | SUPPORTED | Supports Carta and Carrito as public routes and a client-side, visit-only cart. |
| Payload CMS | SUPPORTED | Supports private owner/admin editorial CRUD and public published content. |
| SQLite3 persistence | PROJECT CONSTRAINT | Remains appropriate for the single-business MVP; no PostgreSQL is introduced. |
| Deployment | UNKNOWN | Unchanged release dependency; V2 does not authorize hosting or production. |
| Local target adapter | UNAVAILABLE by design | Applies only to local target execution. Standard Codex/GitHub → GitHub Actions → QA delivery remains valid. |

Docker remains prohibited unless separately authorized by the Owner.

## Proposed V2 realization

### Public boundary

- Astro owns public navigation, Spanish presentation, `/carta`, `/carrito`, the home-page reservation entry and the view-only gallery, reviews and FAQ.
- The cart exists only in the current browser document/session memory. A refresh or a new browser session starts empty; no profile, cookie-based recovery or external store is introduced.
- Carta, Click & Collect and Carrito consume one client-side cart state while the visit remains active. Carrito is the sole checkout command surface.
- The public order command continues to send only product identifiers, quantities, free-text observations, contact data and pickup choice. The CMS owns current product price and availability validation; the browser is never authoritative for those values.

### CMS and data boundary

- Payload remains the single private operational boundary and SQLite3 remains its persistence store.
- V2 adds three CMS-managed public content domains: Gallery item (image URL, Spanish title and description), Review (author, profile image, text, one-to-five rating), and FAQ item (Spanish question and answer).
- Owners and global administrators have CRUD and immediate publication for these domains. Employees have no access to create, update or delete them. Public reads return only fields needed for published public content.
- The existing menu, campaign, reservation, order, user and approval domains retain their V1 responsibility. Reservations remain a public home-page command and internal CMS operation.

### Duplicate-order integrity

The current browser-side disable behavior alone is insufficient to meet V2's one-order requirement: a retry, refresh, second tab or delayed response can still replay a public request. The V2 Architecture Contract should require a server-validated idempotency token bound to a single checkout attempt and persisted with the order command. Replays return the original successful result rather than create another order.

This is an application-level integrity measure within Payload/SQLite3; it does not add a service, worker, provider or infrastructure.

### Reviews and accessibility

The review carousel may animate, but it must expose keyboard-operable previous/next controls, visible focus and a non-motion-dependent way to consult every review. The future Google integration is outside V2; no Google API, credentials or vendor dependency is introduced.

## Security and privacy boundaries

- Public visitors remain guests. They never access CMS administration, internal orders, reservations or unpublished content.
- CMS authorization is server enforced. V2 extends the owner/global-admin direct-publication permission only to gallery, reviews and FAQ; it does not broaden employee privileges.
- Name, email and telephone remain operational data under the V1 rules. The open legal disposition remains a release gate, even though it does not block this V2 analysis.
- Payload secret, database path and future deployment secrets remain environment configuration and must not enter Git.

## Superseded/affected baseline statements

| V1 baseline statement | V2 impact | Required AC revision |
| --- | --- | --- |
| Public frontend preserves existing locales. | V2 intentionally serves Spanish only and defers selector/locales. | Amend the public presentation boundary and localization acceptance evidence. |
| Product customizations are CMS-configured selections. | V2 uses only free-text observation without price impact. | Amend the order-command validation contract. |
| Homepage centralizes current menu and Click & Collect. | V2 creates Carta and Carrito routes and retains reservation on home. | Amend public route and cart-state boundary. |
| CMS manages menu, campaigns, reservations and orders. | V2 adds gallery, reviews and FAQ with owner-only editorial management. | Amend Payload content/authorization boundary. |

## Alternatives considered

| Decision | Recommended option | Rejected alternative and rationale |
| --- | --- | --- |
| Cart persistence | Visit-only browser state | Persistent cart, customer identity or external session storage would contradict V2 scope. |
| Duplicate protection | Server-side idempotency plus client feedback | Client button disabling alone does not prevent request replay. |
| Editorial content | Payload collections within the existing CMS | A second CMS, external review vendor or bespoke service adds unrequested components. |
| Reviews | Manual, Google-shaped content | Google integration introduces a vendor contract and credentials outside V2. |
| Data store | Existing SQLite3 | PostgreSQL is excluded by the Owner's project constraint. |

## Requirements-to-architecture coverage

| V2 functional requirement | Architectural realization | Verification expectation |
| --- | --- | --- |
| V2-FR-0001 | Astro routes plus visit-scoped client cart state | Route, add/update/remove and cross-view consistency tests. |
| V2-FR-0002 | CMS-authoritative availability/price validation; free-text observation snapshot | Available/unavailable and total snapshot tests. |
| V2-FR-0003 | Public checkout command with server-side idempotency and simulated payment state | Required-field, 30/45, retry and duplicate-command tests. |
| V2-FR-0004 | Payload Gallery collection with owner/admin access and restricted public reads | CRUD, authorization and publication tests. |
| V2-FR-0005 | Payload Review collection plus accessible Astro carousel | CRUD, rating validation, keyboard and motion-independent tests. |
| V2-FR-0006 | Payload FAQ collection with owner/admin access and restricted public reads | CRUD and authorization tests. |
| V2-FR-0007 | Existing validated reservation command and Reservations collection | Regression test for home-page reservation and CMS visibility. |
| V2-FR-0008 | Spanish-only public route/content boundary | No inactive locale controls and Spanish journey tests. |

## Findings and decisions required

| ID | Severity | Classification | Finding / action | Owner |
| --- | --- | --- | --- | --- |
| V2-ARCH-001 | BLOCKING | BA-REVIEW | Validate and approve the V2 functional requirements derived from the Product Owner-approved PDD. | Business Analyst + Product Owner |
| V2-ARCH-002 | BLOCKING | PO-DECISION | Review and explicitly approve a versioned V2 Architecture Contract tied to the validated V2 PDD/FR and exact stack. | Product Owner |
| V2-ARCH-003 | HIGH | ARCH-OWNED | Add server-side order idempotency to the V2 AC and verification plan; UI disabling alone is not sufficient. | Software Architect |
| V2-ARCH-004 | HIGH | RELEASE-GATE | Retention/use of reservation and order contact data remains legally unresolved. | Product Owner / legal review |
| V2-ARCH-005 | MEDIUM | QA | Define project-specific browser checks for accessible animated carousel, Spanish public paths, cart reset and retry behavior. | QA |
| V2-ARCH-006 | MEDIUM | RELEASE-GATE | The route laboratory's residual dependency findings require separate project QA/Owner disposition before release. | QA + Product Owner |

## Recommended next handoff

1. Business Analyst validates `docs/v2/FUNCTIONAL-DISCOVERY.md` and issues the governed V2 Functional Requirements package.
2. Software Architect converts this impact analysis into a versioned V2 Architecture Contract and ADR amendment, preserving V1 history.
3. Product Owner explicitly approves that exact V2 Architecture Contract, including Astro, Payload, SQLite3, the no-Docker constraint, direct CMS authorization boundaries and server-side idempotency.
4. Only then may a V2 Development handoff be marked ready. The lack of a local adapter is not a blocker in this sequence.
