# Architecture Contract — Il Forno Nero

> External project Architecture Contract. Revalidated on 7 November 2026 against the Owner-certified BMSF Website route. It is GitHub-published project evidence, not a canonical BMSF artifact.

## Status and baseline

- **Architecture revalidation:** `PASS`.
- **Development handoff:** `READY` for the standard BMSF GitHub delivery method.
- **Project source:** `davedan/IL-FORNO-NERO`, `main` commit `6ec139c248f92f87041f58af476a44fb488ccb62`.
- **Upstream baseline:** `PDD.md` blob `f046ed0718cadcea36a67ac8ca74563fae13ad06` and `docs/requirements/FUNCTIONAL-REQUIREMENTS.md` blob `3117e7067a107a97dfec4add403f278275096b36`, both approved by the Product Owner for Architecture review.

## Certified target selection

| Dimension | Pinned value | Evidence |
| --- | --- | --- |
| Project type | `public-website` | BMSF Website target |
| Target profile | `website@1.0.0` | `davedan/BMSF-Arquitecture` main `83417e3aee139c88e842903ae56cdc77eef7f4a6` |
| Specialization | `custom-web` | `astro-payload@0.1.0` configuration |
| Frontend | Astro | Certified route |
| Headless CMS | Payload | Certified route |
| Configuration | `astro-payload@0.1.0` | activation PR [#51](https://github.com/davedan/BMSF-Arquitecture/pull/51), commit `eb86b514cca0aaa3ca3c0005d3c96b71d750182f` |
| Immutable source binding | BMSF commit `b0a8319431396e8d6c9fc852d5335411a0a5f7f1`, manifest SHA-256 `d31e7018c7025594c75f77764d091315bf9adb1905a83317eaeeb7da47ee23b0` | `source-binding.yaml` |
| Route certification | Certified for route availability | [certification record](https://github.com/davedan/BMSF-Arquitecture/blob/main/docs/qualification/ASTRO-PAYLOAD-CUSTOM-WEBSITE-v0.1.0.md), Owner approval PR [#38](https://github.com/davedan/BMSF-Arquitecture/pull/38) |

## Architectural boundaries

- **Astro public frontend:** preserves the existing public experience, locales, navigation, SEO metadata, accessibility and responsive presentation; renders public menu and campaign content and submits guest reservation/order requests.
- **Payload CMS:** provides the private editorial and operational boundary for internal users, content approval, menu, campaigns, reservations and orders. It does not expose CMS access to visitors.
- **SQLite3 persistence:** selected by `DEC-0020` for this MVP. Relational domain data, approvals, operations and authentication state remain behind the CMS/application persistence boundary; PostgreSQL is not part of this architecture.
- **Media:** menu and campaign media is managed through the certified CMS route; the concrete production storage service remains a deployment concern, not a new application component.

No Docker, local target adapter, execution worker, sandbox, payment provider, notification provider or production infrastructure is introduced by this contract.

## Security and authorization

- Public visitors are guests; internal CMS access is restricted to global administrator, owner and employee roles defined by FR-0003 and `BUSINESS-RULES.md`.
- Authorization is enforced at protected server/CMS operations, not only by user-interface visibility. Deactivated sessions are denied and temporary passwords require replacement before normal internal operation.
- Name, email and telephone are operational data for reservations/orders only. Automated messaging and marketing remain out of scope.
- The active/inactive, pending/approved and schedule checks for campaigns are server-owned publication rules; unavailable products remain visible but cannot enter a new order.
- Production handling of indefinite personal-data retention requires the open legal disposition; it is not accepted by this contract.

## Reliability and data integrity

- Reservation creation validates configured available slots but deliberately does not promise automatic capacity confirmation; staff resolves conflicts manually.
- Order and reservation submissions require server-side validation and duplicate-submission protection. A simulated checkout creates an order in `pagado` state but must not represent a financial charge.
- Historical orders retain their submitted product, quantity, customization and price snapshot so later menu changes do not rewrite an operation already received.
- Backup, restore, recovery objectives, monitoring and production health checks are deployment decisions and must be evidenced before release.

## Requirement coverage

| Functional requirement | Architecture realization | Verification at development/QA |
| --- | --- | --- |
| FR-0001, FR-0011 | Astro public rendering, locale/SEO/accessibility boundary | visual, responsive, accessibility, navigation, metadata and performance evidence |
| FR-0002, FR-0007 | validated guest reservation command and operational record | required fields, closed slots, duplicate and manual-state scenarios |
| FR-0003, FR-0009 | Payload private CMS and server-side RBAC | role matrix, temporary-password, revocation and operations-access checks |
| FR-0004, FR-0005 | CMS menu entities plus pending/approved publication flow | CRUD, approval/rejection and unavailable-product checks |
| FR-0006 | CMS campaign entities and entry-time schedule evaluation | active state, date/day/time and sequential-display checks |
| FR-0008 | validated guest order command and immutable order snapshot | 30/45-minute pickup, unavailable product, simulated-payment label and internal edit checks |
| FR-0010 | protected operational contact data and no outbound workflows | authorization and no-notification checks |

## Revalidation of the local-adapter finding

The initial external architecture review interpreted `adapter.status: UNAVAILABLE` as blocking Development. That interpretation is **superseded for this project**.

The current certification explicitly states that `UNAVAILABLE` and `operations: []` apply to local target execution only. The certified route is **BMSF → Codex/GitHub → GitHub Actions → QA**, and it permits standard GitHub-based development without a local adapter. This contract does not create an adapter or any substitute infrastructure.

The initial finding was not a published project Architecture Contract or dependency-register entry at commit `6ec139c`; this record preserves it as historical review context rather than rewriting history.

## Release constraints and non-blocking development dependencies

| ID | State | Disposition |
| --- | --- | --- |
| DEP-ARCH-001 | Release gate | The certification laboratory records 11 residual npm advisories (0 critical, 0 high, 5 moderate, 6 low). Strict audit is not clean; QA/Owner must disposition project dependency findings before release. |
| DEP-ARCH-002 | Release gate | Hosting, domain/TLS, backup/recovery, observability and production deployment require project-specific approval and evidence. |
| DEP-ARCH-003 | Release gate | Legal validation of indefinite personal-data retention remains Product Owner-owned. |
| DEP-ARCH-004 | Development verification | The implementation must pin supported Astro/Payload/SQLite3 dependencies in its lockfile and demonstrate the selected SQLite3 integration in normal GitHub Actions. This is not a local-adapter requirement. |
| DEP-ARCH-005 | First development gate | At revalidation, commit `5ab4c3c` has no GitHub commit statuses or configured project CI evidence. The first Development work unit must establish the standard GitHub Actions build/test gate before implementation work is merged. |

None of these entries blocks the standard BMSF Development handoff. They do block the affected production/release claims until resolved or explicitly accepted by their owners.

## Evidence and execution boundary

This revalidation executed source synchronization, artifact identity/hash checks, target/configuration/source-binding comparison and Git diff validation only. It did not run local npm commands, builds, browser tests, Docker, deployment or website implementation. The BMSF certification records its own successful activation CI at [run 42391363742](https://github.com/davedan/BMSF-Arquitecture/actions/runs/42391363742); that historical evidence is not represented as a project-specific test run.
